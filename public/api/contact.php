<?php
// POST /api/contact.php  { name, email, topic, message, website(honeypot) }
// Emails the inquiry to the right team member and keeps a copy in the database.

declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

require_post();
$in = read_json_body();

// Honeypot: bots fill this in. Pretend success so they don't retry.
if (clean($in['website'] ?? '', 50) !== '') {
    json_out(['ok' => true]);
}

$name = clean($in['name'] ?? '', 100);
$email = clean($in['email'] ?? '', 150);
$topic = clean($in['topic'] ?? '', 30);
$message = clean($in['message'] ?? '', 3000);

$recipients = cfg()['recipients'];
if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || !isset($recipients[$topic])) {
    json_out(['ok' => false, 'error' => 'Please fill in all fields with a valid email address.'], 422);
}

rate_limit('contact', 5, 3600);

$labels = [
    'visa' => 'Visa', 'air-tickets' => 'Air Tickets',
    'insurance' => 'Travel Insurance', 'general' => 'General inquiry',
];
$label = $labels[$topic] ?? $topic;
$to = $recipients[$topic];

$body = "New website inquiry ({$label})\n"
    . str_repeat('-', 40) . "\n"
    . "Name:  {$name}\n"
    . "Email: {$email}\n"
    . "Topic: {$label}\n\n"
    . $message . "\n";

// Save first so nothing is lost if email delivery fails.
$pdo = db();
$st = $pdo->prepare('INSERT INTO inquiries (name, email, topic, message, created_at, ip_hash) VALUES (?, ?, ?, ?, ?, ?)');
$st->execute([$name, $email, $topic, $message, gmdate('c'), ip_hash()]);
$id = (int) $pdo->lastInsertId();

$sent = send_mail($to, "[Travel7 website] {$label} inquiry from {$name}", $body, $email);
if ($sent) {
    $pdo->prepare('UPDATE inquiries SET emailed = 1 WHERE id = ?')->execute([$id]);
}

if (!$sent) {
    json_out(['ok' => false, 'error' => 'We could not send your message right now. Please email us directly or try WhatsApp.'], 500);
}
json_out(['ok' => true]);

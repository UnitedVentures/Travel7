<?php
// POST /api/review-submit.php  { name, text, website(honeypot) }
// Stores the review as "pending" and emails a notification with a link to approve it.

declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

require_post();
$in = read_json_body();

if (clean($in['website'] ?? '', 50) !== '') {
    json_out(['ok' => true]); // honeypot
}

$name = clean($in['name'] ?? '', 80);
$text = clean($in['text'] ?? '', 2000);

if ($name === '' || mb_strlen($text) < 10) {
    json_out(['ok' => false, 'error' => 'Please enter your name and a review of at least 10 characters.'], 422);
}
// Reviews can't contain links — blocks most spam.
if (preg_match('~https?://|www\.~i', $text . ' ' . $name)) {
    json_out(['ok' => false, 'error' => 'Please remove links from your review.'], 422);
}

rate_limit('review', 3, 3600);

$pdo = db();
$st = $pdo->prepare("INSERT INTO reviews (name, text, status, created_at, ip_hash) VALUES (?, ?, 'pending', ?, ?)");
$st->execute([$name, $text, gmdate('c'), ip_hash()]);

$c = cfg();
$link = rtrim($c['site_url'], '/') . '/api/admin.php';
send_mail(
    $c['review_notify'],
    "[Travel7 website] New review from {$name} awaiting approval",
    "A new review was submitted and is NOT visible on the site until you approve it.\n\n"
        . "From: {$name}\n\n{$text}\n\n"
        . "Approve or reject it here:\n{$link}\n"
);

json_out(['ok' => true]);

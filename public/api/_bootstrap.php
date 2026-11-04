<?php
// Shared helpers for the Travel7 API. Not a public endpoint.

declare(strict_types=1);

if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === '_bootstrap.php') {
    http_response_code(404);
    exit;
}

function cfg(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $file = __DIR__ . '/config.php';
        $cfg = is_file($file) ? require $file : require __DIR__ . '/config.sample.php';
    }
    return $cfg;
}

function json_out(array $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 20000) {
        json_out(['ok' => false, 'error' => 'Request too large.'], 413);
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        json_out(['ok' => false, 'error' => 'Method not allowed.'], 405);
    }
}

function clean(mixed $v, int $max): string
{
    $v = is_string($v) ? trim($v) : '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo) {
        return $pdo;
    }
    $dir = cfg()['data_dir'];
    if (!is_dir($dir)) {
        mkdir($dir, 0750, true);
    }
    $pdo = new PDO('sqlite:' . $dir . '/travel7.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec('PRAGMA journal_mode = WAL');
    $pdo->exec('CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT \'pending\',   -- pending | approved | rejected
        created_at TEXT NOT NULL,
        ip_hash TEXT
    )');
    $pdo->exec('CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, email TEXT, topic TEXT, message TEXT,
        emailed INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        ip_hash TEXT
    )');
    $pdo->exec('CREATE TABLE IF NOT EXISTS hits (
        ip_hash TEXT NOT NULL, kind TEXT NOT NULL, at INTEGER NOT NULL
    )');

    // First run: seed the two launch reviews as already approved.
    $n = (int) $pdo->query('SELECT COUNT(*) FROM reviews')->fetchColumn();
    if ($n === 0) {
        $seed = require __DIR__ . '/seed-reviews.php';
        $st = $pdo->prepare('INSERT INTO reviews (name, text, status, created_at) VALUES (?, ?, \'approved\', ?)');
        foreach ($seed as $r) {
            $st->execute([$r['name'], $r['text'], gmdate('c')]);
        }
    }
    return $pdo;
}

function ip_hash(): string
{
    // Hashed so we can rate-limit without storing raw IPs.
    return hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|travel7');
}

/** Allow at most $max hits of $kind per IP per $window seconds. */
function rate_limit(string $kind, int $max, int $window): void
{
    $pdo = db();
    $now = time();
    $ip = ip_hash();
    $pdo->prepare('DELETE FROM hits WHERE at < ?')->execute([$now - 86400]);
    $st = $pdo->prepare('SELECT COUNT(*) FROM hits WHERE ip_hash = ? AND kind = ? AND at > ?');
    $st->execute([$ip, $kind, $now - $window]);
    if ((int) $st->fetchColumn() >= $max) {
        json_out(['ok' => false, 'error' => 'Too many requests. Please try again later.'], 429);
    }
    $pdo->prepare('INSERT INTO hits (ip_hash, kind, at) VALUES (?, ?, ?)')->execute([$ip, $kind, $now]);
}

function send_mail(string $to, string $subject, string $body, ?string $replyTo = null): bool
{
    $from = cfg()['mail_from'];
    $headers = [
        'From: Travel7 Website <' . $from . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
    ];
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }
    $subject = '=?UTF-8?B?' . base64_encode(str_replace(["\r", "\n"], ' ', $subject)) . '?=';
    return @mail($to, $subject, $body, implode("\r\n", $headers), '-f' . $from);
}

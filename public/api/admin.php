<?php
// Review moderation page: /api/admin.php
// Log in with the admin password, then approve / reject / delete reviews.

declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict', 'secure' => !empty($_SERVER['HTTPS'])]);
session_start();
header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function page(string $title, string $body): never
{
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="robots" content="noindex,nofollow"><title>' . h($title) . '</title><style>'
        . 'body{font:16px/1.5 system-ui,sans-serif;background:#f6f6f6;color:#111;margin:0}'
        . 'main{max-width:820px;margin:0 auto;padding:24px 16px 60px}'
        . 'h1{font-size:1.4rem}h2{font-size:1.05rem;margin:28px 0 8px}'
        . '.card{background:#fff;border:1px solid #ddd;border-radius:12px;padding:16px;margin:10px 0}'
        . '.card p{white-space:pre-wrap;margin:8px 0}.meta{color:#666;font-size:.85rem}'
        . 'button{font:700 .85rem system-ui;padding:9px 16px;border:0;border-radius:8px;cursor:pointer;margin-right:6px}'
        . '.ok{background:#feaa00}.no{background:#eee}.del{background:#fde2e2;color:#a00}'
        . 'input{font:inherit;padding:10px;border:1px solid #ccc;border-radius:8px;width:100%;max-width:320px}'
        . '.top{display:flex;justify-content:space-between;align-items:center}a{color:#111}'
        . '.err{color:#b00020}.pill{display:inline-block;padding:1px 9px;border-radius:99px;font-size:.75rem;background:#eee}'
        . '</style></head><body><main>' . $body . '</main></body></html>';
    exit;
}

$hash = cfg()['admin_password_hash'] ?? '';

// One-time helper to create the password hash (only works while no hash is set).
if (isset($_GET['setup'])) {
    if ($hash !== '') {
        page('Setup', '<h1>Already set up</h1><p>A password is already configured in config.php.</p>');
    }
    $generated = '';
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && strlen((string) ($_POST['pw'] ?? '')) >= 10) {
        $generated = password_hash((string) $_POST['pw'], PASSWORD_DEFAULT);
    }
    page('Setup', '<h1>Create admin password</h1>'
        . ($generated
            ? '<p>Copy this line into <code>config.php</code> as <code>admin_password_hash</code>:</p>'
              . '<div class="card"><code style="word-break:break-all">' . h($generated) . '</code></div>'
            : '<form method="post"><p>Choose a password (10+ characters). Nothing is stored — you get a hash to paste into config.php.</p>'
              . '<input type="password" name="pw" minlength="10" required> <button class="ok">Generate</button></form>'));
}

if ($hash === '') {
    page('Admin', '<h1>Not set up yet</h1><p>Open <a href="?setup">admin.php?setup</a> to create the admin password.</p>');
}

// --- login / logout ---
if (($_POST['action'] ?? '') === 'login') {
    usleep(400000);
    if (password_verify((string) ($_POST['pw'] ?? ''), $hash)) {
        session_regenerate_id(true);
        $_SESSION['ok'] = true;
        $_SESSION['csrf'] = bin2hex(random_bytes(16));
        header('Location: admin.php');
        exit;
    }
    $loginError = 'Wrong password.';
}
if (($_GET['logout'] ?? '') !== '' && !empty($_SESSION['ok'])) {
    session_destroy();
    header('Location: admin.php');
    exit;
}
if (empty($_SESSION['ok'])) {
    page('Admin login', '<h1>Travel7 — review admin</h1>'
        . (isset($loginError) ? '<p class="err">' . h($loginError) . '</p>' : '')
        . '<form method="post"><input type="hidden" name="action" value="login">'
        . '<input type="password" name="pw" placeholder="Password" required autofocus> <button class="ok">Log in</button></form>');
}

// --- actions ---
$pdo = db();
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && isset($_POST['id'], $_POST['action'])) {
    if (!hash_equals($_SESSION['csrf'], (string) ($_POST['csrf'] ?? ''))) {
        http_response_code(403);
        page('Error', '<p>Session expired. Reload and try again.</p>');
    }
    $id = (int) $_POST['id'];
    match ($_POST['action']) {
        'approve' => $pdo->prepare("UPDATE reviews SET status = 'approved' WHERE id = ?")->execute([$id]),
        'reject'  => $pdo->prepare("UPDATE reviews SET status = 'rejected' WHERE id = ?")->execute([$id]),
        'delete'  => $pdo->prepare('DELETE FROM reviews WHERE id = ?')->execute([$id]),
        default   => null,
    };
    header('Location: admin.php');
    exit;
}

function render_reviews(array $rows, string $csrf, array $buttons): string
{
    if (!$rows) {
        return '<p class="meta">Nothing here.</p>';
    }
    $out = '';
    foreach ($rows as $r) {
        $out .= '<div class="card"><strong>' . h($r['name']) . '</strong> '
            . '<span class="meta">· ' . h(substr($r['created_at'], 0, 10)) . '</span>'
            . '<p>' . h($r['text']) . '</p><form method="post">'
            . '<input type="hidden" name="id" value="' . (int) $r['id'] . '">'
            . '<input type="hidden" name="csrf" value="' . h($csrf) . '">';
        foreach ($buttons as $action => [$label, $class]) {
            $confirm = $action === 'delete' ? ' onclick="return confirm(\'Delete permanently?\')"' : '';
            $out .= '<button class="' . $class . '" name="action" value="' . $action . '"' . $confirm . '>' . $label . '</button>';
        }
        $out .= '</form></div>';
    }
    return $out;
}

$by = fn(string $s) => $pdo->query("SELECT * FROM reviews WHERE status = '$s' ORDER BY id DESC")->fetchAll();
$csrf = $_SESSION['csrf'];

page('Review admin', '<div class="top"><h1>Review admin</h1><a href="?logout=1">Log out</a></div>'
    . '<h2>Waiting for approval</h2>'
    . render_reviews($by('pending'), $csrf, ['approve' => ['Approve', 'ok'], 'reject' => ['Reject', 'no']])
    . '<h2>Published</h2>'
    . render_reviews($by('approved'), $csrf, ['reject' => ['Unpublish', 'no'], 'delete' => ['Delete', 'del']])
    . '<h2>Rejected</h2>'
    . render_reviews($by('rejected'), $csrf, ['approve' => ['Approve', 'ok'], 'delete' => ['Delete', 'del']]));

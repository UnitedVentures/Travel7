<?php
// GET /api/reviews.php → approved reviews, newest first.

declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

$rows = db()->query("SELECT id, name, text FROM reviews WHERE status = 'approved' ORDER BY id DESC LIMIT 50")->fetchAll();
// Oldest launch reviews first looks odd after new ones arrive; newest first is intentional.
json_out(['ok' => true, 'reviews' => $rows]);

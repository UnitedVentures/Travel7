<?php
/**
 * Copy this file to config.php (same folder) on the server and fill it in.
 * config.php is never overwritten when you re-upload the site, and is blocked
 * from being opened in a browser by .htaccess.
 */
return [
    // Where each kind of inquiry is emailed.
    'recipients' => [
        'visa'        => 'visas@travel7lanka.com',
        'air-tickets' => 'lushi@travel7lanka.com',
        'insurance'   => 'lushi@travel7lanka.com',   // change here later if it moves
        'general'     => 'lushi@travel7lanka.com',
    ],

    // Who is told when a new review is waiting for approval.
    'review_notify' => 'lushi@travel7lanka.com',

    // Must be a real mailbox on your domain (SiteGround rejects other senders).
    'mail_from' => 'noreply@travel7lanka.com',

    // Public address of the site, used for the approval link in emails.
    'site_url' => 'https://travel7lanka.com',

    // Admin login for /api/admin.php. Generate the hash by opening
    // /api/admin.php?setup once, or run: php -r "echo password_hash('your-password', PASSWORD_DEFAULT);"
    'admin_password_hash' => '',

    // Where the database file lives. Default is fine (api/data is blocked from the web).
    // For extra safety point this OUTSIDE public_html, e.g. '/home/USER/travel7-data'.
    'data_dir' => __DIR__ . '/data',
];

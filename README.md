# Travel7 website

Next.js (static export) front end + a small PHP backend (`public/api`) for inquiries and reviews.
Hosted on SiteGround shared hosting — no Node server needed.

## Develop

```bash
npm install
npm run dev          # site only (forms need the PHP API, see below)
```

To test the forms and review approval locally (needs PHP 8.1+ with SQLite):

```bash
npm run build
cd out && php -S 127.0.0.1:8080
```

## Deploy to SiteGround

1. `npm run build` → creates the `out/` folder.
2. In Site Tools → **File Manager** (or FTP), upload **the contents of `out/`** into `public_html/`.
3. First time only, in `public_html/api/`: copy `config.sample.php` to `config.php` and edit:
   - `mail_from` must be a real mailbox on your domain (create `noreply@travel7lanka.com` in Site Tools → Email).
   - `site_url` your live address.
   - Recipients are already set (visa → visas@, everything else → lushi@).
4. Visit `https://YOUR-SITE/api/admin.php?setup`, choose a password, paste the generated line into `config.php`
   as `admin_password_hash`. Then log in at `/api/admin.php`.
5. Check the PHP version in Site Tools → Devs → PHP Manager is 8.1 or newer.

Re-deploying: upload `out/` again. `config.php` and `api/data/` (the database) are not part of the build,
so they are left alone — just don't delete those two when replacing folders.

## Approving reviews

Visitors submit a review → it is saved as *pending* and an email goes to `review_notify`
(Lushi) with a link. Open `/api/admin.php`, log in, press **Approve** (or Reject). Approved reviews
appear on the Reviews page immediately. You can also unpublish or delete published reviews there.

## Where things are

| What | Where |
| --- | --- |
| Phone numbers, emails, social links, topic list | `lib/config.ts` |
| Visa countries, fees, checklists | `lib/visa-data.ts` |
| Inquiry recipients (server side) | `public/api/config.php` |
| Colours, fonts, spacing | `app/globals.css` (`:root`) |

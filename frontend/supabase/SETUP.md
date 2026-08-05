# Supabase setup (Hostinger Single + free Supabase)

## 1. Create project
1. Go to https://supabase.com → New project
2. Save the database password
3. Open **Project Settings → API**
4. Copy **Project URL** and **anon public** key

## 2. Configure the React app
```bash
cd frontend
cp .env.example .env.local
# paste URL + anon key into .env.local
```

Restart `npm start` after editing `.env.local`.

## 3. Create tables + security
1. Supabase → **SQL Editor**
2. Paste and run `frontend/supabase/schema.sql`

## 4. Create admin user
1. Supabase → **Authentication → Users → Add user**
2. Email + strong password (auto-confirm)
3. **Authentication → Providers → Email**: turn **OFF** “Enable sign ups” so only you can be admin

Login at `/admin/login` with that **email** + password.

## 5. Seed products (images in Supabase Storage)
1. Supabase → **Project Settings → API** → copy **service_role** key  
2. Add to `frontend/.env.local` (do not commit):

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret
```

3. Run:

```bash
cd frontend
npm run seed:supabase
```

This uploads product images into the `product-images` bucket and inserts catalogue rows.

## 6. Deploy on Hostinger Single
```bash
cd frontend
npm run build
```
Upload contents of `frontend/build/` to `public_html`.  
SPA routing uses `public/.htaccess`.

## 7. SEO (after domain is live)
1. Set in `.env.local` before build:
   ```env
   REACT_APP_SITE_URL=https://javionfasteners.com
   ```
2. Update `public/robots.txt` and `public/sitemap.xml` if the domain changes from `javionfasteners.com`.
3. Rebuild (`npm run build`) and upload `build/`.
4. In [Google Search Console](https://search.google.com/search-console), add the property and submit `https://javionfasteners.com/sitemap.xml`.

## 8. AEO (Answer Engine Optimization)
Already included in the app:
- Rich JSON-LD (`Organization`, `WebSite`, `FAQPage`, `Product`, breadcrumbs)
- Visible FAQ on `/contact` (short, citable answers)
- `public/llms.txt` at `https://javionfasteners.com/llms.txt` for AI crawlers

Keep FAQ answers factual and update contact details in `src/mock.js` + `public/llms.txt` when they change.

## 9. GEO (Generative Engine Optimization)
Already included:
- Quotable entity definition on `/about` (+ speakable markup on home)
- `LocalBusiness` schema with Rajkot geo coordinates
- `AboutPage` + `HowTo` (request a quote) schema
- Expanded `llms.txt` for generative citations

Update plant coordinates in `src/seo/geo.js` if you have exact GPS for the facility.

## Security notes
- Never put the **service_role** key in the frontend bundle or git
- Use only the **anon** key in `REACT_APP_SUPABASE_*`
- RLS: public reads published products; logged-in admin can CRUD
- Images live in Storage bucket `product-images`

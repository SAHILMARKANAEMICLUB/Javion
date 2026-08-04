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

## Security notes
- Never put the **service_role** key in the frontend bundle or git
- Use only the **anon** key in `REACT_APP_SUPABASE_*`
- RLS: public reads published products; logged-in admin can CRUD
- Images live in Storage bucket `product-images`

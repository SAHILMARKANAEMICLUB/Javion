# Javion — Go Live Guide (Hosting + GoDaddy Domain)

This project’s public site lives in the `frontend` folder (React / Create React App).  
Use this guide to build it, host it, and point your GoDaddy domain to it.

---

## What you are deploying

| Item | Detail |
|------|--------|
| App folder | `frontend/` |
| Build command | `npm run build` |
| Output folder | `frontend/build/` |
| App type | Single-page app (React Router) |

After build, upload/serve the **contents of `frontend/build/`** — not the whole repo.

---

## Step 1 — Build the website locally

On your Mac, open Terminal and run:

```bash
cd /path/to/Javion/frontend
npm install --legacy-peer-deps
npm run build
```

When it finishes, you will have a production folder:

```text
frontend/build/
```

That folder is what goes on hosting.

**Optional check:** open `frontend/build/index.html` in a browser. Static assets should load. Routes like `/cinematic` need a host that supports SPA rewrites (covered below).

---

## Step 2 — Choose a host

Pick one option. For a React marketing site, **Netlify** or **Vercel** is simplest.  
**cPanel / shared hosting** works if you already have it from GoDaddy or another provider.

### Option A — Netlify (recommended, free tier)

1. Create an account at [https://www.netlify.com](https://www.netlify.com).
2. Click **Add new site → Import an existing project** (connect GitHub), **or** drag & drop the `frontend/build` folder.
3. If deploying from GitHub:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - Under **Environment**, if install fails: set `NPM_FLAGS=--legacy-peer-deps` (or use Netlify’s install command override).
4. Deploy. Netlify gives you a URL like `https://random-name.netlify.app`.

**SPA routing (required for `/cinematic`, `/old`, etc.):**  
Create this file in the frontend folder **before** build, or add it so it ends up in `build/`:

`frontend/public/_redirects`

```text
/*    /index.html   200
```

Create React App copies everything from `public/` into `build/`. Redeploy after adding this file.

### Option B — Vercel (recommended, free tier)

1. Create an account at [https://vercel.com](https://vercel.com).
2. Import the GitHub repo.
3. Settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - Install: if needed, use `npm install --legacy-peer-deps`
4. Deploy. You get a URL like `https://your-project.vercel.app`.

Vercel usually handles React Router rewrites automatically for CRA-style apps. If a deep link 404s, add `frontend/vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Option C — GoDaddy / cPanel hosting (upload files)

1. Build locally (`npm run build` as in Step 1).
2. Log in to GoDaddy → **My Products** → your **Hosting** → **cPanel** (or File Manager).
3. Open **File Manager** → go to `public_html` (main domain) or the folder for your subdomain.
4. Upload **all files and folders inside** `frontend/build/` (including `index.html`, `static/`, etc.).
5. For React Router pages not to 404 on refresh, add this as `public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

6. Visit your temporary hosting URL to confirm the site loads.

---

## Step 3 — Connect your GoDaddy domain

You need two things:

1. A **live site** (Netlify / Vercel / cPanel URL from Step 2).
2. Your **domain** managed in GoDaddy (e.g. `javion.com`).

### 3A — Domain on Netlify

1. In Netlify → your site → **Domain management** → **Add a domain**.
2. Enter your domain (e.g. `javion.com` and optionally `www.javion.com`).
3. Netlify will show DNS records to add. Typical setup:

| Type | Name / Host | Value |
|------|-------------|--------|
| **A** | `@` | Netlify load balancer IP (shown in Netlify UI) |
| **CNAME** | `www` | `your-site-name.netlify.app` |

4. Open [GoDaddy DNS](https://dcc.godaddy.com/) → select your domain → **DNS** → **Manage DNS**.
5. Remove conflicting old **A** / **CNAME** / **Forwarding** records for `@` and `www` if they point elsewhere.
6. Add the **A** and **CNAME** records exactly as Netlify shows.
7. Save. Wait **15 minutes to 48 hours** for DNS (often under 1 hour).
8. In Netlify, enable **HTTPS** (Let’s Encrypt) — usually automatic after DNS verifies.

### 3B — Domain on Vercel

1. Vercel → your project → **Settings → Domains** → add `javion.com` and `www.javion.com`.
2. Vercel shows records. Common pattern:

| Type | Name | Value |
|------|------|--------|
| **A** | `@` | `76.76.21.21` (confirm in Vercel UI) |
| **CNAME** | `www` | `cname.vercel-dns.com` (confirm in Vercel UI) |

3. In GoDaddy → **DNS** → add those records.
4. Wait for DNS, then confirm HTTPS is active in Vercel.

### 3C — Domain already on GoDaddy hosting (cPanel)

If the site files are already in `public_html` for that domain:

1. GoDaddy → domain → **DNS**.
2. Ensure the domain uses GoDaddy’s **nameservers** (or points **A** record `@` to your hosting IP).
3. Your hosting control panel shows the correct **A record IP**.
4. Set:

| Type | Name | Value |
|------|------|--------|
| **A** | `@` | Your hosting IP |
| **CNAME** | `www` | `@` or your root domain |

5. Turn on **SSL** in cPanel (AutoSSL / Let’s Encrypt) or GoDaddy SSL product.

### Important GoDaddy tips

- Prefer **DNS records** (A + CNAME) over “Domain Forwarding” for a real site.
- Do **not** keep both forwarding and custom A/CNAME for the same host — pick one.
- `www` and root (`@`) are separate; set both if you want both to work.
- After changes, check propagation: [https://dnschecker.org](https://dnschecker.org).

---

## Step 4 — Verify the live site

1. Open `https://yourdomain.com` (and `https://www.yourdomain.com`).
2. Confirm:
   - Home / Coming Soon page loads
   - `/cinematic` works (and refresh does not 404)
   - Images and fonts load over HTTPS
3. If you see an old page, hard refresh (`Cmd+Shift+R`) or wait for CDN/DNS cache.

---

## Step 5 — Update the site later

Every time you change code:

```bash
cd frontend
npm install --legacy-peer-deps
npm run build
```

Then:

- **Netlify / Vercel (Git):** push to GitHub → auto redeploy.
- **Netlify / Vercel (manual):** upload new `build` folder or trigger redeploy.
- **cPanel:** upload the new contents of `frontend/build/` into `public_html` (overwrite).

---

## Quick checklist

- [ ] `npm run build` succeeds in `frontend/`
- [ ] Host is chosen (Netlify / Vercel / cPanel)
- [ ] SPA rewrite configured (`_redirects` / `vercel.json` / `.htaccess`)
- [ ] Test URL works before connecting domain
- [ ] GoDaddy DNS A + CNAME set to host values
- [ ] HTTPS is active
- [ ] Custom domain opens the site

---

## Local development (not production)

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

Open [http://localhost:3000](http://localhost:3000).

Useful routes:

| Path | Page |
|------|------|
| `/` | Coming Soon (home) |
| `/old` | Previous home |
| `/cinematic` | Cinematic page |
| `/new` | New page |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm install` peer dependency errors | Use `npm install --legacy-peer-deps` |
| Site works on host URL but not on domain | DNS not updated yet, or wrong A/CNAME values |
| `/cinematic` works once, 404 on refresh | Add SPA rewrite (`_redirects`, `vercel.json`, or `.htaccess`) |
| Mixed content / broken images | Use HTTPS and relative paths under `public/` |
| “Already up to date” but GitHub has changes | You may be pulling a different remote/repo than the one you edited |

---

## Need help deciding?

- **Easiest + free SSL + custom domain:** Netlify or Vercel + GoDaddy DNS only.  
- **You already pay for GoDaddy hosting:** upload `frontend/build/` to `public_html` + `.htaccess`.  
- **Keep domain at GoDaddy, host elsewhere:** leave nameservers on GoDaddy and only change A/CNAME records.

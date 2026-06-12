# Deploying DC Drip to Firebase

This app uses **TanStack Start (SSR)** built with Vite + Nitro. Firebase Hosting alone serves only static files, so for full SSR you need **Firebase Hosting + Cloud Functions** (already wired up here).

Firebase project: `dc-drip`
Firebase hosting site: `dc-drip`
Default Firebase URL: `https://dc-drip.web.app`
Preferred domains to connect in Firebase Hosting: `dc-drip.app`, `www.dc-drip.app`, `dcdrip.com`, and `www.dcdrip.com` if you own/control the DNS.

## Option A — Full SSR (Hosting + Cloud Functions)

```bash
# 1. Install deps
npm install

# 2. Build the app (outputs dist/client + dist/server)
npm run build

# 3. Copy the SSR server bundle into the functions folder
Remove-Item -Recurse -Force functions/server
Copy-Item -Recurse dist/server functions/server
cd functions && npm install && cd ..

# 4. Login + select your Firebase project
firebase login
firebase use dc-drip

# 5. Deploy
firebase deploy
```

`firebase.json` is already set up to:
- Serve static files (JS/CSS/images/`/videos/*`) from `dist/client`
- Rewrite every other request to the `ssr` Cloud Function
- Deploy to the `dc-drip` Firebase Hosting site

## Option B — Static / SPA only (Hosting only, cheaper, no SSR)

If you don't need server-side rendering, you can prerender the home page or build a SPA. The current setup is SSR-first; converting to SPA requires changes to `vite.config.ts` and route loaders. Reach out if you want me to do that conversion.

## Notes

- The testimonial videos live in `public/videos/` and are served statically by Firebase Hosting.
- Image assets in `src/assets/` are bundled by Vite into `dist/client/assets/`.
- Cloud Functions v2 requires the **Blaze (pay-as-you-go)** Firebase plan.

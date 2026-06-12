# Deploying to Firebase

This app uses **TanStack Start (SSR)** built with Vite + Nitro. Firebase Hosting alone serves only static files, so for full SSR you need **Firebase Hosting + Cloud Functions** (already wired up here).

## Option A — Full SSR (Hosting + Cloud Functions)

```bash
# 1. Install deps
bun install            # or: npm install

# 2. Build the app (outputs dist/client + dist/server)
bun run build          # or: npm run build

# 3. Copy the SSR server bundle into the functions folder
rm -rf functions/server
cp -r dist/server functions/server
cd functions && npm install && cd ..

# 4. Login + select your Firebase project
firebase login
firebase use --add     # pick your project, set alias = default
# (or edit .firebaserc and replace YOUR_FIREBASE_PROJECT_ID)

# 5. Deploy
firebase deploy
```

`firebase.json` is already set up to:
- Serve static files (JS/CSS/images/`/videos/*`) from `dist/client`
- Rewrite every other request to the `ssr` Cloud Function

## Option B — Static / SPA only (Hosting only, cheaper, no SSR)

If you don't need server-side rendering, you can prerender the home page or build a SPA. The current setup is SSR-first; converting to SPA requires changes to `vite.config.ts` and route loaders. Reach out if you want me to do that conversion.

## Notes

- The testimonial videos live in `public/videos/` and are served statically by Firebase Hosting.
- Image assets in `src/assets/` are bundled by Vite into `dist/client/assets/`.
- Cloud Functions v2 requires the **Blaze (pay-as-you-go)** Firebase plan.

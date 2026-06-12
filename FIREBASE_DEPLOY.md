# Deploying DC Drip to Firebase

This app deploys as a **static React app on Firebase Hosting** so it can stay on the Firebase Spark/free plan. It does not deploy Cloud Functions.

Firebase project: `dc-drip`
Firebase hosting site: `dc-drip`
Default Firebase URL: `https://dc-drip.web.app`
Preferred domains to connect in Firebase Hosting: `dc-drip.app`, `www.dc-drip.app`, `dcdrip.com`, and `www.dcdrip.com` if you own/control the DNS.

## Deploy on Spark / Free Firebase Hosting

```bash
# 1. Install deps
npm install

# 2. Build the app
npm run build

# 3. Login + select your Firebase project
firebase login
firebase use dc-drip

# 4. Deploy Hosting + Firestore rules/indexes
firebase deploy --project dc-drip
```

`firebase.json` is already set up to:
- Serve static files (JS/CSS/images/`/videos/*`) from `dist`
- Rewrite every route to `/index.html`
- Deploy to the `dc-drip` Firebase Hosting site

## Notes

- The testimonial videos live in `public/videos/` and are served statically by Firebase Hosting.
- Image assets in `src/assets/` are bundled by Vite into `dist/client/assets/`.
- Cloud Functions are intentionally not used because they require the **Blaze (pay-as-you-go)** Firebase plan.

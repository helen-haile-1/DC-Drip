// Firebase Cloud Function that serves the TanStack Start SSR build.
// Before `firebase deploy`, run from the project root:
//   bun install
//   bun run build
//   cp -r dist/server functions/server
//
// (or use the `predeploy` hook in firebase.json)
import { onRequest } from "firebase-functions/v2/https";
import handler from "./server/index.mjs";

export const ssr = onRequest({ region: "us-central1", memory: "512MiB" }, handler);

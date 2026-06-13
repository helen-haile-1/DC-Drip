import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { getRouter } from "./router";

if (
  window.location.hostname === "dc-drip.com" &&
  !window.location.pathname.startsWith("/app") &&
  !window.location.pathname.startsWith("/admin") &&
  !window.location.pathname.startsWith("/stats")
) {
  window.location.replace(
    `https://www.dc-drip.com${window.location.pathname}${window.location.search}${window.location.hash}`,
  );
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root was not found.");
}

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={getRouter()} />
  </StrictMode>,
);

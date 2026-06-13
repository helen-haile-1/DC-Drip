import { createFileRoute } from "@tanstack/react-router";

import { Home } from "./index";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "DC Drip App" },
      {
        name: "description",
        content:
          "Book DC Drip services, view treatments, and connect with the DC Drip team.",
      },
    ],
  }),
  component: Home,
});

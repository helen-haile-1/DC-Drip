import { createFileRoute } from "@tanstack/react-router";

import { StatsPage } from "./stats";

export const Route = createFileRoute("/admin.html")({
  head: () => ({
    meta: [
      { title: "DC Drip Admin" },
      { name: "description", content: "Private DC Drip admin dashboard." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: StatsPage,
});

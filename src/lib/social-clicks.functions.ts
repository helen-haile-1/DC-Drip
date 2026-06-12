import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { supabase } from "@/integrations/supabase/client";

const validateClick = (data: unknown) => {
  if (typeof data !== "object" || data === null) {
    return { platform: "unknown", url: "" };
  }
  const d = data as Record<string, unknown>;
  return {
    platform: typeof d.platform === "string" ? d.platform : "unknown",
    url: typeof d.url === "string" ? d.url : "",
  };
};

export const recordSocialClick = createServerFn({ method: "POST" })
  .inputValidator(validateClick)
  .handler(async ({ data }) => {
    const request = getRequest();

    const { error } = await supabase.from("social_clicks").insert({
      platform: data.platform,
      url: data.url,
      user_agent: request?.headers.get("user-agent") || null,
      referrer: request?.headers.get("referer") || null,
    });

    if (error) {
      console.error("[social_clicks] insert error:", error.message);
    }

    return { success: !error };
  });

export const getSocialClickStats = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("social_clicks")
      .select("platform")
      .order("clicked_at", { ascending: false });

    if (error) {
      console.error("[social_clicks] read error:", error.message);
      return [] as { platform: string; count: number }[];
    }

    const counts: Record<string, number> = {};
    for (const row of data || []) {
      counts[row.platform] = (counts[row.platform] || 0) + 1;
    }

    return Object.entries(counts)
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count);
  });

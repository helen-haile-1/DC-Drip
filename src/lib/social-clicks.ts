import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/integrations/firebase/client";

export async function recordSocialClick(input: { platform: string; url: string }) {
  try {
    await addDoc(collection(db, "social_clicks"), {
      platform: input.platform || "unknown",
      url: input.url || "",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      clicked_at: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.error("[social_clicks] write error:", err);
    return { success: false };
  }
}

export async function getSocialClickStats(): Promise<{ platform: string; count: number }[]> {
  const q = query(collection(db, "social_clicks"), orderBy("clicked_at", "desc"));
  const snap = await getDocs(q);
  const counts: Record<string, number> = {};
  snap.forEach((doc) => {
    const platform = (doc.data().platform as string) || "unknown";
    counts[platform] = (counts[platform] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([platform, count]) => ({ platform, count }))
    .sort((a, b) => b.count - a.count);
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { auth, googleProvider, ADMIN_EMAIL } from "@/integrations/firebase/client";
import { getSocialClickStats } from "@/lib/social-clicks";

const platformMeta: Record<string, { color: string; icon: string }> = {
  instagram: { color: "#E4405F", icon: "📸" },
  facebook: { color: "#1877F2", icon: "👍" },
  tiktok: { color: "#000000", icon: "🎵" },
  linkedin: { color: "#0A66C2", icon: "💼" },
  yelp: { color: "#FF1A1A", icon: "⭐" },
  whatsapp: { color: "#25D366", icon: "💬" },
  call: { color: "#34C759", icon: "📞" },
};

const formatNumber = (n: number) => n.toLocaleString();

export const Route = createFileRoute("/stats")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "DC Drip — Social Click Stats" },
      { name: "description", content: "Analytics dashboard for social media click tracking." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: StatsPage,
});

function StatsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signInError, setSignInError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  const { data: stats, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["social-click-stats", user?.uid],
    queryFn: () => getSocialClickStats(),
    refetchInterval: 10000,
    enabled: isAdmin,
  });

  const handleSignIn = async () => {
    setSignInError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setSignInError(err?.message || "Sign in failed");
    }
  };

  const handleSignOut = () => signOut(auth);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-sm w-full p-8 rounded-2xl bg-card border border-border text-center">
          <h1 className="font-display text-2xl font-bold text-gradient mb-2">Admin Sign In</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in with the DC Drip admin Google account to view click stats.
          </p>
          <button
            onClick={handleSignIn}
            className="w-full px-4 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            Sign in with Google
          </button>
          {signInError && <p className="text-xs text-red-500 mt-4">{signInError}</p>}
          <div className="mt-6">
            <a href="/" className="text-xs text-aqua hover:underline">← Back to DC Drip</a>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-sm w-full p-8 rounded-2xl bg-card border border-border text-center">
          <h1 className="font-display text-2xl font-bold mb-2">Access denied</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Signed in as <span className="font-medium">{user.email}</span>. This account isn't authorized.
          </p>
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-3 rounded-full bg-card border border-border font-semibold hover:bg-background transition"
          >
            Sign out
          </button>
          <div className="mt-6">
            <a href="/" className="text-xs text-aqua hover:underline">← Back to DC Drip</a>
          </div>
        </div>
      </div>
    );
  }

  const total = stats?.reduce((s, x) => s + x.count, 0) || 0;
  const maxCount = stats?.[0]?.count || 0;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8 gap-3 flex-wrap">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient">Social Click Stats</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Auto-refreshes every 10 seconds. Signed in as {user.email}.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:bg-aqua/10 transition"
            >
              Refresh
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:bg-background transition"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <div className="font-display text-4xl font-bold text-gradient">{formatNumber(total)}</div>
            <div className="text-sm text-muted-foreground mt-1">Total Clicks</div>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <div className="font-display text-4xl font-bold text-gradient">{stats?.length || 0}</div>
            <div className="text-sm text-muted-foreground mt-1">Active Platforms</div>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border text-center col-span-2 md:col-span-1">
            <div className="font-display text-4xl font-bold text-gradient">{stats?.[0]?.platform || "—"}</div>
            <div className="text-sm text-muted-foreground mt-1">Top Platform</div>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Platform Breakdown</h2>
            <span className="text-xs text-muted-foreground">{isFetching ? "Refreshing…" : "Live"}</span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading stats…</div>
          ) : !stats || stats.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-3">📊</div>
              <div className="text-muted-foreground">No clicks recorded yet.</div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {stats.map((stat) => {
                const meta = platformMeta[stat.platform.toLowerCase()] || { color: "#888888", icon: "🔗" };
                const percentage = total > 0 ? Math.round((stat.count / total) * 100) : 0;
                const barWidth = maxCount > 0 ? (stat.count / maxCount) * 100 : 0;
                return (
                  <div key={stat.platform} className="px-6 py-4 hover:bg-background/50 transition">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{meta.icon}</span>
                        <div>
                          <div className="font-semibold capitalize">{stat.platform}</div>
                          <div className="text-xs text-muted-foreground">{percentage}% of total clicks</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-2xl font-bold">{formatNumber(stat.count)}</div>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%`, backgroundColor: meta.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-aqua hover:underline">← Back to DC Drip</a>
        </div>
      </div>
    </div>
  );
}

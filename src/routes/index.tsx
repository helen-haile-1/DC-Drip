import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { recordSocialClick } from "@/lib/social-clicks";
import clientGlow from "@/assets/client-glow.jpg";
import dripDetail from "@/assets/drip-detail.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import heroIv from "@/assets/hero-iv.jpg";
import loungeFourChairs from "@/assets/lounge-four-chairs.jpg";
import ownerContact from "@/assets/owner-contact.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DC Drip - Luxury IV Therapy & Wellness in the DMV" },
      {
        name: "description",
        content:
          "Hydrate. Heal. Elevate. The DMV's premier IV therapy lounge with vitamin drips, NAD+, glutathione, and spa-level care.",
      },
      { property: "og:title", content: "DC Drip - Hydrate. Heal. Elevate." },
      {
        property: "og:description",
        content:
          "Premium IV therapy and integrative wellness in Washington DC.",
      },
    ],
  }),
  component: Home,
});

type View = "home" | "about" | "services" | "membership" | "stories" | "contact";

const bookUrl = "https://dc-drip.janeapp.com/";
const phone = "+12028435420";
const whatsappUrl =
  "https://wa.me/12028435420?text=Hi%20DC%20Drip%2C%20I%27d%20like%20to%20book%20an%20IV%20session.";
const heroBackgroundVideo = "/videos/iv-drip-hero.mp4";

const navItems: Array<[View, string]> = [
  ["home", "Home"],
  ["about", "About"],
  ["services", "Services"],
  ["membership", "Membership"],
  ["stories", "Client Stories"],
  ["contact", "Contact Us"],
];

const services = [
  ["Immune Boost", "Defense", "High-dose vitamin C, zinc and B-complex to fortify your body before stress hits."],
  ["Brain Boost", "Focus", "NAD+ and amino blends that sharpen clarity, memory and mental stamina."],
  ["Longevity", "Anti-Age", "Cellular regeneration with glutathione, NAD+ and antioxidants for radiant aging."],
  ["Hangover Rescue", "Recovery", "Rapid rehydration with anti-nausea, B12 and electrolytes."],
  ["The Athlete", "Performance", "Amino acids and electrolytes for endurance, repair and faster recovery."],
  ["Stress & Sleep", "Calm", "Magnesium, taurine and B-vitamins to dissolve tension and restore deep sleep."],
  ["Gut Health", "Reset", "Glutamine, vitamins and minerals that rebuild your microbiome from the inside."],
  ["Detox", "Cleanse", "Glutathione push to clear oxidative stress and brighten skin from within."],
  ["Mama Glow", "Pre & Post", "Pregnancy-safe hydration and nutrients curated for energy and radiant skin."],
];

const stats = [
  ["5,600+", "Drips administered"],
  ["45m", "Average session"],
  ["9", "Signature blends"],
  ["5-star", "Client rating"],
];

const gallery = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

function trackEvent(category: string, label: string, url?: string) {
  try {
    if (category === "social" || category === "floating") {
      recordSocialClick({ platform: label, url: url || "" }).catch(() => {});
    }
  } catch {
    // Tracking should never block booking.
  }
}

export function Home() {
  const [view, setView] = useState<View>("home");

  const selectView = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-white/92 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => selectView("home")}
            className="flex items-center gap-3 text-left"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cta-gradient shadow-glow" />
            <span className="font-display text-2xl font-bold text-deep">DC Drip</span>
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => selectView(key)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  view === key
                    ? "bg-aqua text-white"
                    : "text-muted-foreground hover:bg-secondary hover:text-deep"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <a
            href={bookUrl}
            onClick={() => trackEvent("cta", "header_book", bookUrl)}
            className="rounded-full bg-coral px-4 py-2.5 text-sm font-black text-white shadow-gold"
          >
            Book
          </a>
        </nav>

        <div className="flex gap-2 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
          {navItems.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => selectView(key)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                view === key ? "bg-aqua text-white" : "bg-secondary text-deep"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main>{renderView(view, selectView)}</main>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
        <a
          href={bookUrl}
          onClick={() => trackEvent("cta", "mobile_book", bookUrl)}
          className="rounded-full bg-coral px-4 py-3 text-center text-sm font-black text-white"
        >
          Book
        </a>
        <a
          href={whatsappUrl}
          onClick={() => trackEvent("floating", "whatsapp", whatsappUrl)}
          className="rounded-full border border-aqua/30 bg-aqua/10 px-4 py-3 text-center text-sm font-black text-aqua"
        >
          Text
        </a>
      </div>
    </div>
  );
}

function renderView(view: View, selectView: (view: View) => void) {
  switch (view) {
    case "about":
      return <AboutView />;
    case "services":
      return <ServicesView />;
    case "membership":
      return <MembershipView />;
    case "stories":
      return <StoriesView />;
    case "contact":
      return <ContactView />;
    default:
      return <HomeView selectView={selectView} />;
  }
}

function HomeView({ selectView }: { selectView: (view: View) => void }) {
  return (
    <section className="relative min-h-[calc(100svh-8rem)] overflow-hidden bg-deep px-4 py-14 text-white sm:px-6 md:min-h-[calc(100vh-5rem)]">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src={heroBackgroundVideo}
        poster={heroIv}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep/95 via-deep/70 to-aqua/35" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center py-14 md:min-h-[calc(100vh-10rem)]">
        <span className="w-fit rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
          Washington DC - Maryland - Virginia
        </span>
        <h1 className="mt-6 max-w-5xl font-display text-6xl font-light leading-[0.92] text-white sm:text-7xl lg:text-8xl">
          Hydrate. <span className="italic text-aqua">Heal.</span>
          <br />
          <span className="font-semibold">Elevate.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86">
          The DMV's most luxurious IV therapy lounge. Science-backed vitamin
          drips and integrative wellness, delivered in a spa-quiet space
          designed for your comeback.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={bookUrl} className="rounded-full bg-coral px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white">
            Book Your Session
          </a>
          <button type="button" onClick={() => selectView("services")} className="rounded-full border border-white/25 bg-white/12 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white">
            View Drips
          </button>
        </div>
        <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(([n, label]) => (
            <div key={label} className="rounded-2xl border border-white/14 bg-white/10 p-4 backdrop-blur">
              <div className="font-display text-3xl font-semibold">{n}</div>
              <div className="text-xs text-white/70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutView() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
        <img src={clientGlow} alt="Client relaxing during IV therapy" className="h-[24rem] w-full rounded-3xl object-cover shadow-glow" />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-aqua">Our Mission</p>
          <h2 className="mt-4 font-display text-5xl font-light leading-tight text-deep">
            Wellness isn't a trend. <span className="italic text-aqua">It's a ritual.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            DC Drip was founded by a husband-and-wife team on a simple belief:
            feeling extraordinary should feel effortless. We pair functional
            medicine with a spa retreat so you recover faster, think clearer,
            and show up as the best version of you.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServicesView() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-aqua">The Drip Menu</p>
        <h2 className="mt-4 font-display text-5xl font-light text-deep">
          Nine signature drips. <span className="italic text-aqua">One transformed you.</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([name, tag, desc]) => (
            <article key={name} className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-coral">{tag}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-deep">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MembershipView() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-deep text-white shadow-glow md:grid-cols-2">
        <img src={dripDetail} alt="IV drip detail" className="h-[24rem] w-full object-cover md:h-full" />
        <div className="p-8 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-aqua">DC Drip Premier</p>
          <h2 className="mt-4 font-display text-5xl font-light">Membership that pays you back.</h2>
          <p className="mt-5 leading-8 text-white/75">
            Two drips, two shots, and serious perks every month. Save up to 40%
            with our Premier Membership.
          </p>
          <div className="mt-8 font-display text-7xl font-semibold text-aqua">$299</div>
          <a href={bookUrl} className="mt-8 inline-flex rounded-full bg-coral px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white">
            Become a Member
          </a>
        </div>
      </div>
    </section>
  );
}

function StoriesView() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-aqua">Inside DC Drip</p>
        <h2 className="mt-4 font-display text-5xl font-light text-deep">A look at the lounge.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((src, index) => (
            <img key={src} src={src} alt={`DC Drip lounge ${index + 1}`} className="aspect-square w-full rounded-3xl object-cover shadow-sm" />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactView() {
  return (
    <section className="px-4 py-10 pb-28 sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <img src={ownerContact} alt="DC Drip owner" className="h-[30rem] w-full rounded-3xl object-cover object-center shadow-glow" />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-aqua">Contact Us</p>
          <h2 className="mt-4 font-display text-5xl font-light leading-tight text-deep">
            A real person will help you book.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Not sure which drip is right? Text, call, or book online. We will
            help match your goal to the right protocol.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <a href={whatsappUrl} onClick={() => trackEvent("floating", "whatsapp", whatsappUrl)} className="rounded-2xl border border-aqua/25 bg-aqua/10 p-5 font-black text-aqua">
              WhatsApp concierge
            </a>
            <a href={`tel:${phone}`} onClick={() => trackEvent("floating", "call", `tel:${phone}`)} className="rounded-2xl border border-orange-200 bg-orange-50 p-5 font-black text-coral">
              Call (202) 843-5420
            </a>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-white p-5 text-sm leading-7 text-muted-foreground">
            <strong className="text-deep">Visit:</strong> 600 Pennsylvania Ave SE,
            Suite 490, Washington, DC 20003
            <br />
            <strong className="text-deep">Hours:</strong> Mon-Sat 9 AM-7 PM,
            Sunday 10 AM-4 PM
          </div>
        </div>
      </div>
    </section>
  );
}

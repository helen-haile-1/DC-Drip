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
import nursePrep from "@/assets/nurse-prep.jpg";
import ownerContact from "@/assets/owner-contact.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DC Drip | Mobile IV Therapy & Wellness in DC" },
      {
        name: "description",
        content:
          "DC Drip brings premium IV hydration, vitamin therapy, recovery drips, and concierge wellness to Washington DC, Maryland, and Virginia.",
      },
      { property: "og:title", content: "DC Drip | Hydrate. Recover. Glow." },
      {
        property: "og:description",
        content:
          "Book premium IV therapy in the DMV with fast appointments, medical oversight, and concierge service.",
      },
    ],
  }),
  component: Home,
});

const bookUrl = "https://dc-drip.janeapp.com/";
const phone = "+12028435420";
const whatsappUrl =
  "https://wa.me/12028435420?text=Hi%20DC%20Drip%2C%20I%27d%20like%20to%20book%20an%20IV%20session.";

const heroVideo = "/videos/ch_one.mp4";
const storyVideos = [
  { src: "/videos/ch_one.mp4", label: "Inside the lounge" },
  { src: "/videos/ch_two.mp4", label: "Client experience" },
  { src: "/videos/ch_three.mp4", label: "Wellness reset" },
];

const services = [
  {
    name: "Hydration",
    price: "45 min",
    desc: "Fluids, electrolytes, and vitamins for fast refresh.",
    image: dripDetail,
  },
  {
    name: "Immune Boost",
    price: "Defense",
    desc: "Vitamin C, zinc, and B-complex support for busy weeks.",
    image: nursePrep,
  },
  {
    name: "Recovery",
    price: "Reset",
    desc: "Support for travel, workouts, headaches, and late nights.",
    image: clientGlow,
  },
  {
    name: "Longevity",
    price: "NAD+",
    desc: "NAD+, antioxidants, and glow-focused wellness protocols.",
    image: gallery5,
  },
];

const gallery = [
  { src: gallery1, alt: "Clients relaxing in the DC Drip lounge" },
  { src: gallery2, alt: "IV vitamin drip bags" },
  { src: gallery3, alt: "Client receiving wellness treatment" },
  { src: gallery4, alt: "Nurse preparing IV therapy" },
  { src: gallery6, alt: "Friends enjoying IV therapy together" },
  { src: loungeFourChairs, alt: "DC Drip lounge chairs" },
];

const socialLinks = [
  { label: "Instagram", platform: "instagram", href: "https://www.instagram.com/dc_drip/" },
  { label: "Facebook", platform: "facebook", href: "https://www.facebook.com/dcdrip" },
  { label: "TikTok", platform: "tiktok", href: "https://www.tiktok.com/@dcdrip" },
];

function trackEvent(category: string, label: string, url?: string) {
  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "link_click", category, label });

    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "click", {
        event_category: category,
        event_label: label,
      });
    }

    if (category === "social" || category === "floating") {
      recordSocialClick({ platform: label, url: url || "" }).catch(() => {});
    }
  } catch {
    // Analytics should never block booking.
  }
}

function Home() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const isAppVersion =
    typeof window !== "undefined" &&
    (window.location.hostname === "dc-drip.app" ||
      window.location.hostname.endsWith(".dc-drip.app") ||
      window.location.search.includes("app=1"));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3" aria-label="DC Drip home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-black text-white shadow-glow">
              DC
            </span>
            <span>
              <span className="block font-display text-xl font-bold leading-none text-deep">
                DC Drip
              </span>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-aqua sm:block">
                IV Therapy
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-bold text-deep md:flex">
            <a href="#services" className="hover:text-aqua">
              Services
            </a>
            <a href="#how" className="hover:text-aqua">
              How it works
            </a>
            <a href="#stories" className="hover:text-aqua">
              Videos
            </a>
            <a href="#contact" className="hover:text-aqua">
              Contact
            </a>
          </div>

          <a
            href={bookUrl}
            onClick={() => trackEvent("cta", "header_book", bookUrl)}
            className="rounded-full bg-coral px-4 py-2.5 text-sm font-black text-white shadow-gold transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            Book Now
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="overflow-hidden bg-white">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 md:grid-cols-[0.95fr_1.05fr] md:py-14">
            <div className="order-2 md:order-1">
              <div className="mb-4 inline-flex rounded-full border border-aqua/25 bg-aqua/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-aqua">
                DC - Maryland - Virginia
              </div>
              <h1 className="font-display text-5xl font-black leading-[0.95] text-deep sm:text-6xl lg:text-7xl">
                {isAppVersion
                  ? "Book your drip in seconds."
                  : "Mobile IV therapy with a luxury lounge feel."}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                {isAppVersion
                  ? "A fast app-style experience for hydration, recovery, immune support, NAD+, and glow-focused wellness."
                  : "Hydration, recovery, immune support, NAD+, and glow-focused wellness delivered with medical oversight and concierge care."}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={bookUrl}
                  onClick={() => trackEvent("cta", "hero_book", bookUrl)}
                  className="inline-flex items-center justify-center rounded-full bg-coral px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-gold transition hover:-translate-y-0.5"
                >
                  Book your drip
                </a>
                <a
                  href={whatsappUrl}
                  onClick={() => trackEvent("floating", "whatsapp", whatsappUrl)}
                  className="inline-flex items-center justify-center rounded-full border border-aqua/30 bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-aqua transition hover:bg-aqua/10"
                >
                  Text concierge
                </a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ["45m", "Average visit"],
                  ["5-star", "Client care"],
                  ["DMV", "Concierge"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-border bg-white p-4">
                    <div className="font-display text-2xl font-black text-aqua">{value}</div>
                    <div className="mt-1 text-xs font-bold text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-aqua/15 bg-aqua/10 shadow-glow">
                <video
                  className="aspect-[4/5] w-full object-cover sm:aspect-[16/11] md:aspect-[4/5] lg:aspect-[16/11]"
                  poster={heroIv}
                  src={heroVideo}
                  autoPlay
                  muted
                  playsInline
                  loop
                />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 p-4 shadow-glow backdrop-blur">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-coral">
                    Same-day requests
                  </div>
                  <div className="mt-1 font-display text-2xl font-black text-deep">
                    Lounge, office, hotel, event, or home.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40 px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-7xl snap-x gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">
            {["Hydration", "Recovery", "Immune", "NAD+ / Glow"].map((item) => (
              <a
                key={item}
                href="#services"
                className="min-w-[11rem] snap-start rounded-full border border-aqua/20 bg-white px-5 py-3 text-center text-sm font-black text-deep shadow-sm hover:bg-aqua/10"
              >
                {item}
              </a>
            ))}
          </div>
        </section>

        <section id="services" className="px-4 py-14 sm:px-6 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-aqua">
                  Signature menu
                </p>
                <h2 className="mt-2 font-display text-4xl font-black text-deep md:text-5xl">
                  Pick how you want to feel.
                </h2>
              </div>
              <a
                href={bookUrl}
                onClick={() => trackEvent("cta", "services_book", bookUrl)}
                className="inline-flex rounded-full bg-deep px-6 py-3 text-sm font-black text-white"
              >
                View booking portal
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article
                  key={service.name}
                  className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-glow"
                >
                  <img
                    src={service.image}
                    alt=""
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-2xl font-black text-deep">
                        {service.name}
                      </h3>
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-coral">
                        {service.price}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {service.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className={`${isAppVersion ? "hidden md:block" : ""} bg-white px-4 py-14 sm:px-6 md:py-20`}>
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-aqua">
                Simple flow
              </p>
              <h2 className="mt-2 font-display text-4xl font-black text-deep md:text-5xl">
                Book fast. Drip easy.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Designed for mobile: tap, book, confirm, and arrive. No long
                maze of pages.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Choose", "Pick a drip or ask us to recommend one."],
                ["02", "Confirm", "Our team confirms timing and intake details."],
                ["03", "Recover", "Relax in the lounge or book concierge care."],
              ].map(([num, title, text]) => (
                <div key={num} className="rounded-2xl border border-border bg-background p-5">
                  <div className="font-display text-3xl font-black text-coral">{num}</div>
                  <h3 className="mt-3 text-xl font-black text-deep">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="stories" className={`${isAppVersion ? "py-10 md:py-20" : "py-14 md:py-20"} px-4 sm:px-6`}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-aqua">
                  Real visuals
                </p>
                <h2 className="font-display text-4xl font-black text-deep md:text-5xl">
                  See the DC Drip experience.
                </h2>
              </div>
              <p className="max-w-lg text-muted-foreground">
                Video, clients, treatments, and lounge photography are brought
                forward so the mobile site feels immediate and real.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {storyVideos.map((video) => (
                <div key={video.src} className="overflow-hidden rounded-2xl border border-border bg-white">
                  <video
                    className="aspect-video w-full object-cover"
                    src={video.src}
                    controls
                    playsInline
                    preload="metadata"
                  />
                  <div className="p-4 text-sm font-black text-deep">{video.label}</div>
                </div>
              ))}
            </div>

            <div className={`${isAppVersion ? "hidden md:grid" : "grid"} mt-4 grid-cols-2 gap-3 md:grid-cols-6`}>
              {gallery.map((image) => (
                <button
                  type="button"
                  key={image.src}
                  className="group aspect-square overflow-hidden rounded-2xl border border-border bg-white"
                  onClick={() => setActiveImage(image.src)}
                  aria-label={`Open image: ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={`${isAppVersion ? "hidden md:block" : ""} bg-deep px-4 py-14 text-white sm:px-6 md:py-20`}>
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-aqua">
                Membership + events
              </p>
              <h2 className="mt-2 font-display text-4xl font-black text-white md:text-5xl">
                Keep your wellness routine on schedule.
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-white/75">
                Book recurring hydration, office wellness days, athletic recovery,
                wedding weekends, and concierge visits across the DMV.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={bookUrl}
                  onClick={() => trackEvent("cta", "membership_book", bookUrl)}
                  className="rounded-full bg-coral px-7 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white"
                >
                  Book now
                </a>
                <a
                  href={`tel:${phone}`}
                  onClick={() => trackEvent("floating", "call", `tel:${phone}`)}
                  className="rounded-full border border-white/25 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white"
                >
                  Call DC Drip
                </a>
              </div>
            </div>
            <img
              src={heroIv}
              alt="Client receiving IV therapy"
              loading="lazy"
              className="h-[24rem] w-full rounded-[1.75rem] object-cover shadow-glow"
            />
          </div>
        </section>

        <section id="contact" className="bg-white px-4 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-secondary">
              <img
                src={ownerContact}
                alt="DC Drip owner"
                loading="lazy"
                className="h-[32rem] w-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-aqua">
                Contact us
              </p>
              <h2 className="mt-2 font-display text-4xl font-black text-deep md:text-5xl">
                A real person will help you book.
              </h2>
              <p className="mt-4 max-w-xl leading-8 text-muted-foreground">
                {isAppVersion
                  ? "Text, call, or book online. We will help you choose fast."
                  : "Not sure which drip is right? Text, call, or book online. We will help match your goal to the right protocol."}
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={whatsappUrl}
                  onClick={() => trackEvent("floating", "whatsapp", whatsappUrl)}
                  className="rounded-2xl border border-aqua/25 bg-aqua/10 p-5 font-black text-aqua"
                >
                  WhatsApp concierge
                  <span className="mt-1 block text-sm font-semibold text-muted-foreground">
                    Fastest way to ask questions.
                  </span>
                </a>
                <a
                  href={`tel:${phone}`}
                  onClick={() => trackEvent("floating", "call", `tel:${phone}`)}
                  className="rounded-2xl border border-orange-200 bg-orange-50 p-5 font-black text-coral"
                >
                  Call (202) 843-5420
                  <span className="mt-1 block text-sm font-semibold text-muted-foreground">
                    Speak with the team.
                  </span>
                </a>
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-background p-5 text-sm leading-7 text-muted-foreground">
                <strong className="text-deep">Visit:</strong> 600 Pennsylvania Ave SE,
                Suite 490, Washington, DC 20003
                <br />
                <strong className="text-deep">Hours:</strong> Mon-Sat 9 AM-7 PM,
                Sunday 10 AM-4 PM
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-white px-4 pb-24 pt-8 sm:px-6 md:pb-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-display text-2xl font-black text-deep">DC Drip</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Hydrate. Recover. Glow. Serving DC, Maryland, and Virginia.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("social", link.platform, link.href)}
                className="rounded-full border border-border px-4 py-2 text-sm font-black text-deep hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin/html"
              className="rounded-full border border-border px-4 py-2 text-sm font-black text-muted-foreground hover:bg-secondary"
            >
              Admin
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={bookUrl}
            onClick={() => trackEvent("cta", "mobile_sticky_book", bookUrl)}
            className="rounded-full bg-coral px-4 py-3 text-center text-sm font-black text-white"
          >
            Book
          </a>
          <a
            href={whatsappUrl}
            onClick={() => trackEvent("floating", "mobile_sticky_whatsapp", whatsappUrl)}
            className="rounded-full border border-aqua/30 bg-aqua/10 px-4 py-3 text-center text-sm font-black text-aqua"
          >
            Text
          </a>
        </div>
      </div>

      {activeImage && (
        <button
          type="button"
          className="fixed inset-0 z-[70] grid cursor-zoom-out place-items-center bg-deep/90 p-4"
          onClick={() => setActiveImage(null)}
          aria-label="Close image preview"
        >
          <img
            src={activeImage}
            alt=""
            className="max-h-[86vh] max-w-full rounded-2xl object-contain shadow-glow"
          />
        </button>
      )}
    </div>
  );
}

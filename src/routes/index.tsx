import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { recordSocialClick } from "@/lib/social-clicks";
import heroIv from "@/assets/hero-iv.jpg";
import dripDetail from "@/assets/drip-detail.jpg";
import clientGlow from "@/assets/client-glow.jpg";
import nursePrep from "@/assets/nurse-prep.jpg";
import membershipBg from "@/assets/membership-bg.jpg";
import ownerContact from "@/assets/owner-contact.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import loungeFourChairs from "@/assets/lounge-four-chairs.jpg";
// Videos are served from /public/videos so they work on any static host (Firebase, Netlify, etc.)
const chOne = { url: "/videos/ch_one.mp4" };
const chTwo = { url: "/videos/ch_two.mp4" };
const chThree = { url: "/videos/ch_three.mp4" };
const heroBackgroundVideo = "/videos/iv-drip-hero.mp4";
const nurseCareVideo = "/videos/nurse-care.mp4";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DC Drip — Luxury IV Therapy & Wellness in the DMV" },
      { name: "description", content: "Hydrate. Heal. Elevate. The DMV's premier IV therapy lounge — vitamin drips, NAD+, glutathione, and recovery treatments delivered with spa-level care." },
      { property: "og:title", content: "DC Drip — Luxury IV Therapy" },
      { property: "og:description", content: "Premium IV therapy and integrative wellness in Washington DC." },
    ],
  }),
  component: Home,
});

const services = [
  { name: "Immune Boost", tag: "Defense", desc: "High-dose vitamin C, zinc and B-complex to fortify your body before stress hits.", emoji: "🛡️" },
  { name: "Brain Boost", tag: "Focus", desc: "NAD+ and amino blends that sharpen clarity, memory and mental stamina.", emoji: "🧠" },
  { name: "Longevity", tag: "Anti-Age", desc: "Cellular regeneration with glutathione, NAD+ and antioxidants for radiant aging.", emoji: "✨" },
  { name: "Hangover Rescue", tag: "Recovery", desc: "Rapid rehydration with anti-nausea, B12 and electrolytes — back on your feet in 45 min.", emoji: "🍾" },
  { name: "The Athlete", tag: "Performance", desc: "Amino acids and electrolytes for endurance, repair and faster recovery.", emoji: "🏃" },
  { name: "Stress & Sleep", tag: "Calm", desc: "Magnesium, taurine and B-vitamins to dissolve tension and restore deep sleep.", emoji: "🌙" },
  { name: "Gut Health", tag: "Reset", desc: "Glutamine, vitamins and minerals that rebuild your microbiome from the inside.", emoji: "🌱" },
  { name: "Detox", tag: "Cleanse", desc: "Glutathione push to clear oxidative stress and brighten skin from within.", emoji: "💧" },
  { name: "Mama Glow", tag: "Pre & Post", desc: "Pregnancy-safe hydration and nutrients curated for energy and radiant skin.", emoji: "🤍" },
];

const stats = [
  { n: "5,600+", l: "Drips administered" },
  { n: "45m", l: "Average session" },
  { n: "9", l: "Signature blends" },
  { n: "5★", l: "Client rating" },
];

const clientele = [
  { icon: "🏈", t: "School & college athletics", d: "Pre-game hydration and post-game recovery for football, basketball and track teams across the DMV." },
  { icon: "🏆", t: "Sporting events & tournaments", d: "On-site IV crews for marathons, combine days, tournaments and weekend warriors." },
  { icon: "🎤", t: "Touring artists & performers", d: "VIP backstage hydration for musicians, DJs and entertainers between sets and shows." },
  { icon: "🥂", t: "Parties, brunches & weddings", d: "Group drip experiences for bachelorette weekends, birthdays, brunches and wedding parties." },
  { icon: "🏢", t: "Offices & corporate wellness", d: "Wellness days, exec retreats and team perks — we bring the lounge to your workplace." },
  { icon: "📸", t: "Influencers & creators", d: "Camera-ready glow, energy for shoot days, and recovery between long content schedules." },
  { icon: "💻", t: "Remote professionals", d: "Take meetings, answer email and ship work from a heated chair while you drip." },
  { icon: "🩹", t: "Post-surgical recovery", d: "Gentle protocols to support healing, reduce inflammation and restore nutrients after procedures." },
  { icon: "🤒", t: "Illness, headaches & migraines", d: "Rapid rehydration and targeted vitamin support when you're run down or under the weather." },
  { icon: "🎗️", t: "Oncology & chronic-care support", d: "Adjunctive hydration and nutrient support coordinated with your care team during treatment & recovery." },
];

const reviews = [
  { name: "Jasmine R.", role: "Founder, DC", quote: "DC Drip completely changed my mornings. I walk in foggy and walk out lit up — sharper, calmer, glowing. It's my non-negotiable monthly ritual." },
  { name: "Marcus T.", role: "Marathon runner", quote: "The Athlete drip cut my recovery time in half. The space feels like a five-star hotel, the staff feels like family." },
  { name: "Lena S.", role: "Mom of two", quote: "Mama Glow saved my postpartum energy. I haven't felt this human in years. Truly the best wellness investment I've made." },
];

const faqs = [
  { q: "Is IV therapy safe?", a: "Absolutely. Every drip is reviewed by our medical director and administered by board-certified RNs using pharmaceutical-grade, FDA-approved ingredients. We complete a medical intake for every client before treatment." },
  { q: "How long does a session take?", a: "Most drips run 30–45 minutes. NAD+ and longevity protocols can take 60–90 minutes. You can work, nap, stream, or simply unplug in our lounge while you receive your treatment." },
  { q: "How quickly will I feel results?", a: "Most clients feel a noticeable lift — energy, clarity, hydration — before they even leave the chair. Recovery and immune effects build over the following 24–48 hours." },
  { q: "How often should I come in?", a: "It depends on your goals. Performance and longevity clients typically drip weekly or bi-weekly. Recovery and immune support can be as-needed. Our team will build a cadence with you." },
  { q: "Do you offer concierge or at-home drips?", a: "Yes. We bring DC Drip to homes, hotels, offices and events across DC, Maryland and Virginia. Reach out for concierge pricing and scheduling." },
  { q: "Do you accept HSA / FSA?", a: "Many of our treatments are HSA/FSA eligible. We provide itemized receipts you can submit to your plan administrator." },
];

const trustBadges = [
  { label: "Board-certified RNs", icon: "⚕️" },
  { label: "Pharmaceutical-grade", icon: "🧪" },
  { label: "Medical director on staff", icon: "🩺" },
  { label: "HSA / FSA friendly", icon: "💳" },
  { label: "Concierge & in-home", icon: "🏡" },
  { label: "5★ rated in the DMV", icon: "⭐" },
];

const gallery = [
  { src: gallery1, alt: "Diverse clients relaxing in DC Drip's luxury IV lounge", caption: "Our inclusive wellness lounge" },
  { src: gallery2, alt: "Colorful pharmaceutical-grade IV vitamin drip bags", caption: "Premium vitamin blends" },
  { src: gallery3, alt: "Beautiful Black woman glowing during her IV therapy session", caption: "Radiant results" },
  { src: gallery4, alt: "South Asian nurse preparing IV therapy with care", caption: "Expert medical team" },
  { src: gallery5, alt: "Artful flat lay of curated vitamins, supplements and wellness products", caption: "Curated formulas" },
  { src: gallery6, alt: "Diverse friends enjoying IV therapy together and laughing", caption: "Wellness, together" },
];

// Lightweight click tracking for social links + key CTAs
function trackEvent(category: string, label: string, url?: string) {
  try {
    // dataLayer for GA4 / GTM if present
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "link_click", category, label });
    // gtag fallback
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "click", { event_category: category, event_label: label });
    }
    // persistent backend tracking for social buttons
    if (category === "social" || category === "floating") {
      recordSocialClick({ platform: label, url: url || "" }).catch(() => {});
    }
    // dev visibility
    if (import.meta.env.DEV) console.log("[track]", category, label);
  } catch {}
}

export function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [bookSent, setBookSent] = useState(false);
  const todayStr = new Date().toISOString().split("T")[0];
  const timeSlots = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"];

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim().slice(0, 100);
    const phone = String(fd.get("phone") || "").trim().slice(0, 30);
    const email = String(fd.get("email") || "").trim().slice(0, 255);
    const drip = String(fd.get("drip") || "").slice(0, 60);
    const date = String(fd.get("date") || "");
    const time = String(fd.get("time") || "");
    if (!name || !phone || !date || !time) return;
    trackEvent("booking", "footer_form_submit");
    const msg = `Hi DC Drip! I'd like to book ${drip || "an IV session"} on ${date} at ${time}. Name: ${name}, Phone: ${phone}${email ? `, Email: ${email}` : ""}.`;
    window.open(`https://wa.me/12028435420?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setBookSent(true);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => setLightboxIndex(i => (i === null ? i : (i + 1) % gallery.length)), []);
  const prevImage = useCallback(() => setLightboxIndex(i => (i === null ? i : (i - 1 + gallery.length) % gallery.length)), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);



  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""}`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-display text-2xl font-bold">
            <span className="inline-block w-8 h-8 rounded-full bg-hero-gradient shadow-glow animate-pulse-glow" />
            <span className="text-gradient">DC Drip</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
            <a href="#top" className="hover:text-aqua transition">Home</a>
            <a href="#about" className="hover:text-aqua transition">About</a>
            <a href="#services" className="hover:text-aqua transition">Services</a>
            <a href="#membership" className="hover:text-aqua transition">Membership</a>
            <a href="#reviews" className="hover:text-aqua transition">Client Stories</a>
            <a href="#refer" className="hover:text-aqua transition">Refer</a>
            <a href="#appointment" className="hover:text-aqua transition">Contact Us</a>
          </div>

          <a href="https://dc-drip.janeapp.com/" className="rounded-full px-5 py-2.5 text-sm font-semibold bg-cta-gradient text-primary-foreground shadow-glow hover:scale-105 transition">
            Book a Drip
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-[92svh] overflow-hidden bg-deep pt-28 text-white md:min-h-screen md:pt-40">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-65"
          src={heroBackgroundVideo}
          poster={heroIv}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep/95 via-deep/68 to-aqua/38" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(255,117,64,0.20),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 opacity-35">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-aqua/40 blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-coral/25 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative mx-auto flex min-h-[calc(92svh-7rem)] max-w-7xl items-center px-6 pb-20 md:min-h-[calc(100vh-10rem)] md:pb-28">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 backdrop-blur border border-white/20 text-xs font-semibold tracking-widest uppercase text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" /> Washington DC · Maryland · Virginia
            </span>
            <h1 className="mt-6 max-w-5xl font-display text-5xl font-light leading-[0.95] text-white drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl">
              Hydrate. <span className="italic font-normal text-aqua">Heal.</span><br />
              <span className="font-semibold">Elevate.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/86 md:text-xl">
              The DMV's most luxurious IV therapy lounge. Science-backed vitamin drips and integrative wellness, delivered in a spa-quiet space designed for your comeback.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="https://dc-drip.janeapp.com/" className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-full bg-coral text-white font-semibold shadow-glow hover:scale-[1.03] transition">
                Book Your Session
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
              <a href="#membership" className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/25 bg-white/12 backdrop-blur font-semibold text-white hover:bg-white/20 transition">
                Join Membership
              </a>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map(s => (
                <div key={s.l} className="rounded-2xl border border-white/14 bg-white/10 p-4 backdrop-blur">
                  <div className="font-display text-3xl md:text-4xl font-semibold text-white">{s.n}</div>
                  <div className="text-xs text-white/70 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-6 border-y border-border bg-card/40 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-2xl md:text-3xl text-muted-foreground">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              Hydrate <span className="text-gold">✦</span> Heal <span className="text-aqua">✦</span> Elevate <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-10 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {trustBadges.map(b => (
            <div key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-lg">{b.icon}</span>
              <span className="font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-glow md:grid-cols-[1.1fr_0.9fr]">
          <video
            className="h-[22rem] w-full object-cover md:h-full"
            src={nurseCareVideo}
            poster={nursePrep}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="text-xs uppercase tracking-[0.3em] text-aqua font-semibold">
              Medically supervised
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-light leading-tight">
              Board-certified care, calm from start to finish.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Every treatment is reviewed by our medical team and administered
              with the same spa-level attention that makes DC Drip feel
              personal, polished, and safe.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
<img src={clientGlow} alt="Hispanic woman relaxing during IV therapy session in luxury wellness lounge" loading="lazy" width={1280} height={1280} className="rounded-3xl object-cover w-full h-[560px] shadow-glow" />
            <div className="absolute -bottom-8 -right-4 md:-right-12 w-56 p-6 rounded-2xl bg-card border border-border shadow-gold">
              <div className="text-xs uppercase tracking-widest text-gold">Since day one</div>
              <div className="mt-2 font-display text-2xl font-semibold">Wellness, made personal.</div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-aqua font-semibold">Our Mission</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-light leading-tight">
              Wellness isn't a trend.<br /><span className="italic text-gradient">It's a ritual.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              DC Drip was founded by a husband-and-wife team on a simple belief: feeling extraordinary should feel effortless. We pair functional medicine with a spa retreat — so you recover faster, think clearer, and show up as the best version of you.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {[
                { t: "Science-backed", d: "Pharmaceutical-grade vitamins, evidence-led formulations." },
                { t: "Spa-level care", d: "Heated chairs, ambient lighting, complimentary refreshments." },
                { t: "DMV's finest", d: "Conveniently located, with on-site & concierge options." },
                { t: "Membership perks", d: "Save up to 40% with our Premier Membership." },
              ].map(item => (
                <div key={item.t} className="p-5 rounded-2xl bg-card border border-border">
                  <div className="font-display text-lg font-semibold">{item.t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 relative bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-aqua font-semibold">The Drip Menu</div>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-light leading-tight">
                Nine signature drips. <br /><span className="text-gradient italic">One transformed you.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Each blend is formulated by our medical team for a specific goal — from immunity to longevity, athletic recovery to deep rest.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.name} className="group relative p-7 rounded-3xl bg-background border border-border hover:border-aqua/50 transition-all hover:-translate-y-1 hover:shadow-glow overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-hero-gradient opacity-0 group-hover:opacity-20 blur-3xl transition-opacity" />
                <div className="flex items-center justify-between mb-5">
                  <div className="text-4xl">{s.emoji}</div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gold/90 px-2.5 py-1 rounded-full border border-gold/30">{s.tag}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-6 text-sm font-semibold text-aqua opacity-0 group-hover:opacity-100 transition">
                  Add to your visit →
                </div>
                <div className="absolute bottom-3 left-7 text-[10px] text-muted-foreground/50 font-mono">0{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section id="clientele" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-aqua font-semibold">Who we serve</div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-light leading-tight">
              From locker rooms to <span className="italic text-accent-warm">green rooms.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            DC Drip partners with teams, brands, venues and individuals across the DMV — wherever performance, recovery and presence matter.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clientele.map((c) => (
            <div key={c.t} className="group p-7 rounded-3xl bg-card border border-border hover:border-aqua/50 transition hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-cta-gradient flex items-center justify-center text-2xl shadow-glow">
                <span>{c.icon}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="mailto:concierge@dcdrip.com" className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-cta-gradient text-primary-foreground font-semibold shadow-glow hover:scale-[1.03] transition">
            Book concierge or group drips →
          </a>
        </div>
      </section>

      {/* LOUNGE BANNER */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] border border-border shadow-glow">
          <img
            src={loungeFourChairs}
            alt="Four diverse clients receiving IV vitamin therapy side by side in DC Drip's luxury lounge — a Black woman, an Asian woman, a white man, and a Hispanic man"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-[420px] md:h-[560px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-xl">
              <div className="text-xs uppercase tracking-[0.3em] text-aqua font-semibold">Inside the lounge</div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                Four chairs. <span className="italic text-accent-warm">One ritual.</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-md">
                Bring a friend, your partner, your team — drip together in our private group lounge.
              </p>
            </div>
            <a href="https://dc-drip.janeapp.com/" className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-cta-gradient text-primary-foreground font-semibold shadow-glow hover:scale-[1.03] transition self-start md:self-auto">
              Book a group session →
            </a>
          </div>
        </div>
      </section>

      {/* DRIP DETAIL / FEATURE */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 relative">
<img src={dripDetail} alt="Athlete receiving recovery IV vitamin drip treatment" loading="lazy" width={1280} height={1600} className="rounded-3xl object-cover w-full h-[600px] shadow-glow" />
            <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-background/80 backdrop-blur border border-border text-xs uppercase tracking-widest font-semibold">
              Pharmaceutical-grade
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">How it works</div>
            <h2 className="mt-4 font-display text-5xl md:text-6xl font-light leading-tight">
              Three steps to <span className="italic text-gradient">your reset.</span>
            </h2>
            <div className="mt-10 space-y-6">
              {[
                { n: "01", t: "Consult", d: "Tell us how you want to feel. Our medical team curates the perfect blend." },
                { n: "02", t: "Recline", d: "Settle into a heated zero-gravity chair. Robe, refreshment, playlist — yours." },
                { n: "03", t: "Glow", d: "Walk out 45 minutes later hydrated, energized, and unmistakably lit up." },
              ].map(step => (
                <div key={step.n} className="flex gap-6 p-6 rounded-2xl bg-card border border-border hover:border-aqua/50 transition">
                  <div className="font-display text-4xl font-light text-gradient">{step.n}</div>
                  <div>
                    <div className="font-display text-2xl font-semibold">{step.t}</div>
                    <div className="mt-1 text-muted-foreground">{step.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="relative py-24 md:py-32 overflow-hidden">
        <img src={membershipBg} alt="" aria-hidden loading="lazy" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">DC Drip Premier</div>
          <h2 className="mt-4 font-display text-5xl md:text-7xl font-light leading-[1.05]">
            Membership that <span className="italic text-gradient">pays you back.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Two drips, two shots, and serious perks every month — for less than the cost of a single session.
          </p>

          <div className="mt-12 inline-flex items-baseline gap-3 font-display">
            <span className="text-7xl md:text-8xl font-semibold text-gradient">$299</span>
            <span className="text-muted-foreground text-xl">/month</span>
          </div>
          <div className="text-sm text-gold mt-2 font-semibold">$500+ value, every month</div>

          <div className="mt-12 grid md:grid-cols-3 gap-4 text-left">
            {[
              { t: "2 IV Therapy Sessions", v: "$400 value", d: "Pick any signature drip from our menu." },
              { t: "2 Vitamin Shots", v: "$100 value", d: "B12, glutathione, or biotin boosters." },
              { t: "40% Off Add-ons", v: "Unlimited", d: "Massage, stretch, and recovery services." },
            ].map(perk => (
              <div key={perk.t} className="p-7 rounded-3xl bg-card border border-border hover:border-gold/50 transition group">
                <div className="text-xs uppercase tracking-widest text-gold font-semibold">{perk.v}</div>
                <div className="mt-3 font-display text-2xl font-semibold">{perk.t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{perk.d}</div>
              </div>
            ))}
          </div>

          <a href="https://dc-drip.janeapp.com/" className="mt-12 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-hero-gradient text-primary-foreground font-semibold shadow-glow hover:scale-[1.03] transition">
            Become a Member <span>→</span>
          </a>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-aqua font-semibold">Client Stories</div>
          <h2 className="mt-4 font-display text-5xl md:text-6xl font-light">
            Real people. <span className="italic text-gradient">Real glow.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <figure key={r.name} className={`p-8 rounded-3xl border border-border ${i === 1 ? "bg-hero-gradient text-primary-foreground" : "bg-card"}`}>
              <div className="text-3xl text-gold mb-4">★★★★★</div>
              <blockquote className={`text-lg leading-relaxed ${i === 1 ? "" : "text-foreground"}`}>
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-border/40">
                <div className="font-semibold">{r.name}</div>
                <div className={`text-sm ${i === 1 ? "opacity-80" : "text-muted-foreground"}`}>{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* VIDEO TESTIMONIALS */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-[0.3em] text-aqua font-semibold">In their words</div>
            <h3 className="mt-3 font-display text-3xl md:text-4xl font-light">
              Hear how they <span className="italic text-gradient">feel after the drip.</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-md sm:max-w-none mx-auto">
            {[chOne, chTwo, chThree].map((v, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-soft aspect-[9/16]">
                <video
                  src={v.url}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFER + REVIEW */}
      <section id="refer" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Referral card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-border p-10 md:p-14 bg-cta-gradient text-primary-foreground shadow-glow">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/15 blur-3xl" />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.3em] font-semibold opacity-90">Refer a friend</div>
              <h3 className="mt-4 font-display text-4xl md:text-5xl font-light leading-tight">
                Give <span className="font-semibold">$30.</span> <br />Get <span className="font-semibold">$30 back.</span>
              </h3>
              <p className="mt-5 text-base md:text-lg opacity-90 max-w-md leading-relaxed">
                Share your code with a friend. When they book their first drip, they get $30 off — and we credit $30 to your next session, automatically.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); trackEvent("referral", "submit"); alert("Thanks! Your referral code is on its way."); }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <input required type="email" placeholder="Your email" className="flex-1 px-5 py-3.5 rounded-full bg-background/95 text-foreground placeholder:text-muted-foreground border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-sm" />
                <button type="submit" className="px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover:scale-[1.03] transition shadow-glow">
                  Get my code →
                </button>
              </form>
              <p className="mt-3 text-xs opacity-80">Credit applied after your friend completes their first session.</p>
            </div>
          </div>

          {/* Leave a review card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-border p-10 md:p-14 bg-card">
            <div className="text-xs uppercase tracking-[0.3em] text-aqua font-semibold">Leave a review</div>
            <h3 className="mt-4 font-display text-4xl md:text-5xl font-light leading-tight">
              Loved your drip? <span className="italic text-accent-warm">Tell the world.</span>
            </h3>
            <p className="mt-5 text-base text-muted-foreground max-w-md leading-relaxed">
              Your story helps a teammate, a touring artist, or a tired new parent find us. Drop us a review and we'll send a thank-you shot on your next visit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://g.page/r/dcdrip/review" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("review", "google")} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-background font-semibold text-sm hover:border-aqua transition">
                <span className="text-lg">⭐</span> Review on Google
              </a>
              <a href="https://www.yelp.com/biz/dc-drip" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("review", "yelp")} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-background font-semibold text-sm hover:border-aqua transition">
                <span className="text-lg">📣</span> Review on Yelp
              </a>
              <a href="https://www.instagram.com/dcdrip" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("review", "instagram")} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-background font-semibold text-sm hover:border-aqua transition">
                <span className="text-lg">📸</span> Tag us on Instagram
              </a>
            </div>
            <div className="mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-aurora text-sm">
              <span className="text-xl">🎁</span>
              <span><span className="font-semibold">Free B12 shot</span> on your next visit when you leave a verified review.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-aqua">FAQ</span>
            <h2 className="mt-3 font-display text-5xl md:text-6xl font-light leading-[1.05]">
              Everything you wanted to <span className="italic text-gradient">ask</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Straight answers from our medical team. Still curious? Text us anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-background/60 backdrop-blur p-6 open:shadow-glow open:border-aqua/40 transition">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="font-display text-lg font-semibold">{f.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full bg-hero-gradient text-primary-foreground flex items-center justify-center text-sm font-bold group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto relative rounded-[2.5rem] overflow-hidden">
          <img src={ownerContact} alt="DC Drip owner ready to help clients book IV therapy and wellness services" loading="lazy" width={414} height={670} className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          <div className="relative p-6 sm:p-10 md:p-20 max-w-2xl">
            <h2 className="font-display text-[1.9rem] sm:text-5xl md:text-6xl font-light leading-[1.14] sm:leading-[1.05] tracking-normal">
              Ready to feel <span className="block sm:inline-block italic text-gradient pr-2 pb-1">unmistakably</span> <span className="inline-block italic text-gradient pr-1 pb-1">you</span><span className="inline-block pl-0.5 text-deep">?</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Book in under 60 seconds. Walk in tired. Walk out new.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="https://dc-drip.janeapp.com/" className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-hero-gradient text-primary-foreground font-semibold shadow-glow hover:scale-[1.03] transition">
                Book Your Session →
              </a>
              <a href="#membership" className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-border bg-card/40 backdrop-blur font-semibold hover:bg-card transition">
                Explore Membership
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-aqua">Inside DC Drip</span>
              <h2 className="mt-3 font-display text-5xl md:text-6xl font-light leading-[1.05]">
                A look at the <span className="italic text-gradient">lounge.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Step inside our flagship space. Click any photo for a closer look.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => { setLightboxIndex(i); trackEvent("gallery", `open_${i}`); }}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-aqua ${i === 0 || i === 4 ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"}`}
                aria-label={`Open photo: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-3 left-3 right-3 text-left text-xs font-semibold text-foreground/95 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M11 8v6M8 11h6"/></svg>
                    {img.caption}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* APPOINTMENT FORM CTA */}
      <section id="appointment" className="py-24 md:py-32 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-aqua">Request an appointment</span>
            <h2 className="mt-3 font-display text-5xl md:text-6xl font-light leading-[1.05]">
              Tell us how you want to <span className="italic text-gradient">feel.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Drop your details and our concierge team will reach out within the hour with a curated drip plan and your first available slot.
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-aqua" /> Same-day appointments often available</div>
              <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gold" /> In-lounge, concierge & at-home options</div>
              <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-coral" /> Zero pressure — answers in minutes</div>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              trackEvent("appointment", "form_submit");
              setFormSent(true);
            }}
            className="rounded-[2rem] border border-border bg-background/70 backdrop-blur p-8 md:p-10 shadow-glow space-y-4"
          >
            {formSent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 mx-auto rounded-full bg-hero-gradient flex items-center justify-center text-2xl mb-4">✓</div>
                <div className="font-display text-2xl font-semibold">We'll be in touch shortly.</div>
                <p className="mt-2 text-sm text-muted-foreground">Or book instantly:</p>
                <a href="https://dc-drip.janeapp.com/" onClick={() => trackEvent("cta", "book_after_form")} className="mt-5 inline-flex px-6 py-3 rounded-full bg-hero-gradient text-primary-foreground text-sm font-semibold shadow-glow hover:scale-[1.03] transition">
                  Book online →
                </a>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</span>
                    <input required type="text" className="mt-1.5 w-full px-4 py-3 rounded-xl bg-card/80 border border-border focus:border-aqua focus:outline-none text-sm" placeholder="Jane Smith" />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</span>
                    <input required type="tel" className="mt-1.5 w-full px-4 py-3 rounded-xl bg-card/80 border border-border focus:border-aqua focus:outline-none text-sm" placeholder="(202) 555-0123" />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</span>
                  <input required type="email" className="mt-1.5 w-full px-4 py-3 rounded-xl bg-card/80 border border-border focus:border-aqua focus:outline-none text-sm" placeholder="you@email.com" />
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Drip of interest</span>
                    <select className="mt-1.5 w-full px-4 py-3 rounded-xl bg-card/80 border border-border focus:border-aqua focus:outline-none text-sm">
                      <option>Not sure — recommend one</option>
                      {services.map(s => <option key={s.name}>{s.name}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferred date</span>
                    <input type="date" className="mt-1.5 w-full px-4 py-3 rounded-xl bg-card/80 border border-border focus:border-aqua focus:outline-none text-sm" />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Anything we should know? (optional)</span>
                  <textarea rows={3} className="mt-1.5 w-full px-4 py-3 rounded-xl bg-card/80 border border-border focus:border-aqua focus:outline-none text-sm resize-none" placeholder="Goals, allergies, group size…" />
                </label>
                <button type="submit" className="w-full px-6 py-4 rounded-full bg-hero-gradient text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition">
                  Request appointment →
                </button>
                <p className="text-[11px] text-center text-muted-foreground">By submitting, you agree to be contacted about your appointment.</p>
              </>
            )}
          </form>
        </div>
      </section>

      {/* NEWSLETTER */}

      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-border bg-aurora p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-aqua">The Drip List</span>
            <h3 className="mt-3 font-display text-3xl md:text-4xl font-light leading-tight">
              Wellness drops, member perks, <span className="italic text-gradient">first access.</span>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Join 5,000+ DMV insiders. One short email a week — never spam.
            </p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! You're on the list."); }} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="px-5 py-4 rounded-full bg-background/80 border border-border focus:border-aqua focus:outline-none text-sm w-full sm:w-72"
            />
            <button type="submit" className="px-6 py-4 rounded-full bg-hero-gradient text-primary-foreground text-sm font-semibold shadow-glow hover:scale-[1.03] transition whitespace-nowrap">
              Subscribe →
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border pt-16 pb-16 px-6">
        {/* PROMINENT FOOTER BOOKING FORM */}
        <div id="book" className="max-w-6xl mx-auto mb-16">
          <div className="relative overflow-hidden rounded-3xl border border-aqua/30 bg-gradient-to-br from-card via-card to-background p-8 md:p-12 shadow-glow">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-hero-gradient opacity-20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-hero-gradient opacity-10 blur-3xl pointer-events-none" />
            <div className="relative grid lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-aqua/15 text-aqua border border-aqua/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" /> Reserve your chair
                </span>
                <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight">
                  Book your <span className="text-gradient">drip</span> in 60 seconds
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Pick a date and time that works for you. We'll confirm by text within minutes — no apps, no friction, just hydration on your schedule.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><span className="text-aqua">✓</span> Confirmation within 10 minutes</li>
                  <li className="flex items-center gap-2"><span className="text-aqua">✓</span> Free reschedule up to 2 hours before</li>
                  <li className="flex items-center gap-2"><span className="text-aqua">✓</span> HSA / FSA receipts on request</li>
                </ul>
              </div>

              <div className="lg:col-span-3">
                {bookSent ? (
                  <div className="rounded-2xl border border-aqua/40 bg-aqua/10 p-8 text-center">
                    <div className="text-4xl mb-3">🎉</div>
                    <div className="font-display text-xl font-semibold">You're on the list!</div>
                    <p className="mt-2 text-sm text-muted-foreground">We've opened WhatsApp with your request. Our team will confirm your slot shortly.</p>
                    <button onClick={() => setBookSent(false)} className="mt-5 text-sm text-aqua hover:underline">Book another session</button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="grid sm:grid-cols-2 gap-4">
                    <input name="name" required maxLength={100} placeholder="Full name *" className="px-4 py-3 rounded-xl bg-background/80 border border-border focus:border-aqua focus:outline-none text-sm" />
                    <input name="phone" required type="tel" maxLength={30} placeholder="Phone *" className="px-4 py-3 rounded-xl bg-background/80 border border-border focus:border-aqua focus:outline-none text-sm" />
                    <input name="email" type="email" maxLength={255} placeholder="Email (optional)" className="px-4 py-3 rounded-xl bg-background/80 border border-border focus:border-aqua focus:outline-none text-sm sm:col-span-2" />
                    <select name="drip" defaultValue="" className="px-4 py-3 rounded-xl bg-background/80 border border-border focus:border-aqua focus:outline-none text-sm sm:col-span-2">
                      <option value="">Choose your drip (optional)</option>
                      {services.map(s => <option key={s.name} value={s.name}>{s.name} — {s.tag}</option>)}
                    </select>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 ml-1">Preferred date *</label>
                      <input name="date" type="date" required min={todayStr} defaultValue={todayStr} className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border focus:border-aqua focus:outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 ml-1">Preferred time *</label>
                      <select name="time" required defaultValue="" className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border focus:border-aqua focus:outline-none text-sm">
                        <option value="" disabled>Select a time</option>
                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <button type="submit" className="sm:col-span-2 mt-2 px-6 py-4 rounded-full bg-hero-gradient text-primary-foreground text-sm font-semibold shadow-glow hover:scale-[1.02] transition">
                      Request my appointment →
                    </button>
                    <p className="sm:col-span-2 text-xs text-muted-foreground text-center">
                      Or book instantly on our portal · <a href="https://dc-drip.janeapp.com/" onClick={() => trackEvent("cta", "book_footer_jane")} className="text-aqua hover:underline">JaneApp →</a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>


        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 font-display text-2xl font-bold">
              <span className="inline-block w-8 h-8 rounded-full bg-hero-gradient" />
              <span className="text-gradient">DC Drip</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              The DMV's premier IV therapy lounge. Luxury hydration and integrative wellness, delivered with spa-level care.
            </p>
            {/* Social Buttons */}
            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.instagram.com/dc_drip/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("social", "instagram", "https://www.instagram.com/dc_drip/")} aria-label="Instagram" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-aqua/20 hover:border-aqua/40 hover:scale-110 transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/dcdrip" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("social", "facebook", "https://www.facebook.com/dcdrip")} aria-label="Facebook" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-aqua/20 hover:border-aqua/40 hover:scale-110 transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@dcdrip" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("social", "tiktok", "https://www.tiktok.com/@dcdrip")} aria-label="TikTok" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-aqua/20 hover:border-aqua/40 hover:scale-110 transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/dc-drip" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("social", "linkedin", "https://www.linkedin.com/company/dc-drip")} aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-aqua/20 hover:border-aqua/40 hover:scale-110 transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.yelp.com/biz/dc-drip-washington" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("social", "yelp", "https://www.yelp.com/biz/dc-drip-washington")} aria-label="Yelp" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-aqua/20 hover:border-aqua/40 hover:scale-110 transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11.5 14.5 7 21l5-4.5z"/><path d="M16 21v-6.5"/><path d="m21 17-4.5-2.5 4.5-2.5z"/><path d="M8.5 8.5 4 3l4.5 4.5z"/><path d="M8 3v6.5"/><path d="m3 7 4.5 2.5L3 12z"/></svg>
              </a>
            </div>
          </div>

          {/* Visit / Contact */}
          <div>
            <div className="font-display text-lg font-semibold mb-5">Visit Us</div>
            <div className="text-sm text-muted-foreground space-y-3">
              <div className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-aqua shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>600 Pennsylvania Ave SE<br/>Suite 490, Washington, DC 20003</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aqua shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+12028435420" className="hover:text-foreground transition">(202) 843-5420</a>
              </div>
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aqua shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:hello@dc-drip.com" className="hover:text-foreground transition">hello@dc-drip.com</a>
              </div>
              <div className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-aqua shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Mon–Sat · 9:00 AM – 7:00 PM<br/>Sunday · 10:00 AM – 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <div className="font-display text-lg font-semibold mb-5">Explore</div>
            <div className="text-sm space-y-2.5">
              <a href="#services" className="block text-muted-foreground hover:text-foreground transition">Drip Menu</a>
              <a href="#about" className="block text-muted-foreground hover:text-foreground transition">About Us</a>
              <a href="#membership" className="block text-muted-foreground hover:text-foreground transition">Membership</a>
              <a href="#reviews" className="block text-muted-foreground hover:text-foreground transition">Client Stories</a>
              <a href="#top" className="block text-muted-foreground hover:text-foreground transition">How It Works</a>
              <a href="https://dc-drip.janeapp.com/" className="block text-muted-foreground hover:text-foreground transition">Gift Cards</a>
              <a href="#book" className="block text-muted-foreground hover:text-foreground transition">Book Appointment</a>
            </div>
          </div>

          {/* Book / CTA */}
          <div>
            <div className="font-display text-lg font-semibold mb-5">Start Your Drip</div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Ready to hydrate, heal, and elevate? Book in under 60 seconds.
            </p>
            <a href="https://dc-drip.janeapp.com/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-hero-gradient text-primary-foreground text-sm font-semibold shadow-glow hover:scale-[1.03] transition">
              Book Now →
            </a>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Walk-ins welcome based on availability
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} DC Drip. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition">Terms of Service</a>
            <span className="text-aqua font-medium">Hydrate · Heal · Elevate</span>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/12028435420?text=Hi%20DC%20Drip%2C%20I%27d%20like%20to%20book%20an%20IV%20session."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("floating", "whatsapp", "https://wa.me/12028435420")}
          aria-label="Chat on WhatsApp"
          className="group w-14 h-14 rounded-full bg-[#25D366] text-white shadow-glow flex items-center justify-center hover:scale-110 transition relative"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 .5C5.65.5.5 5.65.5 12c0 2.124.555 4.118 1.527 5.85L.5 23.5l5.84-1.51A11.45 11.45 0 0 0 12 23.5c6.35 0 11.5-5.15 11.5-11.5S18.35.5 12 .5zm0 21a9.46 9.46 0 0 1-4.83-1.32l-.347-.207-3.466.896.928-3.38-.225-.348A9.46 9.46 0 0 1 2.5 12c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5z"/>
          </svg>
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">WhatsApp us</span>
        </a>
        <a
          href="tel:+12028435420"
          onClick={() => trackEvent("floating", "call", "tel:+12028435420")}
          aria-label="Call DC Drip"
          className="group w-14 h-14 rounded-full bg-hero-gradient text-primary-foreground shadow-glow flex items-center justify-center hover:scale-110 transition relative"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Call now</span>
        </a>
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-aqua/20 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 border border-border flex items-center justify-center hover:bg-aqua/20 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 border border-border flex items-center justify-center hover:bg-aqua/20 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>
          </button>
          <figure className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[lightboxIndex].src}
              alt={gallery[lightboxIndex].alt}
              className="max-h-[80vh] w-auto rounded-2xl shadow-glow object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              <span className="text-aqua font-semibold">{lightboxIndex + 1} / {gallery.length}</span> · {gallery[lightboxIndex].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}


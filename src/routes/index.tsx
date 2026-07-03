import { createFileRoute } from "@tanstack/react-router";
import { recordSocialClick } from "@/lib/social-clicks";
import clientGlow from "@/assets/client-glow.jpg";
import dripDetail from "@/assets/drip-detail.jpg";
import heroIv from "@/assets/hero-iv.jpg";
import ownerContact from "@/assets/owner-contact.jpg";
import dcDripLogo from "@/assets/dc-drip-logo.svg";

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
const heroBackgroundImage = "/media/client-moments/lounge-wide.jpeg";
const clientMomentVideos = [
  {
    src: "/media/client-moments/marlon.mov",
    poster: "/media/client-moments/drip-chairs.jpeg",
    label: "The DC Drip reset",
    detail: "A relaxed look inside the lounge experience.",
  },
];

const clientMomentPhotos = [
  {
    src: "/media/client-moments/group-lounge.jpeg",
    alt: "DC Drip clients gathered in the lounge",
    label: "Group glow",
    detail: "Clients in the lounge after a DC Drip wellness session.",
  },
  {
    src: "/media/client-moments/drip-chairs.jpeg",
    alt: "Clients relaxing in DC Drip treatment chairs",
    label: "Chair-side comfort",
    detail: "Relaxed treatment chairs and the signature DC Drip wall.",
  },
  {
    src: "/media/client-moments/brand-wall.jpeg",
    alt: "DC Drip client beside the brand wall",
    label: "Brand wall moment",
    detail: "A real client moment beside the signature DC Drip wall.",
  },
];

const testimonialVideos = [
  {
    src: "/videos/ch_one.mp4",
    label: "Inside the lounge",
    detail: "One of the original DC Drip testimonial moments.",
  },
  {
    src: "/videos/ch_two.mp4",
    label: "Client experience",
    detail: "A client shares what the DC Drip reset feels like.",
  },
  {
    src: "/videos/ch_three.mp4",
    label: "Wellness reset",
    detail: "A real talking testimonial from the DC Drip lounge.",
  },
];

const galleryPhotos = [
  {
    src: "/media/client-moments/group-lounge.jpeg",
    alt: "DC Drip clients gathered in the lounge",
    label: "Group glow",
  },
  {
    src: "/media/client-moments/drip-chairs.jpeg",
    alt: "Clients relaxing in DC Drip treatment chairs",
    label: "Chair-side comfort",
  },
  {
    src: "/media/client-moments/lounge-wide.jpeg",
    alt: "DC Drip lounge with clients and treatment chairs",
    label: "Inside the lounge",
  },
  {
    src: "/media/client-moments/brand-wall.jpeg",
    alt: "DC Drip client beside the brand wall",
    label: "Brand wall moment",
  },
];

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
  ["45 mins", "Average session"],
  ["9", "Signature blends"],
  ["5-star", "Client rating"],
];

const reviews = [
  [
    "Jasmine R.",
    "DC Drip completely changed my mornings. I walk in foggy and walk out lit up - sharper, calmer, glowing.",
  ],
  [
    "Marcus T.",
    "The Athlete drip cut my recovery time in half. The space feels like a five-star hotel, the staff feels like family.",
  ],
  [
    "Lena S.",
    "Mama Glow saved my postpartum energy. I have not felt this human in years.",
  ],
];

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
  return (
    <div className="min-h-screen bg-white text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-white/92 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <img src={dcDripLogo} alt="DC Drip" className="h-14 w-48 object-contain object-left" />
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map(([key, label]) => (
              <a
                key={key}
                href={key === "home" ? "#top" : `#${key}`}
                className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition hover:bg-secondary hover:text-deep"
              >
                {label}
              </a>
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

        <div className="flex gap-2 overflow-x-auto border-t border-border px-4 py-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {navItems.map(([key, label]) => (
            <a
              key={key}
              href={key === "home" ? "#top" : `#${key}`}
              className="shrink-0 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-deep"
            >
              {label}
            </a>
          ))}
        </div>
      </header>

      <main>
        <HomeView />
        <AboutView />
        <ServicesView />
        <MembershipView />
        <StoriesView />
        <ContactView />
      </main>

      <footer className="border-t border-border bg-deep px-4 py-8 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-display text-2xl font-bold">DC Drip</div>
            <img src={dcDripLogo} alt="DC Drip" className="mt-2 h-14 w-48 rounded bg-white/95 object-contain object-left p-2" />
            <p className="mt-1 text-sm text-white/70">
              Hydrate. Heal. Elevate. Serving DC, Maryland, and Virginia.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-bold">
            <a href="https://www.instagram.com/dc_drip/" onClick={() => trackEvent("social", "instagram", "https://www.instagram.com/dc_drip/")}>Instagram</a>
            <a href="https://www.facebook.com/dcdrip" onClick={() => trackEvent("social", "facebook", "https://www.facebook.com/dcdrip")}>Facebook</a>
            <a href="/admin/html" className="text-aqua">Admin</a>
          </div>
        </div>
      </footer>

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

function HomeView() {
  return (
    <section id="top" className="relative isolate min-h-[calc(100vh-7.5rem)] scroll-mt-28 overflow-hidden bg-deep text-white">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={heroBackgroundImage}
        alt="DC Drip clients inside the lounge"
      />
      <div className="absolute inset-0 bg-deep/58" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.18_0.06_225/.92)_0%,oklch(0.22_0.07_220/.68)_44%,oklch(0.22_0.07_220/.22)_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 md:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex w-fit border border-white/25 bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur">
            Washington DC - Maryland - Virginia
          </span>
          <h1 aria-label="Hydrate. Heal. Elevate." className="mt-6 max-w-4xl font-display text-6xl font-light leading-[0.92] text-white sm:text-7xl lg:text-8xl">
            Hydrate. <span className="italic text-aqua">Heal.</span>
            <br />
            <span className="font-semibold">Elevate.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
            The DMV's most luxurious IV therapy lounge. Science-backed vitamin
            drips and integrative wellness, delivered in a spa-quiet space
            designed for your comeback.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={bookUrl} className="rounded-full bg-coral px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-gold">
              Book Your Session
            </a>
            <a href="#services" className="rounded-full border border-white/30 bg-white/12 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white backdrop-blur">
              View Drips
            </a>
          </div>
          <div className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([n, label]) => (
              <div key={label} className="border border-white/18 bg-white/10 p-4 backdrop-blur">
                <div className="font-display text-3xl font-semibold text-aqua">{n}</div>
                <div className="text-xs text-white/70">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 max-w-md border-l-4 border-aqua bg-white/10 p-5 backdrop-blur">
          <div className="text-xs font-black uppercase tracking-[0.22em] text-aqua">
            Luxury drip lounge
          </div>
          <div className="mt-2 font-display text-2xl font-semibold text-white">
            Spa-level comfort, clinically guided care.
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutView() {
  return (
    <section id="about" className="scroll-mt-28 px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
        <img src={clientGlow} alt="Client relaxing during IV therapy" className="h-[24rem] w-full rounded-lg object-cover shadow-glow" />
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
    <section id="services" className="scroll-mt-28 px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-aqua">The Drip Menu</p>
        <h2 className="mt-4 font-display text-5xl font-light text-deep">
          Nine signature drips. <span className="italic text-aqua">One transformed you.</span>
        </h2>
        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-deep text-white shadow-glow">
          <div className="grid md:grid-cols-[1.08fr_0.92fr]">
            <video
              src={clientMomentVideos[0].src}
              poster={clientMomentVideos[0].poster}
              playsInline
              muted
              autoPlay
              loop
              preload="auto"
              className="aspect-video h-full max-h-[28rem] w-full bg-deep object-cover"
            />
            <div className="grid gap-5 p-6 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-aqua">
                Choose your reset
              </p>
              <h3 className="font-display text-4xl font-light text-white">
                Every drip starts with a goal.
              </h3>
              <p className="leading-7 text-white/75">
                Energy, recovery, immunity, detox, glow, or performance. The
                menu helps guests match how they feel today to the protocol that
                helps them leave better.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([name, tag, desc]) => (
            <article key={name} className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-black text-coral">{tag}</span>
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
    <section id="membership" className="scroll-mt-28 px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-border bg-deep text-white shadow-glow md:grid-cols-2">
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
    <section id="stories" className="scroll-mt-28 bg-white px-4 py-12 sm:px-6 md:py-18">
      <div className="mx-auto max-w-7xl xl:pr-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-aqua">
              Client Stories
            </p>
            <h2 className="mt-4 font-display text-5xl font-light text-deep">
              Real people. <span className="italic text-aqua">Real glow.</span>
            </h2>
          </div>
          <p className="max-w-lg text-muted-foreground">
            Step inside the lounge, hear from real clients, and see the calm,
            restorative experience that keeps the DMV coming back.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <figure className="overflow-hidden rounded-lg border border-border bg-deep text-white shadow-glow">
            <img
              src={clientMomentPhotos[0].src}
              alt={clientMomentPhotos[0].alt}
              className="aspect-[16/10] w-full object-cover"
            />
            <figcaption className="p-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-aqua">
                Client energy
              </p>
              <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                {clientMomentPhotos[0].label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/72">
                {clientMomentPhotos[0].detail}
              </p>
            </figcaption>
          </figure>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {reviews.map(([name, quote]) => (
              <figure key={name} className="rounded-lg border border-border bg-white p-6 shadow-sm">
                <div className="text-sm font-black uppercase tracking-[0.14em] text-coral">5/5 stars</div>
                <blockquote className="mt-4 text-sm leading-7 text-muted-foreground">
                  "{quote}"
                </blockquote>
                <figcaption className="mt-5 font-display text-xl font-semibold text-deep">
                  {name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonialVideos.map((video) => (
            <article key={video.src} className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
              <video
                src={video.src}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-deep object-cover"
              />
              <div className="p-4">
                <h3 className="font-display text-xl font-semibold text-deep">{video.label}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{video.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-aqua">
            Gallery
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryPhotos.map((photo) => (
              <figure key={photo.src} className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="p-4 font-display text-xl font-semibold text-deep">
                  {photo.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function ContactView() {
  return (
    <section id="contact" className="scroll-mt-28 px-4 py-10 pb-28 sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <img src={ownerContact} alt="DC Drip owner" className="h-[30rem] w-full rounded-lg object-cover object-center shadow-glow" />
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
            <a href={`tel:${phone}`} onClick={() => trackEvent("floating", "call", `tel:${phone}`)} className="rounded-2xl border border-aqua/20 bg-secondary p-5 font-black text-coral">
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

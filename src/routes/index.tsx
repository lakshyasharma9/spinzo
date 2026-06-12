import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  WashingMachine,
  Sparkles,
  Wind,
  Footprints,
  Home,
  Zap,
  Menu,
  X,
  Star,
  Instagram,
  MessageCircle,
  Phone,
  ArrowUpRight,
  ChevronRight,
  Users,
  User,
  Mail,
} from "lucide-react";
import adityaImg    from "@/assets/Aditya Batwara.jpeg";
import hardikImg    from "@/assets/Hardik Maheshwari.jpeg";
import jashImg      from "@/assets/Jash.jpeg";
import lakshyaImg   from "@/assets/Lakshya Sharma.jpeg";
import pulkitImg    from "@/assets/Pulkit Jain.jpeg";
import founderImage from "@/assets/founder.jpeg";

const WashingMachine3D = lazy(() => import("@/components/WashingMachine3D"));

export const Route = createFileRoute("/")({
  component: Index,
});

const WA_NUMBER = "917976681235";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#services", label: "Services" },
    { href: "#plans",    label: "Plans" },
    { href: "#process",  label: "How It Works" },
    { href: "#pricing",  label: "Pricing" },
    { href: "#contact",  label: "Contact" },
  ];
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md" : ""}`}
        style={{ backgroundColor: scrolled ? "rgba(247,245,240,0.92)" : "transparent" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#top" className="font-display text-3xl italic text-[color:var(--green-primary)]">
            Spinzo
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-text-primary transition-colors hover:text-[color:var(--green-primary)]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={waLink("Hi, I'd like to book a laundry pickup with Spinzo!")}
              className="hidden rounded-lg bg-[color:var(--green-primary)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[color:var(--green-dark)] hover:shadow-lg md:inline-flex"
            >
              Book Now
            </a>
            <button onClick={() => setOpen(true)} className="rounded-lg p-2 md:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <div className={`fixed inset-0 z-[60] md:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-80 max-w-[85%] bg-[color:var(--bg-base)] p-6 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="mb-10 flex items-center justify-between">
            <span className="font-display text-2xl italic text-[color:var(--green-primary)]">Spinzo</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg text-text-primary">
                {l.label}
              </a>
            ))}
            <a
              href={waLink("Hi, I'd like to book a laundry pickup with Spinzo!")}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-[color:var(--green-primary)] px-5 py-3 text-base font-medium text-white"
            >
              Book Now
            </a>
          </nav>
        </aside>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="grain-overlay relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-10">
        <div className="flex flex-col justify-center">
          <span className="label-eyebrow fade-up" style={{ animationDelay: "0.1s" }}>
            Jaipur's Premium Laundry
          </span>
          <h1 className="font-display mt-6 text-[42px] leading-[1.05] text-text-primary md:text-[64px] lg:text-[80px]">
            <span className="fade-up block italic" style={{ animationDelay: "0.25s" }}>Your clothes,</span>
            <span className="fade-up block italic" style={{ animationDelay: "0.4s" }}>perfectly cared for.</span>
          </h1>
          <p className="fade-up mt-8 max-w-lg text-base text-text-muted md:text-lg" style={{ animationDelay: "0.6s" }}>
            Pickup at your door. Returned fresh, folded, and fragrance-perfect within 24 hours.
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: "0.75s" }}>
            <a
              href={waLink("Hi, I'd like to book a laundry pickup with Spinzo!")}
              className="inline-flex items-center justify-center rounded-lg bg-[color:var(--green-primary)] px-7 py-4 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(20,99,33,0.5)] transition-all hover:-translate-y-0.5 hover:bg-[color:var(--green-dark)]"
            >
              Book a Pickup
            </a>
            <a
              href={waLink("Hi, I want to order on WhatsApp with Spinzo!")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[color:var(--green-primary)] px-7 py-4 text-sm font-medium text-[color:var(--green-primary)] transition-all hover:bg-[color:var(--green-muted)]"
            >
              Order on WhatsApp <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <ul className="fade-up mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-text-muted" style={{ animationDelay: "0.9s" }}>
            {["100% Safe & Hygienic", "On-time Delivery", "Eco-friendly Detergents"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="text-[color:var(--green-primary)]">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="fade-up relative flex items-center justify-center"
          style={{ animationDelay: "0.4s", height: "480px" }}
        >
          {/* Mobile: fixed width centered; desktop: full width */}
          <div className="h-full w-full max-w-[360px] mx-auto lg:max-w-full">
            <Suspense fallback={null}>
              <WashingMachine3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const items = [
    "Trusted by 2,000+ households in Jaipur",
    "48-hour turnaround",
    "Eco-friendly process",
    "Min. order 5 kg",
  ];
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-[color:var(--green-primary)] py-4 text-white">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-sm font-medium tracking-wide">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-white/40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* PRICE DATA — used by PricingSection below */
const laundryTiers = [
  { label: "Wash & Fold",     price: "69/kg",  desc: "Washed, dried & neatly folded" },
  { label: "Wash & Iron",     price: "99/kg",  desc: "Washed, dried & crisp-ironed" },
  { label: "Premium Laundry", price: "170/kg", desc: "Full care with premium detergents" },
];
const dcMen = [
  { name: "Shirt", p: 60 }, { name: "T-Shirt", p: 60 }, { name: "Pant", p: 60 }, { name: "Trouser", p: 60 },
  { name: "Kurta", p: 60 }, { name: "Kurta Heavy", p: 100 }, { name: "Pyjama", p: 60 },
  { name: "Suit 2 Pcs", p: 270 }, { name: "Suit 3 Pcs", p: 350 }, { name: "Sherwani", p: 300 },
  { name: "Sherwani Heavy", p: 700 }, { name: "Waistcoat", p: 100 }, { name: "Blazer", p: 200 },
  { name: "Sweater Full Sleeve", p: 150 }, { name: "Sweater Sleeveless", p: 100 }, { name: "Sweatshirt", p: 120 },
  { name: "Hoodie", p: 150 }, { name: "Tracksuit", p: 100 }, { name: "Jacket Normal", p: 120 },
  { name: "Jacket Heavy", p: 150 }, { name: "Two-Sided Jacket", p: 220 }, { name: "Long Coat", p: 250 },
  { name: "Muffler", p: 60 }, { name: "Leather Jacket", p: 350 }, { name: "Nehru Jacket", p: 120 },
];
const dcWomen = [
  { name: "Kurta / Kameez", p: 60 }, { name: "Kurta Heavy", p: 100 }, { name: "Salwar / Pyjama", p: 60 },
  { name: "Saree Normal (2 Pcs)", p: 200 }, { name: "Saree Heavy (2 Pcs)", p: 350 },
  { name: "Dressing Gown Normal", p: 220 }, { name: "Dressing Gown Heavy", p: 300 },
  { name: "Lehenga 3 Pcs Set", p: 300 }, { name: "Lehenga 3 Pcs Set Heavy", p: 450 },
  { name: "Wedding Lehenga", p: 1000 }, { name: "Poshak 4 Pcs Normal", p: 300 }, { name: "Poshak 4 Pcs Heavy", p: 450 },
  { name: "Blouse Normal", p: 50 }, { name: "Blouse Heavy", p: 80 }, { name: "Salwar-Kameez", p: 150 },
  { name: "Dupatta", p: 50 }, { name: "Skirt", p: 100 }, { name: "Shawl", p: 150 },
  { name: "Frock", p: 100 }, { name: "Night Dress", p: 150 },
];
const ironMen = [
  { name: "Shirt", p: 15 }, { name: "T-Shirt", p: 15 }, { name: "Pant", p: 15 }, { name: "Trouser", p: 15 },
  { name: "Kurta", p: 20 }, { name: "Kurta Heavy", p: 30 }, { name: "Pyjama", p: 20 },
  { name: "Suit 2 Pcs", p: 100 }, { name: "Suit 3 Pcs", p: 120 }, { name: "Sherwani", p: 120 },
  { name: "Sherwani Heavy", p: 150 }, { name: "Waistcoat", p: 40 }, { name: "Blazer", p: 80 },
  { name: "Sweater Full Sleeve", p: 40 }, { name: "Sweater Sleeveless", p: 40 }, { name: "Sweatshirt", p: 40 },
  { name: "Hoodie", p: 40 }, { name: "Tracksuit", p: 40 }, { name: "Jacket Normal", p: 40 },
  { name: "Jacket Heavy", p: 50 }, { name: "Two-Sided Jacket", p: 50 }, { name: "Long Coat", p: 100 }, { name: "Muffler", p: 15 },
];
const ironWomen = [
  { name: "Kurta / Kameez", p: 20 }, { name: "Kurta Heavy", p: 30 }, { name: "Salwar / Pyjama", p: 20 },
  { name: "Saree Normal (2 Pcs)", p: 80 }, { name: "Saree Heavy (2 Pcs)", p: 80 },
  { name: "Dressing Gown Normal", p: 90 }, { name: "Dressing Gown Heavy", p: 90 },
  { name: "Lehenga 3 Pcs Set", p: 100 }, { name: "Lehenga 3 Pcs Set Heavy", p: 100 },
  { name: "Wedding Lehenga", p: 180 }, { name: "Poshak 4 Pcs Normal", p: 100 }, { name: "Poshak 4 Pcs Heavy", p: 100 },
  { name: "Blouse Normal", p: 20 }, { name: "Blouse Heavy", p: 20 }, { name: "Salwar-Kameez", p: 50 },
  { name: "Dupatta", p: 20 }, { name: "Skirt", p: 20 }, { name: "Shawl", p: 50 },
  { name: "Frock", p: 20 }, { name: "Night Dress", p: 50 },
];
const shoeItems = [
  { name: "Shoe Laundry", p: 199, tag: "wash" },
  { name: "Shoe Normal",  p: 279, tag: "dry" }, { name: "Premium Shoe", p: 349, tag: "dry" },
  { name: "Leather Shoe", p: 499, tag: "dry" }, { name: "Sandal",       p: 249, tag: "dry" },
  { name: "Slipper",      p: 149, tag: "dry" }, { name: "Crocs",        p: 149, tag: "dry" },
];
const blanketItems = [
  { name: "Single Bed Blanket", p: 249 }, { name: "Double Bed Blanket", p: 349 },
  { name: "King Size Blanket",  p: 399 }, { name: "Comforter",          p: 199 },
  { name: "Bedsheet",           p: 99  }, { name: "Pillow Cover",       p: 25  },
  { name: "Bag",                p: 149 }, { name: "Foot Mat",           p: 119 },
  { name: "Cushion Cover (5 Pcs)", p: 200 }, { name: "Table Cloth",    p: 99  },
  { name: "Soft Toy",           p: 199 },
];

/* ─── SIMPLE SERVICES SECTION (pehle jaisa) ─── */
const services = [
  { id: "laundry", name: "Laundry",            icon: WashingMachine, desc: "Wash & fold, wash & iron, premium care" },
  { id: "dry",     name: "Dry Cleaning",        icon: Sparkles,       desc: "Per item · expert garment care" },
  { id: "iron",    name: "Steam Iron",          icon: Wind,           desc: "Crisp & wrinkle-free every time" },
  { id: "shoe",    name: "Shoe Cleaning",       icon: Footprints,     desc: "Deep clean for all footwear" },
  { id: "bulk",    name: "Blankets & Curtains", icon: Home,           desc: "Bulky items done right" },
  { id: "express", name: "Express 3hr",         icon: Zap,            desc: "+50% surcharge on any service" },
];

function ServiceRevealCard({ s, i }: { s: (typeof services)[0]; i: number }) {
  const ref = useReveal<HTMLDivElement>();
  const Icon = s.icon;
  return (
    <div
      ref={ref}
      className="reveal group flex flex-col rounded-2xl bg-white p-8 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
      style={{ transitionDelay: `${i * 0.08}s` }}
    >
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--green-muted)] transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6 text-[color:var(--green-primary)]" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary">{s.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.desc}</p>
      <a
        href="#pricing"
        className="mt-auto pt-6 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--green-primary)] transition-all hover:gap-2 hover:text-[color:var(--green-dark)]"
      >
        See pricing <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function Services() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section id="services" className="px-6 py-24 md:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div ref={headRef} className="reveal mx-auto max-w-2xl text-center">
          <span className="label-eyebrow">Our Services</span>
          <h2 className="font-display mt-4 text-4xl text-text-primary md:text-5xl lg:text-6xl">
            What we take care of.
          </h2>
          <p className="mt-4 text-base text-text-muted md:text-lg">Transparent pricing. No hidden charges.</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceRevealCard key={s.id} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── SUBSCRIPTION PLANS SECTION ─── */
const plans = [
  {
    id: "basic", name: "Basic", sub: "Monthly Plan", price: 899, kg: "10 KG",
    badge: null, accent: false,
    perks: ["Clothes Wash & Iron", "1 Free Dry Clean", "Free Pickup & Drop", "48-Hour Turnaround"],
    cta: "Get Basic",
  },
  {
    id: "premium", name: "Premium", sub: "Quarterly Plan", price: 2699, kg: "30 KG",
    badge: "Best Value", accent: true,
    perks: ["Clothes Wash & Iron", "3 Free Dry Cleans", "Free Pickup & Delivery", "48-Hour Turnaround"],
    cta: "Get Premium",
  },
  {
    id: "elite", name: "Elite", sub: "Yearly Plan", price: 9999, kg: "120 KG",
    badge: null, accent: false,
    perks: ["Clothes Wash & Iron", "12 Free Dry Cleans", "Free On-Demand Pickups", "Priority Service", "Premium Member Benefits", "Lowest Price per KG"],
    cta: "Get Elite",
  },
];

function PlanCard({ plan, i }: { plan: (typeof plans)[0]; i: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal relative flex flex-col rounded-3xl p-8 transition-all duration-500 ${
        plan.accent
          ? "bg-[color:var(--green-primary)] text-white shadow-[0_20px_60px_-15px_rgba(20,99,33,0.4)] md:-translate-y-3"
          : "bg-white shadow-[var(--shadow-card)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
      }`}
      style={{ transitionDelay: `${i * 0.12}s` }}
    >
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 shadow-md">
            {plan.badge}
          </span>
        </div>
      )}
      <div className={`mb-6 border-b pb-6 ${plan.accent ? "border-white/20" : "border-black/8"}`}>
        <p className={`text-xs font-semibold uppercase tracking-widest ${plan.accent ? "text-white/70" : "text-[color:var(--green-primary)]"}`}>
          {plan.sub}
        </p>
        <h3 className={`font-display mt-1 text-3xl font-bold ${plan.accent ? "text-white" : "text-text-primary"}`}>
          {plan.name}
        </h3>
        <div className="mt-4 flex items-end gap-1">
          <span className={`text-[13px] font-medium ${plan.accent ? "text-white/80" : "text-text-muted"}`}>&#8377;</span>
          <span className={`font-display text-5xl font-bold leading-none ${plan.accent ? "text-white" : "text-text-primary"}`}>
            {plan.price.toLocaleString("en-IN")}
          </span>
        </div>
        <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${plan.accent ? "bg-white/15 text-white" : "bg-[color:var(--green-muted)] text-[color:var(--green-primary)]"}`}>
          <WashingMachine className="h-3.5 w-3.5" />
          {plan.kg} included
        </div>
      </div>
      <ul className="flex flex-1 flex-col gap-3">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5">
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${plan.accent ? "bg-white/20 text-white" : "bg-[color:var(--green-muted)] text-[color:var(--green-primary)]"}`}>✓</span>
            <span className={`text-sm ${plan.accent ? "text-white/90" : "text-text-primary"}`}>{perk}</span>
          </li>
        ))}
      </ul>
      <a
        href={waLink(`Hi, I want to subscribe to the Spinzo ${plan.name} plan (${plan.sub} - ₹${plan.price}).`)}
        className={`mt-8 flex w-full items-center justify-center rounded-xl py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
          plan.accent
            ? "bg-white text-[color:var(--green-primary)] shadow-lg hover:bg-white/90"
            : "bg-[color:var(--green-primary)] text-white hover:bg-[color:var(--green-dark)]"
        }`}
      >
        {plan.cta}
      </a>
      {plan.accent && (
        <p className="mt-3 text-center text-[11px] text-white/60">No commitment · cancel anytime</p>
      )}
    </div>
  );
}

function SubscriptionPlans() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section id="plans" className="px-6 py-24 md:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div ref={headRef} className="reveal mx-auto max-w-2xl text-center">
          <span className="label-eyebrow">Subscription Plans</span>
          <h2 className="font-display mt-4 text-4xl italic text-text-primary md:text-5xl lg:text-[56px]">
            Save more, wash more.
          </h2>
          <p className="mt-4 text-base text-text-muted md:text-lg">
            Lock in the lowest rate and never think about laundry again.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => <PlanCard key={plan.id} plan={plan} i={i} />)}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
          {["Free pickup & delivery included", "48-hr standard turnaround", "100% satisfaction or rewash free"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="text-[color:var(--green-primary)]">✓</span>{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FULL PRICING SECTION ─── */
type PriceRow = { name: string; p: number | string };

function PriceTable({ rows }: { rows: PriceRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/8 bg-white">
      <div className="grid grid-cols-[1fr_auto] border-b border-black/8 bg-[color:var(--green-muted)] px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-[color:var(--green-primary)]">
        <span>Item</span><span className="text-right">Price</span>
      </div>
      {rows.map((row, i) => (
        <div key={row.name} className={`grid grid-cols-[1fr_auto] items-center px-5 py-3.5 text-sm ${i % 2 === 0 ? "bg-white" : "bg-black/[0.016]"} border-b border-black/5 last:border-0 hover:bg-[color:var(--green-muted)] transition-colors`}>
          <span className="text-text-primary">{row.name}</span>
          <span className="font-bold text-[color:var(--green-primary)] text-right">&#8377;{row.p}</span>
        </div>
      ))}
    </div>
  );
}

const pricingTabs = [
  { id: "laundry", label: "Laundry",   icon: WashingMachine },
  { id: "dry",     label: "Dry Clean", icon: Sparkles       },
  { id: "iron",    label: "Steam Iron",icon: Wind           },
  { id: "shoe",    label: "Shoes",     icon: Footprints     },
  { id: "bulk",    label: "Blankets",  icon: Home           },
];

function PricingSection() {
  const ref = useReveal<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState("laundry");
  const [gender, setGender] = useState<"men"|"women">("men");

  return (
    <section id="pricing" className="px-6 py-24 md:py-32 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
          <span className="label-eyebrow">Pricing</span>
          <h2 className="font-display mt-4 text-4xl italic text-text-primary md:text-5xl">
            Clear. Fair. No surprises.
          </h2>
          <p className="mt-4 text-base text-text-muted">
            Every service, every item — priced transparently.
          </p>
        </div>

        {/* Service tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {pricingTabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); setGender("men"); }}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  activeTab === t.id
                    ? "bg-[color:var(--green-primary)] text-white shadow-md"
                    : "bg-white text-text-muted shadow-[var(--shadow-card)] hover:text-[color:var(--green-primary)]"
                }`}
              >
                <Icon className="h-4 w-4" />{t.label}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div className="mt-8">

          {/* LAUNDRY */}
          {activeTab === "laundry" && (
            <div>
              {/* Minimum order badge */}
              <div className="mb-6 flex items-center justify-center">
                <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg">⚖️</span>
                  <div>
                    <p className="text-sm font-bold text-amber-800">Minimum order: 5 kg</p>
                    <p className="text-xs text-amber-600">Orders below 5 kg will be billed at the 5 kg rate</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {laundryTiers.map((t) => (
                  <div key={t.label} className="flex flex-col rounded-2xl border border-black/8 bg-white p-6 shadow-[var(--shadow-card)]">
                    <p className="text-base font-bold text-text-primary">{t.label}</p>
                    <p className="mt-1 text-xs text-text-muted">{t.desc}</p>
                    <p className="mt-4 text-3xl font-bold text-[color:var(--green-primary)]">&#8377;{t.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DRY CLEAN */}
          {activeTab === "dry" && (
            <>
              <div className="mb-4 flex gap-2">
                {(["men","women"] as const).map((g) => (
                  <button key={g} onClick={() => setGender(g)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${gender === g ? "bg-[color:var(--green-primary)] text-white" : "bg-white text-text-muted shadow-[var(--shadow-card)] hover:text-[color:var(--green-primary)]"}`}>
                    {g === "men" ? <Users className="h-3.5 w-3.5"/> : <User className="h-3.5 w-3.5"/>}
                    {g === "men" ? "Men" : "Women"}
                  </button>
                ))}
              </div>
              <PriceTable rows={gender === "men" ? dcMen : dcWomen} />
            </>
          )}

          {/* STEAM IRON */}
          {activeTab === "iron" && (
            <>
              <div className="mb-4 flex gap-2">
                {(["men","women"] as const).map((g) => (
                  <button key={g} onClick={() => setGender(g)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${gender === g ? "bg-[color:var(--green-primary)] text-white" : "bg-white text-text-muted shadow-[var(--shadow-card)] hover:text-[color:var(--green-primary)]"}`}>
                    {g === "men" ? <Users className="h-3.5 w-3.5"/> : <User className="h-3.5 w-3.5"/>}
                    {g === "men" ? "Men" : "Women"}
                  </button>
                ))}
              </div>
              <PriceTable rows={gender === "men" ? ironMen : ironWomen} />
            </>
          )}

          {/* SHOES */}
          {activeTab === "shoe" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[color:var(--green-primary)]">Laundry Wash</p>
                <PriceTable rows={shoeItems.filter(s => s.tag === "wash")} />
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[color:var(--green-primary)]">Dry Clean</p>
                <PriceTable rows={shoeItems.filter(s => s.tag === "dry")} />
              </div>
            </div>
          )}

          {/* BLANKETS */}
          {activeTab === "bulk" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[color:var(--green-primary)]">Dry Clean — Per Item</p>
                <PriceTable rows={blanketItems} />
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[color:var(--green-primary)]">Laundry</p>
                <PriceTable rows={[{ name: "Curtains", p: "99/kg" }]} />
              </div>
            </div>
          )}
        </div>

        {/* Book CTA */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href={waLink("Hi, I'd like to book a laundry pickup with Spinzo!")}
            className="inline-flex items-center justify-center rounded-xl bg-[color:var(--green-primary)] px-8 py-4 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(20,99,33,0.5)] transition-all hover:-translate-y-0.5 hover:bg-[color:var(--green-dark)]">
            Book a Pickup
          </a>
          <a href={waLink("Hi, I'd like to chat about Spinzo services.")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--green-primary)] px-8 py-4 text-sm font-semibold text-[color:var(--green-primary)] transition-all hover:bg-[color:var(--green-muted)]">
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
        <p className="mt-6 text-center text-sm text-text-muted">
          &#128274; Secure · &#128230; Free pickup above &#8377;499 · &#9889; 24hr standard turnaround ·{" "}
          <a href="#" className="underline underline-offset-2 opacity-60 hover:opacity-100">T&amp;C apply</a>
        </p>
      </div>
    </section>
  );
}

/* ====== PROCESS TIMELINE (vertical SVG) ====== */
const processSteps = [
  { num: "01", name: "Schedule Your Pickup", desc: "Choose a time slot online or via WhatsApp. We confirm within minutes." },
  { num: "02", name: "We Collect, You Relax", desc: "Our trained partner arrives at your door, bags your clothes, and gives you a receipt." },
  { num: "03", name: "Expert Cleaning", desc: "Your garments are sorted, cleaned with premium detergents, and quality-checked." },
  { num: "04", name: "Fresh at Your Doorstep", desc: "Neatly folded, fragrance-fresh, and delivered within 24–48 hours." },
];

function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const path = pathRef.current;
    if (!sec || !path) return;
    const len = path.getTotalLength();
    path.style.setProperty("--len", `${len}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            sec.querySelectorAll(".draw-path, .dot-pop, .reveal").forEach((n, i) => {
              setTimeout(() => n.classList.add("is-visible"), i * 60);
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  const stepGap = 180; // px between step centers
  const top = 30;
  const svgH = top + stepGap * (processSteps.length - 1) + 30;

  return (
    <section id="process" ref={sectionRef} className="px-6 py-28 md:py-36 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[2fr_3fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="label-eyebrow">Our Process</span>
          <h2 className="font-display mt-5 text-4xl italic leading-[1.1] text-text-primary md:text-5xl lg:text-[56px]">
            From your door,<br />to ours and back.
          </h2>
          <p className="mt-6 max-w-md text-base text-text-muted md:text-[17px]">
            Four steps. Zero effort on your part. We handle everything with the care your clothes deserve.
          </p>
        </div>

        <div className="relative">
          <svg
            width="40"
            height={svgH}
            viewBox={`0 0 40 ${svgH}`}
            className="absolute left-0 top-0"
            aria-hidden
          >
            <path
              ref={pathRef}
              d={`M 20 ${top} L 20 ${svgH - 30}`}
              stroke="var(--green-primary)"
              strokeWidth="2"
              fill="none"
              className="draw-path"
              strokeLinecap="round"
            />
          </svg>

          <ol className="relative">
            {processSteps.map((s, i) => (
              <li
                key={s.num}
                className="relative grid grid-cols-[40px_1fr] items-start"
                style={{ minHeight: i === processSteps.length - 1 ? 60 : stepGap }}
              >
                <div className="relative flex justify-center" style={{ paddingTop: top - 7 }}>
                  <span
                    className="dot-pop flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[color:var(--green-primary)]"
                    style={{ transitionDelay: `${0.3 + i * 0.18}s` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>
                <div
                  className="reveal pl-6 md:pl-10"
                  style={{ paddingTop: top - 14, transitionDelay: `${0.4 + i * 0.2}s` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="hidden h-px w-8 bg-[color:var(--green-primary)]/30 md:block" />
                    <span className="label-price text-[11px] text-[color:var(--green-primary)]">STEP {s.num}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-text-primary md:text-[22px]">{s.name}</h3>
                  <p className="mt-2 max-w-md text-[15px] leading-[1.7] text-text-muted">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ====== FOUNDER ====== */
function Stat({ value, label, suffix = "", decimals = 0 }: { value: number; label: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1200;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(value * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  const display = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-IN");
  return (
    <div className="flex-1">
      <span ref={ref} className="font-display text-4xl text-[color:var(--green-primary)]">
        {display}{suffix}
      </span>
      <p className="label-price mt-2 text-[11px] text-text-muted">{label}</p>
    </div>
  );
}

function Founder() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sigRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const sig = sigRef.current;
    if (!sec) return;
    if (sig) {
      const len = sig.getTotalLength();
      sig.style.setProperty("--len", `${len}`);
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          sec.querySelectorAll(".draw-path, .line-clip, .reveal").forEach((n, i) => {
            setTimeout(() => n.classList.add("is-visible"), i * 90);
          });
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  const p1Lines = [
    "\u201CI started Spinzo because I was tired of getting clothes",
    "back from local laundries smelling of someone else's",
    "detergent, missing buttons, or returned two days late",
    "with no explanation.",
  ];
  const p2Lines = [
    "Every garment that passes through Spinzo is treated as if",
    "it belongs to someone I care about — because it does. We",
    "use hospital-grade hygiene, gentle pH-balanced detergents,",
    "and every item is hand-inspected before it's returned.\u201D",
  ];

  return (
    <section id="founder" ref={sectionRef} className="bg-white">
      <div className="grid min-h-[100vh] lg:grid-cols-2">
        <div className="relative h-[420px] lg:h-auto">
          <img
            src={founderImage}
            alt="Chetan, Founder of Spinzo"
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, rgba(255,255,255,0) 85%, #ffffff 100%)" }} />
        </div>
        <div className="flex items-center px-6 py-16 md:px-12 lg:px-[72px] lg:py-20">
          <div className="max-w-[520px]">
            <span className="label-eyebrow">A word from the founder</span>
            <h2 className="font-display mt-5 text-[34px] leading-[1.05] text-text-primary md:text-[48px]">
              Chetan<br />Singh Rathore
            </h2>
            <div className="my-6 h-px w-12 bg-[color:var(--green-primary)]" />

            <div className="space-y-5 text-[16px] leading-[1.85] text-text-muted">
              <p>
                {p1Lines.map((l, i) => (
                  <span key={i} className="line-clip" style={{ transitionDelay: `${0.1 + i * 0.08}s` }}>
                    <span>{l}</span>
                  </span>
                ))}
              </p>
              <p>
                {p2Lines.map((l, i) => (
                  <span key={i} className="line-clip" style={{ transitionDelay: `${0.5 + i * 0.08}s` }}>
                    <span>{l}</span>
                  </span>
                ))}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-text-primary">Chetan Singh Rathore</p>
              <p className="text-[13px] text-text-muted">Founder & CEO, Spinzo Laundry · Jaipur</p>
            </div>

            <svg width="120" height="48" viewBox="0 0 120 48" className="mt-3" aria-hidden>
              <path
                ref={sigRef}
                d="M8 40 C 20 8, 32 8, 32 24 C 32 40, 20 40, 32 24 C 44 8, 60 4, 72 20 C 84 36, 76 44, 88 36 C 100 28, 108 32, 116 28"
                stroke="var(--green-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                className="draw-path"
              />
            </svg>

            <div className="mt-10 flex items-stretch gap-6 border-t border-black/10 pt-6">
              <Stat value={2000} suffix="+" label="Families served" />
              <div className="w-px bg-black/10" />
              <Stat value={4.9} decimals={1} suffix="★" label="Avg. rating" />
              <div className="w-px bg-black/10" />
              <Stat value={3} label="Years in Jaipur" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== TESTIMONIALS (featured + carousel) ====== */
const featured = {
  quote:
    "I've used 4 different laundry services in Jaipur. Spinzo is the first one where my silk sarees came back looking like they were freshly bought. The attention to detail is genuinely unmatched.",
  name: "Anjali Mehta",
  meta: "C-Scheme, Jaipur · Google Review",
};

const reviews = [
  { name: "Aditya Batwara",     img: adityaImg,  area: "Vaishali Nagar", service: "Wash & Fold",  quote: "Two bags of laundry, picked up at 10am, back at my door by 6pm. That's Spinzo. Every single week." },
  { name: "Hardik Maheshwari",  img: hardikImg,  area: "Malviya Nagar",  service: "Dry Cleaning", quote: "My wedding sherwani came back in perfect condition. I had my doubts, but they handled it with absolute care." },
  { name: "Jash",               img: jashImg,    area: "Mansarovar",     service: "Express 3hr",  quote: "I had a job interview the next morning and realized my shirts were unwashed. One WhatsApp message and Spinzo sorted it. Lifesavers." },
  { name: "Lakshya Sharma",     img: lakshyaImg, area: "Jagatpura",      service: "Blankets",     quote: "Finally got my winter blankets deep-cleaned. The smell alone when they came back was worth every rupee." },
  { name: "Pulkit Jain",        img: pulkitImg,  area: "Sodala",         service: "Steam Iron",   quote: "I've tried the other apps. None of them match Spinzo's consistency. Five stars every single time." },
];

function Testimonials() {
  const ref = useReveal<HTMLDivElement>();
  const carRef = useReveal<HTMLDivElement>();
  return (
    <section className="px-6 py-24 md:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="reveal text-center">
          <span className="label-eyebrow">Verified Experiences</span>
          <h2 className="font-display mt-4 text-4xl italic text-text-primary md:text-5xl lg:text-[52px]">
            Jaipur trusts Spinzo.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-text-muted">
            Over 2,000 families. Every single pickup, delivered on time.
          </p>
        </div>

        {/* Featured */}
        <div className="relative mx-auto mt-16 max-w-[720px] px-8 py-12">
          <span aria-hidden className="font-display absolute left-0 top-0 text-[96px] leading-none text-[color:var(--green-primary)] opacity-20">
            "
          </span>
          <p className="font-display text-center text-[22px] italic leading-[1.6] text-text-primary md:text-[26px]">
            {featured.quote}
          </p>
          <span aria-hidden className="font-display absolute bottom-0 right-0 text-[96px] leading-none text-[color:var(--green-primary)] opacity-20">
            "
          </span>
          <div className="mx-auto mt-8 h-px w-10 bg-[color:var(--green-primary)]" />
          <p className="mt-6 text-center text-[15px] font-semibold text-text-primary">{featured.name}</p>
          <p className="text-center text-[13px] text-text-muted">{featured.meta}</p>
          <div className="mt-3 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[color:var(--green-primary)] text-[color:var(--green-primary)]" />
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div ref={carRef} className="reveal no-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 lg:-mx-10 lg:px-10">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="w-[330px] shrink-0 snap-start rounded-[20px] border border-[color:var(--green-primary)]/10 bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] md:w-[360px]"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[color:var(--green-primary)] text-[color:var(--green-primary)]" />
                ))}
              </div>
              <p className="mt-4 text-[15px] italic leading-[1.7] text-text-primary">"{r.quote}"</p>
              <div className="my-5 h-px bg-[color:var(--bg-card)]" />
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="h-10 w-10 rounded-full object-cover object-top ring-2 ring-[color:var(--green-muted)]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{r.name}</p>
                    <p className="text-[12px] text-text-muted">{r.area}</p>
                  </div>
                </div>
                <span className="rounded-full bg-[color:var(--green-muted)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--green-primary)]">
                  {r.service}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCta() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="pricing" ref={ref} className="reveal px-6 py-24 text-center md:py-32 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl text-text-primary md:text-5xl lg:text-6xl">
          Starting at just <span className="italic">₹5 per kg.</span>
        </h2>
        <p className="mt-6 text-base text-text-muted md:text-lg">
          No minimums. No subscriptions. Pay only for what you send.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={waLink("Hi, I'd like to book a laundry pickup with Spinzo!")}
            className="inline-flex items-center justify-center rounded-lg bg-[color:var(--green-primary)] px-7 py-4 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[color:var(--green-dark)]"
          >
            Book a Pickup
          </a>
          <a
            href={waLink("Hi, I'd like to chat about Spinzo services.")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[color:var(--green-primary)] px-7 py-4 text-sm font-medium text-[color:var(--green-primary)] transition-all hover:bg-[color:var(--green-muted)]"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
        <p className="mt-8 text-sm text-text-muted">
          🔒 Secure payment · 📦 Free pickup above ₹499 · ⚡ 24hr standard turnaround
          <br />
          <a href="#" className="mt-1 inline-block underline underline-offset-2 opacity-60 hover:opacity-100">
            Terms &amp; Conditions apply
          </a>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[color:var(--color-ink)] px-6 py-20 text-white lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="#top" className="font-display text-3xl italic text-white">Spinzo</a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Boutique laundry care for Jaipur. Picked up, pressed, and returned with quiet precision.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="https://www.instagram.com/spinzo.laundry?igsh=YjJiZm9oYjlmaXNv&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={waLink("Hi Spinzo!")} aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="label-price text-xs text-white/50">Services</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {services.map((s) => (
              <li key={s.name}><a href="#services" className="transition-colors hover:text-white">{s.name}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="label-price text-xs text-white/50">Company</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li><a href="#founder" className="hover:text-white">About</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
          </ul>
        </div>
        <div>
          <h4 className="label-price text-xs text-white/50">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +91 9509301343</li>
            <li>
              <a href={waLink("Hi Spinzo!")} className="inline-flex items-center gap-2 hover:text-white">
                <MessageCircle className="h-4 w-4 shrink-0" /> Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:contact.spinzolaundry@gmail.com" className="inline-flex items-center gap-2 hover:text-white break-all">
                <Mail className="h-4 w-4 shrink-0" /> contact.spinzolaundry@gmail.com
              </a>
            </li>
            <li className="text-white/60">Jagatpura, Jaipur,<br />Rajasthan 302017</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © 2024 Spinzo Laundry. Built with care in Jaipur.
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={waLink("Hi Chetan, I'd like to book a premium laundry service with Spinzo.")}
      aria-label="Order on WhatsApp"
      className={`group fixed bottom-5 right-4 z-[9999] inline-flex items-center gap-2 rounded-full bg-[color:var(--color-whatsapp)] px-4 py-3 text-white transition-all duration-300 hover:scale-[1.04] hover:bg-[#2ecc71] md:bottom-8 md:right-8 md:px-5 md:py-3.5 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"} wa-pulse hover:[animation-play-state:paused]`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.46 0 .11 5.34.11 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.65a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.18-1.24-6.18-3.46-8.41ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98 1-3.62-.24-.37a9.86 9.86 0 0 1-1.51-5.28c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.84 9.84 0 0 1 2.91 7.02c0 5.47-4.46 9.87-9.97 9.87Zm5.45-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.39-1.49-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.44 0 1.44 1.06 2.83 1.2 3.03.15.2 2.08 3.17 5.04 4.44.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
      <span className="text-[13px] font-semibold md:text-sm">Quick Order</span>
    </a>
  );
}

function PageLoader() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onLoad = () => setLoaded(true);
    if (document.readyState === "complete") {
      setTimeout(() => setLoaded(true), 600);
    } else {
      window.addEventListener("load", onLoad);
    }
    return () => window.removeEventListener("load", onLoad);
  }, []);
  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setHidden(true), 750);
      return () => clearTimeout(t);
    }
  }, [loaded]);
  if (hidden) return null;
  return (
    <div className={`page-loader${loaded ? " loaded" : ""}`} aria-hidden>
      {/* Washing machine drum icon */}
      <div className="relative">
        <div className="loader-drum" />
        <div className="absolute inset-0 flex items-center justify-center">
          <WashingMachine className="h-7 w-7 text-[color:var(--green-primary)]" />
        </div>
      </div>
      {/* Bubbles — like soap suds */}
      <div className="loader-bubbles">
        <span /><span /><span />
      </div>
      <p className="font-display text-lg italic text-[color:var(--green-primary)]">Spinzo</p>
      <p className="text-xs tracking-widest text-text-muted uppercase">Getting your laundry ready…</p>
    </div>
  );
}

function Index() {
  return (
    <main className="overflow-x-hidden">
      <PageLoader />
      <Nav />
      <Hero />
      <SocialProof />
      <Services />
      <ProcessTimeline />
      <Founder />
      <Testimonials />
      <SubscriptionPlans />
      <PricingSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

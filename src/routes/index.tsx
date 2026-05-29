import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Phone, ChevronDown, Menu, X, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import closetImg from "@/assets/closet.jpg";
import pantryImg from "@/assets/pantry.jpg";
import darkOffice from "@/assets/dark-office.jpg";
import whyFrame1 from "@/assets/why-frame-1.jpg";
import whyFrame2 from "@/assets/why-frame-2.jpg";
import whyFrame3 from "@/assets/why-frame-3.jpg";
import whyFrame4 from "@/assets/why-frame-4.jpg";
import showroom from "@/assets/showroom.jpg";
import consult from "@/assets/consult.jpg";
import library from "@/assets/library.jpg";
import storageCloset from "@/assets/storage-closet.png";
import storagePantry from "@/assets/storage-pantry.png";
import storageEntertainment from "@/assets/storage-entertainment.png";
import storageMudroom from "@/assets/storage-mudroom.png";
import storageLaundry from "@/assets/storage-laundry.png";
import storageGarage from "@/assets/storage-garage.png";
import storageOffice from "@/assets/storage-office.png";
import storageMore from "@/assets/storage-more.png";
import miami from "@/assets/miami.jpg";
import countyBroward from "@/assets/county-broward.jpg";
import countyCollier from "@/assets/county-collier.jpg";
import countyIndianRiver from "@/assets/county-indianriver.jpg";
import countyOkeechobee from "@/assets/county-okeechobee.jpg";
import countyPalmBeach from "@/assets/county-palmbeach.jpg";
import countyBrickell from "@/assets/county-brickell.jpg";
import countyJupiter from "@/assets/county-jupiter.jpg";
import jlLogo from "@/assets/jl-logo.png";
import { CaterpillarCarousel } from "@/components/CaterpillarCarousel";
import { WorksCarousel } from "@/components/WorksCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Custom Closet Systems & Storage Solutions in South Florida" },
      {
        name: "description",
        content:
          "Bespoke closets, pantries, and storage systems designed and installed across South Florida.",
      },
    ],
  }),
  component: Index,
});

const NAV: { label: string; submenu?: { heading: string; items: string[] }[] }[] = [
  {
    label: "Closets & Storage",
    submenu: [
      { heading: "Custom Storage", items: ["Walk-In Closets", "Reach-In Closets", "Shoe Storage"] },
      { heading: "Pantries", items: ["Pantry Cabinets", "Pantry Shelving"] },
      { heading: "Laundry Room", items: ["Laundry Room Cabinets", "Laundry Room Shelving"] },
      { heading: "Garage", items: ["Garage Cabinets & Shelving"] },
      { heading: "More Storage Ideas", items: ["Small Space Storage", "Murphy Bed", "Wine Racks"] },
      { heading: "Luxury", items: ["High End Wardrobe with Integrate Shoe Organizer", "Entertainment Center", "Home Office", "Mudroom"] },
    ],
  },
  {
    label: "About",
    submenu: [
      {
        heading: "Who We Are & How We Work",
        items: [
          "Custom Storage Solutions",
          "About",
          "Contact Us",
          "Our Showroom",
          "FAQ",
          "Design Process",
          "Customer Service",
          "Careers",
        ],
      },
      {
        heading: "Why We Are The Best",
        items: ["Best Custom Closet Systems", "Awards", "JL Closets Reviews"],
      },
    ],
  },
  {
    label: "JL Closets Gallery",
    submenu: [
      {
        heading: "See Our Work",
        items: ["Home Organization Idea Gallery", "Portfolio"],
      },
    ],
  },
  {
    label: "Service Areas",
    submenu: [
      {
        heading: "Areas We Serve",
        items: [
          "Broward County",
          "Collier County",
          "Lee County",
          "Lee County",
          "Martin County",
          "Miami Dade County",
          "Okeechobee County",
          "Palm Beach County",
          "St Lucie County",
        ],
      },
    ],
  },
  {
    label: "Accessories",
    submenu: [
      {
        heading: "Upgrade Your Space",
        items: [
          "Closet Lighting",
          "Cabinet Finishes",
          "Custom Closet Doors And Drawers",
          "Closet Accessories",
          "Pantry Accessories",
          "Garage Accessories",
        ],
      },
    ],
  },
  { label: "Contact Us" },
];

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.01L4.6 22H1.34l8.03-9.17L1 2h7.02l4.85 6.42L18.24 2zm-1.2 18h1.9L7.06 4H5.05l11.99 16z" />
    </svg>
  );
}
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.6 6.32a5.6 5.6 0 0 1-3.36-1.12 5.6 5.6 0 0 1-2.16-3.2H10.8v13.2a2.64 2.64 0 1 1-2.64-2.64c.27 0 .53.04.78.12V9.36a5.92 5.92 0 0 0-.78-.06A5.94 5.94 0 1 0 14.1 15.2V8.46a8.6 8.6 0 0 0 5.5 1.96V7.14a5.6 5.6 0 0 1 0-.82z" />
    </svg>
  );
}
function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.32-.09-.79-.17-2.01.04-2.88.19-.78 1.22-4.96 1.22-4.96s-.31-.62-.31-1.55c0-1.45.84-2.53 1.89-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.86 3.48-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.27-1.95 3.27-4.77 0-2.49-1.79-4.24-4.35-4.24-2.96 0-4.7 2.22-4.7 4.52 0 .9.34 1.86.77 2.38.08.1.1.19.07.29-.08.33-.26 1.04-.29 1.18-.05.19-.16.23-.36.14-1.35-.63-2.2-2.6-2.2-4.18 0-3.4 2.47-6.53 7.13-6.53 3.74 0 6.65 2.67 6.65 6.23 0 3.72-2.34 6.71-5.6 6.71-1.09 0-2.12-.57-2.47-1.24l-.67 2.57c-.24.94-.9 2.12-1.34 2.84.99.31 2.04.48 3.13.48 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

function Yellow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`bg-primary text-primary-foreground px-7 py-2.5 text-sm font-semibold hover:opacity-90 transition font-sans ${className}`}
    >
      {children}
    </button>
  );
}

function Section({
  num,
  children,
  className = "",
}: {
  num: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative px-5 md:px-10 lg:px-16 py-14 md:py-20 ${className}`}>
      {children}
    </section>
  );
}

type ProcessStep = { k: string; t: string; d: string; img: string };

function ProcessScroller({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const compute = () => {
      const anchor = window.innerHeight * 0.55;
      let bestIdx = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - anchor);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [steps.length]);

  return (
    <>
      {/* MOBILE: image directly above each step, no sticky effect */}
      <div className="md:hidden space-y-16">
        {steps.map((s, i) => (
          <div key={i}>
            <div className="relative w-full aspect-[4/3] overflow-hidden mb-6">
              <img src={s.img} alt={s.t} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="eyebrow mb-3 text-foreground/60">{s.k}</p>
            <h3 className="font-display text-3xl leading-tight mb-4 font-bold text-[#474747]">{s.t}</h3>
            <p className="text-[14px] leading-relaxed text-foreground/70">{s.d}</p>
          </div>
        ))}
      </div>

      {/* TABLET + DESKTOP: sticky scroller */}
      <div className="hidden md:grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        <div className="md:sticky md:top-0 md:h-screen md:max-h-[900px] md:flex md:items-center md:pt-24">
          <div className="relative w-full aspect-[4/5] max-h-full overflow-hidden">
            {steps.map((s, i) => (
              <img
                key={i}
                src={s.img}
                alt={s.t}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: active === i ? 1 : 0 }}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="md:py-[25vh] space-y-[25vh]">
          {steps.map((s, i) => (
            <div
              key={i}
              data-idx={i}
              ref={(el) => { refs.current[i] = el; }}
              className="transition-opacity duration-300"
              style={{ opacity: active === i ? 1 : 0.2 }}
            >
              <p className="eyebrow mb-3 text-foreground/60">{s.k}</p>
              <h3 className="font-display text-3xl md:text-4xl leading-tight mb-4 font-bold text-[#474747]">{s.t}</h3>
              <p className="text-[14px] leading-relaxed max-w-md text-foreground/70">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const frames = [whyFrame1, whyFrame2, whyFrame3, whyFrame4];
  // Map progress (0..1) to frame opacities. Each frame dominates a quadrant with crossfade.
  const frameOpacity = (i: number) => {
    const p = progress * 3; // 0..3 across 4 frames
    const d = Math.abs(p - i);
    return Math.max(0, 1 - d);
  };

  return (
    <section ref={sectionRef} className="relative text-ink-foreground h-[220vh] md:h-[350vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {frames.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[70%_center] md:object-center"
            style={{ opacity: frameOpacity(i), willChange: "opacity" }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:hidden" />
        <div className="relative h-full w-full flex flex-col">
          <p className="eyebrow text-center pt-12 text-ink-foreground rule mx-auto w-fit">
            WHY CHOOSE US
          </p>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-28 flex flex-col items-center gap-2 text-ink-foreground/80 pointer-events-none transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - progress * 4) }}
          >
            <span className="text-[10px] uppercase">Scroll to reveal</span>
            <span className="relative block w-5 h-8 rounded-full border border-ink-foreground/70">
              <span className="absolute left-1/2 top-1.5 -translate-x-1/2 w-0.5 h-1.5 bg-ink-foreground/80 rounded-full animate-[scroll-wheel_1.5s_ease-in-out_infinite]" />
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>

          <div
            className="mt-auto px-5 md:px-12 pb-8 md:pb-12 pt-6 max-w-[1600px] mx-auto w-full"
            style={{ textShadow: `0 2px 18px rgba(0,0,0,${Math.min(0.85, progress * 1.2)}), 0 1px 3px rgba(0,0,0,${Math.min(0.7, progress)})` }}
          >

            <p className="font-sans font-normal text-sm md:text-lg leading-snug max-w-5xl mb-5 md:mb-10 text-ink-foreground">
              With over <strong className="font-bold">30 years of expertise</strong>, we are <strong className="font-bold">South Florida’s most awarded</strong> custom storage provider.
              Our commitment to quality, innovative design, and expert craftsmanship ensures a seamless
              experience tailored to your home.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-4 md:gap-8 border-t border-ink-foreground/30 pt-4 md:pt-8">
              {[
                ["Same-day or Next-day Free Consultation", "Get expert design at your doorstep with same-day or\nnext-day appointments."],
                ["Over 30 Years of Expertise", "South Florida’s oldest closet company, delivering inmatched reliability and professional service."],
                ["Florida’s Most Awarded", "8-Time Best Pick Top-rated for 8 consecutive years, reflecting our unwavering commitment to excellence."],
                ["Standing Behind Our Work", "Our quality extends for years, offering dedicated support and peace of mind after installation."],
                ["Customer-centric Aproach", "Professional and accommodating service designed to ensure a superior experience at every step."],
              ].map(([k, d]) => (
                <div key={k}>
                  <p className="font-display text-sm md:text-lg mb-1 md:mb-3 leading-tight text-ink-foreground font-bold">{k}</p>
                  <p className="text-[11px] md:text-xs leading-snug whitespace-pre-line text-white/90">{d}</p>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

const SERVICE_AREAS: { name: string; image: string }[] = [
  { name: "Broward County", image: countyBroward },
  { name: "Collier County", image: countyCollier },
  { name: "Indian River County", image: countyIndianRiver },
  { name: "Lee County", image: countyIndianRiver },
  { name: "Martin County", image: countyBrickell },
  { name: "Miami Dade County", image: countyPalmBeach },
  { name: "Okeechobee County", image: countyOkeechobee },
  { name: "Palm Beach County", image: countyPalmBeach },
  { name: "Port ST Lucie County", image: countyJupiter },
];

function ServiceAreas() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const activeIndex = hovered ?? 0;
  const activeArea = SERVICE_AREAS[activeIndex];

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== mobileIndex) setMobileIndex(i);
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
      <div className="max-w-xs md:max-w-lg lg:max-w-xs mx-auto lg:mx-0 mb-12 lg:mb-0 lg:shrink-0">
        <p className="font-sans text-[15px] md:text-[18px] lg:text-[20px] leading-relaxed" style={{ color: "#474747" }}>
          <span className="underline decoration-foreground/60 underline-offset-4">
            We proudly serve the entire South Florida region
          </span>
          , bringing custom storage craftsmanship to homes across every county we touch.
        </p>
      </div>

      {/* MOBILE CAROUSEL */}
      <div className="md:hidden flex-1 min-w-0">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4 gap-4"
          style={{ scrollbarWidth: "none" }}
        >
          {SERVICE_AREAS.map((area) => (
            <div key={area.name} className="snap-center shrink-0 w-full">
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <img
                  src={area.image}
                  alt={area.name}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-display text-lg leading-tight">{area.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {SERVICE_AREAS.map((area, i) => (
            <button
              key={area.name}
              type="button"
              aria-label={`Go to ${area.name}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === mobileIndex ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP / TABLET */}
      <div className="hidden md:grid flex-1 min-w-0 md:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-square w-full max-w-sm md:mx-0 overflow-hidden bg-muted">
          {SERVICE_AREAS.map((area, i) => (
            <img
              key={area.name + i}
              src={area.image}
              alt={area.name}
              width={512}
              height={512}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
            />
          ))}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white font-display text-lg leading-tight">{activeArea.name}</p>
          </div>
        </div>
        <div className="relative">
          <div className="bg-primary text-primary-foreground p-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[14px]">
              {SERVICE_AREAS.map((area, i) => (
                <li
                  key={area.name + i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`cursor-default transition-opacity ${
                    hovered === null || hovered === i ? "opacity-100" : "opacity-50"
                  } ${i === activeIndex ? "font-medium" : ""}`}
                >
                  {area.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}



function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      const heroH = heroRef.current?.offsetHeight ?? window.innerHeight;
      setScrollY(Math.min(Math.max(y, 0), heroH));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <main className="bg-background text-foreground overflow-x-clip">
      {/* STICKY NAV */}
      <nav
        className={`fixed top-3 left-4 right-4 z-50 flex items-center justify-between px-6 md:px-12 py-4 font-medium transition-all duration-300 border rounded-2xl ${
          scrolled
            ? "bg-white border-black/10 shadow-lg text-black"
            : "bg-transparent border-transparent text-ink-foreground"
        }`}
      >
        <img
          src={jlLogo}
          alt="JL Closets"
          className={`h-12 md:h-14 w-auto transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`}
        />
        <ul className="hidden lg:flex items-center gap-10 text-[16px] font-medium">
          {NAV.map((n) => (
            <li key={n.label} className="relative cursor-pointer group py-6">
              <span className="hover:opacity-70 transition-opacity inline-flex items-center gap-1">
                {n.label}
                {n.submenu && (
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                )}
              </span>
              {n.submenu && (
                <div className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute left-0 top-full bg-background text-foreground shadow-xl border border-foreground/10 p-6 z-50 ${n.submenu.length > 1 ? "grid grid-cols-2 gap-x-10 gap-y-4 w-[560px]" : "w-[280px]"}`}>
                  {n.submenu.map((col) => (
                    <div key={col.heading}>
                      <p className="text-[12px] font-medium text-foreground/50 mb-2">{col.heading}</p>
                      <ul className="space-y-0.5">
                        {col.items.map((it) => (
                          <li key={it} className="text-[15px] font-semibold leading-tight hover:text-primary py-0.5">
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-3 font-medium">
          <Yellow>FREE Consultation</Yellow>
          <button
            aria-label="Call Us"
            className="bg-ink text-ink-foreground px-7 py-2.5 inline-flex items-center gap-2 text-sm font-semibold font-sans"
          >
            <Phone className="w-4 h-4" />
            CALL US!
          </button>
        </div>
        <button
          aria-label="Open menu"
          className={`lg:hidden p-2 ${scrolled ? "text-black" : "text-ink-foreground"}`}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-7 h-7" />
        </button>
      </nav>

      {/* HERO */}
      <header ref={heroRef} className="relative h-[130vh] min-h-[900px] w-full overflow-hidden">
        {/* Parallax background: image is taller than the header and translates
            upward at a slower rate than the page scroll, creating real parallax
            (foreground content scrolls faster than the background). */}
        <div
          className="absolute inset-x-0 top-0 h-[160%] will-change-transform"
          style={{ transform: `translate3d(0, ${scrollY * -0.35}px, 0)` }}
        >
          <img
            src={heroKitchen}
            alt="Custom kitchen with bespoke wood cabinetry"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />
        </div>

        {/* Hero copy — starts near the top and translates downward with scroll
            so it stays in the viewport as the user scrolls through the hero,
            stopping near the bottom of the section. */}
        <div
          className="absolute left-5 right-5 md:left-16 md:right-16 top-[50vh] max-w-3xl text-ink-foreground will-change-transform"
          style={{
            transform: `translate3d(0, ${Math.min(
              scrollY,
              Math.max(0, (heroRef.current?.offsetHeight ?? 1100) - (typeof window !== "undefined" ? window.innerHeight : 800) * 0.55 - 320)
            )}px, 0)`,
          }}
        >
          <p className="mb-6 opacity-90 text-[15px] font-medium">Let Us Create Your Calm™</p>
          <h1 className="font-sans font-medium text-[26px] sm:text-3xl md:text-5xl leading-[1.15] mb-8">
            Custom Closet Systems &amp;<br />
            Storage Solutions in South Florida.
          </h1>
          <Yellow>Schedule a FREE Consultation</Yellow>
        </div>


        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-background text-foreground overflow-y-auto">
            <div className="flex items-center justify-between px-6 pt-8">
              <img src={jlLogo} alt="JL Closets" className="h-12 w-auto" />
              <button
                aria-label="Close menu"
                className="p-2"
                onClick={() => { setMobileOpen(false); setOpenSection(null); }}
              >
                <X className="w-7 h-7" />
              </button>
            </div>
            <ul className="px-6 pt-10 pb-12 divide-y divide-foreground/10">
              {NAV.map((n) => {
                const isOpen = openSection === n.label;
                return (
                  <li key={n.label} className="py-1">
                    <button
                      className="w-full flex items-center justify-between py-4 text-left text-[18px] font-medium"
                      onClick={() => n.submenu ? setOpenSection(isOpen ? null : n.label) : setMobileOpen(false)}
                    >
                      <span>{n.label}</span>
                      {n.submenu && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      )}
                    </button>
                    {n.submenu && isOpen && (
                      <div className="pb-6 space-y-5">
                        {n.submenu.map((col) => (
                          <div key={col.heading}>
                            <p className="text-[12px] font-medium text-foreground/50 mb-2">{col.heading}</p>
                            <ul className="space-y-1">
                              {col.items.map((it) => (
                                <li key={it} className="text-[15px] font-semibold py-1">
                                  {it}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="px-6 pb-10 flex flex-col gap-3">
              <Yellow className="!w-full">FREE Consultation</Yellow>
              <button className="bg-ink text-ink-foreground px-7 py-2.5 inline-flex justify-center items-center gap-2 text-sm font-semibold font-sans w-full">
                <Phone className="w-4 h-4" /> CALL US!
              </button>
            </div>
          </div>
        )}

      </header>

      {/* SECTION 01 — Intro + two images */}
      <Section num="01">
        <div className="text-center mb-12">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Custom Storage Solutions</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
          <div className="max-w-xs md:max-w-lg lg:max-w-xs mx-auto lg:mx-0 mb-12 lg:mb-0 lg:shrink-0">
            <p className="font-sans text-[15px] md:text-[18px] lg:text-[20px] leading-relaxed" style={{ color: "#474747" }}>
              <span className="underline decoration-foreground/60 underline-offset-4">
                From custom closets to garages, pantries, home offices and more, JL Closets designs tailored storage solutions for every space in your home—guided
              </span>{" "}
              by a simple process, expert installation, and over 30 years of award-winning experience.
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <CaterpillarCarousel
              slides={[
                { src: storageCloset, label: "Custom Closets" },
                { src: storagePantry, label: "Pantry Organization" },
                { src: storageMudroom, label: "Mudroom Storage" },
                { src: storageLaundry, label: "Laundry Room Organization" },
                { src: storageEntertainment, label: "Entertainment Centers & Wall Units" },
                { src: storageGarage, label: "Garage Storage" },
                { src: storageOffice, label: "Home Office" },
                { src: storageMore, label: "More Storage Ideas" },
              ]}
            />
          </div>
        </div>
      </Section>

      {/* SECTION 02 — Process */}
      <Section num="02">
        <div className="text-center mb-8">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Our Process</span>
        </div>
        <p className="text-center max-w-2xl mx-auto font-display text-2xl md:text-3xl leading-snug mb-14">
          From the first sketch to the final installation, our step-by-step approach ensures a seamless experience and a storage solution tailored to your life.
        </p>

        <ProcessScroller
          steps={[
            {
              k: "1.",
              t: "In-Home Consultation",
              d: "We assess your space and vision to design a tailored storage solution that fits your lifestyle.",
              img: consult,
            },
            {
              k: "2.",
              t: "Design & Precision Drafting",
              d: "We transform your vision into a detailed 3D designs and meticulously craft your system using premium materials.",
              img: darkOffice,
            },
            {
              k: "3.",
              t: "Expert Installations",
              d: "Highly trained professionals handle your installation with the utmost care, keeping your informed until you are entirely satisfied.",
              img: library,
            },
            {
              k: "4.",
              t: "Enjoy Organized Living",
              d: "Step into a beautifully organized space where every item has its place, designed for flawless performance and lasting style.",
              img: closetImg,
            },
          ]}
        />
      </Section>

      {/* SECTION 03 — Why Choose Us (scroll-driven cinematic) */}
      <WhyChooseUs />


      {/* SECTION 04 — Gallery row */}
      <Section num="04">
        <div className="text-center mb-20 md:mb-28">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Works</span>
        </div>
        <WorksCarousel
          images={[closetImg, pantryImg, darkOffice, library, hero(heroKitchen), pantryImg]}
        />

      </Section>

      {/* SECTION 05 — Service area + pricing card */}
      <Section num="05">
        <div className="text-center mb-12">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Service Areas</span>
        </div>
        <ServiceAreas />
      </Section>

      {/* SECTION 06 — Showroom hero */}
      <section className="relative">
        <img src={showroom} alt="JL Closets showroom in Boca Raton at dusk" className="w-full h-screen md:h-[110vh] object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="px-6 md:px-16 pb-12 md:pb-20 text-ink-foreground w-full max-w-6xl">
            <p className="eyebrow mb-6 opacity-80 text-white reveal-up" style={{ animationDelay: "0ms", letterSpacing: 0 }}>— SHOWROOM —</p>
            <h2 className="font-sans text-xl md:text-2xl leading-snug mb-10 max-w-3xl reveal-up" style={{ animationDelay: "120ms", letterSpacing: 0 }}>
              <strong className="font-bold">Experience Quality Firsthand</strong> visit our Boca Raton showroom to explore our custom systems up close.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 text-sm mb-8 max-w-4xl">
              <div className="reveal-up" style={{ animationDelay: "240ms" }}>
                <p className="eyebrow font-bold mb-2">Phone</p>
                <p className="opacity-90">(561) 912 9881</p>
              </div>
              <div className="reveal-up" style={{ animationDelay: "320ms" }}>
                <p className="eyebrow font-bold mb-2">Email</p>
                <p className="opacity-90">leads@jlclosets.com</p>
              </div>
              <div className="reveal-up" style={{ animationDelay: "400ms" }}>
                <p className="eyebrow font-bold mb-2">Showroom</p>
                <p className="opacity-90">160 NW 16th St,<br />Boca Raton, FL 33432</p>
              </div>
              <div className="reveal-up" style={{ animationDelay: "480ms" }}>
                <p className="eyebrow font-bold mb-2">Opening Hours</p>
                <p className="opacity-90">Monday–Friday 9:00AM–6:00PM</p>
                <p className="opacity-90">Saturday 9:00AM–1:00PM</p>
                <p className="opacity-90">Sunday by appointment</p>
              </div>
            </div>

            <div className="reveal-up" style={{ animationDelay: "600ms" }}>
              <Yellow>Google Maps</Yellow>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 07 — Testimonials */}
      <Section num="07" className="min-h-[1100px]">
        <div className="text-center mb-10">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Clients</span>
        </div>
        <div className="max-w-md mx-auto text-center mb-14">
          <p className="eyebrow mb-4 text-foreground/60">— Testimonials</p>
          <p className="font-display text-3xl md:text-4xl leading-snug">
            Honest words from families we've built for.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto h-[700px]">
          {[
            { x: "70%", y: "0", w: "230px", quote: "Truly the most considered cabinetry we've owned.", a: "Marisol R." },
            { x: "5%", y: "190px", w: "220px", quote: "From sketch to install, every step felt like an art.", a: "James K." },
            { x: "78%", y: "240px", w: "230px", quote: "A pantry we now plan dinners around.", a: "Lena & Tom" },
            { x: "55%", y: "560px", w: "230px", quote: "Quiet, clean, and finished to the millimeter.", a: "P. Alvarez" },
          ].map((c, i) => (
            <div
              key={i}
              className="absolute bg-muted-cream p-6 shadow-sm"
              style={{ left: c.x, top: c.y, width: c.w }}
            >
              <p className="text-[10px] text-foreground/50 mb-2">★★★★★</p>
              <p className="font-display text-lg leading-snug mb-4">"{c.quote}"</p>
              <p className="text-xs text-foreground/60">— {c.a}</p>
            </div>
          ))}
          <img
            src={consult}
            alt="client"
            className="absolute w-[160px] aspect-[3/4] object-cover"
            style={{ left: "40%", top: "320px" }}
            loading="lazy"
          />
          <img
            src={consult}
            alt="client"
            className="absolute w-[150px] aspect-[3/4] object-cover grayscale"
            style={{ left: "26%", top: "470px" }}
            loading="lazy"
          />
        </div>

        <div className="text-center mt-12">
          <Yellow>Read All Reviews</Yellow>
        </div>
      </Section>

      {/* SECTION 08 — Contact form */}
      <Section num="08">
        <div className="text-center mb-12">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Begin a Project</span>
        </div>
        <div className="grid md:grid-cols-12 gap-12 max-w-6xl mx-auto">
          <div className="md:col-span-3">
            <p className="font-display text-3xl leading-snug mb-4">
              Tell us about your space.
            </p>
            <p className="text-sm text-foreground/60">
              We respond within one business day.
            </p>
          </div>
          <form className="md:col-span-9 grid md:grid-cols-4 gap-5">
            {[
              ["First Name", "first"],
              ["Last Name", "last"],
              ["Email Address", "email"],
              ["Phone Number", "phone"],
              ["City", "city"],
              ["Project Type", "type"],
              ["Budget", "budget"],
              ["How did you hear about us?", "ref"],
            ].map(([label, name]) => (
              <label key={name} className="block">
                <span className="block text-[10px] mb-2 text-foreground/60">
                  {label}
                </span>
                <input
                  type="text"
                  name={name}
                  className="w-full bg-ink text-ink-foreground px-4 py-3 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </label>
            ))}
            <div className="md:col-span-4 flex justify-end mt-4">
              <Yellow>Submit Inquiry</Yellow>
            </div>
          </form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative bg-ink text-ink-foreground overflow-hidden">
        <img
          src={library}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="relative px-6 md:px-16 py-14">
          {/* Top: Logo left, Newsletter right */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-20">
            <img src={jlLogo} alt="JL Closets" className="h-24 w-auto brightness-0 invert block self-start" />
            <div className="lg:max-w-xl w-full">
              <h3 className="font-display text-2xl md:text-3xl leading-tight mb-5">
                Design Inspiration, Expert Tips<br />& Exclusive Updates
              </h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  placeholder="Sign Up for our latest news and exclusive deals."
                  className="flex-1 bg-transparent border-b border-ink-foreground/30 py-2 text-sm placeholder:text-white text-white focus:outline-none focus:border-primary font-thin"
                />
                <Yellow>Subscribe</Yellow>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-sm">
            {/* Contact column — separated */}
            <div className="md:col-span-4 md:pr-10 space-y-5 text-ink-foreground/75">
              <div>
                <p className="eyebrow mb-1 font-bold text-ink-foreground">Telephone</p>
                <p>(561) 912 9881</p>
              </div>
              <div>
                <p className="eyebrow mb-1 font-bold text-ink-foreground">Email</p>
                <p>leads@jlclosets.com</p>
              </div>
              <div>
                <p className="eyebrow mb-1 font-bold text-ink-foreground">Showroom</p>
                <p>160 NW 16th St, Boca Raton, FL 33432</p>
              </div>
              <div>
                <p className="eyebrow mb-1 font-bold text-ink-foreground">Opening Hours</p>
                <p>Monday–Friday 9:00AM–6:00PM</p>
                <p>Saturday 9:00AM–1:00PM</p>
                <p>Sunday by appointment</p>
              </div>
              <Yellow>Google Maps</Yellow>
            </div>

            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                heading: "About JL Closets",
                items: [
                  "About Us",
                  "Contact Us",
                  "Our Showroom",
                  "Awards",
                  "JL Closets Reviews",
                  "Portfolio",
                  "22 Reasons to Choose Us",
                  "FAQs",
                  "Design Process",
                  "Customer Services",
                  "Careers",
                ],
              },
              {
                heading: "Legal",
                items: ["Privacy Policy", "Terms & Conditions", "Warranty", "Image Licensing"],
              },
              {
                heading: "Services",
                items: [
                  "Custom Closets",
                  "Entertainment Centers",
                  "Garage Storage",
                  "Home Office",
                  "Laundry Rooms",
                  "Mudroom Storage",
                  "Pantry Organization",
                  "More Storage Ideas",
                ],
              },
              {
                heading: "Areas Served",
                items: [
                  "Broward County",
                  "Collier County",
                  "Lee County",
                  "Lee County",
                  "Martin County",
                  "Miami Dade County",
                  "Okeechobee County",
                  "Palm Beach County",
                  "St Lucie County",
                ],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p className="eyebrow mb-4 font-bold text-ink-foreground">{col.heading}</p>
                <ul className="space-y-2 text-ink-foreground/75">
                  {col.items.map((i) => (
                    <li key={i} className="hover:text-primary cursor-pointer transition">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
          </div>



          <div className="mt-16">
            <p className="eyebrow mb-4 !font-bold text-ink-foreground">Connect With Us</p>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: XIcon, label: "X" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: TikTokIcon, label: "TikTok" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: PinterestIcon, label: "Pinterest" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-ink-foreground/40 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-20 pt-6 border-t border-ink-foreground/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-ink-foreground">
            <p>© {new Date().getFullYear()} JL Closets. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Terms & Conditions</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function hero(s: string) {
  return s;
}

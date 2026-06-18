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
import whyBg from "@/assets/why-bg.jpg";
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
import floridaSvgRawOriginal from "@/assets/florida-counties-names.svg?raw";

const SERVICE_IDS = ["Indian_River", "St._Lucie", "Martin", "Okeechobee", "Palm_Beach_County", "Lee", "Broward", "Collier", "Miami-Dade"];

const FLORIDA_STYLES = `<style>
  svg path[id] { fill: #FFFFFF !important; stroke: #B5B5B5 !important; stroke-width: 0.5 !important; stroke-linejoin: round !important; transition: fill 0.3s ease-out, stroke 0.3s ease-out, stroke-width 0.3s ease-out, opacity 0.3s ease-out !important; }
  svg path.service { fill: #F6C33A !important; stroke: #FFFFFF !important; stroke-width: 0.6 !important; }
</style>`;

let processed = floridaSvgRawOriginal.replace(/(<svg[^>]*>)/, `$1${FLORIDA_STYLES}`);
// Bake class="service" onto each service-area path (regex matches `id="X"` on any path)
SERVICE_IDS.forEach((id) => {
  const re = new RegExp(`(<path\\b[^>]*\\bid="${id.replace(/[.\\]/g, (m) => "\\" + m)}")`, "g");
  processed = processed.replace(re, `$1 class="service"`);
});
const floridaSvgRaw = processed;
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

const NAV: { label: string; submenu?: { heading?: string; items: string[] }[] }[] = [
  {
    label: "Closets & Storage",
    submenu: [
      { heading: "Custom Storage", items: ["Walk-In Closets", "Reach-In Closets", "Shoe Storage"] },
      { heading: "Pantries", items: ["Pantry Cabinets", "Pantry Shelving"] },
      { heading: "Laundry Room", items: ["Laundry Room Cabinets", "Laundry Room Shelving"] },
      { heading: "Garage", items: ["Garage Cabinets & Shelving"] },
      { heading: "More Storage Ideas", items: ["Small Space Storage", "Murphy Bed", "Wine Racks"] },
      { heading: "Luxury", items: ["High End Wardrobe with Integrate Shoe Organizer"] },
      { items: ["Entertainment Center", "Home Office", "Mudroom"] },
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
          "Indian River County",
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

function Yellow({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-primary-foreground px-7 py-2.5 text-sm font-semibold hover:opacity-90 transition font-sans cursor-pointer ${className}`}
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
            <h3 className="font-display text-4xl leading-tight mb-4 font-bold text-[#313131]">{s.t}</h3>
            <p className="text-base leading-relaxed text-foreground/70">{s.d}</p>
          </div>
        ))}
      </div>

      {/* TABLET + DESKTOP: sticky scroller */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="md:sticky md:top-0 md:h-screen md:max-h-[900px] md:flex md:items-center md:pt-4">
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

        <div className="md:py-[10vh] space-y-[20vh]">
          {steps.map((s, i) => (
            <div
              key={i}
              data-idx={i}
              ref={(el) => { refs.current[i] = el; }}
              className="transition-opacity duration-300"
              style={{ opacity: active === i ? 1 : 0.2 }}
            >
              <p className="eyebrow mb-3 text-foreground/60">{s.k}</p>
              <h3 className="font-display text-4xl md:text-5xl leading-tight mb-4 font-bold text-[#313131]">{s.t}</h3>
              <p className="text-base md:text-lg leading-relaxed max-w-md text-foreground/70">{s.d}</p>
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
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
          <p className="eyebrow text-center pt-24 md:pt-32 text-ink-foreground rule mx-auto w-fit">
            WHY CHOOSE US
          </p>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-40 md:top-48 flex flex-col items-center gap-2 text-ink-foreground/80 pointer-events-none transition-opacity duration-300"
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

            <p className="font-sans font-normal text-sm md:text-lg leading-snug max-w-5xl mb-5 md:mb-10 text-ink-foreground reveal-up">
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
              ].map(([k, d], i) => (
                <div key={k} className="reveal-up" style={{ animationDelay: `${i * 80}ms` }}>
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

function StarSparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.5 10H7.5C9.15686 10 10.5 8.65686 10.5 7V0H11.5V7C11.5 8.65686 12.8431 10 14.5 10H21.5V11H14.5C12.8431 11 11.5 12.3431 11.5 14V21H10.5V14C10.5 12.3431 9.15686 11 7.5 11H0.5V10Z" fill="currentColor"/>
    </svg>
  );
}

function WhyChooseUsV2() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileWrapperRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const cards: { title: string; desc: string }[] = [
    { title: "Same-day or Next-day Free Consultation", desc: "Get expert design at your doorstep with same-day or next-day appointments." },
    { title: "Over 30 Years of Expertise", desc: "South Florida's oldest closet company, delivering unmatched reliability and professional service." },
    { title: "Florida's Most Awarded", desc: "8-Time Best Pick top-rated for 8 consecutive years, reflecting our commitment to excellence." },
    { title: "Standing Behind Our Work", desc: "Our quality extends for years, offering dedicated support and peace of mind after installation." },
    { title: "Customer-centric Approach", desc: "Professional and accommodating service designed to ensure a superior experience at every step." },
  ];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Desktop: vanilla scroll progress for rising cards
  useEffect(() => {
    if (isMobile) return;
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
  }, [isMobile]);

  // Mobile: GSAP pinned panels effect
  useEffect(() => {
    if (!isMobile || !mobileWrapperRef.current) return;
    let gsapModule: typeof import("gsap") | null = null;
    let stModule: typeof import("gsap/ScrollTrigger") | null = null;
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | null = null;

    (async () => {
      gsapModule = await import("gsap");
      stModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".why-panel", mobileWrapperRef.current!);
        panels.pop();

        panels.forEach((panel) => {
          const inner = panel.querySelector<HTMLElement>(".why-panel-inner")!;
          const panelHeight = inner.offsetHeight;
          const windowHeight = window.innerHeight;
          const difference = panelHeight - windowHeight;
          const fakeScrollRatio = difference > 0 ? difference / (difference + windowHeight) : 0;

          if (fakeScrollRatio) {
            panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "bottom bottom",
              end: () => fakeScrollRatio ? `+=${inner.offsetHeight}` : "bottom top",
              pinSpacing: false,
              pin: true,
              scrub: true,
            },
          });

          if (fakeScrollRatio) {
            tl.to(inner, { yPercent: -100, y: window.innerHeight, duration: 1 / (1 - fakeScrollRatio) - 1, ease: "none" });
          }
          tl.fromTo(panel, { scale: 1, opacity: 1 }, { scale: 0.7, opacity: 0.5, duration: 0.9 })
            .to(panel, { opacity: 0, duration: 0.1 });
        });
      }, mobileWrapperRef.current!);
    })();

    return () => { ctx?.revert(); };
  }, [isMobile]);

  // Desktop card timings
  const timings = [
    { start: 0.00, end: 0.95 },
    { start: 0.08, end: 1.00 },
    { start: 0.04, end: 0.97 },
    { start: 0.14, end: 1.00 },
    { start: 0.10, end: 0.98 },
  ];

  const cardOffset = (i: number) => {
    const t = timings[i];
    const p = (progress - t.start) / (t.end - t.start);
    const clamped = Math.min(Math.max(p, 0), 1);
    const eased = Math.sin((clamped * Math.PI) / 2);
    return (1 - eased) * 110 + eased * -35;
  };

  const getCardStyle = (i: number) => {
    const isDark = i === 0 || i === 4;
    const isYellow = i === 1 || i === 3;
    const bg = isDark ? "rgba(0, 0, 0, 0.86)" : isYellow ? "rgba(241, 195, 58, 0.94)" : undefined;
    const textColor = isDark ? "#FFFFFF" : "#313131";
    const descOpacity = isYellow ? 1 : isDark ? 0.85 : 0.75;
    return { bg, textColor, descOpacity, isDark, isYellow };
  };

  return (
    <>
      {/* ——— MOBILE: GSAP pinned panels ——— */}
      <div ref={mobileWrapperRef} className="md:hidden">
        {/* First panel: hero with image, title & stars */}
        <section
          className="why-panel w-full h-screen flex items-center justify-center relative overflow-hidden"
          style={{ borderRadius: "10px" }}
        >
          <div className="why-panel-inner h-full w-full">
            <img src={whyBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 gap-14">
              <div className="flex items-center justify-between w-full px-8 opacity-90 text-white">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarSparkle key={`mtop-${i}`} className="w-4 h-4" />
                ))}
              </div>
              <h2 className="font-sans font-bold text-center leading-none text-white" style={{ fontSize: "clamp(48px, 13vw, 120px)" }}>
                Why JL Closets?
              </h2>
              <div className="flex items-center justify-between w-full px-8 opacity-90 text-white mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarSparkle key={`mbot-${i}`} className="w-4 h-4" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Card panels */}
        {cards.map((c, i) => {
          const s = getCardStyle(i);
          return (
            <section
              key={i}
              className="why-panel w-full h-screen flex items-center justify-center relative overflow-hidden"
              style={{
                background: s.bg || "#F5F0E8",
                borderRadius: "10px",
              }}
            >
              <div className="why-panel-inner h-full flex flex-col items-center justify-center px-8 text-center">
                <div className="flex flex-col items-center gap-6">
                  <p className="font-display text-3xl font-bold leading-tight" style={{ color: s.textColor }}>
                    {c.title}
                  </p>
                  <p className="font-sans text-base leading-relaxed max-w-xs" style={{ color: s.textColor, opacity: s.descOpacity }}>
                    {c.desc}
                  </p>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ——— DESKTOP: original rising cards ——— */}
      <section ref={sectionRef} className="relative hidden md:block h-[240vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <img src={whyBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 gap-20">
            <div className="flex items-center justify-between w-full px-16 opacity-90 text-white">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarSparkle key={`top-${i}`} className="w-6 h-6" />
              ))}
            </div>
            <h2 className="font-sans font-bold text-center leading-none text-white" style={{ fontSize: "clamp(60px, 13vw, 220px)" }}>
              Why JL Closets?
            </h2>
            <div className="flex items-center justify-between w-full px-16 opacity-90 text-white mt-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarSparkle key={`bot-${i}`} className="w-6 h-6" />
              ))}
            </div>
          </div>

          <div className="absolute left-0 right-0 bottom-0 px-4 pb-14">
            <div className="grid grid-cols-5 gap-6 w-full items-end">
              {cards.map((c, i) => {
                const s = getCardStyle(i);
                return (
                  <div
                    key={i}
                    className={`backdrop-blur-sm p-8 flex flex-col ${!s.bg ? "bg-card/95" : ""}`}
                    style={{
                      transform: `translateY(${cardOffset(i)}vh)`,
                      willChange: "transform",
                      borderRadius: "10px",
                      minHeight: "320px",
                      background: s.bg,
                      boxShadow: "0 24px 48px -12px rgba(0,0,0,0.45), 0 8px 16px -8px rgba(0,0,0,0.35)",
                    }}
                  >
                    <p className="font-display text-3xl lg:text-4xl font-bold leading-tight" style={{ color: s.textColor }}>
                      {c.title}
                    </p>
                    <p className="font-sans text-base leading-snug mt-auto pt-6" style={{ color: s.textColor, opacity: s.descOpacity }}>
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
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

// Service area counties — IDs match <path id="..."> in florida-counties-names.svg
const SERVICE_COUNTIES: { id: string; name: string }[] = [
  { id: "Indian_River",      name: "Indian River County" },
  { id: "St._Lucie",         name: "St. Lucie County" },
  { id: "Martin",            name: "Martin County" },
  { id: "Okeechobee",        name: "Okeechobee County" },
  { id: "Palm_Beach_County", name: "Palm Beach County" },
  { id: "Lee",               name: "Lee County" },
  { id: "Broward",           name: "Broward County" },
  { id: "Collier",           name: "Collier County" },
  { id: "Miami-Dade",        name: "Miami-Dade County" },
];


function ServiceAreas() {
  const [hovered, setHovered] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const transformRef = useRef<HTMLDivElement | null>(null);
  const [badges, setBadges] = useState<{ cx: number; cy: number }[]>([]);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const dragState = useRef<{ x: number; y: number; startPanX: number; startPanY: number } | null>(null);
  const pinchState = useRef<{ startDist: number; startZoom: number } | null>(null);

  const VB_W = 990;
  const VB_H = 765;
  const MOBILE_VB = "520 300 470 465";
  const MOBILE_ASPECT = "470 / 465";
  const mapAspect = `${VB_W} / ${VB_H}`;

  const applyTransform = () => {
    if (!transformRef.current) return;
    const z = zoomRef.current;
    const p = panRef.current;
    transformRef.current.style.transform = `translate(${p.x}px, ${p.y}px) scale(${z})`;
  };

  useEffect(() => {
    const root = mapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;

    svg.setAttribute("width", "990");
    svg.setAttribute("height", "765");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.removeAttribute("style");
    svg.style.display = "block";

    SERVICE_COUNTIES.forEach((c) => {
      const node = svg.querySelector(`[id="${c.id}"]`) as SVGGraphicsElement | null;
      if (node) node.classList.add("service");
    });

    requestAnimationFrame(() => {
      const computed: { cx: number; cy: number }[] = [];
      SERVICE_COUNTIES.forEach((c) => {
        const node = svg.querySelector(`[id="${c.id}"]`) as SVGGraphicsElement | null;
        if (!node) { computed.push({ cx: 0, cy: 0 }); return; }
        try {
          const bbox = node.getBBox();
          computed.push({ cx: bbox.x + bbox.width / 2, cy: bbox.y + bbox.height / 2 });
        } catch { computed.push({ cx: 0, cy: 0 }); }
      });
      setBadges(computed);
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
      <div className="max-w-xs md:max-w-lg lg:max-w-xs mx-auto lg:mx-0 mb-12 lg:mb-0 lg:shrink-0">
        <p className="font-sans text-[15px] md:text-[18px] lg:text-[20px] leading-relaxed reveal-up" style={{ color: "#313131" }}>
          <span className="underline-animate">
            We proudly serve the entire South Florida region
          </span>
          , bringing custom storage craftsmanship to homes across every county we touch.
        </p>
      </div>

      <div className="flex-1 min-w-0 flex flex-col md:flex-row gap-8 items-center md:items-start justify-start">
        <div className="relative w-full flex-1 min-w-0 mx-auto md:mx-0">
          {hovered !== null && (
            <style>{`
              svg path[id="${SERVICE_COUNTIES[hovered].id}"] {
                stroke: #313131 !important;
                stroke-width: 1.8 !important;
              }
              svg path.service:not([id="${SERVICE_COUNTIES[hovered].id}"]) {
                opacity: 0.4 !important;
              }
            `}</style>
          )}
          {/* MOBILE MAP — cropped to south Florida */}
          <div className="md:hidden">
            <div className="md:hidden absolute top-2 right-2 z-30 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => { zoomRef.current = Math.min(zoomRef.current * 1.3, 4); applyTransform(); }}
                className="w-9 h-9 bg-ink text-ink-foreground text-lg font-semibold shadow-lg cursor-pointer flex items-center justify-center"
                aria-label="Zoom in"
              >+</button>
              <button
                type="button"
                onClick={() => { zoomRef.current = Math.max(zoomRef.current / 1.3, 1); applyTransform(); }}
                className="w-9 h-9 bg-ink text-ink-foreground text-lg font-semibold shadow-lg cursor-pointer flex items-center justify-center"
                aria-label="Zoom out"
              >−</button>
              <button
                type="button"
                onClick={() => { zoomRef.current = 1; panRef.current = { x: 0, y: 0 }; applyTransform(); }}
                className="w-9 h-9 bg-ink text-ink-foreground text-xs font-semibold shadow-lg cursor-pointer flex items-center justify-center"
                aria-label="Reset"
              >⤾</button>
            </div>
            <div
              className="relative w-full overflow-hidden touch-none"
              style={{ aspectRatio: MOBILE_ASPECT }}
              onTouchStart={(e) => {
                if (transformRef.current) transformRef.current.style.transition = "none";
                if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX;
                  const dy = e.touches[0].clientY - e.touches[1].clientY;
                  pinchState.current = { startDist: Math.hypot(dx, dy), startZoom: zoomRef.current };
                } else if (e.touches.length === 1 && zoomRef.current > 1) {
                  dragState.current = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    startPanX: panRef.current.x,
                    startPanY: panRef.current.y,
                  };
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && pinchState.current) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX;
                  const dy = e.touches[0].clientY - e.touches[1].clientY;
                  const dist = Math.hypot(dx, dy);
                  const ratio = dist / pinchState.current.startDist;
                  zoomRef.current = Math.max(1, Math.min(4, pinchState.current.startZoom * ratio));
                  applyTransform();
                } else if (e.touches.length === 1 && dragState.current) {
                  const t = e.touches[0];
                  panRef.current = {
                    x: dragState.current.startPanX + (t.clientX - dragState.current.x),
                    y: dragState.current.startPanY + (t.clientY - dragState.current.y),
                  };
                  applyTransform();
                }
              }}
              onTouchEnd={() => {
                dragState.current = null;
                pinchState.current = null;
                if (transformRef.current) transformRef.current.style.transition = "transform 0.2s ease-out";
              }}
            >
              <div ref={transformRef} className="relative w-full h-full will-change-transform" style={{ transformOrigin: "center center" }}>
                <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: floridaSvgRaw.replace(/viewBox="[^"]*"/, `viewBox="${MOBILE_VB}"`) }} />
                {badges.length > 0 && (
                  <svg viewBox={MOBILE_VB} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ pointerEvents: "none" }}>
                    <g transform="translate(0,473.10044)">
                      {badges.map((b, i) => (
                        <g
                          key={SERVICE_COUNTIES[i].id}
                          transform={`translate(${b.cx - 10}, ${b.cy - 28})`}
                          style={{ pointerEvents: "auto", cursor: "pointer" }}
                          onMouseEnter={() => setHovered(i)}
                          onMouseLeave={() => setHovered(null)}
                        >
                          <path
                            d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 18 10 18s10-10.5 10-18C20 4.5 15.5 0 10 0z"
                            fill={i === hovered ? "#b91c1c" : "#DC2626"}
                            stroke="#7f1d1d"
                            strokeWidth={0.8}
                            style={{ transition: "fill 0.2s", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}
                          />
                          <circle cx={10} cy={10} r={3.5} fill="#fff" />
                        </g>
                      ))}
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Hidden computation div for getBBox — always rendered */}
          <div ref={mapRef} className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none" style={{ left: -9999 }} dangerouslySetInnerHTML={{ __html: floridaSvgRaw }} />

          {/* DESKTOP MAP — full Florida */}
          <div className="hidden md:block">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: mapAspect }}
            >
              <div
                className="absolute inset-0 w-full h-full"
                dangerouslySetInnerHTML={{ __html: floridaSvgRaw }}
              />
              {badges.length > 0 && (
                <svg
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ pointerEvents: "none" }}
                >
                  <g transform="translate(0,473.10044)">
                    {badges.map((b, i) => (
                      <g
                        key={SERVICE_COUNTIES[i].id}
                        transform={`translate(${b.cx - 10}, ${b.cy - 28})`}
                        style={{ pointerEvents: "auto", cursor: "pointer" }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <path
                          d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 18 10 18s10-10.5 10-18C20 4.5 15.5 0 10 0z"
                          fill={i === hovered ? "#b91c1c" : "#DC2626"}
                          stroke="#7f1d1d"
                          strokeWidth={0.8}
                          style={{ transition: "fill 0.2s", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}
                        />
                        <circle cx={10} cy={10} r={3.5} fill="#fff" />
                      </g>
                    ))}
                  </g>
                </svg>
              )}
            </div>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground p-6 w-full max-w-xs">
          <p className="eyebrow mb-4" style={{ color: "#313131" }}>Counties we serve</p>
          <ul className="flex flex-col gap-2.5 text-[14px]">
            {SERVICE_COUNTIES.map((area, i) => (
              <li
                key={area.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`cursor-default transition-opacity ${
                  hovered === null || hovered === i ? "opacity-100" : "opacity-50"
                } ${i === hovered ? "font-semibold" : ""}`}
              >
                {area.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}



const TEXT_REVIEWS = [
  { quote: "JL closets staff are EXTREMELY professional, helpful, flexible and most of all, SUPER friendly! Not to mention that the closets look AMAZING! I will recommend them to anyone who needs to update or custom design their closets. They do free estimates, including a 3D design of what you want. Thanks JL closets! ...", a: "Luis Emmanuelli", loc: "West Palm Beach, FL", source: "Google", url: "https://www.google.com/search?q=JL+Closets+reviews" },
  { quote: "Most competitive pricing and excellent and timely work! 10/10 would recommend for custom closets and shelving!", a: "Sarah Jackson", loc: "FL", source: "Houzz", url: "https://www.houzz.com/professionals/closet-designers-and-professional-organizers/jl-closets" },
  { quote: "First class company with great design and workmanship. Andrea and Sophia are an awesome team.", a: "Tod Edward Highfield", loc: "Boca Raton, FL", source: "Angi", url: "https://www.angi.com" },
  { quote: "Truly the most considered cabinetry we've owned. Every detail was thought through and the install was flawless.", a: "Marisol R.", loc: "Boca Raton, FL", source: "Best Pick Reports", url: "https://www.bestpickreports.com" },
  { quote: "From sketch to install, every step felt like an art form. We couldn't be happier with our new closet.", a: "James K.", loc: "Coral Gables, FL", source: "Google", url: "https://www.google.com/search?q=JL+Closets+reviews" },
  { quote: "A pantry we now plan dinners around. Functional, beautiful, and exactly what we envisioned.", a: "Lena & Tom", loc: "Palm Beach, FL", source: "Facebook", url: "https://www.facebook.com/jlclosets" },
];

const VIDEO_REVIEWS = [
  { gif: "https://jlclosets.com/wp-content/uploads/2025/03/EP-garage-cabinet-kitchen-pantry-installation-customer-satisfaction-jl-closets.gif.gif", video: "https://www.youtube.com/watch?v=Hyq4t6QsdzE", name: "Elissa Polack", loc: "Delray Beach, FL" },
  { gif: "https://jlclosets.com/wp-content/uploads/2025/03/CP-customer-testimonial-jl-closets-satisfied-client.gif.gif", video: "https://www.youtube.com/watch?v=yi5TaJ2haOU", name: "Chris Puccio", loc: "Boca Raton, FL" },
  { gif: "https://jlclosets.com/wp-content/uploads/2025/03/BL-customer-testimonial-garage-cabinet-customization-happy-client-gif.gif", video: "https://www.youtube.com/watch?v=0Nc5hP68mLs", name: "Bruce Lowen", loc: "Boca Raton, FL" },
  { gif: "https://jlclosets.com/wp-content/uploads/2025/03/YG-master-closet-renovation-happy-customer-jl-closets-gif.gif", video: "https://www.youtube.com/watch?v=QtiUUEzsaFI", name: "Yvonne Graber", loc: "South Palm Beach, FL" },
];

// Fixed non-overlapping layout — text on sides, videos in top/bottom center strips
const TEXT_SLOTS = [
  { top: "2%",  left: "0%",  w: "380px", tx: "-60px", ty: "-40px", float: "6s",   delay: "0s"   },
  { top: "2%",  left: "72%", w: "380px", tx: "60px",  ty: "-40px", float: "7s",   delay: "0.3s" },
  { top: "43%", left: "0%",  w: "380px", tx: "-60px", ty: "0px",   float: "6.5s", delay: "0.6s" },
  { top: "43%", left: "72%", w: "380px", tx: "60px",  ty: "0px",   float: "5.8s", delay: "0.9s" },
  { top: "84%", left: "0%",  w: "380px", tx: "-60px", ty: "40px",  float: "7.2s", delay: "1.2s" },
  { top: "84%", left: "72%", w: "380px", tx: "60px",  ty: "40px",  float: "6.2s", delay: "0.5s" },
];

const VIDEO_SLOTS = [
  { top: "3%",  left: "34%",  w: "200px", tx: "0px", ty: "-50px", float: "6s",   delay: "0.4s" },
  { top: "3%",  left: "52%",  w: "200px", tx: "0px", ty: "-50px", float: "5.5s", delay: "0.7s" },
  { top: "78%", left: "34%",  w: "200px", tx: "0px", ty: "50px",  float: "7s",   delay: "1.1s" },
  { top: "78%", left: "52%",  w: "200px", tx: "0px", ty: "50px",  float: "6.8s", delay: "0.2s" },
];

function ContactForm() {
  const [step, setStep] = useState(0);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [budget, setBudget] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [consultFor, setConsultFor] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [findUs, setFindUs] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (list: string[], setList: (v: string[]) => void, val: string) => {
    setList(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);
  };

  const inputCls =
    "w-full bg-transparent text-foreground placeholder:text-foreground/40 px-5 py-3.5 text-base border border-foreground/30 hover:border-foreground/60 focus:border-foreground focus:outline-none focus:ring-0 transition font-sans";

  // Phone formatting + validation
  const formatPhone = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length === 0) return "";
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };
  const onPhoneChange = (raw: string) => {
    let d = raw.replace(/\D/g, "");
    // Strip leading 1
    if (d.startsWith("1")) d = d.slice(1);
    d = d.slice(0, 10);
    setPhone(formatPhone(d));
  };
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length === 10 && !phoneDigits.startsWith("1");
  const phoneError = phone.length > 0 && !phoneValid
    ? phoneDigits.length < 10
      ? "Phone number must be 10 digits."
      : "Area code cannot start with 1."
    : "";

  // ZIP formatting + validation (10 digits, XXXXX-XXXXX)
  const formatZip = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 5) return d;
    return `${d.slice(0, 5)}-${d.slice(5)}`;
  };
  const onZipChange = (raw: string) => setZip(formatZip(raw));
  const zipDigits = zip.replace(/\D/g, "");
  const zipValid = zipDigits.length === 5 || zipDigits.length === 10;
  const zipError = zip.length > 0 && !zipValid ? "ZIP code must be 5 or 10 digits." : "";

  const Pill = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-3 text-sm font-medium border transition cursor-pointer ${
        active
          ? "bg-ink text-ink-foreground border-ink"
          : "bg-transparent text-foreground border-foreground/30 hover:border-foreground"
      }`}
    >
      {children}
    </button>
  );

  const steps: { key: string; question: string; hint?: string }[] = [
    { key: "info", question: "Let's start with your details.", hint: "We'll only use these to get in touch." },
    { key: "budget", question: "What is your budget for this project?" },
    { key: "reach", question: "What's the best way to reach you?" },
    { key: "consult", question: "I want a free consultation for:" },
    { key: "find", question: "How did you find us?", hint: "Select all that apply." },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const canAdvance = () => {
    switch (current.key) {
      case "info": return !!(first.trim() && last.trim() && email.trim() && phoneValid && zipValid);
      case "budget": return !!budget;
      case "reach": return !!contactMethod;
      case "consult": return !!consultFor && (consultFor !== "My home" || areas.length > 0);
      case "find": return findUs.length > 0;
      default: return true;
    }
  };

  const next = () => {
    if (isLast) setSubmitted(true);
    else setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  if (submitted) {
    return (
      <div className="md:col-span-9 border border-foreground/15 p-10 md:p-14 text-center">
        <p className="eyebrow mb-4" style={{ color: "#313131" }}>— THANK YOU —</p>
        <h3 className="font-display text-3xl md:text-4xl mb-4 font-bold" style={{ color: "#313131" }}>We've received your inquiry.</h3>
        <p className="text-foreground/70 max-w-md mx-auto">Our team will reach out within one business day to schedule your free consultation.</p>
      </div>
    );
  }

  return (
    <div className="md:col-span-9">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-10">
        <span className="eyebrow text-foreground/60">STEP {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
        <div className="flex-1 h-px bg-foreground/15 relative">
          <div
            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2 font-bold" style={{ color: "#313131" }}>
        {current.question}
      </h3>
      {current.hint && <p className="text-sm text-foreground/60 mb-8">{current.hint}</p>}
      {!current.hint && <div className="mb-8" />}

      {/* Body */}
      <div className="min-h-[180px]">
        {current.key === "info" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" value={first} onChange={(e) => setFirst(e.target.value)} className={inputCls} />
            <input type="text" placeholder="Last Name" value={last} onChange={(e) => setLast(e.target.value)} className={inputCls} />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} sm:col-span-2`} />
            <div>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="ex: (555) 123-4567"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                className={`${inputCls} ${phoneError ? "border-destructive" : ""}`}
              />
              {phoneError && <p className="text-xs text-destructive mt-1.5">{phoneError}</p>}
            </div>
            <div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="ZIP Code"
                value={zip}
                onChange={(e) => onZipChange(e.target.value)}
                className={`${inputCls} ${zipError ? "border-destructive" : ""}`}
              />
              {zipError && <p className="text-xs text-destructive mt-1.5">{zipError}</p>}
            </div>
          </div>
        )}

        {current.key === "budget" && (
          <div className="flex flex-wrap gap-3">
            {["$1,000 - $5,000", "$5,000 - $15,000", "+$15,000"].map((opt) => (
              <Pill key={opt} active={budget === opt} onClick={() => setBudget(opt)}>{opt}</Pill>
            ))}
          </div>
        )}

        {current.key === "reach" && (
          <div className="flex flex-wrap gap-3">
            {["Email", "SMS", "A phone call", "WhatsApp", "Any of the above"].map((opt) => (
              <Pill key={opt} active={contactMethod === opt} onClick={() => setContactMethod(opt)}>{opt}</Pill>
            ))}
          </div>
        )}

        {current.key === "consult" && (
          <div>
            <div className="flex flex-wrap gap-3">
              {["My home", "Residential project", "Commercial project"].map((opt) => (
                <Pill
                  key={opt}
                  active={consultFor === opt}
                  onClick={() => { setConsultFor(opt); if (opt !== "My home") setAreas([]); }}
                >
                  {opt}
                </Pill>
              ))}
            </div>
            {consultFor === "My home" && (
              <div className="mt-8 pt-8 border-t border-foreground/15">
                <p className="font-sans text-base font-medium mb-1" style={{ color: "#313131" }}>
                  Which areas of your home are you interested in?
                </p>
                <p className="text-sm text-foreground/60 mb-4">Choose all that apply.</p>
                <div className="flex flex-wrap gap-3">
                  {["Closets", "Garage", "Home Office", "Pantry", "Mud Room", "Laundry", "Media Center", "Other Built-Ins", "Other custom space"].map((opt) => (
                    <Pill key={opt} active={areas.includes(opt)} onClick={() => toggle(areas, setAreas, opt)}>{opt}</Pill>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {current.key === "find" && (
          <div className="flex flex-wrap gap-3">
            {["Google", "Email", "Facebook", "Instagram", "LinkedIn", "Pinterest", "Realtor Referral Program", "Referral", "Repeat Customer", "TikTok", "YouTube"].map((opt) => (
              <Pill key={opt} active={findUs.includes(opt)} onClick={() => toggle(findUs, setFindUs, opt)}>{opt}</Pill>
            ))}
          </div>
        )}
      </div>

      {/* Footer / nav */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-foreground/15">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className={`text-sm font-medium underline-offset-4 hover:underline transition ${step === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
        >
          ← Back
        </button>
        <Yellow onClick={canAdvance() ? next : undefined} className={!canAdvance() ? "opacity-40 cursor-not-allowed" : ""}>
          {isLast ? "Submit Inquiry" : "Continue"}
        </Yellow>
      </div>
    </div>
  );
}

function SourceIcon({ source }: { source: string }) {
  const cls = "w-4 h-4 shrink-0";
  if (source === "Google") {
    return (
      <svg className={cls} viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.7 36 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"/>
      </svg>
    );
  }
  if (source === "Houzz") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="#4DBC15"><path d="M17 7v5h-5L7 7v17h5v-5h5v5h5V7z"/></svg>
    );
  }
  if (source === "Angi") {
    return (
      <svg className={cls} viewBox="0 0 365 220" fill="#ff6153">
        <path d="m333.39 52.36h28.71v123.47h-28.71zm14.36-11.55c8.89 0 15.85-6.85 15.85-15.6 0-8.74-7.11-15.85-15.85-15.85-8.75 0-15.6 6.96-15.6 15.85-.01 8.75 6.85 15.6 15.6 15.6zm-143.15 9.55c-10.25 0-17.81 4.06-22.48 12.06l-1.35 2.31-.32-2.66c-.7-5.81-7.08-9.71-12.61-9.71h-16.1l.25 123.47h28.96v-83.61c0-12.66 2.79-17.15 10.65-17.15 6.07 0 9.15 4.51 9.15 13.4v87.37h28.71v-93.87c-.01-20.97-8.37-31.61-24.86-31.61zm99.7 2h14.85l-.25 114.37c0 30.37-2.91 51.86-40.61 51.86-13.13 0-22.91-3.42-29.06-10.18-5.01-5.5-7.55-13.05-7.55-22.43v-.6h28.96v.35c0 9.65 7.2 10.4 9.4 10.4 9.65 0 10.4-8.56 10.4-20.65v-17.67l-1.71 3.53c-3.59 7.41-10.85 11.49-20.44 11.49-10.15 0-17.19-3.62-21.54-11.06-3.58-6.12-5.32-14.89-5.32-26.8v-48c0-7 .98-16.97 5.62-24.66 4.78-7.92 12.52-11.94 22.98-11.94 10.42 0 17.39 3.95 20.16 11.42l1.39 3.76.35-3.99c.46-5.19 7.03-9.2 12.37-9.2zm-14.35 38.36c0-7.74-1.09-15.65-9.15-15.65-7.17 0-10.65 4.71-10.65 14.4v43.01c0 7.74 1.12 15.65 9.4 15.65 8.74 0 10.4-6.38 10.4-18.15zm-174.35-86.12 27.47 171.23h-28.77l-1.52-11.13c-2.59-19.86-13.08-38.21-30.36-42.28-.6 7.01-3.96 30.77-5.41 36.96 0-.01.01-.03.01-.05-2.63 12.98-8.24 27.16-25.14 32.98a33.499 33.499 0 0 1 -10.9 1.81c-9.38 0-18.68-3.87-25.49-11.01-7.54-7.9-11.76-17.54-11.88-29.88-.28-29.52 24.06-55.9 55.41-60.07.3-.04.6-.06.91-.1l14.18-88.46h21zm-60.34 117.52c-12.81 4.54-24.4 16.11-24.26 30.86.05 5.28 1.62 8.41 4.3 11.23 2.08 2.18 5.17 3.07 7.66 2.21 4.18-1.44 6.14-6.44 7.63-14.81zm49.31-19.8-9.21-70.65h-1.02l-8.25 63.31c6.41 1.65 12.63 4.14 18.48 7.34z"/>
      </svg>
    );
  }
  if (source === "Best Pick Reports") {
    return (
      <svg className={cls} viewBox="0 0 51 50">
        <path fill="#0076CE" d="M25.4 0L0 14V35c0 3.4 2.8 6.2 6.2 6.2h22.5l8.6 8.6v-8.6h7.3c3.4 0 6.2-2.8 6.2-6.2V14L25.4 0z"/>
        <path fill="#FFFFFF" d="M25.4 7L0 21h6.1v11.2c0 1.6 1.3 2.9 2.9 2.9h22.2l6.1 6.1v-6.1h4.5c1.6 0 2.9-1.3 2.9-2.9V21h6.3L25.4 7zM16.1 27.2c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1zm9.3 0c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1zm9.3 0c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1z"/>
      </svg>
    );
  }
  if (source === "Facebook") {
    return (
      <svg className={cls} viewBox="0 0 1024 1024">
        <path fill="#1877f2" d="M1024 512C1024 229.2 794.8 0 512 0S0 229.2 0 512c0 255.6 187.2 467.4 432 505.8V660H302V512h130V399.3c0-128.3 76.4-199.2 193.4-199.2 56 0 114.6 10 114.6 10V336H675c-63.6 0-83.4 39.5-83.4 80v96H734L711.3 660H591.6v357.8C836.8 979.4 1024 767.6 1024 512z"/>
        <path fill="#fff" d="M711.3 660L734 512H591.6v-96c0-40.5 19.8-80 83.4-80h105.1V200s-58.6-10-114.6-10c-117 0-193.4 70.9-193.4 199.2V512H302v148h130v357.8c26.1 4.1 52.8 6.2 80 6.2s53.9-2.1 80-6.2V660h119.3z"/>
      </svg>
    );
  }
  return null;
}

function ReviewsSection({ onVideoOpen }: { onVideoOpen: (url: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const textScrollerRef = useRef<HTMLDivElement | null>(null);
  const videoScrollerRef = useRef<HTMLDivElement | null>(null);
  const [textIdx, setTextIdx] = useState(0);
  const [videoIdx, setVideoIdx] = useState(0);

  const onCarouselScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    setIdx: (n: number) => void,
    count: number
  ) => {
    const el = ref.current;
    if (!el) return;
    const cardW = el.scrollWidth / count;
    const i = Math.round(el.scrollLeft / cardW);
    setIdx(Math.min(Math.max(i, 0), count - 1));
  };

  const goToCard = (
    ref: React.RefObject<HTMLDivElement | null>,
    count: number,
    i: number
  ) => {
    const el = ref.current;
    if (!el) return;
    const cardW = el.scrollWidth / count;
    el.scrollTo({ left: cardW * i, behavior: "smooth" });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  type ReviewCard = { type: "text"; data: typeof TEXT_REVIEWS[0]; slot: typeof TEXT_SLOTS[0] } | { type: "video"; data: typeof VIDEO_REVIEWS[0]; slot: typeof VIDEO_SLOTS[0] };

  const cards: ReviewCard[] = [
    ...TEXT_REVIEWS.map((data, i) => ({ type: "text" as const, data, slot: TEXT_SLOTS[i] })),
    ...VIDEO_REVIEWS.map((data, i) => ({ type: "video" as const, data, slot: VIDEO_SLOTS[i] })),
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Mobile: stacked title above cards */}
      <div className="md:hidden flex flex-col items-center justify-center text-center px-4 mb-10">
        <span className="rule eyebrow mb-6" style={{ color: "#313131", fontSize: "20px" }}>SUCCESS STORIES</span>
        <p className="font-sans text-lg leading-snug max-w-md" style={{ color: "#313131" }}>
          <strong className="font-bold">Experience home transformation</strong> through our client's eyes. <strong className="font-bold">Quality and trust</strong> in every project.
        </p>
      </div>

      {/* Desktop: text in center + scattered floating cards */}
      <div className="hidden md:block relative mx-auto" style={{ maxWidth: "1400px", height: "780px" }}>
        {/* Central text + button — outer wrapper does not intercept clicks */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-none">
          <span className="rule eyebrow mb-8 pointer-events-auto" style={{ color: "#313131", fontSize: "22px" }}>SUCCESS STORIES</span>
          <p className="font-sans text-xl lg:text-2xl leading-snug max-w-lg mb-8 pointer-events-auto" style={{ color: "#313131" }}>
            <strong className="font-bold">Experience home transformation</strong> through our client's eyes. <strong className="font-bold">Quality and trust</strong> in every project.
          </p>
          <div className="pointer-events-auto">
            <Yellow onClick={() => window.open("https://www.google.com/search?q=JL+Closets+reviews", "_blank", "noopener,noreferrer")}>
              View More Reviews
            </Yellow>
          </div>
        </div>

        {cards.map((card, i) => {
          const slot = card.slot;
          return (
            <div
              key={i}
              className={revealed ? "card-floating" : ""}
              style={{
                position: "absolute",
                top: slot.top,
                left: slot.left,
                width: slot.w,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translate(0,0) scale(1)" : `translate(${slot.tx},${slot.ty}) scale(0.9)`,
                transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
                animationDuration: slot.float,
                animationDelay: slot.delay,
                zIndex: 5,
              }}
            >
              {card.type === "text" ? (
                <div className="p-6" style={{ backgroundColor: "#F1F1F1", borderRadius: "10px", color: "#313131", userSelect: "text" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-sans text-lg font-semibold leading-tight">{card.data.a}</p>
                      <p className="font-sans text-xs opacity-60 leading-tight">{card.data.loc}</p>
                    </div>
                    <div className="shrink-0 [&_svg]:w-7 [&_svg]:h-7"><SourceIcon source={card.data.source} /></div>
                  </div>
                  <p className="mb-3 tracking-widest" style={{ color: "#F6931D", fontSize: "16px" }}>★★★★★</p>
                  <p className="font-sans text-sm mb-5 font-normal" style={{ lineHeight: 1.3 }}>"{card.data.quote}"</p>
                  <a
                    href={card.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="review-source-btn inline-flex items-center gap-2 font-sans text-xs font-semibold px-4 py-2 border transition"
                    style={{ color: "#313131", borderColor: "#313131", borderRadius: "6px" }}
                  >
                    Read the Review on {card.data.source}
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
                  </a>
                </div>
              ) : (
                <button
                  type="button"
                  className="relative group w-full overflow-hidden focus:outline-none block cursor-pointer"
                  style={{ borderRadius: "10px" }}
                  onClick={() => onVideoOpen(card.data.video)}
                >
                  <img src={card.data.gif} alt="Client video" className="w-full aspect-square object-cover block pointer-events-none" />
                  {/* Name overlay — bottom, gradient bottom-up */}
                  <div className="absolute bottom-0 left-0 right-0 pt-10 pb-4 px-4 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))" }}>
                    <p className="font-sans text-base font-semibold text-white leading-tight">{card.data.name}</p>
                    <p className="font-sans text-xs text-white/80 leading-tight">{card.data.loc}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: two carousels (text + videos) + button below */}
      <div className="md:hidden mt-4 space-y-8">
        {/* Text reviews carousel */}
        <div
          ref={textScrollerRef}
          onScroll={() => onCarouselScroll(textScrollerRef, setTextIdx, TEXT_REVIEWS.length)}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-5 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {TEXT_REVIEWS.map((r, i) => (
            <div key={i} className="snap-center shrink-0 w-[82vw] max-w-[340px] p-6" style={{ backgroundColor: "#F1F1F1", borderRadius: "10px", color: "#313131", userSelect: "text" }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-sans text-lg font-semibold leading-tight">{r.a}</p>
                  <p className="font-sans text-xs opacity-60 leading-tight">{r.loc}</p>
                </div>
                <div className="shrink-0 [&_svg]:w-7 [&_svg]:h-7"><SourceIcon source={r.source} /></div>
              </div>
              <p className="mb-3 tracking-widest" style={{ color: "#F6931D", fontSize: "16px" }}>★★★★★</p>
              <p className="font-sans text-sm mb-5 font-normal" style={{ lineHeight: 1.3 }}>"{r.quote}"</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="review-source-btn inline-flex items-center gap-2 font-sans text-xs font-semibold px-4 py-2 border transition"
                style={{ color: "#313131", borderColor: "#313131", borderRadius: "6px" }}
              >
                Read the Review on {r.source}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
              </a>
            </div>
          ))}
        </div>

        {/* Text dots */}
        <div className="flex items-center justify-center gap-2 -mt-4">
          {TEXT_REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to review ${i + 1}`}
              onClick={() => goToCard(textScrollerRef, TEXT_REVIEWS.length, i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === textIdx ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"}`}
            />
          ))}
        </div>

        {/* Video reviews carousel */}
        <div
          ref={videoScrollerRef}
          onScroll={() => onCarouselScroll(videoScrollerRef, setVideoIdx, VIDEO_REVIEWS.length)}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-5 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {VIDEO_REVIEWS.map((v, i) => (
            <button
              type="button"
              key={i}
              className="snap-center shrink-0 w-[60vw] max-w-[240px] relative group overflow-hidden focus:outline-none block cursor-pointer"
              style={{ borderRadius: "10px" }}
              onClick={() => onVideoOpen(v.video)}
            >
              <img src={v.gif} alt="Client video" className="w-full aspect-square object-cover block pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 pt-8 pb-3 px-4 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))" }}>
                <p className="font-sans text-sm font-semibold text-white leading-tight">{v.name}</p>
                <p className="font-sans text-xs text-white/80 leading-tight">{v.loc}</p>
              </div>
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Video dots */}
        <div className="flex items-center justify-center gap-2 -mt-4">
          {VIDEO_REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to video ${i + 1}`}
              onClick={() => goToCard(videoScrollerRef, VIDEO_REVIEWS.length, i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === videoIdx ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"}`}
            />
          ))}
        </div>

        {/* Button below */}
        <div className="flex justify-center pt-2">
          <Yellow onClick={() => window.open("https://www.google.com/search?q=JL+Closets+reviews", "_blank", "noopener,noreferrer")}>
            View More Reviews
          </Yellow>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [consultOpen, setConsultOpen] = useState(false);
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
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
                <div className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute left-0 top-full bg-white text-foreground shadow-xl border border-foreground/10 p-6 z-50 ${n.submenu.length > 1 ? "grid grid-cols-2 gap-x-10 gap-y-4 w-[560px]" : "w-[280px]"}`}>
                  {n.submenu.map((col, idx) => (
                    <div key={col.heading ?? `col-${idx}`}>
                      {col.heading && <p className="text-[12px] font-medium text-foreground/50 mb-2">• {col.heading}</p>}
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
          <Yellow onClick={() => setConsultOpen(true)}>FREE Consultation</Yellow>
          <button
            aria-label="Call Us"
            className="bg-ink text-ink-foreground px-7 py-2.5 inline-flex items-center gap-2 text-sm font-semibold font-sans cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            CALL US!
          </button>
        </div>
        <button
          aria-label="Open menu"
          className={`lg:hidden p-2 cursor-pointer ${scrolled ? "text-black" : "text-ink-foreground"}`}
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
          <Yellow onClick={() => setConsultOpen(true)}>Schedule a FREE Consultation</Yellow>
        </div>


        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-background text-foreground overflow-y-auto">
            <div className="flex items-center justify-between px-6 pt-8">
              <img src={jlLogo} alt="JL Closets" className="h-12 w-auto" />
              <button
                aria-label="Close menu"
                className="p-2 cursor-pointer"
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
                      className="w-full flex items-center justify-between py-4 text-left text-[18px] font-medium cursor-pointer"
                      onClick={() => n.submenu ? setOpenSection(isOpen ? null : n.label) : setMobileOpen(false)}
                    >
                      <span>{n.label}</span>
                      {n.submenu && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      )}
                    </button>
                    {n.submenu && isOpen && (
                      <div className="pb-6 space-y-5">
                        {n.submenu.map((col, idx) => (
                          <div key={col.heading ?? `col-${idx}`}>
                            {col.heading && <p className="text-[12px] font-medium text-foreground/50 mb-2">• {col.heading}</p>}
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
              <Yellow className="!w-full" onClick={() => { setMobileOpen(false); setConsultOpen(true); }}>FREE Consultation</Yellow>
              <button className="bg-ink text-ink-foreground px-7 py-2.5 inline-flex justify-center items-center gap-2 text-sm font-semibold font-sans w-full cursor-pointer">
                <Phone className="w-4 h-4" /> CALL US!
              </button>
            </div>
          </div>
        )}

      </header>

      {/* SECTION 01 — Intro + two images */}
      <Section num="01">
        <div className="text-center mb-14 md:mb-20">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Custom Storage Solutions</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
          <div className="max-w-xs md:max-w-lg lg:max-w-xs mx-auto lg:mx-0 mb-12 lg:mb-0 lg:shrink-0">
            <p className="font-sans text-[15px] md:text-[18px] lg:text-[20px] leading-relaxed reveal-up" style={{ color: "#313131" }}>
              <span className="underline-animate">
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
        <div className="text-center mb-10 md:mb-14">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Our Process</span>
        </div>
        <p className="text-center max-w-2xl mx-auto font-sans text-2xl md:text-3xl leading-snug mb-10 md:mb-14 reveal-up">
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

      {/* SECTION 03 — Why Choose Us · VERSION 1 (cinematic frames) */}
      <div className="bg-ink text-ink-foreground text-center py-3 text-xs tracking-widest uppercase">
        Version 1 — Cinematic frames
      </div>
      <WhyChooseUs />

      {/* SECTION 03 — Why Choose Us · VERSION 2 (cards rise on scroll) */}
      <div className="bg-ink text-ink-foreground text-center py-3 text-xs tracking-widest uppercase">
        Version 2 — Cards rise on scroll
      </div>
      <WhyChooseUsV2 />


      {/* SECTION 04 — Gallery row */}
      <Section num="04">
        <div className="text-center mb-14 md:mb-20">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Works</span>
        </div>
        <WorksCarousel
          images={[closetImg, pantryImg, darkOffice, library, hero(heroKitchen), pantryImg]}
        />

      </Section>

      {/* SECTION 05 — Service area + pricing card */}
      <Section num="05">
        <div className="text-center mb-14 md:mb-20">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Service Areas</span>
        </div>
        <ServiceAreas />
      </Section>

      {/* SECTION 06 — Showroom hero */}
      <section className="relative">
        <img src={showroom} alt="JL Closets showroom in Boca Raton at dusk" className="w-full h-screen md:h-[110vh] object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/35 to-transparent" />
        {/* Extra overlay for mobile readability */}
        <div className="md:hidden absolute inset-0 bg-ink/45" />

        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="px-6 md:px-16 pt-12 md:pt-20 text-ink-foreground">
            <p className="eyebrow mb-4 opacity-80 text-white reveal-up" style={{ animationDelay: "0ms", letterSpacing: 0 }}>— SHOWROOM —</p>
          </div>

          <div className="px-6 md:px-16 pb-12 md:pb-20 text-ink-foreground w-full max-w-6xl">
            <h2 className="font-sans text-xl md:text-2xl leading-snug mb-10 max-w-3xl reveal-up" style={{ animationDelay: "120ms", letterSpacing: 0 }}>
              <strong className="font-bold">Experience Quality Firsthand.</strong><br />
              Visit our Boca Raton showroom<br />
              to explore our custom systems up close.
            </h2>

            <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-sm mb-8 max-w-xl">
              <div className="reveal-up" style={{ animationDelay: "240ms" }}>
                <p className="font-bold mb-2">Phone</p>
                <p className="opacity-90">(561) 912 9881</p>
              </div>
              <div className="reveal-up" style={{ animationDelay: "320ms" }}>
                <p className="font-bold mb-2">Email</p>
                <p className="opacity-90">leads@jlclosets.com</p>
              </div>
              <div className="reveal-up" style={{ animationDelay: "400ms" }}>
                <p className="font-bold mb-2">Showroom</p>
                <p className="opacity-90">160 NW 16th St,<br />Boca Raton, FL 33432</p>
                <div className="mt-3">
                  <Yellow>Google Maps</Yellow>
                </div>
              </div>
              <div className="reveal-up" style={{ animationDelay: "480ms" }}>
                <p className="font-bold mb-2">Opening hours</p>
                <p className="opacity-90">Monday–Friday 9:00AM–6:00PM</p>
                <p className="opacity-90">Saturday 9:00AM–1:00PM</p>
                <p className="opacity-90">Sunday by appointment</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 07 — Reviews */}
      <ReviewsSection onVideoOpen={setVideoUrl} />

        {/* Consultation modal */}
        {consultOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/70 flex items-start justify-center p-4 md:p-8 overflow-y-auto"
            onClick={() => setConsultOpen(false)}
          >
            <div
              className="relative bg-background w-full max-w-4xl my-8 p-6 md:p-12 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center hover:bg-foreground/5 transition cursor-pointer"
                onClick={() => setConsultOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mb-8 md:mb-12 pt-2">
                <span className="rule eyebrow" style={{ color: "#313131" }}>Start your transformation</span>
              </div>
              <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-3">
                  <p className="font-sans text-2xl md:text-3xl leading-snug mb-4">
                    Get your custom design and quote <strong className="font-bold">in just a few steps.</strong>
                  </p>
                  <p className="text-sm text-foreground/60">
                    We'll get in touch shortly to schedule your free consultation.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        )}

        {/* Video modal */}
        {videoUrl && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setVideoUrl(null)}
          >
            <div className="relative w-full max-w-3xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <iframe
                src={videoUrl.replace("watch?v=", "embed/") + "?autoplay=1"}
                className="w-full h-full rounded-lg"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <button
                className="absolute -top-10 right-0 text-white text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer"
                onClick={() => setVideoUrl(null)}
              >
                Close ✕
              </button>
            </div>
          </div>
        )}

      {/* SECTION 08 — Contact form */}
      <Section num="08">
        <div className="text-center mb-14 md:mb-20">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Start your transformation</span>
        </div>
        <div className="grid md:grid-cols-12 gap-12 max-w-6xl mx-auto">
          <div className="md:col-span-3">
            <p className="font-sans text-3xl leading-snug mb-4">
              Get your custom design and quote <strong className="font-bold">in just a few steps.</strong>
            </p>
            <p className="text-sm text-foreground/60">
              We'll get in touch shortly to schedule your free consultation.
            </p>
          </div>
          <ContactForm />
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
                  "Indian River County",
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

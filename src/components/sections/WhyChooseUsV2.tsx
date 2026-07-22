import { useEffect, useRef, useState } from "react";
import whyBg from "@/assets/why-bg.jpg";

function StarSparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.5 10H7.5C9.15686 10 10.5 8.65686 10.5 7V0H11.5V7C11.5 8.65686 12.8431 10 14.5 10H21.5V11H14.5C12.8431 11 11.5 12.3431 11.5 14V21H10.5V14C10.5 12.3431 9.15686 11 7.5 11H0.5V10Z" fill="currentColor"/>
    </svg>
  );
}

export type WhyCard = { title: string; desc: string; icon?: string };

const DEFAULT_CARDS: WhyCard[] = [
  { title: "Same-day or Next-day Free Consultation", desc: "Get expert design at your doorstep with same-day or next-day appointments." },
  { title: "Over 30 Years of Expertise", desc: "South Florida's oldest closet company, delivering unmatched reliability and professional service." },
  { title: "Florida's Most Awarded", desc: "8-Time Best Pick top-rated for 8 consecutive years, reflecting our commitment to excellence." },
  { title: "Standing Behind Our Work", desc: "Our quality extends for years, offering dedicated support and peace of mind after installation." },
  { title: "Customer-centric Approach", desc: "Professional and accommodating service designed to ensure a superior experience at every step." },
];

const TIMINGS = [
  { start: 0.00, end: 0.95 },
  { start: 0.08, end: 1.00 },
  { start: 0.04, end: 0.97 },
  { start: 0.14, end: 1.00 },
  { start: 0.10, end: 0.98 },
];

function getCardStyle(i: number) {
  const isDark = i === 0 || i === 4;
  const isYellow = i === 1 || i === 3;
  const bg = isDark ? "rgba(0, 0, 0, 0.86)" : isYellow ? "rgba(241, 195, 58, 0.94)" : undefined;
  const textColor = isDark ? "#FFFFFF" : "#313131";
  const descOpacity = isYellow ? 1 : isDark ? 0.85 : 0.75;
  return { bg, textColor, descOpacity, isDark, isYellow };
}

export function WhyChooseUsV2({ title = "Why JL Closets?", cards = DEFAULT_CARDS }: { title?: string; cards?: WhyCard[] } = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileWrapperRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  useEffect(() => {
    if (!isMobile || !mobileWrapperRef.current) return;
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | null = null;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
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

  const cardOffset = (i: number) => {
    const t = TIMINGS[i];
    const p = (progress - t.start) / (t.end - t.start);
    const clamped = Math.min(Math.max(p, 0), 1);
    const eased = Math.sin((clamped * Math.PI) / 2);
    return (1 - eased) * 110 + eased * -35;
  };

  return (
    <>
      {/* MOBILE + TABLET: GSAP pinned panels */}
      <div ref={mobileWrapperRef} className="lg:hidden">
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
                {title}
              </h2>
              <div className="flex items-center justify-between w-full px-8 opacity-90 text-white mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarSparkle key={`mbot-${i}`} className="w-4 h-4" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {cards.map((c, i) => {
          const s = getCardStyle(i);
          return (
            <section
              key={i}
              className="why-panel w-full h-screen flex items-center justify-center relative overflow-hidden"
              style={{ background: s.bg || "#F5F0E8", borderRadius: "10px" }}
            >
              <div className="why-panel-inner h-full flex flex-col items-center justify-center px-8 text-center">
                <div className="flex flex-col items-center gap-6">
                  {c.icon && <img src={c.icon} alt="" className={`w-28 h-28 object-contain ${s.isDark ? "brightness-0 invert" : ""}`} />}
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

      {/* DESKTOP: rising cards */}
      <section ref={sectionRef} className="relative hidden lg:block h-[240vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <img src={whyBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 gap-20">
            <div className="flex items-center justify-between w-full px-16 opacity-90 text-white">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarSparkle key={`top-${i}`} className="w-6 h-6" />
              ))}
            </div>
            <h2 className="font-sans font-bold text-center leading-none text-white" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
              {title}
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
                    <p className="font-display text-xl xl:text-3xl 2xl:text-4xl font-bold leading-tight" style={{ color: s.textColor }}>
                      {c.title}
                    </p>
                    <p className="font-sans text-sm xl:text-base leading-snug mt-auto pt-6" style={{ color: s.textColor, opacity: s.descOpacity }}>
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

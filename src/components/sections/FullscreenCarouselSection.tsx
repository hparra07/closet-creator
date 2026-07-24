import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { YellowButton } from "@/components/common/YellowButton";

export type CarouselSlide = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  href?: string;
};

const SLIDE_DURATION = 700;

// Splits the element's text into its rendered lines and flips them in with the same
// 3D "Lines" reveal used across the panel (rotationX + fade, staggered per line).
function useLinesReveal(ref: React.RefObject<HTMLElement | null>, text: string, delay = 0) {
  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let split: { lines: Element[]; revert: () => void } | undefined;

    (async () => {
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(SplitText);
      if (!ref.current) return;

      ctx = gsap.context(() => {
        split = SplitText.create(ref.current!, { type: "lines" }) as unknown as { lines: Element[]; revert: () => void };
        gsap.from(split.lines, {
          rotationX: -100,
          transformOrigin: "50% 50% -160px",
          opacity: 0,
          duration: 0.8,
          ease: "power3",
          stagger: 0.15,
          delay,
        });
      });
    })();

    return () => {
      ctx?.revert();
      split?.revert();
    };
  }, [ref, text, delay]);
}

function TitleLinesReveal({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  useLinesReveal(ref, text, 0);
  return (
    <h2 ref={ref} className={className} style={{ perspective: "500px" }}>
      {text}
    </h2>
  );
}

function TextLinesReveal({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  useLinesReveal(ref, text, 0.35);
  return (
    <p ref={ref} className={className} style={{ perspective: "500px" }}>
      {text}
    </p>
  );
}

// The button isn't split into lines (it's not running text), but it gets the same
// rotationX flip-in as a single "line", timed to land right after the text above it.
function ButtonReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        rotationX: -100,
        transformOrigin: "50% 50% -160px",
        opacity: 0,
        duration: 0.8,
        ease: "power3",
        delay: 0.55,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ perspective: "500px" }}>
      {children}
    </div>
  );
}

function LongArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="24"
      height="10"
      viewBox="0 0 26 10"
      fill="none"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path d="M0 5H25M25 5L20 1M25 5L20 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FullscreenCarouselSection({ slides }: { slides: CarouselSlide[] }) {
  const count = slides.length;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const CARD_W = isMobile ? 100 : 240;
  const CARD_GAP = isMobile ? 12 : 24;
  const CARD_H = isMobile ? 150 : 320;
  const CARD_H_ACTIVE = isMobile ? 175 : 380;

  // trackIndex is unbounded (keeps incrementing/decrementing) so the track can slide
  // continuously in one direction; it gets silently re-centered once the slide transition
  // actually finishes (via onTransitionEnd below), never mid-flight, so it's invisible.
  const [trackIndex, setTrackIndex] = useState(count);
  const [noTransition, setNoTransition] = useState(false);
  const [settledActive, setSettledActive] = useState(0);

  const active = ((trackIndex % count) + count) % count;

  // Direction the text panel should animate in from ("up" = came from below, like moving next).
  const [textDirection, setTextDirection] = useState<"up" | "down">("up");

  const go = (dir: number) => {
    setTextDirection(dir >= 0 ? "up" : "down");
    setTrackIndex((t) => t + dir);
  };

  // Runs exactly once the track's transform transition really finishes (native browser
  // event, not a guessed timer) — settles the active card's height, then, only if the
  // index has drifted outside the safe middle zone, snaps it back without a transition.
  const handleTrackSettled = (e: React.TransitionEvent) => {
    if (e.propertyName !== "transform") return;
    setSettledActive(active);
    if (trackIndex < count * 0.5 || trackIndex > count * 1.5) {
      setNoTransition(true);
      setTrackIndex((t) => (((t % count) + count) % count) + count);
      requestAnimationFrame(() => requestAnimationFrame(() => setNoTransition(false)));
    }
  };

  // Render 3 copies of the deck so there's always a full row of cards to slide into view.
  const trackSlides = [...slides, ...slides, ...slides];
  const trackOffset = trackIndex * (CARD_W + CARD_GAP);

  // Find each real slide's closest "virtual" copy to the unbounded trackIndex, used to
  // keep the card track sliding continuously in one direction without ever rewinding.
  const nearestVirtual = (i: number) => i + Math.round((trackIndex - i) / count) * count;

  // Jumping to a real slide index (dots) should always take the shortest path from
  // wherever trackIndex currently is, instead of resetting to a fixed absolute value.
  const goTo = (i: number) => {
    const target = nearestVirtual(i);
    setTextDirection(target >= trackIndex ? "up" : "down");
    setTrackIndex(target);
  };

  // Only the active slide's text is ever mounted, so there is never more than one text
  // block in the DOM — no stacking/overlap possible. React's key change on `active`
  // handles the exit; the CSS animation below only needs to handle the entrance.
  const renderTextPanel = (titleClass: string) => (
    <div
      key={active}
      className={`flex flex-col justify-center ${textDirection === "up" ? "slide-text-up" : "slide-text-down"}`}
    >
      <TitleLinesReveal
        text={slides[active].title}
        className={`font-sans font-medium leading-[1.05] text-white mb-5 ${titleClass}`}
      />
      <TextLinesReveal
        text={slides[active].description}
        className="text-white/80 text-sm md:text-base leading-relaxed mb-7"
      />
      <ButtonReveal>
        <YellowButton href={slides[active].href ?? "#"}>Explore</YellowButton>
      </ButtonReveal>
    </div>
  );

  const arrows = (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Previous"
        onClick={() => go(-1)}
        className="w-11 h-11 flex items-center justify-center rounded-full border border-white/40 text-white/80 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-500 ease-out cursor-pointer shrink-0"
      >
        <LongArrow direction="left" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => go(1)}
        className="w-11 h-11 flex items-center justify-center rounded-full border border-white/40 text-white/80 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-500 ease-out cursor-pointer shrink-0"
      >
        <LongArrow direction="right" />
      </button>
    </div>
  );

  const renderCardTrack = (showLabels: boolean) => (
    <div className="overflow-hidden" style={{ height: CARD_H_ACTIVE }}>
      <div
        className="flex items-center h-full"
        onTransitionEnd={handleTrackSettled}
        style={{
          gap: `${CARD_GAP}px`,
          transform: `translateX(-${trackOffset}px)`,
          transition: noTransition ? "none" : `transform ${SLIDE_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        }}
      >
        {trackSlides.map((s, i) => {
          const realIdx = i % count;
          const isSlotActive = realIdx === settledActive && i === nearestVirtual(realIdx);
          return (
            <button
              key={i}
              type="button"
              aria-label={s.title}
              onClick={() => setTrackIndex(i)}
              className="relative overflow-hidden rounded-2xl shadow-2xl shrink-0 cursor-pointer transition-[height] duration-500 ease-in-out"
              style={{ width: CARD_W, height: isSlotActive ? CARD_H_ACTIVE : CARD_H }}
            >
              <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              {showLabels && (
                <>
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(20deg, rgba(0,0,0,${isSlotActive ? 0.75 : 0.55}) 0%, rgba(0,0,0,0) 100%)` }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <p className="font-sans text-xl font-bold text-white leading-tight text-left">{s.title}</p>
                    <p className="text-white/70 text-sm text-left">{s.subtitle}</p>
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="relative min-h-[640px] lg:h-screen w-full overflow-hidden py-16 lg:py-0">
      {/* Crossfading backgrounds with subtle zoom */}
      {slides.map((s, i) => (
        <div
          key={s.title}
          className="absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-out"
          style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(1.08)" }}
        >
          <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10 lg:bg-gradient-to-r" />
      <div className="absolute inset-0 bg-black/45 lg:hidden" />

      {/* Vertical timeline (desktop only) */}
      <div className="hidden lg:flex absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 h-[380px] flex-col items-center justify-between">
        <div className="absolute top-2.5 bottom-2.5 left-1/2 -translate-x-1/2 w-px bg-white/30" />
        {slides.map((_, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="relative z-10 flex items-center justify-center cursor-pointer"
            >
              <span
                className="rounded-full text-black text-[11px] font-semibold flex items-center justify-center transition-transform duration-300 ease-in-out"
                style={{
                  width: "23px",
                  height: "23px",
                  transform: isActive ? "scale(1)" : "scale(0.35)",
                  background: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                }}
              >
                <span className="transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0 }}>
                  {i + 1}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex relative z-10 h-full items-center">
        <div className="w-[40%] pl-16 md:pl-24 lg:pl-32 pr-10 lg:pr-16 shrink-0">
          <div className="relative min-h-[420px] overflow-hidden flex flex-col justify-center">
            {renderTextPanel("text-4xl md:text-6xl")}
          </div>
        </div>

        <div className="flex-1 ml-4 lg:ml-8">
          {renderCardTrack(true)}
          <div className="mt-6">{arrows}</div>
        </div>
      </div>

      {/* Mobile & tablet layout */}
      <div className="lg:hidden absolute inset-0 z-10 flex flex-col justify-center px-6">
        <div className="relative min-h-[220px] overflow-hidden mb-8 flex flex-col justify-center">
          {renderTextPanel("text-3xl")}
        </div>

        <div className="flex items-center gap-2 mt-10">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/40 text-white/80 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-500 ease-out cursor-pointer shrink-0"
          >
            <LongArrow direction="left" />
          </button>
          {renderCardTrack(false)}
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/40 text-white/80 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-500 ease-out cursor-pointer shrink-0"
          >
            <LongArrow direction="right" />
          </button>
        </div>

        {/* Horizontal dot pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, i) => {
            const isActive = active === i;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="flex items-center justify-center cursor-pointer"
              >
                <span
                  className="rounded-full text-black text-[10px] font-semibold flex items-center justify-center transition-transform duration-300 ease-in-out"
                  style={{
                    width: "20px",
                    height: "20px",
                    transform: isActive ? "scale(1)" : "scale(0.35)",
                    background: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                  }}
                >
                  <span className="transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0 }}>
                    {i + 1}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

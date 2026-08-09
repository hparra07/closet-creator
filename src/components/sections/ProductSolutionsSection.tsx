import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { YellowButton } from "@/components/common/YellowButton";

export type ProjectFeature = { label: string; desc: string };
export type ProjectDetails = { title: string; intro: string; features: ProjectFeature[] };

export type ProjectSlide = { image: string; label: string; desc: string; details?: ProjectDetails };

export type ProductSolution = {
  title: string;
  desc: string;
  images: string[];
  href?: string;
  details?: ProjectDetails;
  // Optional per-slide project label/desc/details — when set, each image in
  // the card's own slider shows its own "Project N" caption (and its own
  // Discover details) instead of the solution's static title/desc/details
  // repeated across every slide.
  projects?: ProjectSlide[];
  // When true, the card is a plain image + title + desc slider with no
  // Discover button and no details panel at all.
  noButton?: boolean;
};

export type SlideTransition = "diagonal" | "fade-right";

function LongArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="26"
      height="10"
      viewBox="0 0 26 10"
      fill="none"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path d="M0 5H25M25 5L20 1M25 5L20 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// How steep the diagonal split is, in percentage points of skew between the
// top and bottom edges of the reveal mask.
const DIAGONAL_SKEW = 28;
const HIDDEN_P = -DIAGONAL_SKEW;
const REVEALED_P = 100 + DIAGONAL_SKEW;
const WIPE_DURATION = "750ms";
const WIPE_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

// Forward (dir=1): the mask grows from the top-left corner toward bottom-right.
// Backward (dir=-1): mirrored — grows from the bottom-right corner toward top-left.
function diagonalClipPath(p: number, dir: 1 | -1) {
  if (dir === 1) {
    return `polygon(0% 0%, ${p}% 0%, ${p - DIAGONAL_SKEW}% 100%, 0% 100%)`;
  }
  return `polygon(${100 - p}% 100%, ${100 - p + DIAGONAL_SKEW}% 0%, 100% 0%, 100% 100%)`;
}

function SolutionCard({
  solution,
  transition = "diagonal",
  shadow = true,
}: {
  solution: ProductSolution;
  transition?: SlideTransition;
  shadow?: boolean;
}) {
  const slides: ProjectSlide[] =
    solution.projects ??
    solution.images.map((img) => ({ image: img, label: solution.title, desc: solution.desc }));

  const [active, setActive] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [closingDetails, setClosingDetails] = useState(false);
  const count = slides.length;
  const activeDetails = slides[active].details ?? solution.details;
  const prevActiveRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  // Plays the slide-up entrance in reverse before actually unmounting the
  // panel, instead of just snapping it away.
  const closeDetails = () => {
    if (!showDetails) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowDetails(false);
      return;
    }
    setClosingDetails(true);
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setShowDetails(false);
      setClosingDetails(false);
    }, 450);
  };

  useEffect(() => () => window.clearTimeout(closeTimeoutRef.current), []);

  const go = (dir: number) => {
    directionRef.current = dir >= 0 ? 1 : -1;
    closeDetails();
    setActive((a) => (a + dir + count) % count);
  };

  const goTo = (i: number) => {
    directionRef.current = i >= active ? 1 : -1;
    closeDetails();
    setActive(i);
  };

  // Two transitions to compare side by side:
  // - "diagonal": CSS clip-path wipe, corner to corner, outgoing stays put underneath.
  // - "fade-right": GSAP fade+slide, outgoing drifts right while fading, incoming fades in.
  useLayoutEffect(() => {
    const prev = prevActiveRef.current;
    prevActiveRef.current = active;
    if (prev === active) return;

    const outgoing = pageRefs.current[prev];
    const incoming = pageRefs.current[active];
    if (!outgoing || !incoming) return;

    const dir = directionRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (transition === "fade-right") {
      gsap.killTweensOf([outgoing, incoming]);
      gsap.set(outgoing, { zIndex: 2, opacity: 1, x: 0, rotation: 0, clipPath: "none" });
      gsap.set(incoming, { zIndex: 1, opacity: 0, x: 0, rotation: 0, clipPath: "none" });

      if (reduceMotion) {
        gsap.set(outgoing, { opacity: 0 });
        gsap.set(incoming, { opacity: 1 });
        return;
      }

      gsap.to(outgoing, {
        x: 60,
        rotation: 8,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(outgoing, { x: 0, rotation: 0, zIndex: 0 });
        },
      });
      gsap.to(incoming, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      return;
    }

    // Outgoing layer: stays exactly where it is, fully opaque, no transform/mask.
    outgoing.style.transition = "none";
    outgoing.style.clipPath = "none";
    outgoing.style.opacity = "1";
    outgoing.style.zIndex = "1";

    // Incoming layer: sits on top and covers the outgoing one as the mask sweeps.
    incoming.style.zIndex = "2";
    incoming.style.opacity = "1";

    if (reduceMotion) {
      incoming.style.transition = "none";
      incoming.style.clipPath = "none";
      return;
    }

    // Snap to the fully-hidden mask with no transition, then on the next frame
    // enable the transition and animate to the fully-revealed mask.
    incoming.style.transition = "none";
    incoming.style.clipPath = diagonalClipPath(HIDDEN_P, dir);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!incoming) return;
        incoming.style.transition = `clip-path ${WIPE_DURATION} ${WIPE_EASE}`;
        incoming.style.clipPath = diagonalClipPath(REVEALED_P, dir);
      });
    });
  }, [active, transition]);

  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${shadow ? "shadow-2xl" : ""}`}>
      {/* Transition stack */}
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          ref={(el) => { pageRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{
            opacity: active === i ? 1 : 0,
            zIndex: active === i ? 1 : 0,
            pointerEvents: active === i ? "auto" : "none",
          }}
        >
          <img src={slide.image} alt={slide.label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none z-10" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-20 z-20">
        <p className="font-sans text-2xl font-bold text-white mb-1">{solution.title}</p>
        {solution.projects && slides.length > 1 && (
          <p className="text-primary text-xs font-bold tracking-widest mb-2">{slides[active].label}</p>
        )}
        <p className="text-white text-sm leading-relaxed mb-5 max-w-xs">{slides[active].desc}</p>
        {!solution.noButton && (
          activeDetails ? (
            <YellowButton onClick={() => setShowDetails(true)}>Discover</YellowButton>
          ) : (
            <YellowButton href={solution.href ?? "#"}>Discover</YellowButton>
          )
        )}
      </div>

      {/* Details panel — opens in place of the image, inside this same card.
          Rounding + clipping live on the SAME element that animates in (not
          a separate ancestor), since a border-radius/overflow-hidden on a
          non-transformed parent can fail to clip a transformed child in
          some browsers, leaving the corners uncovered. A dark translucent
          background (rather than solid) keeps the project photo visible
          underneath instead of hiding it completely. */}
      {activeDetails && (showDetails || closingDetails) && (
        <div
          className={`absolute inset-0 z-30 rounded-2xl overflow-x-hidden overflow-y-auto bg-black/60 backdrop-blur-[4px] p-6 md:p-7 ${closingDetails ? "details-slide-down" : "details-slide-up"}`}
        >
          <button
            type="button"
            aria-label="Close details"
            onClick={closeDetails}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="font-sans text-lg font-bold uppercase leading-snug mb-3 pr-8 text-white">
            {activeDetails.title}
          </p>
          <p className="text-sm leading-relaxed mb-4 text-white/80">
            {activeDetails.intro}
          </p>
          <ul className="space-y-2.5">
            {activeDetails.features.map((f) => (
              <li key={f.label} className="flex items-start gap-2.5">
                <span className="text-primary mt-1.5 shrink-0 text-[10px]">●</span>
                <span className="text-sm leading-relaxed text-white/90">
                  <strong className="font-bold text-white">{f.label}:</strong> {f.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom navigation bar */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/90 to-transparent border-t border-white/25 flex items-stretch z-20">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="w-14 flex items-center justify-center text-white/80 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 ease-out cursor-pointer shrink-0"
          >
            <LongArrow direction="left" />
          </button>

          <div className="w-px bg-white/25 shrink-0" />

          <div className="flex-1 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${active === i ? "w-6 bg-primary" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>

          <div className="w-px bg-white/25 shrink-0" />

          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="w-14 flex items-center justify-center text-white/80 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 ease-out cursor-pointer shrink-0"
          >
            <LongArrow direction="right" />
          </button>
        </div>
      )}

      <style>{`
        @keyframes details-slide-up {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes details-slide-down {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(22px); }
        }
        .details-slide-up { animation: details-slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
        .details-slide-down { animation: details-slide-down 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .details-slide-up, .details-slide-down { animation: none; }
        }
      `}</style>
    </div>
  );
}

export function ProductSolutionsSection({
  title,
  intro,
  introSize = "lg",
  solutions,
  layout = "grid",
}: {
  title?: string;
  intro: React.ReactNode;
  introSize?: "lg" | "sm";
  solutions: ProductSolution[];
  // "carousel" is for longer lists (e.g. a county's page recommending all 8
  // main product categories) — a horizontally scrollable row instead of a
  // grid that would otherwise wrap into several rows.
  layout?: "grid" | "carousel";
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Advance by exactly one card's width (+ gap), not the whole viewport, so
  // multiple cards stay visible but the arrows step through them one at a
  // time instead of jumping past 2-3 at once.
  const scrollCarousel = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = 24;
    const step = firstCard ? firstCard.getBoundingClientRect().width + gap : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <SectionWrapper className="!pt-24 md:!pt-32">
      {title && (
        <div className="text-center mb-10 md:mb-14 reveal-up">
          <span className="rule eyebrow" style={{ color: "#313131" }}>{title}</span>
        </div>
      )}
      <div
        className={`text-center mx-auto reveal-up mb-10 md:mb-14 ${
          introSize === "sm"
            ? "max-w-6xl text-base md:text-lg leading-relaxed"
            : "max-w-2xl font-sans text-2xl md:text-3xl leading-snug"
        }`}
        style={{ color: "#313131" }}
      >
        {intro}
      </div>

      {layout === "carousel" ? (
        <div className="reveal-up">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {solutions.map((s, i) => (
              <div key={s.title} className="snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-[31%]">
                <SolutionCard solution={s} transition={i === 0 ? "fade-right" : "diagonal"} shadow={false} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollCarousel(-1)}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-foreground/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300 cursor-pointer"
              style={{ color: "#313131" }}
            >
              <LongArrow direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollCarousel(1)}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-foreground/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300 cursor-pointer"
              style={{ color: "#313131" }}
            >
              <LongArrow direction="right" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-up">
          {solutions.map((s, i) => (
            <SolutionCard
              key={s.title}
              solution={s}
              transition={i === 0 ? "fade-right" : "diagonal"}
            />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}

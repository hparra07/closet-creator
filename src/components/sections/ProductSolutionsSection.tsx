import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { YellowButton } from "@/components/common/YellowButton";

export type ProductSolution = {
  title: string;
  desc: string;
  images: string[];
  href?: string;
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

function SolutionCard({ solution, transition = "diagonal" }: { solution: ProductSolution; transition?: SlideTransition }) {
  const [active, setActive] = useState(0);
  const count = solution.images.length;
  const prevActiveRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const go = (dir: number) => {
    directionRef.current = dir >= 0 ? 1 : -1;
    setActive((a) => (a + dir + count) % count);
  };

  const goTo = (i: number) => {
    directionRef.current = i >= active ? 1 : -1;
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
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
      {/* Transition stack */}
      {solution.images.map((img, i) => (
        <div
          key={img}
          ref={(el) => { pageRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{
            opacity: active === i ? 1 : 0,
            zIndex: active === i ? 1 : 0,
            pointerEvents: active === i ? "auto" : "none",
          }}
        >
          <img src={img} alt={solution.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none z-10" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-20 z-20">
        <p className="font-sans text-2xl font-bold text-white mb-2">{solution.title}</p>
        <p className="text-white text-sm leading-relaxed mb-5 max-w-xs">{solution.desc}</p>
        <YellowButton href={solution.href ?? "#"}>Discover</YellowButton>
      </div>

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
            {solution.images.map((_, i) => (
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
    </div>
  );
}

export function ProductSolutionsSection({
  title,
  intro,
  solutions,
}: {
  title?: string;
  intro: React.ReactNode;
  solutions: ProductSolution[];
}) {
  return (
    <SectionWrapper className="!pt-24 md:!pt-32">
      {title && (
        <div className="text-center mb-10 md:mb-14 reveal-up">
          <span className="rule eyebrow" style={{ color: "#313131" }}>{title}</span>
        </div>
      )}
      <p className="text-center max-w-2xl mx-auto font-sans text-2xl md:text-3xl leading-snug mb-10 md:mb-14 reveal-up" style={{ color: "#313131" }}>
        {intro}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-up">
        {solutions.map((s, i) => (
          <SolutionCard key={s.title} solution={s} transition={i === 0 ? "fade-right" : "diagonal"} />
        ))}
      </div>
    </SectionWrapper>
  );
}

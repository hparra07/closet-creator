import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SectionWrapper } from "@/components/common/SectionWrapper";

gsap.registerPlugin(Flip);

export type SolutionReason = { title: string; desc: string };

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

export function WhyChooseSolutionSection({
  title,
  intro,
  reasons,
  images,
}: {
  title: React.ReactNode;
  intro: React.ReactNode;
  reasons: SolutionReason[];
  images: string[];
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  const shuffle = (dir: "next" | "prev") => {
    const slider = sliderRef.current;
    if (!slider || animatingRef.current) return;
    const items = slider.querySelectorAll<HTMLElement>(".stack-item");
    if (items.length < 2) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (dir === "next") {
        slider.insertBefore(items[items.length - 1], items[0]);
      } else {
        slider.appendChild(items[0]);
      }
      return;
    }

    animatingRef.current = true;
    const state = Flip.getState(items);
    if (dir === "next") {
      // Front card (last child) is sent to the back of the stack.
      slider.insertBefore(items[items.length - 1], items[0]);
    } else {
      // Back card (first child) is brought to the front.
      slider.appendChild(items[0]);
    }
    Flip.from(state, {
      targets: slider.querySelectorAll(".stack-item"),
      duration: 0.5,
      ease: "sine.inOut",
      absolute: true,
      onComplete: () => {
        animatingRef.current = false;
      },
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const onClick = () => shuffle("next");
    slider.addEventListener("click", onClick);
    return () => slider.removeEventListener("click", onClick);
  }, []);

  return (
    <SectionWrapper className="mt-8 md:mt-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <h2 className="font-sans text-3xl md:text-4xl leading-tight mb-6 reveal-up" style={{ color: "#313131" }}>
            {title}
          </h2>
          <div className="space-y-4 text-base leading-relaxed reveal-up" style={{ color: "#313131" }}>
            {intro}
          </div>
        </div>

        <div className="reveal-up">
          <div className="stack-wrap">
            <div ref={sliderRef} className="stack-slider">
              {/* Rendered back-to-front: the last child paints on top, so card 01 starts in front. */}
              {images.map((_, idx) => {
                const i = images.length - 1 - idx;
                const reason = reasons[i % reasons.length];
                return (
                  <div key={images[i]} className="stack-item">
                    <img src={images[i]} alt={reason.title} loading="lazy" draggable={false} />
                    <div className="stack-overlay" />
                    <div className="stack-caption">
                      <span className="stack-num">{String((i % reasons.length) + 1).padStart(2, "0")}</span>
                      <p className="stack-reason">{reason.title}</p>
                      <p className="stack-desc">{reason.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              aria-label="Previous card"
              onClick={() => shuffle("prev")}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-[#313131]/40 text-[#313131] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-500 ease-out cursor-pointer shrink-0"
            >
              <LongArrow direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next card"
              onClick={() => shuffle("next")}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-[#313131]/40 text-[#313131] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-500 ease-out cursor-pointer shrink-0"
            >
              <LongArrow direction="right" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .stack-wrap {
          display: flex;
          justify-content: center;
          padding: 40px 56px 24px 0;
        }
        .stack-slider {
          position: relative;
          width: min(300px, 78vw);
          aspect-ratio: 2 / 3;
          cursor: pointer;
        }
        .stack-item {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(0,0,0,0.28);
          user-select: none;
        }
        .stack-item img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          -webkit-user-drag: none;
          pointer-events: none;
        }
        .stack-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.15) 45%, transparent);
          pointer-events: none;
        }
        .stack-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 20px;
          pointer-events: none;
        }
        .stack-num {
          display: block;
          color: var(--color-primary);
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 6px;
        }
        .stack-reason {
          margin: 0;
          color: #fff;
          font-family: var(--font-sans);
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
        }
        .stack-desc {
          margin: 6px 0 0;
          color: rgba(255,255,255,0.8);
          font-family: var(--font-sans);
          font-size: 13px;
          line-height: 1.5;
        }
        .stack-item:nth-child(5) { left: 0; top: 0; }
        .stack-item:nth-child(4) { left: 14px; top: -14px; }
        .stack-item:nth-child(3) { left: 28px; top: -28px; }
        .stack-item:nth-child(2) { left: 42px; top: -42px; }
        .stack-item:nth-child(1) { left: 56px; top: -56px; }
        @media (min-width: 768px) {
          .stack-slider { width: 340px; }
          .stack-item:nth-child(4) { left: 18px; top: -18px; }
          .stack-item:nth-child(3) { left: 36px; top: -36px; }
          .stack-item:nth-child(2) { left: 54px; top: -54px; }
          .stack-item:nth-child(1) { left: 72px; top: -72px; }
        }
      `}</style>
    </SectionWrapper>
  );
}

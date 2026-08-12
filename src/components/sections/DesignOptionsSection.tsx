import { useLayoutEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

export type DesignOption = { title: string; desc: string; images: string[] };

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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Same diagonal clip-path wipe used by the solution sliders on the main
// product pages, so both carousels feel identical.
const DIAGONAL_SKEW = 28;
const HIDDEN_P = -DIAGONAL_SKEW;
const REVEALED_P = 100 + DIAGONAL_SKEW;
const WIPE_DURATION = "750ms";
const WIPE_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

function diagonalClipPath(p: number, dir: 1 | -1) {
  if (dir === 1) {
    return `polygon(0% 0%, ${p}% 0%, ${p - DIAGONAL_SKEW}% 100%, 0% 100%)`;
  }
  return `polygon(${100 - p}% 100%, ${100 - p + DIAGONAL_SKEW}% 0%, 100% 0%, 100% 100%)`;
}

export function DesignOptionsSection({
  title,
  intro,
  options,
}: {
  title: string;
  intro?: React.ReactNode;
  options: DesignOption[];
}) {
  // Each option is its own slider: `active` picks the option, `imgIdx` the
  // image within that option. Arrows only move through the active option's
  // images; switching option resets its slider to the first image. Shared
  // between the desktop split view and the mobile accordion below, since
  // only one of the two layouts is visible at a time.
  const [active, setActive] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const prevPaneRef = useRef("0-0");
  const mobilePrevPaneRef = useRef("0-0");
  const directionRef = useRef<1 | -1>(1);
  const pageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const mobilePageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const imgCount = options[active].images.length;

  const goImage = (dir: number) => {
    directionRef.current = dir >= 0 ? 1 : -1;
    setImgIdx((i) => (i + dir + imgCount) % imgCount);
  };

  const goToImage = (i: number) => {
    if (i === imgIdx) return;
    directionRef.current = i >= imgIdx ? 1 : -1;
    setImgIdx(i);
  };

  const goToOption = (i: number) => {
    if (i === active) return;
    directionRef.current = i >= active ? 1 : -1;
    setActive(i);
    setImgIdx(0);
  };

  useLayoutEffect(() => {
    const paneKey = `${active}-${imgIdx}`;
    const prevKey = prevPaneRef.current;
    prevPaneRef.current = paneKey;
    if (prevKey === paneKey) return;

    const outgoing = pageRefs.current[prevKey];
    const incoming = pageRefs.current[paneKey];
    if (!outgoing || !incoming) return;

    // Any pane left over from a previous transition keeps its imperative
    // styles, so force-hide everything that isn't part of this transition.
    Object.entries(pageRefs.current).forEach(([key, el]) => {
      if (!el || key === prevKey || key === paneKey) return;
      el.style.transition = "none";
      el.style.clipPath = "none";
      el.style.opacity = "0";
      el.style.zIndex = "0";
    });

    const dir = directionRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    outgoing.style.transition = "none";
    outgoing.style.clipPath = "none";
    outgoing.style.opacity = "1";
    outgoing.style.zIndex = "1";

    incoming.style.zIndex = "2";
    incoming.style.opacity = "1";

    if (reduceMotion) {
      incoming.style.transition = "none";
      incoming.style.clipPath = "none";
      return;
    }

    incoming.style.transition = "none";
    incoming.style.clipPath = diagonalClipPath(HIDDEN_P, dir);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!incoming) return;
        incoming.style.transition = `clip-path ${WIPE_DURATION} ${WIPE_EASE}`;
        incoming.style.clipPath = diagonalClipPath(REVEALED_P, dir);
      });
    });
  }, [active, imgIdx]);

  // Same diagonal wipe, applied to the mobile accordion's own pane refs so
  // it doesn't collide with the desktop panes rendered elsewhere in the DOM.
  useLayoutEffect(() => {
    const paneKey = `${active}-${imgIdx}`;
    const prevKey = mobilePrevPaneRef.current;
    mobilePrevPaneRef.current = paneKey;
    if (prevKey === paneKey) return;

    const outgoing = mobilePageRefs.current[prevKey];
    const incoming = mobilePageRefs.current[paneKey];
    if (!outgoing || !incoming) return;

    Object.entries(mobilePageRefs.current).forEach(([key, el]) => {
      if (!el || key === prevKey || key === paneKey) return;
      el.style.transition = "none";
      el.style.clipPath = "none";
      el.style.opacity = "0";
      el.style.zIndex = "0";
    });

    const dir = directionRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    outgoing.style.transition = "none";
    outgoing.style.clipPath = "none";
    outgoing.style.opacity = "1";
    outgoing.style.zIndex = "1";

    incoming.style.zIndex = "2";
    incoming.style.opacity = "1";

    if (reduceMotion) {
      incoming.style.transition = "none";
      incoming.style.clipPath = "none";
      return;
    }

    incoming.style.transition = "none";
    incoming.style.clipPath = diagonalClipPath(HIDDEN_P, dir);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!incoming) return;
        incoming.style.transition = `clip-path ${WIPE_DURATION} ${WIPE_EASE}`;
        incoming.style.clipPath = diagonalClipPath(REVEALED_P, dir);
      });
    });
  }, [active, imgIdx]);

  const navBar = (
    <div className="absolute inset-x-0 bottom-0 h-14 border-t border-white/25 flex items-stretch z-20">
      <button
        type="button"
        aria-label="Previous image"
        onClick={() => goImage(-1)}
        className="w-14 flex items-center justify-center text-white/80 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 ease-out cursor-pointer shrink-0"
      >
        <LongArrow direction="left" />
      </button>

      <div className="w-px bg-white/25 shrink-0" />

      <div className="flex-1 flex items-center justify-center gap-2">
        {options[active].images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to image ${i + 1}`}
            onClick={() => goToImage(i)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${imgIdx === i ? "w-6 bg-primary" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>

      <div className="w-px bg-white/25 shrink-0" />

      <button
        type="button"
        aria-label="Next image"
        onClick={() => goImage(1)}
        className="w-14 flex items-center justify-center text-white/80 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 ease-out cursor-pointer shrink-0"
      >
        <LongArrow direction="right" />
      </button>
    </div>
  );

  return (
    <SectionWrapper>
      <div className="text-center mb-6 md:mb-8 reveal-up">
        <h2 className="rule eyebrow" style={{ color: "#313131" }}>{title}</h2>
      </div>
      {intro && (
        <p className="text-center max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-10 md:mb-14 reveal-up" style={{ color: "#313131" }}>
          {intro}
        </p>
      )}

      {/* Desktop / tablet: side-by-side panel + slider */}
      <div className="hidden lg:grid max-w-6xl mx-auto lg:grid-cols-[minmax(380px,560px)_1fr] gap-2 reveal-up">
        <div className="w-full bg-ink p-8 md:p-11 rounded-l-2xl shadow-2xl">
          <p className="text-white/50 text-xs italic tracking-wide mb-6">
            Click on an option to explore it
          </p>
          <ul className="space-y-5 md:space-y-6">
            {options.map((opt, i) => (
              <li key={opt.title}>
                <button
                  type="button"
                  title="Click to view this option"
                  onClick={() => goToOption(i)}
                  className={`group flex items-start gap-3 text-left cursor-pointer transition-opacity duration-300 ${
                    active === i ? "opacity-100" : "opacity-40 hover:opacity-75"
                  }`}
                >
                  <span className="text-primary mt-1 shrink-0 text-xs">●</span>
                  <span className="text-sm md:text-base leading-relaxed text-white">
                    <strong className="text-primary font-bold">{opt.title}:</strong>{" "}
                    {opt.desc}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Image slider (one per option) */}
        <div className="relative w-full min-h-[300px] rounded-r-2xl shadow-2xl overflow-hidden">
          {options.map((opt, i) =>
            opt.images.map((img, j) => (
              <div
                key={`${opt.title}-${j}`}
                ref={(el) => { pageRefs.current[`${i}-${j}`] = el; }}
                className="absolute inset-0"
                style={{
                  opacity: active === i && imgIdx === j ? 1 : 0,
                  zIndex: active === i && imgIdx === j ? 1 : 0,
                  pointerEvents: active === i && imgIdx === j ? "auto" : "none",
                }}
              >
                <button
                  type="button"
                  aria-label={`Open ${opt.title} in fullscreen`}
                  onClick={() => setLightbox(true)}
                  className="absolute inset-0 w-full h-full cursor-zoom-in"
                >
                  <img src={img} alt={opt.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </button>
              </div>
            ))
          )}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none z-10" />
          <p className="absolute left-6 right-6 bottom-20 font-sans text-2xl md:text-3xl font-bold text-white z-10 pointer-events-none">
            {options[active].title}
          </p>
          {navBar}
        </div>
      </div>

      {/* Mobile: tabs-style accordion — click a title to expand its
          description and image slider, collapsing the others. Keeps the
          whole interaction in one place instead of splitting text and
          images into two far-apart blocks the user has to scroll between. */}
      <div className="lg:hidden max-w-xl mx-auto rounded-2xl overflow-hidden shadow-2xl reveal-up">
        {options.map((opt, i) => {
          const isOpen = active === i;
          return (
            <div key={opt.title} className="bg-ink border-b border-white/10 last:border-b-0">
              <button
                type="button"
                onClick={() => goToOption(i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-3 p-5 text-left cursor-pointer"
              >
                <span className={`text-sm font-bold ${isOpen ? "text-primary" : "text-white"}`}>
                  {opt.title}
                </span>
                <ChevronIcon open={isOpen} />
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-400 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5">
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{opt.desc}</p>

                    {isOpen && (
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        {opt.images.map((img, j) => (
                          <div
                            key={j}
                            ref={(el) => { mobilePageRefs.current[`${i}-${j}`] = el; }}
                            className="absolute inset-0"
                            style={{
                              opacity: imgIdx === j ? 1 : 0,
                              zIndex: imgIdx === j ? 1 : 0,
                              pointerEvents: imgIdx === j ? "auto" : "none",
                            }}
                          >
                            <button
                              type="button"
                              aria-label={`Open ${opt.title} in fullscreen`}
                              onClick={() => setLightbox(true)}
                              className="absolute inset-0 w-full h-full cursor-zoom-in"
                            >
                              <img src={img} alt={opt.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                            </button>
                          </div>
                        ))}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
                        {navBar}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-6 md:p-12"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-5 right-7 text-white text-4xl leading-none cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(false);
            }}
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-white/40 text-white/80 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              goImage(-1);
            }}
          >
            <LongArrow direction="left" />
          </button>
          <figure
            className="flex flex-col items-center max-w-[90vw] max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={options[active].images[imgIdx]}
              alt={options[active].title}
              className="max-w-[90vw] max-h-[78vh] object-contain"
            />
            <figcaption className="mt-4 text-white font-sans font-semibold text-base md:text-lg text-center">
              {options[active].title}
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-white/40 text-white/80 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              goImage(1);
            }}
          >
            <LongArrow direction="right" />
          </button>
        </div>
      )}

    </SectionWrapper>
  );
}

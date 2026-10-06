import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal snap carousel with dot indicators, following the pattern already
 * used by the reviews sections. Intended for mobile, where stacking a grid
 * vertically makes the page very long — wrap it in `md:hidden` and render the
 * grid alongside for larger screens.
 */
export function MobileCarousel({
  count,
  label,
  slideClassName = "w-[82vw] max-w-[420px]",
  className = "",
  arrows = false,
  children,
}: {
  /** Number of slides; drives the dots and the scroll maths. */
  count: number;
  /** Used for the controls' accessible names, e.g. "project". */
  label: string;
  slideClassName?: string;
  className?: string;
  /**
   * Show prev/next arrows beside the dots. Needed when the slide itself
   * handles dragging (the before/after slider, for instance), since the
   * swipe gesture is then ambiguous.
   */
  arrows?: boolean;
  children: React.ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el || count === 0) return;
    const slideW = el.scrollWidth / count;
    const i = Math.round(el.scrollLeft / slideW);
    setIdx(Math.min(Math.max(i, 0), count - 1));
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el || count === 0) return;
    const clamped = Math.min(Math.max(i, 0), count - 1);
    const slideW = el.scrollWidth / count;
    el.scrollTo({ left: slideW * clamped, behavior: "smooth" });
  };

  const arrowCls =
    "w-9 h-9 flex items-center justify-center rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer";

  return (
    <div className={className}>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        // The vertical padding keeps card shadows from being clipped by the
        // scroll container, which otherwise cuts them off with a hard edge.
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 py-6"
        style={{ scrollbarWidth: "none" }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} className={`snap-center shrink-0 ${slideClassName}`}>
                {child}
              </div>
            ))
          : children}
      </div>

      {count > 1 && (
        <div className="flex items-center justify-center gap-3 mt-2">
          {arrows && (
            <button
              type="button"
              aria-label={`Previous ${label}`}
              onClick={() => goTo(idx - 1)}
              disabled={idx === 0}
              className={arrowCls}
              style={{ color: "#7B1A30", borderColor: "#7B1A3040" }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to ${label} ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === idx ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"
                }`}
              />
            ))}
          </div>

          {arrows && (
            <button
              type="button"
              aria-label={`Next ${label}`}
              onClick={() => goTo(idx + 1)}
              disabled={idx === count - 1}
              className={arrowCls}
              style={{ color: "#7B1A30", borderColor: "#7B1A3040" }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

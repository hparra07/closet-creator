import { useLayoutEffect, useRef } from "react";
import { CABINET_FINISH_CATEGORIES, type CabinetFinish } from "@/lib/cabinetFinishes";
import { SectionWrapper } from "@/components/common/SectionWrapper";

function LongArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="26" height="10" viewBox="0 0 26 10" fill="none" className={direction === "left" ? "rotate-180" : ""}>
      <path d="M0 5H25M25 5L20 1M25 5L20 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FinishCard({ finish }: { finish: CabinetFinish }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
      <img
        src={finish.image}
        alt={`${finish.name} custom closet cabinet finish`}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 px-5 py-5">
        <p
          className="font-sans text-lg font-bold text-white leading-snug"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8), 0 1px 12px rgba(0,0,0,0.5)" }}
        >
          {finish.name}
        </p>
      </div>
    </div>
  );
}

function ArrowButtons({ onPrev, onNext, className = "" }: { onPrev: () => void; onNext: () => void; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 mt-6 ${className}`}>
      <button
        type="button"
        aria-label="Previous"
        onClick={onPrev}
        className="w-11 h-11 flex items-center justify-center rounded-full border border-foreground/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300 cursor-pointer"
        style={{ color: "#313131" }}
      >
        <LongArrow direction="left" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        className="w-11 h-11 flex items-center justify-center rounded-full border border-foreground/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300 cursor-pointer"
        style={{ color: "#313131" }}
      >
        <LongArrow direction="right" />
      </button>
    </div>
  );
}

// Static row for short categories (Matte, White, Gloss — 4 or fewer finishes):
// everything fits on a desktop row already, so it's just centered with no
// drag/loop and the arrows only appear where it still overflows (mobile/tablet).
function StaticFinishRow({ finishes }: { finishes: CabinetFinish[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = 24;
    const step = firstCard ? firstCard.getBoundingClientRect().width + gap : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory lg:justify-center"
        style={{ scrollbarWidth: "none" }}
      >
        {finishes.map((finish) => (
          <div key={finish.name} className="group snap-start shrink-0 w-[70%] sm:w-[38%] lg:w-[22%]">
            <FinishCard finish={finish} />
          </div>
        ))}
      </div>
      <ArrowButtons onPrev={() => scrollCarousel(-1)} onNext={() => scrollCarousel(1)} className="lg:hidden" />
    </div>
  );
}

// Endless, draggable carousel for longer categories (Wood, Linen): the list
// is tripled so there's always a full extra set buffered on each side, and
// the scroll position silently jumps back into the middle set whenever it
// nears an edge — the sets are identical so the jump is invisible, giving
// the illusion of an infinite loop. Grab-to-drag is added on top of native
// touch scrolling since overflow-x:auto alone only pans via touch/trackpad.
function InfiniteFinishCarousel({ finishes }: { finishes: CabinetFinish[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, startScroll: 0, dragging: false });
  const tripled = [...finishes, ...finishes, ...finishes];

  const recenter = (el: HTMLDivElement) => {
    const setWidth = el.scrollWidth / 3;
    if (el.scrollLeft < setWidth * 0.5) el.scrollLeft += setWidth;
    else if (el.scrollLeft > setWidth * 1.5) el.scrollLeft -= setWidth;
  };

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
    const onResize = () => { el.scrollLeft = el.scrollWidth / 3; };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [finishes]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft, dragging: true };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.dragging) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.dragging = false;
    const el = scrollerRef.current;
    if (el) recenter(el);
  };

  const scrollCarousel = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = 24;
    const step = firstCard ? firstCard.getBoundingClientRect().width + gap : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
    window.setTimeout(() => recenter(el), 500);
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onScroll={() => { const el = scrollerRef.current; if (el && !drag.current.dragging) recenter(el); }}
        className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none" }}
      >
        {tripled.map((finish, i) => (
          <div key={`${finish.name}-${i}`} className="group shrink-0 w-[70%] sm:w-[38%] lg:w-[22%]">
            <FinishCard finish={finish} />
          </div>
        ))}
      </div>
      <ArrowButtons onPrev={() => scrollCarousel(-1)} onNext={() => scrollCarousel(1)} />
    </div>
  );
}

export function PremiumCabinetFinishesSection() {
  return (
    <SectionWrapper>
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 reveal-up">
        <h2 className="rule eyebrow mb-6" style={{ color: "#313131" }}>Premium Cabinet Finishes</h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: "#313131" }}>
          Enhance your luxury walk-in wardrobe with our premium cabinet finishes, crafted from high-quality
          materials like textured wood, specialty linen, matte, and gloss finishes — a perfect balance of
          elegance and durability for your custom closet.
        </p>
      </div>

      <div className="space-y-16 md:space-y-20">
        {CABINET_FINISH_CATEGORIES.map((category) => (
          <div key={category.title} className="reveal-up">
            <h3 className="font-display text-xl md:text-2xl font-bold mb-2 text-center" style={{ color: "#313131" }}>
              {category.title}
            </h3>
            <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-7 text-center" style={{ color: "#5a5a5a" }}>
              {category.description}
            </p>
            {category.finishes.length <= 4 ? (
              <StaticFinishRow finishes={category.finishes} />
            ) : (
              <InfiniteFinishCarousel finishes={category.finishes} />
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

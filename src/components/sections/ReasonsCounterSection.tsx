import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { REASONS } from "@/lib/reasonsData";

// Vertical scroll distance allotted to each reason. The section is one tall
// spacer with a sticky stage inside; scrolling through the spacer counts the
// stage from 1 to 22.
const VH_PER_STEP = 50;

export function ReasonsCounterSection() {
  const outerRef = useRef<HTMLElement | null>(null);
  const numWrapRef = useRef<HTMLDivElement | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement | null>(null);
  const gsapRef = useRef<typeof import("gsap")["default"] | null>(null);
  const stepRef = useRef(0);
  const dirRef = useRef(1);

  const [step, setStep] = useState(0);
  const reason = REASONS[step];
  const total = REASONS.length;

  // Scroll position (in px) where a given step becomes active. The sticky
  // stage is pinned for exactly (outerHeight - viewportHeight) of scrolling.
  const scrollForStep = (i: number) => {
    const el = outerRef.current;
    if (!el) return 0;
    const range = el.offsetHeight - window.innerHeight;
    return el.offsetTop + (i / total) * range + range / (total * 2);
  };

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !outerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      gsapRef.current = gsap;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: outerRef.current!,
          start: "top top",
          end: "bottom bottom",
          // One trigger owns everything: the active step and the progress bar.
          // Splitting these across nested triggers has proven unreliable here.
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.max(0, Math.floor(self.progress * total)));
            if (barRef.current) {
              gsap.set(barRef.current, { scaleY: Math.max(self.progress, 0.001) });
            }
            if (idx !== stepRef.current) {
              dirRef.current = idx > stepRef.current ? 1 : -1;
              stepRef.current = idx;
              setStep(idx);
            }
          },
        });
      }, outerRef.current);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [total]);

  // Entrance for each step. React owns the digits and copy; GSAP only tweens
  // transform/opacity, so the two never fight over the same property.
  useEffect(() => {
    const gsap = gsapRef.current;
    if (!gsap) return;
    const dir = dirRef.current;
    const layers = textRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.killTweensOf([numWrapRef.current, ...layers]);
    gsap.fromTo(
      numWrapRef.current,
      { yPercent: 14 * dir, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out", overwrite: true }
    );
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === step) {
        gsap.fromTo(
          el,
          { y: 22 * dir, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.06, overwrite: true }
        );
      } else {
        gsap.set(el, { opacity: 0, y: 0 });
      }
    });
  }, [step]);

  return (
    <section ref={outerRef} className="relative" style={{ height: `${total * VH_PER_STEP}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* progress rail */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-3">
          <span className="font-sans text-[11px] font-bold tabular-nums" style={{ color: "#1B1B1B66" }}>
            01
          </span>
          <div className="relative w-px h-[40vh] bg-foreground/15">
            <div
              ref={barRef}
              className="absolute inset-x-0 top-0 h-full bg-primary origin-top"
              style={{ transform: "scaleY(0.001)" }}
            />
            {REASONS.map((r, i) => (
              <button
                key={r.n}
                type="button"
                aria-label={`Reason ${r.n}: ${r.title}`}
                onClick={() => window.scrollTo({ top: scrollForStep(i), behavior: "smooth" })}
                className="absolute -left-2 w-4 h-4 cursor-pointer group"
                style={{ top: `${(i / (total - 1)) * 100}%`, transform: "translateY(-50%)" }}
              >
                <span
                  className={`block mx-auto rounded-full transition-all duration-300 ${
                    i === step ? "w-2 h-2 bg-primary" : "w-1 h-1 bg-foreground/30 group-hover:bg-foreground/60"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="font-sans text-[11px] font-bold tabular-nums" style={{ color: "#1B1B1B66" }}>
            {total}
          </span>
        </div>

        <div className="w-full px-5 md:px-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-4 lg:gap-16 items-center">
            {/* The number, with the project photo showing through the glyph. */}
            <div ref={numWrapRef} className="relative flex justify-center lg:justify-end">
              <span
                key={reason.n}
                // Sized off the viewport height so the glyph dominates the
                // stage, capped by width so a two-digit number still fits its
                // grid column.
                className="font-display font-bold leading-[0.8] select-none tabular-nums text-[42vw] lg:text-[min(52vh,25vw)]"
                style={{
                  backgroundImage: `url(${reason.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  // Solid fallback: if the photo ever fails to load the glyph
                  // still reads, instead of clipping to nothing.
                  backgroundColor: "#1B1B1B",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {reason.n}
              </span>
            </div>

            {/* All 22 reasons are rendered and stacked in one grid cell, not
                just the active one — this page exists to rank for its copy, so
                every paragraph has to be in the served HTML. GSAP owns their
                opacity so React never fights it over the same property. */}
            <div className="grid max-w-xl lg:pr-12">
              {REASONS.map((r, i) => (
                <div
                  key={r.n}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  aria-hidden={i !== step}
                  className={`col-start-1 row-start-1 ${i === 0 ? "" : "opacity-0"} ${
                    i === step ? "" : "pointer-events-none"
                  }`}
                >
                  <p className="eyebrow mb-3 font-bold" style={{ color: "#7B1A30" }}>
                    {r.hook}
                  </p>
                  <h3
                    className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                    style={{ color: "#1B1B1B" }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: "#1B1B1B", opacity: 0.8 }}>
                    {r.body}
                  </p>
                  {r.href && (
                    <a
                      href={r.href}
                      tabIndex={i === step ? undefined : -1}
                      className="group inline-flex items-center gap-2 mt-6 font-sans text-sm font-semibold border-b pb-1 transition-colors"
                      style={{ color: "#1B1B1B", borderColor: "#1B1B1B40" }}
                    >
                      {r.linkLabel}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

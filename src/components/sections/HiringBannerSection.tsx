import { useEffect, useRef } from "react";

const TEXT = "South Florida's Most Awarded Custom Closet Company Is Hiring.";

export function HiringBannerSection() {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | null = null;
    let cancelled = false;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const splitModule = await import("gsap/SplitText");
      if (cancelled) return;
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      const { SplitText } = splitModule;
      gsap.registerPlugin(ScrollTrigger, SplitText);

      gsap.set(el, { opacity: 1 });

      ctx = gsap.context(() => {
        SplitText.create(el, {
          type: "words,lines",
          mask: "lines",
          linesClass: "hiring-line",
          autoSplit: true,
          onSplit: (instance) =>
            gsap.from(instance.lines, {
              yPercent: 120,
              stagger: 0.12,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            }),
        });
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div className="py-24 md:py-32 px-6 text-center bg-background">
      <h2
        ref={textRef}
        className="max-w-4xl mx-auto font-display font-bold leading-tight"
        style={{ color: "#313131", fontSize: "clamp(1.75rem, 5vw, 3.5rem)", opacity: 0 }}
      >
        {TEXT}
      </h2>
    </div>
  );
}

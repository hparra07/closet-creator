import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SERVICE_COUNTIES } from "@/lib/serviceCounties";

const ServiceAreasMap = lazy(() =>
  import("./ServiceAreasMap").then((m) => ({ default: m.ServiceAreasMap }))
);

function CountyList({ hovered, onHover }: { hovered: number | null; onHover: (i: number | null) => void }) {
  return (
    <ul className="flex flex-col gap-2.5 text-[14px]">
      {SERVICE_COUNTIES.map((area, i) => (
        <li key={area.id}>
          <a
            href={area.href}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            className={`cursor-pointer transition-opacity hover:underline ${
              hovered === null || hovered === i ? "opacity-100" : "opacity-50"
            } ${i === hovered ? "font-semibold" : ""}`}
          >
            {area.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ServiceAreasSection({ className }: { className?: string } = {}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper className={className}>
      <div className="text-center mb-14 md:mb-20">
        <h2 className="rule eyebrow" style={{ color: "#313131" }}>Service Areas</h2>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
        {/* Left column: text + county list (server-rendered, links crawlable) */}
        <div className="lg:max-w-xs lg:shrink-0 mb-12 lg:mb-0">
          <p className="font-sans text-[15px] lg:text-[20px] leading-relaxed reveal-up max-w-xs mx-auto lg:mx-0" style={{ color: "#313131" }}>
            <span className="underline-animate">
              We proudly serve the entire South Florida region
            </span>
            , bringing custom storage craftsmanship to homes across every county we touch.
          </p>

          <div className="hidden lg:block mt-8">
            <div className="bg-primary text-primary-foreground p-6 w-full">
              <p className="eyebrow mb-4" style={{ color: "#313131" }}>Counties we serve</p>
              <CountyList hovered={hovered} onHover={setHovered} />
            </div>
          </div>
        </div>

        {/* Right column: interactive map (lazy) + mobile county list */}
        <div className="flex-1 min-w-0 flex flex-col gap-8 items-center lg:-mt-10">
          <div ref={anchorRef} className="w-full">
            {inView && (
              <Suspense fallback={<div className="min-h-[420px]" />}>
                <ServiceAreasMap hovered={hovered} onHover={setHovered} />
              </Suspense>
            )}
          </div>

          {/* County list — mobile/tablet only */}
          <div className="lg:hidden bg-primary text-primary-foreground p-6 w-full max-w-xs">
            <p className="eyebrow mb-4" style={{ color: "#313131" }}>Counties we serve</p>
            <CountyList hovered={hovered} onHover={setHovered} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

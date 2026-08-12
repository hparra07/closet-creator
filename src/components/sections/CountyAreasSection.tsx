import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { CountyPinMap, type CountyBBox, type CountyBounds, type CountyPin } from "@/components/sections/CountyPinMap";

function AnimatedCount({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(el);
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}+</span>;
}

export function CountyAreasSection({
  title,
  intro,
  areaGroups,
  mapQuery,
  map,
}: {
  title: string;
  intro: string;
  areaGroups: string[][];
  mapQuery: string;
  // When provided, zooms our own Florida SVG into the county's shape and
  // drops pins for these areas instead of the plain Google Maps embed.
  map?: { countyId: string; bbox: CountyBBox; bounds: CountyBounds; pins: CountyPin[] };
}) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  // Flattened so the list balances into even columns (via CSS multi-column,
  // which distributes item count per column automatically) instead of each
  // original group forcing its own ragged column.
  const areas = areaGroups.flat();

  return (
    <SectionWrapper>
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 reveal-up">
        <h2 className="rule eyebrow mb-6" style={{ color: "#313131" }}>{title}</h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: "#313131" }}>{intro}</p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-stretch reveal-up">
        <div className="h-full min-h-[420px]">
          {map ? (
            <CountyPinMap countyId={map.countyId} bbox={map.bbox} countyBounds={map.bounds} pins={map.pins} />
          ) : (
            <div className="h-full rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={mapSrc}
                title={`${title} map`}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>

        <div className="h-full bg-ink rounded-2xl shadow-2xl p-8 md:p-11 flex flex-col">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-display text-4xl md:text-5xl font-bold text-primary tabular-nums">
              <AnimatedCount target={areas.length} />
            </span>
            <span className="text-white text-base md:text-lg font-semibold uppercase tracking-wide">
              Communities Served
            </span>
          </div>
          <p className="text-white/50 text-xs italic tracking-wide mb-6">
            Every neighborhood we serve, at a glance
          </p>
          <ul className="columns-2 sm:columns-3 gap-x-6">
            {areas.map((area) => (
              <li key={area} className="group flex items-center gap-1.5 text-sm leading-relaxed mb-2.5 break-inside-avoid">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
                <span className="text-white/85 transition-colors duration-200 group-hover:text-primary">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}

import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import floridaSvgRawOriginal from "@/assets/global/florida-counties-names.svg?raw";

const SERVICE_IDS = ["Indian_River", "St._Lucie", "Martin", "Okeechobee", "Palm_Beach_County", "Lee", "Broward", "Collier", "Miami-Dade"];

const FLORIDA_STYLES = `<style>
  svg path[id] { fill: #FFFFFF !important; stroke: #B5B5B5 !important; stroke-width: 0.5 !important; stroke-linejoin: round !important; transition: fill 0.3s ease-out, stroke 0.3s ease-out, stroke-width 0.3s ease-out, opacity 0.3s ease-out !important; }
  svg path.service { fill: #F6C33A !important; stroke: #FFFFFF !important; stroke-width: 0.6 !important; }
</style>`;

let processed = floridaSvgRawOriginal.replace(/(<svg[^>]*>)/, `$1${FLORIDA_STYLES}`);
SERVICE_IDS.forEach((id) => {
  const re = new RegExp(`(<path\\b[^>]*\\bid="${id.replace(/[.\\]/g, (m) => "\\" + m)}")`, "g");
  processed = processed.replace(re, `$1 class="service"`);
});
const floridaSvgRaw = processed;

const SERVICE_COUNTIES: { id: string; name: string }[] = [
  { id: "Indian_River",      name: "Indian River County" },
  { id: "St._Lucie",         name: "St. Lucie County" },
  { id: "Martin",            name: "Martin County" },
  { id: "Okeechobee",        name: "Okeechobee County" },
  { id: "Palm_Beach_County", name: "Palm Beach County" },
  { id: "Lee",               name: "Lee County" },
  { id: "Broward",           name: "Broward County" },
  { id: "Collier",           name: "Collier County" },
  { id: "Miami-Dade",        name: "Miami-Dade County" },
];

function ServiceAreasMap() {
  const [hovered, setHovered] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const transformRef = useRef<HTMLDivElement | null>(null);
  const [badges, setBadges] = useState<{ cx: number; cy: number }[]>([]);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const dragState = useRef<{ x: number; y: number; startPanX: number; startPanY: number } | null>(null);
  const pinchState = useRef<{ startDist: number; startZoom: number } | null>(null);

  const VB_W = 990;
  const VB_H = 765;
  const MOBILE_VB = "520 300 470 465";
  const MOBILE_ASPECT = "470 / 465";
  const mapAspect = `${VB_W} / ${VB_H}`;

  const applyTransform = () => {
    if (!transformRef.current) return;
    const z = zoomRef.current;
    const p = panRef.current;
    transformRef.current.style.transform = `translate(${p.x}px, ${p.y}px) scale(${z})`;
  };

  useEffect(() => {
    const root = mapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;

    svg.setAttribute("width", "990");
    svg.setAttribute("height", "765");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.removeAttribute("style");
    svg.style.display = "block";

    SERVICE_COUNTIES.forEach((c) => {
      const node = svg.querySelector(`[id="${c.id}"]`) as SVGGraphicsElement | null;
      if (node) node.classList.add("service");
    });

    requestAnimationFrame(() => {
      const computed: { cx: number; cy: number }[] = [];
      SERVICE_COUNTIES.forEach((c) => {
        const node = svg.querySelector(`[id="${c.id}"]`) as SVGGraphicsElement | null;
        if (!node) { computed.push({ cx: 0, cy: 0 }); return; }
        try {
          const bbox = node.getBBox();
          computed.push({ cx: bbox.x + bbox.width / 2, cy: bbox.y + bbox.height / 2 });
        } catch { computed.push({ cx: 0, cy: 0 }); }
      });
      setBadges(computed);
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
      {/* Left column: text + county list */}
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
            <ul className="flex flex-col gap-2.5 text-[14px]">
              {SERVICE_COUNTIES.map((area, i) => (
                <li
                  key={area.id}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`cursor-default transition-opacity ${
                    hovered === null || hovered === i ? "opacity-100" : "opacity-50"
                  } ${i === hovered ? "font-semibold" : ""}`}
                >
                  {area.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right column: map */}
      <div className="flex-1 min-w-0 flex flex-col gap-8 items-center lg:-mt-10">
        <div className="relative w-full flex-1 min-w-0 mx-auto lg:mx-0">
          {hovered !== null && (
            <style>{`
              svg path[id="${SERVICE_COUNTIES[hovered].id}"] {
                stroke: #313131 !important;
                stroke-width: 1.8 !important;
              }
              svg path.service:not([id="${SERVICE_COUNTIES[hovered].id}"]) {
                opacity: 0.4 !important;
              }
            `}</style>
          )}
          {/* MOBILE + TABLET MAP */}
          <div className="lg:hidden">
            <div className="lg:hidden absolute top-2 right-2 z-30 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => { zoomRef.current = Math.min(zoomRef.current * 1.3, 4); applyTransform(); }}
                className="w-9 h-9 bg-ink text-ink-foreground text-lg font-semibold shadow-lg cursor-pointer flex items-center justify-center"
                aria-label="Zoom in"
              >+</button>
              <button
                type="button"
                onClick={() => { zoomRef.current = Math.max(zoomRef.current / 1.3, 1); applyTransform(); }}
                className="w-9 h-9 bg-ink text-ink-foreground text-lg font-semibold shadow-lg cursor-pointer flex items-center justify-center"
                aria-label="Zoom out"
              >−</button>
              <button
                type="button"
                onClick={() => { zoomRef.current = 1; panRef.current = { x: 0, y: 0 }; applyTransform(); }}
                className="w-9 h-9 bg-ink text-ink-foreground text-xs font-semibold shadow-lg cursor-pointer flex items-center justify-center"
                aria-label="Reset"
              >⤾</button>
            </div>
            <div
              className="relative w-full overflow-hidden touch-none"
              style={{ aspectRatio: MOBILE_ASPECT }}
              onTouchStart={(e) => {
                if (transformRef.current) transformRef.current.style.transition = "none";
                if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX;
                  const dy = e.touches[0].clientY - e.touches[1].clientY;
                  pinchState.current = { startDist: Math.hypot(dx, dy), startZoom: zoomRef.current };
                } else if (e.touches.length === 1) {
                  dragState.current = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    startPanX: panRef.current.x,
                    startPanY: panRef.current.y,
                  };
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && pinchState.current) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX;
                  const dy = e.touches[0].clientY - e.touches[1].clientY;
                  const dist = Math.hypot(dx, dy);
                  const ratio = dist / pinchState.current.startDist;
                  zoomRef.current = Math.max(1, Math.min(4, pinchState.current.startZoom * ratio));
                  applyTransform();
                } else if (e.touches.length === 1 && dragState.current) {
                  const t = e.touches[0];
                  panRef.current = {
                    x: dragState.current.startPanX + (t.clientX - dragState.current.x),
                    y: dragState.current.startPanY + (t.clientY - dragState.current.y),
                  };
                  applyTransform();
                }
              }}
              onTouchEnd={() => {
                dragState.current = null;
                pinchState.current = null;
                if (transformRef.current) transformRef.current.style.transition = "transform 0.2s ease-out";
              }}
            >
              <div ref={transformRef} className="relative w-full h-full will-change-transform" style={{ transformOrigin: "center center" }}>
                <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: floridaSvgRaw.replace(/viewBox="[^"]*"/, `viewBox="${MOBILE_VB}"`) }} />
                {badges.length > 0 && (
                  <svg viewBox={MOBILE_VB} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ pointerEvents: "none" }}>
                    <g transform="translate(0,473.10044)">
                      {badges.map((b, i) => (
                        <g
                          key={SERVICE_COUNTIES[i].id}
                          transform={`translate(${b.cx - 10}, ${b.cy - 28})`}
                          style={{ pointerEvents: "auto", cursor: "pointer" }}
                          onMouseEnter={() => setHovered(i)}
                          onMouseLeave={() => setHovered(null)}
                        >
                          <path
                            d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 18 10 18s10-10.5 10-18C20 4.5 15.5 0 10 0z"
                            fill={i === hovered ? "#b91c1c" : "#DC2626"}
                            stroke="#7f1d1d"
                            strokeWidth={0.8}
                            style={{ transition: "fill 0.2s", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}
                          />
                          <circle cx={10} cy={10} r={3.5} fill="#fff" />
                        </g>
                      ))}
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Hidden computation div for getBBox */}
          <div ref={mapRef} className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none" style={{ left: -9999 }} dangerouslySetInnerHTML={{ __html: floridaSvgRaw }} />

          {/* DESKTOP MAP */}
          <div className="hidden lg:block">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: mapAspect }}>
              <div className="absolute inset-0 w-full h-full" dangerouslySetInnerHTML={{ __html: floridaSvgRaw }} />
              {badges.length > 0 && (
                <svg
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ pointerEvents: "none" }}
                >
                  <g transform="translate(0,473.10044)">
                    {badges.map((b, i) => (
                      <g
                        key={SERVICE_COUNTIES[i].id}
                        transform={`translate(${b.cx - 10}, ${b.cy - 28})`}
                        style={{ pointerEvents: "auto", cursor: "pointer" }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <path
                          d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 18 10 18s10-10.5 10-18C20 4.5 15.5 0 10 0z"
                          fill={i === hovered ? "#b91c1c" : "#DC2626"}
                          stroke="#7f1d1d"
                          strokeWidth={0.8}
                          style={{ transition: "fill 0.2s", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}
                        />
                        <circle cx={10} cy={10} r={3.5} fill="#fff" />
                      </g>
                    ))}
                  </g>
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* County list — mobile/tablet only */}
        <div className="lg:hidden bg-primary text-primary-foreground p-6 w-full max-w-xs">
          <p className="eyebrow mb-4" style={{ color: "#313131" }}>Counties we serve</p>
          <ul className="flex flex-col gap-2.5 text-[14px]">
            {SERVICE_COUNTIES.map((area, i) => (
              <li
                key={area.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`cursor-default transition-opacity ${
                  hovered === null || hovered === i ? "opacity-100" : "opacity-50"
                } ${i === hovered ? "font-semibold" : ""}`}
              >
                {area.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ServiceAreasSection({ className }: { className?: string } = {}) {
  return (
    <SectionWrapper className={className}>
      <div className="text-center mb-14 md:mb-20">
        <span className="rule eyebrow" style={{ color: "#313131" }}>Service Areas</span>
      </div>
      <ServiceAreasMap />
    </SectionWrapper>
  );
}

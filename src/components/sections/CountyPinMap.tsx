import floridaSvgRawOriginal from "@/assets/global/florida-counties-names.svg?raw";

export type CountyPin = { name: string; lat: number; lon: number };
export type CountyBounds = { north: number; south: number; east: number; west: number };
// Rendered position of a county's shape, in the root SVG's own coordinate
// space (i.e. already accounting for the `translate(0,473.10044)` the
// source file wraps every county path in — county.getBBox() alone returns
// PRE-transform local coordinates, which is why an earlier version of this
// component rendered blank: it cropped the viewBox to a region nothing is
// actually drawn in). Compute this once per county (see comment below) and
// hardcode it here, the same way the sitewide mobile map hardcodes its
// crop instead of measuring it at runtime.
export type CountyBBox = { x: number; y: number; width: number; height: number };

const FLORIDA_STYLES = `<style>
  svg path[id] { fill: #FFFFFF !important; stroke: #B5B5B5 !important; stroke-width: 0.5 !important; }
  svg path.service { fill: #F6C33A !important; stroke: #FFFFFF !important; stroke-width: 0.8 !important; }
</style>`;
const floridaSvgRaw = floridaSvgRawOriginal.replace(/(<svg[^>]*>)/, `$1${FLORIDA_STYLES}`);

function svgRef(el: HTMLDivElement | null, countyId: string) {
  if (!el) return;
  const svg = el.querySelector("svg");
  const node = svg?.querySelector<SVGGraphicsElement>(`[id="${countyId}"]`);
  node?.classList.add("service");
}

// Zooms the sitewide Florida county SVG into a single county's shape and
// drops pins for named areas inside it. Pin positions are approximated from
// each area's real lat/lon mapped onto the county's bounding box — not
// pixel-exact GPS, but geographically proportioned, since the source map
// has no per-city paths to hook into.
export function CountyPinMap({
  countyId,
  bbox,
  countyBounds,
  pins,
}: {
  countyId: string;
  bbox: CountyBBox;
  countyBounds: CountyBounds;
  pins: CountyPin[];
}) {
  const pad = Math.max(bbox.width, bbox.height) * 0.4;
  const viewBox = `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}`;

  const pinPositions = pins.map((p) => {
    const pctX = (p.lon - countyBounds.west) / (countyBounds.east - countyBounds.west);
    const pctY = (countyBounds.north - p.lat) / (countyBounds.north - countyBounds.south);
    return { name: p.name, cx: bbox.x + pctX * bbox.width, cy: bbox.y + pctY * bbox.height };
  });

  // The marker/label were sized for the full ~990-unit-wide Florida map; a
  // zoomed single-county viewBox is much narrower, so scale the marker down
  // proportionally to keep its on-screen size roughly constant. The
  // container below is a fixed 4:3 box — when a county's crop is TALLER
  // than 4:3 (e.g. Miami-Dade, Okeechobee), "meet" letterboxes it and the
  // real pixel scale is governed by height, not width, so using vbWidth
  // alone under-corrects and pins render too small. This picks whichever
  // dimension actually constrains under that fixed aspect ratio.
  const vbWidth = bbox.width + pad * 2;
  const vbHeight = bbox.height + pad * 2;
  const CONTAINER_ASPECT = 4 / 3;
  const effectiveWidth = vbWidth / vbHeight > CONTAINER_ASPECT ? vbWidth : vbHeight * CONTAINER_ASPECT;
  const markerScale = (effectiveWidth / 900) * 1.5;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-[#eaf2f6]">
      <div
        ref={(el) => svgRef(el, countyId)}
        className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
        dangerouslySetInnerHTML={{ __html: floridaSvgRaw.replace(/viewBox="[^"]*"/, `viewBox="${viewBox}"`) }}
      />

      <svg
        viewBox={viewBox}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: "none" }}
      >
        {pinPositions.map((p) => (
          <g key={p.name} transform={`translate(${p.cx}, ${p.cy}) scale(${markerScale})`}>
            <g transform="translate(-10,-28)">
              <path
                d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 18 10 18s10-10.5 10-18C20 4.5 15.5 0 10 0z"
                fill="#DC2626"
                stroke="#7f1d1d"
                strokeWidth={0.9}
                style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}
              />
              <circle cx={10} cy={10} r={3.5} fill="#fff" />
            </g>
            <text
              x={0}
              y={-32}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="#313131"
              stroke="#fff"
              strokeWidth={4}
              paintOrder="stroke"
            >
              {p.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

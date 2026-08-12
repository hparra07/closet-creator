import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  // Applied only to the "before" layer — lets a placeholder before/after
  // reuse the same real photo on both sides while still reading as distinct
  // ("unorganized" look) until a real before photo replaces it.
  beforeFilter,
}: {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeFilter?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl select-none cursor-ew-resize touch-none"
    >
      <img
        src={afterImage}
        alt={afterLabel}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={beforeFilter ? { filter: beforeFilter } : undefined}
        />
      </div>

      <span className="absolute top-4 left-4 z-10 text-[11px] font-bold uppercase tracking-widest text-white bg-black/55 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 z-10 text-[11px] font-bold uppercase tracking-widest text-white bg-black/55 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none">
        {afterLabel}
      </span>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/90 pointer-events-none"
        style={{ left: `${percent}%` }}
      />
      <div
        className="absolute top-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-none"
        style={{ left: `${percent}%`, transform: "translate(-50%, -50%)" }}
      >
        <ChevronLeft className="w-4 h-4 -mr-1" style={{ color: "#313131" }} />
        <ChevronRight className="w-4 h-4 -ml-1" style={{ color: "#313131" }} />
      </div>
    </div>
  );
}

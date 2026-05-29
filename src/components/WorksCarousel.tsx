import { useRef, useState, type MouseEvent } from "react";

export function WorksCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [hoverSide, setHoverSide] = useState<"prev" | "next" | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const wrap = (i: number) => (i + images.length) % images.length;
  const go = (d: "next" | "prev") =>
    setActive((a) => wrap(a + (d === "next" ? 1 : -1)));

  // Layout constants (desktop)
  const ACTIVE_W = 560;
  const NEAR_W = 200;
  const FAR_W = 130;
  const GAP = 18;
  const HEIGHT = 520;

  // x-position (center) of each slot relative to track center
  const slotX = (off: number) => {
    if (off === 0) return 0;
    const sign = off > 0 ? 1 : -1;
    const a = Math.abs(off);
    // distance from center to the center of the |off|=1 image
    const d1 = ACTIVE_W / 2 + GAP + NEAR_W / 2;
    if (a === 1) return sign * d1;
    // |off| = 2
    const d2 = d1 + NEAR_W / 2 + GAP + FAR_W / 2;
    return sign * d2;
  };

  const slotW = (off: number) =>
    off === 0 ? ACTIVE_W : Math.abs(off) === 1 ? NEAR_W : FAR_W;
  const slotH = (off: number) =>
    off === 0 ? HEIGHT : Math.abs(off) === 1 ? HEIGHT * 0.78 : HEIGHT * 0.55;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const center = rect.width / 2;
    // Side zone: only outside the active image's half-width
    const sideThreshold = ACTIVE_W / 2 + 12;
    const offsetFromCenter = x - center;

    if (Math.abs(offsetFromCenter) < sideThreshold) {
      // Over center image — hide both buttons
      if (prevBtnRef.current) prevBtnRef.current.style.opacity = "0";
      if (nextBtnRef.current) nextBtnRef.current.style.opacity = "0";
      setHoverSide(null);
      return;
    }

    const isLeft = offsetFromCenter < 0;
    const target = isLeft ? prevBtnRef.current : nextBtnRef.current;
    const other = isLeft ? nextBtnRef.current : prevBtnRef.current;
    if (target) {
      target.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      target.style.opacity = "1";
    }
    if (other) other.style.opacity = "0";
    setHoverSide(isLeft ? "prev" : "next");
  };

  const handleLeave = () => {
    [prevBtnRef.current, nextBtnRef.current].forEach((b) => {
      if (b) b.style.opacity = "0";
    });
    setHoverSide(null);
  };

  const handleViewportClick = (e: MouseEvent<HTMLDivElement>) => {
    // Only react to side-zone clicks; center click is handled by the figure itself
    if (hoverSide === "prev") {
      e.stopPropagation();
      go("prev");
    } else if (hoverSide === "next") {
      e.stopPropagation();
      go("next");
    }
  };

  // Render 5 slots
  const offsets = [-2, -1, 0, 1, 2];

  return (
    <>
      <div
        ref={viewportRef}
        className="works-viewport"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onClick={handleViewportClick}
        style={{ height: HEIGHT }}
      >
        <div className="works-track">
          {offsets.map((off) => {
            const idx = wrap(active + off);
            const w = slotW(off);
            const h = slotH(off);
            const isActive = off === 0;
            const cls = isActive
              ? "is-active"
              : Math.abs(off) === 1
                ? "is-near"
                : "is-far";
            return (
              <figure
                key={off}
                className={`works-item ${cls}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isActive) {
                    setLightbox(idx);
                  } else if (off < 0) {
                    go("prev");
                  } else {
                    go("next");
                  }
                }}
                style={{
                  width: w,
                  height: h,
                  transform: `translate(-50%, -50%) translateX(${slotX(off)}px)`,
                }}
              >
                <img src={images[idx]} alt="" loading="lazy" draggable={false} />
              </figure>
            );
          })}
        </div>

        <button
          ref={prevBtnRef}
          type="button"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            go("prev");
          }}
          className="works-nav"
          style={{ opacity: 0 }}
        >
          Prev
        </button>
        <button
          ref={nextBtnRef}
          type="button"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            go("next");
          }}
          className="works-nav"
          style={{ opacity: 0 }}
        >
          Next
        </button>
      </div>

      {lightbox !== null && (
        <div
          className="works-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            className="works-lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Previous"
            className="works-lightbox-arrow works-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((l) => wrap((l ?? 0) - 1));
            }}
          >
            ‹
          </button>
          <img
            src={images[lightbox]}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Next"
            className="works-lightbox-arrow works-lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((l) => wrap((l ?? 0) + 1));
            }}
          >
            ›
          </button>
        </div>
      )}

      <style>{`
        .works-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .works-viewport { cursor: none; }
        }

        .works-track {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .works-item {
          position: absolute;
          left: 50%;
          top: 50%;
          margin: 0;
          overflow: hidden;
          cursor: pointer;
          will-change: transform, width, height, filter;
          transition:
            transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
            width 0.85s cubic-bezier(0.22, 1, 0.36, 1),
            height 0.85s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.7s ease,
            opacity 0.6s ease;
        }
        .works-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
          pointer-events: none;
        }

        .works-item.is-far {
          filter: grayscale(100%) brightness(0.85);
          opacity: 0.7;
          z-index: 1;
        }
        .works-item.is-near {
          filter: grayscale(100%) brightness(0.92);
          opacity: 0.95;
          z-index: 2;
        }
        .works-item.is-active {
          filter: grayscale(0%) brightness(1);
          opacity: 1;
          cursor: zoom-in;
          z-index: 3;
        }

        .works-nav {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 20;
          padding: 10px 22px;
          background: var(--color-primary);
          color: var(--color-primary-foreground);
          border: none;
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          pointer-events: none;
          transition: opacity 0.2s ease;
          will-change: transform, opacity;
        }

        @media (max-width: 767px) {
          .works-viewport { height: 380px !important; }
          .works-item.is-far { display: none; }
          .works-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%) !important;
            opacity: 1 !important;
            pointer-events: auto;
            padding: 8px 16px;
            font-size: 11px;
          }
          .works-nav:first-of-type { left: 8px; }
          .works-nav:last-of-type { left: auto; right: 8px; }
        }

        .works-lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          animation: works-fade 0.25s ease;
        }
        .works-lightbox img {
          max-width: 92vw;
          max-height: 88vh;
          object-fit: contain;
          display: block;
        }
        .works-lightbox-close {
          position: absolute;
          top: 24px;
          right: 32px;
          background: transparent;
          color: #fff;
          border: none;
          font-size: 40px;
          line-height: 1;
          cursor: pointer;
        }
        .works-lightbox-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          color: #fff;
          border: none;
          font-size: 56px;
          line-height: 1;
          cursor: pointer;
          padding: 16px 24px;
        }
        .works-lightbox-prev { left: 16px; }
        .works-lightbox-next { right: 16px; }
        @keyframes works-fade { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </>
  );
}

import { useRef, useState, type MouseEvent } from "react";

export function WorksCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const wrap = (i: number) => (i + images.length) % images.length;

  const go = (d: "next" | "prev") => {
    setActive((a) => wrap(a + (d === "next" ? 1 : -1)));
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const isLeft = x < rect.width / 2;
    const target = isLeft ? prevBtnRef.current : nextBtnRef.current;
    const other = isLeft ? nextBtnRef.current : prevBtnRef.current;
    if (target) {
      target.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      target.style.opacity = "1";
    }
    if (other) other.style.opacity = "0";
  };

  const handleLeave = () => {
    [prevBtnRef.current, nextBtnRef.current].forEach((b) => {
      if (b) b.style.opacity = "0";
    });
  };

  // Render 5 slots: -2, -1, 0 (center), +1, +2
  const offsets = [-2, -1, 0, 1, 2];

  return (
    <>
      <div
        ref={viewportRef}
        className="works-viewport"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
      >
        <div className="works-track">
          {offsets.map((off) => {
            const idx = wrap(active + off);
            const cls =
              off === 0
                ? "is-active"
                : Math.abs(off) === 1
                  ? "is-near"
                  : "is-far";
            const onClick = (e: MouseEvent) => {
              e.stopPropagation();
              if (off === 0) {
                setLightbox(idx);
              } else if (off < 0) {
                go("prev");
              } else {
                go("next");
              }
            };
            return (
              <figure
                key={`${idx}-${off}`}
                onClick={onClick}
                className={`works-item ${cls}`}
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
          onClick={(e) => { e.stopPropagation(); go("prev"); }}
          className="works-nav"
          style={{ opacity: 0 }}
        >
          Prev
        </button>
        <button
          ref={nextBtnRef}
          type="button"
          aria-label="Next"
          onClick={(e) => { e.stopPropagation(); go("next"); }}
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
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Previous"
            className="works-lightbox-arrow works-lightbox-prev"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => wrap((l ?? 0) - 1)); }}
          >
            ‹
          </button>
          <img src={images[lightbox]} alt="" onClick={(e) => e.stopPropagation()} />
          <button
            type="button"
            aria-label="Next"
            className="works-lightbox-arrow works-lightbox-next"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => wrap((l ?? 0) + 1)); }}
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
          display: flex;
          gap: 18px;
          align-items: center;
          justify-content: center;
          height: 520px;
        }
        .works-item {
          position: relative;
          overflow: hidden;
          margin: 0;
          cursor: pointer;
          will-change: flex-basis, height, filter;
          transition:
            flex-basis 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            height 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.6s ease,
            opacity 0.5s ease;
        }
        .works-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        .works-item.is-far {
          flex: 0 0 130px;
          height: 55%;
          filter: grayscale(100%) brightness(0.85);
          opacity: 0.75;
        }
        .works-item.is-near {
          flex: 0 0 200px;
          height: 78%;
          filter: grayscale(100%) brightness(0.92);
          opacity: 0.95;
        }
        .works-item.is-active {
          flex: 0 0 560px;
          height: 100%;
          filter: grayscale(0%) brightness(1);
          cursor: zoom-in;
          z-index: 2;
        }

        .works-nav {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          padding: 10px 22px;
          background: var(--color-primary);
          color: var(--color-primary-foreground);
          border: none;
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          pointer-events: auto;
          transition: opacity 0.2s ease, background 0.2s ease;
          will-change: transform;
        }
        .works-nav:hover { background: color-mix(in oklab, var(--color-primary) 85%, black); }

        @media (max-width: 1023px) {
          .works-item.is-far { flex: 0 0 80px; }
          .works-item.is-near { flex: 0 0 140px; }
          .works-item.is-active { flex: 0 0 44vw; }
        }
        @media (max-width: 767px) {
          .works-track { height: 380px; gap: 8px; }
          .works-item.is-far { display: none; }
          .works-item.is-near { flex: 0 0 18vw; height: 65%; }
          .works-item.is-active { flex: 0 0 64vw; }
          .works-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%) !important;
            opacity: 1 !important;
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

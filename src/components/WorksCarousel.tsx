import { useRef, useState, type MouseEvent } from "react";

export function WorksCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<"next" | "prev" | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const wrap = (i: number) => (i + images.length) % images.length;

  const go = (d: "next" | "prev") => {
    setDir(d);
    setAnimKey((k) => k + 1);
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

  const handleViewportClick = (e: MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const isLeft = e.clientX - rect.left < rect.width / 2;
    go(isLeft ? "prev" : "next");
  };

  const visible = [wrap(active - 1), active, wrap(active + 1)];

  return (
    <>
      <div
        ref={viewportRef}
        className="works-viewport"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onClick={handleViewportClick}
      >
        <div
          key={animKey}
          className={`works-track ${dir ? `slide-${dir}` : ""}`}
        >
          {visible.map((idx, pos) => {
            const isActive = pos === 1;
            return (
              <figure
                key={`${idx}-${pos}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isActive) setLightbox(idx);
                }}
                className={`works-item ${isActive ? "is-active" : ""}`}
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
          prev
        </button>
        <button
          ref={nextBtnRef}
          type="button"
          aria-label="Next"
          onClick={(e) => { e.stopPropagation(); go("next"); }}
          className="works-nav"
          style={{ opacity: 0 }}
        >
          next
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
          cursor: none;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .works-viewport { cursor: default; }
        }

        .works-track {
          display: flex;
          gap: 24px;
          align-items: center;
          justify-content: center;
          height: 480px;
        }
        .works-track.slide-next { animation: slide-from-right 0.55s cubic-bezier(0.22, 1, 0.36, 1); }
        .works-track.slide-prev { animation: slide-from-left 0.55s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes slide-from-right {
          from { transform: translateX(40px); opacity: 0.4; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-from-left {
          from { transform: translateX(-40px); opacity: 0.4; }
          to { transform: translateX(0); opacity: 1; }
        }

        .works-item {
          position: relative;
          flex: 0 0 220px;
          height: 80%;
          overflow: hidden;
          margin: 0;
          filter: grayscale(100%) brightness(0.92);
          transition: flex-basis 0.5s ease, height 0.5s ease, filter 0.5s ease;
        }
        .works-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
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
          text-transform: capitalize;
          cursor: pointer;
          pointer-events: auto;
          transition: opacity 0.2s ease, background 0.2s ease;
          will-change: transform;
        }
        .works-nav:hover { background: color-mix(in oklab, var(--color-primary) 85%, black); }

        @media (max-width: 767px) {
          .works-track { height: 360px; gap: 10px; }
          .works-item { flex: 0 0 22vw; height: 70%; }
          .works-item.is-active { flex: 0 0 70vw; height: 100%; }
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

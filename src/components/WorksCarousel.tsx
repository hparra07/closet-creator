import { useRef, useState, type MouseEvent } from "react";

export function WorksCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(Math.floor(images.length / 2));
  const [lightbox, setLightbox] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [showNav, setShowNav] = useState(false);

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

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
    if (other) {
      other.style.opacity = "0";
    }
  };

  const handleLeave = () => {
    setShowNav(false);
    [prevBtnRef.current, nextBtnRef.current].forEach((b) => {
      if (b) b.style.opacity = "0";
    });
  };

  const handleViewportClick = (e: MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const isLeft = e.clientX - rect.left < rect.width / 2;
    if (isLeft) prev();
    else next();
  };

  return (
    <>
      <div
        ref={viewportRef}
        className="works-viewport"
        onMouseEnter={() => setShowNav(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onClick={handleViewportClick}
      >
        <div className="works-track">
          {images.map((src, i) => {
            const isActive = i === active;
            return (
              <figure
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isActive) setLightbox(i);
                  else setActive(i);
                }}
                className={`works-item ${isActive ? "is-active" : ""}`}
              >
                <img src={src} alt="" loading="lazy" draggable={false} />
              </figure>
            );
          })}
        </div>

        <button
          ref={prevBtnRef}
          type="button"
          aria-label="Previous"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="works-nav"
          style={{ opacity: 0 }}
          tabIndex={showNav ? 0 : -1}
        >
          prev
        </button>
        <button
          ref={nextBtnRef}
          type="button"
          aria-label="Next"
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="works-nav"
          style={{ opacity: 0 }}
          tabIndex={showNav ? 0 : -1}
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
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => ((l ?? 0) - 1 + images.length) % images.length); }}
          >
            ‹
          </button>
          <img src={images[lightbox]} alt="" onClick={(e) => e.stopPropagation()} />
          <button
            type="button"
            aria-label="Next"
            className="works-lightbox-arrow works-lightbox-next"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => ((l ?? 0) + 1) % images.length); }}
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
          gap: 16px;
          align-items: stretch;
          justify-content: center;
          height: 480px;
        }
        .works-item {
          position: relative;
          flex: 0 0 200px;
          height: 100%;
          overflow: hidden;
          cursor: pointer;
          margin: 0;
          transition: flex-basis 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      filter 0.6s ease;
          filter: grayscale(100%) brightness(0.9);
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
          flex: 0 0 640px;
          filter: grayscale(0%) brightness(1);
          z-index: 2;
        }

        .works-nav {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          padding: 18px 28px;
          background: var(--color-primary);
          color: var(--color-primary-foreground);
          border: none;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          pointer-events: auto;
          transition: opacity 0.25s ease, background 0.2s ease;
          will-change: transform;
        }
        .works-nav:hover { background: color-mix(in oklab, var(--color-primary) 85%, black); }

        @media (max-width: 767px) {
          .works-track { height: 360px; gap: 8px; }
          .works-item { flex: 0 0 34vw; }
          .works-item.is-active { flex: 0 0 78vw; }
          .works-nav {
            position: static;
            transform: none !important;
            opacity: 1 !important;
            padding: 12px 20px;
            font-size: 12px;
          }
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

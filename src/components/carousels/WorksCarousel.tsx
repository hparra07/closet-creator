import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export type WorksItem = { src: string; label?: string; href?: string };

export function WorksCarousel({ items }: { items: WorksItem[] }) {
  const images = items.map((i) => i.src);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lightboxCloseTimeoutRef = useRef<number | undefined>(undefined);

  // Plays the fade-in in reverse before actually unmounting the lightbox.
  const closeLightbox = () => {
    if (lightbox === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLightbox(null);
      return;
    }
    setLightboxClosing(true);
    window.clearTimeout(lightboxCloseTimeoutRef.current);
    lightboxCloseTimeoutRef.current = window.setTimeout(() => {
      setLightbox(null);
      setLightboxClosing(false);
    }, 250);
  };

  useEffect(() => () => window.clearTimeout(lightboxCloseTimeoutRef.current), []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const viewportRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const animatingRef = useRef(false);
  const hoverSideRef = useRef<"prev" | "next" | null>(null);

  const wrap = (i: number) => (i + images.length) % images.length;

  const go = (d: "next" | "prev") => {
    if (animatingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const cards = gsap.utils.toArray<HTMLElement>(".works-item", track);
    flipStateRef.current = Flip.getState(cards, { props: "filter,opacity" });
    animatingRef.current = true;
    setActive((a) => wrap(a + (d === "next" ? 1 : -1)));
  };

  useLayoutEffect(() => {
    const track = trackRef.current;
    const state = flipStateRef.current;
    if (!track || !state) return;
    const cards = gsap.utils.toArray<HTMLElement>(".works-item", track);
    Flip.from(state, {
      targets: cards,
      duration: 0.85,
      ease: "power3.inOut",
      absolute: false,
      onComplete: () => {
        animatingRef.current = false;
      },
    });
    flipStateRef.current = null;
  }, [active]);

  // Layout constants
  const ACTIVE_W = isMobile ? 280 : 560;
  const NEAR_W = isMobile ? 100 : 200;
  const FAR_W = isMobile ? 65 : 130;
  const GAP = isMobile ? 10 : 18;
  const HEIGHT = isMobile ? 340 : 520;

  const slotX = (off: number) => {
    if (off === 0) return 0;
    const sign = off > 0 ? 1 : -1;
    const a = Math.abs(off);
    const d1 = ACTIVE_W / 2 + GAP + NEAR_W / 2;
    if (a === 1) return sign * d1;
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
    const sideThreshold = ACTIVE_W / 2 + 12;
    const offsetFromCenter = x - center;

    if (Math.abs(offsetFromCenter) < sideThreshold) {
      if (prevBtnRef.current) prevBtnRef.current.style.opacity = "0";
      if (nextBtnRef.current) nextBtnRef.current.style.opacity = "0";
      hoverSideRef.current = null;
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
    hoverSideRef.current = isLeft ? "prev" : "next";
  };

  const handleLeave = () => {
    [prevBtnRef.current, nextBtnRef.current].forEach((b) => {
      if (b) b.style.opacity = "0";
    });
    hoverSideRef.current = null;
  };

  const handleViewportClick = (e: MouseEvent<HTMLDivElement>) => {
    if (hoverSideRef.current === "prev") {
      e.stopPropagation();
      go("prev");
    } else if (hoverSideRef.current === "next") {
      e.stopPropagation();
      go("next");
    }
  };

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
        <div ref={trackRef} className="works-track">
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
                key={idx}
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
                {isActive && (items[idx].label || items[idx].href) && (
                  <figcaption className="works-caption">
                    {items[idx].label && <span className="works-caption-label">{items[idx].label}</span>}
                    {items[idx].href && (
                      <a
                        href={items[idx].href}
                        onClick={(e) => e.stopPropagation()}
                        className="works-caption-discover"
                      >
                        Discover
                        <ArrowRight className="w-3.5 h-3.5 works-caption-arrow" />
                      </a>
                    )}
                  </figcaption>
                )}
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
          className={`works-lightbox ${lightboxClosing ? "works-lightbox-closing" : ""}`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            className="works-lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
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
          <div className="works-lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={images[lightbox]} alt="" />
            {items[lightbox].label && (
              <p className="works-lightbox-caption">{items[lightbox].label}</p>
            )}
          </div>
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

        .works-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0;
          padding: 28px 20px 18px;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: #fff;
          font-family: var(--font-sans);
          pointer-events: none;
        }
        .works-caption-label {
          display: block;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          margin-bottom: 8px;
        }
        .works-caption-discover {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--color-primary);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          pointer-events: auto;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .works-caption-discover:hover {
          color: #fff;
          text-decoration: underline;
        }
        .works-caption-arrow {
          transition: transform 0.3s ease;
        }
        .works-caption-discover:hover .works-caption-arrow {
          transform: translateX(3px);
        }
        @media (min-width: 768px) {
          .works-caption { padding: 40px 24px 22px; }
          .works-caption-label { font-size: 18px; margin-bottom: 10px; }
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
        .works-lightbox-closing {
          animation: works-fade-out 0.25s ease forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .works-lightbox, .works-lightbox-closing { animation: none; }
        }
        .works-lightbox-figure {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 92vw;
          max-height: 88vh;
        }
        .works-lightbox img {
          max-width: 92vw;
          max-height: 80vh;
          object-fit: contain;
          display: block;
        }
        .works-lightbox-caption {
          margin: 14px 0 0;
          color: #fff;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 600;
          text-align: center;
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
        @keyframes works-fade-out { from { opacity: 1 } to { opacity: 0 } }
      `}</style>
    </>
  );
}

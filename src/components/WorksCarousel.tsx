import { useState } from "react";

export function WorksCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(Math.floor(images.length / 2));

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  return (
    <div className="works-viewport group relative -mx-6 md:-mx-16 px-6 md:px-16">
      <div className="works-track">
        {images.map((src, i) => {
          const isActive = i === active;
          return (
            <figure
              key={i}
              onClick={() => setActive(i)}
              className={`works-item ${isActive ? "is-active" : ""}`}
            >
              <img src={src} alt="" loading="lazy" />
              {isActive && (
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] px-3 py-1 z-10">
                  Featured
                </span>
              )}
            </figure>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={prev}
        className="works-nav works-nav-prev"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={next}
        className="works-nav works-nav-next"
      >
        →
      </button>

      <style>{`
        .works-track {
          display: flex;
          gap: 16px;
          align-items: stretch;
          justify-content: center;
        }
        .works-item {
          position: relative;
          flex: 0 0 220px;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          cursor: pointer;
          transition: flex-basis 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      filter 0.6s ease,
                      transform 0.6s ease;
          filter: grayscale(100%) brightness(0.9);
          margin: 0;
        }
        .works-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .works-item.is-active {
          flex: 0 0 520px;
          aspect-ratio: 4 / 3;
          filter: grayscale(0%) brightness(1);
          z-index: 2;
        }

        .works-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-primary);
          color: var(--color-primary-foreground);
          border: none;
          font-size: 22px;
          font-weight: 600;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s ease, background 0.2s ease;
        }
        .works-nav-prev { left: 24px; }
        .works-nav-next { right: 24px; }
        .works-nav:hover { background: color-mix(in oklab, var(--color-primary) 85%, black); }
        .group:hover .works-nav,
        .works-nav:focus-visible { opacity: 1; }

        @media (max-width: 767px) {
          .works-item { flex: 0 0 38vw; }
          .works-item.is-active { flex: 0 0 70vw; }
          .works-nav { opacity: 1; width: 40px; height: 40px; font-size: 18px; }
          .works-nav-prev { left: 8px; }
          .works-nav-next { right: 8px; }
        }
      `}</style>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(Flip);

type Slide = { src: string; label?: string };

function useVisibleCount() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 768) setCount(2);
      else setCount(3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return count;
}

export function CaterpillarCarousel({ slides, arrowsOverlay = false }: { slides: Slide[]; arrowsOverlay?: boolean }) {
  const visible = useVisibleCount();
  return <CarouselInner key={visible} slides={slides} visible={visible} arrowsOverlay={arrowsOverlay} />;
}

function CarouselInner({ slides, visible, arrowsOverlay }: { slides: Slide[]; visible: number; arrowsOverlay: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const nextIndex = useRef(visible % slides.length);
  const prevIndex = useRef((slides.length - 1) % slides.length);

  const preloadedRef = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    preloadedRef.current = slides.map((s) => {
      const img = new Image();
      img.src = s.src;
      if (typeof img.decode === "function") {
        img.decode().catch(() => {});
      }
      return img;
    });
  }, [slides]);

  const buildCard = (slide: Slide) => {
    const card = document.createElement("div");
    card.className = "cat-card";
    const img = document.createElement("img");
    img.src = slide.src;
    img.alt = slide.label ?? "";
    card.appendChild(img);
    if (slide.label) {
      const label = document.createElement("span");
      label.className = "cat-label";
      label.textContent = slide.label;
      card.appendChild(label);
    }
    return card;
  };

  const updateCaterpillar = (forward: boolean) => {
    const container = containerRef.current;
    if (!container || isAnimating.current || slides.length === 0) return;
    isAnimating.current = true;

    const cards = gsap.utils.toArray<HTMLElement>(".cat-card", container);
    if (cards.length === 0) {
      isAnimating.current = false;
      return;
    }
    const first = cards[0];
    const last = cards[cards.length - 1];

    const state = Flip.getState(cards);

    const slide = forward
      ? slides[nextIndex.current]
      : slides[prevIndex.current];
    const newCard = buildCard(slide);
    gsap.set(newCard, { scale: 0, opacity: 0 });

    if (forward) {
      container.append(newCard);
      first.classList.add("hide");
      prevIndex.current = nextIndex.current - visible;
      if (prevIndex.current < 0) prevIndex.current += slides.length;
      nextIndex.current = (nextIndex.current + 1) % slides.length;
    } else {
      container.prepend(newCard);
      last.classList.add("hide");
      nextIndex.current = prevIndex.current + visible;
      if (nextIndex.current >= slides.length) nextIndex.current -= slides.length;
      prevIndex.current = (prevIndex.current - 1 + slides.length) % slides.length;
    }

    Flip.from(state, {
      targets: gsap.utils.toArray(".cat-card", container),
      fade: true,
      absoluteOnLeave: true,
      onEnter: (els) => {
        gsap.to(els, {
          opacity: 1,
          scale: 1,
          transformOrigin: forward ? "bottom right" : "bottom left",
        });
      },
      onLeave: (els) => {
        gsap.to(els, {
          opacity: 0,
          scale: 0,
          transformOrigin: forward ? "bottom left" : "bottom right",
          onComplete: () => {
            els[0].remove();
            isAnimating.current = false;
          },
        });
      },
    });
  };

  const cardWidth = visible === 2 ? "calc((100% - 5px) / 2)" : "calc((100% - 10px) / 3)";

  return (
    <div className={`caterpillar-wrapper ${arrowsOverlay ? "caterpillar-wrapper--overlay" : ""}`}>
      <div className="caterpillar-stage">
        <div ref={containerRef} className="caterpillar-container">
          {slides.slice(0, visible).map((s, i) => (
            <div key={`${s.src}-${i}`} className="cat-card">
              <img src={s.src} alt={s.label ?? ""} />
              {s.label ? <span className="cat-label">{s.label}</span> : null}
            </div>
          ))}
        </div>

        {arrowsOverlay && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => updateCaterpillar(false)}
              className="caterpillar-arrow caterpillar-arrow--left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => updateCaterpillar(true)}
              className="caterpillar-arrow caterpillar-arrow--right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {!arrowsOverlay && (
        <div className="caterpillar-buttons">
          <button
            type="button"
            id="prev"
            onClick={() => updateCaterpillar(false)}
            className="bg-primary text-primary-foreground px-7 py-2.5 text-sm font-semibold font-sans hover:opacity-90 transition"
          >
            Previous
          </button>
          <button
            type="button"
            id="next"
            onClick={() => updateCaterpillar(true)}
            className="bg-primary text-primary-foreground px-7 py-2.5 text-sm font-semibold font-sans hover:opacity-90 transition"
          >
            Next
          </button>
        </div>
      )}
      <style>{`
        .caterpillar-stage {
          position: relative;
          width: 100%;
        }

        .caterpillar-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 5;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          color: #313131;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .caterpillar-arrow:hover {
          background: var(--primary);
          color: var(--primary-foreground);
        }
        .caterpillar-arrow--left { left: 12px; }
        .caterpillar-arrow--right { right: 12px; }
        @media (min-width: 768px) {
          .caterpillar-arrow--left { left: 20px; }
          .caterpillar-arrow--right { right: 20px; }
        }
        .caterpillar-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .caterpillar-container {
          display: flex;
          width: 100%;
          padding: 5px;
          gap: 5px;
          border: 1px solid color-mix(in oklab, var(--foreground) 30%, transparent);
          border-radius: 0;
        }

        .caterpillar-container .cat-card {
          position: relative;
          width: ${cardWidth};
          aspect-ratio: 3 / 5;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .caterpillar-container .cat-card {
            aspect-ratio: 3 / 4;
          }
        }
        @media (min-width: 1280px) {
          .caterpillar-container .cat-card {
            aspect-ratio: 4 / 5;
          }
        }

        .caterpillar-container .cat-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .caterpillar-container .cat-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 45%;
          background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0));
          pointer-events: none;
        }

        .caterpillar-container .cat-label {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 16px;
          z-index: 2;
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.15;
          white-space: normal;
        }

        .caterpillar-buttons {
          margin-top: 24px;
          display: flex;
          gap: 16px;
        }

        .hide {
          display: none;
        }

        @media (max-width: 1023px) {
          .caterpillar-container .cat-label {
            font-size: 15px;
            left: 12px;
            right: 12px;
            bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
}


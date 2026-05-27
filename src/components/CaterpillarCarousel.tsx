import { useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

type Slide = { src: string; label?: string };

const VISIBLE = 4;

export function CaterpillarCarousel({ slides }: { slides: Slide[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  // index of the next slide to append on "next"
  const nextIndex = useRef(VISIBLE % slides.length);
  // index of the slide to prepend on "prev"
  const prevIndex = useRef((slides.length - 1) % slides.length);

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
      // advance pointers
      prevIndex.current = nextIndex.current - VISIBLE;
      if (prevIndex.current < 0) prevIndex.current += slides.length;
      nextIndex.current = (nextIndex.current + 1) % slides.length;
    } else {
      container.prepend(newCard);
      last.classList.add("hide");
      nextIndex.current = prevIndex.current + VISIBLE;
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

  return (
    <div className="caterpillar-wrapper">
      <div ref={containerRef} className="caterpillar-container">
        {slides.slice(0, VISIBLE).map((s, i) => (
          <div key={`${s.src}-${i}`} className="cat-card">
            <img src={s.src} alt={s.label ?? ""} />
            {s.label ? <span className="cat-label">{s.label}</span> : null}
          </div>
        ))}
      </div>

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
      <style>{`
        .caterpillar-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .caterpillar-container {
          display: flex;
          padding: 5px;
          gap: 5px;
          border: 1px solid color-mix(in oklab, var(--foreground) 30%, transparent);
          border-radius: 0;
        }

        .caterpillar-container .cat-card {
          position: relative;
          width: 20vw;
          aspect-ratio: 4 / 5;
          overflow: hidden;
        }

        .caterpillar-container .cat-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .caterpillar-container .cat-label {
          position: absolute;
          left: 16px;
          bottom: 16px;
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.15;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5);
          max-width: 85%;
          white-space: pre-line;
        }

        .caterpillar-buttons {
          margin-top: 24px;
          display: flex;
          gap: 16px;
        }

        .hide {
          display: none;
        }

        @media (max-width: 767px) {
          .caterpillar-container .cat-card {
            width: 28vw;
          }
          .caterpillar-container .cat-label {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

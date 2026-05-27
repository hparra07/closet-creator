import { useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

type Slide = { src: string; label?: string };

export function CaterpillarCarousel({ slides }: { slides: Slide[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const updateCaterpillar = (forward: boolean) => {
    const container = containerRef.current;
    if (!container || isAnimating.current) return;
    isAnimating.current = true;

    const cards = gsap.utils.toArray<HTMLImageElement>("img", container);
    if (cards.length === 0) {
      isAnimating.current = false;
      return;
    }
    const first = cards[0];
    const last = cards[cards.length - 1];

    const state = Flip.getState(cards);

    const newCard = document.createElement("img");
    newCard.alt = "";
    gsap.set(newCard, { scale: 0, opacity: 0 });

    if (forward) {
      newCard.src = first.src;
      container.append(newCard);
      first.classList.add("hide");
    } else {
      newCard.src = last.src;
      newCard.innerText = last.innerText;
      container.prepend(newCard);
      last.classList.add("hide");
    }

    Flip.from(state, {
      targets: gsap.utils.toArray("img", container),
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
      <div
        ref={containerRef}
        className="caterpillar-container"
      >
        {slides.slice(0, 4).map((s, i) => (
          <img
            key={`${s.src}-${i}`}
            src={s.src}
            alt={s.label ?? ""}
          />
        ))}
      </div>
      <div className="caterpillar-buttons">
        <button
          type="button"
          id="next"
          onClick={() => updateCaterpillar(true)}
          className="bg-foreground px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          Next
        </button>
        <button
          type="button"
          id="prev"
          onClick={() => updateCaterpillar(false)}
          className="bg-foreground px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          Previous
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
          border: 2px dashed color-mix(in oklab, var(--foreground) 20%, transparent);
          border-radius: 10px;
        }

        .caterpillar-container img {
          width: 20vw;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          position: relative;
        }

        .caterpillar-buttons {
          margin-top: 20px;
          display: flex;
          gap: 20px;
        }

        .hide {
          display: none;
        }

        @media (max-width: 767px) {
          .caterpillar-container img {
            width: 22vw;
          }
        }
      `}</style>
    </div>
  );
}

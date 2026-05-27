import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(Flip);

type Slide = { src: string; label?: string };

export function CaterpillarCarousel({ slides }: { slides: Slide[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const [order, setOrder] = useState(slides);

  const move = (forward: boolean) => {
    const container = containerRef.current;
    if (!container || isAnimating.current) return;
    isAnimating.current = true;

    const imgs = Array.from(container.querySelectorAll<HTMLImageElement>("img"));
    if (imgs.length === 0) {
      isAnimating.current = false;
      return;
    }
    const first = imgs[0];
    const last = imgs[imgs.length - 1];

    const state = Flip.getState(imgs);

    const newCard = document.createElement("img");
    newCard.className = first.className;
    newCard.alt = "";
    gsap.set(newCard, { scale: 0, opacity: 0 });

    if (forward) {
      newCard.src = first.src;
      container.appendChild(newCard);
      first.classList.add("cc-hide");
    } else {
      newCard.src = last.src;
      container.prepend(newCard);
      last.classList.add("cc-hide");
    }

    Flip.from(state, {
      targets: container.querySelectorAll("img"),
      fade: true,
      absoluteOnLeave: true,
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          transformOrigin: forward ? "bottom right" : "bottom left",
        }),
      onLeave: (els) =>
        gsap.to(els, {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          transformOrigin: forward ? "bottom left" : "bottom right",
          onComplete: () => {
            els.forEach((el) => el.remove());
            isAnimating.current = false;
          },
        }),
      onComplete: () => {
        setTimeout(() => {
          isAnimating.current = false;
        }, 50);
      },
    });
  };

  useEffect(() => {
    setOrder(slides);
  }, [slides]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="flex gap-3 md:gap-4 p-2 md:p-3 border-2 border-dashed border-foreground/15 rounded-xl overflow-hidden"
      >
        {order.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={s.label ?? ""}
            className="w-[28vw] md:w-[20vw] aspect-[4/5] object-cover rounded-md flex-shrink-0"
          />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => move(false)}
          className="h-10 w-10 inline-flex items-center justify-center border border-foreground/20 hover:bg-foreground hover:text-background transition-colors rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => move(true)}
          className="h-10 w-10 inline-flex items-center justify-center border border-foreground/20 hover:bg-foreground hover:text-background transition-colors rounded-full"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <style>{`.cc-hide{display:none!important}`}</style>
    </div>
  );
}

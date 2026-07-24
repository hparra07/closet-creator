import { useState } from "react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { YellowButton } from "@/components/common/YellowButton";

export type ProductSolution = {
  title: string;
  desc: string;
  images: string[];
  href?: string;
};

function LongArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="26"
      height="10"
      viewBox="0 0 26 10"
      fill="none"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path d="M0 5H25M25 5L20 1M25 5L20 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SolutionCard({ solution }: { solution: ProductSolution }) {
  const [active, setActive] = useState(0);
  const count = solution.images.length;
  const go = (dir: number) => setActive((a) => (a + dir + count) % count);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
      {/* Crossfading images */}
      {solution.images.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: active === i ? 1 : 0, pointerEvents: active === i ? "auto" : "none" }}
        >
          <img src={img} alt={solution.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-20">
        <p className="font-sans text-2xl font-bold text-white mb-2">{solution.title}</p>
        <p className="text-white text-sm leading-relaxed mb-5 max-w-xs">{solution.desc}</p>
        <YellowButton href={solution.href ?? "#"}>Discover</YellowButton>
      </div>

      {/* Bottom navigation bar */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/90 to-transparent border-t border-white/25 flex items-stretch z-10">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="w-14 flex items-center justify-center text-white/80 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 ease-out cursor-pointer shrink-0"
          >
            <LongArrow direction="left" />
          </button>

          <div className="w-px bg-white/25 shrink-0" />

          <div className="flex-1 flex items-center justify-center gap-2">
            {solution.images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${active === i ? "w-6 bg-primary" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>

          <div className="w-px bg-white/25 shrink-0" />

          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="w-14 flex items-center justify-center text-white/80 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 ease-out cursor-pointer shrink-0"
          >
            <LongArrow direction="right" />
          </button>
        </div>
      )}
    </div>
  );
}

export function ProductSolutionsSection({
  title,
  intro,
  solutions,
}: {
  title?: string;
  intro: React.ReactNode;
  solutions: ProductSolution[];
}) {
  return (
    <SectionWrapper className="!pt-24 md:!pt-32">
      {title && (
        <div className="text-center mb-10 md:mb-14 reveal-up">
          <span className="rule eyebrow" style={{ color: "#313131" }}>{title}</span>
        </div>
      )}
      <p className="text-center max-w-2xl mx-auto font-sans text-2xl md:text-3xl leading-snug mb-10 md:mb-14 reveal-up" style={{ color: "#313131" }}>
        {intro}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-up">
        {solutions.map((s) => (
          <SolutionCard key={s.title} solution={s} />
        ))}
      </div>
    </SectionWrapper>
  );
}

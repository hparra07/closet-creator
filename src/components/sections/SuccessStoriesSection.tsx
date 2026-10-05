import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { getRandomReviews, type Review } from "@/lib/reviews";
import { ReviewCard as SharedReviewCard } from "@/components/common/ReviewCard";

const FLOAT = [
  { duration: "6s", delay: "0s" },
  { duration: "7s", delay: "0.3s" },
  { duration: "6.5s", delay: "0.6s" },
  { duration: "5.8s", delay: "0.9s" },
  { duration: "7.2s", delay: "1.2s" },
  { duration: "6.2s", delay: "0.5s" },
];

function ReviewCard({ review: r, revealed, index }: { review: Review; revealed: boolean; index: number }) {
  return (
    <div
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
      }}
    >
      <SharedReviewCard review={r} className="h-full" />
    </div>
  );
}

export function SuccessStoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const textScrollerRef = useRef<HTMLDivElement | null>(null);
  const [textIdx, setTextIdx] = useState(0);
  // Seeded by the page path (not Math.random()) so each page shows a
  // different set of reviews, but server and client always agree on which
  // ones — a true-random pick here would mismatch during hydration.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [reviews] = useState(() => getRandomReviews(4, pathname));

  const onCarouselScroll = () => {
    const el = textScrollerRef.current;
    if (!el) return;
    const cardW = el.scrollWidth / reviews.length;
    const i = Math.round(el.scrollLeft / cardW);
    setTextIdx(Math.min(Math.max(i, 0), reviews.length - 1));
  };

  const goToCard = (i: number) => {
    const el = textScrollerRef.current;
    if (!el) return;
    const cardW = el.scrollWidth / reviews.length;
    el.scrollTo({ left: cardW * i, behavior: "smooth" });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden">
      <div className="lg:hidden flex flex-col items-center justify-center text-center px-4 mb-10">
        <h2 className="rule eyebrow mb-6" style={{ color: "#1B1B1B", fontSize: "20px" }}>SUCCESS STORIES</h2>
        <p className="font-sans text-lg leading-snug max-w-md" style={{ color: "#1B1B1B" }}>
          <strong className="font-bold">Experience home transformation</strong> through our client's eyes. <strong className="font-bold">Quality and trust</strong> in every project.
        </p>
      </div>

      <div className="hidden lg:grid mx-auto grid-cols-[1fr_minmax(280px,360px)_1fr] gap-x-10 items-center" style={{ maxWidth: "1400px" }}>
        <div className="flex flex-col gap-6">
          {[reviews[0], reviews[2]].map((r, i) => (
            <ReviewCard key={r.a} review={r} revealed={revealed} index={i * 2} />
          ))}
        </div>

        <div className="flex flex-col items-center text-center px-2 py-8">
          <h2 className="rule eyebrow mb-8" style={{ color: "#1B1B1B", fontSize: "22px" }}>SUCCESS STORIES</h2>
          <p className="font-sans text-xl leading-snug mb-8" style={{ color: "#1B1B1B" }}>
            <strong className="font-bold">Experience home transformation</strong> through our client's eyes. <strong className="font-bold">Quality and trust</strong> in every project.
          </p>
          <PrimaryButton onClick={() => window.open("https://jlclosets.com/jlclosets-reviews/", "_blank", "noopener,noreferrer")}>
            View More Reviews
          </PrimaryButton>
        </div>

        <div className="flex flex-col gap-6">
          {[reviews[1], reviews[3]].map((r, i) => (
            <ReviewCard key={r.a} review={r} revealed={revealed} index={i * 2 + 1} />
          ))}
        </div>
      </div>

      {/* Mobile + tablet: carousel + button below */}
      <div className="lg:hidden mt-4 space-y-8">
        <div
          ref={textScrollerRef}
          onScroll={onCarouselScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-5 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {reviews.map((r, i) => (
            <SharedReviewCard key={i} review={r} className="snap-center shrink-0 w-[82vw] md:w-[55vw] max-w-[420px]" />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 -mt-4">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to review ${i + 1}`}
              onClick={() => goToCard(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === textIdx ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"}`}
            />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <PrimaryButton onClick={() => window.open("https://jlclosets.com/jlclosets-reviews/", "_blank", "noopener,noreferrer")}>
            View More Reviews
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

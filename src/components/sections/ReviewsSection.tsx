import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ReviewCard as SharedReviewCard } from "@/components/common/ReviewCard";

const TEXT_REVIEWS = [
  { quote: "JL closets staff are EXTREMELY professional, helpful, flexible and most of all, SUPER friendly! Not to mention that the closets look AMAZING! I will recommend them to anyone who needs to update or custom design their closets. They do free estimates, including a 3D design of what you want. Thanks JL closets! ...", a: "Luis Emmanuelli", loc: "West Palm Beach, FL", source: "Google", url: "https://www.google.com/search?q=JL+Closets+reviews" },
  { quote: "Most competitive pricing and excellent and timely work! 10/10 would recommend for custom closets and shelving!", a: "Sarah Jackson", loc: "FL", source: "Houzz", url: "https://www.houzz.com/professionals/closet-designers-and-professional-organizers/jl-closets" },
  { quote: "First class company with great design and workmanship. Andrea and Sophia are an awesome team.", a: "Tod Edward Highfield", loc: "Boca Raton, FL", source: "Angi", url: "https://www.angi.com" },
  { quote: "Truly the most considered cabinetry we've owned. Every detail was thought through and the install was flawless.", a: "Marisol R.", loc: "Boca Raton, FL", source: "Best Pick Reports", url: "https://www.bestpickreports.com" },
  { quote: "From sketch to install, every step felt like an art form. We couldn't be happier with our new closet.", a: "James K.", loc: "Coral Gables, FL", source: "Google", url: "https://www.google.com/search?q=JL+Closets+reviews" },
  { quote: "A pantry we now plan dinners around. Functional, beautiful, and exactly what we envisioned.", a: "Lena & Tom", loc: "Palm Beach, FL", source: "Facebook", url: "https://www.facebook.com/jlclosets" },
];

const VIDEO_REVIEWS = [
  { gif: "https://jlclosets.com/wp-content/uploads/2025/03/EP-garage-cabinet-kitchen-pantry-installation-customer-satisfaction-jl-closets.gif.gif", video: "https://www.youtube.com/watch?v=Hyq4t6QsdzE", name: "Elissa Polack", loc: "Delray Beach, FL" },
  { gif: "https://jlclosets.com/wp-content/uploads/2025/03/CP-customer-testimonial-jl-closets-satisfied-client.gif.gif", video: "https://www.youtube.com/watch?v=yi5TaJ2haOU", name: "Chris Puccio", loc: "Boca Raton, FL" },
  { gif: "https://jlclosets.com/wp-content/uploads/2025/03/BL-customer-testimonial-garage-cabinet-customization-happy-client-gif.gif", video: "https://www.youtube.com/watch?v=0Nc5hP68mLs", name: "Bruce Lowen", loc: "Boca Raton, FL" },
  { gif: "https://jlclosets.com/wp-content/uploads/2025/03/YG-master-closet-renovation-happy-customer-jl-closets-gif.gif", video: "https://www.youtube.com/watch?v=QtiUUEzsaFI", name: "Yvonne Graber", loc: "South Palm Beach, FL" },
];

const TEXT_SLOTS = [
  { top: "2%",  left: "0%",  w: "380px", tx: "-60px", ty: "-40px", float: "6s",   delay: "0s"   },
  { top: "2%",  left: "72%", w: "380px", tx: "60px",  ty: "-40px", float: "7s",   delay: "0.3s" },
  { top: "43%", left: "0%",  w: "380px", tx: "-60px", ty: "0px",   float: "6.5s", delay: "0.6s" },
  { top: "43%", left: "72%", w: "380px", tx: "60px",  ty: "0px",   float: "5.8s", delay: "0.9s" },
  { top: "84%", left: "0%",  w: "380px", tx: "-60px", ty: "40px",  float: "7.2s", delay: "1.2s" },
  { top: "84%", left: "72%", w: "380px", tx: "60px",  ty: "40px",  float: "6.2s", delay: "0.5s" },
];

const VIDEO_SLOTS = [
  { top: "3%",  left: "34%",  w: "200px", tx: "0px", ty: "-50px", float: "6s",   delay: "0.4s" },
  { top: "3%",  left: "52%",  w: "200px", tx: "0px", ty: "-50px", float: "5.5s", delay: "0.7s" },
  { top: "78%", left: "34%",  w: "200px", tx: "0px", ty: "50px",  float: "7s",   delay: "1.1s" },
  { top: "78%", left: "52%",  w: "200px", tx: "0px", ty: "50px",  float: "6.8s", delay: "0.2s" },
];

export function ReviewsSection({ onVideoOpen }: { onVideoOpen: (url: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const textScrollerRef = useRef<HTMLDivElement | null>(null);
  const videoScrollerRef = useRef<HTMLDivElement | null>(null);
  const [textIdx, setTextIdx] = useState(0);
  const [videoIdx, setVideoIdx] = useState(0);

  const onCarouselScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    setIdx: (n: number) => void,
    count: number
  ) => {
    const el = ref.current;
    if (!el) return;
    const cardW = el.scrollWidth / count;
    const i = Math.round(el.scrollLeft / cardW);
    setIdx(Math.min(Math.max(i, 0), count - 1));
  };

  const goToCard = (
    ref: React.RefObject<HTMLDivElement | null>,
    count: number,
    i: number
  ) => {
    const el = ref.current;
    if (!el) return;
    const cardW = el.scrollWidth / count;
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

  type ReviewCard = { type: "text"; data: typeof TEXT_REVIEWS[0]; slot: typeof TEXT_SLOTS[0] } | { type: "video"; data: typeof VIDEO_REVIEWS[0]; slot: typeof VIDEO_SLOTS[0] };

  const cards: ReviewCard[] = [
    ...TEXT_REVIEWS.map((data, i) => ({ type: "text" as const, data, slot: TEXT_SLOTS[i] })),
    ...VIDEO_REVIEWS.map((data, i) => ({ type: "video" as const, data, slot: VIDEO_SLOTS[i] })),
  ];

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden">
      <div className="xl:hidden flex flex-col items-center justify-center text-center px-4 mb-10">
        <h2 className="rule eyebrow mb-6" style={{ color: "#1B1B1B", fontSize: "20px" }}>SUCCESS STORIES</h2>
        <p className="font-sans text-lg leading-snug max-w-md" style={{ color: "#1B1B1B" }}>
          <strong className="font-bold">Experience home transformation</strong> through our client's eyes. <strong className="font-bold">Quality and trust</strong> in every project.
        </p>
      </div>

      <div className="hidden xl:block relative mx-auto" style={{ maxWidth: "1400px", height: "780px" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-none">
          <h2 className="rule eyebrow mb-8 pointer-events-auto" style={{ color: "#1B1B1B", fontSize: "22px" }}>SUCCESS STORIES</h2>
          <p className="font-sans text-xl lg:text-2xl leading-snug max-w-lg mb-8 pointer-events-auto" style={{ color: "#1B1B1B" }}>
            <strong className="font-bold">Experience home transformation</strong> through our client's eyes. <strong className="font-bold">Quality and trust</strong> in every project.
          </p>
          <div className="pointer-events-auto">
            <PrimaryButton onClick={() => window.open("https://www.google.com/search?q=JL+Closets+reviews", "_blank", "noopener,noreferrer")}>
              View More Reviews
            </PrimaryButton>
          </div>
        </div>

        {cards.map((card, i) => {
          const slot = card.slot;
          return (
            <div
              key={i}
              className={revealed ? "card-floating" : ""}
              style={{
                position: "absolute",
                top: slot.top,
                left: slot.left,
                width: slot.w,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translate(0,0) scale(1)" : `translate(${slot.tx},${slot.ty}) scale(0.9)`,
                transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
                animationDuration: slot.float,
                animationDelay: slot.delay,
                zIndex: 5,
              }}
            >
              {card.type === "text" ? (
                <SharedReviewCard review={card.data} />
              ) : (
                <button
                  type="button"
                  className="relative group w-full overflow-hidden focus:outline-none block cursor-pointer"
                  style={{ borderRadius: "8px" }}
                  onClick={() => onVideoOpen(card.data.video)}
                >
                  <img src={card.data.gif} alt={`${card.data.name} client testimonial video, ${card.data.loc}`} className="w-full aspect-square object-cover block pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 pt-10 pb-4 px-4 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))" }}>
                    <p className="font-sans text-base font-semibold text-white leading-tight">{card.data.name}</p>
                    <p className="font-sans text-xs text-white/80 leading-tight">{card.data.loc}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile + tablet: two carousels + button below */}
      <div className="xl:hidden mt-4 space-y-8">
        <div
          ref={textScrollerRef}
          onScroll={() => onCarouselScroll(textScrollerRef, setTextIdx, TEXT_REVIEWS.length)}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-5 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {TEXT_REVIEWS.map((r, i) => (
            <SharedReviewCard key={i} review={r} className="snap-center shrink-0 w-[82vw] md:w-[55vw] lg:w-[42vw] max-w-[420px]" />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 -mt-4">
          {TEXT_REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to review ${i + 1}`}
              onClick={() => goToCard(textScrollerRef, TEXT_REVIEWS.length, i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === textIdx ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"}`}
            />
          ))}
        </div>

        <div
          ref={videoScrollerRef}
          onScroll={() => onCarouselScroll(videoScrollerRef, setVideoIdx, VIDEO_REVIEWS.length)}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-5 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {VIDEO_REVIEWS.map((v, i) => (
            <button
              type="button"
              key={i}
              className="snap-center shrink-0 w-[60vw] md:w-[40vw] lg:w-[30vw] max-w-[280px] relative group overflow-hidden focus:outline-none block cursor-pointer"
              style={{ borderRadius: "8px" }}
              onClick={() => onVideoOpen(v.video)}
            >
              <img src={v.gif} alt={`${v.name} client testimonial video, ${v.loc}`} className="w-full aspect-square object-cover block pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 pt-8 pb-3 px-4 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))" }}>
                <p className="font-sans text-sm font-semibold text-white leading-tight">{v.name}</p>
                <p className="font-sans text-xs text-white/80 leading-tight">{v.loc}</p>
              </div>
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 -mt-4">
          {VIDEO_REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to video ${i + 1}`}
              onClick={() => goToCard(videoScrollerRef, VIDEO_REVIEWS.length, i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === videoIdx ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"}`}
            />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <PrimaryButton onClick={() => window.open("https://www.google.com/search?q=JL+Closets+reviews", "_blank", "noopener,noreferrer")}>
            View More Reviews
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

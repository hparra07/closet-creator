import { useEffect, useRef, useState } from "react";
import { YellowButton } from "@/components/common/YellowButton";

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

function SourceIcon({ source }: { source: string }) {
  const cls = "w-4 h-4 shrink-0";
  if (source === "Google") {
    return (
      <svg className={cls} viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.7 36 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"/>
      </svg>
    );
  }
  if (source === "Houzz") {
    return <svg className={cls} viewBox="0 0 24 24" fill="#4DBC15"><path d="M17 7v5h-5L7 7v17h5v-5h5v5h5V7z"/></svg>;
  }
  if (source === "Angi") {
    return (
      <svg className={cls} viewBox="0 0 365 220" fill="#ff6153">
        <path d="m333.39 52.36h28.71v123.47h-28.71zm14.36-11.55c8.89 0 15.85-6.85 15.85-15.6 0-8.74-7.11-15.85-15.85-15.85-8.75 0-15.6 6.96-15.6 15.85-.01 8.75 6.85 15.6 15.6 15.6zm-143.15 9.55c-10.25 0-17.81 4.06-22.48 12.06l-1.35 2.31-.32-2.66c-.7-5.81-7.08-9.71-12.61-9.71h-16.1l.25 123.47h28.96v-83.61c0-12.66 2.79-17.15 10.65-17.15 6.07 0 9.15 4.51 9.15 13.4v87.37h28.71v-93.87c-.01-20.97-8.37-31.61-24.86-31.61zm99.7 2h14.85l-.25 114.37c0 30.37-2.91 51.86-40.61 51.86-13.13 0-22.91-3.42-29.06-10.18-5.01-5.5-7.55-13.05-7.55-22.43v-.6h28.96v.35c0 9.65 7.2 10.4 9.4 10.4 9.65 0 10.4-8.56 10.4-20.65v-17.67l-1.71 3.53c-3.59 7.41-10.85 11.49-20.44 11.49-10.15 0-17.19-3.62-21.54-11.06-3.58-6.12-5.32-14.89-5.32-26.8v-48c0-7 .98-16.97 5.62-24.66 4.78-7.92 12.52-11.94 22.98-11.94 10.42 0 17.39 3.95 20.16 11.42l1.39 3.76.35-3.99c.46-5.19 7.03-9.2 12.37-9.2zm-14.35 38.36c0-7.74-1.09-15.65-9.15-15.65-7.17 0-10.65 4.71-10.65 14.4v43.01c0 7.74 1.12 15.65 9.4 15.65 8.74 0 10.4-6.38 10.4-18.15zm-174.35-86.12 27.47 171.23h-28.77l-1.52-11.13c-2.59-19.86-13.08-38.21-30.36-42.28-.6 7.01-3.96 30.77-5.41 36.96 0-.01.01-.03.01-.05-2.63 12.98-8.24 27.16-25.14 32.98a33.499 33.499 0 0 1 -10.9 1.81c-9.38 0-18.68-3.87-25.49-11.01-7.54-7.9-11.76-17.54-11.88-29.88-.28-29.52 24.06-55.9 55.41-60.07.3-.04.6-.06.91-.1l14.18-88.46h21zm-60.34 117.52c-12.81 4.54-24.4 16.11-24.26 30.86.05 5.28 1.62 8.41 4.3 11.23 2.08 2.18 5.17 3.07 7.66 2.21 4.18-1.44 6.14-6.44 7.63-14.81zm49.31-19.8-9.21-70.65h-1.02l-8.25 63.31c6.41 1.65 12.63 4.14 18.48 7.34z"/>
      </svg>
    );
  }
  if (source === "Best Pick Reports") {
    return (
      <svg className={cls} viewBox="0 0 51 50">
        <path fill="#0076CE" d="M25.4 0L0 14V35c0 3.4 2.8 6.2 6.2 6.2h22.5l8.6 8.6v-8.6h7.3c3.4 0 6.2-2.8 6.2-6.2V14L25.4 0z"/>
        <path fill="#FFFFFF" d="M25.4 7L0 21h6.1v11.2c0 1.6 1.3 2.9 2.9 2.9h22.2l6.1 6.1v-6.1h4.5c1.6 0 2.9-1.3 2.9-2.9V21h6.3L25.4 7zM16.1 27.2c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1zm9.3 0c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1zm9.3 0c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1z"/>
      </svg>
    );
  }
  if (source === "Facebook") {
    return (
      <svg className={cls} viewBox="0 0 1024 1024">
        <path fill="#1877f2" d="M1024 512C1024 229.2 794.8 0 512 0S0 229.2 0 512c0 255.6 187.2 467.4 432 505.8V660H302V512h130V399.3c0-128.3 76.4-199.2 193.4-199.2 56 0 114.6 10 114.6 10V336H675c-63.6 0-83.4 39.5-83.4 80v96H734L711.3 660H591.6v357.8C836.8 979.4 1024 767.6 1024 512z"/>
        <path fill="#fff" d="M711.3 660L734 512H591.6v-96c0-40.5 19.8-80 83.4-80h105.1V200s-58.6-10-114.6-10c-117 0-193.4 70.9-193.4 199.2V512H302v148h130v357.8c26.1 4.1 52.8 6.2 80 6.2s53.9-2.1 80-6.2V660h119.3z"/>
      </svg>
    );
  }
  return null;
}

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
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="xl:hidden flex flex-col items-center justify-center text-center px-4 mb-10">
        <span className="rule eyebrow mb-6" style={{ color: "#313131", fontSize: "20px" }}>SUCCESS STORIES</span>
        <p className="font-sans text-lg leading-snug max-w-md" style={{ color: "#313131" }}>
          <strong className="font-bold">Experience home transformation</strong> through our client's eyes. <strong className="font-bold">Quality and trust</strong> in every project.
        </p>
      </div>

      <div className="hidden xl:block relative mx-auto" style={{ maxWidth: "1400px", height: "780px" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-none">
          <span className="rule eyebrow mb-8 pointer-events-auto" style={{ color: "#313131", fontSize: "22px" }}>SUCCESS STORIES</span>
          <p className="font-sans text-xl lg:text-2xl leading-snug max-w-lg mb-8 pointer-events-auto" style={{ color: "#313131" }}>
            <strong className="font-bold">Experience home transformation</strong> through our client's eyes. <strong className="font-bold">Quality and trust</strong> in every project.
          </p>
          <div className="pointer-events-auto">
            <YellowButton onClick={() => window.open("https://www.google.com/search?q=JL+Closets+reviews", "_blank", "noopener,noreferrer")}>
              View More Reviews
            </YellowButton>
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
                <div className="p-6" style={{ backgroundColor: "#F1F1F1", borderRadius: "10px", color: "#313131", userSelect: "text" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-sans text-lg font-semibold leading-tight">{card.data.a}</p>
                      <p className="font-sans text-xs opacity-60 leading-tight">{card.data.loc}</p>
                    </div>
                    <div className="shrink-0 [&_svg]:w-7 [&_svg]:h-7"><SourceIcon source={card.data.source} /></div>
                  </div>
                  <p className="mb-3 tracking-widest" style={{ color: "#F6931D", fontSize: "16px" }}>★★★★★</p>
                  <p className="font-sans text-sm mb-5 font-normal" style={{ lineHeight: 1.3 }}>"{card.data.quote}"</p>
                  <a
                    href={card.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="review-source-btn inline-flex items-center gap-2 font-sans text-xs font-semibold px-4 py-2 border transition"
                    style={{ color: "#313131", borderColor: "#313131", borderRadius: "6px" }}
                  >
                    Read the Review on {card.data.source}
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
                  </a>
                </div>
              ) : (
                <button
                  type="button"
                  className="relative group w-full overflow-hidden focus:outline-none block cursor-pointer"
                  style={{ borderRadius: "10px" }}
                  onClick={() => onVideoOpen(card.data.video)}
                >
                  <img src={card.data.gif} alt="Client video" className="w-full aspect-square object-cover block pointer-events-none" />
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
            <div key={i} className="snap-center shrink-0 w-[82vw] md:w-[55vw] lg:w-[42vw] max-w-[420px] p-6" style={{ backgroundColor: "#F1F1F1", borderRadius: "10px", color: "#313131", userSelect: "text" }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-sans text-lg font-semibold leading-tight">{r.a}</p>
                  <p className="font-sans text-xs opacity-60 leading-tight">{r.loc}</p>
                </div>
                <div className="shrink-0 [&_svg]:w-7 [&_svg]:h-7"><SourceIcon source={r.source} /></div>
              </div>
              <p className="mb-3 tracking-widest" style={{ color: "#F6931D", fontSize: "16px" }}>★★★★★</p>
              <p className="font-sans text-sm mb-5 font-normal" style={{ lineHeight: 1.3 }}>"{r.quote}"</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="review-source-btn inline-flex items-center gap-2 font-sans text-xs font-semibold px-4 py-2 border transition"
                style={{ color: "#313131", borderColor: "#313131", borderRadius: "6px" }}
              >
                Read the Review on {r.source}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
              </a>
            </div>
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
              style={{ borderRadius: "10px" }}
              onClick={() => onVideoOpen(v.video)}
            >
              <img src={v.gif} alt="Client video" className="w-full aspect-square object-cover block pointer-events-none" />
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
          <YellowButton onClick={() => window.open("https://www.google.com/search?q=JL+Closets+reviews", "_blank", "noopener,noreferrer")}>
            View More Reviews
          </YellowButton>
        </div>
      </div>
    </section>
  );
}

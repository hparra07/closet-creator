import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { SolutionCard } from "@/components/sections/ProductSolutionsSection";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/ConsultModal";
import { YellowButton } from "@/components/common/YellowButton";
import { pageHead, SITE_URL } from "@/lib/pageHead";
import { PORTFOLIO_SOLUTIONS } from "@/lib/portfolioSolutions";

import heroImg from "@/assets/portfolio/wellington-residence-07.webp";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    pageHead({
      title: "Portfolio | Custom Closet & Storage Projects by JL Closets",
      description: "Browse real custom closet, pantry, garage, and storage projects designed and installed by JL Closets across South Florida.",
      path: "/portfolio",
      image: `${SITE_URL}${heroImg}`,
    }),
  component: Portfolio,
});

const MOBILE_VISIBLE_COUNT = 5;

function Portfolio() {
  const [consultOpen, setConsultOpen] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [lightbox, setLightbox] = useState<{ solutionIndex: number; photoIndex: number } | null>(null);
  const [closingLightbox, setClosingLightbox] = useState(false);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  const lightboxSolution = lightbox ? PORTFOLIO_SOLUTIONS[lightbox.solutionIndex] : null;
  const wrapPhoto = (i: number) => {
    if (!lightboxSolution) return 0;
    return (i + lightboxSolution.images.length) % lightboxSolution.images.length;
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLightbox(null);
      return;
    }
    setClosingLightbox(true);
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setLightbox(null);
      setClosingLightbox(false);
    }, 250);
  };

  useEffect(() => () => window.clearTimeout(closeTimeoutRef.current), []);

  // Drag-to-navigate on the lightbox image: past a small threshold, a swipe
  // left/right steps to the next/previous photo instead of just closing.
  const dragRef = useRef({ startX: 0, dx: 0, dragging: false });
  const onLightboxPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { startX: e.clientX, dx: 0, dragging: true };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onLightboxPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dx = e.clientX - dragRef.current.startX;
  };
  const onLightboxPointerUp = () => {
    const { dx, dragging } = dragRef.current;
    dragRef.current.dragging = false;
    if (!dragging) return;
    if (dx > 60) setLightbox((l) => (l ? { ...l, photoIndex: wrapPhoto(l.photoIndex - 1) } : l));
    else if (dx < -60) setLightbox((l) => (l ? { ...l, photoIndex: wrapPhoto(l.photoIndex + 1) } : l));
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightbox((l) => (l ? { ...l, photoIndex: wrapPhoto(l.photoIndex - 1) } : l));
      if (e.key === "ArrowRight") setLightbox((l) => (l ? { ...l, photoIndex: wrapPhoto(l.photoIndex + 1) } : l));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-clip">
      <Header onConsultOpen={() => setConsultOpen(true)} />

      <main>
        <ProductHeroSection
          title="Our Portfolio"
          description="30+ Years of Exceptional Custom Closet and Storage System Creations Across South Florida."
          image={heroImg}
          imageAlt="Custom walk-in closet by JL Closets"
          onConsultOpen={() => setConsultOpen(true)}
        />
        <PageBreadcrumbs />

        <SectionWrapper>
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 reveal-up">
            <h2 className="font-sans text-2xl md:text-3xl font-bold leading-snug mb-4" style={{ color: "#313131" }}>
              High-End Custom Closets and Storage Systems for Every Space
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#313131" }}>
              The JL Closets Portfolio highlights our most exceptional custom storage solutions, from luxurious walk-in closets to innovative pantries and multifunctional spaces. Every project is{" "}
              <strong className="font-bold underline-animate">crafted to combine elegance and practicality</strong>, built to stand the test of time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 reveal-up">
            {PORTFOLIO_SOLUTIONS.map((solution, i) => (
              <SolutionCard
                key={solution.title}
                solution={solution}
                transition={i % 2 === 0 ? "fade-right" : "diagonal"}
                onImageClick={(photoIndex) => setLightbox({ solutionIndex: i, photoIndex })}
                className={i >= MOBILE_VISIBLE_COUNT && !showAllMobile ? "hidden md:block" : ""}
              />
            ))}
          </div>

          {PORTFOLIO_SOLUTIONS.length > MOBILE_VISIBLE_COUNT && !showAllMobile && (
            <div className="mt-8 flex justify-center md:hidden">
              <YellowButton onClick={() => setShowAllMobile(true)}>View More Projects</YellowButton>
            </div>
          )}
        </SectionWrapper>

        {lightboxSolution && lightbox && (
          <div
            className={`portfolio-cards-lightbox ${closingLightbox ? "portfolio-cards-lightbox-closing" : ""}`}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            <button type="button" aria-label="Close" className="portfolio-cards-lightbox-close" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
              ×
            </button>
            <button
              type="button"
              aria-label="Previous"
              className="portfolio-cards-lightbox-arrow portfolio-cards-lightbox-prev"
              onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l ? { ...l, photoIndex: wrapPhoto(l.photoIndex - 1) } : l)); }}
            >
              ‹
            </button>
            <div
              className="portfolio-cards-lightbox-figure"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={onLightboxPointerDown}
              onPointerMove={onLightboxPointerMove}
              onPointerUp={onLightboxPointerUp}
              onPointerCancel={onLightboxPointerUp}
            >
              <img src={lightboxSolution.images[lightbox.photoIndex]} alt={lightboxSolution.title} draggable={false} />
              <p className="portfolio-cards-lightbox-caption">
                {lightboxSolution.title} — {lightbox.photoIndex + 1} / {lightboxSolution.images.length}
              </p>
            </div>
            <button
              type="button"
              aria-label="Next"
              className="portfolio-cards-lightbox-arrow portfolio-cards-lightbox-next"
              onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l ? { ...l, photoIndex: wrapPhoto(l.photoIndex + 1) } : l)); }}
            >
              ›
            </button>
          </div>
        )}

        <style>{`
          .portfolio-cards-lightbox {
            position: fixed; inset: 0; z-index: 1000;
            background: rgba(0,0,0,0.92);
            display: flex; align-items: center; justify-content: center;
            padding: 40px;
            animation: portfolio-cards-fade 0.25s ease;
          }
          .portfolio-cards-lightbox-closing { animation: portfolio-cards-fade-out 0.25s ease forwards; }
          @media (prefers-reduced-motion: reduce) {
            .portfolio-cards-lightbox, .portfolio-cards-lightbox-closing { animation: none; }
          }
          .portfolio-cards-lightbox-figure { display: flex; flex-direction: column; align-items: center; max-width: 92vw; max-height: 88vh; cursor: grab; touch-action: pan-y; user-select: none; }
          .portfolio-cards-lightbox-figure:active { cursor: grabbing; }
          .portfolio-cards-lightbox img { max-width: 92vw; max-height: 80vh; object-fit: contain; display: block; border-radius: 4px; }
          .portfolio-cards-lightbox-caption { margin: 14px 0 0; color: #fff; font-family: var(--font-sans); font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-align: center; }
          .portfolio-cards-lightbox-close { position: absolute; top: 20px; right: 24px; background: transparent; color: #fff; border: none; font-size: 36px; line-height: 1; cursor: pointer; }
          .portfolio-cards-lightbox-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: transparent; color: #fff; border: none; font-size: 48px; line-height: 1; cursor: pointer; padding: 16px 20px; }
          .portfolio-cards-lightbox-prev { left: 8px; }
          .portfolio-cards-lightbox-next { right: 8px; }
          @media (min-width: 768px) {
            .portfolio-cards-lightbox-prev { left: 16px; }
            .portfolio-cards-lightbox-next { right: 16px; }
          }
          @keyframes portfolio-cards-fade { from { opacity: 0 } to { opacity: 1 } }
          @keyframes portfolio-cards-fade-out { from { opacity: 1 } to { opacity: 0 } }
        `}</style>

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

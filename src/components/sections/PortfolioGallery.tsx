import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

export type PortfolioImage = { src: string; alt: string };
export type PortfolioProject = { name: string; images: PortfolioImage[] };

function LongArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="26" height="10" viewBox="0 0 26 10" fill="none" className={direction === "left" ? "rotate-180" : ""}>
      <path d="M0 5H25M25 5L20 1M25 5L20 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A single project's own image carousel — one large photo at a time, with
// overlaid circular prev/next arrows and dot indicators. Clicking the photo
// opens the shared lightbox for a full-screen view.
function ProjectCarousel({ project, onOpenLightbox }: { project: PortfolioProject; onOpenLightbox: (index: number) => void }) {
  const [index, setIndex] = useState(0);
  const count = project.images.length;
  const wrap = (i: number) => (i + count) % count;

  // A new project (different image count/content) starts back at its first photo.
  useEffect(() => {
    setIndex(0);
  }, [project]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl">
        {project.images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            onClick={() => onOpenLightbox(i)}
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in transition-opacity duration-500"
            style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => setIndex((i) => wrap(i - 1))}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-pointer"
              style={{ color: "#313131" }}
            >
              <LongArrow direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => setIndex((i) => wrap(i + 1))}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-pointer"
              style={{ color: "#313131" }}
            >
              <LongArrow direction="right" />
            </button>

            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
              {project.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  aria-label={`Go to photo ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${i === index ? "w-6 bg-primary" : "w-1.5 bg-white/70"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <p className="text-center mt-5 font-sans text-lg font-bold" style={{ color: "#313131" }}>
        {project.name}
      </p>
    </div>
  );
}

export function PortfolioGallery({
  title,
  intro,
  projects,
}: {
  title?: string;
  intro?: React.ReactNode;
  projects: PortfolioProject[];
}) {
  const [activeProject, setActiveProject] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  const project = projects[activeProject];
  const wrap = (i: number) => (i + project.images.length) % project.images.length;

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
    if (dx > 60) setLightbox((l) => wrap((l ?? 0) - 1));
    else if (dx < -60) setLightbox((l) => wrap((l ?? 0) + 1));
  };

  const closeLightbox = () => {
    if (lightbox === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLightbox(null);
      return;
    }
    setClosing(true);
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setLightbox(null);
      setClosing(false);
    }, 250);
  };

  useEffect(() => () => window.clearTimeout(closeTimeoutRef.current), []);

  useEffect(() => {
    setLightbox(null);
  }, [activeProject]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightbox((l) => (l === null ? l : wrap(l - 1)));
      if (e.key === "ArrowRight") setLightbox((l) => (l === null ? l : wrap(l + 1)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, project.images.length]);

  return (
    <SectionWrapper>
      {(title || intro) && (
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 reveal-up">
          {title && (
            <h2 className="font-sans text-2xl md:text-3xl font-bold leading-snug mb-4" style={{ color: "#313131" }}>
              {title}
            </h2>
          )}
          {intro && (
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#313131" }}>
              {intro}
            </p>
          )}
        </div>
      )}

      <div
        className="flex gap-2 overflow-x-auto pb-1 mb-8 md:mb-10 md:flex-wrap md:justify-center"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setActiveProject(i)}
            className={`shrink-0 px-4 py-2 text-xs md:text-sm font-semibold tracking-wide rounded-full border transition-colors duration-300 cursor-pointer ${
              i === activeProject
                ? "bg-primary text-primary-foreground border-primary"
                : "border-foreground/25 hover:border-primary"
            }`}
            style={i === activeProject ? undefined : { color: "#313131" }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="reveal-up">
        <ProjectCarousel project={project} onOpenLightbox={setLightbox} />
      </div>

      {lightbox !== null && project.images[lightbox] && (
        <div
          className={`portfolio-lightbox ${closing ? "portfolio-lightbox-closing" : ""}`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button type="button" aria-label="Close" className="portfolio-lightbox-close" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
            ×
          </button>
          <button
            type="button"
            aria-label="Previous"
            className="portfolio-lightbox-arrow portfolio-lightbox-prev"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => wrap((l ?? 0) - 1)); }}
          >
            ‹
          </button>
          <div
            className="portfolio-lightbox-figure"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onLightboxPointerDown}
            onPointerMove={onLightboxPointerMove}
            onPointerUp={onLightboxPointerUp}
            onPointerCancel={onLightboxPointerUp}
          >
            <img src={project.images[lightbox].src} alt={project.images[lightbox].alt} draggable={false} />
            <p className="portfolio-lightbox-caption">{project.name}</p>
          </div>
          <button
            type="button"
            aria-label="Next"
            className="portfolio-lightbox-arrow portfolio-lightbox-next"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => wrap((l ?? 0) + 1)); }}
          >
            ›
          </button>
        </div>
      )}

      <style>{`
        .portfolio-lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          animation: portfolio-fade 0.25s ease;
        }
        .portfolio-lightbox-closing { animation: portfolio-fade-out 0.25s ease forwards; }
        @media (prefers-reduced-motion: reduce) {
          .portfolio-lightbox, .portfolio-lightbox-closing { animation: none; }
        }
        .portfolio-lightbox-figure { display: flex; flex-direction: column; align-items: center; max-width: 92vw; max-height: 88vh; cursor: grab; touch-action: pan-y; user-select: none; }
        .portfolio-lightbox-figure:active { cursor: grabbing; }
        .portfolio-lightbox img { max-width: 92vw; max-height: 80vh; object-fit: contain; display: block; border-radius: 4px; }
        .portfolio-lightbox-caption { margin: 14px 0 0; color: #fff; font-family: var(--font-sans); font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-align: center; }
        .portfolio-lightbox-close { position: absolute; top: 20px; right: 24px; background: transparent; color: #fff; border: none; font-size: 36px; line-height: 1; cursor: pointer; }
        .portfolio-lightbox-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: transparent; color: #fff; border: none; font-size: 48px; line-height: 1; cursor: pointer; padding: 16px 20px; }
        .portfolio-lightbox-prev { left: 8px; }
        .portfolio-lightbox-next { right: 8px; }
        @media (min-width: 768px) {
          .portfolio-lightbox-prev { left: 16px; }
          .portfolio-lightbox-next { right: 16px; }
        }
        @keyframes portfolio-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes portfolio-fade-out { from { opacity: 1 } to { opacity: 0 } }
      `}</style>
    </SectionWrapper>
  );
}

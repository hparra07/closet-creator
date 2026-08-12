import { SectionWrapper } from "@/components/common/SectionWrapper";

export type ProjectVideo = { thumbnail: string; video: string; label?: string };

// Full literal class strings (Tailwind can't generate classes built via template
// concatenation, so each bento cell's span combo has to be spelled out completely).
const BENTO_SPANS = [
  "col-span-2 md:col-span-1 md:row-span-2",
  "col-span-2 md:col-span-2 md:row-span-1",
  "col-span-2 md:col-span-1 md:row-span-1",
  "col-span-2 md:col-span-1 md:row-span-1",
  "col-span-2 md:col-span-2 md:row-span-1",
];

export function ProjectVideosSection({
  videos,
  onVideoOpen,
}: {
  videos: ProjectVideo[];
  onVideoOpen: (url: string) => void;
}) {
  return (
    <SectionWrapper>
      <div className="text-center mb-10 md:mb-14 reveal-up">
        <h2 className="rule eyebrow" style={{ color: "#313131" }}>Project Videos</h2>
      </div>
      <p className="text-center max-w-2xl mx-auto font-sans text-2xl md:text-3xl leading-snug mb-10 md:mb-14 reveal-up" style={{ color: "#313131" }}>
        See our <strong className="font-bold underline-animate">craftsmanship in motion.</strong> Watch{" "}
        <strong className="font-bold underline-animate">real installations</strong> and client walkthroughs of custom closets built by JL Closets.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-1 rounded-2xl overflow-hidden reveal-up md:h-[560px]">
        {videos.slice(0, 5).map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onVideoOpen(v.video)}
            className={`relative group overflow-hidden cursor-pointer aspect-video md:aspect-auto ${BENTO_SPANS[i]}`}
          >
            <img src={v.thumbnail} alt={v.label ?? ""} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {v.label && (
              <p className="absolute bottom-3 left-3 text-white text-sm font-semibold text-left">{v.label}</p>
            )}
          </button>
        ))}
      </div>
    </SectionWrapper>
  );
}

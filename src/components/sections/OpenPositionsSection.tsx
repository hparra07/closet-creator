import { MapPin, Clock, BadgeDollarSign } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { HiringBannerSection } from "@/components/sections/HiringBannerSection";
import { YellowButton } from "@/components/common/YellowButton";
import { OutlineButton } from "@/components/common/OutlineButton";
import teamImg from "@/assets/shared/expert-installations.webp";

type Position = {
  slug: string;
  title: string;
  tag: string;
  location: string;
  type: string;
  pay: string;
  desc: string;
  responsibilities: string[];
};

export const POSITIONS: Position[] = [
  {
    slug: "closet-designer",
    title: "Closet Designer (Design Consultant)",
    tag: "Design",
    location: "South Florida",
    type: "Full-time",
    pay: "$65,000–$130,000+ per year",
    desc: "Join JL Closets' award-winning design team. We're looking for experienced, relationship-driven designers who understand both the art of design and the discipline of sales. Our designers build trust, lead meaningful consultations, and close with confidence.",
    responsibilities: [
      "Lead in-home and virtual design consultations with prospective clients",
      "Create custom 3D renderings using our design software",
      "Build lasting client relationships through trust, follow-up, and attention to detail",
      "Meet or exceed monthly sales targets",
      "Collaborate with our installation team to ensure flawless execution on every project",
    ],
  },
];

export function OpenPositionsSection({ onApplyClick }: { onApplyClick: () => void }) {
  return (
    <div id="open-positions">
      <SectionWrapper className="!pb-0">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14 reveal-up">
          <h2 className="rule eyebrow mb-6" style={{ color: "#313131" }}>Open Positions</h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#313131" }}>
            We're actively growing and have the following roles we're looking to fill.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {POSITIONS.map((p) => (
            <div key={p.title} className="reveal-up p-8 rounded-2xl border border-foreground/10 bg-card">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <h3 className="font-display text-2xl font-bold" style={{ color: "#313131" }}>{p.title}</h3>
                <span
                  className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(241,195,58,0.15)", color: "#8a6d1a" }}
                >
                  {p.tag}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5 text-sm" style={{ color: "#313131", opacity: 0.7 }}>
                <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {p.location}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {p.type}</span>
                <span className="inline-flex items-center gap-1.5"><BadgeDollarSign className="w-4 h-4" /> {p.pay}</span>
              </div>

              <p className="text-base leading-relaxed mb-6" style={{ color: "#313131", opacity: 0.8 }}>{p.desc}</p>

              <div className="flex flex-wrap items-center gap-4">
                {/* Links to the individual job page — not built yet */}
                <OutlineButton href={`/careers/${p.slug}`} showArrow>View Details</OutlineButton>
                <YellowButton onClick={onApplyClick}>Apply Now</YellowButton>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <section className="reveal-up relative w-full mt-14 md:mt-20">
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9]">
          <img
            src={teamImg}
            alt="JL Closets installation team at work"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 md:pl-16 lg:pl-24 max-w-md md:max-w-lg">
              <h3 className="font-display text-2xl md:text-4xl font-bold mb-4 text-white">
                Don't See a Job Posting? No Problem.
              </h3>
              <p className="text-sm md:text-base leading-relaxed mb-2 text-white/85">
                We're always on the lookout for the right people — even if we haven't published the exact role yet.
              </p>
              <p className="text-sm md:text-base leading-relaxed mb-7 text-white/85">
                Many of our best team members didn't come from a job board — they came from taking initiative.
              </p>
              <YellowButton onClick={onApplyClick}>Introduce Yourself</YellowButton>
            </div>
          </div>
        </div>
      </section>

      <HiringBannerSection />
    </div>
  );
}

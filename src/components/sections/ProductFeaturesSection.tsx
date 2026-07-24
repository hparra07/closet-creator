import { SectionWrapper } from "@/components/common/SectionWrapper";
import { CaterpillarCarousel } from "@/components/carousels/CaterpillarCarousel";

export function ProductFeaturesSection({
  title = "Features & Details",
  subtitle,
  slides,
}: {
  title?: string;
  subtitle?: string;
  slides: { src: string; label: string }[];
}) {
  return (
    <SectionWrapper>
      <div className="text-center mb-10 md:mb-14 reveal-up">
        <span className="rule eyebrow" style={{ color: "#313131" }}>{title}</span>
        {subtitle && (
          <p className="mt-4 font-sans text-lg md:text-xl leading-snug" style={{ color: "#313131" }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="reveal-up">
        <CaterpillarCarousel slides={slides} />
      </div>
    </SectionWrapper>
  );
}

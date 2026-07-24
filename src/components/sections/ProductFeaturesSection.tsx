import { SectionWrapper } from "@/components/common/SectionWrapper";
import { CaterpillarCarousel } from "@/components/carousels/CaterpillarCarousel";

export function ProductFeaturesSection({
  slides,
}: {
  slides: { src: string; label: string }[];
}) {
  return (
    <SectionWrapper>
      <div className="text-center mb-10 md:mb-14 reveal-up">
        <span className="rule eyebrow" style={{ color: "#313131" }}>Features & Details</span>
      </div>
      <div className="reveal-up">
        <CaterpillarCarousel slides={slides} />
      </div>
    </SectionWrapper>
  );
}

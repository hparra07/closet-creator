import { WorksCarousel } from "@/components/carousels/WorksCarousel";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import closetImg from "@/assets/closet.jpg";
import pantryImg from "@/assets/pantry.jpg";
import darkOffice from "@/assets/dark-office.jpg";
import library from "@/assets/library.jpg";

export function GallerySection() {
  return (
    <SectionWrapper>
      <div className="text-center mb-14 md:mb-20">
        <span className="rule eyebrow" style={{ color: "#313131" }}>Works</span>
      </div>
      <WorksCarousel images={[closetImg, pantryImg, darkOffice, library, heroKitchen, pantryImg]} />
    </SectionWrapper>
  );
}

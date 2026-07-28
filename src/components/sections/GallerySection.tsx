import { WorksCarousel } from "@/components/carousels/WorksCarousel";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import customClosets from "@/assets/shared/custom-closets-img.jpg";
import entertainmentCenter from "@/assets/home/entertainment-center.jpg";
import garage from "@/assets/home/garage-img.jpg";
import homeOffice from "@/assets/home/home-office-img.jpg";
import laundry from "@/assets/home/laundry.jpg";
import mudroom from "@/assets/home/mudroom.jpg";
import murphyBed from "@/assets/home/murphy-bed.jpg";
import wineRack from "@/assets/home/wine-rack.jpg";

export function GallerySection() {
  return (
    <SectionWrapper>
      <div className="text-center mb-14 md:mb-20">
        <span className="rule eyebrow" style={{ color: "#313131" }}>Works</span>
      </div>
      <WorksCarousel
        items={[
          { src: customClosets, label: "Custom Closets" },
          { src: entertainmentCenter, label: "Entertainment Centers" },
          { src: garage, label: "Garage Storage" },
          { src: homeOffice, label: "Home Office" },
          { src: laundry, label: "Laundry Room" },
          { src: mudroom, label: "Mudroom Storage" },
          { src: murphyBed, label: "Murphy Beds" },
          { src: wineRack, label: "Wine Racks" },
        ]}
      />
    </SectionWrapper>
  );
}

import { WorksCarousel } from "@/components/carousels/WorksCarousel";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import customClosets from "@/assets/custom-closets-img.jpg";
import entertainmentCenter from "@/assets/entertainment-center.jpg";
import garage from "@/assets/garage-img.jpg";
import homeOffice from "@/assets/home-office-img.jpg";
import laundry from "@/assets/laundry.jpg";
import mudroom from "@/assets/mudroom.jpg";
import murphyBed from "@/assets/murphy-bed.jpg";
import wineRack from "@/assets/wine-rack.jpg";

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

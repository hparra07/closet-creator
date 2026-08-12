import { WorksCarousel } from "@/components/carousels/WorksCarousel";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import customClosets from "@/assets/shared/custom-closets-img.webp";
import entertainmentCenter from "@/assets/home/entertainment-center.webp";
import garage from "@/assets/home/garage-img.webp";
import homeOffice from "@/assets/home/home-office-img.webp";
import laundry from "@/assets/home/laundry.webp";
import mudroom from "@/assets/home/mudroom.webp";
import murphyBed from "@/assets/home/murphy-bed.webp";
import wineRack from "@/assets/home/wine-rack.webp";

export function GallerySection({ title = "Works" }: { title?: string }) {
  return (
    <SectionWrapper>
      <div className="text-center mb-14 md:mb-20">
        <h2 className="rule eyebrow" style={{ color: "#313131" }}>{title}</h2>
      </div>
      <WorksCarousel
        items={[
          { src: customClosets, label: "Custom Closets", href: "/custom-closets" },
          { src: entertainmentCenter, label: "Entertainment Centers", href: "#" },
          { src: garage, label: "Garage Storage", href: "#" },
          { src: homeOffice, label: "Home Office", href: "#" },
          { src: laundry, label: "Laundry Room", href: "#" },
          { src: mudroom, label: "Mudroom Storage", href: "#" },
          { src: murphyBed, label: "Murphy Beds", href: "#" },
          { src: wineRack, label: "Wine Racks", href: "#" },
        ]}
      />
    </SectionWrapper>
  );
}

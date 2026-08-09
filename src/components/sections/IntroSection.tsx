import { CaterpillarCarousel } from "@/components/carousels/CaterpillarCarousel";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import storageCloset from "@/assets/shared/storage-closet.png";
import storagePantry from "@/assets/shared/storage-pantry.png";
import storageMudroom from "@/assets/shared/storage-mudroom.png";
import storageLaundry from "@/assets/shared/storage-laundry.png";
import storageEntertainment from "@/assets/shared/storage-entertainment.png";
import storageGarage from "@/assets/shared/storage-garage.png";
import storageOffice from "@/assets/shared/storage-office.png";
import storageMore from "@/assets/shared/storage-more.png";

export function IntroSection() {
  return (
    <SectionWrapper>
      <div className="text-center mb-14 md:mb-20">
        <span className="rule eyebrow" style={{ color: "#313131" }}>Custom Storage Solutions</span>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
        <div className="max-w-xs md:max-w-lg lg:max-w-xs mx-auto lg:mx-0 mb-12 lg:mb-0 lg:shrink-0">
          <p className="font-sans text-[15px] md:text-[18px] lg:text-[20px] leading-relaxed reveal-up" style={{ color: "#313131" }}>
            <span className="underline-animate">
              From custom closets to garages, pantries, home offices and more, JL Closets designs tailored storage solutions for every space in your home—guided
            </span>{" "}
            by a simple process, expert installation, and over 30 years of award-winning experience.
          </p>
        </div>
        <div className="flex-1 min-w-0">
          <CaterpillarCarousel
            slides={[
              { src: storageCloset, label: "Custom Closets" },
              { src: storagePantry, label: "Pantry Organization" },
              { src: storageMudroom, label: "Mudroom Storage" },
              { src: storageLaundry, label: "Laundry Room Organization" },
              { src: storageEntertainment, label: "Entertainment Centers & Wall Units" },
              { src: storageGarage, label: "Garage Storage" },
              { src: storageOffice, label: "Home Office" },
              { src: storageMore, label: "More Storage Ideas" },
            ]}
            arrowsOverlay
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

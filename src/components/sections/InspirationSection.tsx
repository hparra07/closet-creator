import { SectionWrapper } from "@/components/common/SectionWrapper";
import { CaterpillarCarousel } from "@/components/carousels/CaterpillarCarousel";
import storageCloset from "@/assets/storage-closet.png";
import storagePantry from "@/assets/storage-pantry.png";
import storageMudroom from "@/assets/storage-mudroom.png";
import storageLaundry from "@/assets/storage-laundry.png";
import storageEntertainment from "@/assets/storage-entertainment.png";
import storageGarage from "@/assets/storage-garage.png";
import storageOffice from "@/assets/storage-office.png";
import storageMore from "@/assets/storage-more.png";

export function InspirationSection() {
  return (
    <SectionWrapper>
      <div className="text-center mb-14 md:mb-20">
        <span className="rule eyebrow" style={{ color: "#313131" }}>Get Inspired</span>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
        <div className="max-w-xs md:max-w-lg lg:max-w-xs mx-auto lg:mx-0 mb-12 lg:mb-0 lg:shrink-0">
          <p className="font-sans text-[15px] md:text-[18px] lg:text-[20px] leading-relaxed reveal-up" style={{ color: "#313131" }}>
            Browse our latest projects and discover how we transform everyday spaces into beautifully organized environments tailored to each homeowner's lifestyle.
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
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

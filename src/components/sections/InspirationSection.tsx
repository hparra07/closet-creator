import { SectionWrapper } from "@/components/common/SectionWrapper";
import { CaterpillarCarousel } from "@/components/carousels/CaterpillarCarousel";
import storageCloset from "@/assets/shared/storage-closet.webp";
import storagePantry from "@/assets/shared/storage-pantry.webp";
import storageMudroom from "@/assets/shared/storage-mudroom.webp";
import storageLaundry from "@/assets/shared/storage-laundry.webp";
import storageEntertainment from "@/assets/shared/storage-entertainment.webp";
import storageGarage from "@/assets/shared/storage-garage.webp";
import storageOffice from "@/assets/shared/storage-office.webp";
import storageMore from "@/assets/shared/storage-more.webp";

export function InspirationSection() {
  return (
    <SectionWrapper>
      <div className="text-center mb-14 md:mb-20">
        <h2 className="rule eyebrow" style={{ color: "#313131" }}>Get Inspired</h2>
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
            arrowsOverlay
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

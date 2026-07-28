import storageCloset from "@/assets/shared/storage-closet.png";
import storagePantry from "@/assets/shared/storage-pantry.png";
import storageMudroom from "@/assets/shared/storage-mudroom.png";
import storageLaundry from "@/assets/shared/storage-laundry.png";
import storageEntertainment from "@/assets/shared/storage-entertainment.png";
import storageGarage from "@/assets/shared/storage-garage.png";
import storageOffice from "@/assets/shared/storage-office.png";
import storageMore from "@/assets/shared/storage-more.png";

// Every main product category, used to build the "Recommended For You" carousel
// shown on category and subcategory pages. Keyed so a page can exclude its own
// category (e.g. a Custom Closets page, or any of its subcategory children,
// should recommend the OTHER categories, not itself).
export type StorageCategory = { key: string; src: string; label: string };

export const STORAGE_CATEGORIES: StorageCategory[] = [
  { key: "custom-closets", src: storageCloset, label: "Custom Closets" },
  { key: "entertainment-centers", src: storageEntertainment, label: "Entertainment Centers & Wall Units" },
  { key: "home-office", src: storageOffice, label: "Home Office" },
  { key: "pantries", src: storagePantry, label: "Pantry Organization" },
  { key: "mudroom", src: storageMudroom, label: "Mudroom Storage" },
  { key: "laundry-room", src: storageLaundry, label: "Laundry Room Organization" },
  { key: "garage", src: storageGarage, label: "Garage Storage" },
  { key: "more-storage-ideas", src: storageMore, label: "More Storage Ideas" },
];

/** Slides for the "Recommended For You" carousel, excluding the current page's category. */
export function recommendedSlides(excludeKey: string): { src: string; label: string }[] {
  return STORAGE_CATEGORIES.filter((c) => c.key !== excludeKey).map(({ src, label }) => ({ src, label }));
}

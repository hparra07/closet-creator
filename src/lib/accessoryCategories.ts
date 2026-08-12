import closetLighting from "@/assets/walk-in-closets/closet-lighting.webp";
import cabinetFinishes from "@/assets/walk-in-closets/cabinet-finishes.webp";
import doorsDrawers from "@/assets/walk-in-closets/doors-drawers.webp";
import closetAccessories from "@/assets/walk-in-closets/closet-accesories.webp";
import pantryImg from "@/assets/accessories/PWS1-wine-glass-storage.webp";
import garageImg from "@/assets/accessories/GLD3-garage-light-duty-hooks-organizer-wall-system.webp";

// Every accessory category, used to build the "More Custom Closet
// Accessories" grid shown on each accessory page. Keyed so a page can
// exclude its own category from the grid (e.g. the Closet Lighting page
// should recommend the OTHER 5 accessory categories, not itself).
export type AccessoryCategory = { key: string; title: string; desc: string; image: string; href?: string };

export const ACCESSORY_CATEGORIES: AccessoryCategory[] = [
  { key: "closet-lighting", title: "Closet Lighting", desc: "Ambient lighting for every closet.", image: closetLighting, href: "/accessories/closet-lighting" },
  { key: "cabinet-finishes", title: "Cabinet Finishes", desc: "Premium finishes for your style.", image: cabinetFinishes },
  { key: "doors-drawers", title: "Doors And Drawers", desc: "Custom doors built to last.", image: doorsDrawers },
  { key: "closet-accessories", title: "Closet Accessories", desc: "Smart add-ons for more storage.", image: closetAccessories },
  { key: "pantry-accessories", title: "Pantry Accessories", desc: "Smart upgrades for your pantry.", image: pantryImg },
  { key: "garage-accessories", title: "Garage Accessories", desc: "Durable storage for the garage.", image: garageImg },
];

/** Cards for the "More Custom Closet Accessories" grid, excluding the current page's category. */
export function recommendedAccessories(excludeKey: string): AccessoryCategory[] {
  return ACCESSORY_CATEGORIES.filter((c) => c.key !== excludeKey);
}

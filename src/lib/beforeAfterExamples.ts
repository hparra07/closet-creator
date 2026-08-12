import walkInAfter from "@/assets/shared/custom-closets-img.webp";
import reachInAfter from "@/assets/custom-closets/closet.webp";
import walkInBefore from "@/assets/before-after/before-walk-in.webp";
import reachInBefore from "@/assets/before-after/before-reach-in.webp";
import entertainmentBefore from "@/assets/before-after/before-entertainment.webp";
import entertainmentAfter from "@/assets/before-after/after-entertainment.webp";
import type { BeforeAfterItem } from "@/components/sections/BeforeAfterSection";

export const BEFORE_AFTER_EXAMPLES: BeforeAfterItem[] = [
  {
    title: "Walk-In Closet Transformation",
    before: walkInBefore,
    after: walkInAfter,
  },
  {
    title: "Entertainment Center Transformation",
    before: entertainmentBefore,
    after: entertainmentAfter,
  },
  {
    title: "Reach-In Closet Transformation",
    before: reachInBefore,
    after: reachInAfter,
  },
];

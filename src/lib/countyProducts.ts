import type { ProductSolution } from "@/components/sections/ProductSolutionsSection";
import customClosetsImg from "@/assets/custom-closets/closet.webp";
import customClosetsImg2 from "@/assets/custom-closets/card-hero-1.webp";
import customClosetsImg3 from "@/assets/custom-closets/card-hero-2.webp";
import entertainmentImg from "@/assets/home/entertainment-center.webp";
import entertainmentImg2 from "@/assets/custom-closets/card-hero-3.webp";
import entertainmentImg3 from "@/assets/custom-closets/banner2.webp";
import homeOfficeImg from "@/assets/home/home-office-img.webp";
import homeOfficeImg2 from "@/assets/shared/design-and-drafting.webp";
import homeOfficeImg3 from "@/assets/custom-closets/card-hero-4.webp";
import pantryImg from "@/assets/misc/pantry.webp";
import pantryImg2 from "@/assets/shared/enjoy-life.webp";
import pantryImg3 from "@/assets/custom-closets/banner3.webp";
import mudroomImg from "@/assets/home/mudroom.webp";
import mudroomImg2 from "@/assets/shared/expert-installations.webp";
import mudroomImg3 from "@/assets/custom-closets/banner4.webp";
import laundryImg from "@/assets/home/laundry.webp";
import laundryImg2 from "@/assets/shared/in-home-consultation.webp";
import laundryImg3 from "@/assets/custom-closets/vert-banner-1.webp";
import garageImg from "@/assets/home/garage-img.webp";
import garageImg2 from "@/assets/shared/why-frame-2.webp";
import garageImg3 from "@/assets/shared/why-frame-3.webp";
import moreStorageImg from "@/assets/home/wine-rack.webp";
import moreStorageImg2 from "@/assets/home/murphy-bed.webp";
import moreStorageImg3 from "@/assets/custom-closets/big-banner-1.webp";

export const stackImg1 = customClosetsImg2;
export const stackImg2 = customClosetsImg3;
export const stackImg3 = entertainmentImg2;
export const stackImg4 = homeOfficeImg3;
export const stackImg5 = laundryImg3;

// Same 8-category product list shared by every county page's solutions
// carousel — placeholder photos until each county gets its own real
// project photography.
export const COUNTY_PRODUCTS: ProductSolution[] = [
  {
    title: "Custom Closets",
    desc: "Walk-in, reach-in, and custom shoe storage tailored to your space.",
    images: [customClosetsImg, customClosetsImg2, customClosetsImg3],
    href: "/custom-closets",
  },
  {
    title: "Entertainment Centers",
    desc: "Custom wall units built around your media and display needs.",
    images: [entertainmentImg, entertainmentImg2, entertainmentImg3],
    href: "#",
  },
  {
    title: "Home Office",
    desc: "Organized, productive workspaces designed around how you work.",
    images: [homeOfficeImg, homeOfficeImg2, homeOfficeImg3],
    href: "#",
  },
  {
    title: "Pantries",
    desc: "Smart shelving and cabinetry to keep every kitchen essential in reach.",
    images: [pantryImg, pantryImg2, pantryImg3],
    href: "#",
  },
  {
    title: "Mudroom",
    desc: "Durable, organized entryways built for South Florida living.",
    images: [mudroomImg, mudroomImg2, mudroomImg3],
    href: "#",
  },
  {
    title: "Laundry Room",
    desc: "Functional storage that makes laundry day easier.",
    images: [laundryImg, laundryImg2, laundryImg3],
    href: "#",
  },
  {
    title: "Garage",
    desc: "Cabinets and shelving that turn your garage into usable space.",
    images: [garageImg, garageImg2, garageImg3],
    href: "#",
  },
  {
    title: "More Storage Ideas",
    desc: "Wine racks, murphy beds, and creative solutions for every room.",
    images: [moreStorageImg, moreStorageImg2, moreStorageImg3],
    href: "#",
  },
];

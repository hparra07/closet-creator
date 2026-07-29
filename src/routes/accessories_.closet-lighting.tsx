import { createFileRoute } from "@tanstack/react-router";
import { AccessoryTemplate } from "@/components/templates/AccessoryTemplate";
import type { ProductSolution } from "@/components/sections/ProductSolutionsSection";
import heroImg from "@/assets/accessories/closet-lighting-banner.jpg";
import countertopImg1 from "@/assets/accessories/countertop/CTL1-custom-led-countertop-lighting-with-plant-decor-1.png";
import countertopImg2 from "@/assets/accessories/countertop/CTL2-modern-led-task-lighting-above-countertop.webp";
import countertopImg3 from "@/assets/accessories/countertop/CTL3-custom-closet-task-and-countertop-led-lighting.jpg";
import countertopImg4 from "@/assets/accessories/countertop/CTL4-luxury-countertop-LED-accent-lighting-with-modern-decor.png";
import countertopImg5 from "@/assets/accessories/countertop/CTL5-custom-closet-countertop-LED-ribbon-lighting-accessory-1024x819.jpg";
import wardrobeImg1 from "@/assets/accessories/wardobe/WL1-luxury-walk-in-closet-with-glass-doors-and-led-shelf-lighting.webp";
import wardrobeImg2 from "@/assets/accessories/wardobe/WL2-custom-led-closet-rod-lighting-with-puck-lights.jpg";
import wardrobeImg3 from "@/assets/accessories/wardobe/WL3-modern-closet-with-led-shelf-and-drawer-lighting.jpg";
import wardrobeImg4 from "@/assets/accessories/wardobe/WL4-elegant-wardrobe-with-led-lighting-in-modern-walk-in-closet.webp";
import accentImg1 from "@/assets/accessories/accent-shelf-ligths/SAL1-custom-shelf-lighting-in-modern-display-unit.jpg";
import accentImg2 from "@/assets/accessories/accent-shelf-ligths/SAL2-closet-shelf-and-wardrobe-lighting-with-storage-boxes.jpg";
import accentImg3 from "@/assets/accessories/accent-shelf-ligths/SAL3-shelf-and-accent-lighting-for-modern-closet-display.jpg";
import accentImg4 from "@/assets/accessories/accent-shelf-ligths/SAL4-drawer-with-custom-led-lighting-modern-closet.webp";
import accentImg5 from "@/assets/accessories/accent-shelf-ligths/SAL5-modern-shelf-lighting-for-display-cabinet-with-decor.webp";
import accentImg6 from "@/assets/accessories/accent-shelf-ligths/SAL6-custom-wine-rack-with-led-accent-lighting-in-modern-kitchen.jpg";
import accentImg7 from "@/assets/accessories/accent-shelf-ligths/SAL7-custom-cabinet-with-led-shelf-lighting-and-glass-doors.webp";

const LIGHTING_SOLUTIONS: ProductSolution[] = [
  {
    title: "Countertop and Task Lights",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    images: [countertopImg1, countertopImg2, countertopImg3, countertopImg4, countertopImg5],
    noButton: true,
  },
  {
    title: "Wardrobe Lights",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    images: [wardrobeImg1, wardrobeImg2, wardrobeImg3, wardrobeImg4],
    noButton: true,
  },
  {
    title: "Accent and Shelf Lights",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    images: [accentImg1, accentImg2, accentImg3, accentImg4, accentImg5, accentImg6, accentImg7],
    noButton: true,
  },
];

export const Route = createFileRoute("/accessories_/closet-lighting")({
  head: () => ({
    meta: [
      { title: "Closet & Pantry Lighting | JL Closets" },
      {
        name: "description",
        content: "Smart & modern custom lighting options for your closet or pantry, designed and installed by JL Closets across South Florida.",
      },
    ],
  }),
  component: ClosetLighting,
});

function ClosetLighting() {
  return (
    <AccessoryTemplate
      hero={{
        title: "Closet & Pantry Lighting",
        description: "Smart & Modern Custom Lighting Options",
        image: heroImg,
        imageAlt: "Custom closet lighting by JL Closets",
      }}
      pageKey="closet-lighting"
      solutions={{
        title: "Collection of Lighting Solutions to Illuminate Your Space",
        intro: (
          <>
            <strong className="font-bold underline-animate">Illuminate every inch of your closet and pantry</strong> with custom, energy‑efficient LED lighting that eliminates shadows and beautifully showcases your storage.
          </>
        ),
        items: LIGHTING_SOLUTIONS,
      }}
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { ProductSolutionsSection, type ProductSolution } from "@/components/sections/ProductSolutionsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProductFeaturesSection } from "@/components/sections/ProductFeaturesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ConsultModal } from "@/components/modals/ConsultModal";
import customClosetsImg from "@/assets/custom-closets-img.jpg";
import closetImg from "@/assets/closet.jpg";
import storageCloset from "@/assets/storage-closet.png";
import library from "@/assets/library.jpg";
import darkOffice from "@/assets/dark-office.jpg";
import consult from "@/assets/consult.jpg";

const SOLUTIONS: ProductSolution[] = [
  {
    title: "Walk-In Closets",
    desc: "Luxury walk-in designs meticulously crafted to transform your space into a sanctuary.",
    images: [customClosetsImg, closetImg],
  },
  {
    title: "Reach-In Closets",
    desc: "Maximize every inch of your space with custom reach-in designs tailored to your daily routine.",
    images: [closetImg, storageCloset],
  },
  {
    title: "Shoe Storage",
    desc: "Showcase and protect your collection with bespoke shelving, lighting, and versatile organization.",
    images: [storageCloset, customClosetsImg],
  },
];

const FEATURES = [
  { src: library, label: "Closet with Island & Integrated Lighting" },
  { src: storageCloset, label: "Shoe Storage with Modular & Adjustable Components" },
  { src: darkOffice, label: "Closet with Natural Light, High Gloss Finishes, and Built-In Storage" },
  { src: consult, label: "Closet with Integrated Shoe Storage and Slanted Racks" },
  { src: closetImg, label: "Reach-In Closet with Drawers and Led Lighting" },
];

export const Route = createFileRoute("/custom-closets")({
  head: () => ({
    meta: [
      { title: "Custom Closets in South Florida | JL Closets" },
      {
        name: "description",
        content:
          "High-end custom closets designed to optimize your space and reflect your unique style. Walk-in closets, reach-in closets, and custom shoe storage across South Florida.",
      },
    ],
  }),
  component: CustomClosets,
});

function CustomClosets() {
  const [consultOpen, setConsultOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-clip">
      <Header onConsultOpen={() => setConsultOpen(true)} />

      <main>
        <ProductHeroSection
          title="Custom Closets"
          description="Turn your storage dreams into reality with high-end custom closets designed to optimize your space and reflect your unique style."
          image={customClosetsImg}
          imageAlt="Custom walk-in closet by JL Closets"
        />

        <ProductSolutionsSection
          title="Custom Closets Florida – Smart Storage & Luxury Organization by JL Closets"
          intro={
            <>
              Turn your <strong className="font-bold underline-animate">success into a sanctuary.</strong> Experience the <strong className="font-bold underline-animate">art of organized living</strong> with bespoke designs that bring luxury and calm to your daily routine.
            </>
          }
          solutions={SOLUTIONS}
        />

        <ProcessSection />
        <ProductFeaturesSection slides={FEATURES} />
        <ContactSection />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

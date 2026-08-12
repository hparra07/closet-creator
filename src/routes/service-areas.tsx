import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ParallaxHeroSection } from "@/components/sections/ParallaxHeroSection";
import { StoryIntroSection } from "@/components/sections/StoryIntroSection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { FindUsMapSection } from "@/components/sections/FindUsMapSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { WhyChooseUsV2 } from "@/components/sections/WhyChooseUsV2";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/ConsultModal";
import heroImg from "@/assets/shared/why-frame-1.webp";
import { pageHead, SITE_URL } from "@/lib/pageHead";
import storyImg from "@/assets/shared/in-home-consultation.webp";

export const Route = createFileRoute("/service-areas")({
  head: () =>
    pageHead({
      title: "Service Areas | JL Closets Custom Storage Across South Florida",
      description: "JL Closets designs and installs custom closets and storage solutions across Broward, Palm Beach, Miami-Dade, and every South Florida county we serve.",
      path: "/service-areas",
      image: `${SITE_URL}${heroImg}`,
    }),
  component: ServiceAreas,
});

function ServiceAreas() {
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
        <ParallaxHeroSection
          eyebrow="Where we work"
          title="JL Closets' Service Areas for Design and Installation"
          description="Custom closets & storage solutions across South Florida — from Miami to Naples, we design, build, and install every project ourselves."
          image={heroImg}
          imageAlt="Custom closet system installed by JL Closets"
          onConsultOpen={() => setConsultOpen(true)}
        />

        <StoryIntroSection
          eyebrow="Where We Work"
          title="Custom Closets & Storage Solutions Across South Florida"
          paragraphs={[
            "Since 1991, JL Closets has been South Florida's go-to expert for custom closets, pantries, home offices, and storage solutions — from homes to businesses, hotels, and government buildings. We're based in Boca Raton, but we serve the entire region, from Palm Beach to Naples.",
            "Whether it's a walk-in closet in Miami, a garage system in Fort Lauderdale, or a home office in Naples, we've got you covered — and we're always ready to expand our reach further across South Florida.",
          ]}
          image={storyImg}
          imageAlt="JL Closets designer during an in-home consultation across South Florida"
        />

        <FindUsMapSection />

        <ServiceAreasSection />

        <GallerySection title="Explore Our Custom Closet Systems and Storage Solutions" />

        <WhyChooseUsV2 title="Why Choose JL Closets for Your Custom Storage Solutions?" />

        <SuccessStoriesSection />

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

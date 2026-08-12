import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { ProductSolutionsSection, type ProductSolution } from "@/components/sections/ProductSolutionsSection";
import { WhyChooseSolutionSection, type SolutionReason } from "@/components/sections/WhyChooseSolutionSection";
import { PremiumCabinetFinishesSection } from "@/components/sections/PremiumCabinetFinishesSection";
import { CountyAreasSection } from "@/components/sections/CountyAreasSection";
import type { CountyBBox, CountyBounds, CountyPin } from "@/components/sections/CountyPinMap";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { FaqSection, type FaqItem } from "@/components/sections/FaqSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/ConsultModal";
import heroImg from "@/assets/shared/why-frame-1.webp";

// Page for a single county under Service Areas. `hero` and `solutions` are
// optional overrides — counties without their own copy yet just fall back
// to generic text built from `county`, and pick this up automatically once
// real content is written for them (Broward County is the first to have
// its own hero copy + product carousel).
export type CountyTemplateProps = {
  county: string;
  hero?: { title?: React.ReactNode; description?: string };
  solutions?: { intro: React.ReactNode; items: ProductSolution[] };
  whyChoose?: { title: React.ReactNode; intro: React.ReactNode; reasons: SolutionReason[]; images: string[] };
  areas?: {
    title: string;
    intro: string;
    groups: string[][];
    mapQuery: string;
    map?: { countyId: string; bbox: CountyBBox; bounds: CountyBounds; pins: CountyPin[] };
  };
  faq?: { title?: string; subtitle?: string; items?: FaqItem[] };
};

export function CountyTemplate({ county, hero, solutions, whyChoose, areas, faq }: CountyTemplateProps) {
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
          title={hero?.title ?? `Custom Closets & Storage Solutions in ${county}`}
          description={hero?.description ?? `JL Closets proudly designs, builds, and installs custom storage solutions for homeowners throughout ${county}.`}
          image={heroImg}
          imageAlt={`Custom closet by JL Closets in ${county}`}
          onConsultOpen={() => setConsultOpen(true)}
        />

        {solutions && (
          <ProductSolutionsSection intro={solutions.intro} solutions={solutions.items} layout="carousel" />
        )}

        {whyChoose && (
          <WhyChooseSolutionSection
            title={whyChoose.title}
            intro={whyChoose.intro}
            reasons={whyChoose.reasons}
            images={whyChoose.images}
          />
        )}

        <PremiumCabinetFinishesSection />

        {areas && (
          <CountyAreasSection
            title={areas.title}
            intro={areas.intro}
            areaGroups={areas.groups}
            mapQuery={areas.mapQuery}
            map={areas.map}
          />
        )}

        <SuccessStoriesSection />

        <FaqSection title={faq?.title} subtitle={faq?.subtitle} faqs={faq?.items} />

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

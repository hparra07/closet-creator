import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ProductFeaturesSection } from "@/components/sections/ProductFeaturesSection";
import { PremiumAccessoriesSection, type AccessoryCard } from "@/components/sections/PremiumAccessoriesSection";
import { WhyChooseSolutionSection, type SolutionReason } from "@/components/sections/WhyChooseSolutionSection";
import { DesignOptionsSection, type DesignOption } from "@/components/sections/DesignOptionsSection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { FaqSection, type FaqItem } from "@/components/sections/FaqSection";
import { ConsultModal } from "@/components/modals/ConsultModal";

// Page layout for a subcategory page nested under a main product (e.g. Walk-In
// Closets under Custom Closets). Lighter than MainProductTemplate: hero,
// optional "why choose this solution" reasons, accessories grid, success
// stories, "Recommended For You" carousel, optional FAQ, and a closing CTA for
// now — more sections can be added here later once the rest of the subcategory
// content is defined, and every subcategory route picks them up automatically.
export type SubProductTemplateProps = {
  hero: { title: string; description: string; image: string; imageAlt: string };
  designOptions?: { title: string; intro?: React.ReactNode; options: DesignOption[] };
  whyChoose?: { title: React.ReactNode; intro: React.ReactNode; reasons: SolutionReason[]; images: string[] };
  accessories?: { title?: string; cards: AccessoryCard[] };
  recommended?: { title: string; subtitle?: string; slides: { src: string; label: string }[] };
  faq?: { title: string; subtitle?: string; items: FaqItem[] };
};

export function SubProductTemplate({ hero, designOptions, whyChoose, accessories, recommended, faq }: SubProductTemplateProps) {
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
          title={hero.title}
          description={hero.description}
          image={hero.image}
          imageAlt={hero.imageAlt}
        />

        {designOptions && (
          <DesignOptionsSection
            title={designOptions.title}
            intro={designOptions.intro}
            options={designOptions.options}
          />
        )}

        {whyChoose && (
          <WhyChooseSolutionSection
            title={whyChoose.title}
            intro={whyChoose.intro}
            reasons={whyChoose.reasons}
            images={whyChoose.images}
          />
        )}

        {accessories && (
          <PremiumAccessoriesSection title={accessories.title} cards={accessories.cards} />
        )}

        <SuccessStoriesSection />

        {recommended && (
          <ProductFeaturesSection
            title={recommended.title}
            subtitle={recommended.subtitle}
            slides={recommended.slides}
          />
        )}

        {faq && (
          <FaqSection
            faqs={faq.items}
            title={faq.title}
            subtitle={faq.subtitle}
          />
        )}

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

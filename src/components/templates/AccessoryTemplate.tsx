import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { ProductSolutionsSection, type ProductSolution } from "@/components/sections/ProductSolutionsSection";
import { PremiumAccessoriesSection } from "@/components/sections/PremiumAccessoriesSection";
import { ProductFeaturesSection } from "@/components/sections/ProductFeaturesSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/ConsultModal";
import { recommendedAccessories } from "@/lib/accessoryCategories";
import { recommendedSlides } from "@/lib/storageCategories";

// Page layout for a closet-accessory page (Closet Lighting, Cabinet
// Finishes, Doors and Drawers, etc.). `pageKey` identifies which accessory
// category this page is, so it can be excluded from its own "More Custom
// Closet Accessories" cross-sell grid. More sections can be added here
// later, picked up automatically by every accessory route.
export type AccessoryTemplateProps = {
  hero: { title: string; description: string; image: string; imageAlt: string };
  pageKey: string;
  solutions?: { title?: string; intro: React.ReactNode; items: ProductSolution[] };
};

export function AccessoryTemplate({ hero, pageKey, solutions }: AccessoryTemplateProps) {
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
          onConsultOpen={() => setConsultOpen(true)}
        />
        <PageBreadcrumbs />

        {solutions && (
          <ProductSolutionsSection
            title={solutions.title}
            intro={solutions.intro}
            solutions={solutions.items}
          />
        )}

        <PremiumAccessoriesSection
          title="More Custom Closet Accessories"
          cards={recommendedAccessories(pageKey)}
          columns={5}
        />

        <ProductFeaturesSection
          title="Recommended For You"
          subtitle="More Storage Solutions for Your Home"
          slides={recommendedSlides("")}
        />

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

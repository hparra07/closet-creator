import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { ProductSolutionsSection, type ProductSolution } from "@/components/sections/ProductSolutionsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProductFeaturesSection } from "@/components/sections/ProductFeaturesSection";
import { FullscreenCarouselSection, type CarouselSlide } from "@/components/sections/FullscreenCarouselSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { FaqSection, type FaqItem } from "@/components/sections/FaqSection";
import { WhyChooseUsV2, type WhyCard } from "@/components/sections/WhyChooseUsV2";
import { ProjectVideosSection, type ProjectVideo } from "@/components/sections/ProjectVideosSection";
import { ConsultModal } from "@/components/modals/ConsultModal";
import { VideoModal } from "@/components/modals/VideoModal";

// Full page layout for a main product category (Custom Closets, Pantries, Garage, etc.).
// Route files own the actual content/copy/images and just pass it in here — this
// component owns page structure, section order, and the shared page-level state
// (consult modal, video modal, scroll-reveal observer).
export type MainProductTemplateProps = {
  hero: { title: string; description: string; image: string; imageAlt: string };
  solutions: { title: string; intro: React.ReactNode; items: ProductSolution[] };
  projectVideos: ProjectVideo[];
  showcaseSlides: CarouselSlide[];
  whyChooseUs: { title: string; backgroundImage: string; cards: WhyCard[] };
  faq: { title: string; subtitle: string; items: FaqItem[] };
  features: { title: string; subtitle: string; slides: { src: string; label: string }[] };
};

export function MainProductTemplate({
  hero,
  solutions,
  projectVideos,
  showcaseSlides,
  whyChooseUs,
  faq,
  features,
}: MainProductTemplateProps) {
  const [consultOpen, setConsultOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

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

        <ProductSolutionsSection
          title={solutions.title}
          intro={solutions.intro}
          solutions={solutions.items}
        />

        <ProjectVideosSection videos={projectVideos} onVideoOpen={setVideoUrl} />

        <ProcessSection />
        <FullscreenCarouselSection slides={showcaseSlides} />
        <SuccessStoriesSection />
        <WhyChooseUsV2
          title={whyChooseUs.title}
          backgroundImage={whyChooseUs.backgroundImage}
          cards={whyChooseUs.cards}
        />
        <ContactSection />
        <FaqSection
          faqs={faq.items}
          title={faq.title}
          subtitle={faq.subtitle}
        />
        <ProductFeaturesSection
          title={features.title}
          subtitle={features.subtitle}
          slides={features.slides}
        />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
      <VideoModal url={videoUrl} onClose={() => setVideoUrl(null)} />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { DesignProcessSection } from "@/components/sections/DesignProcessSection";
import { DesignProcessSectionV2 } from "@/components/sections/DesignProcessSectionV2";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/LazyConsultModal";
import { pageHead, SITE_URL } from "@/lib/pageHead";

import heroImg from "@/assets/shared/expert-installations.webp";

export const Route = createFileRoute("/design-process")({
  head: () =>
    pageHead({
      title: "Our Design & Installation Process | JL Closets",
      description: "From free in-home consultation to 3D design, expert crafting, and white-glove installation — see how JL Closets builds every custom closet in South Florida.",
      path: "/design-process",
      image: `${SITE_URL}${heroImg}`,
    }),
  component: DesignProcess,
});

function DesignProcess() {
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
          title="Our Design & Installation Process"
          description="From the first sketch to the final walkthrough — a process built on excellence, personalized service, and meticulous craftsmanship."
          image={heroImg}
          imageAlt="JL Closets installation team completing a custom closet"
          onConsultOpen={() => setConsultOpen(true)}
        />
        <PageBreadcrumbs />

        <SectionWrapper className="!pb-0 !pt-20 lg:!pt-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="rule eyebrow mb-3" style={{ color: "#313131" }}>How We Work</span>
            <p className="text-base md:text-lg leading-relaxed reveal-up" style={{ color: "#313131" }}>
              For over 30 years we've been South Florida's premier choice for custom storage solutions. Our team of experienced designers and skilled artisans doesn't just follow industry best practices — we set the standard for custom closets, pantries, garages, and home offices across the region.
            </p>
          </div>
        </SectionWrapper>

        <DesignProcessSection />

        <div className="text-center py-6 md:py-8 border-y border-foreground/10 mt-10 md:mt-14">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Option 2 — Horizontal Slides</span>
        </div>

        <DesignProcessSectionV2 />

        <div className="mt-10 md:mt-14">
          <SuccessStoriesSection />
        </div>

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

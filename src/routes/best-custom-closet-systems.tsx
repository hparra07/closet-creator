import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { ReasonsCounterSection } from "@/components/sections/ReasonsCounterSection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/LazyConsultModal";
import { pageHead, SITE_URL } from "@/lib/pageHead";

import heroImg from "@/assets/portfolio/las-olas-residence-01.webp";

export const Route = createFileRoute("/best-custom-closet-systems")({
  head: () =>
    pageHead({
      title: "Best Custom Closet Systems — Why JL Closets Is #1 in Florida",
      description:
        "22 reasons JL Closets designs and installs the best custom closet systems in South Florida: 30+ years of local expertise, transparent pricing, award-winning design, and a lifetime warranty.",
      path: "/best-custom-closet-systems",
      image: `${SITE_URL}${heroImg}`,
    }),
  component: BestCustomClosetSystems,
});

function BestCustomClosetSystems() {
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
          title="22 Reasons We Build Florida's Best Custom Closet Systems"
          description="Three decades of local craftsmanship, counted one reason at a time."
          image={heroImg}
          imageAlt="Luxury custom walk-in closet system by JL Closets"
          onConsultOpen={() => setConsultOpen(true)}
        />
        <PageBreadcrumbs />

        <SectionWrapper className="!pb-0">
          <div className="max-w-3xl mx-auto text-center">
            <span className="rule eyebrow mb-6" style={{ color: "#1B1B1B" }}>
              Why We Are The Best
            </span>
            <p className="text-base md:text-lg leading-relaxed reveal-up" style={{ color: "#1B1B1B" }}>
              We design and install the best custom closet systems in Florida — high-end organization tailored to
              your lifestyle. As the{" "}
              <span className="underline-animate">most awarded custom closet company in South Florida</span>, we
              don't just build storage; we create functional, luxurious spaces that make a home work better. Scroll
              to count all 22 reasons.
            </p>
          </div>
        </SectionWrapper>

        <ReasonsCounterSection />

        <SuccessStoriesSection />

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

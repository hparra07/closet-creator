import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { FaqSection } from "@/components/sections/FaqSection";
import { FaqCtaSection } from "@/components/sections/FaqCtaSection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { AboutIntroSection } from "@/components/sections/AboutIntroSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/ConsultModal";
import { pageHead } from "@/lib/pageHead";
import { FAQ_PAGE_FAQS } from "@/lib/faqData";

import ctaImg from "@/assets/shared/expert-installations.webp";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "FAQ | Custom Closets & Storage Questions | JL Closets",
      description: "Answers to common questions about JL Closets' custom closet design process, materials, pricing, installation, warranty, and service areas across South Florida.",
      path: "/faq",
    }),
  component: Faq,
});

function Faq() {
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
      <Header onConsultOpen={() => setConsultOpen(true)} variant="light" />

      <main>
        <div className="pt-32 md:pt-40" />
        <PageBreadcrumbs />

        <SectionWrapper className="!pb-0">
          <div className="max-w-3xl mx-auto text-center">
            <span className="rule eyebrow mb-6" style={{ color: "#313131" }}>FAQ</span>
            <h1 className="font-sans text-3xl md:text-4xl leading-tight mb-6 reveal-up" style={{ color: "#313131" }}>
              <strong className="font-bold">JL CLOSETS FAQ</strong>
            </h1>
            <p className="text-base md:text-lg leading-relaxed reveal-up" style={{ color: "#313131" }}>
              Everything you need to know about designing, building, and living with a JL Closets custom storage system — straight from the questions our clients ask us most.
            </p>
          </div>
        </SectionWrapper>

        <FaqSection faqs={FAQ_PAGE_FAQS} footer={null} title="" />

        <FaqCtaSection image={ctaImg} imageAlt="JL Closets team completing a professional custom closet installation" />

        <SuccessStoriesSection />

        <AboutIntroSection />

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

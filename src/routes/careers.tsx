import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { YellowButton } from "@/components/common/YellowButton";
import { WhyJoinUsSection } from "@/components/sections/WhyJoinUsSection";
import { OpenPositionsSection, POSITIONS } from "@/components/sections/OpenPositionsSection";
import { ConsultModal } from "@/components/modals/LazyConsultModal";
import { CareerModal } from "@/components/modals/CareerModal";
import { pageHead, SITE_URL } from "@/lib/pageHead";

import heroImg from "@/assets/contact/carrers.webp";

export const Route = createFileRoute("/careers")({
  head: () =>
    pageHead({
      title: "Careers at JL Closets | Join Our Team",
      description: "Join South Florida's most awarded custom closet company. See open positions and learn why JL Closets is a great place to build your career.",
      path: "/careers",
      image: `${SITE_URL}${heroImg}`,
    }),
  component: Careers,
});

function Careers() {
  const [consultOpen, setConsultOpen] = useState(false);
  const [careerModalOpen, setCareerModalOpen] = useState(false);

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
          title="Careers at JL Closets"
          description="Build your career with South Florida's most awarded custom closet company."
          image={heroImg}
          imageAlt="JL Closets team member working on a custom closet installation"
        />
        <PageBreadcrumbs />

        <SectionWrapper className="!pb-0">
          <div className="max-w-3xl mx-auto text-center">
            <span className="rule eyebrow mb-6" style={{ color: "#313131" }}>Join Our Team</span>
            <p className="text-base md:text-lg leading-relaxed mb-8 reveal-up" style={{ color: "#313131" }}>
              We're South Florida's most awarded custom-closet company, trusted for precision, craftsmanship, and a level of service that keeps clients returning for decades. As we grow, we're looking for driven, skilled people who want work that has impact, ideas that get heard, and a career that genuinely advances.
            </p>
            <YellowButton href="#open-positions" className="reveal-up">View Open Positions ↓</YellowButton>
          </div>
        </SectionWrapper>

        <WhyJoinUsSection />

        <OpenPositionsSection onApplyClick={() => setCareerModalOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
      <CareerModal
        open={careerModalOpen}
        onClose={() => setCareerModalOpen(false)}
        positions={POSITIONS.map((p) => p.title)}
      />
    </div>
  );
}

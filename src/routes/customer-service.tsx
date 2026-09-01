import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { CustomerServiceTopicsSection } from "@/components/sections/CustomerServiceTopicsSection";
import { FaqCtaSection } from "@/components/sections/FaqCtaSection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/LazyConsultModal";
import { pageHead, SITE_URL } from "@/lib/pageHead";

import heroImg from "@/assets/contact/warranty.webp";
import ctaImg from "@/assets/shared/in-home-consultation.webp";

export const Route = createFileRoute("/customer-service")({
  head: () =>
    pageHead({
      title: "Customer Service | JL Closets",
      description: "Everything you need after you've become a JL Closets client — scheduling, FAQs, warranty, installation support, and how to reach our team.",
      path: "/customer-service",
      image: `${SITE_URL}${heroImg}`,
    }),
  component: CustomerService,
});

function CustomerService() {
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
          title="Customer Service"
          description="We're here for you from the first consultation through the life of your custom storage system."
          image={heroImg}
          imageAlt="JL Closets customer service and support"
          onConsultOpen={() => setConsultOpen(true)}
        />
        <PageBreadcrumbs />

        <SectionWrapper className="!pb-0">
          <div className="max-w-3xl mx-auto text-center">
            <span className="rule eyebrow mb-6" style={{ color: "#313131" }}>How Can We Help?</span>
            <p className="text-base md:text-lg leading-relaxed reveal-up" style={{ color: "#313131" }}>
              Whether you're planning your first project or need support after installation, here's the fastest way to get what you need — or call us directly at{" "}
              <a href="tel:+15619129881" className="font-semibold underline-offset-2 hover:underline" style={{ color: "#313131" }}>
                (561) 912-9881
              </a>.
            </p>
          </div>
        </SectionWrapper>

        <CustomerServiceTopicsSection />

        <FaqCtaSection
          image={ctaImg}
          imageAlt="JL Closets designer during an in-home consultation"
          title="Need Something Else?"
          subtitle="Our team is one call away — no automated menus, just people who know your project."
        />

        <SuccessStoriesSection />

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

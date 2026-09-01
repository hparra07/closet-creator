import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { StoryIntroSection } from "@/components/sections/StoryIntroSection";
import { ShowroomSection } from "@/components/sections/ShowroomSection";
import { FindUsMapSection } from "@/components/sections/FindUsMapSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/LazyConsultModal";
import { pageHead, SITE_URL } from "@/lib/pageHead";

import heroImg from "@/assets/contact/showroom.webp";
import libraryImg from "@/assets/global/library.webp";

export const Route = createFileRoute("/showroom")({
  head: () =>
    pageHead({
      title: "Our Showroom | JL Closets Boca Raton",
      description: "Visit the JL Closets showroom in Boca Raton to see our custom closet systems, finishes, and hardware in person.",
      path: "/showroom",
      image: `${SITE_URL}${heroImg}`,
    }),
  component: Showroom,
});

function Showroom() {
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
          title="Visit Our Showroom"
          description="See, touch, and open our custom closet systems in person at our Boca Raton showroom."
          image={heroImg}
          imageAlt="JL Closets showroom in Boca Raton"
          onConsultOpen={() => setConsultOpen(true)}
        />
        <PageBreadcrumbs />

        <StoryIntroSection
          eyebrow="Experience It In Person"
          title="More Than a Showroom"
          paragraphs={[
            "Photos only tell half the story. At our Boca Raton showroom, you can run your hand across every finish, slide open real drawers, and see how our cabinetry, hardware, and lighting actually look and feel — not just how they photograph.",
            "Our designers walk you through fully built vignettes of walk-in closets, pantries, and home offices, so you can picture the possibilities for your own space before a single measurement is taken.",
          ]}
          image={libraryImg}
          imageAlt="Custom built-in cabinetry and shelving by JL Closets"
        />

        <ShowroomSection />

        <FindUsMapSection />

        <GallerySection title="Explore What You Can See In Person" />

        <SuccessStoriesSection />

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

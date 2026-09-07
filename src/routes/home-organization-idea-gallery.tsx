import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { ProductSolutionsSection } from "@/components/sections/ProductSolutionsSection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/LazyConsultModal";
import { pageHead, SITE_URL } from "@/lib/pageHead";

import heroImg from "@/assets/portfolio/wellington-residence-01.webp";
import { GALLERY_SOLUTIONS } from "@/lib/galleryProjects";

export const Route = createFileRoute("/home-organization-idea-gallery")({
  head: () =>
    pageHead({
      title: "Home Organization & Custom Closet Photo Gallery | JL Closets",
      description: "A curated gallery of custom closets and storage solutions — walk-in closets, pantries, entertainment centers, home offices, and more — designed to inspire your next project.",
      path: "/home-organization-idea-gallery",
      image: `${SITE_URL}${heroImg}`,
    }),
  component: IdeaGallery,
});

function IdeaGallery() {
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
          title="Home Organization & Custom Closet Idea Gallery"
          description="Modern built-in storage ideas for every home."
          image={heroImg}
          imageAlt="Luxury custom walk-in closet by JL Closets"
          onConsultOpen={() => setConsultOpen(true)}
        />
        <PageBreadcrumbs />

        <ProductSolutionsSection
          intro={
            <>
              A curated collection of inspiration for{" "}
              <span className="underline-animate">transforming your living spaces</span>
              {" "}— from luxurious walk-in closets to clever small-space storage ideas, explore the possibilities for every room in your home.
            </>
          }
          solutions={GALLERY_SOLUTIONS}
        />

        <SuccessStoriesSection />

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

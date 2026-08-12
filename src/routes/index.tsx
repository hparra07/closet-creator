import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyChooseUsV1 } from "@/components/sections/WhyChooseUsV1";
import { WhyChooseUsV2 } from "@/components/sections/WhyChooseUsV2";
import { GallerySection } from "@/components/sections/GallerySection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { BEFORE_AFTER_EXAMPLES } from "@/lib/beforeAfterExamples";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { ShowroomSection } from "@/components/sections/ShowroomSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ConsultModal } from "@/components/modals/ConsultModal";
import { VideoModal } from "@/components/modals/VideoModal";
import { pageHead } from "@/lib/pageHead";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Custom Closet Systems & Storage Solutions in South Florida",
      description: "Bespoke closets, pantries, and storage systems designed and installed across South Florida.",
      path: "/",
    }),
  component: Index,
});

function Index() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
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
        <HeroSection onConsultOpen={() => setConsultOpen(true)} />
        <IntroSection />
        <ProcessSection />

        <div className="bg-ink text-ink-foreground text-center py-3 text-xs tracking-widest uppercase">
          Version 1 — Cinematic frames
        </div>
        <WhyChooseUsV1 />

        <div className="bg-ink text-ink-foreground text-center py-3 text-xs tracking-widest uppercase">
          Version 2 — Cards rise on scroll
        </div>
        <WhyChooseUsV2 />

        <GallerySection />
        <BeforeAfterSection items={BEFORE_AFTER_EXAMPLES} />
        <ServiceAreasSection />
        <ShowroomSection />
        <ReviewsSection onVideoOpen={setVideoUrl} />
        <ContactSection />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
      <VideoModal url={videoUrl} onClose={() => setVideoUrl(null)} />
    </div>
  );
}

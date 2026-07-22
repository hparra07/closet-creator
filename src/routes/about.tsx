import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { AboutIntroSection } from "@/components/sections/AboutIntroSection";
import { WhyChooseUsV2, type WhyCard } from "@/components/sections/WhyChooseUsV2";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { InspirationSection } from "@/components/sections/InspirationSection";
import icon1 from "@/assets/icon-1.png";
import icon2 from "@/assets/icon-2.png";
import icon3 from "@/assets/icon-3.png";
import icon4 from "@/assets/icon-4.png";
import icon5 from "@/assets/icon-5.png";

const ABOUT_CARDS: WhyCard[] = [
  { title: "Over 30 Years of Expertise", desc: "We have been a trusted provider of custom storage solutions in South Florida since 1991, bringing over three decades of experience to every project we undertake.", icon: icon1 },
  { title: "Lifetime Warranty", desc: "We offer a lifetime warranty on all custom installations, ensuring that every system is built to last as long as you own your home.", icon: icon2 },
  { title: "Award-Winning Custom Closet Design", desc: "Recognized as the best custom closet company in South Florida, with eight consecutive years as the top pick for custom closets by Best Pick Reports.", icon: icon3 },
  { title: "Highest Customer Satisfaction", desc: "Almost 98% of positive direct, and 5-star reviews make us South Florida's top customer-rated custom closet company.", icon: icon4 },
  { title: "80% Referral Rate", desc: "With an 80% referral rate and 70% returning customers, we stand out as South Florida's most referred custom closet company.", icon: icon5 },
];
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { ShowroomSection } from "@/components/sections/ShowroomSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/ConsultModal";
import { VideoModal } from "@/components/modals/VideoModal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About JL Closets | South Florida's Most Trusted Custom Closet Company" },
      {
        name: "description",
        content:
          "Learn about JL Closets — over 30 years designing and installing custom closets, pantries, and storage systems across South Florida.",
      },
    ],
  }),
  component: About,
});

function About() {
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
        <AboutHeroSection onConsultOpen={() => setConsultOpen(true)} />
        <AboutIntroSection />
        <WhyChooseUsV2 title="Why Homeowners Choose JL Closets" cards={ABOUT_CARDS} />
        <ProcessSection />
        <ReviewsSection onVideoOpen={setVideoUrl} />
        <ShowroomSection />
        <ServiceAreasSection />
        <InspirationSection />
        <FaqSection />
        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
      <VideoModal url={videoUrl} onClose={() => setVideoUrl(null)} />
    </div>
  );
}

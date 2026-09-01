import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { ContactForm } from "@/components/forms/ContactForm";
import { ShowroomSection } from "@/components/sections/ShowroomSection";
import { GoogleProfileSection } from "@/components/sections/GoogleProfileSection";
import { SocialMediaSection } from "@/components/sections/SocialMediaSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { AreaSearchSection } from "@/components/sections/AreaSearchSection";
import { FaqSection, type FaqItem } from "@/components/sections/FaqSection";
import { LearnMoreSection } from "@/components/sections/LearnMoreSection";
import { ConsultModal } from "@/components/modals/LazyConsultModal";
import { VideoModal } from "@/components/modals/VideoModal";
import { pageHead } from "@/lib/pageHead";

const CONTACT_FAQS: FaqItem[] = [
  {
    q: "How do I schedule a design consultation?",
    a: "You can schedule a free design consultation through our online scheduling tool here, or contact us directly by phone or email.",
  },
  {
    q: "Where is your showroom located?",
    a: "Our showroom is located in Boca Raton. You can find the address and directions here.",
  },
  {
    q: "Do you serve my area?",
    a: "JL Closets serves homeowners throughout South Florida. Use the search form above or check our Areas We Serve section to see if we cover your location.",
  },
  {
    q: "What services do you offer?",
    a: "We offer custom closet design, pantry organization, home office solutions, garage storage, and more. Learn about our services here.",
  },
  {
    q: "How can I see examples of your work?",
    a: "You can visit our showroom in Boca Raton or view our portfolio online. Contact us for more information.",
  },
  {
    q: "Why choose JL Closets over other closet companies?",
    a: "We are South Florida's highest-rated custom closet company, known for premium materials, expert craftsmanship, and unmatched design solutions.",
  },
  {
    q: "What types of custom closets do you offer?",
    a: "We specialize in luxury walk-in closets, reach-in closets, wardrobe systems, and tailored storage solutions for every space.",
  },
];

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact JL Closets | Schedule Your Free Consultation",
      description: "Contact JL Closets in Boca Raton. Schedule a free in-home consultation for custom closets, pantries, and storage solutions across South Florida.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const [consultOpen, setConsultOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (!mainRef.current) return;
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | null = null;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>("section, .gsap-section", mainRef.current!);
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true,
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".gsap-stagger", mainRef.current!).forEach((container) => {
          const children = container.children;
          gsap.fromTo(
            children,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                once: true,
              },
            }
          );
        });
      }, mainRef.current!);
    })();

    return () => { ctx?.revert(); };
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-clip">
      <Header onConsultOpen={() => setConsultOpen(true)} variant="light" />

      <main ref={mainRef}>
        <div className="pt-32 md:pt-40" />
        <PageBreadcrumbs />

        <SectionWrapper className="gsap-section">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-14 reveal-up" style={{ animationDelay: "0ms" }}>
              <span className="rule eyebrow" style={{ color: "#313131" }}>Contact Us</span>
            </div>
            <h1 className="font-sans text-3xl md:text-4xl leading-tight text-center mb-6 reveal-up" style={{ color: "#313131", animationDelay: "150ms" }}>
              <strong className="font-bold">Contact JL Closets</strong> — The Best Custom Closet Company Near You
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-14 reveal-up" style={{ color: "#313131", animationDelay: "300ms" }}>
              At JL Closets Boca Raton, we design and install the best custom closets in South Florida. Known for luxury craftsmanship, premium materials, and expert closet design, we create tailored walk-in closets, reach-in storage, wardrobe systems, and home organization solutions that maximize space and style.
            </p>

            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-3">
                <p className="font-sans text-2xl md:text-3xl leading-snug mb-4">
                  Book a <strong className="font-bold">complimentary consultation</strong> now.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </SectionWrapper>

        <ShowroomSection />
        <GoogleProfileSection />
        <SocialMediaSection />
        <ServiceAreasSection className="md:!pb-6" />
        <AreaSearchSection />
        <LearnMoreSection />
        <FaqSection faqs={CONTACT_FAQS} footer={null} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
      <VideoModal url={videoUrl} onClose={() => setVideoUrl(null)} />
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

import consultationImg from "@/assets/shared/in-home-consultation.webp";
import faqImg from "@/assets/contact/faq.webp";
import designImg from "@/assets/shared/design-and-drafting.webp";
import portfolioImg from "@/assets/portfolio/wellington-residence-07.webp";
import areasImg from "@/assets/shared/why-frame-1.webp";
import showroomImg from "@/assets/contact/showroom.webp";

type Topic = { title: string; desc: string; img: string; href: string };

const TOPICS: Topic[] = [
  {
    title: "Schedule a Consultation",
    desc: "Book a free, no-obligation design consultation with one of our expert designers.",
    img: consultationImg,
    href: "/contact",
  },
  {
    title: "Browse Our FAQs",
    desc: "Find quick answers about pricing, materials, installation, and warranty coverage.",
    img: faqImg,
    href: "/faq",
  },
  {
    title: "See Our Design Process",
    desc: "From the first sketch to the final walkthrough — how every JL Closets project comes together.",
    img: designImg,
    href: "/design-process",
  },
  {
    title: "Explore Our Portfolio",
    desc: "Browse real closets, pantries, and storage rooms we've completed across South Florida.",
    img: portfolioImg,
    href: "/portfolio",
  },
  {
    title: "Check Service Areas",
    desc: "See if we serve your city across Palm Beach, Broward, Miami-Dade, and beyond.",
    img: areasImg,
    href: "/service-areas",
  },
  {
    title: "Visit Our Showroom",
    desc: "Touch our finishes and see full closet systems in person at our Boca Raton showroom.",
    img: showroomImg,
    href: "/showroom",
  },
];

export function CustomerServiceTopicsSection() {
  return (
    <SectionWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gsap-stagger">
          {TOPICS.map((t) => (
            <Link key={t.title} to={t.href} className="group block relative overflow-hidden rounded-lg">
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <img
                  src={t.img}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white/75 text-xs font-medium mb-1.5 leading-relaxed">{t.desc}</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-sans text-xl font-bold text-white">{t.title}</span>
                    <div className="w-8 h-8 shrink-0 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import darkOffice from "@/assets/dark-office.jpg";
import library from "@/assets/library.jpg";
import consult from "@/assets/consult.jpg";

const CARDS = [
  { title: "Careers", desc: "Join our growing team of experts", img: darkOffice, href: "#" },
  { title: "FAQ", desc: "Answers to common questions", img: library, href: "/about" },
  { title: "Warranty", desc: "Our commitment to quality", img: consult, href: "#" },
];

export function LearnMoreSection() {
  return (
    <SectionWrapper>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-sans text-2xl md:text-3xl font-bold text-center mb-10 md:mb-14" style={{ color: "#313131" }}>
          Learn more about us.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gsap-stagger">
          {CARDS.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group block relative overflow-hidden rounded-lg"
            >
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white/70 text-xs font-medium mb-1">{card.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xl font-bold text-white">
                      {card.title}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

export type AccessoryCard = { title: string; desc: string; image: string; href?: string };

export function PremiumAccessoriesSection({
  title = "Premium Accessories",
  cards,
  columns = 4,
}: {
  title?: string;
  cards: AccessoryCard[];
  columns?: 4 | 5;
}) {
  return (
    <SectionWrapper>
      <div className="text-center mb-10 md:mb-14 reveal-up">
        <h2 className="rule eyebrow" style={{ color: "#313131" }}>{title}</h2>
      </div>
      <p className="text-center max-w-2xl mx-auto font-sans text-2xl md:text-3xl leading-snug mb-10 md:mb-14 reveal-up" style={{ color: "#313131" }}>
        Select from our <strong className="font-bold underline-animate">curated collection</strong> of smart accessories to <strong className="font-bold underline-animate">personalize your space</strong> and refine your daily organization.
      </p>

      <div className={`grid grid-cols-1 md:grid-cols-2 ${columns === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-6 reveal-up`}>
        {cards.map((c) => (
          <div key={c.title} className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
            <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-sans text-xl font-bold text-white mb-1">{c.title}</p>
              {/* Fixed height so the gap before the link stays the same
                  across cards even if a desc runs long enough to wrap. */}
              <p className="text-white/80 text-sm leading-relaxed mb-2 min-h-[1.4rem] line-clamp-1">{c.desc}</p>
              <a
                href={c.href ?? "#"}
                className="group inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-widest uppercase hover:text-white hover:underline transition-colors duration-300"
              >
                Discover
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

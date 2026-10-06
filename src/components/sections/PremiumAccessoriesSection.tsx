import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { MobileCarousel } from "@/components/common/MobileCarousel";

export type AccessoryCard = { title: string; desc: string; image: string; href?: string };

function AccessoryCard({ card: c }: { card: { title: string; desc: string; image: string; href?: string } }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg">
      <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-sans text-xl font-bold text-white mb-1">{c.title}</p>
        {/* Fixed height so the gap before the link stays the same across
            cards even if a desc runs long enough to wrap. */}
        <p className="text-white/80 text-sm leading-relaxed mb-2 min-h-[1.4rem] line-clamp-1">{c.desc}</p>
        <a
          href={c.href ?? "#"}
          className="group inline-flex items-center gap-1.5 text-white text-xs font-bold tracking-widest uppercase hover:underline transition-colors duration-300"
        >
          Discover
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

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
        <h2 className="rule eyebrow" style={{ color: "#1B1B1B" }}>{title}</h2>
      </div>
      <p className="text-center max-w-2xl mx-auto font-sans text-2xl md:text-3xl leading-snug mb-10 md:mb-14 reveal-up" style={{ color: "#1B1B1B" }}>
        Select from our <strong className="font-bold underline-animate">curated collection</strong> of smart accessories to <strong className="font-bold underline-animate">personalize your space</strong> and refine your daily organization.
      </p>

      {/* On a phone these cards stack into a very tall column, so mobile
          gets one card per slide. */}
      <MobileCarousel count={cards.length} label="accessory" className="md:hidden reveal-up" slideClassName="w-[82vw] max-w-[380px]">
        {cards.map((c) => (
          <AccessoryCard key={c.title} card={c} />
        ))}
      </MobileCarousel>

      <div className={`hidden md:grid md:grid-cols-2 ${columns === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-6 reveal-up`}>
        {cards.map((c) => (
          <AccessoryCard key={c.title} card={c} />
        ))}
      </div>
    </SectionWrapper>
  );
}

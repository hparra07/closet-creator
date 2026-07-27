import { SectionWrapper } from "@/components/common/SectionWrapper";
import { YellowButton } from "@/components/common/YellowButton";

export type AccessoryCard = { title: string; desc: string; image: string; href?: string };

export function PremiumAccessoriesSection({
  title = "Premium Accessories",
  cards,
}: {
  title?: string;
  cards: AccessoryCard[];
}) {
  return (
    <SectionWrapper>
      <div className="text-center mb-10 md:mb-14 reveal-up">
        <span className="rule eyebrow" style={{ color: "#313131" }}>{title}</span>
      </div>
      <p className="text-center max-w-2xl mx-auto font-sans text-2xl md:text-3xl leading-snug mb-10 md:mb-14 reveal-up" style={{ color: "#313131" }}>
        Select from our <strong className="font-bold underline-animate">curated collection</strong> of smart accessories to <strong className="font-bold underline-animate">personalize your space</strong> and refine your daily organization.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-up">
        {cards.map((c) => (
          <div key={c.title} className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
            <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-sans text-xl font-bold text-white mb-1">{c.title}</p>
              <p className="text-white/80 text-sm leading-relaxed mb-4">{c.desc}</p>
              <YellowButton href={c.href ?? "#"}>Discover</YellowButton>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

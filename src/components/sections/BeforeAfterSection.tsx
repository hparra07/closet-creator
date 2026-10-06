import { SectionWrapper } from "@/components/common/SectionWrapper";
import { BeforeAfterSlider } from "@/components/common/BeforeAfterSlider";
import { MobileCarousel } from "@/components/common/MobileCarousel";

export type BeforeAfterItem = { title: string; before: string; after: string; beforeFilter?: string };

export function BeforeAfterSection({
  title = "Before & After",
  intro = "Drag the slider to see the difference — real spaces, reimagined with custom-designed storage.",
  items,
}: {
  title?: string;
  intro?: string;
  items: BeforeAfterItem[];
}) {
  return (
    <SectionWrapper>
      <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14 reveal-up">
        <h2 className="rule eyebrow mb-6" style={{ color: "#1B1B1B" }}>{title}</h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: "#1B1B1B" }}>{intro}</p>
      </div>

      {/* Stacking three sliders makes for a very long scroll on a phone, so
          mobile gets one slider per slide instead. */}
      <MobileCarousel count={items.length} label="before and after" className="md:hidden reveal-up" arrows>
        {items.map((item) => (
          <div key={item.title}>
            <BeforeAfterSlider beforeImage={item.before} afterImage={item.after} beforeFilter={item.beforeFilter} />
            <p className="mt-4 text-center font-sans text-lg font-bold" style={{ color: "#1B1B1B" }}>
              {item.title}
            </p>
          </div>
        ))}
      </MobileCarousel>

      <div className="hidden md:grid md:grid-cols-3 gap-8 reveal-up">
        {items.map((item) => (
          <div key={item.title}>
            <BeforeAfterSlider beforeImage={item.before} afterImage={item.after} beforeFilter={item.beforeFilter} />
            <p className="mt-4 text-center font-sans text-lg font-bold" style={{ color: "#1B1B1B" }}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

import { SectionWrapper } from "@/components/common/SectionWrapper";

// Two-column "story" block — eyebrow, heading, a few paragraphs, and a
// portrait image alongside. Shared by About Us ("Our Story") and Service
// Areas so both get the same premium layout with their own copy/image.
export function StoryIntroSection({
  eyebrow,
  title,
  paragraphs,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  paragraphs: React.ReactNode[];
  image: string;
  imageAlt: string;
}) {
  return (
    <SectionWrapper>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <span className="rule eyebrow mb-6" style={{ color: "#313131" }}>{eyebrow}</span>
          <h2 className="font-sans text-3xl md:text-4xl leading-tight mb-6 reveal-up">
            {title}
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "#313131" }}>
            {paragraphs.map((p, i) => (
              <p key={i} className="reveal-up">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="relative reveal-up">
          <img
            src={image}
            alt={imageAlt}
            className="w-full aspect-[4/5] object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

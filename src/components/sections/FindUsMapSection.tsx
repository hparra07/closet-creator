import { SectionWrapper } from "@/components/common/SectionWrapper";

const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=JL+Closets,160+NW+16th+St,Boca+Raton,FL+33432&output=embed";

export function FindUsMapSection() {
  return (
    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14 reveal-up">
        <h2 className="rule eyebrow mb-6" style={{ color: "#313131" }}>Find Us</h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: "#313131" }}>
          We proudly serve <strong className="font-bold underline-animate">a wide swath of South Florida</strong> — from Miami to Naples, our custom storage solutions are just around the corner.
        </p>
      </div>

      <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl reveal-up">
        <iframe
          src={MAPS_EMBED_SRC}
          title="JL Closets on Google Maps"
          width="100%"
          height="450"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </SectionWrapper>
  );
}

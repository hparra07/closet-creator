import { Phone } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

export function FaqCtaSection({
  image,
  imageAlt,
  title = "Didn't See Your Question?",
  subtitle = "Feel free to reach out by calling us.",
}: {
  image: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-sans text-3xl md:text-4xl font-bold mb-3 reveal-up" style={{ color: "#313131" }}>
          {title}
        </h2>
        <p className="text-base md:text-lg mb-7 reveal-up" style={{ color: "#313131" }}>
          {subtitle}
        </p>
        <a
          href="tel:+15619129881"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border font-sans text-sm font-semibold hover:bg-primary hover:border-primary transition reveal-up"
          style={{ color: "#313131", borderColor: "#31313130" }}
        >
          <Phone className="w-4 h-4" />
          (561) 912-9881
        </a>
      </div>

      <div className="max-w-5xl mx-auto mt-10 reveal-up">
        <img
          src={image}
          alt={imageAlt}
          className="w-full aspect-[16/9] md:aspect-[21/9] object-cover rounded-3xl"
          loading="lazy"
        />
      </div>
    </SectionWrapper>
  );
}

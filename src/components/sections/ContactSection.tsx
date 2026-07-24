import { SectionWrapper } from "@/components/common/SectionWrapper";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactSection() {
  return (
    <SectionWrapper>
      <div className="text-center mb-14 md:mb-20 reveal-up">
        <span className="rule eyebrow" style={{ color: "#313131" }}>Start your transformation</span>
      </div>
      <div className="grid md:grid-cols-12 gap-12 max-w-6xl mx-auto reveal-up">
        <div className="md:col-span-3">
          <p className="font-sans text-3xl leading-snug mb-4">
            Get your custom design and quote <strong className="font-bold">in just a few steps.</strong>
          </p>
        </div>
        <ContactForm />
      </div>
    </SectionWrapper>
  );
}

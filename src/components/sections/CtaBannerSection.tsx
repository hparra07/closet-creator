import ctaBg from "@/assets/global/cta-background.jpeg";
import { YellowButton } from "@/components/common/YellowButton";

export function CtaBannerSection({ onConsultOpen }: { onConsultOpen: () => void }) {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <img
        src={ctaBg}
        alt=""
        className="absolute inset-0 w-full h-full object-contain hidden lg:block"
        loading="lazy"
      />

      <div className="relative z-10 flex flex-col items-start text-left px-6 md:pl-[16%] max-w-3xl">
        <h2 className="font-sans text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ color: "#313131" }}>
          Ready to Transform Your Space?
        </h2>
        <p className="text-base md:text-lg leading-relaxed max-w-lg mb-8" style={{ color: "#313131" }}>
          Book your FREE consultation today - <strong className="font-semibold">WITH NO OBLIGATION!</strong> Join thousands of satisfied homeowners who've discovered the JL Closets difference.
        </p>
        <YellowButton onClick={onConsultOpen} size="lg">Book a Complimentary Consultation</YellowButton>
        <p className="text-xs mt-3" style={{ color: "#313131", opacity: 0.5 }}>We'll never share your info with anyone.</p>
      </div>
    </section>
  );
}

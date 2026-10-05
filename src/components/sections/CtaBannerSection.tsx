import { PrimaryButton } from "@/components/common/PrimaryButton";

/**
 * Closing CTA: centred, on the light pink ground, pairing the primary
 * consultation action with a tel: link for people who would rather call.
 */
export function CtaBannerSection({ onConsultOpen }: { onConsultOpen: () => void }) {
  return (
    <section className="py-24 md:py-32 px-5" style={{ backgroundColor: "#FAF3F4" }}>
      <div className="max-w-5xl mx-auto text-center">
        <span className="rule eyebrow mb-6 reveal-up" style={{ color: "#1B1B1B" }}>
          Let's Create a More Organized Home
        </span>

        <h2
          className="font-display text-3xl md:text-5xl font-bold leading-tight mt-6 mb-10 md:whitespace-nowrap reveal-up"
          style={{ color: "#1B1B1B" }}
        >
          Ready to make more of your space?
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 reveal-up">
          <PrimaryButton
            onClick={onConsultOpen}
            className="!px-12 !py-2 !text-base sm:min-w-[300px]"
          >
            Request Your Free Consultation
          </PrimaryButton>

          <a
            href="tel:+15619129881"
            className="inline-flex flex-col items-center justify-center px-12 py-2 border rounded-lg font-sans text-base font-semibold leading-tight transition-colors duration-300 hover:bg-white sm:min-w-[300px]"
            style={{ color: "#7B1A30", borderColor: "#7B1A30" }}
          >
            Call for a Free Consultation
            <span className="font-bold">561.912.9881</span>
          </a>
        </div>

        <p className="text-sm leading-relaxed mt-8 max-w-xl mx-auto reveal-up" style={{ color: "#555555" }}>
          There's no obligation and no pressure. Just a conversation about your space, your goals, and what's possible.
        </p>
      </div>
    </section>
  );
}

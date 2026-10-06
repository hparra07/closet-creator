import { PrimaryButton } from "@/components/common/PrimaryButton";

/**
 * Closing CTA: centred, on the light pink ground, pairing the primary
 * consultation action with a tel: link for people who would rather call.
 * A single flex gap drives the vertical rhythm so every block is spaced
 * identically, rather than each element carrying its own margin.
 */
export function CtaBannerSection({ onConsultOpen }: { onConsultOpen: () => void }) {
  return (
    <section className="py-24 md:py-32 px-5" style={{ backgroundColor: "#FAF3F4" }}>
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        <span className="rule eyebrow reveal-up" style={{ color: "#1B1B1B" }}>
          Let's Create a More Organized Home
        </span>

        <h2
          className="font-display text-3xl md:text-5xl font-normal leading-tight md:whitespace-nowrap reveal-up"
          style={{ color: "#1B1B1B" }}
        >
          Ready to make more of your space?
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 reveal-up">
          <PrimaryButton
            onClick={onConsultOpen}
            className="!px-12 !py-2 !text-base min-h-[58px] sm:min-w-[300px]"
          >
            Request Your Free Consultation
          </PrimaryButton>

          <a
            href="tel:+15619129881"
            className="inline-flex flex-col items-center justify-center px-12 py-2 border rounded-lg font-sans text-base font-semibold leading-tight transition-colors duration-300 hover:bg-white min-h-[58px] sm:min-w-[300px]"
            style={{ color: "#7B1A30", borderColor: "#7B1A30" }}
          >
            Call for a Free Consultation
            <span className="font-bold">561.912.9881</span>
          </a>
        </div>

        <p className="text-sm leading-relaxed md:whitespace-nowrap reveal-up" style={{ color: "#555555" }}>
          There's no obligation and no pressure. Just a conversation about your space, your goals, and what's possible.
        </p>
      </div>
    </section>
  );
}

import { useState, Children, isValidElement, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

export type FaqItem = { q: string; a: React.ReactNode };

function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return Children.toArray(node).map(nodeToText).join(" ");
  if (isValidElement(node)) return nodeToText((node.props as { children?: ReactNode }).children);
  return "";
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "How long does the custom storage solution process take from start to finish?",
    a: "At JL Closets, we strive to make the custom storage solution process as smooth and efficient as possible. Typically, from your initial consultation to the final installation, it takes about 4 to 6 weeks. This timeline includes design, approval, production, and installation, ensuring every detail meets our high standards and your specific needs.",
  },
  {
    q: "Do you offer free in-home consultations?",
    a: "Yes, we do! We believe that seeing your space in person is crucial to understanding your unique needs. Our experienced designers will come to your home, assess your storage challenges, and discuss your vision-all at no cost to you. This personalized approach allows us to create a custom solution that fits perfectly with your lifestyle and space.",
  },
  {
    q: "What areas of South Florida do you serve?",
    a: (
      <p>
        We proudly serve a wide area across South Florida, including Palm Beach, Lee, Martin, Broward, Collier, and Miami-Dade counties. Whether you're in Boca Raton, Fort Lauderdale, Miami, Naples, or any surrounding areas, our team is ready to bring exceptional custom storage solutions right to your doorstep. If you are outside of our service areas, please give us a call at{" "}
        <a href="tel:+15619129881" className="text-primary hover:underline">(561) 912-9881</a> to discuss the particulars.
      </p>
    ),
  },
  {
    q: "Can you work with small or awkward spaces?",
    a: "Absolutely! We specialize in maximizing storage space, even in compact rooms and unique layouts. Our designers love a good challenge and will work closely with you to maximize every inch of your space, turning even the most difficult areas into beautifully organized solutions. In fact, please visit our Small Space Storage Solutions to see what transformation we can bring to small and awkward spaces.",
  },
  {
    q: "What kind of warranty do you offer on your products?",
    a: "We stand behind the quality of our work and materials, offering a comprehensive warranty on all our custom storage solutions. Our products come with a lifetime warranty, giving you peace of mind that your investment is protected and ensuring you enjoy your custom closets and storage systems for years to come. Please see our Warranty for more information.",
  },
];

export function FaqSection({
  faqs = DEFAULT_FAQS,
  footer,
  title = "Frequently Asked Questions",
  subtitle,
}: {
  faqs?: FaqItem[];
  footer?: React.ReactNode;
  title?: string;
  subtitle?: string;
} = {}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: nodeToText(faq.a).replace(/\s+/g, " ").trim(),
      },
    })),
  };

  return (
    <SectionWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto">
        {title && (
          <div className="text-center mb-10 md:mb-14">
            <h2 className="rule eyebrow" style={{ color: "#313131" }}>{title}</h2>
            {subtitle && (
              <p className="mt-4 font-sans text-lg md:text-xl leading-snug" style={{ color: "#313131" }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="divide-y divide-foreground/10">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i}>
                <h3 className="m-0">
                  <button
                    className="w-full flex items-center justify-between py-5 md:py-6 text-left cursor-pointer group"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-base md:text-lg font-semibold pr-8 leading-snug group-hover:opacity-70 transition-opacity">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? "2000px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="pb-6 text-base leading-relaxed pr-12 space-y-3" style={{ color: "#313131" }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {footer !== undefined ? footer : (
          <p className="italic text-sm leading-relaxed mt-10" style={{ color: "#313131" }}>
            At JL Closets, we're more than just a custom storage solution provider – we're your partner in creating a home that's beautifully organized, functional, and uniquely yours. Let us help you simplify your life and transform your space. Contact us today to get started on your custom storage journey.
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}

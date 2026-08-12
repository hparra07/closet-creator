import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import enjoyLife from "@/assets/shared/enjoy-life.webp";
import designAndDrafting from "@/assets/shared/design-and-drafting.webp";
import expertInstallations from "@/assets/shared/expert-installations.webp";
import inHomeConsultation from "@/assets/shared/in-home-consultation.webp";

type ProcessStep = { k: string; t: string; d: string; img: string };

const STEPS: ProcessStep[] = [
  {
    k: "1.",
    t: "In-Home Consultation",
    d: "We assess your space and vision to design a tailored storage solution that fits your lifestyle.",
    img: inHomeConsultation,
  },
  {
    k: "2.",
    t: "Design & Precision Drafting",
    d: "We transform your vision into a detailed 3D designs and meticulously craft your system using premium materials.",
    img: designAndDrafting,
  },
  {
    k: "3.",
    t: "Expert Installations",
    d: "Highly trained professionals handle your installation with the utmost care, keeping your informed until you are entirely satisfied.",
    img: expertInstallations,
  },
  {
    k: "4.",
    t: "Enjoy Organized Living",
    d: "Step into a beautifully organized space where every item has its place, designed for flawless performance and lasting style.",
    img: enjoyLife,
  },
];

function ProcessScroller({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const compute = () => {
      const anchor = window.innerHeight * 0.55;
      let bestIdx = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - anchor);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [steps.length]);

  return (
    <>
      <div className="md:hidden space-y-16">
        {steps.map((s, i) => (
          <div key={i}>
            <div className="relative w-full aspect-[4/3] overflow-hidden mb-6">
              <img src={s.img} alt={s.t} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="eyebrow mb-3 text-foreground/60">{s.k}</p>
            <h3 className="font-display text-4xl leading-tight mb-4 font-bold text-[#313131]">{s.t}</h3>
            <p className="text-base leading-relaxed text-foreground/70">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="md:sticky md:top-0 md:h-screen md:max-h-[900px] md:flex md:items-center md:pt-4">
          <div className="relative w-full aspect-[4/5] max-h-full overflow-hidden">
            {steps.map((s, i) => (
              <img
                key={i}
                src={s.img}
                alt={s.t}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: active === i ? 1 : 0 }}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="md:py-[10vh] space-y-[20vh]">
          {steps.map((s, i) => (
            <div
              key={i}
              data-idx={i}
              ref={(el) => { refs.current[i] = el; }}
              className="transition-opacity duration-300"
              style={{ opacity: active === i ? 1 : 0.2 }}
            >
              <p className="eyebrow mb-3 text-foreground/60">{s.k}</p>
              <h3 className="font-display text-4xl md:text-5xl leading-tight mb-4 font-bold text-[#313131]">{s.t}</h3>
              <p className="text-base md:text-lg leading-relaxed max-w-md text-foreground/70">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function ProcessSection() {
  return (
    <SectionWrapper>
      <div className="text-center mb-10 md:mb-14 reveal-up">
        <h2 className="rule eyebrow" style={{ color: "#313131" }}>Our Process</h2>
      </div>
      <p className="text-center max-w-2xl mx-auto font-sans text-2xl md:text-3xl leading-snug mb-10 md:mb-14 reveal-up">
        From the first sketch to the final installation, our step-by-step approach ensures a seamless experience and a storage solution tailored to your life.
      </p>
      <ProcessScroller steps={STEPS} />
    </SectionWrapper>
  );
}

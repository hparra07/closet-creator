import { useEffect, useRef } from "react";
import { Home, PenTool, Wrench, Sparkles, type LucideIcon } from "lucide-react";
import inHomeConsultation from "@/assets/shared/in-home-consultation.webp";
import designAndDrafting from "@/assets/shared/design-and-drafting.webp";
import expertInstallations from "@/assets/shared/expert-installations.webp";
import enjoyLife from "@/assets/shared/enjoy-life.webp";

type Step = { num: string; title: string; blurb: string; paragraphs: string[]; img: string; imgAlt: string; icon: LucideIcon };

const STEPS: Step[] = [
  {
    num: "01",
    title: "In-Home Consultation",
    blurb: "A designer visits your home to understand your vision, assess the space, and take precise measurements.",
    paragraphs: [
      "Every project starts with a complimentary, no-obligation consultation. One of our designers visits your home to understand your vision, assess the space, and take precise measurements.",
      "We ask about your daily routines and storage frustrations so the system we design solves real problems — not just fills space.",
    ],
    img: inHomeConsultation,
    imgAlt: "JL Closets designer during an in-home consultation",
    icon: Home,
  },
  {
    num: "02",
    title: "Collaborative 3D Design",
    blurb: "We turn your consultation notes into a full 3D render, so you see your space before a panel is cut.",
    paragraphs: [
      "Using state-of-the-art 3D modeling software, we turn your consultation notes into a full render of your future closet, pantry, or storage room.",
      "You'll see exactly how your space will look and function before a single panel is cut, with room to adjust the layout, finishes, and accessories until it's right.",
    ],
    img: designAndDrafting,
    imgAlt: "3D design and drafting for a custom closet system",
    icon: PenTool,
  },
  {
    num: "03",
    title: "Expert Installation",
    blurb: "Our craftsmen build your system using premium materials, then install it with white-glove care.",
    paragraphs: [
      "Once your design is approved, our craftsmen build your system using premium, humidity-resistant materials selected for South Florida's climate.",
      "Our white-glove installation team handles every panel and drawer with care, keeping you informed at every step and protecting your home throughout the process.",
    ],
    img: expertInstallations,
    imgAlt: "JL Closets installation team completing a custom closet",
    icon: Wrench,
  },
  {
    num: "04",
    title: "Enjoy Organized Living",
    blurb: "After a final walkthrough, it's time to enjoy a space where everything finally has its place.",
    paragraphs: [
      "After a final walkthrough to confirm every detail meets our standards, it's time to enjoy a space where everything finally has its place.",
      "We've been South Florida's trusted source for custom storage since 1991 — and we're honored to help you experience organized living.",
    ],
    img: enjoyLife,
    imgAlt: "Beautifully organized custom closet by JL Closets",
    icon: Sparkles,
  },
];

export function DesignProcessSection() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches || !wrapRef.current) return;

    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | null = null;
    let cancelled = false;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const total = STEPS.length;

        gsap.set(imgRefs.current, { opacity: 0, scale: 1.08 });
        gsap.set(imgRefs.current[0], { opacity: 1, scale: 1 });
        gsap.set(stepRefs.current, { opacity: 0.35 });
        gsap.set(stepRefs.current[0], { opacity: 1 });
        gsap.set(fillRefs.current, { scaleY: 0 });
        numRefs.current.forEach((el, i) => {
          if (el) el.style.color = i === 0 ? "#F1C33A" : "#31313166";
        });

        // The image column is a native CSS `sticky` element (no GSAP pin
        // math involved) — ScrollTrigger only reads scroll progress across
        // the tall wrapper and drives the crossfade/highlight off that one
        // progress value, so there's nothing for a pin/spacer calculation
        // to get wrong.
        ScrollTrigger.create({
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const raw = self.progress * (total - 1);
            const idx = Math.min(total - 1, Math.round(raw));

            // Images: exactly two are ever in play (current + next), and
            // the crossfade between them is compressed into a short window
            // in the middle of each step's scroll range — settled/fully
            // visible before and after — so opacities always sum to 1 and
            // the swap reads as quick rather than a slow dissolve.
            const floorIdx = Math.min(total - 2, Math.floor(raw));
            const frac = Math.min(1, Math.max(0, raw - floorIdx));
            const t = Math.min(1, Math.max(0, (frac - 0.3) / 0.4));

            for (let i = 0; i < total; i++) {
              const local = Math.max(0, 1 - Math.abs(raw - i));
              const imgOpacity = i === floorIdx ? 1 - t : i === floorIdx + 1 ? t : 0;
              if (imgRefs.current[i]) gsap.set(imgRefs.current[i], { opacity: imgOpacity, scale: 1.08 - 0.08 * imgOpacity });
              if (stepRefs.current[i]) gsap.set(stepRefs.current[i], { opacity: 0.35 + 0.65 * local });
              if (numRefs.current[i]) numRefs.current[i]!.style.color = i === idx ? "#F1C33A" : "#31313166";
              if (fillRefs.current[i]) fillRefs.current[i]!.style.transform = `scaleY(${i <= idx ? 1 : 0})`;
            }
          },
        });
      }, wrapRef.current!);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="relative">
      {/* Mobile / tablet: simple stacked steps, no pinning */}
      <div className="md:hidden px-5 py-10 space-y-16">
        {STEPS.map((s, i) => (
          <div key={i}>
            <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 rounded-2xl">
              <img src={s.img} alt={s.imgAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-5 h-5" style={{ color: "#F1C33A" }} />
              <span className="font-sans text-sm font-bold" style={{ color: "#F1C33A" }}>{s.num}</span>
            </div>
            <h3 className="font-display text-3xl leading-tight mb-4 font-bold" style={{ color: "#313131" }}>{s.title}</h3>
            {s.paragraphs.map((p, pi) => (
              <p key={pi} className="text-base leading-relaxed mb-3" style={{ color: "#313131", opacity: 0.8 }}>{p}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop: tall wrapper + sticky panel — image crossfades on the left, steps dim/highlight on the right */}
      <div ref={wrapRef} className="hidden md:block relative" style={{ height: `${STEPS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative h-full flex items-center p-8 lg:p-14">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                {STEPS.map((s, i) => (
                  <img
                    key={i}
                    ref={(el) => { imgRefs.current[i] = el; }}
                    src={s.img}
                    alt={s.imgAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ))}
              </div>
            </div>

            <div className="relative h-full flex flex-col justify-center px-12 lg:px-20 gap-10">
              {STEPS.map((s, i) => (
                <div key={i} ref={(el) => { stepRefs.current[i] = el; }} className="flex items-start gap-6">
                  <div className="flex flex-col items-center gap-3 pt-1 shrink-0">
                    <s.icon className="w-6 h-6" style={{ color: "#F1C33A" }} />
                    <span ref={(el) => { numRefs.current[i] = el; }} className="font-sans text-sm font-bold">
                      {s.num}
                    </span>
                    <div className="relative w-[2px] h-14 rounded-full overflow-hidden" style={{ background: "#31313120" }}>
                      <div
                        ref={(el) => { fillRefs.current[i] = el; }}
                        className="absolute inset-0 origin-top"
                        style={{ background: "#F1C33A" }}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl lg:text-3xl leading-tight mb-2 font-bold" style={{ color: "#313131" }}>{s.title}</h3>
                    <p className="text-sm lg:text-base leading-relaxed max-w-sm" style={{ color: "#313131", opacity: 0.75 }}>{s.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

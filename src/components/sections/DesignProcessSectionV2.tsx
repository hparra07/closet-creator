import { useEffect, useRef } from "react";
import { Home, PenTool, Wrench, Sparkles, type LucideIcon } from "lucide-react";
import inHomeConsultation from "@/assets/shared/in-home-consultation.webp";
import designAndDrafting from "@/assets/shared/design-and-drafting.webp";
import expertInstallations from "@/assets/shared/expert-installations.webp";
import enjoyLife from "@/assets/shared/enjoy-life.webp";

type Step = { title: string; blurb: string; paragraphs: string[]; img: string; imgAlt: string; icon: LucideIcon };

const STEPS: Step[] = [
  {
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

export function DesignProcessSectionV2() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches || !wrapRef.current || !trackRef.current) return;

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

        gsap.set(trackRef.current, { xPercent: 0 });
        gsap.set(contentRefs.current, { opacity: 0, y: 30 });
        gsap.set(contentRefs.current[0], { opacity: 1, y: 0 });

        // Same safe pattern as the vertical version: CSS `sticky` owns the
        // layout, GSAP only reads scroll progress and imperatively sets
        // xPercent + per-panel content opacity off one source of truth.
        ScrollTrigger.create({
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const raw = self.progress * (total - 1);

            gsap.set(trackRef.current, { xPercent: -(raw / total) * 100 });

            for (let i = 0; i < total; i++) {
              const local = Math.max(0, 1 - Math.abs(raw - i));
              if (contentRefs.current[i]) gsap.set(contentRefs.current[i], { opacity: local, y: 30 * (1 - local) });
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
      {/* Mobile / tablet: same simple stacked steps as v1 */}
      <div className="md:hidden px-5 py-10 space-y-16">
        {STEPS.map((s, i) => (
          <div key={i}>
            <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 rounded-2xl">
              <img src={s.img} alt={s.imgAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-5 h-5" style={{ color: "#F1C33A" }} />
              <span className="font-sans text-base font-bold" style={{ color: "#F1C33A" }}>{i + 1}/{STEPS.length}</span>
            </div>
            <h3 className="font-display text-4xl leading-tight mb-4 font-bold" style={{ color: "#313131" }}>{s.title}</h3>
            {s.paragraphs.map((p, pi) => (
              <p key={pi} className="text-lg leading-relaxed mb-3" style={{ color: "#313131", opacity: 0.8 }}>{p}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop: tall wrapper + sticky viewport — the track slides horizontally, one full-bleed panel per step */}
      <div ref={wrapRef} className="hidden md:block relative" style={{ height: `${STEPS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div ref={trackRef} className="flex h-full" style={{ width: `${STEPS.length * 100}%` }}>
            {STEPS.map((s, i) => (
              <div key={i} className="relative h-full shrink-0" style={{ width: `${100 / STEPS.length}%` }}>
                <img
                  src={s.img}
                  alt={s.imgAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                {/* Dark scrim tall and strong enough to guarantee contrast
                    for the larger text, regardless of how bright the photo
                    is behind it. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent" />

                <div
                  ref={(el) => { contentRefs.current[i] = el; }}
                  className="absolute inset-x-0 bottom-0 px-12 lg:px-20 pb-16 lg:pb-20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <s.icon className="w-6 h-6 lg:w-7 lg:h-7 text-primary drop-shadow-md" />
                    <span className="font-sans text-base lg:text-lg font-bold text-primary">{i + 1}/{STEPS.length}</span>
                  </div>
                  <h3 className="font-display text-4xl lg:text-6xl leading-tight mb-5 font-bold text-white drop-shadow-md whitespace-nowrap">{s.title}</h3>
                  <p className="text-base lg:text-xl leading-relaxed text-white max-w-lg drop-shadow-md">{s.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

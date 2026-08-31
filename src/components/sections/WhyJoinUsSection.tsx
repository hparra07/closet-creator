import { useEffect, useRef } from "react";
import { Trophy, TrendingUp, Coins, GraduationCap, HeartHandshake, ShieldCheck, type LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

type Reason = { title: string; desc: string; icon: LucideIcon };

const REASONS: Reason[] = [
  { title: "Award-Winning Reputation", desc: "You'll be building your career at South Florida's most awarded custom closet company, trusted since 1991.", icon: Trophy },
  { title: "Real Growth, Real Opportunity", desc: "We're expanding across South Florida — which means genuine room to grow into bigger roles as we grow.", icon: TrendingUp },
  { title: "Competitive Pay & Commission", desc: "Industry-leading compensation with real earning potential tied directly to your performance.", icon: Coins },
  { title: "Training & Mentorship", desc: "Hands-on training from designers and installers who are invested in your success, not just your output.", icon: GraduationCap },
  { title: "A Team That Feels Like Family", desc: "Health coverage, paid time off, and a tight-knit crew that actually has your back.", icon: HeartHandshake },
  { title: "Stability You Can Build On", desc: "Over 30 years in business means real job security in an industry that's still growing.", icon: ShieldCheck },
];

export function WhyJoinUsSection() {
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

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
        const cols = colRefs.current.filter(Boolean) as HTMLDivElement[];
        gsap.set(cols, { opacity: 0, y: 40 });

        cols.forEach((col, i) => {
          const icon = col.querySelector(".why-row-icon");
          gsap.fromTo(
            col,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: col.parentElement, start: "top 85%" },
            }
          );
          gsap.fromTo(
            icon,
            { scale: 0.6, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: i * 0.08 + 0.1,
              ease: "back.out(2)",
              scrollTrigger: { trigger: col.parentElement, start: "top 85%" },
            }
          );
        });
      }, colRefs.current[0]?.parentElement ?? undefined);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <SectionWrapper>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 reveal-up">
          <h2 className="rule eyebrow" style={{ color: "#313131" }}>Why Join JL Closets?</h2>
        </div>

        {/* Mobile / tablet: stacked rows, icon beside text */}
        <div className="md:hidden divide-y divide-foreground/10">
          {REASONS.map((r) => (
            <div key={r.title} className="py-8 flex items-start gap-5">
              <r.icon className="w-8 h-8 shrink-0 mt-0.5" strokeWidth={1.5} style={{ color: "#F1C33A" }} />
              <div>
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#313131" }}>{r.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#313131", opacity: 0.75 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: wider 3-column layout, thin divider on the sides, description spans the full card width */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-x-12 md:gap-y-12 lg:gap-x-16 lg:gap-y-14">
          {REASONS.map((r, i) => (
            <div
              key={r.title}
              ref={(el) => { colRefs.current[i] = el; }}
              className={`flex flex-col ${i % 3 !== 0 ? "md:pl-12 lg:pl-16 md:border-l" : ""}`}
              style={{ borderColor: "#F1C33A66" }}
            >
              <div className="flex items-center gap-4 mb-3">
                <r.icon className="why-row-icon w-8 h-8 lg:w-9 lg:h-9 shrink-0" strokeWidth={1.5} style={{ color: "#F1C33A" }} />
                <h3 className="font-display text-lg lg:text-xl font-bold leading-tight" style={{ color: "#313131" }}>{r.title}</h3>
              </div>
              <p className="text-sm leading-relaxed w-full" style={{ color: "#313131", opacity: 0.75 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

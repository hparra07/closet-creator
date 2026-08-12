import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import whyFrame1 from "@/assets/shared/why-frame-1.webp";
import whyFrame2 from "@/assets/shared/why-frame-2.webp";
import whyFrame3 from "@/assets/shared/why-frame-3.webp";
import whyFrame4 from "@/assets/shared/why-frame-4.webp";

export function WhyChooseUsV1() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  const frames = [whyFrame1, whyFrame2, whyFrame3, whyFrame4];
  const frameOpacity = (i: number) => {
    const p = progress * 3;
    const d = Math.abs(p - i);
    return Math.max(0, 1 - d);
  };

  return (
    <section ref={sectionRef} className="relative text-ink-foreground h-[220vh] md:h-[350vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {frames.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[70%_center] md:object-center"
            style={{ opacity: frameOpacity(i), willChange: "opacity" }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:hidden" />
        <div className="relative h-full w-full flex flex-col">
          <h2 className="eyebrow text-center pt-24 md:pt-32 text-ink-foreground rule mx-auto w-fit">
            WHY CHOOSE US
          </h2>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-40 md:top-48 flex flex-col items-center gap-2 text-ink-foreground/80 pointer-events-none transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - progress * 4) }}
          >
            <span className="text-[10px] uppercase">Scroll to reveal</span>
            <span className="relative block w-5 h-8 rounded-full border border-ink-foreground/70">
              <span className="absolute left-1/2 top-1.5 -translate-x-1/2 w-0.5 h-1.5 bg-ink-foreground/80 rounded-full animate-[scroll-wheel_1.5s_ease-in-out_infinite]" />
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>

          <div
            className="mt-auto px-5 md:px-12 pb-8 md:pb-12 pt-6 max-w-[1600px] mx-auto w-full"
            style={{ textShadow: `0 2px 18px rgba(0,0,0,${Math.min(0.85, progress * 1.2)}), 0 1px 3px rgba(0,0,0,${Math.min(0.7, progress)})` }}
          >
            <p className="font-sans font-normal text-sm md:text-lg leading-snug max-w-5xl mb-5 md:mb-10 text-ink-foreground reveal-up">
              With over <strong className="font-bold">30 years of expertise</strong>, we are <strong className="font-bold">South Florida’s most awarded</strong> custom storage provider.
              Our commitment to quality, innovative design, and expert craftsmanship ensures a seamless
              experience tailored to your home.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-4 md:gap-8 border-t border-ink-foreground/30 pt-4 md:pt-8">
              {[
                ["Same-day or Next-day Free Consultation", "Get expert design at your doorstep with same-day or\nnext-day appointments."],
                ["Over 30 Years of Expertise", "South Florida’s oldest closet company, delivering inmatched reliability and professional service."],
                ["Florida’s Most Awarded", "8-Time Best Pick Top-rated for 8 consecutive years, reflecting our unwavering commitment to excellence."],
                ["Standing Behind Our Work", "Our quality extends for years, offering dedicated support and peace of mind after installation."],
                ["Customer-centric Aproach", "Professional and accommodating service designed to ensure a superior experience at every step."],
              ].map(([k, d], i) => (
                <div key={k} className="reveal-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <p className="font-display text-sm md:text-lg mb-1 md:mb-3 leading-tight text-ink-foreground font-bold">{k}</p>
                  <p className="text-[11px] md:text-xs leading-snug whitespace-pre-line text-white/90">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

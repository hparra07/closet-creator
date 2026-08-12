import { useEffect, useRef, useState } from "react";
import heroKitchen from "@/assets/home/hero-kitchen.webp";
import { YellowButton } from "@/components/common/YellowButton";

export function HeroSection({ onConsultOpen }: { onConsultOpen?: () => void }) {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const heroH = heroRef.current?.offsetHeight ?? window.innerHeight;
      setScrollY(Math.min(Math.max(y, 0), heroH));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={heroRef} className="relative h-[130vh] min-h-[900px] w-full overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-[160%] will-change-transform"
        style={{ transform: `translate3d(0, ${scrollY * -0.35}px, 0)` }}
      >
        <img
          src={heroKitchen}
          alt="Custom kitchen with bespoke wood cabinetry"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />
      </div>

      <div
        className="absolute left-5 right-5 md:left-16 md:right-16 top-[50vh] max-w-4xl text-ink-foreground will-change-transform"
        style={{
          transform: `translate3d(0, ${Math.min(
            scrollY,
            Math.max(0, (heroRef.current?.offsetHeight ?? 1100) - (typeof window !== "undefined" ? window.innerHeight : 800) * 0.55 - 320)
          )}px, 0)`,
        }}
      >
        <p className="mb-6 opacity-90 text-[15px] font-medium reveal-up" style={{ animationDelay: "0ms" }}>Let Us Create Your Calm™</p>
        <h1 className="font-sans font-medium text-[26px] sm:text-3xl md:text-5xl leading-[1.15] mb-8 reveal-up" style={{ animationDelay: "150ms" }}>
          Custom Closet Systems &amp;<br />
          Storage Solutions in South Florida.
        </h1>
        <div className="reveal-up" style={{ animationDelay: "300ms" }}>
          <YellowButton onClick={onConsultOpen} size="lg">Schedule a FREE Consultation</YellowButton>
        </div>
      </div>
    </header>
  );
}

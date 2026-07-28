import { useEffect, useRef, useState } from "react";
import aboutBanner from "@/assets/about/about-new.jpg";
import { YellowButton } from "@/components/common/YellowButton";

export function AboutHeroSection({ onConsultOpen }: { onConsultOpen?: () => void }) {
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
    <section ref={heroRef} className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-[140%] will-change-transform"
        style={{ transform: `translate3d(0, ${scrollY * -0.3}px, 0)` }}
      >
        <img
          src={aboutBanner}
          alt="Custom built-in library and shelving by JL Closets"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end px-5 md:px-16 pb-16 md:pb-24 max-w-4xl">
        <p className="mb-4 opacity-90 text-[13px] font-medium text-white tracking-widest uppercase reveal-up" style={{ animationDelay: "0ms" }}>Get to know us</p>
        <h1 className="font-sans font-medium text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 text-white reveal-up" style={{ animationDelay: "150ms" }}>
          The Best Custom Closet Company in South Florida.
        </h1>
        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mb-8 reveal-up" style={{ animationDelay: "300ms" }}>
          For over 30 years, we've been transforming homes across South Florida with expertly crafted closets, pantries, and storage systems.
        </p>
        <div className="reveal-up" style={{ animationDelay: "450ms" }}>
          <YellowButton onClick={onConsultOpen} size="lg">Schedule a FREE Consultation</YellowButton>
        </div>
      </div>
    </section>
  );
}

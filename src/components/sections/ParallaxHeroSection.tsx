import { useEffect, useRef, useState } from "react";
import { YellowButton } from "@/components/common/YellowButton";

// Full-bleed hero with a slow parallax background and staggered text
// reveal — shared by About Us, Service Areas, and any other "story" page
// that isn't a product/category page (those use ProductHeroSection instead).
export function ParallaxHeroSection({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  onConsultOpen,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  onConsultOpen?: () => void;
}) {
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
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end px-5 md:px-16 pb-16 md:pb-24 max-w-4xl">
        <p className="mb-4 opacity-90 text-[13px] font-medium text-white tracking-widest uppercase reveal-up" style={{ animationDelay: "0ms" }}>{eyebrow}</p>
        <h1 className="font-sans font-medium text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 text-white reveal-up" style={{ animationDelay: "150ms" }}>
          {title}
        </h1>
        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mb-8 reveal-up" style={{ animationDelay: "300ms" }}>
          {description}
        </p>
        <div className="reveal-up" style={{ animationDelay: "450ms" }}>
          <YellowButton onClick={onConsultOpen} size="lg">Schedule a FREE Consultation</YellowButton>
        </div>
      </div>
    </section>
  );
}

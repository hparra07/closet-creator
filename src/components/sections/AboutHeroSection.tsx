import aboutBanner from "@/assets/about/about-new.jpg";
import { ParallaxHeroSection } from "@/components/sections/ParallaxHeroSection";

export function AboutHeroSection({ onConsultOpen }: { onConsultOpen?: () => void }) {
  return (
    <ParallaxHeroSection
      eyebrow="Get to know us"
      title="The Best Custom Closet Company in South Florida."
      description="For over 30 years, we've been transforming homes across South Florida with expertly crafted closets, pantries, and storage systems."
      image={aboutBanner}
      imageAlt="Custom built-in library and shelving by JL Closets"
      onConsultOpen={onConsultOpen}
    />
  );
}

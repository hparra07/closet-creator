import { StoryIntroSection } from "@/components/sections/StoryIntroSection";
import ourStory from "@/assets/about/our-story.webp";

export function AboutIntroSection() {
  return (
    <StoryIntroSection
      eyebrow="Our Story"
      title={
        <>
          <strong className="font-bold">JL Closets - </strong> The Best Custom Closet Company Near You
        </>
      }
      paragraphs={[
        <>
          When searching for the best closet company near you, you want a team that offers expert craftsmanship, innovative designs, and exceptional service. For <strong className="font-bold">over 30 years</strong>, JL Closets has been transforming homes in Boca Raton, Fort Lauderdale, Palm Beach, and all of South Florida with custom storage solutions that are both beautiful and functional.
        </>,
        <>
          Voted the <strong className="font-bold">#1 custom closet company in Florida</strong>, we are known for our award-winning designs, professional installation, and unparalleled customer satisfaction. Whether you need a walk-in closet, home office storage, or a modern wall unit, we provide tailored solutions that fit your space and lifestyle perfectly.
        </>,
      ]}
      image={ourStory}
      imageAlt="JL Closets designer during an in-home consultation"
    />
  );
}

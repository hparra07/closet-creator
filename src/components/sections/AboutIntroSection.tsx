import { SectionWrapper } from "@/components/common/SectionWrapper";
import ourStory from "@/assets/our-story.jpg";

export function AboutIntroSection() {
  return (
    <SectionWrapper>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <span className="rule eyebrow mb-6 block" style={{ color: "#313131" }}>Our Story</span>
          <h2 className="font-sans text-3xl md:text-4xl leading-tight mb-6 reveal-up">
            <strong className="font-bold">JL Closets - </strong> The Best Custom Closet Company Near You
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "#313131" }}>
            <p className="reveal-up">
              When searching for the best closet company near you, you want a team that offers expert craftsmanship, innovative designs, and exceptional service. For <strong className="font-bold">over 30 years</strong>, JL Closets has been transforming homes in Boca Raton, Fort Lauderdale, Palm Beach, and all of South Florida with custom storage solutions that are both beautiful and functional. 
            </p>
            <p className="reveal-up">
              Voted the <strong className="font-bold">#1 custom closet company in Florida</strong>, we are known for our award-winning designs, professional installation, and unparalleled customer satisfaction. Whether you need a walk-in closet, home office storage, or a modern wall unit, we provide tailored solutions that fit your space and lifestyle perfectly.
            </p>
          </div>
        </div>
        <div className="relative reveal-up">
          <img
            src={ourStory}
            alt="JL Closets designer during an in-home consultation"
            className="w-full aspect-[4/5] object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

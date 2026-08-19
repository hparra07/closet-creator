import { createFileRoute } from "@tanstack/react-router";
import { MainProductTemplate } from "@/components/templates/MainProductTemplate";
import type { ProductSolution } from "@/components/sections/ProductSolutionsSection";
import type { CarouselSlide } from "@/components/sections/FullscreenCarouselSection";
import type { WhyCard } from "@/components/sections/WhyChooseUsV2";
import type { ProjectVideo } from "@/components/sections/ProjectVideosSection";
import type { FaqItem } from "@/components/sections/FaqSection";
import { recommendedSlides } from "@/lib/storageCategories";
import customClosetsImg from "@/assets/shared/custom-closets-img.webp";
import { pageHead, SITE_URL } from "@/lib/pageHead";
import closetImg from "@/assets/custom-closets/closet.webp";
import storageCloset from "@/assets/shared/storage-closet.webp";
import banner2 from "@/assets/custom-closets/banner3.webp";
import banner3 from "@/assets/custom-closets/banner2.webp";
import banner4 from "@/assets/custom-closets/banner4.webp";
import banner5 from "@/assets/custom-closets/banner-5.webp";
import banner1 from "@/assets/custom-closets/big-banner-1.webp";
import cardHero1 from "@/assets/custom-closets/card-hero-1.webp";
import cardHero2 from "@/assets/custom-closets/card-hero-3.webp";
import cardHero3 from "@/assets/custom-closets/card-hero-2.webp";
import cardHero4 from "@/assets/custom-closets/card-hero-4.webp";
import featuredBanner1 from "@/assets/custom-closets/featured-banner-1.webp";
import icon1 from "@/assets/global/icon-1.webp";
import icon2 from "@/assets/global/icon-2.webp";
import icon3 from "@/assets/global/icon-3.webp";
import icon4 from "@/assets/global/icon-4.webp";
import icon5 from "@/assets/global/icon-5.webp";

const SOLUTIONS: ProductSolution[] = [
  {
    title: "Walk-In Closets",
    desc: "Luxury walk-in designs meticulously crafted to transform your space into a sanctuary.",
    images: [customClosetsImg, closetImg],
    href: "/custom-closets/walk-in-closets",
  },
  {
    title: "Reach-In Closets",
    desc: "Maximize every inch of your space with custom reach-in designs tailored to your daily routine.",
    images: [closetImg, storageCloset],
  },
  {
    title: "Shoe Storage",
    desc: "Showcase and protect your collection with bespoke shelving, lighting, and versatile organization.",
    images: [storageCloset, customClosetsImg],
  },
];

const WHY_CARDS: WhyCard[] = [
  { title: "Over 30 Years of Expertise", desc: "We have been a trusted provider of custom storage solutions in South Florida since 1991, bringing over three decades of experience to every project we undertake.", icon: icon1 },
  { title: "Lifetime Warranty", desc: "We offer a lifetime warranty on all custom installations, ensuring that every system is built to last as long as you own your home.", icon: icon2 },
  { title: "Award-Winning Custom Closet Design", desc: "Recognized as the best custom closet company in South Florida, with eight consecutive years as the top pick for custom closets by Best Pick Reports.", icon: icon3 },
  { title: "Highest Customer Satisfaction", desc: "Almost 98% of positive direct, and 5-star reviews make us South Florida's top customer-rated custom closet company.", icon: icon4 },
  { title: "80% Referral Rate", desc: "With an 80% referral rate and 70% returning customers, we stand out as South Florida's most referred custom closet company.", icon: icon5 },
];

const PROJECT_VIDEOS: ProjectVideo[] = [
  { thumbnail: customClosetsImg, video: "https://www.youtube.com/watch?v=Hyq4t6QsdzE", label: "Walk-In Closet Reveal" },
  { thumbnail: closetImg, video: "https://www.youtube.com/watch?v=yi5TaJ2haOU", label: "Client Walkthrough" },
  { thumbnail: storageCloset, video: "https://www.youtube.com/watch?v=0Nc5hP68mLs", label: "Garage Transformation" },
  { thumbnail: banner2, video: "https://www.youtube.com/watch?v=QtiUUEzsaFI", label: "Master Closet Renovation" },
  { thumbnail: banner3, video: "#", label: "Coming Soon" },
];

const SHOWCASE_SLIDES: CarouselSlide[] = [
  { image: banner1, cardImage: cardHero1, title: "Project 1", subtitle: "Custom Storage", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis." },
  { image: banner2, cardImage: cardHero2, title: "Project 2", subtitle: "Custom Storage", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis." },
  { image: banner3, cardImage: cardHero3, title: "Project 3", subtitle: "Custom Storage", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis." },
  { image: banner4, cardImage: cardHero4, title: "Project 4", subtitle: "Custom Storage", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis." },
  { image: banner5, title: "Project 5", subtitle: "Utility Spaces", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis." },
];

const FAQS: FaqItem[] = [
  {
    q: "How much do custom closets cost in South Florida?",
    a: "Custom closet costs in South Florida can vary widely depending on factors such as size, materials, and complexity of design. A basic reach-in closet might start at around $1,000, while a luxurious walk-in closet could cost way over $10,000, depending on your preferences, level of customization, and accessories.",
  },
  {
    q: "Do custom closets increase home value?",
    a: "Yes, custom closets can significantly increase home value. Well-designed storage solutions are highly attractive to potential buyers, often offering a return on investment of 100% or more. Custom closets not only add functional space but also create a sense of luxury and organization that can set a home apart in the competitive South Florida real estate market.",
  },
  {
    q: "How much does it cost to put built-ins in a closet?",
    a: "The cost of adding built-ins to a closet can range from $1,000 to $5,000 or more, depending on the size of the closet and the complexity of the built-in design. Basic built-in shelving and rods might be on the lower end of this range, while custom cabinetry, drawers, and specialized storage solutions will increase the cost. The investment in built-ins can greatly enhance the functionality and value of your closet space.",
  },
  {
    q: "What's the difference between reach-in and walk-in closets?",
    a: "Reach-in closets are typically smaller, shallower spaces accessed from outside the closet area. They're commonly found in bedrooms, hallways, and entryways, offering storage that can be easily reached without stepping into the closet. Walk-in closets, on the other hand, are larger, room-sized spaces that you can physically enter. They offer more extensive storage options, often including built-in organizers, seating areas, and even dressing spaces. Walk-in closets provide a more luxurious and spacious storage solution, while reach-in closets maximize storage in smaller areas.",
  },
  {
    q: "What makes JL Closets the best custom closet company in Florida?",
    a: (
      <>
        <p>
          At JL Closets, we've earned our title as Florida's best custom closet company through a combination of exceptional service, quality, and customer satisfaction. Here's what sets us apart:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong className="font-semibold">Top-rated by customers:</strong> We've received the highest ratings not just for our custom closets, but for our entire service package. This includes our free design consultations (both virtual and in-home), professional measurements, cutting-edge 3D designs, and expert installation.</li>
          <li><strong className="font-semibold">Award-winning expertise:</strong> We've been honored with the most professional industry awards for custom closet design, production, installation, and customer service. It's like winning the Olympics of closet design!</li>
          <li><strong className="font-semibold">Unbeatable customer loyalty:</strong> We're proud to have an 82% customer return rate – the highest in the entire United States! That means more than 8 out of 10 clients come back for multiple projects. Plus, our 80% referral rate shows that our happy customers love to spread the word.</li>
          <li><strong className="font-semibold">Attention to detail:</strong> Our installers are not just skilled – they're considerate too. They complete most installations in 1-2 days, clean up thoroughly (yes, we bring our own vacuum cleaners!), and respect your privacy throughout the process.</li>
          <li><strong className="font-semibold">Tailored solutions:</strong> We believe your closet should be as unique as you are. Each design is thoughtfully crafted to reflect your personal style while solving your specific storage challenges.</li>
        </ol>
        <p>
          So, when we say we're the best, it's not just talk – it's backed by facts, figures, and a whole lot of happy customers with beautiful, functional closets!
        </p>
      </>
    ),
  },
  {
    q: "What materials do you use for custom closets?",
    a: "JL Closets uses high-quality materials, including premium wood finishes, durable laminate, and soft-close hardware to ensure longevity and a luxurious appearance.",
  },
  {
    q: "How long does it take to install a custom closet?",
    a: "The installation process varies based on the project size but typically takes one to two days for standard designs and three to five days for highly customized projects.",
  },
  {
    q: "Can I customize my closet with lighting, accessories, and special features?",
    a: "Absolutely! JL Closets offers LED lighting, jewelry drawers, pull-out accessories, and more to make your custom closet both functional and stylish.",
  },
  {
    q: "Do you offer financing for custom closets?",
    a: "Yes! We offer flexible financing options so you can get your dream closet without upfront costs.",
  },
];

export const Route = createFileRoute("/custom-closets")({
  head: () =>
    pageHead({
      title: "Custom Closets in South Florida | JL Closets",
      description: "High-end custom closets designed to optimize your space and reflect your unique style. Walk-in closets, reach-in closets, and custom shoe storage across South Florida.",
      path: "/custom-closets",
      image: `${SITE_URL}${banner1}`,
    }),
  component: CustomClosets,
});

function CustomClosets() {
  return (
    <MainProductTemplate
      hero={{
        title: "Custom Closets",
        description: "Turn your storage dreams into reality with high-end custom closets designed to optimize your space and reflect your unique style.",
        image: customClosetsImg,
        imageAlt: "Custom walk-in closet by JL Closets",
      }}
      solutions={{
        title: "Custom Closets Florida – Smart Storage & Luxury Organization by JL Closets",
        intro: (
          <>
            Turn your <strong className="font-bold underline-animate">success into a sanctuary.</strong> Experience the <strong className="font-bold underline-animate">art of organized living</strong> with bespoke designs that bring luxury and calm to your daily routine.
          </>
        ),
        items: SOLUTIONS,
      }}
      projectVideos={PROJECT_VIDEOS}
      showcaseSlides={SHOWCASE_SLIDES}
      whyChooseUs={{
        title: "Why JL Closets is Florida's Best Custom Closet Company",
        backgroundImage: featuredBanner1,
        cards: WHY_CARDS,
      }}
      faq={{
        title: "FAQ: Your Custom Closet Questions Answered",
        subtitle: "You have questions, we have the answers.",
        items: FAQS,
      }}
      features={{
        title: "Recommended For You",
        subtitle: "More Storage Solutions for Your Home",
        slides: recommendedSlides("custom-closets"),
      }}
    />
  );
}

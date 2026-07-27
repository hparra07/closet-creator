import { createFileRoute } from "@tanstack/react-router";
import { SubProductTemplate } from "@/components/templates/SubProductTemplate";
import type { FaqItem } from "@/components/sections/FaqSection";
import type { AccessoryCard } from "@/components/sections/PremiumAccessoriesSection";
import { recommendedSlides } from "@/lib/storageCategories";
import customClosetsImg from "@/assets/walk-in-hero.webp";
import closetAccessories from "@/assets/closet-accesories.jpeg";
import cabinetFinishes from "@/assets/cabinet-finishes.jpeg";
import closetLighting from "@/assets/closet-lighting.jpeg";
import doorsDrawers from "@/assets/doors-drawers.jpeg";

const ACCESSORY_CARDS: AccessoryCard[] = [
  { title: "Closet Accessories", desc: "Smart add-ons to maximize every inch of storage.", image: closetAccessories },
  { title: "Cabinet Finishes", desc: "Premium finishes to match your personal style.", image: cabinetFinishes },
  { title: "Closet Lighting", desc: "Ambient lighting that highlights every detail.", image: closetLighting },
  { title: "Doors and Drawers", desc: "Custom doors and drawers built to last.", image: doorsDrawers },
];

const FAQS: FaqItem[] = [
  {
    q: "How to organize a walk in closet?",
    a: (
      <>
        <p>
          To organize a walk-in closet, start by categorizing items and assigning specific areas for each category. Use a combination of hanging rods, shelves, and drawers to maximize space. Implement walk-in closet organization ideas like using uniform hangers, adding drawer dividers, and utilizing vertical space with hooks or over-door organizers. Consider the frequency of use when placing items, keeping frequently worn pieces easily accessible.
        </p>
        <p>
          For a truly optimized walk-in closet design tailored to your specific needs and space, consider booking a free consultation with our expert designers. We can provide custom solutions that maximize your storage potential and create an organized, functional space that fits your lifestyle.
        </p>
      </>
    ),
  },
  {
    q: "What should be Walk in Closet dimensions?",
    a: (
      <>
        <p>
          Standard walk-in closet dimensions typically range from 5×5 feet for a small walk-in closet to 12×14 feet for a larger, luxury walk-in closet. The minimum recommended width is 4 feet to allow comfortable movement. Depth should be at least 24 inches for hanging clothes, while a minimum of 6.5 feet in height accommodates double hanging rods. However, optimal dimensions vary based on individual needs and available space.
        </p>
        <p>
          Every home is unique, and walk-in closet dimensions can vary greatly. Our team specializes in creating custom walk-in closet designs that make the most of your available space, whether it's a compact area or a spacious room. Contact us for a free consultation to discuss how we can optimize your specific closet dimensions.
        </p>
      </>
    ),
  },
  {
    q: "How long does the custom walk-in closet design and installation process take?",
    a: (
      <>
        <p>
          The custom walk-in closet design and installation process typically takes between 2-6 weeks, depending on the complexity of the project. This timeline includes initial consultation, design phase, material ordering, and installation. A simple walk-in closet might be completed in 2-3 weeks, while a more complex luxury walk-in closet could take 4-6 weeks or more.
        </p>
        <p>
          At J Closets, we pride ourselves on efficient project management without compromising quality. During your free consultation, we can provide a more accurate timeline based on your specific walk-in closet ideas and requirements. Our team works diligently to ensure your custom walk-in closet is completed as quickly as possible while meeting our high standards of craftsmanship.
        </p>
      </>
    ),
  },
  {
    q: "Can you work with oddly shaped or small spaces to create a functional walk-in closet?",
    a: (
      <>
        <p>
          Yes, we specialize in creating functional walk-in closets for oddly shaped or small spaces. Our experienced designers use innovative walk-in closet ideas to maximize every inch of available space, including solutions for sloped ceilings, awkward corners, or narrow rooms. We can transform challenging areas into efficient storage spaces using custom shelving, built-in drawers, and creative hanging solutions.
        </p>
        <p>
          Don't let unusual walk-in closet dimensions deter you from having the organized space you desire. Schedule a free consultation with our team, and we'll show you how we can turn your challenging space into a beautifully designed, highly functional walk-in closet tailored to your needs.
        </p>
      </>
    ),
  },
  {
    q: "Can you incorporate existing furniture or storage pieces into my new walk-in closet design?",
    a: (
      <>
        <p>
          Absolutely! We can integrate existing furniture or storage pieces into your new walk-in closet design. Our designers are skilled at blending new custom elements with your cherished items to create a cohesive and personalized walk-in closet. Whether it's a family heirloom dresser or a favorite storage unit, we'll find creative ways to incorporate these pieces into your custom walk-in closet layout.
        </p>
        <p>
          During your free consultation, we'll discuss which existing pieces you'd like to keep and how best to integrate them into your new walk-in closet design. Our goal is to create a space that not only meets your storage needs but also reflects your personal style, including your treasured furniture pieces.
        </p>
      </>
    ),
  },
  {
    q: "How do I schedule a consultation for my custom walk-in closet project?",
    a: (
      <>
        <p>
          Scheduling a consultation for your custom walk-in closet project is easy. Simply call our office at 561.912.9881 or visit our website to fill out a contact form. Our friendly team will assist you in setting up a convenient time for a free, no-obligation consultation. During this meeting, we'll discuss your walk-in closet ideas, assess your space, and start crafting a design that meets your needs and budget.
        </p>
        <p>
          As South Florida's highest-rated custom closet company, we're excited to help bring your walk-in closet dreams to life. Our expert designers are ready to share their knowledge and create a tailored solution for your space. Don't wait to transform your closet – reach out today.
        </p>
      </>
    ),
  },
];

export const Route = createFileRoute("/custom-closets_/walk-in-closets")({
  head: () => ({
    meta: [
      { title: "Walk-In Closets in South Florida | JL Closets" },
      {
        name: "description",
        content:
          "Luxury walk-in closet designs meticulously crafted to transform your space into a personal sanctuary. Custom storage solutions across South Florida.",
      },
    ],
  }),
  component: WalkInClosets,
});

function WalkInClosets() {
  return (
    <SubProductTemplate
      hero={{
        title: "Walk-In Closets",
        description: "Transform Your Space with Personalized Walk In Closet Designs by JL Closets",
        image: customClosetsImg,
        imageAlt: "Custom walk-in closet by JL Closets",
      }}
      accessories={{
        title: "Premium Accessories",
        cards: ACCESSORY_CARDS,
      }}
      recommended={{
        title: "Recommended For You",
        subtitle: "More Storage Solutions for Your Home",
        slides: recommendedSlides("custom-closets"),
      }}
      faq={{
        title: "FAQ: Your Walk-In Closet Questions Answered",
        subtitle: "You have questions, we have the answers.",
        items: FAQS,
      }}
    />
  );
}

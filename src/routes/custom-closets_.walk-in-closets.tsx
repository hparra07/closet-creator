import { createFileRoute } from "@tanstack/react-router";
import { SubProductTemplate } from "@/components/templates/SubProductTemplate";
import type { ProductSolution } from "@/components/sections/ProductSolutionsSection";
import type { FaqItem } from "@/components/sections/FaqSection";
import type { AccessoryCard } from "@/components/sections/PremiumAccessoriesSection";
import { recommendedSlides } from "@/lib/storageCategories";
import customClosetsImg from "@/assets/walk-in-closets/walk-in-hero.webp";
import closetAccessories from "@/assets/walk-in-closets/closet-accesories.jpeg";
import cabinetFinishes from "@/assets/walk-in-closets/cabinet-finishes.jpeg";
import closetLighting from "@/assets/walk-in-closets/closet-lighting.jpeg";
import doorsDrawers from "@/assets/walk-in-closets/doors-drawers.jpeg";
import stackImg1 from "@/assets/custom-closets/card-hero-1.jpg";
import stackImg2 from "@/assets/custom-closets/card-hero-2.jpg";
import stackImg3 from "@/assets/custom-closets/card-hero-3.jpg";
import stackImg4 from "@/assets/custom-closets/card-hero-4.jpg";
import stackImg5 from "@/assets/custom-closets/vert-banner-1.jpg";
import closetImgFallback from "@/assets/custom-closets/closet.jpg";
import projectExtra1 from "@/assets/misc/consult.jpg";
import projectExtra2 from "@/assets/misc/dark-office.jpg";
import projectExtra3 from "@/assets/misc/pantry.jpg";
import lightingImg1 from "@/assets/walk-in-closets/closet-lighting-solutions-custom-closets-1.jpg";
import lightingImg2 from "@/assets/walk-in-closets/closet-lighting-solutions-custom-closets-2.jpg";
import lightingImg3 from "@/assets/walk-in-closets/closet-lighting-solutions-custom-closets-3.jpg";
import lightingImg4 from "@/assets/walk-in-closets/closet-lighting-solutions-custom-closets-4.jpg";
import doorsImg1 from "@/assets/walk-in-closets/closet-doors-and-drawers-1.jpg";
import doorsImg2 from "@/assets/walk-in-closets/closet-doors-and-drawers-2.webp";
import doorsImg3 from "@/assets/walk-in-closets/closet-doors-and-drawers-3.jpg";
import doorsImg4 from "@/assets/walk-in-closets/closet-doors-and-drawers-4.jpg";
import doorsImg5 from "@/assets/walk-in-closets/closet-doors-and-drawers-5.jpg";
import islandImg1 from "@/assets/walk-in-closets/custom-walk-in-closet-with-center-island-1.jpg";
import islandImg2 from "@/assets/walk-in-closets/custom-walk-in-closet-with-center-island-2.webp";
import islandImg3 from "@/assets/walk-in-closets/custom-walk-in-closet-with-center-island-3.jpg";
import islandImg4 from "@/assets/walk-in-closets/custom-walk-in-closet-with-center-island-4.jpg";
import shelvingImg1 from "@/assets/walk-in-closets/walk-in-closet-with-custom-drawers-and-shelving-storage-1.jpg"
import shelvingImg2 from "@/assets/walk-in-closets/walk-in-closet-with-custom-drawers-and-shelving-storage-2.jpg";
import shelvingImg3 from "@/assets/walk-in-closets/walk-in-closet-with-custom-drawers-and-shelving-storage-3.jpg";
import shelvingImg4 from "@/assets/walk-in-closets/walk-in-closet-with-custom-drawers-and-shelving-storage-4.jpg";

const MODERN_DETAILS_1 = {
  title: "Project 1",
  intro:
    "This modern walk-in closet blends clean lines with smart storage, featuring handleless cabinetry, open shelving, and a neutral palette that feels both minimal and functional.",
  features: [
    { label: "Sleek cabinetry", desc: "Handleless, flat-panel doors and drawers for a clean, modern look." },
    { label: "Open shelving", desc: "Displays folded items and accessories while keeping the space airy." },
    { label: "Integrated lighting", desc: "LED accents highlight every section and make outfits easy to find." },
    { label: "Smart layout", desc: "Zones for hanging, folded, and accessory storage tailored to daily use." },
  ],
};

const MODERN_DETAILS_2 = {
  title: "Project 2",
  intro:
    "A fresh take on modern storage, this walk-in closet pairs two-tone cabinetry with open display niches for a curated, boutique feel.",
  features: [
    { label: "Two-tone finish", desc: "Contrasting cabinet tones add depth without breaking the modern look." },
    { label: "Display niches", desc: "Open cubbies highlight favorite pieces and accessories." },
    { label: "Soft-close hardware", desc: "Every drawer and door closes smoothly and quietly." },
    { label: "Full-length mirror", desc: "Built in for quick outfit checks before heading out." },
  ],
};

const MODERN_DETAILS_3 = {
  title: "Project 3",
  intro:
    "Built around a central dressing area, this modern walk-in closet keeps hanging, folded, and accessory storage within easy reach of one spot.",
  features: [
    { label: "Central dressing zone", desc: "A clear, open area to get ready each morning." },
    { label: "Adjustable rods", desc: "Hanging space that adapts as your wardrobe changes." },
    { label: "Pull-out hampers", desc: "Discreet, built-in laundry storage." },
    { label: "Task lighting", desc: "Bright, focused light over the dressing area." },
  ],
};

const LUXURY_DETAILS_1 = {
  title: "Project 1",
  intro:
    "Designed for those who want it all, this luxury walk-in closet combines rich finishes, a statement island, and boutique-style display with everyday functionality.",
  features: [
    { label: "Premium finishes", desc: "High-end wood, glass, and hardware throughout." },
    { label: "Center island", desc: "Extra storage plus a spot to sit, fold, or plan outfits." },
    { label: "Boutique display", desc: "Glass-front cabinets showcase shoes, bags, and accessories." },
    { label: "Ambient lighting", desc: "Soft, layered lighting creates a showroom feel." },
  ],
};

const LUXURY_DETAILS_2 = {
  title: "Project 2",
  intro:
    "This luxury walk-in closet adds a plush seating lounge to the mix, turning everyday routines into a moment to slow down and enjoy.",
  features: [
    { label: "Seating lounge", desc: "A comfortable spot to relax, fold clothes, or plan outfits." },
    { label: "Chandelier lighting", desc: "A statement fixture elevates the whole room." },
    { label: "Custom drawer inserts", desc: "Velvet-lined compartments for jewelry and watches." },
    { label: "Full-height mirrors", desc: "Multiple angles for a complete outfit view." },
  ],
};

const LUXURY_DETAILS_3 = {
  title: "Project 3",
  intro:
    "Part closet, part private suite, this design combines high-end storage with a dedicated area to dress, style, and get ready in comfort.",
  features: [
    { label: "Private dressing suite", desc: "A dedicated area separate from the storage walls." },
    { label: "Illuminated display cases", desc: "Showcase handbags and accessories like a boutique." },
    { label: "Custom vanity", desc: "Built-in space for makeup and grooming essentials." },
    { label: "Rich hardware finishes", desc: "Brass and matte black accents throughout." },
  ],
};

const SMALL_DETAILS_1 = {
  title: "SProject 1",
  intro:
    "This small walk-in closet makes the most of a narrow space with high-end finishes, elegant storage, and integrated lighting — proving that luxury and function can fit in a compact footprint.",
  features: [
    { label: "Elegant storage", desc: "Custom cabinetry with glass doors keeps clothing organized and on display." },
    { label: "Integrated lighting", desc: "Soft ambient lighting makes it easy to select outfits and highlights the space." },
    { label: "Optimized narrow space", desc: "A smart layout makes the most of a tight footprint without feeling cramped." },
    { label: "Glass display sections", desc: "Perfect for showcasing special garments with a touch of elegance." },
  ],
};

const SMALL_DETAILS_2 = {
  title: "Project 2",
  intro:
    "Every inch counts in this small walk-in closet, which tucks a fold-out vanity into the design without sacrificing storage.",
  features: [
    { label: "Fold-out vanity", desc: "A compact surface for makeup that folds away when not in use." },
    { label: "Slim hanging rods", desc: "Maximize hanging space in a narrow footprint." },
    { label: "Vertical drawers", desc: "Tall, narrow drawers make the most of tight corners." },
    { label: "Mirror-backed doors", desc: "Add light and the feel of extra space." },
  ],
};

const SMALL_DETAILS_3 = {
  title: "Project 3",
  intro:
    "This small walk-in closet makes smart use of corner space with angled shelving, proving no square inch goes to waste.",
  features: [
    { label: "Corner shelving", desc: "Angled shelves turn awkward corners into usable storage." },
    { label: "Compact shoe storage", desc: "Slim, tiered racks fit even the smallest layouts." },
    { label: "Built-in lighting", desc: "Keeps every shelf visible despite the tight space." },
    { label: "Light color palette", desc: "Bright finishes make the small space feel larger." },
  ],
};

const WALK_IN_SOLUTIONS: ProductSolution[] = [
  {
    title: "Modern Walk In Closet",
    desc: "Project 1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    images: [stackImg1, stackImg2, projectExtra1],
    projects: [
      { image: stackImg1, label: "Project 1", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", details: MODERN_DETAILS_1 },
      { image: stackImg2, label: "Project 2", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", details: MODERN_DETAILS_2 },
      { image: projectExtra1, label: "Project 3", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", details: MODERN_DETAILS_3 },
    ],
  },
  {
    title: "Luxury Walk In Closet",
    desc: "Project 1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    images: [stackImg3, stackImg4, projectExtra2],
    projects: [
      { image: stackImg3, label: "Project 1", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", details: LUXURY_DETAILS_1 },
      { image: stackImg4, label: "Project 2", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", details: LUXURY_DETAILS_2 },
      { image: projectExtra2, label: "Project 3", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", details: LUXURY_DETAILS_3 },
    ],
  },
  {
    title: "Small Walk In Closet Ideas",
    desc: "Project 1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    images: [closetImgFallback, stackImg5, projectExtra3],
    projects: [
      { image: closetImgFallback, label: "Project 1", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", details: SMALL_DETAILS_1 },
      { image: stackImg5, label: "Project 2", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", details: SMALL_DETAILS_2 },
      { image: projectExtra3, label: "Project 3", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", details: SMALL_DETAILS_3 },
    ],
  },
];

const WHY_CHOOSE_REASONS = [
  {
    title: "Superior Quality and Durability",
    desc: "Premium materials and expert craftsmanship built to last a lifetime.",
  },
  {
    title: "Optimized Organization for Your Lifestyle",
    desc: "Every shelf, rod, and drawer planned around your daily routine.",
  },
  {
    title: "Increased Home Value and Appeal",
    desc: "A smart investment that sets your home apart to future buyers.",
  },
  {
    title: "Personalized Aesthetic that Complements Your Home",
    desc: "Finishes and details tailored to match your style seamlessly.",
  },
  {
    title: "Tailored to Your Unique Space and Needs",
    desc: "Designed to make the most of every inch, no matter the layout.",
  },
];

const DESIGN_OPTIONS = [
  {
    title: "Walk In Closet Lighting Systems",
    desc: "Integrated lighting that enhances both function and ambiance — LED strips, recessed ceiling lights, accent and motion-activated lighting, plus dimmable options that make it effortless to find and coordinate your outfits while adding a touch of luxury.",
    images: [lightingImg1, lightingImg2, lightingImg3, lightingImg4],
  },
  {
    title: "Walk In Closet Doors and Drawers",
    desc: "Doors and drawers that shape both the look and function of your closet — glass-front cabinets, soft-close drawers, mirrored doors, custom finishes, and pull-out organizers for jewelry, ties, and accessories.",
    images: [doorsImg1, doorsImg2, doorsImg3, doorsImg4, doorsImg5],
  },
  {
    title: "Custom Walk In Closet Islands",
    desc: "A functional, luxurious centerpiece for your closet — extra drawers and display space, comfortable seating, integrated hampers, and even built-in charging stations for your devices.",
    images: [islandImg1, islandImg2, islandImg3, islandImg4],
  },
  {
    title: "Custom Shelving and Storage Solutions for Walk-In Closets",
    desc: "The backbone of an efficient walk-in closet — adjustable shelving, built-in shoe racks, double hanging rods, pull-out valet rods, and specialized storage for ties, belts, and scarves, all tailored to your space.",
    images: [shelvingImg1, shelvingImg2, shelvingImg3, shelvingImg4],
  },
];

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
      solutions={{
        title: "Best Custom Walk In Closet Company in South Florida",
        introSize: "sm",
        intro: (
          <>
            At JL Closets, we specialize in <strong className="font-bold underline-animate">custom walk-in closets that turn your storage vision into reality</strong> — from luxurious master bedroom retreats to compact, efficient designs for smaller spaces. Our expert designers and skilled craftsmen work closely with you to <strong className="font-bold underline-animate">maximize every inch of your space</strong>, and wherever you are in Southern Florida, we'll help you transform your closet into an <strong className="font-bold underline-animate">organized oasis you'll love for years to come</strong>.
          </>
        ),
        items: WALK_IN_SOLUTIONS,
      }}
      designOptions={{
        title: "Our Custom Walk-In Closet Design Options",
        intro: (
          <>
            Customization is the <strong className="font-bold underline-animate">key to a walk-in closet</strong> that fits both your storage needs and your personal style. <strong className="font-bold underline-animate">From small walk-ins to luxury designs</strong>, the right combination of features can turn any closet — whatever its dimensions — into a <strong className="font-bold underline-animate">functional, beautiful part of your home</strong>.
          </>
        ),
        options: DESIGN_OPTIONS,
      }}
      whyChoose={{
        title: (
          <>
            <strong className="font-bold">5 Reasons</strong> Why Custom Walk-In Closets Outshine Prefabricated Options
          </>
        ),
        intro: (
          <>
            <p>
              When it comes to creating your dream storage space, custom walk-in closets offer advantages that prefabricated options simply can't match. These bespoke solutions go beyond basic storage, transforming your closet into a personalized haven that reflects your lifestyle and enhances your daily routine.
            </p>
            <p>
              Let's explore why investing in a custom walk in closet might be the best choice for your home.
            </p>
          </>
        ),
        reasons: WHY_CHOOSE_REASONS,
        images: [stackImg1, stackImg2, stackImg3, stackImg4, stackImg5],
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

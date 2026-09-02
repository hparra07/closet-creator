import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { ProductHeroSection } from "@/components/sections/ProductHeroSection";
import { ProductSolutionsSection, type ProductSolution } from "@/components/sections/ProductSolutionsSection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ConsultModal } from "@/components/modals/LazyConsultModal";
import { pageHead, SITE_URL } from "@/lib/pageHead";

import heroImg from "@/assets/portfolio/wellington-residence-01.webp";

import mensWalkIn1 from "@/assets/portfolio/mens-walk-in-closet-01.webp";
import lasOlas1 from "@/assets/portfolio/las-olas-residence-01.webp";
import royalPalmRes2 from "@/assets/portfolio/royal-palm-residence-02.webp";
import wellington3 from "@/assets/portfolio/wellington-residence-03.webp";

import doorsDrawers from "@/assets/walk-in-closets/doors-drawers.webp";
import beforeReachIn from "@/assets/before-after/before-reach-in.webp";

import storageCloset from "@/assets/shared/storage-closet.webp";
import closetAccessories from "@/assets/walk-in-closets/closet-accesories.webp";

import miscPantry from "@/assets/misc/pantry.webp";
import storagePantry from "@/assets/shared/storage-pantry.webp";

import storageEntertainment from "@/assets/shared/storage-entertainment.webp";
import beforeEntertainment from "@/assets/before-after/before-entertainment.webp";
import afterEntertainment from "@/assets/before-after/after-entertainment.webp";

import storageMudroom from "@/assets/shared/storage-mudroom.webp";
import storageLaundry from "@/assets/shared/storage-laundry.webp";
import storageGarage from "@/assets/shared/storage-garage.webp";

import storageOffice from "@/assets/shared/storage-office.webp";
import darkOffice from "@/assets/misc/dark-office.webp";

import storageMore from "@/assets/shared/storage-more.webp";
import murphyBed from "@/assets/home/murphy-bed.webp";
import wineRack from "@/assets/home/wine-rack.webp";

// Feature bullets pulled from the live site are "Label: sentence" strings —
// split once on the first colon so labels containing "e.g." or similar don't
// get cut mid-sentence.
function feature(raw: string) {
  const i = raw.indexOf(":");
  return { label: raw.slice(0, i), desc: raw.slice(i + 1).trim() };
}

const SOLUTIONS: ProductSolution[] = [
  {
    title: "Walk-In Closets",
    desc: "Step into luxury with our collection of walk-in closet ideas, where organization meets opulence.",
    images: [],
    href: "/custom-closets/walk-in-closets",
    projects: [
      {
        image: mensWalkIn1,
        label: "Small Walk-In Closet, Custom Shelving",
        desc: "Custom shelving, pull-out drawers, and dedicated hanging space maximize storage efficiency in a compact footprint.",
        details: {
          title: "Small Walk-In Closet Design with Custom Shelving and Efficient Storage Solutions",
          intro: "This small walk-in closet design maximizes storage efficiency with a combination of custom shelving, pull-out drawers, and hanging space, making it an ideal solution for compact spaces. The closet features open shelving that provides easy access to folded clothes and accessories, while dedicated hanging areas keep garments wrinkle-free. Woven baskets on the upper shelves add a stylish touch while providing additional storage for seasonal items.",
          features: [
            feature("Custom shelving: This small walk-in closet shelving optimizes vertical space, offering plenty of room for folded clothes, shoes, and accessories."),
            feature("Pull-out drawers: Integrated pull-out drawers provide hidden storage for smaller items, contributing to an organized and clutter-free closet."),
            feature("Dedicated hanging areas: Designed for small walk-in closets, these hanging spaces keep your garments neatly arranged and easily accessible."),
            feature("Upper shelving with baskets: The upper shelves with woven baskets offer additional storage, perfect for seasonal items or accessories, adding both function and style."),
            feature("Efficient use of space: This small walk-in closet layout is designed to make the most of every inch, ensuring you have ample storage even in a compact area."),
          ],
        },
      },
      {
        image: lasOlas1,
        label: "Glossy Finish, Marble Island",
        desc: "A marble-topped island and glass-enclosed shelving turn this walk-in into a boutique-style dressing room.",
        details: {
          title: "Luxury Walk-In Closet in Glossy Finish, Tall Glass Cabinets, and Marble Countertop Central Island",
          intro: "This luxury walk-in closet is a prime example of high-end closet design, combining both elegance and practicality. The marble island not only adds a luxurious touch but also serves as functional storage. Glass doors enclose the custom shelving, creating a sleek, organized look that highlights the closet's contents. The integrated LED lighting ensures every detail of your wardrobe is well-lit and accessible, making it easier to organize and display your clothing and accessories.",
          features: [
            feature("Custom shelving with glass doors: This walk-in closet features custom shelving units protected by glass doors, offering a clear yet protected view of your clothing."),
            feature("Marble island storage: The central marble island provides both luxury and practicality, offering additional storage for accessories and other items."),
            feature("LED lighting: Integrated LED lighting not only illuminates the closet but also adds to the overall luxurious ambiance."),
            feature("Optimized hanging space: Designed with ample hanging space to accommodate suits, dresses, and more, this walk-in closet maximizes storage efficiency."),
            feature("High-end closet design: A focus on luxury materials like marble and glass ensures this walk-in closet stands out as a sophisticated and functional space."),
          ],
        },
      },
      {
        image: royalPalmRes2,
        label: "LED Lighting, Premium Wood Finish",
        desc: "Premium wood finishes and a central island turn this closet into both a storage system and a retreat.",
        details: {
          title: "Luxurious Custom Walk-In Closet with LED Lighting, Island, and Premium Wood Finish",
          intro: "This stunning custom walk-in closet epitomizes luxury and elegance, featuring premium wood finishes, integrated LED lighting, and a central marble-topped island. The meticulously designed storage system provides ample space for hanging garments, folded clothes, and accessories, ensuring everything is beautifully organized. The central island doubles as a workspace and storage area, perfect for keeping accessories neatly arranged.",
          features: [
            feature("Premium wood finish: The walk-in closet showcases a high-end wood finish, enhancing the luxurious feel of the space."),
            feature("LED lighting: Integrated LED lighting highlights the closet's contents, making it easy to find items while adding a warm, inviting ambiance."),
            feature("Central island with storage: The marble-topped island provides additional storage space for accessories and serves as a convenient workspace."),
            feature("Ample hanging space: Designed with extensive hanging areas to accommodate various clothing items, from suits to dresses."),
            feature("Organized shelving: Custom shelving ensures everything has its place, from folded clothes to shoes and accessories."),
          ],
        },
      },
      {
        image: wellington3,
        label: "Modern, Glass Doors & Wooden Shelves",
        desc: "Sleek glass doors and wooden shelving give this closet a contemporary, boutique feel.",
        details: {
          title: "Modern Walk-In Closet with Glass Doors, Wooden Shelves, and Integrated Lighting",
          intro: "This modern walk-in closet exemplifies contemporary design with sleek glass doors and wooden shelves, providing a stylish and functional storage solution. The closet features walk-in closet organizers, built-in shelves, and modern lighting, making it perfect for anyone looking to maximize space with a modern aesthetic.",
          features: [
            feature("Built-in shelves: This modern walk-in closet is equipped with built-in shelves for efficient storage and organization."),
            feature("Glass doors: The glass doors offer a contemporary and transparent view of the closet's contents, maintaining a sleek and modern look."),
            feature("Walk-in closet organizers: Integrated organizers ensure that clothing and accessories are neatly arranged and easily accessible."),
            feature("Integrated lighting: Modern lighting solutions are incorporated to enhance visibility and highlight the closet's design elements."),
            feature("Modern design: The overall design combines functionality with a minimalist aesthetic, making it a perfect example of modern closet design."),
          ],
        },
      },
    ],
  },
  {
    title: "Reach-In Closets",
    desc: "Transform your reach-in closets from cluttered catchalls to organized oases with our innovative ideas.",
    images: [],
    href: "/custom-closets",
    projects: [
      {
        image: doorsDrawers,
        label: "Dark Finish, Brass Handles",
        desc: "A sophisticated dark finish paired with brass handles and customizable shelving.",
        details: {
          title: "Modern Reach-In Closet with Dark Finish and Brass Handles",
          intro: "This modern reach-in closet design showcases a sophisticated dark finish complemented by elegant brass handles. With built-in drawers and customizable shelving, this closet is both stylish and functional, offering a chic solution for your storage needs.",
          features: [
            feature("Brass handles: The elegant brass handles add a touch of luxury to this reach-in closet, enhancing its modern aesthetic."),
            feature("Built-in drawers: This closet features built-in drawers, providing ample storage space for smaller clothing items and accessories."),
            feature("Customizable shelving: Adjustable shelving allows for personalized storage solutions, making it easy to organize your wardrobe efficiently."),
            feature("Dark finish: The dark finish creates a sleek and contemporary look, perfectly suited for modern interiors."),
            feature("Integrated hanging space: Designed with dedicated hanging areas, this closet ensures that your clothes are neatly stored and easily accessible."),
          ],
        },
      },
      {
        image: beforeReachIn,
        label: "Sliding Doors, White Drawers",
        desc: "Space-saving sliding doors and ample white drawers fit seamlessly into any bedroom.",
        details: {
          title: "Custom Reach-In Closet with Sliding Doors, White Drawers, and Shelving",
          intro: "This custom reach-in closet features a modern design with sliding doors, ample white drawers, and versatile shelving. It combines functionality with aesthetics, offering organized storage space that fits seamlessly into any bedroom setting.",
          features: [
            feature("Sliding doors: Space-saving sliding doors provide easy access to your wardrobe while enhancing the overall aesthetic of this reach-in closet."),
            feature("Custom shelving: Adjustable shelves offer flexible storage solutions for folded clothes, shoes, and accessories."),
            feature("Integrated drawers: These white drawers provide concealed storage, perfect for keeping personal items out of sight."),
            feature("Hanging space: Dedicated hanging sections ensure your garments remain wrinkle-free and easily accessible."),
          ],
        },
      },
    ],
  },
  {
    title: "Shoe Storage",
    desc: "From rotating racks to illuminated shelves, our shoe storage ideas cater to collectors and everyday wearers alike.",
    images: [],
    href: "/custom-closets",
    projects: [
      {
        image: storageCloset,
        label: "Adjustable Shelving, Integrated Lighting",
        desc: "A multi-tiered, adjustable shoe shelving system accommodates everything from heels to sneakers.",
        details: {
          title: "Custom Walk-In Closet with Adjustable Shoe Storage and Integrated Lighting",
          intro: "This custom walk-in closet showcases a multi-tiered, adjustable shoe shelving system that perfectly accommodates various types of footwear, from high heels to sneakers. The shelves are flanked by ample hanging storage illuminated by integrated LED lighting. Above the shoe racks, clear, stackable storage boxes are housed in overhead compartments, ideal for seasonal items and handbags.",
          features: [
            feature("Adjustable Shoe Shelves: Customizable shelving system for high heels, flats, and sneakers."),
            feature("Integrated Lighting: LED lighting enhances visibility for hanging clothes and shoe storage."),
            feature("Overhead Storage: Compartmentalized overhead space for seasonal items and handbags."),
            feature("Multi-Functional Design: Combines hanging storage, shoe shelving, and overhead compartments."),
            feature("Accessible Layout: Open design for easy access to shoes and clothing, streamlining outfit selection."),
          ],
        },
      },
      {
        image: closetAccessories,
        label: "LED Lighting, Glass Doors",
        desc: "Adjustable glass shelves with integrated LED lighting display a high-end shoe collection.",
        details: {
          title: "Custom Shoe Closet with LED Lighting and Glass Doors",
          intro: "This custom shoe closet features adjustable glass shelves with integrated LED lighting, providing a luxurious and functional space for displaying a high-end shoe collection. The sleek glass doors protect your footwear from dust while maintaining an elegant, modern aesthetic.",
          features: [
            feature("Adjustable glass shelves: Customizable shelving to accommodate various shoe sizes and styles, ensuring your collection is neatly organized."),
            feature("Integrated LED lighting: Enhance visibility and add a touch of luxury with built-in LED lights, ideal for showcasing your favorite pairs."),
            feature("Glass doors: Protect your shoes from dust while maintaining a sleek, modern look with these transparent doors."),
            feature("Luxury shoe storage: Tailored for high-end collections, this shoe closet offers both style and functionality in one elegant package."),
          ],
        },
      },
    ],
  },
  {
    title: "Pantry Organization",
    desc: "A well-organized pantry is the secret ingredient to a smooth-running kitchen.",
    images: [],
    projects: [
      {
        image: miscPantry,
        label: "Pull-Out Shelves, Light Wood Finish",
        desc: "Multiple pull-out shelves keep everything within easy reach in a light wood finish.",
        details: {
          title: "Custom Pantry Cabinet with Pull-Out Shelves and Light Wood Finish",
          intro: "A custom pantry cabinet designed for maximum efficiency and easy access. The cabinet includes multiple pull-out shelves that allow for organized storage of pantry items, making it simple to reach everything without the hassle of digging through cluttered spaces. The light wood finish complements a wide range of kitchen designs.",
          features: [
            feature("Pull-Out Shelves: Convenient pull-out shelves offer easy access to all pantry items, eliminating the need to reach into the back of the cabinet."),
            feature("Customizable Storage: Each shelf can be adjusted to accommodate different sizes of items, ensuring optimal organization."),
            feature("Modern Aesthetic: The combination of light wood and white shelves creates a fresh, modern look that complements any kitchen decor."),
            feature("Space Efficiency: Maximizes storage capacity in a compact space, making it perfect for smaller kitchens or pantry areas."),
          ],
        },
      },
      {
        image: storagePantry,
        label: "Farmhouse, Open Shelving",
        desc: "Open shelving and wicker baskets bring rustic charm to everyday pantry storage.",
        details: {
          title: "Cozy Farmhouse Pantry with Open Shelving and Wicker Baskets",
          intro: "A cozy farmhouse-style pantry, featuring open shelving perfect for organizing jars, dry goods, and kitchen essentials. The lower section includes wicker baskets, adding both charm and functionality by providing hidden storage. The wooden countertop complements the overall rustic aesthetic.",
          features: [
            feature("Custom pantry cabinet with open shelving: Provides easy access to jars and dry goods, keeping everything organized and within reach."),
            feature("Wicker Baskets: Add a rustic touch while providing hidden storage for pantry items."),
            feature("Wooden Countertop: Complements the farmhouse aesthetic, offering additional workspace."),
            feature("Functional Layout: Designed for both style and practicality, optimizing kitchen storage."),
          ],
        },
      },
    ],
  },
  {
    title: "Entertainment Centers",
    desc: "Create a stunning focal point in your living space with our entertainment center ideas.",
    images: [],
    projects: [
      {
        image: storageEntertainment,
        label: "Built-In Bookshelves, Black Marble",
        desc: "A luxurious black marble backdrop paired with built-in bookshelves for a sophisticated focal point.",
        details: {
          title: "Modern Entertainment Center with Built-In Bookshelves and Black Marble Backdrop",
          intro: "This modern entertainment center features a luxurious black marble backdrop complemented by built-in bookshelves, offering a sophisticated and functional solution for your living space. The sleek design blends seamlessly with the dark cabinetry, making it ideal for showcasing books and decorative items.",
          features: [
            feature("Black Marble Backdrop: Adds a luxurious and modern touch to the entertainment center, making it a stunning focal point in the room."),
            feature("Built-In Bookshelves: Provide ample space for books and decor, integrating storage with a sleek and cohesive design."),
            feature("Underlit Shelving: Highlights the contents of the shelves while adding a warm ambiance to the overall design."),
            feature("Low-Profile Cabinets: Offer additional concealed storage for media equipment and accessories, maintaining a clutter-free look."),
          ],
        },
      },
      {
        image: beforeEntertainment,
        label: "LED Lighting, Sleek Media Display",
        desc: "Sleek wood finishes and integrated LED lighting frame a sophisticated media display.",
        details: {
          title: "Modern Entertainment Center with Storage and LED Lighting for Sleek Media Display",
          intro: "This modern entertainment center combines functionality and style, featuring sleek wood finishes and integrated LED lighting to create a sophisticated media display. The design includes a large space to accommodate a flat-screen TV, surrounded by custom shelves and storage units.",
          features: [
            feature("Built-in Storage Cabinets: The custom storage cabinets offer hidden compartments to keep your media accessories, remote controls, and other items neatly organized and out of sight."),
            feature("Integrated LED Lighting: Subtle LED lighting around the TV area adds a modern touch, enhancing the ambiance of your living room."),
            feature("Open Shelving for Display: The open shelving units provide an elegant space to display books, decorative pieces, or sound systems."),
            feature("Custom Fit Design: This built-in entertainment center is tailored to fit perfectly into the wall, creating a seamless and streamlined look."),
          ],
        },
      },
      {
        image: afterEntertainment,
        label: "Custom Storage & Display",
        desc: "Concealed cabinetry and open display shelves combine for a minimalist, functional design.",
        details: {
          title: "Modern Built-In Entertainment Center with Custom Storage and Display Features",
          intro: "This stunning modern built-in entertainment center is a perfect blend of luxury and functionality, designed to enhance any living space. The unit features a minimalist aesthetic with clean lines and integrated storage solutions that include both concealed cabinetry and open display shelves.",
          features: [
            feature("Integrated Storage Solutions: Custom cabinets and drawers offer ample space for organizing media devices, remote controls, and other essentials, keeping the area clutter-free."),
            feature("Display Shelves with LED Lighting: The open shelving units are enhanced with LED lighting, providing a perfect spot to showcase decorative items, books, or art pieces."),
            feature("Concealed Cable Management: Built-in cable management systems ensure that wires and cords are neatly hidden, maintaining the clean lines of the design."),
            feature("High-Quality Materials and Finishes: The entertainment center is crafted from premium materials, featuring a sleek, polished finish."),
          ],
        },
      },
    ],
  },
  {
    title: "Mudroom Storage",
    desc: "Elevate your home's first impression with our mudroom storage ideas.",
    images: [],
    projects: [
      {
        image: storageMudroom,
        label: "Custom Cabinets, Shelving & Seating",
        desc: "Built-in benches with cubbies underneath and extensive shelving create a warm, welcoming entryway.",
        details: {
          title: "Custom Mudroom Cabinets with Shelving and Seating",
          intro: "This elegant mudroom design features custom cabinets with extensive shelving and comfortable seating, providing both functionality and style. The symmetrical layout includes built-in benches on either side, each with open cubbies underneath for convenient storage.",
          features: [
            feature("Custom Mudroom Cabinets: Designed to maximize storage with built-in shelving and drawers, perfect for organizing your mudroom essentials."),
            feature("Symmetrical Seating Areas: The built-in benches with plush cushions provide comfortable seating and additional storage space beneath."),
            feature("Extensive Shelving: Multiple open shelves and cubbies offer versatile storage options for decor, baskets, and everyday items."),
            feature("Integrated Mudroom Design: The cohesive design seamlessly blends with adjacent rooms, enhancing the flow and functionality of your home."),
          ],
        },
      },
    ],
  },
  {
    title: "Laundry Room Organization",
    desc: "Transform your laundry routine with our organization ideas.",
    images: [],
    projects: [
      {
        image: storageLaundry,
        label: "Triple Washers, Glossy Cabinets",
        desc: "Glossy white cabinets and a rich wooden backsplash frame a high-capacity triple washer setup.",
        details: {
          title: "Modern Laundry Room with Triple Washers, Glossy Cabinets, and Wooden Backsplash",
          intro: "This contemporary laundry room features a triple washer setup complemented by sleek glossy white cabinets and a rich wooden backsplash. The combination of white and dark wood creates a striking contrast that adds warmth and sophistication. A built-in hanging rod offers additional functionality.",
          features: [
            feature("Triple Washer Setup: Three side-by-side washers provide high capacity for busy families, making laundry tasks quicker and more efficient."),
            feature("Glossy Upper Cabinets: The glossy white upper cabinets add a modern touch and offer concealed storage for laundry supplies."),
            feature("Wooden Backsplash: The dark wooden backsplash creates a beautiful contrast against the white cabinetry, adding warmth and elegance."),
            feature("Integrated Hanging Rod: A built-in rod above the countertop provides a convenient spot for hanging clothes straight from the wash."),
          ],
        },
      },
    ],
  },
  {
    title: "Garage Storage",
    desc: "Transform your garage from a cluttered catch-all to an organized, functional space.",
    images: [],
    projects: [
      {
        image: storageGarage,
        label: "Tall Cabinets, Wood Finish",
        desc: "Tall storage cabinets with a sleek wood finish organize the garage from floor to ceiling.",
        details: {
          title: "Tall Garage Storage Cabinets with Wood Finish and Customization Options",
          intro: "This garage features tall garage storage cabinets with a sleek wood finish, offering extensive vertical storage to organize a variety of items efficiently. The custom design integrates seamlessly into the space, providing a versatile solution for keeping the garage neat and clutter-free.",
          features: [
            feature("Wall-Mounted Overhead Cabinets: These overhead cabinets maximize storage space by utilizing the wall area, ideal for storing less frequently used items."),
            feature("Integrated Drawers for Small Tools: The inclusion of drawers provides a dedicated space for organizing small tools and accessories."),
            feature("Adjustable Shelving Units: The shelving units within the cabinets can be adjusted to accommodate items of various sizes."),
            feature("Hidden Compartments: The design includes hidden compartments for securing valuable items or keeping clutter out of sight."),
          ],
        },
      },
    ],
  },
  {
    title: "Home Office",
    desc: "Create a productive and inspiring workspace with our home office ideas.",
    images: [],
    projects: [
      {
        image: storageOffice,
        label: "Corner Desks, Light Wood",
        desc: "Ergonomic corner desks and light wood finishes maximize a small home office footprint.",
        details: {
          title: "Modern Home Office with Corner Desks and Light Wood Finishes",
          intro: "This modern home office setup is designed for optimal functionality and style, featuring sleek, light wood finishes and ergonomic corner desks that maximize workspace. The layout is perfect for small spaces, efficiently utilizing every corner to provide ample storage and surface area for productivity.",
          features: [
            feature("Ergonomic corner desks: The L-shaped corner desks provide a spacious workspace while maximizing the use of available room."),
            feature("Light wood finishes: The light wood cabinetry and desks offer a clean, contemporary look that enhances the brightness of the space."),
            feature("Built-in storage solutions: Integrated drawers and cabinets offer plenty of storage options to keep the workspace organized."),
            feature("Efficient use of space: The layout optimizes corner spaces, making this office design perfect for tight areas or limited square footage."),
          ],
        },
      },
      {
        image: darkOffice,
        label: "Custom Wood Cabinetry",
        desc: "A curved desk and rich wood tones create a professional, inviting workspace.",
        details: {
          title: "Modern Home Office with Custom Wood Cabinetry and Integrated Storage",
          intro: "This modern home office features a sophisticated design with custom-built wood cabinetry. The office includes a spacious, curved desk that serves as the focal point of the room, complemented by extensive shelving and closed cabinets for ample storage. The rich wood tones add warmth and elegance.",
          features: [
            feature("Custom Built-In Shelving: Expansive built-in shelving along the wall provides open storage for books, decorative items, and office essentials."),
            feature("Concealed Cabinet Storage: Closed cabinets with sleek handles offer concealed storage for files, office supplies, and personal items."),
            feature("Spacious Desk with Integrated Drawers: The large, curved desk includes integrated drawers for additional storage."),
            feature("Accent Lighting: Built-in accent lighting above the cabinets adds a touch of sophistication and enhances the room's ambiance."),
          ],
        },
      },
    ],
  },
  {
    title: "More Storage Ideas",
    desc: "Discover innovative storage solutions for every corner of your home.",
    images: [],
    projects: [
      {
        image: storageMore,
        label: "Under-Stairs & Sloped Ceilings",
        desc: "Custom shelving turns an awkward sloped ceiling or under-stair nook into functional storage.",
        details: {
          title: "Small Space Storage Idea for Under Stairs or Sloped Ceilings",
          intro: "A small storage solution designed to maximize the use of space under a sloped ceiling, making it perfect for small spaces or unconventional areas like attics and under-stair nooks. The custom-built shelving unit incorporates various cubbies and shelves, providing flexible storage options.",
          features: [
            feature("Custom Built-In Shelving: The shelving is custom-built to fit perfectly within the sloped ceiling space, offering a tailored solution for small spaces."),
            feature("Modular Design: The modular shelving system allows for flexible configurations, making it adaptable to various needs and room shapes."),
            feature("Utilization of Vertical Space: The shelves utilize vertical space effectively, turning a narrow area into a practical storage solution."),
            feature("Creative Use of Underutilized Areas: This solution transforms often overlooked spaces into functional storage zones."),
          ],
        },
      },
      {
        image: murphyBed,
        label: "Custom Murphy Bed",
        desc: "A fold-down wooden Murphy bed with built-in shelving blends seamlessly into the cabinetry.",
        details: {
          title: "Custom Wooden Murphy Bed with Built-In Shelving and Storage Solutions",
          intro: "This custom wooden Murphy bed seamlessly combines functionality with a sophisticated design, making it an ideal space-saving solution for modern homes. The bed's fold-down mechanism allows it to effortlessly blend into the surrounding cabinetry when not in use. Flanked by built-in shelving and storage compartments, it's perfect for guest rooms, home offices, or small apartments.",
          features: [
            feature("Built-In Shelving for Extra Storage: Integrated shelves on both sides offer practical storage for books, decorative items, and everyday essentials."),
            feature("Custom Cabinets for a Seamless Look: The side cabinets are custom-built to match the bed's wooden finish, providing a cohesive and elegant look."),
            feature("Fold-Down Bed with Space-Saving Benefits: The fold-down mechanism allows the bed to be easily stored away, transforming the room during the day."),
            feature("Integrated Lighting: Soft, integrated lighting above the bed adds a warm ambiance and practical illumination."),
          ],
        },
      },
      {
        image: wineRack,
        label: "Luxury Wine Cellar",
        desc: "Floor-to-ceiling custom wine racks with a rolling ladder for an impressive collection.",
        details: {
          title: "Luxury Wine Cellar with Tall Custom Wine Racks and Ladder Access",
          intro: "A grand luxury wine cellar featuring tall custom wine racks that span from floor to ceiling, providing extensive storage for an impressive wine collection. The design includes a rolling ladder for easy access to the upper rows, emphasizing both functionality and elegance. The rich wood finish and ambient lighting create a warm, inviting atmosphere.",
          features: [
            feature("Tall Custom Wine Racks: Floor-to-ceiling racks maximize storage capacity and provide an impressive display."),
            feature("Rolling Ladder Access: A functional ladder adds convenience and accessibility to the upper wine racks."),
            feature("Rich Wood Finish: The luxurious wood tones enhance the aesthetic appeal, adding warmth to the space."),
            feature("Ambient Lighting: Soft lighting highlights the wine collection, creating an inviting and elegant atmosphere."),
          ],
        },
      },
    ],
  },
];

export const Route = createFileRoute("/home-organization-idea-gallery")({
  head: () =>
    pageHead({
      title: "Home Organization & Custom Closet Photo Gallery | JL Closets",
      description: "A curated gallery of custom closets and storage solutions — walk-in closets, pantries, entertainment centers, home offices, and more — designed to inspire your next project.",
      path: "/home-organization-idea-gallery",
      image: `${SITE_URL}${heroImg}`,
    }),
  component: IdeaGallery,
});

function IdeaGallery() {
  const [consultOpen, setConsultOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-clip">
      <Header onConsultOpen={() => setConsultOpen(true)} />

      <main>
        <ProductHeroSection
          title="Home Organization & Custom Closet Idea Gallery"
          description="Modern built-in storage ideas for every home."
          image={heroImg}
          imageAlt="Luxury custom walk-in closet by JL Closets"
          onConsultOpen={() => setConsultOpen(true)}
        />
        <PageBreadcrumbs />

        <ProductSolutionsSection
          intro="A curated collection of inspiration for transforming your living spaces — from luxurious walk-in closets to clever small-space storage ideas, explore the possibilities for every room in your home."
          solutions={SOLUTIONS}
        />

        <SuccessStoriesSection />

        <CtaBannerSection onConsultOpen={() => setConsultOpen(true)} />
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

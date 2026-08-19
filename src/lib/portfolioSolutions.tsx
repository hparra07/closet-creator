import type { ProductSolution, ProjectDetails } from "@/components/sections/ProductSolutionsSection";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolioProjects";

// Real project copy pulled from jlclosets.com/portfolio/ (the live reference
// site) — one details block per project, matched by name to PORTFOLIO_PROJECTS.
const PROJECT_DETAILS: Record<string, ProjectDetails> = {
  "Wellington Residence": {
    title: "Uniquely Designed Spaces for an Exclusive Estate",
    intro: (
      <>
        <p>This high-end project reflects the grandeur and exclusivity of its surroundings, with each space crafted to perfectly complement the architectural style of the estate. Custom designs throughout the home, from walk-in closets to an elegant master bathroom, have been tailored with precision to reflect the unique identity and luxurious nature of the property. The interiors were designed with a blend of timeless elegance and modern sophistication, creating a seamless flow between spaces that cater to both form and function.</p>
        <p>The master bathroom features clean lines, high-gloss finishes, and a sophisticated use of lighting to elevate the overall ambiance. Adjacent to this, a custom wardrobe area showcases illuminated display cabinets designed for storing and displaying personal collections, turning a functional space into a true design statement. Throughout the home, custom cabinetry, sleek glass doors, and high-quality materials come together to offer a space that is both functional and truly luxurious.</p>
        <p>This project highlights the balance between practicality and extravagance, making each area not only visually stunning but also highly functional for the homeowners. From the custom closet systems to the elegant storage solutions, every detail reflects a commitment to high-quality craftsmanship and a deep understanding of what it means to live in style.</p>
      </>
    ),
    features: [],
  },
  "Le Lac Residence": {
    title: "Custom Walk-In Closets and Kitchen Pantry with Marble Island for Refined Living",
    intro: (
      <>
        <p>This project showcases the perfect blend of luxury, functionality, and timeless style, seamlessly integrated across multiple spaces. The walk-in closets—one for him and one for her—are thoughtfully designed to create an organized, stress-free environment. With ample hanging space, custom shelving, and built-in drawers, these closets not only store a wardrobe but also display it beautifully. The soft, warm wood tones paired with elegant brass hardware add a touch of sophistication, transforming the closets into personalized retreats.</p>
        <p>In the kitchen, the pantry maximizes both convenience and aesthetic appeal. Open shelving and custom cabinetry offer smart storage solutions that make everyday tasks more efficient, all while maintaining a sense of elegance. Whether it's for pantry essentials or entertaining supplies, this space is designed with both practicality and beauty in mind.</p>
        <p>A true centerpiece of the project is the lighted marble island, which goes beyond mere functionality. The illuminated countertop radiates a soft, inviting glow, highlighting the natural beauty of the marble and adding a luxurious touch to the kitchen. It serves as both a striking focal point and a practical workspace, embodying the balance of form and function.</p>
        <p>Each element of this project has been crafted with meticulous attention to detail, from the seamless flow between rooms to the high-end finishes that enhance the overall aesthetic. This project reflects a commitment to quality and craftsmanship, creating spaces that are not only beautiful but also tailored for lasting comfort and refined living.</p>
      </>
    ),
    features: [],
  },
  "Azalea, Boca Raton": {
    title: "Spacious Custom Walk-In Closets for Ultimate Organization",
    intro: (
      <>
        <p>In this project, we designed two walk-in closets—one spacious and the other crafted from a small storage area, exemplifying the versatility and adaptability of our custom designs.</p>
        <p>The larger walk-in closet is a stunning, expansive space, adorned with luxurious finishes, an elegant chandelier, and custom shelving systems that maximize storage. Built-in drawers, open shelving, and dual hanging sections provide the ultimate organization for clothing, accessories, and more. The neutral tones and golden accents lend a sophisticated and timeless appeal to the space, enhancing both form and function.</p>
        <p>In contrast, the small walk-in closet is a transformation from a previously underutilized storage area into a fully customized, functional closet. The smart use of vertical space with built-in drawers and shelves maximizes every inch, ensuring that even smaller spaces can offer optimal storage solutions. The sleek white design keeps the space open and airy, offering an elegant solution to limited square footage.</p>
      </>
    ),
    features: [],
  },
  "Royal Palm Residence": {
    title: "Elegant Custom Walk-In Closets with Warm Wood Finishes and Thoughtful Lighting",
    intro: (
      <>
        <p>In this beautiful and functional walk-in closet, we transformed the space with a warm wood finish that feels both inviting and sophisticated. The soft wood tones, paired with strategic built-in lighting, create a cozy yet modern ambience. Each wardrobe section is carefully illuminated, making it easier to see and organize clothing, shoes, and accessories. The mirrored cabinet doors reflect light, further brightening the room while adding a touch of elegance.</p>
        <p>The island in the center features deep, custom drawers that are ideal for storing folded items, accessories, or valuables. Every inch of space is maximized to avoid clutter, leaving ample floor room for a spacious, open feel. The built-in makeup vanity is both practical and stylish, offering a dedicated space to get ready. It features a continuous wood grain finish, tying it perfectly into the overall design. The chair adds a soft touch, inviting comfort into the daily routine.</p>
        <p>In the smaller white walk-in closet adjacent to the bathroom, the design focuses on optimizing the compact space. Despite its size, the use of crisp white finishes and minimalist shelving turns it into a bright, highly functional storage area. Adjustable shelves, hanging rods, and drawers ensure every item has a home, while the white finish reflects light, making the area feel more expansive than it is. What was once a simple storage nook now offers a clean, refreshing space with room for clothing, towels, and essentials.</p>
        <p>In both closets, the attention to detail and customization shine through, ensuring each area is tailored to the client's needs and lifestyle.</p>
      </>
    ),
    features: [],
  },
  "Royal Palm Country Club Residence": {
    title: "A Thoughtfully Crafted Closet Designed for Elegance and Everyday Ease",
    intro: (
      <>
        <p>This custom closet is designed with the perfect balance of luxury and functionality, making it more than just a place to store your clothes—it's an extension of your lifestyle. The soft wood finish throughout the space brings a sense of calm, blending elegance with a modern touch that feels effortlessly sophisticated. Each detail has been carefully considered to ensure that the closet not only looks beautiful but also makes your everyday routine more streamlined and enjoyable.</p>
        <p>The floating shelves offer ample storage without overwhelming the space, creating an airy, open feel while still providing easy access to all your essentials. The custom drawers, with their clean, handle-free design, are built to glide smoothly and close quietly, adding to the serene atmosphere. They offer plenty of space to store folded clothes and other personal items, all while maintaining the closet's minimalist aesthetic.</p>
        <p>Hanging sections have been expertly tailored to accommodate a variety of wardrobe items, whether it's long dresses, jackets, or shorter garments. Each section is thoughtfully organized, so everything has its place without feeling cramped. The custom shoe shelves not only display your footwear in style but also contribute to the overall sense of spaciousness and order.</p>
        <p>Even the smallest details, like the built-in power outlets and discreetly placed light switches, are designed for ease of use. Whether you need to charge your phone or power up a device, everything is seamlessly integrated, making this closet as practical as it is beautiful.</p>
        <p>In this space, every feature feels personal and purposeful, turning what could be a simple closet into a tailored experience that's all about you.</p>
      </>
    ),
    features: [],
  },
  "Men's Walk-In Closet": {
    title: "Sophisticated Men's Walk-In Closet with Custom Ladder and Glass Cabinets",
    intro: (
      <>
        <p>This walk-in closet was thoughtfully designed for him, blending style and functionality in every corner. The rich dark wood finish sets a sophisticated tone, while the sleek sliding ladder makes accessing the higher shelves effortless, adding a touch of refinement to the space.</p>
        <p>We've maximized storage with custom hanging rods, perfectly spaced for suits, jackets, and formal wear, ensuring everything remains organized and accessible. The glass-front cabinets offer a refined way to showcase prized accessories or collections, while keeping them protected from dust.</p>
        <p>Throughout the closet, strategically placed LED lighting enhances both the visibility and ambiance, making it easier to view clothing options in any lighting condition. Every inch of this space was designed with luxury and practicality in mind, ensuring a walk-in closet that not only meets his storage needs but elevates his everyday dressing experience.</p>
      </>
    ),
    features: [],
  },
  "Delray Residence": {
    title: "Efficient and Stylish Mudroom and Laundry Room Combination",
    intro: (
      <>
        <p>This mudroom and laundry room combination is a perfect example of maximizing space without sacrificing style or functionality. Designed to offer both practicality and elegance, this compact space includes custom woodgrain cabinetry that provides ample storage for laundry essentials and everyday items. The upper cabinets keep everything neatly organized, while the sleek drawers offer additional room for storing smaller items. The stacked washer and dryer allow for efficient use of vertical space, leaving plenty of room for other features.</p>
        <p>A custom-built bench with integrated storage is a key element, providing a comfortable seating area while doubling as a practical solution for storing shoes or bags. Above the bench, a set of sturdy hooks offers an ideal spot for hanging coats, jackets, or accessories, transforming this corner into a functional mudroom area.</p>
        <p>To enhance the utility of the space, an undermount sink is seamlessly integrated into the countertop, perfect for hand-washing delicate fabrics or other laundry tasks. Subtle under-cabinet lighting adds both functionality and a touch of sophistication, illuminating the workspace and adding a warm, welcoming ambiance to the room.</p>
        <p>This design is a testament to how thoughtful planning and quality craftsmanship can turn a small area into a highly efficient, stylish, and multi-functional space.</p>
      </>
    ),
    features: [],
  },
  "Las Olas Residence": {
    title: "Personalized Luxury Walk-In Closet with Glass Enclosure and Custom Lighting",
    intro: (
      <>
        <p>This modern walk-in closet is enclosed in elegant glass doors, creating a distinct space for organized luxury. Designed to reflect the personality and style of its owner, the room combines sleek storage solutions with a sense of individualized charm. The custom cabinetry features a dark, textured wood finish that contrasts beautifully with the soft, neutral tones of the surrounding space.</p>
        <p>Each element is carefully lit with custom ribbon lighting, wardrobe lighting, and accent lighting, offering not just illumination but a refined atmosphere. Open shelving, integrated drawers, and hanging space provide ample room for clothing and accessories, while the custom-designed shoe racks at the base keep everything within easy reach. Floating shelves allow for the display of personal items, adding character and depth to the room.</p>
        <p>The seating area in the center invites relaxation, making this not just a closet, but a true retreat. From designer handbags to carefully placed accent pieces, the storage is both functional and a showcase for luxury items. Thoughtful touches like pull-out hanging rods and sleek drawer handles ensure a seamless blend of practicality and sophistication. Every detail of this walk-in closet has been considered, ensuring it is as beautiful as it is functional.</p>
      </>
    ),
    features: [],
  },
  "Lighthouse Point Residence": {
    title: "Custom Walk-In Closet with Floor-to-Ceiling Storage and Premium Finishes",
    intro: (
      <>
        <p>This walk-in closet masterfully maximizes every square inch of space, showcasing a blend of modern design and practical functionality. The premium floor-to-ceiling shelving provides ample storage for clothes and accessories, with smooth lines that transition seamlessly into corner units, ensuring no space is wasted. The closet doors, fitted with mirrors, not only reflect light to brighten the space but also add a sleek, contemporary touch to the design.</p>
        <p>The chandelier, with its geometric sparkle, is more than just lighting—it's a statement piece that ties the room together. Every drawer is carefully crafted with minimalist handles, reinforcing the modern aesthetic while ensuring functionality is never compromised. The polished chrome hardware complements the clean lines and adds a subtle luxury.</p>
        <p>This custom-built closet is a perfect example of how thoughtful design can transform a space into something both beautiful and highly functional, offering a truly personalized storage solution.</p>
      </>
    ),
    features: [],
  },
  "Palm Beach Residence": {
    title: "Custom Luxury Closet with Enhanced Lighting and Built-In Shoe Storage",
    intro: (
      <>
        <p>This luxurious custom closet perfectly blends style with function, featuring meticulously designed storage solutions for a wide variety of wardrobe items. The floor-to-ceiling organization includes dedicated shelves for shoes, ample hanging space for clothing, and additional overhead compartments for accessories and storage bins. The soft lighting illuminates each section, ensuring easy visibility and accessibility.</p>
        <p>The design also incorporates a chic display area with heart artwork, adding a personal touch to the space. A plush fur-lined bench sits in the center, providing both comfort and elegance. Glass-fronted drawers with sleek blue hardware lend a modern yet playful vibe, while the clear surfaces allow for an effortless showcase of personal accessories.</p>
        <p>Perfect for fashion enthusiasts, this custom closet is the ideal blend of aesthetics and practicality, making it easy to store and display an expansive wardrobe collection.</p>
      </>
    ),
    features: [],
  },
  "Four Seasons Parkland": {
    title: "Bold Design Meets Functionality",
    intro: (
      <>
        <p>For this commercial project, we designed and installed a vibrant set of custom storage lockers in a high-traffic space. The bold, high-gloss blue lockers not only add a modern aesthetic but also provide practical, secure storage for the facility. Each locker is equipped with durable metal hardware, ensuring easy access and long-term functionality. The sleek finish reflects light beautifully, enhancing the room's natural brightness. Designed for both style and durability, these lockers are ideal for use in busy environments such as schools, offices, or recreational centers.</p>
        <p>This project maximizes storage space while maintaining a clean, organized look. The use of vibrant blue adds energy to the commercial setting, creating an inviting atmosphere for users. The room, with large windows and ample natural light, emphasizes the reflective quality of the lockers, integrating functionality with modern design. With each locker being lockable and spacious, they offer secure storage while keeping the overall design streamlined and efficient.</p>
        <p>This is a perfect example of JL Closets' ability to bring creative storage solutions to commercial spaces, combining aesthetics with practicality.</p>
      </>
    ),
    features: [],
  },
  "The Bridges Residence": {
    title: "Luxurious Custom Closet Design with Tailored Storage Solutions",
    intro: (
      <>
        <p>This bespoke luxury closet is the epitome of high-end design and meticulous craftsmanship. The floor-to-ceiling custom cabinetry is accented with glass-front doors, allowing for a perfect display of your finest wardrobe pieces. The ample drawer space, adorned with sleek hardware, ensures that every item has its place, while the integrated mirrors add an element of convenience and elegance.</p>
        <p>The corner shelving and slanted shoe racks are not just practical but elevate the closet to a showroom-like space, ideal for anyone with an expansive collection. A dedicated area for accessories ensures that jewelry, watches, and other valuables are stored safely yet remain easily accessible. The room is crowned by a stunning chandelier, adding a final touch of glamour and highlighting the custom millwork and finishes throughout the space.</p>
        <p>Tailored for clients who appreciate the finest in luxury living, this closet is not just about storage—it's about creating a personal retreat that complements your lifestyle.</p>
      </>
    ),
    features: [],
  },
};

export const PORTFOLIO_SOLUTIONS: ProductSolution[] = PORTFOLIO_PROJECTS.map((project) => ({
  title: project.name,
  desc: `${project.images.length} photos from this project.`,
  images: project.images.map((img) => img.src),
  projects: project.images.map((img, i) => ({
    image: img.src,
    label: PROJECT_DETAILS[project.name].title,
    alt: img.alt,
    desc: `Photo ${i + 1} of ${project.images.length}.`,
    details: PROJECT_DETAILS[project.name],
  })),
}));

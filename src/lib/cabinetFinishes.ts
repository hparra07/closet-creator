import espressoTextured from "@/assets/cabinet-finishes/espresso-textured-custom-closet-and-cabinet-finish.jpg";
import lightOakTextured from "@/assets/cabinet-finishes/light-oak-custom-closet-and-cabinet-finish.jpg";
import bleachedWhiteTextured from "@/assets/cabinet-finishes/bleached-white-textured-custom-closet-and-cabinet-finish.jpg";
import grayTextured from "@/assets/cabinet-finishes/gray-textured-custom-closet-and-cabinet-finish.jpg";
import darkGrayTextured from "@/assets/cabinet-finishes/dark-gray-textured-custom-closet-and-cabinet-finish.jpg";
import beigeOakTextured from "@/assets/cabinet-finishes/beige-oak-textured-custom-closet-and-cabinet-finish.jpg";

import stripedGray from "@/assets/cabinet-finishes/striped-gray-custom-closet-and-cabinet-finish.jpg";
import grayCloth from "@/assets/cabinet-finishes/gray-cloth-custom-closet-and-cabinet-finish.jpg";
import lightGrayFlat from "@/assets/cabinet-finishes/light-gray-custom-closet-and-cabinet-finish.jpg";
import lightWalnut from "@/assets/cabinet-finishes/light-walnut-custom-closet-and-cabinet-finish.jpg";
import sunnyElme from "@/assets/cabinet-finishes/sunny-elme-custom-closet-and-cabinet-finish.jpg";
import eveningElme from "@/assets/cabinet-finishes/evening-elme-custom-closet-and-cabinet-finish.jpg";
import sandLinen from "@/assets/cabinet-finishes/sand-linen-custom-closet-and-cabinet-finish.jpg";
import ironGrayLinen from "@/assets/cabinet-finishes/iron-gray-linen-custom-closet-and-cabinet-finish.jpg";
import bleachedLinen from "@/assets/cabinet-finishes/bleached-linen-custom-closet-and-cabinet-finish.jpg";
import featheredLinen from "@/assets/cabinet-finishes/feathered-linen-custom-closet-and-cabinet-finish.jpg";
import walnut from "@/assets/cabinet-finishes/walnut-custom-closet-and-cabinet-finish.jpg";
import onyx from "@/assets/cabinet-finishes/onyx-custom-closet-and-cabinet-finish.jpg";

import darkGraySuperMatte from "@/assets/cabinet-finishes/dark-gray-super-matte-custom-closet-and-cabinet-finish.jpg";
import lightGraySuperMatte from "@/assets/cabinet-finishes/light-gray-super-matte-custom-closet-and-cabinet-finish.jpg";
import stormyGrayMatte from "@/assets/cabinet-finishes/stormy-gray-matte-custom-closet-and-cabinet-finish.jpg";
import latteSuperMatte from "@/assets/cabinet-finishes/latte-super-matte-custom-closet-and-cabinet-finish.jpg";

import snowWhite from "@/assets/cabinet-finishes/snow-white-custom-closet-and-cabinet-finish.jpg";
import winterWhite from "@/assets/cabinet-finishes/winter-white-custom-closet-and-cabinet-finish.jpg";

import taupeGloss from "@/assets/cabinet-finishes/taupe-gloss-custom-closet-and-cabinet-finish.jpg";
import glacialGloss from "@/assets/cabinet-finishes/glacial-gloss-custom-closet-and-cabinet-finish.jpg";

export type CabinetFinish = { name: string; image: string };
export type CabinetFinishCategory = { title: string; description: string; finishes: CabinetFinish[] };

export const CABINET_FINISH_CATEGORIES: CabinetFinishCategory[] = [
  {
    title: "Textures You Can Feel — Natural Wood Finishes",
    description:
      "Bring the warmth and elegance of natural wood to your high-end wardrobe with our richly textured finishes. From the deep sophistication of espresso wood to the refined beauty of bleached oak, each texture adds depth and warmth to walk-in closets, sectional wardrobes, and built-in storage.",
    finishes: [
      { name: "Espresso Textured", image: espressoTextured },
      { name: "Light Oak Textured", image: lightOakTextured },
      { name: "Bleached White Textured", image: bleachedWhiteTextured },
      { name: "Gray Textured", image: grayTextured },
      { name: "Dark Gray Textured", image: darkGrayTextured },
      { name: "Beige Oak Textured", image: beigeOakTextured },
    ],
  },
  {
    title: "Nature-Inspired Elegance — Linen-Textured Finishes",
    description:
      "Soft, sophisticated, and timeless — our linen-inspired finishes bring a touch of nature into your custom wardrobe, with textures reminiscent of fine fabrics and woven textiles that blend seamlessly with contemporary and classic closet designs.",
    finishes: [
      { name: "Striped Gray", image: stripedGray },
      { name: "Gray Cloth", image: grayCloth },
      { name: "Light Gray Flat", image: lightGrayFlat },
      { name: "Light Walnut", image: lightWalnut },
      { name: "Sunny Elme", image: sunnyElme },
      { name: "Evening Elme", image: eveningElme },
      { name: "Sand Linen", image: sandLinen },
      { name: "Iron Gray Linen", image: ironGrayLinen },
      { name: "Bleached Linen", image: bleachedLinen },
      { name: "Feathered Linen", image: featheredLinen },
      { name: "Walnut", image: walnut },
      { name: "Onyx", image: onyx },
    ],
  },
  {
    title: "Matte Magic — Sleek Matte Finishes",
    description:
      "Minimalist, modern, and effortlessly chic — our matte finishes redefine sophistication for luxury walk-in closets and built-in wardrobes, with ultra-smooth surfaces that create a sleek look while reducing glare and fingerprints.",
    finishes: [
      { name: "Dark Gray Super Matte", image: darkGraySuperMatte },
      { name: "Light Gray Super Matte", image: lightGraySuperMatte },
      { name: "Stormy Gray Matte", image: stormyGrayMatte },
      { name: "Latte Super Matte", image: latteSuperMatte },
    ],
  },
  {
    title: "The Timeless Appeal of White — Classic White Finishes",
    description:
      "Bright, clean, and endlessly versatile — our white finishes offer the ultimate in luxury wardrobe design, enhancing natural light and creating an elegant, airy atmosphere for modern walk-in closets and custom built-in wardrobes.",
    finishes: [
      { name: "Snow White", image: snowWhite },
      { name: "Winter White", image: winterWhite },
    ],
  },
  {
    title: "Get Your Gloss On — High-Gloss Finishes",
    description:
      "Reflective, high-impact, and undeniably luxurious — our gloss finishes add depth and radiance to your custom wardrobe, amplifying light for a bright, sophisticated aesthetic in high-end walk-in closets.",
    finishes: [
      { name: "Taupe Gloss", image: taupeGloss },
      { name: "Glacial Gloss", image: glacialGloss },
    ],
  },
];

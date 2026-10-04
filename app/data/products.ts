export type ProductCategory =
  | "Incense & Dhoop"
  | "Diyas & Lamps"
  | "Puja Kits"
  | "Brass & Copper"
  | "Kumkum & Powders"
  | "Oils & Camphor"
  | "Sacred Essentials";

export interface CatalogProduct {
  id: string;
  category: ProductCategory;
  image: string;
  price: string;
  unit: "pack" | "piece" | "set" | "bottle" | "box";
  packSize?: string;
  inStock?: boolean;
}

/** Structural catalog — names/descriptions live in messages/{locale}.json */
export const CATALOG: CatalogProduct[] = [
  // Amrutha aromatics (from amrutha_aromatics_products.xlsx)
  { id: "sambraniCup", category: "Incense & Dhoop", image: "/products/aromatics/sambrani-cup.jpeg", price: "₹84", unit: "pack", inStock: true },
  { id: "kewdaIncenseCones", category: "Incense & Dhoop", image: "/products/aromatics/kewda-incense-cones.jpeg", price: "₹75", unit: "box", packSize: "80g jar", inStock: true },
  { id: "sandalIncenseCones", category: "Incense & Dhoop", image: "/products/aromatics/sandal-incense-cones.jpeg", price: "₹75", unit: "box", packSize: "80g jar", inStock: true },
  { id: "muskIncenseCones", category: "Incense & Dhoop", image: "/products/aromatics/musk-incense-cones.jpeg", price: "₹75", unit: "box", packSize: "80g jar", inStock: true },
  { id: "mograIncenseCones", category: "Incense & Dhoop", image: "/products/aromatics/mogra-incense-cones.jpeg", price: "₹75", unit: "box", packSize: "80g jar", inStock: true },
  { id: "firdousIncenseCones", category: "Incense & Dhoop", image: "/products/aromatics/firdous-incense-cones.jpeg", price: "₹75", unit: "box", packSize: "80g jar", inStock: true },
  { id: "sugandhIncenseCones", category: "Incense & Dhoop", image: "/products/aromatics/sugandh-incense-cones.jpeg", price: "₹75", unit: "box", packSize: "80g jar", inStock: true },
  { id: "gulabIncenseCones", category: "Incense & Dhoop", image: "/products/aromatics/gulab-incense-cones.jpeg", price: "₹75", unit: "box", packSize: "80g jar", inStock: true },
  { id: "lavenderIncenseCones", category: "Incense & Dhoop", image: "/products/aromatics/lavender-incense-cones.jpeg", price: "₹75", unit: "pack", packSize: "80g", inStock: true },
  { id: "phalamruthaIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/phalamrutha-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "120g zipper pack", inStock: true },
  { id: "belaAndMimosaIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/bela-and-mimosa-incense-sticks-agarbatti.jpeg", price: "₹70", unit: "pack", packSize: "110g zipper pack", inStock: true },
  { id: "panchamruthaIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/panchamrutha-incense-sticks-agarbatti.jpeg", price: "₹135", unit: "pack", packSize: "240g zipper pack", inStock: true },
  { id: "special4IncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/special-4-incense-sticks.jpeg", price: "₹135", unit: "pack", packSize: "200g zipper pack", inStock: true },
  { id: "sugandhIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/sugandh-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "goldenFlowersIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/golden-flowers-incense-sticks-agarbatti.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "mograIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/mogra-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "firdousIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/firdous-incense-sticks-agarbatti.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "n3In1IncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/3-in-1-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "114g zipper pack", inStock: true },
  { id: "lavenderIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/lavender-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "shahiGulabDhoopSticks", category: "Incense & Dhoop", image: "/products/aromatics/shahi-gulab-dhoop-sticks.jpeg", price: "₹115", unit: "box", packSize: "150g jar", inStock: false },
  { id: "sandalwoodDhoopSticks", category: "Incense & Dhoop", image: "/products/aromatics/sandalwood-dhoop-sticks.jpeg", price: "₹115", unit: "box", packSize: "150g jar", inStock: true },
  { id: "champaIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/champa-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "lavenderDhoopSticks", category: "Incense & Dhoop", image: "/products/aromatics/lavender-dhoop-sticks.jpeg", price: "₹115", unit: "box", packSize: "150g jar", inStock: true },
  { id: "sandalIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/sandal-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "muskDhoopSticks", category: "Incense & Dhoop", image: "/products/aromatics/musk-dhoop-sticks.jpeg", price: "₹115", unit: "box", packSize: "150g jar", inStock: true },
  { id: "southernStarIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/southern-star-incense-sticks-agarbatti.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "jasmineDhoopSticks", category: "Incense & Dhoop", image: "/products/aromatics/jasmine-dhoop-sticks.jpeg", price: "₹115", unit: "box", packSize: "150g jar", inStock: false },
  { id: "kewdaIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/kewda-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "firdousDhoopSticks", category: "Incense & Dhoop", image: "/products/aromatics/firdous-dhoop-sticks.jpeg", price: "₹115", unit: "box", packSize: "150g jar", inStock: false },
  { id: "rajanigandhaIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/rajanigandha-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "herbalIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/herbal-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "sugandhDhoopSticks", category: "Incense & Dhoop", image: "/products/aromatics/sugandh-dhoop-sticks.jpeg", price: "₹115", unit: "box", packSize: "150g jar", inStock: false },
  { id: "regaliaIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/regalia-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "shahiKasturiIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/shahi-kasturi-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },
  { id: "shahiGulabIncenseSticks", category: "Incense & Dhoop", image: "/products/aromatics/shahi-gulab-agarbatti-incense-sticks.jpeg", price: "₹70", unit: "pack", packSize: "115g zipper pack", inStock: true },

  // Curated pooja essentials
  { id: "clayDiyaSet", category: "Diyas & Lamps", image: "/products/diyas/clay-diya-set.svg", price: "₹80", unit: "set", inStock: true },
  { id: "brassDiya", category: "Diyas & Lamps", image: "/products/diyas/brass-diya.svg", price: "₹350", unit: "piece", inStock: true },
  { id: "fiveWickDiya", category: "Diyas & Lamps", image: "/products/diyas/five-wick-diya.svg", price: "₹450", unit: "piece", inStock: true },
  { id: "cottonWicksPack", category: "Diyas & Lamps", image: "/products/diyas/cotton-wicks-pack.svg", price: "₹40", unit: "pack", inStock: true },
  { id: "dailyPujaKit", category: "Puja Kits", image: "/products/kits/daily-puja-kit.svg", price: "₹499", unit: "set", inStock: true },
  { id: "lakshmiPujaKit", category: "Puja Kits", image: "/products/kits/lakshmi-puja-kit.svg", price: "₹749", unit: "set", inStock: true },
  { id: "satyanarayanaKit", category: "Puja Kits", image: "/products/kits/satyanarayana-kit.svg", price: "₹899", unit: "set", inStock: true },
  { id: "grihaPraveshKit", category: "Puja Kits", image: "/products/kits/griha-pravesh-kit.svg", price: "₹1299", unit: "set", inStock: true },
  { id: "brassKalash", category: "Brass & Copper", image: "/products/brass/brass-kalash.svg", price: "₹550", unit: "piece", inStock: true },
  { id: "pujaThaliSet", category: "Brass & Copper", image: "/products/brass/puja-thali-set.svg", price: "₹699", unit: "set", inStock: true },
  { id: "brassBell", category: "Brass & Copper", image: "/products/brass/brass-bell.svg", price: "₹220", unit: "piece", inStock: true },
  { id: "ganeshBrassIdol", category: "Brass & Copper", image: "/products/brass/ganesh-brass-idol.svg", price: "₹850", unit: "piece", inStock: true },
  { id: "pureKumkum", category: "Kumkum & Powders", image: "/products/powders/pure-kumkum.svg", price: "₹60", unit: "box", inStock: true },
  { id: "haldiPowder", category: "Kumkum & Powders", image: "/products/powders/haldi-powder.svg", price: "₹50", unit: "box", inStock: true },
  { id: "chandanPowder", category: "Kumkum & Powders", image: "/products/powders/chandan-powder.svg", price: "₹180", unit: "box", inStock: true },
  { id: "camphorTablets", category: "Oils & Camphor", image: "/products/oils/camphor-tablets.svg", price: "₹75", unit: "pack", inStock: true },
  { id: "sesameOil", category: "Oils & Camphor", image: "/products/oils/sesame-oil.svg", price: "₹160", unit: "bottle", inStock: true },
  { id: "gheeDeepam", category: "Oils & Camphor", image: "/products/oils/ghee-deepam.svg", price: "₹280", unit: "bottle", inStock: true },
  { id: "havanSamagri", category: "Sacred Essentials", image: "/products/essentials/havan-samagri.svg", price: "₹200", unit: "pack", inStock: true },
  { id: "rudrakshaMala", category: "Sacred Essentials", image: "/products/essentials/rudraksha-mala.svg", price: "₹399", unit: "piece", inStock: true },
  { id: "agarbattiStand", category: "Sacred Essentials", image: "/products/essentials/agarbatti-stand.svg", price: "₹150", unit: "piece", inStock: true },
];

export const CATEGORY_FILTERS = [
  { id: "All", labelKey: "categoryAll" },
  { id: "Incense & Dhoop", labelKey: "categoryIncense" },
  { id: "Diyas & Lamps", labelKey: "categoryDiyas" },
  { id: "Puja Kits", labelKey: "categoryKits" },
  { id: "Brass & Copper", labelKey: "categoryBrass" },
  { id: "Kumkum & Powders", labelKey: "categoryPowders" },
  { id: "Oils & Camphor", labelKey: "categoryOils" },
  { id: "Sacred Essentials", labelKey: "categoryEssentials" },
] as const;

export const CATEGORY_LABEL_KEYS: Record<ProductCategory, string> = {
  "Incense & Dhoop": "categoryIncense",
  "Diyas & Lamps": "categoryDiyas",
  "Puja Kits": "categoryKits",
  "Brass & Copper": "categoryBrass",
  "Kumkum & Powders": "categoryPowders",
  "Oils & Camphor": "categoryOils",
  "Sacred Essentials": "categoryEssentials",
};

export const HERO_PRODUCTS = [
  { key: "sambraniCup", src: "/products/aromatics/sambrani-cup.jpeg", nameKey: "sambraniCup.name" },
  { key: "sandalIncenseSticks", src: "/products/aromatics/sandal-incense-sticks.jpeg", nameKey: "sandalIncenseSticks.name" },
  { key: "dailyPujaKit", src: "/products/kits/daily-puja-kit.svg", nameKey: "dailyPujaKit.name" },
  { key: "brassKalash", src: "/products/brass/brass-kalash.svg", nameKey: "brassKalash.name" },
  { key: "phalamruthaIncenseSticks", src: "/products/aromatics/phalamrutha-incense-sticks.jpeg", nameKey: "phalamruthaIncenseSticks.name" },
  { key: "lakshmiPujaKit", src: "/products/kits/lakshmi-puja-kit.svg", nameKey: "lakshmiPujaKit.name" },
  { key: "sandalwoodDhoopSticks", src: "/products/aromatics/sandalwood-dhoop-sticks.jpeg", nameKey: "sandalwoodDhoopSticks.name" },
  { key: "pujaThaliSet", src: "/products/brass/puja-thali-set.svg", nameKey: "pujaThaliSet.name" },
] as const;

export function getProductById(id: string): CatalogProduct | undefined {
  return CATALOG.find((p) => p.id === id);
}

export function getRelatedProducts(id: string, limit = 4): CatalogProduct[] {
  const current = getProductById(id);
  if (!current) return CATALOG.filter((p) => p.id !== id).slice(0, limit);
  const same = CATALOG.filter((p) => p.id !== id && p.category === current.category);
  const rest = CATALOG.filter((p) => p.id !== id && p.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

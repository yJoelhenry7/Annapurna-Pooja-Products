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
}

/** Structural catalog — names/descriptions live in messages/{locale}.json */
export const CATALOG: CatalogProduct[] = [
  // Incense & Dhoop (10)
  { id: "sandalAgarbatti", category: "Incense & Dhoop", image: "/products/incense/sandal-agarbatti.svg", price: "₹120", unit: "pack" },
  { id: "roseAgarbatti", category: "Incense & Dhoop", image: "/products/incense/rose-agarbatti.svg", price: "₹100", unit: "pack" },
  { id: "jasmineAgarbatti", category: "Incense & Dhoop", image: "/products/incense/jasmine-agarbatti.svg", price: "₹110", unit: "pack" },
  { id: "lobanDhoop", category: "Incense & Dhoop", image: "/products/incense/loban-dhoop.svg", price: "₹150", unit: "box" },
  { id: "guggulDhoop", category: "Incense & Dhoop", image: "/products/incense/guggul-dhoop.svg", price: "₹160", unit: "box" },
  { id: "sambraniCups", category: "Incense & Dhoop", image: "/products/incense/sambrani-cups.svg", price: "₹180", unit: "pack" },
  { id: "dryDhoopSticks", category: "Incense & Dhoop", image: "/products/incense/dry-dhoop-sticks.svg", price: "₹90", unit: "pack" },
  { id: "heenaAgarbatti", category: "Incense & Dhoop", image: "/products/incense/heena-agarbatti.svg", price: "₹130", unit: "pack" },
  { id: "premiumTempleIncense", category: "Incense & Dhoop", image: "/products/incense/premium-temple-incense.svg", price: "₹250", unit: "pack" },
  { id: "nagChampa", category: "Incense & Dhoop", image: "/products/incense/nag-champa.svg", price: "₹140", unit: "pack" },

  // Diyas & Lamps (8)
  { id: "clayDiyaSet", category: "Diyas & Lamps", image: "/products/diyas/clay-diya-set.svg", price: "₹80", unit: "set" },
  { id: "brassDiya", category: "Diyas & Lamps", image: "/products/diyas/brass-diya.svg", price: "₹350", unit: "piece" },
  { id: "fiveWickDiya", category: "Diyas & Lamps", image: "/products/diyas/five-wick-diya.svg", price: "₹450", unit: "piece" },
  { id: "hangingLamp", category: "Diyas & Lamps", image: "/products/diyas/hanging-lamp.svg", price: "₹650", unit: "piece" },
  { id: "deepamStand", category: "Diyas & Lamps", image: "/products/diyas/deepam-stand.svg", price: "₹400", unit: "piece" },
  { id: "akhandDiya", category: "Diyas & Lamps", image: "/products/diyas/akhand-diya.svg", price: "₹299", unit: "piece" },
  { id: "decorativeDiyaBox", category: "Diyas & Lamps", image: "/products/diyas/decorative-diya-box.svg", price: "₹220", unit: "box" },
  { id: "cottonWicksPack", category: "Diyas & Lamps", image: "/products/diyas/cotton-wicks-pack.svg", price: "₹40", unit: "pack" },

  // Puja Kits (8)
  { id: "dailyPujaKit", category: "Puja Kits", image: "/products/kits/daily-puja-kit.svg", price: "₹499", unit: "set" },
  { id: "satyanarayanaKit", category: "Puja Kits", image: "/products/kits/satyanarayana-kit.svg", price: "₹899", unit: "set" },
  { id: "ganeshChaturthiKit", category: "Puja Kits", image: "/products/kits/ganesh-chaturthi-kit.svg", price: "₹799", unit: "set" },
  { id: "lakshmiPujaKit", category: "Puja Kits", image: "/products/kits/lakshmi-puja-kit.svg", price: "₹749", unit: "set" },
  { id: "navagrahaKit", category: "Puja Kits", image: "/products/kits/navagraha-kit.svg", price: "₹999", unit: "set" },
  { id: "grihaPraveshKit", category: "Puja Kits", image: "/products/kits/griha-pravesh-kit.svg", price: "₹1299", unit: "set" },
  { id: "weddingPujaKit", category: "Puja Kits", image: "/products/kits/wedding-puja-kit.svg", price: "₹1499", unit: "set" },
  { id: "festivalEssentialsKit", category: "Puja Kits", image: "/products/kits/festival-essentials-kit.svg", price: "₹599", unit: "set" },

  // Brass & Copper (10)
  { id: "brassKalash", category: "Brass & Copper", image: "/products/brass/brass-kalash.svg", price: "₹550", unit: "piece" },
  { id: "copperKalash", category: "Brass & Copper", image: "/products/brass/copper-kalash.svg", price: "₹480", unit: "piece" },
  { id: "brassBell", category: "Brass & Copper", image: "/products/brass/brass-bell.svg", price: "₹220", unit: "piece" },
  { id: "pujaThaliSet", category: "Brass & Copper", image: "/products/brass/puja-thali-set.svg", price: "₹699", unit: "set" },
  { id: "copperLota", category: "Brass & Copper", image: "/products/brass/copper-lota.svg", price: "₹320", unit: "piece" },
  { id: "brassAartiPlate", category: "Brass & Copper", image: "/products/brass/brass-aarti-plate.svg", price: "₹280", unit: "piece" },
  { id: "ganeshBrassIdol", category: "Brass & Copper", image: "/products/brass/ganesh-brass-idol.svg", price: "₹850", unit: "piece" },
  { id: "lakshmiBrassIdol", category: "Brass & Copper", image: "/products/brass/lakshmi-brass-idol.svg", price: "₹900", unit: "piece" },
  { id: "shivaLingamStand", category: "Brass & Copper", image: "/products/brass/shiva-lingam-stand.svg", price: "₹750", unit: "set" },
  { id: "copperPanchapatra", category: "Brass & Copper", image: "/products/brass/copper-panchapatra.svg", price: "₹420", unit: "set" },

  // Kumkum & Powders (8)
  { id: "pureKumkum", category: "Kumkum & Powders", image: "/products/powders/pure-kumkum.svg", price: "₹60", unit: "box" },
  { id: "haldiPowder", category: "Kumkum & Powders", image: "/products/powders/haldi-powder.svg", price: "₹50", unit: "box" },
  { id: "vibhutiPack", category: "Kumkum & Powders", image: "/products/powders/vibhuti-pack.svg", price: "₹70", unit: "pack" },
  { id: "chandanPowder", category: "Kumkum & Powders", image: "/products/powders/chandan-powder.svg", price: "₹180", unit: "box" },
  { id: "gulalColors", category: "Kumkum & Powders", image: "/products/powders/gulal-colors.svg", price: "₹90", unit: "pack" },
  { id: "riceAkshata", category: "Kumkum & Powders", image: "/products/powders/rice-akshata.svg", price: "₹45", unit: "pack" },
  { id: "sindhoorBox", category: "Kumkum & Powders", image: "/products/powders/sindhoor-box.svg", price: "₹55", unit: "box" },
  { id: "abhishekamPowderSet", category: "Kumkum & Powders", image: "/products/powders/abhishekam-powder-set.svg", price: "₹250", unit: "set" },

  // Oils & Camphor (8)
  { id: "sesameOil", category: "Oils & Camphor", image: "/products/oils/sesame-oil.svg", price: "₹160", unit: "bottle" },
  { id: "coconutOilPuja", category: "Oils & Camphor", image: "/products/oils/coconut-oil-puja.svg", price: "₹140", unit: "bottle" },
  { id: "gheeDeepam", category: "Oils & Camphor", image: "/products/oils/ghee-deepam.svg", price: "₹280", unit: "bottle" },
  { id: "camphorTablets", category: "Oils & Camphor", image: "/products/oils/camphor-tablets.svg", price: "₹75", unit: "pack" },
  { id: "camphorBlocks", category: "Oils & Camphor", image: "/products/oils/camphor-blocks.svg", price: "₹110", unit: "pack" },
  { id: "roseWater", category: "Oils & Camphor", image: "/products/oils/rose-water.svg", price: "₹95", unit: "bottle" },
  { id: "sandalOil", category: "Oils & Camphor", image: "/products/oils/sandal-oil.svg", price: "₹320", unit: "bottle" },
  { id: "havanGhee", category: "Oils & Camphor", image: "/products/oils/havan-ghee.svg", price: "₹350", unit: "bottle" },

  // Sacred Essentials (8)
  { id: "rudrakshaMala", category: "Sacred Essentials", image: "/products/essentials/rudraksha-mala.svg", price: "₹399", unit: "piece" },
  { id: "sacredThread", category: "Sacred Essentials", image: "/products/essentials/sacred-thread.svg", price: "₹30", unit: "pack" },
  { id: "turmericCloth", category: "Sacred Essentials", image: "/products/essentials/turmeric-cloth.svg", price: "₹80", unit: "piece" },
  { id: "havanSamagri", category: "Sacred Essentials", image: "/products/essentials/havan-samagri.svg", price: "₹200", unit: "pack" },
  { id: "agarbattiStand", category: "Sacred Essentials", image: "/products/essentials/agarbatti-stand.svg", price: "₹150", unit: "piece" },
  { id: "pujaBellSmall", category: "Sacred Essentials", image: "/products/essentials/puja-bell-small.svg", price: "₹120", unit: "piece" },
  { id: "coconutSet", category: "Sacred Essentials", image: "/products/essentials/coconut-set.svg", price: "₹60", unit: "set" },
  { id: "betelNutPack", category: "Sacred Essentials", image: "/products/essentials/betel-nut-pack.svg", price: "₹50", unit: "pack" },
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
  { key: "dailyPujaKit", src: "/products/kits/daily-puja-kit.svg", nameKey: "dailyPujaKit.name" },
  { key: "brassKalash", src: "/products/brass/brass-kalash.svg", nameKey: "brassKalash.name" },
  { key: "brassDiya", src: "/products/diyas/brass-diya.svg", nameKey: "brassDiya.name" },
  { key: "sandalAgarbatti", src: "/products/incense/sandal-agarbatti.svg", nameKey: "sandalAgarbatti.name" },
  { key: "ganeshBrassIdol", src: "/products/brass/ganesh-brass-idol.svg", nameKey: "ganeshBrassIdol.name" },
  { key: "lakshmiPujaKit", src: "/products/kits/lakshmi-puja-kit.svg", nameKey: "lakshmiPujaKit.name" },
  { key: "camphorTablets", src: "/products/oils/camphor-tablets.svg", nameKey: "camphorTablets.name" },
  { key: "pujaThaliSet", src: "/products/brass/puja-thali-set.svg", nameKey: "pujaThaliSet.name" },
] as const;

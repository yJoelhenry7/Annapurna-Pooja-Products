import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const CATEGORY_COLORS = {
  incense: { bg: "#f5efe6", accent: "#6b4423", mid: "#a67c52" },
  diyas: { bg: "#faf6f0", accent: "#8b5a2b", mid: "#c4a574" },
  kits: { bg: "#f7f1e8", accent: "#5c3d2e", mid: "#b08968" },
  brass: { bg: "#f3ebe0", accent: "#7a5230", mid: "#d4a574" },
  powders: { bg: "#faf3eb", accent: "#9c4a3a", mid: "#c97b63" },
  oils: { bg: "#f6f0e6", accent: "#5a4632", mid: "#8f7350" },
  essentials: { bg: "#f8f2ea", accent: "#4a3728", mid: "#9a7b5a" },
};

function svgFor(label, folder) {
  const c = CATEGORY_COLORS[folder] || CATEGORY_COLORS.essentials;
  const short = label.length > 22 ? label.slice(0, 20) + "…" : label;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="g" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="55%" stop-color="${c.bg}"/>
      <stop offset="100%" stop-color="#e8dcc8"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <circle cx="256" cy="220" r="110" fill="none" stroke="${c.accent}" stroke-width="6" opacity="0.35"/>
  <circle cx="256" cy="220" r="72" fill="${c.mid}" opacity="0.55"/>
  <path d="M256 150c18 28 28 48 28 70s-12 40-28 52c-16-12-28-30-28-52s10-42 28-70z" fill="${c.accent}" opacity="0.85"/>
  <ellipse cx="256" cy="318" rx="48" ry="14" fill="${c.accent}" opacity="0.25"/>
  <text x="256" y="400" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${c.accent}">${short}</text>
  <text x="256" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="${c.mid}">Annapurna Pooja</text>
</svg>`;
}

const products = [
  ["incense", "sandal-agarbatti", "Sandal Agarbatti"],
  ["incense", "rose-agarbatti", "Rose Agarbatti"],
  ["incense", "jasmine-agarbatti", "Jasmine Agarbatti"],
  ["incense", "loban-dhoop", "Loban Dhoop"],
  ["incense", "guggul-dhoop", "Guggul Dhoop"],
  ["incense", "sambrani-cups", "Sambrani Cups"],
  ["incense", "dry-dhoop-sticks", "Dry Dhoop Sticks"],
  ["incense", "heena-agarbatti", "Heena Agarbatti"],
  ["incense", "premium-temple-incense", "Temple Incense"],
  ["incense", "nag-champa", "Nag Champa"],
  ["diyas", "clay-diya-set", "Clay Diya Set"],
  ["diyas", "brass-diya", "Brass Diya"],
  ["diyas", "five-wick-diya", "Five Wick Diya"],
  ["diyas", "hanging-lamp", "Hanging Lamp"],
  ["diyas", "deepam-stand", "Deepam Stand"],
  ["diyas", "akhand-diya", "Akhand Diya"],
  ["diyas", "decorative-diya-box", "Decorative Diyas"],
  ["diyas", "cotton-wicks-pack", "Cotton Wicks"],
  ["kits", "daily-puja-kit", "Daily Puja Kit"],
  ["kits", "satyanarayana-kit", "Satyanarayana Kit"],
  ["kits", "ganesh-chaturthi-kit", "Ganesh Kit"],
  ["kits", "lakshmi-puja-kit", "Lakshmi Puja Kit"],
  ["kits", "navagraha-kit", "Navagraha Kit"],
  ["kits", "griha-pravesh-kit", "Griha Pravesh Kit"],
  ["kits", "wedding-puja-kit", "Wedding Puja Kit"],
  ["kits", "festival-essentials-kit", "Festival Kit"],
  ["brass", "brass-kalash", "Brass Kalash"],
  ["brass", "copper-kalash", "Copper Kalash"],
  ["brass", "brass-bell", "Brass Bell"],
  ["brass", "puja-thali-set", "Puja Thali Set"],
  ["brass", "copper-lota", "Copper Lota"],
  ["brass", "brass-aarti-plate", "Aarti Plate"],
  ["brass", "ganesh-brass-idol", "Ganesh Idol"],
  ["brass", "lakshmi-brass-idol", "Lakshmi Idol"],
  ["brass", "shiva-lingam-stand", "Shiva Lingam"],
  ["brass", "copper-panchapatra", "Panchapatra"],
  ["powders", "pure-kumkum", "Pure Kumkum"],
  ["powders", "haldi-powder", "Haldi Powder"],
  ["powders", "vibhuti-pack", "Vibhuti"],
  ["powders", "chandan-powder", "Chandan Powder"],
  ["powders", "gulal-colors", "Gulal Colors"],
  ["powders", "rice-akshata", "Rice Akshata"],
  ["powders", "sindhoor-box", "Sindhoor"],
  ["powders", "abhishekam-powder-set", "Abhishekam Set"],
  ["oils", "sesame-oil", "Sesame Oil"],
  ["oils", "coconut-oil-puja", "Coconut Oil"],
  ["oils", "ghee-deepam", "Deepam Ghee"],
  ["oils", "camphor-tablets", "Camphor Tablets"],
  ["oils", "camphor-blocks", "Camphor Blocks"],
  ["oils", "rose-water", "Rose Water"],
  ["oils", "sandal-oil", "Sandal Oil"],
  ["oils", "havan-ghee", "Havan Ghee"],
  ["essentials", "rudraksha-mala", "Rudraksha Mala"],
  ["essentials", "sacred-thread", "Sacred Thread"],
  ["essentials", "turmeric-cloth", "Turmeric Cloth"],
  ["essentials", "havan-samagri", "Havan Samagri"],
  ["essentials", "agarbatti-stand", "Agarbatti Stand"],
  ["essentials", "puja-bell-small", "Puja Bell"],
  ["essentials", "coconut-set", "Coconut Set"],
  ["essentials", "betel-nut-pack", "Betel Nut Pack"],
];

for (const [folder, slug, label] of products) {
  const dir = path.join(root, "public", "products", folder);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${slug}.svg`), svgFor(label, folder));
}

// Simple brand logo (SVG as PNG stand-in — also write logo.svg and copy as public/logo.svg)
const logo = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="#f7f0e4"/>
  <circle cx="256" cy="210" r="120" fill="none" stroke="#6b4423" stroke-width="8"/>
  <path d="M256 120c24 40 40 68 40 96 0 40-18 72-40 92-22-20-40-52-40-92 0-28 16-56 40-96z" fill="#8b5a2b"/>
  <ellipse cx="256" cy="318" rx="70" ry="18" fill="#6b4423" opacity="0.2"/>
  <text x="256" y="390" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="700" fill="#4a3728">Annapurna</text>
  <text x="256" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#8b5a2b">POOJA PRODUCTS</text>
</svg>`;
fs.writeFileSync(path.join(root, "public", "logo.svg"), logo);

const og = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fffaf0"/>
      <stop offset="100%" stop-color="#e8d5b7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="980" cy="120" r="180" fill="#c4a574" opacity="0.25"/>
  <circle cx="160" cy="520" r="200" fill="#6b4423" opacity="0.12"/>
  <text x="80" y="280" font-family="Georgia, serif" font-size="84" font-weight="700" fill="#4a3728">Annapurna</text>
  <text x="80" y="360" font-family="Georgia, serif" font-size="42" fill="#8b5a2b">Pooja Products</text>
  <text x="80" y="430" font-family="Georgia, serif" font-size="28" fill="#6b4423">Sacred essentials for every ritual</text>
</svg>`;
fs.writeFileSync(path.join(root, "public", "og-share.svg"), og);

const founder = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="640" viewBox="0 0 512 640">
  <rect width="512" height="640" fill="#f0e6d6"/>
  <circle cx="256" cy="240" r="100" fill="#c4a574"/>
  <ellipse cx="256" cy="480" rx="140" ry="160" fill="#8b5a2b"/>
  <text x="256" y="600" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#4a3728">Annapurna Team</text>
</svg>`;
fs.writeFileSync(path.join(root, "public", "founder.svg"), founder);

console.log(`Generated ${products.length} product placeholders + brand assets`);

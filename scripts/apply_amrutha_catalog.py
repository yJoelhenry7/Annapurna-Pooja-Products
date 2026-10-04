# -*- coding: utf-8 -*-
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
mapped = json.loads((root / "scripts/amrutha_mapped.json").read_text(encoding="utf-8"))
en = json.loads((root / "messages/en.json").read_text(encoding="utf-8"))
te = json.loads((root / "messages/te.json").read_text(encoding="utf-8"))

kept = [
    ("clayDiyaSet", "Diyas & Lamps", "/products/diyas/clay-diya-set.svg", "\u20b980", "set"),
    ("brassDiya", "Diyas & Lamps", "/products/diyas/brass-diya.svg", "\u20b9350", "piece"),
    ("fiveWickDiya", "Diyas & Lamps", "/products/diyas/five-wick-diya.svg", "\u20b9450", "piece"),
    ("cottonWicksPack", "Diyas & Lamps", "/products/diyas/cotton-wicks-pack.svg", "\u20b940", "pack"),
    ("dailyPujaKit", "Puja Kits", "/products/kits/daily-puja-kit.svg", "\u20b9499", "set"),
    ("lakshmiPujaKit", "Puja Kits", "/products/kits/lakshmi-puja-kit.svg", "\u20b9749", "set"),
    ("satyanarayanaKit", "Puja Kits", "/products/kits/satyanarayana-kit.svg", "\u20b9899", "set"),
    ("grihaPraveshKit", "Puja Kits", "/products/kits/griha-pravesh-kit.svg", "\u20b91299", "set"),
    ("brassKalash", "Brass & Copper", "/products/brass/brass-kalash.svg", "\u20b9550", "piece"),
    ("pujaThaliSet", "Brass & Copper", "/products/brass/puja-thali-set.svg", "\u20b9699", "set"),
    ("brassBell", "Brass & Copper", "/products/brass/brass-bell.svg", "\u20b9220", "piece"),
    ("ganeshBrassIdol", "Brass & Copper", "/products/brass/ganesh-brass-idol.svg", "\u20b9850", "piece"),
    ("pureKumkum", "Kumkum & Powders", "/products/powders/pure-kumkum.svg", "\u20b960", "box"),
    ("haldiPowder", "Kumkum & Powders", "/products/powders/haldi-powder.svg", "\u20b950", "box"),
    ("chandanPowder", "Kumkum & Powders", "/products/powders/chandan-powder.svg", "\u20b9180", "box"),
    ("camphorTablets", "Oils & Camphor", "/products/oils/camphor-tablets.svg", "\u20b975", "pack"),
    ("sesameOil", "Oils & Camphor", "/products/oils/sesame-oil.svg", "\u20b9160", "bottle"),
    ("gheeDeepam", "Oils & Camphor", "/products/oils/ghee-deepam.svg", "\u20b9280", "bottle"),
    ("havanSamagri", "Sacred Essentials", "/products/essentials/havan-samagri.svg", "\u20b9200", "pack"),
    ("rudrakshaMala", "Sacred Essentials", "/products/essentials/rudraksha-mala.svg", "\u20b9399", "piece"),
    ("agarbattiStand", "Sacred Essentials", "/products/essentials/agarbatti-stand.svg", "\u20b9150", "piece"),
]


def desc_en(p):
    bits = []
    if p.get("excelCategory"):
        bits.append(p["excelCategory"])
    if p.get("packSize"):
        bits.append(p["packSize"])
    base = "Authentic %s for daily puja and home fragrance" % p["name"]
    if bits:
        base += " \u2014 " + ", ".join(bits)
    if p.get("availability") == "Out of Stock":
        base += ". Currently out of stock."
    return base


def te_desc(p):
    # Keep product brand names in Latin; Telugu wrapper sentence
    pack = p.get("packSize") or ""
    base = (
        "\u0c30\u0c4b\u0c1c\u0c41\u0c35\u0c3e\u0c30\u0c40 \u0c2a\u0c42\u0c1c "
        "& \u0c07\u0c02\u0c1f\u0c3f \u0c38\u0c41\u0c35\u0c3e\u0c38\u0c28\u0c15\u0c41 "
        + p["name"]
    )
    if pack:
        base += " \u2014 " + pack
    if p.get("availability") == "Out of Stock":
        base += (
            ". \u0c2a\u0c4d\u0c30\u0c38\u0c4d\u0c24\u0c41\u0c24\u0c02 "
            "\u0c38\u0c4d\u0c1f\u0c3e\u0c15\u0c4d\u200c\u0c32\u0c4b \u0c32\u0c47\u0c26\u0c41."
        )
    return base


lines = [
    "export type ProductCategory =",
    '  | "Incense & Dhoop"',
    '  | "Diyas & Lamps"',
    '  | "Puja Kits"',
    '  | "Brass & Copper"',
    '  | "Kumkum & Powders"',
    '  | "Oils & Camphor"',
    '  | "Sacred Essentials";',
    "",
    "export interface CatalogProduct {",
    "  id: string;",
    "  category: ProductCategory;",
    "  image: string;",
    "  price: string;",
    '  unit: "pack" | "piece" | "set" | "bottle" | "box";',
    "  packSize?: string;",
    "  inStock?: boolean;",
    "}",
    "",
    "/** Structural catalog — names/descriptions live in messages/{locale}.json */",
    "export const CATALOG: CatalogProduct[] = [",
    "  // Amrutha aromatics (from amrutha_aromatics_products.xlsx)",
]

for p in mapped:
    in_stock = "true" if p["availability"] == "In Stock" else "false"
    pack_field = (
        ", packSize: %s" % json.dumps(p["packSize"]) if p.get("packSize") else ""
    )
    lines.append(
        '  { id: "%s", category: "%s", image: "%s", price: "%s", unit: "%s"%s, inStock: %s },'
        % (p["id"], p["category"], p["image"], p["price"], p["unit"], pack_field, in_stock)
    )

lines.append("")
lines.append("  // Curated pooja essentials")
for pid, cat, img, price, unit in kept:
    lines.append(
        '  { id: "%s", category: "%s", image: "%s", price: "%s", unit: "%s", inStock: true },'
        % (pid, cat, img, price, unit)
    )

lines += [
    "];",
    "",
    "export const CATEGORY_FILTERS = [",
    '  { id: "All", labelKey: "categoryAll" },',
    '  { id: "Incense & Dhoop", labelKey: "categoryIncense" },',
    '  { id: "Diyas & Lamps", labelKey: "categoryDiyas" },',
    '  { id: "Puja Kits", labelKey: "categoryKits" },',
    '  { id: "Brass & Copper", labelKey: "categoryBrass" },',
    '  { id: "Kumkum & Powders", labelKey: "categoryPowders" },',
    '  { id: "Oils & Camphor", labelKey: "categoryOils" },',
    '  { id: "Sacred Essentials", labelKey: "categoryEssentials" },',
    "] as const;",
    "",
    "export const CATEGORY_LABEL_KEYS: Record<ProductCategory, string> = {",
    '  "Incense & Dhoop": "categoryIncense",',
    '  "Diyas & Lamps": "categoryDiyas",',
    '  "Puja Kits": "categoryKits",',
    '  "Brass & Copper": "categoryBrass",',
    '  "Kumkum & Powders": "categoryPowders",',
    '  "Oils & Camphor": "categoryOils",',
    '  "Sacred Essentials": "categoryEssentials",',
    "};",
    "",
]

by_id = {p["id"]: p for p in mapped}
hero = [
    ("sambraniCup", by_id["sambraniCup"]["image"], "sambraniCup.name"),
    ("sandalIncenseSticks", by_id["sandalIncenseSticks"]["image"], "sandalIncenseSticks.name"),
    ("dailyPujaKit", "/products/kits/daily-puja-kit.svg", "dailyPujaKit.name"),
    ("brassKalash", "/products/brass/brass-kalash.svg", "brassKalash.name"),
    ("phalamruthaIncenseSticks", by_id["phalamruthaIncenseSticks"]["image"], "phalamruthaIncenseSticks.name"),
    ("lakshmiPujaKit", "/products/kits/lakshmi-puja-kit.svg", "lakshmiPujaKit.name"),
    ("sandalwoodDhoopSticks", by_id["sandalwoodDhoopSticks"]["image"], "sandalwoodDhoopSticks.name"),
    ("pujaThaliSet", "/products/brass/puja-thali-set.svg", "pujaThaliSet.name"),
]
lines.append("export const HERO_PRODUCTS = [")
for k, src, nk in hero:
    lines.append('  { key: "%s", src: "%s", nameKey: "%s" },' % (k, src, nk))
lines += [
    "] as const;",
    "",
    "export function getProductById(id: string): CatalogProduct | undefined {",
    "  return CATALOG.find((p) => p.id === id);",
    "}",
    "",
    "export function getRelatedProducts(id: string, limit = 4): CatalogProduct[] {",
    "  const current = getProductById(id);",
    "  if (!current) return CATALOG.filter((p) => p.id !== id).slice(0, limit);",
    "  const same = CATALOG.filter((p) => p.id !== id && p.category === current.category);",
    "  const rest = CATALOG.filter((p) => p.id !== id && p.category !== current.category);",
    "  return [...same, ...rest].slice(0, limit);",
    "}",
]

(root / "app/data/products.ts").write_text("\n".join(lines) + "\n", encoding="utf-8")
print("wrote products.ts", len(mapped) + len(kept), "items")

ui_keys = [k for k, v in en["products"].items() if not isinstance(v, dict)]
new_en_products = {k: en["products"][k] for k in ui_keys}
new_te_products = {k: te["products"].get(k, en["products"][k]) for k in ui_keys}

kept_msgs_en = {
    "clayDiyaSet": ("Clay Diya Set", "Hand-finished earthen diyas \u2014 pack of 12"),
    "brassDiya": ("Brass Diya", "Polished brass deepam for daily lighting"),
    "fiveWickDiya": ("Five-Wick Diya", "Pancha-mukha brass diya for special pujas"),
    "cottonWicksPack": ("Cotton Wicks Pack", "Soft cotton wicks for oil and ghee lamps"),
    "dailyPujaKit": ("Daily Puja Kit", "Complete kit for morning and evening home puja"),
    "lakshmiPujaKit": ("Lakshmi Puja Kit", "Varalakshmi and Friday Lakshmi worship pack"),
    "satyanarayanaKit": (
        "Satyanarayana Vratam Kit",
        "All essentials for Satyanarayana puja at home",
    ),
    "grihaPraveshKit": ("Griha Pravesh Kit", "Housewarming puja samagri curated in one set"),
    "brassKalash": ("Brass Kalash", "Traditional brass kalash for kalasha sthapana"),
    "pujaThaliSet": ("Puja Thali Set", "Complete brass thali with bowls and spoons"),
    "brassBell": ("Brass Bell", "Clear-toned brass ghanta for aarti"),
    "ganeshBrassIdol": ("Ganesh Brass Idol", "Blessed brass Ganesha murti for home temple"),
    "pureKumkum": ("Pure Kumkum", "Fine temple kumkum for tilak and offerings"),
    "haldiPowder": ("Haldi Powder", "Bright turmeric powder for rituals and kalyanam"),
    "chandanPowder": ("Chandan Powder", "Cooling sandalwood powder for tilak"),
    "camphorTablets": ("Camphor Tablets", "Quick-light camphor tablets for aarti"),
    "sesameOil": ("Sesame Oil", "Cold-pressed sesame oil for deepam lighting"),
    "gheeDeepam": ("Deepam Ghee", "Pure cow ghee ideal for nanda deepam"),
    "havanSamagri": ("Havan Samagri", "Blended herbs and woods for havan fire"),
    "rudrakshaMala": ("Rudraksha Mala", "108-bead rudraksha mala for japa and meditation"),
    "agarbattiStand": ("Agarbatti Stand", "Brass incense holder with ash catcher"),
}

for p in mapped:
    new_en_products[p["id"]] = {"name": p["name"], "description": desc_en(p)}
    new_te_products[p["id"]] = {"name": p["name"], "description": te_desc(p)}

for pid, (n, d) in kept_msgs_en.items():
    new_en_products[pid] = {"name": n, "description": d}
    existing = te["products"].get(pid)
    if isinstance(existing, dict) and existing.get("name"):
        new_te_products[pid] = {
            "name": existing["name"],
            "description": existing.get("description", d),
        }
    else:
        new_te_products[pid] = {"name": n, "description": d}

en["products"] = new_en_products
te["products"] = new_te_products

en["productDetail"] = {
    "backToProducts": "Back to products",
    "packSize": "Pack size",
    "category": "Category",
    "inStock": "In stock",
    "outOfStock": "Out of stock",
    "addToCart": "Add to Cart",
    "viewCart": "View Cart",
    "relatedTitle": "Related products",
    "relatedSubtitle": "Pair these with your pick \u2014 build your pooja basket",
    "quantity": "Quantity",
}

te["productDetail"] = {
    "backToProducts": "\u0c09\u0c24\u0c4d\u0c2a\u0c24\u0c4d\u0c24\u0c41\u0c32\u0c15\u0c41 \u0c24\u0c3f\u0c30\u0c3f\u0c17\u0c3f",
    "packSize": "\u0c2a\u0c4d\u0c2f\u0c3e\u0c15\u0c4d \u0c2a\u0c30\u0c3f\u0c2e\u0c3e\u0c23\u0c02",
    "category": "\u0c35\u0c30\u0c4d\u0c17\u0c02",
    "inStock": "\u0c38\u0c4d\u0c1f\u0c3e\u0c15\u0c4d\u200c\u0c32\u0c4b \u0c09\u0c02\u0c26\u0c3f",
    "outOfStock": "\u0c38\u0c4d\u0c1f\u0c3e\u0c15\u0c4d\u200c\u0c32\u0c4b \u0c32\u0c47\u0c26\u0c41",
    "addToCart": "\u0c15\u0c3e\u0c30\u0c4d\u0c1f\u0c4d\u200c\u0c15\u0c41 \u0c1c\u0c4b\u0c21\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f",
    "viewCart": "\u0c15\u0c3e\u0c30\u0c4d\u0c1f\u0c4d \u0c1a\u0c42\u0c21\u0c02\u0c21\u0c3f",
    "relatedTitle": "\u0c38\u0c02\u0c2c\u0c02\u0c27\u0c3f\u0c24 \u0c09\u0c24\u0c4d\u0c2a\u0c24\u0c4d\u0c24\u0c41\u0c32\u0c41",
    "relatedSubtitle": (
        "\u0c2e\u0c40 \u0c0e\u0c02\u0c2a\u0c3f\u0c15\u0c24\u0c4b \u0c15\u0c32\u0c3f\u0c2a\u0c3f "
        "\u0c15\u0c4a\u0c28\u0c02\u0c21\u0c3f \u2014 \u0c2a\u0c42\u0c1c\u0c3e "
        "\u0c2c\u0c3e\u0c38\u0c4d\u0c15\u0c46\u0c1f\u0c4d \u0c24\u0c2f\u0c3e\u0c30\u0c41 "
        "\u0c1a\u0c47\u0c38\u0c41\u0c15\u0c4b\u0c02\u0c21\u0c3f"
    ),
    "quantity": "\u0c2a\u0c30\u0c3f\u0c2e\u0c3e\u0c23\u0c02",
}

(root / "messages/en.json").write_text(
    json.dumps(en, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
(root / "messages/te.json").write_text(
    json.dumps(te, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
print("messages updated OK")
print("sample te productDetail", te["productDetail"]["relatedTitle"])
print("sample aromatic", list(new_en_products.keys())[-5:])

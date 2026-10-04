"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "../context/CartContext";
import { useProductLabels } from "../hooks/useProductLabels";
import FolkSectionBackground from "./FolkSectionBackground";
import {
  CATEGORY_LABEL_KEYS,
  getRelatedProducts,
  type CatalogProduct,
} from "../data/products";

const UNIT_LABEL_KEYS: Record<CatalogProduct["unit"], string> = {
  pack: "unitPack",
  piece: "unitPiece",
  set: "unitSet",
  bottle: "unitBottle",
  box: "unitBox",
};

export default function ProductDetail({ product }: { product: CatalogProduct }) {
  const t = useTranslations("productDetail");
  const tProducts = useTranslations("products");
  const locale = useLocale();
  const { getProductName, getProductDescription } = useProductLabels();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const related = getRelatedProducts(product.id, 4);

  const qty = items.find((item) => item.id === product.id)?.quantity ?? 0;
  const inStock = product.inStock !== false;

  const handleAddToCart = () => {
    const priceNumber = parseInt(product.price.replace("₹", ""), 10);
    addToCart({
      id: product.id,
      name: getProductName(product.id),
      price: priceNumber,
      image: product.image,
    });
  };

  const handleIncrement = () => {
    if (!inStock) return;
    if (qty === 0) handleAddToCart();
    else if (qty < 10) updateQuantity(product.id, qty + 1);
  };

  const handleDecrement = () => {
    if (qty === 1) removeFromCart(product.id);
    else if (qty > 1) updateQuantity(product.id, qty - 1);
  };

  return (
    <section className="relative overflow-hidden pb-20 pt-28">
      <FolkSectionBackground variant="cream" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/products`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--bronze)] transition hover:text-[var(--deep)]"
        >
          <FaArrowLeft className="h-3.5 w-3.5" />
          {t("backToProducts")}
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-[var(--bronze)]/35 bg-gradient-to-b from-[var(--cream)] to-[var(--ivory)] shadow-[0_18px_40px_rgba(61,40,22,0.16)]"
          >
            <Image
              src={product.image}
              alt={getProductName(product.id)}
              fill
              className="object-contain object-center p-6"
              sizes="(max-width: 768px) 90vw, 420px"
              priority
              unoptimized
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-center lg:text-left"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bronze)]">
              {tProducts(CATEGORY_LABEL_KEYS[product.category])}
            </p>
            <h1 className="font-serif text-3xl font-semibold leading-snug text-[var(--deep)] sm:text-4xl md:text-5xl">
              {getProductName(product.id)}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink)]/75 sm:text-lg">
              {getProductDescription(product.id)}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span className="font-serif text-3xl font-semibold text-[var(--deep)]">
                {product.price}
              </span>
              <span className="text-sm text-[var(--ink)]/50">
                {tProducts(UNIT_LABEL_KEYS[product.unit])}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  inStock
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-rose-50 text-rose-800"
                }`}
              >
                {inStock ? t("inStock") : t("outOfStock")}
              </span>
            </div>

            {product.packSize ? (
              <p className="mt-3 text-sm text-[var(--ink)]/65">
                <span className="font-semibold text-[var(--deep)]">
                  {t("packSize")}:
                </span>{" "}
                {product.packSize}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              {qty > 0 ? (
                <>
                  <div className="flex items-center gap-3 rounded-full border border-[var(--bronze)]/35 bg-[var(--ivory)] px-3 py-2">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--deep)] transition hover:bg-[var(--deep)] hover:text-[var(--cream)]"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[2.5rem] text-center font-serif text-xl font-semibold text-[var(--deep)]">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={!inStock || qty >= 10}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--deep)] transition hover:bg-[var(--deep)] hover:text-[var(--cream)] disabled:opacity-40"
                      aria-label="Increase quantity"
                    >
                      <FaPlus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <Link
                    href={`/${locale}/cart`}
                    className="inline-flex items-center justify-center rounded-full border-2 border-[var(--bronze)] px-7 py-3 font-sans text-sm font-semibold text-[var(--deep)] transition hover:bg-[var(--ivory)]"
                  >
                    {t("viewCart")}
                  </Link>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--deep)] px-8 py-3.5 font-sans text-sm font-semibold text-[var(--cream)] shadow-[0_10px_24px_rgba(74,55,40,0.2)] transition hover:bg-[var(--bronze)] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <FaShoppingCart className="h-4 w-4" />
                  {t("addToCart")}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-semibold text-[var(--deep)] md:text-4xl">
              {t("relatedTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--ink)]/70">
              {t("relatedSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="flex flex-col items-center text-center"
              >
                <Link
                  href={`/${locale}/products/${item.id}`}
                  className="group w-full max-w-[220px]"
                >
                  <div className="relative mx-auto mb-4 aspect-square w-full overflow-hidden rounded-full border-[3px] border-[var(--bronze)]/45 bg-gradient-to-b from-[var(--cream)] to-[var(--ivory)] shadow-[0_10px_24px_rgba(61,40,22,0.14)] transition group-hover:border-[var(--bronze)]">
                    <Image
                      src={item.image}
                      alt={getProductName(item.id)}
                      fill
                      className="object-contain object-center p-3"
                      sizes="220px"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[var(--deep)] transition group-hover:text-[var(--bronze)]">
                    {getProductName(item.id)}
                  </h3>
                  <p className="mt-1 font-serif text-xl font-semibold text-[var(--deep)]">
                    {item.price}
                  </p>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    const priceNumber = parseInt(item.price.replace("₹", ""), 10);
                    addToCart({
                      id: item.id,
                      name: getProductName(item.id),
                      price: priceNumber,
                      image: item.image,
                    });
                  }}
                  disabled={item.inStock === false}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--deep)] px-5 py-2 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--bronze)] disabled:opacity-40"
                >
                  <FaShoppingCart className="h-3.5 w-3.5" />
                  {t("addToCart")}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

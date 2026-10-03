"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useCart } from "../context/CartContext";
import { useProductLabels } from "../hooks/useProductLabels";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";
import FolkSectionBackground from "./FolkSectionBackground";
import {
  CATALOG,
  CATEGORY_FILTERS,
  CATEGORY_LABEL_KEYS,
  type CatalogProduct,
  type ProductCategory,
} from "../data/products";

const UNIT_LABEL_KEYS: Record<CatalogProduct["unit"], string> = {
  pack: "unitPack",
  piece: "unitPiece",
  set: "unitSet",
  bottle: "unitBottle",
  box: "unitBox",
};

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const t = useTranslations("products");
  const locale = useLocale();
  const { getProductName, getProductDescription } = useProductLabels();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const products = CATALOG;

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const getProductQuantity = (productId: string): number => {
    const cartItem = items.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (product: CatalogProduct) => {
    const priceNumber = parseInt(product.price.replace("₹", ""), 10);
    addToCart({
      id: product.id,
      name: getProductName(product.id),
      price: priceNumber,
      image: product.image,
    });
  };

  const handleIncrement = (product: CatalogProduct) => {
    const currentQty = getProductQuantity(product.id);
    if (currentQty === 0) {
      handleAddToCart(product);
    } else if (currentQty < 10) {
      updateQuantity(product.id, currentQty + 1);
    }
  };

  const handleDecrement = (productId: string) => {
    const currentQty = getProductQuantity(productId);
    if (currentQty === 1) {
      removeFromCart(productId);
    } else if (currentQty > 1) {
      updateQuantity(productId, currentQty - 1);
    }
  };

  const showFamilyBands = selectedCategory === "All";
  const categoriesInOrder = CATEGORY_FILTERS.filter((c) => c.id !== "All").map(
    (c) => c.id as ProductCategory
  );

  const productGroups = showFamilyBands
    ? categoriesInOrder
        .map((category) => ({
          key: category,
          titleKey: CATEGORY_LABEL_KEYS[category],
          items: filteredProducts.filter((p) => p.category === category),
        }))
        .filter((g) => g.items.length > 0)
    : [
        {
          key: "filtered",
          titleKey: null as string | null,
          items: filteredProducts,
        },
      ];

  const renderProductCard = (product: CatalogProduct, index: number) => {
    const qty = getProductQuantity(product.id);
    const categoryLabel = t(CATEGORY_LABEL_KEYS[product.category]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.35) }}
        className="group relative flex h-full flex-col items-center text-center"
      >
        <span
          data-v-divider
          aria-hidden
          className="pointer-events-none absolute -right-3 top-[18%] hidden h-[55%] w-px bg-gradient-to-b from-transparent via-[var(--bronze)]/45 to-transparent sm:block"
        />

        <div className="relative mb-5 w-full max-w-[240px]">
          <div className="absolute left-1/2 top-[88%] h-4 w-[70%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse,rgba(74,55,40,0.16)_0%,transparent_70%)] blur-md" />
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.35 }}
            className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border-[3px] border-[var(--bronze)]/50 bg-gradient-to-b from-[var(--cream)] to-[var(--ivory)] shadow-[0_14px_34px_rgba(61,40,22,0.22)]"
          >
            <Image
              src={product.image}
              alt={getProductName(product.id)}
              fill
              className="object-contain object-center p-2"
              sizes="240px"
              unoptimized
            />
          </motion.div>
        </div>

        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bronze)]">
          {categoryLabel}
        </p>
        <h3 className="font-serif text-xl font-semibold leading-snug text-[var(--deep)] transition-colors group-hover:text-[var(--bronze)]">
          {getProductName(product.id)}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[2.6rem] px-1 text-sm leading-relaxed text-[var(--ink)]/65">
          {getProductDescription(product.id)}
        </p>

        <div className="mb-4 mt-3">
          <p className="font-serif text-2xl font-semibold text-[var(--deep)]">
            {product.price}
          </p>
          <p className="text-xs text-[var(--ink)]/50">
            {t(UNIT_LABEL_KEYS[product.unit])}
          </p>
        </div>

        <div className="mt-auto flex w-full max-w-[240px] flex-col gap-2">
          {qty > 0 ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleDecrement(product.id)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--bronze)]/35 bg-[var(--ivory)] text-[var(--deep)] transition hover:bg-[var(--deep)] hover:text-[var(--cream)]"
                  aria-label="Decrease quantity"
                >
                  <FaMinus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-[2.5rem] font-serif text-xl font-semibold text-[var(--deep)]">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => handleIncrement(product)}
                  disabled={qty >= 10}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--bronze)]/35 bg-[var(--ivory)] text-[var(--deep)] transition hover:bg-[var(--deep)] hover:text-[var(--cream)] disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <FaPlus className="h-3.5 w-3.5" />
                </button>
              </div>
              <Link
                href={`/${locale}/cart`}
                className="text-sm font-semibold text-[var(--bronze)] underline-offset-4 transition hover:text-[var(--deep)] hover:underline"
              >
                {t("viewCart")}
              </Link>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleAddToCart(product)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--deep)] px-5 py-2.5 font-sans text-sm font-semibold text-[var(--cream)] shadow-[0_8px_20px_rgba(74,55,40,0.18)] transition hover:bg-[var(--bronze)]"
            >
              <FaShoppingCart className="h-3.5 w-3.5" />
              {t("addToCart")}
            </motion.button>
          )}
        </div>

        <span
          data-h-divider
          aria-hidden
          className="mt-10 h-px w-16 bg-gradient-to-r from-transparent via-[var(--bronze)]/50 to-transparent sm:hidden"
        />
      </motion.div>
    );
  };

  return (
    <section id="products" ref={ref} className="relative overflow-hidden py-24">
      <FolkSectionBackground variant="cream" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block rounded-full border border-[var(--bronze)]/40 bg-[var(--ivory)] px-6 py-2 text-sm font-semibold tracking-wider text-[var(--deep)]"
          >
            {t("sectionTag")}
          </motion.span>
          <h2 className="mb-6 font-serif text-4xl font-semibold text-[var(--deep)] md:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-[var(--ink)]/70">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 flex flex-wrap justify-center gap-3"
        >
          {CATEGORY_FILTERS.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-[var(--deep)] text-[var(--cream)] shadow-md"
                  : "border border-[var(--bronze)]/40 bg-[var(--cream)]/85 text-[var(--deep)] hover:border-[var(--deep)] hover:bg-[var(--ivory)]"
              }`}
            >
              {t(category.labelKey)}
            </motion.button>
          ))}
        </motion.div>

        <div className="space-y-16">
          {productGroups.map((group) => (
            <div key={group.key}>
              {group.titleKey && (
                <div className="mb-10 flex flex-col items-center text-center">
                  <h3 className="font-serif text-2xl font-semibold tracking-wide text-[var(--deep)] md:text-3xl">
                    {t(group.titleKey)}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-3 h-[2px] w-20 rounded-full bg-gradient-to-r from-[var(--gold)] via-[var(--bronze)] to-[var(--gold)]"
                  />
                </div>
              )}

              <div
                className={[
                  "grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                  "sm:[&>*:nth-child(2n)_[data-v-divider]]:hidden",
                  "lg:[&>*:nth-child(2n)_[data-v-divider]]:block",
                  "lg:[&>*:nth-child(3n)_[data-v-divider]]:hidden",
                  "xl:[&>*:nth-child(3n)_[data-v-divider]]:block",
                  "xl:[&>*:nth-child(4n)_[data-v-divider]]:hidden",
                  "[&>*:last-child_[data-h-divider]]:hidden",
                ].join(" ")}
              >
                {group.items.map((product, index) => (
                  <div key={product.id} className="relative">
                    {renderProductCard(product, index)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-lg text-[var(--ink)]/70">{t("bulkOrderText")}</p>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-block rounded-full bg-[var(--deep)] px-10 py-3.5 font-sans text-lg font-semibold text-[var(--cream)] shadow-[0_10px_24px_rgba(74,55,40,0.2)] transition hover:bg-[var(--bronze)]"
          >
            {t("catalogButton")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

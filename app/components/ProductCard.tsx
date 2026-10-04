"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "../context/CartContext";
import { useProductLabels } from "../hooks/useProductLabels";
import {
  CATEGORY_LABEL_KEYS,
  type CatalogProduct,
} from "../data/products";

const UNIT_LABEL_KEYS: Record<CatalogProduct["unit"], string> = {
  pack: "unitPack",
  piece: "unitPiece",
  set: "unitSet",
  bottle: "unitBottle",
  box: "unitBox",
};

export default function ProductCard({
  product,
  index = 0,
}: {
  product: CatalogProduct;
  index?: number;
}) {
  const t = useTranslations("products");
  const locale = useLocale();
  const { getProductName, getProductDescription } = useProductLabels();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const qty = items.find((item) => item.id === product.id)?.quantity ?? 0;
  const categoryLabel = t(CATEGORY_LABEL_KEYS[product.category]);

  const handleAddToCart = () => {
    if (product.inStock === false) return;
    const priceNumber = parseInt(product.price.replace("₹", ""), 10);
    addToCart({
      id: product.id,
      name: getProductName(product.id),
      price: priceNumber,
      image: product.image,
    });
  };

  const handleIncrement = () => {
    if (qty === 0) handleAddToCart();
    else if (qty < 10) updateQuantity(product.id, qty + 1);
  };

  const handleDecrement = () => {
    if (qty === 1) removeFromCart(product.id);
    else if (qty > 1) updateQuantity(product.id, qty - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.35) }}
      className="group relative flex h-full flex-col items-center text-center"
    >
      <span
        data-v-divider
        aria-hidden
        className="pointer-events-none absolute -right-3 top-[18%] hidden h-[55%] w-px bg-gradient-to-b from-transparent via-[var(--bronze)]/45 to-transparent sm:block"
      />

      <Link
        href={`/${locale}/products/${product.id}`}
        className="relative mb-5 w-full max-w-[240px]"
      >
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
      </Link>

      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bronze)]">
        {categoryLabel}
      </p>
      <Link href={`/${locale}/products/${product.id}`}>
        <h3 className="font-serif text-xl font-semibold leading-snug text-[var(--deep)] transition-colors group-hover:text-[var(--bronze)]">
          {getProductName(product.id)}
        </h3>
      </Link>
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
                onClick={handleDecrement}
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
                onClick={handleIncrement}
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
            onClick={handleAddToCart}
            disabled={product.inStock === false}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--deep)] px-5 py-2.5 font-sans text-sm font-semibold text-[var(--cream)] shadow-[0_8px_20px_rgba(74,55,40,0.18)] transition hover:bg-[var(--bronze)] disabled:cursor-not-allowed disabled:opacity-45"
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
}

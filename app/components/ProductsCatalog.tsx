"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useTranslations } from "next-intl";
import FolkSectionBackground from "./FolkSectionBackground";
import ProductCard from "./ProductCard";
import { useProductLabels } from "../hooks/useProductLabels";
import { CATALOG, CATEGORY_FILTERS } from "../data/products";

export default function ProductsCatalog() {
  const t = useTranslations("products");
  const { getProductName, getProductDescription } = useProductLabels();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return CATALOG.filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      const name = getProductName(product.id).toLowerCase();
      const description = getProductDescription(product.id).toLowerCase();
      const category = product.category.toLowerCase();
      const pack = (product.packSize || "").toLowerCase();

      return (
        name.includes(q) ||
        description.includes(q) ||
        category.includes(q) ||
        pack.includes(q) ||
        product.id.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, query, getProductName, getProductDescription]);

  return (
    <section className="relative overflow-hidden pb-20 pt-28">
      <FolkSectionBackground variant="cream" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center md:mb-12"
        >
          <span className="mb-4 inline-block rounded-full border border-[var(--bronze)]/40 bg-[var(--ivory)] px-6 py-2 text-sm font-semibold tracking-wider text-[var(--deep)]">
            {t("sectionTag")}
          </span>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-[var(--deep)] md:text-5xl lg:text-6xl">
            {t("catalogTitle")}
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-[var(--ink)]/70 md:text-xl">
            {t("catalogDescription")}
          </p>
        </motion.div>

        <div className="mb-8 flex justify-center">
          <label className="relative w-full max-w-xl">
            <span className="sr-only">{t("searchPlaceholder")}</span>
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--bronze)]/70" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-full border border-[var(--bronze)]/35 bg-white/90 py-3.5 pl-11 pr-12 font-sans text-sm text-[var(--deep)] shadow-sm outline-none transition placeholder:text-[var(--ink)]/40 focus:border-[var(--bronze)] focus:ring-2 focus:ring-[var(--bronze)]/20"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[var(--ink)]/50 transition hover:bg-[var(--ivory)] hover:text-[var(--deep)]"
                aria-label={t("clearSearch")}
              >
                <FaTimes className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </label>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {CATEGORY_FILTERS.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-[var(--deep)] text-[var(--cream)] shadow-md"
                  : "border border-[var(--bronze)]/40 bg-[var(--cream)]/85 text-[var(--deep)] hover:border-[var(--deep)] hover:bg-[var(--ivory)]"
              }`}
            >
              {t(category.labelKey)}
            </button>
          ))}
        </div>

        <p className="mb-8 text-center text-sm font-medium text-[var(--ink)]/60">
          {t("resultsCount", { count: filteredProducts.length })}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-[var(--bronze)]/25 bg-[var(--ivory)]/70 px-6 py-16 text-center">
            <p className="font-serif text-2xl font-semibold text-[var(--deep)]">
              {t("noResultsTitle")}
            </p>
            <p className="mx-auto mt-3 max-w-md text-[var(--ink)]/65">
              {t("noResultsDesc")}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-full border border-[var(--bronze)]/40 px-6 py-2.5 text-sm font-semibold text-[var(--deep)] transition hover:bg-[var(--deep)] hover:text-[var(--cream)]"
            >
              {t("resetFilters")}
            </button>
          </div>
        ) : (
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
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

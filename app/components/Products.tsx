"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import FolkSectionBackground from "./FolkSectionBackground";
import ProductCard from "./ProductCard";
import { CATALOG } from "../data/products";

const HOME_PREVIEW_COUNT = 8;

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const t = useTranslations("products");
  const locale = useLocale();
  const preview = CATALOG.slice(0, HOME_PREVIEW_COUNT);

  return (
    <section id="products" ref={ref} className="relative overflow-hidden py-20 md:py-24">
      <FolkSectionBackground variant="cream" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block rounded-full border border-[var(--bronze)]/40 bg-[var(--ivory)] px-6 py-2 text-sm font-semibold tracking-wider text-[var(--deep)]"
          >
            {t("sectionTag")}
          </motion.span>
          <h2 className="mb-4 font-serif text-4xl font-semibold text-[var(--deep)] md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--ink)]/70 md:text-xl">
            {t("homePreviewDesc")}
          </p>
        </motion.div>

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
          {preview.map((product, index) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center justify-center rounded-full bg-[var(--deep)] px-10 py-3.5 font-sans text-base font-semibold text-[var(--cream)] shadow-[0_10px_24px_rgba(74,55,40,0.2)] transition hover:bg-[var(--bronze)]"
          >
            {t("viewMore")}
          </Link>
          <p className="text-sm text-[var(--ink)]/60">{t("viewMoreHint")}</p>
        </motion.div>
      </div>
    </section>
  );
}

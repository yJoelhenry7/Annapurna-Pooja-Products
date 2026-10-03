"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiArrowDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback, useId } from "react";
import Image from "next/image";
import FolkSectionBackground from "./FolkSectionBackground";
import { HERO_PRODUCTS } from "../data/products";

function useIsCompact() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return compact;
}

function getCircularOffset(index: number, active: number, total: number) {
  let offset = index - active;
  const half = total / 2;
  if (offset > half) offset -= total;
  if (offset < -half) offset += total;
  return offset;
}

function getOrbitPose(offset: number, compact: boolean) {
  const abs = Math.abs(offset);
  const angleDeg = offset * (compact ? 52 : 58);
  const rad = (angleDeg * Math.PI) / 180;
  const radiusX = compact ? 132 : 195;
  const radiusY = compact ? 28 : 40;

  return {
    x: Math.sin(rad) * radiusX,
    y: (1 - Math.cos(rad)) * radiusY + (abs === 0 ? 0 : abs * 4),
    scale: abs === 0 ? 1 : abs === 1 ? 0.78 : 0.58,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.7 : 0.32,
    rotateY: offset * (compact ? -12 : -16),
    zIndex: 30 - abs * 10,
    filter: abs === 0 ? "none" : abs === 1 ? "none" : "blur(0.6px)",
  };
}

/** Lotus-petal mandala plate — sacred thali framing for products */
function LotusThaliFrame({
  src,
  alt,
  isActive,
  priority,
}: {
  src: string;
  alt: string;
  isActive: boolean;
  priority?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const ringGrad = `ring-${uid}`;
  const petalGrad = `petal-${uid}`;

  const petals = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const cx = 100 + Math.cos(angle) * 78;
    const cy = 100 + Math.sin(angle) * 78;
    const rot = i * 30 + 90;
    return { cx, cy, rot, i };
  });

  return (
    <div className="relative h-full w-full">
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-opacity ${
          isActive
            ? "bg-[radial-gradient(circle,rgba(196,160,116,0.4)_0%,transparent_68%)] opacity-100"
            : "bg-[radial-gradient(circle,rgba(92,58,34,0.18)_0%,transparent_70%)] opacity-80"
        }`}
        aria-hidden
      />

      {/* Petal ring spins slowly; product stays upright */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
        animate={isActive ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isActive
            ? { duration: 56, repeat: Infinity, ease: "linear" }
            : { duration: 0.45 }
        }
      >
        <defs>
          <linearGradient id={ringGrad} x1="30" y1="30" x2="170" y2="170">
            <stop offset="0%" stopColor={isActive ? "#e8d0a8" : "#d4b896"} />
            <stop offset="50%" stopColor={isActive ? "#a67c52" : "#8b5e34"} />
            <stop offset="100%" stopColor={isActive ? "#5c3a22" : "#4a2e18"} />
          </linearGradient>
          <radialGradient id={petalGrad} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={isActive ? "#f3e4cc" : "#e8d5bc"} />
            <stop offset="100%" stopColor={isActive ? "#b8956a" : "#9a7348"} />
          </radialGradient>
        </defs>

        {petals.map(({ cx, cy, rot, i }) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="16"
            ry="22"
            fill={`url(#${petalGrad})`}
            stroke={isActive ? "#6b4423" : "#5c3a22"}
            strokeWidth="1.1"
            opacity={isActive ? 0.95 : 0.75}
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        ))}

        <circle
          cx="100"
          cy="100"
          r="68"
          fill={`url(#${ringGrad})`}
          stroke={isActive ? "#8b5e34" : "#6b4423"}
          strokeWidth={isActive ? 3.5 : 2.5}
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill={isActive ? "#fff8f0" : "#f5ebe0"}
          opacity="0.92"
        />
        <circle
          cx="100"
          cy="100"
          r="56"
          fill="none"
          stroke={isActive ? "#c4a074" : "#b8956a"}
          strokeWidth="1.2"
          opacity="0.55"
          strokeDasharray="2 6"
        />
      </motion.svg>

      <div className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
        <div className="relative h-full w-full bg-gradient-to-b from-white to-[var(--ivory)]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain object-center p-1.5"
            sizes="(max-width: 768px) 120px, 160px"
            priority={priority}
            unoptimized
          />
        </div>
      </div>

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors ${
          isActive
            ? "border-[var(--bronze)]/50 shadow-[inset_0_0_20px_rgba(166,124,82,0.2)]"
            : "border-[var(--bronze)]/25"
        }`}
        aria-hidden
      />
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const tProducts = useTranslations("products");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const compact = useIsCompact();
  const total = HERO_PRODUCTS.length;

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, 4200);
    return () => clearInterval(id);
  }, [paused, goNext]);

  const activeProduct = HERO_PRODUCTS[active];
  const itemSize = compact ? 200 : 268;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-12 pt-24 md:pb-16 md:pt-28"
    >
      <FolkSectionBackground variant="gold" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-6 lg:px-8 xl:gap-10">
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-1 text-center lg:text-left"
        >
          <span className="mb-4 inline-block rounded-full border border-[var(--bronze)]/40 bg-[var(--ivory)]/70 px-5 py-2 font-sans text-xs font-semibold tracking-[0.16em] text-[var(--deep)] sm:text-sm">
            {t("tagline")}
          </span>

          <h1 className="font-serif text-4xl font-semibold leading-[1.15] text-[var(--deep)] sm:text-5xl md:text-6xl lg:text-[3.6rem] xl:text-7xl">
            {t("title")}
          </h1>

          <p className="mt-3 font-serif text-2xl font-medium italic text-[var(--bronze)] sm:text-3xl md:text-[2.1rem]">
            {t("legacy")}
          </p>

          <p className="mx-auto mt-5 max-w-xl font-sans text-base font-normal leading-relaxed text-[var(--ink)]/75 sm:text-lg lg:mx-0">
            {t("legacyQuote")}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--bronze)] bg-transparent px-8 py-3.5 font-sans text-base font-semibold text-[var(--deep)] transition hover:bg-[var(--ivory)] sm:w-auto"
            >
              {t("exploreButton")}
              <HiArrowDown className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--deep)] px-8 py-3.5 font-sans text-base font-semibold text-[var(--cream)] shadow-[0_10px_24px_rgba(61,46,26,0.22)] transition hover:bg-[var(--bronze)] sm:w-auto"
            >
              {t("orderButton")}
            </motion.a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm font-semibold text-[var(--maroon)] sm:gap-7 lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <MdVerified className="h-5 w-5 text-[var(--gold)]" />
              {t("varieties")}
            </span>
            <span className="inline-flex items-center gap-2">
              <MdVerified className="h-5 w-5 text-[var(--gold)]" />
              {t("pureFresh")}
            </span>
            <span className="inline-flex items-center gap-2">
              <MdVerified className="h-5 w-5 text-[var(--gold)]" />
              {t("customers")}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="order-2 flex justify-center lg:justify-end"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative w-full max-w-[420px] sm:max-w-[520px] md:max-w-[580px] lg:max-w-[620px]">
            <div
              className="pointer-events-none absolute left-1/2 top-[40%] h-[75%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(166,124,82,0.22)_0%,transparent_70%)] blur-3xl"
              aria-hidden
            />

            <svg
              className="pointer-events-none absolute left-1/2 top-[40%] h-[72%] w-[92%] -translate-x-1/2 -translate-y-1/2 text-[var(--bronze)] opacity-[0.16]"
              viewBox="0 0 400 280"
              fill="none"
              aria-hidden
            >
              <ellipse
                cx="200"
                cy="150"
                rx="175"
                ry="78"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 14"
              />
            </svg>

            <div
              className="relative mx-auto h-[340px] w-full sm:h-[400px] md:h-[460px]"
              style={{ perspective: "1600px" }}
            >
              <div
                className="absolute bottom-[12%] left-1/2 h-5 w-[52%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse,rgba(61,40,22,0.18)_0%,transparent_72%)] blur-md"
                aria-hidden
              />

              {HERO_PRODUCTS.map((product, index) => {
                const offset = getCircularOffset(index, active, total);
                const abs = Math.abs(offset);
                if (abs > 1) return null;

                const pose = getOrbitPose(offset, compact);
                const isActive = offset === 0;

                return (
                  <motion.button
                    key={product.key}
                    type="button"
                    onClick={() => setActive(index)}
                    className="absolute left-1/2 top-[44%] origin-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2"
                    style={{
                      width: itemSize,
                      height: itemSize,
                      marginLeft: -itemSize / 2,
                      marginTop: -itemSize / 2,
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      x: pose.x,
                      y: pose.y,
                      scale: pose.scale,
                      opacity: pose.opacity,
                      rotateY: pose.rotateY,
                      zIndex: pose.zIndex,
                      filter: pose.filter,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    aria-label={tProducts(product.nameKey)}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <LotusThaliFrame
                      src={product.src}
                      alt={tProducts(product.nameKey)}
                      isActive={isActive}
                      priority={index < 3}
                    />
                  </motion.button>
                );
              })}
            </div>

            <div className="relative z-10 mt-1 flex flex-col items-center gap-3 px-4 pb-2 pt-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeProduct.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="min-h-[1.75rem] text-center font-serif text-lg font-semibold tracking-wide text-[var(--deep)] sm:min-h-[2rem] sm:text-xl md:text-2xl"
                >
                  {tProducts(activeProduct.nameKey)}
                </motion.p>
              </AnimatePresence>

              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--bronze)]/45 bg-[var(--cream)]/90 text-[var(--maroon)] shadow-sm transition hover:border-[var(--bronze)] hover:bg-[var(--deep)] hover:text-[var(--cream)] sm:h-11 sm:w-11"
                  aria-label={t("prevSweet")}
                >
                  <HiChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                <div className="flex items-center gap-1.5">
                  {HERO_PRODUCTS.map((product, index) => (
                    <button
                      key={product.key}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === active
                          ? "w-6 bg-[var(--bronze)] sm:w-7"
                          : "w-2 bg-[var(--bronze)]/30 hover:bg-[var(--bronze)]/55"
                      }`}
                      aria-label={tProducts(product.nameKey)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--bronze)]/45 bg-[var(--cream)]/90 text-[var(--maroon)] shadow-sm transition hover:border-[var(--bronze)] hover:bg-[var(--deep)] hover:text-[var(--cream)] sm:h-11 sm:w-11"
                  aria-label={t("nextSweet")}
                >
                  <HiChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

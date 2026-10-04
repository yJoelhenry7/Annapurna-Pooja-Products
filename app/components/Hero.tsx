"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiArrowDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback, useId } from "react";
import Image from "next/image";
import FolkSectionBackground from "./FolkSectionBackground";
import { HERO_PRODUCTS } from "../data/products";
import HangingRopeDiyas from "./HangingRopeDiyas";

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

/** Square product frame with circular border accents */
function SquareRoundFrame({
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
  const plateGrad = `plate-${uid}`;

  return (
    <div className="relative h-full w-full">
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[28%] blur-xl transition-opacity ${
          isActive
            ? "bg-[radial-gradient(circle,rgba(196,160,116,0.38)_0%,transparent_68%)] opacity-100"
            : "bg-[radial-gradient(circle,rgba(92,58,34,0.16)_0%,transparent_70%)] opacity-80"
        }`}
        aria-hidden
      />

      {/* Soft circular orbit ring behind the square */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
        animate={isActive ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isActive
            ? { duration: 48, repeat: Infinity, ease: "linear" }
            : { duration: 0.4 }
        }
      >
        <defs>
          <linearGradient id={ringGrad} x1="20" y1="20" x2="180" y2="180">
            <stop offset="0%" stopColor={isActive ? "#fff8e8" : "#faf3e4"} />
            <stop offset="45%" stopColor={isActive ? "#c9a84c" : "#b8956a"} />
            <stop offset="100%" stopColor={isActive ? "#5c4528" : "#3d2e1a"} />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke={`url(#${ringGrad})`}
          strokeWidth={isActive ? 2.2 : 1.4}
          strokeDasharray={isActive ? "6 10" : "3 12"}
          opacity={isActive ? 0.85 : 0.45}
        />
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke={isActive ? "#c4a074" : "#b8956a"}
          strokeWidth="1"
          opacity={isActive ? 0.35 : 0.2}
        />
      </motion.svg>

      {/* Square plate with rounded (circular) corners */}
      <div className="absolute inset-[10%] flex items-center justify-center">
        <div
          className={`relative h-full w-full overflow-hidden rounded-[22%] border transition-shadow duration-300 ${
            isActive
              ? "border-[var(--bronze)]/70 shadow-[0_14px_36px_rgba(61,46,26,0.22),inset_0_0_0_1px_rgba(201,168,76,0.35)]"
              : "border-[var(--bronze)]/35 shadow-[0_8px_20px_rgba(61,46,26,0.12)]"
          }`}
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id={plateGrad} x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor={isActive ? "#fffdf8" : "#faf6ee"} />
                <stop offset="55%" stopColor={isActive ? "#f3e6d0" : "#f0e6d4"} />
                <stop offset="100%" stopColor={isActive ? "#e8d4b0" : "#e5d5bc"} />
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width="200"
              height="200"
              rx="44"
              ry="44"
              fill={`url(#${plateGrad})`}
            />
            <rect
              x="8"
              y="8"
              width="184"
              height="184"
              rx="38"
              ry="38"
              fill="none"
              stroke={isActive ? "#8b5e34" : "#6b4423"}
              strokeWidth={isActive ? 2.4 : 1.6}
              opacity="0.55"
            />
            <rect
              x="16"
              y="16"
              width="168"
              height="168"
              rx="32"
              ry="32"
              fill="none"
              stroke={isActive ? "#c4a074" : "#b8956a"}
              strokeWidth="1"
              opacity="0.4"
              strokeDasharray="3 7"
            />
          </svg>

          <div className="absolute inset-[14%] overflow-hidden rounded-[18%] bg-gradient-to-b from-white to-[var(--ivory)]">
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain object-center p-2"
                sizes="(max-width: 768px) 140px, 180px"
                priority={priority}
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
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
      className="relative flex min-h-[100svh] items-center overflow-x-clip overflow-y-visible pb-12 pt-24 md:pb-16 md:pt-28"
    >
      <FolkSectionBackground variant="gold" hideCorners />

      {/* Triangle wall-hangings — one diya each side */}
      <HangingRopeDiyas
        className="left-2 top-24 h-14 w-12 sm:left-3 sm:top-28 sm:h-16 sm:w-14 md:left-5 md:h-20 md:w-16 lg:h-24 lg:w-[4.5rem]"
        delay={0}
      />
      <HangingRopeDiyas
        className="right-2 top-24 h-14 w-12 sm:right-3 sm:top-28 sm:h-16 sm:w-14 md:right-5 md:h-20 md:w-16 lg:h-24 lg:w-[4.5rem]"
        delay={0.35}
      />

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
                    <SquareRoundFrame
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

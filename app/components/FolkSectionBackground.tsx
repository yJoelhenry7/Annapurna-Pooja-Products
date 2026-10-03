import { useId } from "react";

type FolkSectionBackgroundProps = {
  variant?: "warm" | "cream" | "gold";
};

/**
 * Soft pooja atmosphere for section backs:
 * rangoli lattice, lotus corners, hanging diya garlands, and a diya/kalash band.
 */
export default function FolkSectionBackground({
  variant = "warm",
}: FolkSectionBackgroundProps) {
  const uid = useId().replace(/:/g, "");
  const patternId = `pooja-lattice-${uid}`;

  const wash =
    variant === "gold"
      ? "from-[#d4b896] via-[#c4a574] to-[#b8956a]"
      : variant === "cream"
        ? "from-[#e8d5bc] via-[#dcc4a4] to-[#d0b48e]"
        : "from-[#ead9c0] via-[#d9c0a0] to-[#c9a97e]";

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${wash}`} />

      {/* Soft rangoli / petal lattice */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="28" cy="28" r="10" fill="none" stroke="#5c3a22" strokeWidth="0.9" />
            <circle cx="28" cy="28" r="3" fill="#8b5e34" />
            <path
              d="M28 14 C32 20 34 24 28 28 C22 24 24 20 28 14 Z"
              fill="#6b4423"
              opacity="0.35"
            />
            <path
              d="M28 42 C24 36 22 32 28 28 C34 32 32 36 28 42 Z"
              fill="#6b4423"
              opacity="0.35"
            />
            <path
              d="M14 28 C20 24 24 22 28 28 C24 34 20 32 14 28 Z"
              fill="#6b4423"
              opacity="0.35"
            />
            <path
              d="M42 28 C36 32 32 34 28 28 C32 22 36 24 42 28 Z"
              fill="#6b4423"
              opacity="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Lotus corner — top left */}
      <svg
        className="absolute -left-4 -top-4 h-40 w-40 text-[var(--bronze)] opacity-[0.16] md:h-52 md:w-52"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 160 C70 130 55 100 55 75 C55 50 75 40 100 55 C125 40 145 50 145 75 C145 100 130 130 100 160 Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M100 150 C80 125 70 100 70 80 C70 62 85 55 100 68 C115 55 130 62 130 80 C130 100 120 125 100 150 Z"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <circle cx="100" cy="95" r="8" fill="currentColor" opacity="0.5" />
        <path
          d="M100 55 L100 30 M78 62 L62 42 M122 62 L138 42"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>

      {/* Lotus corner — bottom right */}
      <svg
        className="absolute -bottom-6 -right-6 h-44 w-44 rotate-180 text-[var(--deep)] opacity-[0.12] md:h-56 md:w-56"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 160 C70 130 55 100 55 75 C55 50 75 40 100 55 C125 40 145 50 145 75 C145 100 130 130 100 160 Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="100" cy="95" r="7" fill="currentColor" opacity="0.45" />
      </svg>

      {/* Hanging diya garland — left */}
      <svg
        className="absolute left-2 top-0 hidden h-64 w-20 text-[var(--bronze)] opacity-[0.14] md:block lg:w-24"
        viewBox="0 0 80 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M40 0 L40 40" stroke="currentColor" strokeWidth="1.4" />
        <path d="M28 48 Q40 36 52 48 L48 58 Q40 66 32 58 Z" fill="currentColor" opacity="0.55" />
        <ellipse cx="40" cy="48" rx="14" ry="5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M40 58 L40 110" stroke="currentColor" strokeWidth="1.2" />
        <path d="M26 118 Q40 104 54 118 L50 130 Q40 140 30 130 Z" fill="currentColor" opacity="0.5" />
        <ellipse cx="40" cy="118" rx="16" ry="5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M40 130 L40 180" stroke="currentColor" strokeWidth="1.2" />
        <path d="M28 188 Q40 176 52 188 L48 198 Q40 206 32 198 Z" fill="currentColor" opacity="0.45" />
        <ellipse cx="40" cy="188" rx="14" ry="5" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      {/* Hanging diya garland — right */}
      <svg
        className="absolute right-2 top-0 hidden h-64 w-20 scale-x-[-1] text-[var(--deep)] opacity-[0.12] md:block lg:w-24"
        viewBox="0 0 80 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M40 0 L40 40" stroke="currentColor" strokeWidth="1.4" />
        <path d="M28 48 Q40 36 52 48 L48 58 Q40 66 32 58 Z" fill="currentColor" opacity="0.55" />
        <ellipse cx="40" cy="48" rx="14" ry="5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M40 58 L40 110" stroke="currentColor" strokeWidth="1.2" />
        <path d="M26 118 Q40 104 54 118 L50 130 Q40 140 30 130 Z" fill="currentColor" opacity="0.5" />
        <ellipse cx="40" cy="118" rx="16" ry="5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M40 130 L40 180" stroke="currentColor" strokeWidth="1.2" />
        <path d="M28 188 Q40 176 52 188 L48 198 Q40 206 32 198 Z" fill="currentColor" opacity="0.45" />
        <ellipse cx="40" cy="188" rx="14" ry="5" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      {/* Bottom band: row of diyas + kalash silhouettes (replaces hill/gopuram) */}
      <svg
        className="absolute bottom-0 left-1/2 h-20 w-[130%] -translate-x-1/2 text-[var(--deep)] opacity-[0.1] md:h-28"
        viewBox="0 0 1200 140"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Soft ground */}
        <path d="M0 140 L0 110 Q300 95 600 110 Q900 125 1200 105 L1200 140 Z" opacity="0.35" />
        {/* Diyas */}
        <g opacity="0.9">
          <path d="M80 105 Q100 88 120 105 L112 118 Q100 128 88 118 Z" />
          <ellipse cx="100" cy="105" rx="22" ry="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M100 88 Q104 78 100 70 Q96 78 100 88 Z" />
        </g>
        <g opacity="0.85">
          <path d="M220 108 Q240 92 260 108 L252 120 Q240 130 228 120 Z" />
          <ellipse cx="240" cy="108" rx="22" ry="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M240 92 Q244 82 240 74 Q236 82 240 92 Z" />
        </g>
        {/* Kalash */}
        <g opacity="0.8">
          <ellipse cx="400" cy="118" rx="28" ry="10" />
          <path d="M380 118 Q380 70 400 55 Q420 70 420 118 Z" />
          <ellipse cx="400" cy="58" rx="12" ry="6" />
          <path d="M400 52 L400 38" stroke="currentColor" strokeWidth="3" />
          <circle cx="400" cy="34" r="4" />
        </g>
        <g opacity="0.9">
          <path d="M520 105 Q540 88 560 105 L552 118 Q540 128 528 118 Z" />
          <ellipse cx="540" cy="105" rx="22" ry="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M540 88 Q544 78 540 70 Q536 78 540 88 Z" />
        </g>
        <g opacity="0.85">
          <path d="M680 108 Q700 92 720 108 L712 120 Q700 130 688 120 Z" />
          <ellipse cx="700" cy="108" rx="22" ry="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M700 92 Q704 82 700 74 Q696 82 700 92 Z" />
        </g>
        {/* Kalash */}
        <g opacity="0.8">
          <ellipse cx="860" cy="118" rx="28" ry="10" />
          <path d="M840 118 Q840 70 860 55 Q880 70 880 118 Z" />
          <ellipse cx="860" cy="58" rx="12" ry="6" />
          <path d="M860 52 L860 38" stroke="currentColor" strokeWidth="3" />
          <circle cx="860" cy="34" r="4" />
        </g>
        <g opacity="0.9">
          <path d="M980 105 Q1000 88 1020 105 L1012 118 Q1000 128 988 118 Z" />
          <ellipse cx="1000" cy="105" rx="22" ry="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M1000 88 Q1004 78 1000 70 Q996 78 1000 88 Z" />
        </g>
        <g opacity="0.85">
          <path d="M1100 108 Q1120 92 1140 108 L1132 120 Q1120 130 1108 120 Z" />
          <ellipse cx="1120" cy="108" rx="22" ry="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M1120 92 Q1124 82 1120 74 Q1116 82 1120 92 Z" />
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep)]/10 via-transparent to-[var(--deep)]/18" />
    </div>
  );
}

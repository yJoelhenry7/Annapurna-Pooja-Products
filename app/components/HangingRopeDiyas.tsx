"use client";

import { motion } from "framer-motion";
import { useId } from "react";

/**
 * Smaller diya + water-droplet flame (pointed top, round bottom).
 */
function IconDiya({
  flameId,
  bowlId,
  delay,
}: {
  flameId: string;
  bowlId: string;
  delay: number;
}) {
  return (
    <g transform="translate(60 78) scale(0.62) translate(-60 -78)">
      {/* Glow */}
      <motion.ellipse
        cx="60"
        cy="62"
        rx="16"
        ry="14"
        fill="rgba(255,170,40,0.28)"
        animate={{ opacity: [0.22, 0.5, 0.28, 0.55, 0.22] }}
        transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay }}
      />

      {/* Water-droplet flame: sharp tip, round base + smaller inner droplet */}
      <motion.path
        style={{ transformOrigin: "60px 50px" }}
        fillRule="evenodd"
        d="M60 28
           C60 28 46 48 46 60
           C46 70 52 78 60 78
           C68 78 74 70 74 60
           C74 48 60 28 60 28 Z
           M60 42
           C60 42 52 54 52 62
           C52 68 55.5 72.5 60 72.5
           C64.5 72.5 68 68 68 62
           C68 54 60 42 60 42 Z"
        fill={`url(#${flameId})`}
        animate={{
          scaleY: [1, 1.06, 0.97, 1.04, 1],
          scaleX: [1, 0.96, 1.03, 0.98, 1],
        }}
        transition={{ duration: 1.55, repeat: Infinity, ease: "easeInOut", delay }}
      />

      {/* Bowl — semicircle base + center-dip rim */}
      <path
        d="M36 80
           C36 96 46 106 60 106
           C74 106 84 96 84 80
           C84 77 76 74 70 77
           C65 79 62 82 60 85
           C58 82 55 79 50 77
           C44 74 36 77 36 80 Z"
        fill={`url(#${bowlId})`}
        stroke="#5c3a22"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <ellipse cx="50" cy="79" rx="9" ry="2.8" fill="#fff6e4" opacity="0.5" />
      <ellipse cx="70" cy="79" rx="9" ry="2.8" fill="#fff6e4" opacity="0.5" />
    </g>
  );
}

/**
 * Triangle wall-hanging with one diya inside.
 * Place on left and right of the hero (one each).
 */
export default function HangingRopeDiyas({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const flameGrad = `tri-flame-${uid}`;
  const bowlGrad = `tri-bowl-${uid}`;
  const woodGrad = `tri-wood-${uid}`;

  return (
    <div className={`pointer-events-none absolute z-[5] ${className ?? ""}`} aria-hidden>
      <motion.svg
        viewBox="0 0 120 150"
        className="h-full w-full overflow-visible"
        animate={{ rotate: [-1.2, 1.4, -0.9, 1.1, -1.2] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ transformOrigin: "60px 8px" }}
      >
        <defs>
          <linearGradient id={flameGrad} x1="60" y1="68" x2="60" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffd76a" />
            <stop offset="50%" stopColor="#ff9a2e" />
            <stop offset="100%" stopColor="#e03e0c" />
          </linearGradient>
          <linearGradient id={bowlGrad} x1="60" y1="68" x2="60" y2="104">
            <stop offset="0%" stopColor="#efd19a" />
            <stop offset="50%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#6b4423" />
          </linearGradient>
          <linearGradient id={woodGrad} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e2c08a" />
            <stop offset="50%" stopColor="#b8956a" />
            <stop offset="100%" stopColor="#6b4423" />
          </linearGradient>
        </defs>

        {/* Hang cord + knot */}
        <path
          d="M60 2 L60 18"
          stroke="#c62828"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M62 2 L62 18"
          stroke="#f4c430"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="60" cy="4" r="3.2" fill="#c62828" stroke="#f4c430" strokeWidth="1.1" />

        {/* Triangle frame (wall hanging) */}
        <path
          d="M60 20 L108 128 L12 128 Z"
          fill={`url(#${woodGrad})`}
          stroke="#5c3a22"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Inner triangle cutout panel */}
        <path
          d="M60 36 L94 118 L26 118 Z"
          fill="#fff8ef"
          stroke="#8b5e34"
          strokeWidth="1.4"
          strokeLinejoin="round"
          opacity="0.92"
        />
        {/* Subtle inner border */}
        <path
          d="M60 44 L86 112 L34 112 Z"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.55"
        />

        {/* Diya centered inside triangle */}
        <g transform="translate(0 8)">
          <IconDiya flameId={flameGrad} bowlId={bowlGrad} delay={delay} />
        </g>

        {/* Bottom tassels */}
        <path d="M48 128 L46 142" stroke="#c62828" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50 128 L50 144" stroke="#f4c430" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M60 128 L60 146" stroke="#c62828" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M62 128 L63 144" stroke="#f4c430" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M72 128 L74 142" stroke="#c62828" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M70 128 L70 144" stroke="#f4c430" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="46" cy="143" r="1.8" fill="#c62828" />
        <circle cx="50" cy="145" r="1.5" fill="#f4c430" />
        <circle cx="60" cy="147" r="1.8" fill="#c62828" />
        <circle cx="63" cy="145" r="1.5" fill="#f4c430" />
        <circle cx="74" cy="143" r="1.8" fill="#c62828" />
        <circle cx="70" cy="145" r="1.5" fill="#f4c430" />
      </motion.svg>
    </div>
  );
}

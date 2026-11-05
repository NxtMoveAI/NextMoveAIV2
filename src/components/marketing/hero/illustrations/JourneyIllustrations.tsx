"use client";

import React from "react";

export type StudentMode = "school" | "college";

interface IllustrationProps {
  mode: StudentMode;
}

/**
 * Common Clay-style SVG filter & lighting definitions
 */
function SvgFilters() {
  return (
    <defs>
      {/* Soft clay drop-shadow */}
      <filter id="clay-shadow" x="-20%" y="-20%" width="150%" height="150%">
        <feDropShadow
          dx="0"
          dy="6"
          stdDeviation="8"
          floodColor="#171A2B"
          floodOpacity="0.1"
        />
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="3"
          floodColor="#6757F5"
          floodOpacity="0.06"
        />
      </filter>

      {/* Floating element soft glow */}
      <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Radial stage lighting */}
      <radialGradient id="stage-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#FAF8FF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#EFEBFD" stopOpacity="0.4" />
      </radialGradient>

      {/* Lens glass shimmer */}
      <linearGradient id="lens-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
        <stop offset="35%" stopColor="#35B8C5" stopOpacity="0.25" />
        <stop offset="70%" stopColor="#6757F5" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
      </linearGradient>

      {/* Iris Clay Gradient */}
      <linearGradient id="iris-clay" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8777FF" />
        <stop offset="50%" stopColor="#6757F5" />
        <stop offset="100%" stopColor="#4A3AC9" />
      </linearGradient>

      {/* Cyan/Mint Clay Gradient */}
      <linearGradient id="cyan-clay" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#65E0EC" />
        <stop offset="50%" stopColor="#35B8C5" />
        <stop offset="100%" stopColor="#1E8C98" />
      </linearGradient>

      {/* Coral Clay Gradient */}
      <linearGradient id="coral-clay" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA48B" />
        <stop offset="50%" stopColor="#FF7A59" />
        <stop offset="100%" stopColor="#DE512E" />
      </linearGradient>

      {/* Sunny Amber Clay Gradient */}
      <linearGradient id="amber-clay" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>

      {/* Emerald Nature Clay Gradient */}
      <linearGradient id="emerald-clay" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="50%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>

      {/* Warm Skin Tone Gradients */}
      <linearGradient id="skin-tone" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E5AC85" />
        <stop offset="60%" stopColor="#D8996D" />
        <stop offset="100%" stopColor="#C48356" />
      </linearGradient>

      {/* Dark textured hair gradient */}
      <linearGradient id="hair-tone" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2E2842" />
        <stop offset="100%" stopColor="#181424" />
      </linearGradient>
    </defs>
  );
}

/**
 * SCENE 1: DISCOVER — "What makes you curious?"
 * Student with magnifying glass looking at gentle, floating curiosity objects
 */
export function DiscoverScene({ mode }: IllustrationProps) {
  const isSchool = mode === "school";

  return (
    <svg
      viewBox="0 0 520 300"
      className="w-full h-auto max-h-[290px] sm:max-h-[310px] select-none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Student exploring interests with a magnifying glass and floating curiosity objects"
    >
      <style>{`
        @keyframes float-local-a {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(2deg); }
        }
        @keyframes float-local-b {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-9px) rotate(-2deg); }
        }
        @keyframes float-local-c {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.03); }
        }
        @keyframes lens-hover-local {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(1.5deg); }
        }
        @keyframes twinkle-local {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .anim-float-a { animation: float-local-a 4.5s ease-in-out infinite; }
        .anim-float-b { animation: float-local-b 5.2s ease-in-out infinite 0.7s; }
        .anim-float-c { animation: float-local-c 4s ease-in-out infinite 1.4s; }
        .anim-lens { animation: lens-hover-local 3.8s ease-in-out infinite; }
        .anim-twinkle { animation: twinkle-local 2.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .anim-float-a, .anim-float-b, .anim-float-c, .anim-lens, .anim-twinkle {
            animation: none !important;
          }
        }
      `}</style>
      <SvgFilters />

      {/* Backdrop Ambient Light */}
      <rect width="520" height="300" rx="20" fill="url(#stage-glow)" />

      {/* Soft Decorative Ground Hill */}
      <path
        d="M-20 310 Q 140 265, 300 275 T 540 280 L 540 320 L -20 320 Z"
        fill="#EDE8FA"
        opacity="0.8"
      />
      <path
        d="M20 310 Q 200 250, 420 265 T 540 270 L 540 320 L 20 320 Z"
        fill="#E4DEF5"
        opacity="0.5"
      />

      {/* Twinkling ambient discovery sparks */}
      <g transform="translate(290, 40)">
        <polygon className="anim-twinkle" points="0,-6 2,-2 6,0 2,2 0,6 -2,2 -6,0 -2,-2" fill="#F59E0B" />
      </g>
      <g transform="translate(490, 110)">
        <polygon className="anim-twinkle" points="0,-5 1.5,-1.5 5,0 1.5,1.5 0,5 -1.5,1.5 -5,0 -1.5,-1.5" fill="#35B8C5" style={{ animationDelay: "1s" }} />
      </g>
      <g transform="translate(270, 240)">
        <polygon className="anim-twinkle" points="0,-4 1,-1 4,0 1,1 0,4 -1,1 -4,0 -1,-1" fill="#6757F5" style={{ animationDelay: "1.8s" }} />
      </g>

      {/* ========================================================
          STUDENT CHARACTER (Friendly Indian Student, Left Side)
         ======================================================== */}
      <g id="student-character" transform="translate(60, 75)">
        {/* Soft shadow under student */}
        <ellipse cx="65" cy="205" rx="55" ry="12" fill="#171A2B" opacity="0.08" />

        {/* Body / Torso (Hoodie / Casual Jacket) */}
        <path
          d="M 30 145 C 30 115, 45 105, 68 105 C 90 105, 105 115, 105 145 L 112 200 C 112 205, 100 208, 68 208 C 36 208, 24 205, 24 200 Z"
          fill={isSchool ? "url(#iris-clay)" : "url(#iris-clay)"}
          filter="url(#clay-shadow)"
        />

        {/* Hoodie collar / T-shirt neck */}
        <path
          d="M 52 105 Q 68 120, 84 105 Q 78 128, 68 128 Q 58 128, 52 105 Z"
          fill={isSchool ? "#FAF9F6" : "#E0F7FA"}
        />

        {/* Neck */}
        <rect x="59" y="85" width="18" height="25" rx="9" fill="url(#skin-tone)" />

        {/* Head */}
        <ellipse
          cx="68"
          cy="68"
          rx="26"
          ry="28"
          fill="url(#skin-tone)"
          filter="url(#clay-shadow)"
        />

        {/* Friendly Ears */}
        <ellipse cx="42" cy="70" rx="5" ry="7" fill="url(#skin-tone)" />
        <ellipse cx="94" cy="70" rx="5" ry="7" fill="url(#skin-tone)" />

        {/* Hair (Voluminous, stylish modern Indian student cut) */}
        <path
          d="M 40 65 C 38 40, 50 28, 68 28 C 86 28, 98 40, 96 65 C 94 48, 86 42, 68 42 C 50 42, 42 48, 40 65 Z"
          fill="url(#hair-tone)"
        />
        <path
          d="M 44 48 C 55 34, 75 32, 92 42 C 84 38, 70 36, 56 42 Z"
          fill="#3E3659"
          opacity="0.6"
        />

        {/* Expressive Friendly Eyes */}
        <ellipse cx="60" cy="65" rx="3.5" ry="4.5" fill="#171A2B" />
        <ellipse cx="78" cy="65" rx="3.5" ry="4.5" fill="#171A2B" />
        {/* Specular eye highlights */}
        <circle cx="61.5" cy="63.5" r="1.3" fill="#FFFFFF" />
        <circle cx="79.5" cy="63.5" r="1.3" fill="#FFFFFF" />

        {/* Soft Eyebrows */}
        <path d="M 54 57 Q 61 54, 66 57" stroke="#171A2B" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 72 57 Q 77 54, 84 57" stroke="#171A2B" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Curious, Happy Smile */}
        <path
          d="M 62 77 Q 69 84, 76 77"
          stroke="#8A4822"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Soft Rosy Cheeks */}
        <circle cx="52" cy="73" r="4.5" fill="#FF7A59" opacity="0.3" />
        <circle cx="84" cy="73" r="4.5" fill="#FF7A59" opacity="0.3" />

        {/* Arm holding magnifying glass */}
        <path
          d="M 96 135 C 112 142, 128 140, 145 130"
          stroke="url(#iris-clay)"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="145" cy="130" r="10" fill="url(#skin-tone)" />
      </g>

      {/* ========================================================
          MAGNIFYING GLASS (Animated with nested group)
         ======================================================== */}
      <g transform="translate(195, 175)">
        <g className="anim-lens">
          {/* Handle */}
          <line
            x1="18"
            y1="18"
            x2="52"
            y2="52"
            stroke="url(#amber-clay)"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <line
            x1="46"
            y1="46"
            x2="52"
            y2="52"
            stroke="#B45309"
            strokeWidth="11"
            strokeLinecap="round"
          />

          {/* Outer Rim */}
          <circle
            cx="0"
            cy="0"
            r="44"
            fill="none"
            stroke="url(#amber-clay)"
            strokeWidth="8"
            filter="url(#clay-shadow)"
          />

          {/* Translucent Lens */}
          <circle
            cx="0"
            cy="0"
            r="40"
            fill="url(#lens-shimmer)"
            opacity="0.85"
          />

          {/* Glass reflections */}
          <path
            d="M -26 -16 A 32 32 0 0 1 18 -28"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M -18 12 A 32 32 0 0 1 -4 26"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>
      </g>

      {/* ========================================================
          FLOATING CURIOSITY DISCOVERY OBJECTS (Right Side)
          Note: Nested <g> preserves static (X,Y) translation!
         ======================================================== */}

      {/* 1. CREATIVE WORLD: Paint Palette & Open Storybook */}
      <g transform="translate(325, 45)">
        <g className="anim-float-a">
          {/* Card / Bubble Backing */}
          <rect x="-35" y="-30" width="70" height="60" rx="18" fill="#FFFFFF" filter="url(#clay-shadow)" />
          {/* Open Storybook */}
          <path
            d="M -22 -6 Q -12 -12, 0 -6 Q 12 -12, 22 -6 L 22 14 Q 12 8, 0 14 Q -12 8, -22 14 Z"
            fill="#FFF6ED"
            stroke="#FFA48B"
            strokeWidth="1.5"
          />
          {/* Bookmark & Sparkle */}
          <line x1="0" y1="-6" x2="0" y2="16" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="0" r="2.5" fill="#35B8C5" />
          <circle cx="-12" cy="0" r="2.5" fill="#F59E0B" />
          <polygon points="0,-16 2,-13 5,-13 3,-10 4,-7 0,-9 -4,-7 -3,-10 -5,-13 -2,-13" fill="#F59E0B" />
        </g>
      </g>

      {/* 2. SCIENCE & SPACE: Ringed Planet */}
      <g transform="translate(440, 65)">
        <g className="anim-float-b">
          <circle cx="0" cy="0" r="32" fill="#FFFFFF" filter="url(#clay-shadow)" />
          {/* Planet Body */}
          <circle cx="0" cy="0" r="22" fill="url(#cyan-clay)" />
          {/* Planet Surface Arc */}
          <path d="M -14 -4 Q 0 8, 14 -4" stroke="#65E0EC" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
          {/* Planet Rings */}
          <ellipse
            cx="0"
            cy="0"
            rx="32"
            ry="10"
            fill="none"
            stroke="url(#amber-clay)"
            strokeWidth="3.5"
            transform="rotate(-18)"
          />
          <circle cx="-6" cy="-8" r="2" fill="#FFFFFF" opacity="0.9" />
        </g>
      </g>

      {/* 3. NATURE & LIFE: Crystal Sprout Globe */}
      <g transform="translate(325, 175)">
        <g className="anim-float-c">
          <circle cx="0" cy="0" r="34" fill="#FFFFFF" filter="url(#clay-shadow)" />
          <circle cx="0" cy="0" r="28" fill="#E8F9F0" />
          {/* Sprout Stem */}
          <path
            d="M 0 14 Q 0 -2, -2 -10"
            stroke="url(#emerald-clay)"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Leaves */}
          <path d="M -2 -2 C -14 -4, -14 -12, -2 -8 Z" fill="url(#emerald-clay)" />
          <path d="M -2 -6 C 10 -8, 10 -16, -2 -11 Z" fill="#34D399" />
        </g>
      </g>

      {/* 4. STORY & TECH: Friendly Companion / Creative Device */}
      <g transform="translate(440, 185)">
        <g className="anim-float-a" style={{ animationDelay: "0.5s" }}>
          {isSchool ? (
            // Friendly Robot Companion for School
            <g>
              <rect x="-26" y="-24" width="52" height="48" rx="16" fill="#FFFFFF" filter="url(#clay-shadow)" />
              <rect x="-20" y="-18" width="40" height="36" rx="12" fill="url(#iris-clay)" />
              {/* Antenna */}
              <line x1="0" y1="-18" x2="0" y2="-26" stroke="#8777FF" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="0" cy="-26" r="3" fill="#35B8C5" />
              {/* Cheerful Eyes */}
              <circle cx="-8" cy="-3" r="2.5" fill="#FFFFFF" />
              <circle cx="8" cy="-3" r="2.5" fill="#FFFFFF" />
              <path d="M -5 5 Q 0 8, 5 5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            // Modern Design/Tech Cube for College
            <g>
              <rect x="-26" y="-26" width="52" height="52" rx="16" fill="#FFFFFF" filter="url(#clay-shadow)" />
              <rect x="-20" y="-20" width="40" height="40" rx="12" fill="url(#iris-clay)" />
              {/* Code brackets */}
              <path
                d="M -10 -6 L -15 0 L -10 6 M 10 -6 L 15 0 L 10 6 M 4 -8 L -4 8"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          )}
        </g>
      </g>

      {/* Connecting wonder trails */}
      <g stroke="#6757F5" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.3">
        <path d="M 235 160 Q 280 100, 310 65" fill="none" />
        <path d="M 240 175 Q 310 160, 310 175" fill="none" />
        <path d="M 240 185 Q 330 200, 420 195" fill="none" />
      </g>
    </svg>
  );
}

/**
 * SCENE 2: EXPLORE — "There's so much to discover."
 * 5 Welcoming Interest Worlds connected by gentle glowing constellation bridges
 */
export function ExploreScene({ mode }: IllustrationProps) {
  const isSchool = mode === "school";

  return (
    <svg
      viewBox="0 0 520 300"
      className="w-full h-auto max-h-[290px] sm:max-h-[310px] select-none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Vibrant connected interest worlds representing arts, science, nature, technology, and community"
    >
      <style>{`
        @keyframes float-w1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes float-w2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes float-w3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes orbit-flow { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -40; } }
        .anim-w1 { animation: float-w1 4.5s ease-in-out infinite; }
        .anim-w2 { animation: float-w2 5.2s ease-in-out infinite 0.6s; }
        .anim-w3 { animation: float-w3 4.2s ease-in-out infinite 1.2s; }
        .anim-orbit { animation: orbit-flow 10s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .anim-w1, .anim-w2, .anim-w3, .anim-orbit { animation: none !important; }
        }
      `}</style>
      <SvgFilters />

      {/* Backdrop */}
      <rect width="520" height="300" rx="20" fill="url(#stage-glow)" />

      {/* ========================================================
          CONNECTING CONSTELLATION PATHWAYS
         ======================================================== */}
      <g fill="none" strokeWidth="2.5" strokeLinecap="round" className="anim-orbit">
        {/* Pathway Creativity to Center */}
        <path d="M 125 90 Q 190 110, 260 145" stroke="#FFA48B" strokeDasharray="5 5" opacity="0.75" />
        {/* Pathway Science to Center */}
        <path d="M 395 85 Q 330 110, 260 145" stroke="#65E0EC" strokeDasharray="5 5" opacity="0.75" />
        {/* Pathway Nature to Center */}
        <path d="M 125 215 Q 190 190, 260 155" stroke="#6EE7B7" strokeDasharray="5 5" opacity="0.75" />
        {/* Pathway Tech to Center */}
        <path d="M 395 215 Q 330 190, 260 155" stroke="#8777FF" strokeDasharray="5 5" opacity="0.75" />
        {/* Outer Ring Bridge */}
        <path d="M 125 90 Q 260 30, 395 85" stroke="#DDD8FE" strokeDasharray="6 6" opacity="0.5" />
        <path d="M 125 215 Q 260 270, 395 215" stroke="#DDD8FE" strokeDasharray="6 6" opacity="0.5" />
      </g>

      {/* ========================================================
          CENTRAL HUB: Student Navigator on Observation Cloud
         ======================================================== */}
      <g transform="translate(260, 150)">
        {/* Glowing cloud platform */}
        <ellipse cx="0" cy="22" rx="46" ry="14" fill="#FFFFFF" filter="url(#clay-shadow)" />
        <ellipse cx="0" cy="22" rx="38" ry="10" fill="#EDEAFF" />

        {/* Miniature Student Avatar with Compass */}
        <ellipse cx="0" cy="5" rx="16" ry="18" fill="url(#iris-clay)" />
        <circle cx="0" cy="-14" r="12" fill="url(#skin-tone)" />
        <path d="M -12 -16 C -12 -26, 12 -26, 12 -16 Z" fill="url(#hair-tone)" />
        {/* Friendly eyes */}
        <circle cx="-4" cy="-14" r="1.5" fill="#171A2B" />
        <circle cx="4" cy="-14" r="1.5" fill="#171A2B" />
        <path d="M -3 -9 Q 0 -6, 3 -9" stroke="#8A4822" strokeWidth="1.2" fill="none" />

        {/* Golden Compass in Hand */}
        <circle cx="14" cy="2" r="8" fill="url(#amber-clay)" />
        <polygon points="14,-2 17,2 14,6 11,2" fill="#FFFFFF" />
      </g>

      {/* ========================================================
          WORLD 1 (Top-Left): CREATIVITY & ARTS
         ======================================================== */}
      <g transform="translate(125, 90)">
        <g className="anim-w1">
          {/* Planet Sphere */}
          <circle cx="0" cy="0" r="36" fill="url(#coral-clay)" filter="url(#clay-shadow)" />
          <circle cx="-10" cy="-10" r="6" fill="#FFFFFF" opacity="0.3" />
          {/* Art Palette */}
          <path
            d="M -14 6 C -14 -6, 14 -6, 14 6 C 14 12, 7 14, 0 10 C -5 14, -14 12, -14 6 Z"
            fill="#FFFFFF"
          />
          <circle cx="-5" cy="4" r="2.5" fill="#FF7A59" />
          <circle cx="3" cy="4" r="2.5" fill="#FFE082" />
          {/* Label Pill */}
          <rect x="-38" y="44" width="76" height="20" rx="10" fill="#FFFFFF" filter="url(#clay-shadow)" />
          <text x="0" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill="#DE512E">
            {isSchool ? "Creative Arts" : "Design & Media"}
          </text>
        </g>
      </g>

      {/* ========================================================
          WORLD 2 (Top-Right): SCIENCE & DISCOVERY
         ======================================================== */}
      <g transform="translate(395, 85)">
        <g className="anim-w2">
          {/* Planet Sphere */}
          <circle cx="0" cy="0" r="36" fill="url(#cyan-clay)" filter="url(#clay-shadow)" />
          <circle cx="-10" cy="-10" r="6" fill="#FFFFFF" opacity="0.3" />
          {/* Telescope & Star */}
          <line x1="-12" y1="12" x2="12" y2="-12" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="12,-16 14,-10 18,-12" fill="#FFE082" />
          <circle cx="16" cy="12" r="3" fill="#FFFFFF" opacity="0.8" />
          {/* Label Pill */}
          <rect x="-42" y="44" width="84" height="20" rx="10" fill="#FFFFFF" filter="url(#clay-shadow)" />
          <text x="0" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill="#00838F">
            {isSchool ? "Science & Space" : "Sciences & Research"}
          </text>
        </g>
      </g>

      {/* ========================================================
          WORLD 3 (Bottom-Left): NATURE & LIFE
         ======================================================== */}
      <g transform="translate(125, 215)">
        <g className="anim-w3">
          {/* Planet Sphere */}
          <circle cx="0" cy="0" r="36" fill="url(#emerald-clay)" filter="url(#clay-shadow)" />
          <circle cx="-10" cy="-10" r="6" fill="#FFFFFF" opacity="0.3" />
          {/* Sprout & Leaf */}
          <path d="M 0 12 L 0 -4 M 0 2 Q -10 -4, -6 -12 Q 2 -8, 0 2 M 0 0 Q 10 -6, 8 -14 Q 0 -10, 0 0" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          {/* Label Pill */}
          <rect x="-38" y="44" width="76" height="20" rx="10" fill="#FFFFFF" filter="url(#clay-shadow)" />
          <text x="0" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill="#047857">
            {isSchool ? "Nature & Earth" : "Ecology & Bio"}
          </text>
        </g>
      </g>

      {/* ========================================================
          WORLD 4 (Bottom-Right): TECH & BUILDING
         ======================================================== */}
      <g transform="translate(395, 215)">
        <g className="anim-w1">
          {/* Planet Sphere */}
          <circle cx="0" cy="0" r="36" fill="url(#iris-clay)" filter="url(#clay-shadow)" />
          <circle cx="-10" cy="-10" r="6" fill="#FFFFFF" opacity="0.3" />
          {/* Code / Logic Bracket */}
          <path
            d="M -10 -8 L -16 0 L -10 8 M 10 -8 L 16 0 L 10 8 M 4 -10 L -4 10"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Label Pill */}
          <rect x="-42" y="44" width="84" height="20" rx="10" fill="#FFFFFF" filter="url(#clay-shadow)" />
          <text x="0" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill="#4A3AC9">
            {isSchool ? "Tech & Coding" : "AI & Technology"}
          </text>
        </g>
      </g>
    </svg>
  );
}

/**
 * SCENE 3: TRY — "Try something new!"
 * Student actively building, experimenting, and bringing a project to life
 */
export function TryScene({ mode }: IllustrationProps) {
  const isSchool = mode === "school";

  return (
    <svg
      viewBox="0 0 520 300"
      className="w-full h-auto max-h-[290px] sm:max-h-[310px] select-none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Student joyfully assembling a hands-on project at a creative maker workbench"
    >
      <style>{`
        @keyframes gear-spin-local {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes beam-pulse-local {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }
        @keyframes rover-assemble-local {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .anim-gear { animation: gear-spin-local 12s linear infinite; transform-origin: 0 0; }
        .anim-beam { animation: beam-pulse-local 2.5s ease-in-out infinite; }
        .anim-rover { animation: rover-assemble-local 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .anim-gear, .anim-beam, .anim-rover { animation: none !important; }
        }
      `}</style>
      <SvgFilters />

      {/* Backdrop */}
      <rect width="520" height="300" rx="20" fill="url(#stage-glow)" />

      {/* Workbench Table */}
      <path
        d="M 50 215 L 470 215 C 485 215, 490 225, 490 235 L 485 275 C 485 285, 475 290, 460 290 L 60 290 C 45 290, 35 285, 35 275 L 30 235 C 30 225, 35 215, 50 215 Z"
        fill="#FFFFFF"
        filter="url(#clay-shadow)"
      />
      <rect x="40" y="222" width="440" height="8" rx="4" fill="#EDEAFF" />

      {/* ========================================================
          STUDENT BUILDER (Left side of workbench)
         ======================================================== */}
      <g transform="translate(60, 60)">
        {/* Torso */}
        <path
          d="M 40 145 C 40 120, 52 110, 72 110 C 92 110, 104 120, 104 145 L 110 195 C 110 200, 100 205, 72 205 C 44 205, 34 200, 34 195 Z"
          fill="url(#iris-clay)"
          filter="url(#clay-shadow)"
        />

        {/* Neck */}
        <rect x="64" y="90" width="16" height="24" rx="8" fill="url(#skin-tone)" />

        {/* Head */}
        <ellipse cx="72" cy="72" rx="25" ry="26" fill="url(#skin-tone)" />

        {/* Hair */}
        <path
          d="M 45 70 C 42 45, 55 32, 72 32 C 89 32, 101 45, 99 70 C 96 52, 88 46, 72 46 C 56 46, 48 52, 45 70 Z"
          fill="url(#hair-tone)"
        />

        {/* Confident, Focused Eyes */}
        <ellipse cx="66" cy="70" rx="3" ry="4" fill="#171A2B" />
        <ellipse cx="80" cy="70" rx="3" ry="4" fill="#171A2B" />
        <circle cx="67" cy="68" r="1.2" fill="#FFFFFF" />
        <circle cx="81" cy="68" r="1.2" fill="#FFFFFF" />

        {/* Cheerful Determined Smile */}
        <path d="M 67 81 Q 73 87, 79 81" stroke="#8A4822" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Arm reaching toward project */}
        <path
          d="M 98 135 Q 125 145, 148 152"
          stroke="url(#iris-clay)"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="150" cy="152" r="9" fill="url(#skin-tone)" />
      </g>

      {/* ========================================================
          HANDS-ON PROJECT BENCH (Center-Right)
          Nested <g> ensures translation is preserved!
         ======================================================== */}
      <g transform="translate(230, 90)">
        <g className="anim-rover">
          {isSchool ? (
            // School: Friendly Solar Explorer Rover
            <g>
              {/* Chassis Body */}
              <rect x="30" y="65" width="110" height="48" rx="16" fill="url(#cyan-clay)" filter="url(#clay-shadow)" />

              {/* Rover Face / Screen */}
              <rect x="42" y="74" width="48" height="30" rx="8" fill="#171A2B" />
              {/* Happy Eyes on screen */}
              <path d="M 50 88 Q 55 83, 60 88" stroke="#35B8C5" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 68 88 Q 73 83, 78 88" stroke="#35B8C5" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Solar Wing */}
              <rect
                x="96"
                y="50"
                width="54"
                height="24"
                rx="6"
                fill="url(#amber-clay)"
                transform="rotate(-12, 96, 50)"
                filter="url(#clay-shadow)"
              />
              {/* Solar panel grid lines */}
              <line x1="114" y1="46" x2="114" y2="70" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
              <line x1="132" y1="42" x2="132" y2="66" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />

              {/* Glowing sunbeam hitting solar panel */}
              <polygon
                points="155,10 110,48 150,42"
                fill="#F59E0B"
                opacity="0.25"
                className="anim-beam"
              />

              {/* Rover Wheels */}
              <circle cx="48" cy="118" r="16" fill="#171A2B" filter="url(#clay-shadow)" />
              <circle cx="48" cy="118" r="7" fill="#6757F5" />
              <circle cx="120" cy="118" r="16" fill="#171A2B" filter="url(#clay-shadow)" />
              <circle cx="120" cy="118" r="7" fill="#6757F5" />
            </g>
          ) : (
            // College: Interactive Prototype Studio & Display
            <g>
              {/* Laptop / Studio Tablet */}
              <rect x="25" y="45" width="130" height="85" rx="12" fill="#171A2B" filter="url(#clay-shadow)" />
              <rect x="33" y="53" width="114" height="69" rx="6" fill="#202538" />

              {/* Live Interactive Prototype UI on Screen */}
              <rect x="42" y="62" width="46" height="20" rx="4" fill="url(#iris-clay)" />
              <circle cx="52" cy="72" r="4" fill="#FFFFFF" />
              <rect x="62" y="69" width="20" height="6" rx="3" fill="#FFFFFF" />

              {/* Waveform / Growth curve on screen */}
              <path
                d="M 42 105 Q 60 90, 80 100 T 120 75 T 140 85"
                stroke="#35B8C5"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Stand Base */}
              <path d="M 15 130 L 165 130 C 170 130, 165 135, 155 136 L 25 136 Z" fill="#626987" />
            </g>
          )}

          {/* Rotating Mechanical Gear on side */}
          <g transform="translate(185, 75)">
            <g className="anim-gear">
              <circle cx="0" cy="0" r="16" fill="url(#amber-clay)" />
              <circle cx="0" cy="0" r="6" fill="#FAF9F6" />
              <rect x="-3" y="-20" width="6" height="40" rx="2" fill="url(#amber-clay)" />
              <rect x="-20" y="-3" width="40" height="6" rx="2" fill="url(#amber-clay)" />
            </g>
          </g>
        </g>
      </g>

      {/* Inspiring Sparkles / Project Delight */}
      <g transform="translate(435, 115)">
        <polygon points="0,-8 3,-3 8,0 3,3 0,8 -3,3 -8,0 -3,-3" fill="#10B981" />
      </g>
      <g transform="translate(245, 105)">
        <polygon points="0,-6 2,-2 6,0 2,2 0,6 -2,2 -6,0 -2,-2" fill="#FF7A59" />
      </g>
    </svg>
  );
}

/**
 * SCENE 4: GROW — "Your journey keeps growing."
 * Student at the center with an open creative journal, surrounded by three emerging
 * organic learning possibilities: Create, Explore, and Experience.
 * Zero summit, zero finish flag, zero linear milestone locks.
 */
export function GrowScene({ mode }: IllustrationProps) {
  const isSchool = mode === "school";

  return (
    <svg
      viewBox="0 0 520 300"
      className="w-full h-auto max-h-[290px] sm:max-h-[310px] select-none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Student at the center of an expanding world of learning possibilities: Create, Explore, and Experience"
    >
      <style>{`
        @keyframes float-create-local {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(2deg); }
        }
        @keyframes float-explore-local {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes float-experience-local {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1.5deg); }
        }
        @keyframes journal-glow-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.06); }
        }
        @keyframes ribbon-travel {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -36; }
        }
        @keyframes gear-spin-soft {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .anim-grow-create { animation: float-create-local 4.8s ease-in-out infinite; }
        .anim-grow-explore { animation: float-explore-local 5.4s ease-in-out infinite 0.6s; }
        .anim-grow-experience { animation: float-experience-local 4.4s ease-in-out infinite 1.2s; }
        .anim-journal-glow { animation: journal-glow-pulse 4s ease-in-out infinite; transform-origin: 258px 235px; }
        .anim-ribbon { animation: ribbon-travel 8s linear infinite; }
        .anim-gear-grow { animation: gear-spin-soft 14s linear infinite; transform-origin: 0 0; }
        @media (prefers-reduced-motion: reduce) {
          .anim-grow-create, .anim-grow-explore, .anim-grow-experience, .anim-journal-glow, .anim-ribbon, .anim-gear-grow {
            animation: none !important;
          }
        }
      `}</style>
      <SvgFilters />

      {/* Backdrop Ambient Light */}
      <rect width="520" height="300" rx="20" fill="url(#stage-glow)" />

      {/* Soft Floating Cloud / Ambient Hill Base */}
      <path
        d="M -20 295 Q 120 255, 260 260 T 540 265 L 540 320 L -20 320 Z"
        fill="#EDE8FA"
        opacity="0.75"
      />
      <path
        d="M 30 305 Q 180 245, 360 255 T 540 260 L 540 320 L 30 320 Z"
        fill="#E4DEF5"
        opacity="0.45"
      />

      {/* Ambient Twinkling Discovery Sparks */}
      <g transform="translate(240, 40)">
        <polygon points="0,-5 1.5,-1.5 5,0 1.5,1.5 0,5 -1.5,1.5 -5,0 -1.5,-1.5" fill="#FFE082" />
      </g>
      <g transform="translate(485, 130)">
        <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" fill="#35B8C5" />
      </g>
      <g transform="translate(65, 170)">
        <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" fill="#FF7A59" />
      </g>

      {/* ========================================================
          FLOWING RIBBONS OF LIGHT (Emerging from central notebook)
         ======================================================== */}
      <g fill="none" strokeWidth="2.5" strokeLinecap="round" className="anim-ribbon">
        {/* Ribbon to Create (Top-Left) */}
        <path
          d="M 235 220 C 180 185, 140 145, 120 115"
          stroke="#FFA48B"
          strokeDasharray="5 5"
          opacity="0.7"
        />
        {/* Ribbon to Explore (Top-Right) */}
        <path
          d="M 285 220 C 335 180, 375 140, 400 110"
          stroke="#65E0EC"
          strokeDasharray="5 5"
          opacity="0.7"
        />
        {/* Ribbon to Experience (Bottom-Right) */}
        <path
          d="M 295 235 C 330 230, 365 220, 395 215"
          stroke="#8777FF"
          strokeDasharray="5 5"
          opacity="0.7"
        />
      </g>

      {/* ========================================================
          CENTRAL STUDENT CHARACTER WITH OPEN JOURNAL
         ======================================================== */}
      <g transform="translate(190, 65)">
        {/* Ground Shadow */}
        <ellipse cx="68" cy="210" rx="52" ry="12" fill="#171A2B" opacity="0.08" />

        {/* Soft Radial Glow radiating from the open journal */}
        <circle cx="68" cy="170" r="48" fill="url(#amber-clay)" opacity="0.25" filter="url(#soft-glow)" className="anim-journal-glow" />

        {/* Student Torso */}
        <path
          d="M 30 145 C 30 115, 45 105, 68 105 C 91 105, 106 115, 106 145 L 112 200 C 112 205, 100 208, 68 208 C 36 208, 24 205, 24 200 Z"
          fill="url(#iris-clay)"
          filter="url(#clay-shadow)"
        />

        {/* Hoodie Collar */}
        <path
          d="M 52 105 Q 68 120, 84 105 Q 78 128, 68 128 Q 58 128, 52 105 Z"
          fill={isSchool ? "#FAF9F6" : "#E0F7FA"}
        />

        {/* Neck */}
        <rect x="59" y="85" width="18" height="25" rx="9" fill="url(#skin-tone)" />

        {/* Head */}
        <ellipse cx="68" cy="68" rx="26" ry="28" fill="url(#skin-tone)" filter="url(#clay-shadow)" />

        {/* Ears */}
        <ellipse cx="42" cy="70" rx="5" ry="7" fill="url(#skin-tone)" />
        <ellipse cx="94" cy="70" rx="5" ry="7" fill="url(#skin-tone)" />

        {/* Hair */}
        <path
          d="M 40 65 C 38 40, 50 28, 68 28 C 86 28, 98 40, 96 65 C 94 48, 86 42, 68 42 C 50 42, 42 48, 40 65 Z"
          fill="url(#hair-tone)"
        />
        <path
          d="M 44 48 C 55 34, 75 32, 92 42 C 84 38, 70 36, 56 42 Z"
          fill="#3E3659"
          opacity="0.6"
        />

        {/* Expressive Eyes Looking Up with Wonder */}
        <ellipse cx="60" cy="64" rx="3.5" ry="4.5" fill="#171A2B" />
        <ellipse cx="78" cy="64" rx="3.5" ry="4.5" fill="#171A2B" />
        <circle cx="62" cy="62" r="1.3" fill="#FFFFFF" />
        <circle cx="80" cy="62" r="1.3" fill="#FFFFFF" />

        {/* Soft Eyebrows */}
        <path d="M 54 56 Q 61 52, 66 56" stroke="#171A2B" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 72 56 Q 77 52, 84 56" stroke="#171A2B" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Warm Inspired Smile */}
        <path d="M 61 76 Q 69 83, 77 76" stroke="#8A4822" strokeWidth="2.4" strokeLinecap="round" fill="none" />

        {/* Rosy Cheeks */}
        <circle cx="51" cy="72" r="4.5" fill="#FF7A59" opacity="0.3" />
        <circle cx="85" cy="72" r="4.5" fill="#FF7A59" opacity="0.3" />

        {/* Arms holding the open learning journal */}
        <path
          d="M 32 145 C 32 170, 50 178, 62 175"
          stroke="url(#iris-clay)"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 104 145 C 104 170, 86 178, 74 175"
          stroke="url(#iris-clay)"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />

        {/* Hands */}
        <circle cx="48" cy="172" r="8" fill="url(#skin-tone)" />
        <circle cx="88" cy="172" r="8" fill="url(#skin-tone)" />

        {/* ========================================================
            OPEN ILLUSTRATED JOURNAL / SKETCHBOOK
           ======================================================== */}
        <g transform="translate(68, 172)">
          {/* Book Spine Shadow */}
          <rect x="-34" y="-14" width="68" height="28" rx="8" fill="#FFFFFF" filter="url(#clay-shadow)" />

          {/* Left Page */}
          <path
            d="M -30 -10 Q -15 -14, 0 -8 L 0 10 Q -15 6, -30 10 Z"
            fill="#FFFBF2"
            stroke="#FFE082"
            strokeWidth="1.2"
          />
          {/* Right Page */}
          <path
            d="M 30 -10 Q 15 -14, 0 -8 L 0 10 Q 15 6, 30 10 Z"
            fill="#FFFBF2"
            stroke="#FFE082"
            strokeWidth="1.2"
          />

          {/* Little drawings in the notebook */}
          {/* Left page: spark / star */}
          <polygon points="-16,-2 -14,1 -11,2 -13,4 -13,7 -16,5 -19,7 -19,4 -21,2 -18,1" fill="#FF7A59" />
          {/* Right page: mini sprout */}
          <path d="M 15 6 L 15 0 M 15 2 Q 10 0, 12 -4 Q 16 -2, 15 2 M 15 1 Q 20 -1, 18 -5 Q 14 -3, 15 1" stroke="#10B981" strokeWidth="1.2" fill="none" />

          {/* Center glow bookmark */}
          <line x1="0" y1="-8" x2="0" y2="12" stroke="#6757F5" strokeWidth="2" strokeLinecap="round" />
          <circle cx="0" cy="-14" r="3" fill="#F59E0B" />
        </g>
      </g>

      {/* ========================================================
          POSSIBILITY 1: CREATE (Top-Left)
          Art, design, storytelling, or personal creative projects
         ======================================================== */}
      <g transform="translate(115, 80)">
        <g className="anim-grow-create">
          {/* White Clay Card Base */}
          <rect x="-38" y="-35" width="76" height="70" rx="20" fill="#FFFFFF" filter="url(#clay-shadow)" />

          {/* Creative Canvas / Palette */}
          <circle cx="0" cy="-6" r="24" fill="url(#coral-clay)" />
          <circle cx="-6" cy="-12" r="4" fill="#FFFFFF" opacity="0.3" />

          {/* Artist's Palette & Splash */}
          <path
            d="M -10 -2 C -10 -10, 10 -10, 10 -2 C 10 4, 5 6, 0 3 C -4 6, -10 4, -10 -2 Z"
            fill="#FFFFFF"
          />
          <circle cx="-3" cy="-4" r="2" fill="#FF7A59" />
          <circle cx="3" cy="-4" r="2" fill="#FFE082" />

          {/* Floating Origami Bird / Story Quill */}
          <g transform="translate(18, -20)">
            <polygon points="0,0 8,-6 10,0 4,2" fill="#FFA48B" />
          </g>

          {/* Label Pill: "Create" */}
          <rect x="-30" y="24" width="60" height="18" rx="9" fill="#FFF2EE" stroke="#FFD8CC" strokeWidth="1" />
          <text x="0" y="36.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#DE512E">
            Create
          </text>
        </g>
      </g>

      {/* ========================================================
          POSSIBILITY 2: EXPLORE (Top-Right)
          Nature, science, research, or discovering the unfamiliar
         ======================================================== */}
      <g transform="translate(405, 75)">
        <g className="anim-grow-explore">
          {/* White Clay Card Base */}
          <rect x="-38" y="-35" width="76" height="70" rx="20" fill="#FFFFFF" filter="url(#clay-shadow)" />

          {/* Science & Nature Sphere */}
          <circle cx="0" cy="-6" r="24" fill="url(#cyan-clay)" />
          <circle cx="-6" cy="-12" r="4" fill="#FFFFFF" opacity="0.3" />

          {/* Discovery Ring & Mini Planet */}
          <ellipse cx="0" cy="-6" rx="28" ry="8" fill="none" stroke="url(#amber-clay)" strokeWidth="2.8" transform="rotate(-15)" />
          {/* Sprout & Planet symbol */}
          <path d="M 0 4 L 0 -8 M 0 -4 Q -6 -8, -4 -13 Q 0 -10, 0 -4 M 0 -6 Q 6 -10, 4 -15 Q 0 -12, 0 -6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Sparkle */}
          <polygon points="18,-18 20,-15 23,-15 21,-13 22,-10 18,-12 15,-10 16,-13 14,-15 17,-15" fill="#FFE082" />

          {/* Label Pill: "Explore" */}
          <rect x="-30" y="24" width="60" height="18" rx="9" fill="#E8F9FA" stroke="#C5F2F6" strokeWidth="1" />
          <text x="0" y="36.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#00838F">
            Explore
          </text>
        </g>
      </g>

      {/* ========================================================
          POSSIBILITY 3: EXPERIENCE (Bottom-Right)
          Hands-on learning, collaborative projects, real-world impact
         ======================================================== */}
      <g transform="translate(405, 210)">
        <g className="anim-grow-experience">
          {/* White Clay Card Base */}
          <rect x="-42" y="-35" width="84" height="70" rx="20" fill="#FFFFFF" filter="url(#clay-shadow)" />

          {/* Project & Community Sphere */}
          <circle cx="0" cy="-6" r="24" fill="url(#iris-clay)" />
          <circle cx="-6" cy="-12" r="4" fill="#FFFFFF" opacity="0.3" />

          {/* Interlocking Gears & Collaborative Sparks */}
          <g transform="translate(0, -6)">
            <g className="anim-gear-grow">
              <circle cx="0" cy="0" r="10" fill="#FFFFFF" opacity="0.9" />
              <circle cx="0" cy="0" r="4" fill="#6757F5" />
              <rect x="-2" y="-12" width="4" height="24" rx="1.5" fill="#FFFFFF" />
              <rect x="-12" y="-2" width="24" height="4" rx="1.5" fill="#FFFFFF" />
            </g>
          </g>

          {/* Cheerful Connection Dot */}
          <circle cx="16" cy="6" r="3.5" fill="#10B981" />
          <circle cx="-16" cy="6" r="2.5" fill="#F59E0B" />

          {/* Label Pill: "Experience" */}
          <rect x="-38" y="24" width="76" height="18" rx="9" fill="#F0EDFF" stroke="#DDD8FE" strokeWidth="1" />
          <text x="0" y="36.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6757F5">
            Experience
          </text>
        </g>
      </g>
    </svg>
  );
}

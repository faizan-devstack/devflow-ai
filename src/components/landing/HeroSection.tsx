"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  PiSparkle,
  PiArrowRight,
  PiCheckCircle,
} from "react-icons/pi";

import { OrganicGradientBackground } from "../animations/OrganicGradientBackground";
import { TextRotate } from "../animations/TextRotate";

// ─── Constants ────────────────────────────────────────────────────────────────

const ROTATING_WORDS = [
  "Dev Teams",
  "Async Standups",
  "Codebase Onboarding",
  "Agencies",
];

const AVATARS = [
  { initials: "JK", id: "jk" },
  { initials: "AM", id: "am" },
  { initials: "RP", id: "rp" },
  { initials: "SL", id: "sl" },
  { initials: "TW", id: "tw" },
];

// ─── Fade-up animation variant ────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Centered content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">

        {/* 1. Badge pill */}
        <motion.div {...fadeUp(0)}>
          <span
            className="inline-flex items-center gap-2 bg-primary-bg border border-primary-border/50 text-primary-text text-xs px-3 py-1.5 rounded-full"
          >
            <PiSparkle className="text-primary-solid" aria-hidden="true" />
            AI-Powered Dev Team Workspace
          </span>
        </motion.div>

        {/* 2. Headline */}
        <motion.h1
          className="mt-6 text-5xl sm:text-6xl font-semibold leading-tight tracking-tight text-canvas-text-contrast"
          {...fadeUp(0.15)}
        >
          The AI Workspace for{" "}
          <br className="hidden sm:block" />
          <span className="inline-flex overflow-hidden h-[1.1em] align-bottom">
            <TextRotate
              texts={ROTATING_WORDS}
              rotationInterval={2400}
              staggerDuration={0.025}
              staggerFrom="first"
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              mainClassName="text-primary-solid text-5xl sm:text-6xl font-semibold"
            />
          </span>
        </motion.h1>

        {/* 3. Subheadline */}
        <motion.p
          className="mt-4 text-canvas-text text-lg max-w-2xl mx-auto leading-relaxed"
          {...fadeUp(0.25)}
        >
          Async standups your team will actually use. Instant codebase
          onboarding. Weekly digests clients love.
        </motion.p>

        {/* 4. CTA row */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center"
          {...fadeUp(0.35)}
        >
          <Link
            href="/sign-up"
            id="hero-cta-start"
            className="inline-flex items-center gap-2 bg-primary-solid text-primary-on-primary px-7 py-3 rounded-xl font-medium hover:bg-primary-solid-hover transition-all duration-200 cursor-pointer"
          >
            Start Free
            <PiArrowRight aria-hidden="true" />
          </Link>

          <a
            href="#how-it-works"
            id="hero-cta-demo"
            className="inline-flex items-center gap-2 border border-canvas-border/50 text-canvas-text-contrast px-7 py-3 rounded-xl hover:bg-canvas-bg transition-all duration-200 cursor-pointer"
          >
            Watch Demo
          </a>
        </motion.div>

        {/* 5. Social proof */}
        <motion.div
          className="mt-6 flex items-center justify-center"
          {...fadeUp(0.45)}
        >
          {/* Overlapping avatars */}
          <div className="flex items-center">
            {AVATARS.map((avatar, i) => (
              <div
                key={avatar.id}
                className={`w-8 h-8 rounded-full bg-primary-bg text-primary-text text-xs font-medium flex items-center justify-center border-2 border-canvas-base select-none ${i !== 0 ? "-ml-2" : ""}`}
                aria-hidden="true"
              >
                {avatar.initials}
              </div>
            ))}
          </div>
          <p className="ml-3 text-canvas-text text-sm">
            <span className="text-canvas-text-contrast font-medium">200+</span>{" "}
            developers trust DevFlow
          </p>
        </motion.div>
      </div>
    </section>
  );
}

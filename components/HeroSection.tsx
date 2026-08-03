"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ShieldCheck, Palette, Sparkles } from "lucide-react";
import { brandConfig, heroConfig, ThemeVariant } from "@/lib/links-config";

interface HeroSectionProps {
  currentTheme: ThemeVariant;
  onThemeChange: (theme: ThemeVariant) => void;
  onRegisterClick: () => void;
}

export default function HeroSection({ currentTheme, onThemeChange, onRegisterClick }: HeroSectionProps) {
  const themes: { id: ThemeVariant; label: string; color: string }[] = [
    { id: "espresso", label: "Chocolate", color: "#1C120E" },
    { id: "parchment", label: "Espresso", color: "#251B16" },
    { id: "ivory", label: "Ivory", color: "#F5F4F2" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center pt-8 pb-4 px-4 relative"
    >
      {/* Product Tag Verification Stamp */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-accent font-semibold tracking-wider uppercase border border-brand-strong bg-brand-card/70 backdrop-blur-md text-brand-muted mb-6 shadow-xs">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
        <span>{brandConfig.physicalTagBadge}</span>
      </div>

      {/* Official Custom BELHIDE Wordmark Logo Image */}
      <div className="mb-4 space-y-2">
        <img
          src="/logo.png"
          alt="BELHIDE Official Logo"
          className="h-14 sm:h-18 w-auto mx-auto object-contain rounded-xl shadow-xs"
        />
        <h1 className="sr-only">BELHIDE</h1>
        <div className="h-0.5 w-16 mx-auto bg-brand-accent rounded-full opacity-80" />
      </div>

      {/* Headline & Subheading */}
      <h2 className="font-subheading text-2xl sm:text-3xl font-bold text-brand-primary tracking-tight mt-3">
        {heroConfig.headline}
      </h2>

      <p className="font-body text-xs sm:text-sm text-brand-muted max-w-md mx-auto leading-relaxed mt-2 font-normal">
        {heroConfig.subheading}
      </p>

      {/* Dual CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mt-6">
        {/* Primary CTA */}
        <a
          href={heroConfig.primaryCtaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-brand-accent text-[#1C120E] font-accent font-semibold text-sm tracking-wide shadow-md hover:bg-brand-accent-hover hover:text-black transition-all duration-200 active:scale-[0.99]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{heroConfig.primaryCtaText}</span>
        </a>

        {/* Secondary CTA */}
        <button
          onClick={onRegisterClick}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-brand-card text-brand-primary font-accent font-semibold text-sm tracking-wide border border-brand-strong hover:border-brand-accent transition-all duration-200 active:scale-[0.99]"
        >
          <Sparkles className="w-4 h-4 text-brand-accent" />
          <span>{heroConfig.secondaryCtaText}</span>
        </button>
      </div>

      {/* Theme Switcher Widget */}
      <div className="mt-6 flex items-center justify-center gap-2 p-1.5 rounded-full border border-brand-subtle bg-brand-card/70 backdrop-blur-md shadow-xs">
        <Palette className="w-3.5 h-3.5 text-brand-muted ml-2 mr-1" />
        <span className="text-[11px] font-accent font-medium text-brand-muted mr-1 uppercase tracking-wider">Theme:</span>
        <div className="flex items-center gap-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              aria-label={`Switch to ${t.label} theme`}
              className={`px-2.5 py-1 rounded-full text-[11px] font-accent font-medium transition-all duration-200 flex items-center gap-1.5 ${
                currentTheme === t.id
                  ? "bg-brand-accent text-[#1C120E] shadow-xs font-semibold"
                  : "text-brand-muted hover:text-brand-primary hover:bg-brand-subtle"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/20"
                style={{ backgroundColor: t.color }}
              />
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
}

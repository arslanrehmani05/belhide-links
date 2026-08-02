"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Palette } from "lucide-react";
import { brandConfig, ThemeVariant } from "@/lib/links-config";

interface HeaderProps {
  currentTheme: ThemeVariant;
  onThemeChange: (theme: ThemeVariant) => void;
}

export default function Header({ currentTheme, onThemeChange }: HeaderProps) {
  const themes: { id: ThemeVariant; label: string; color: string }[] = [
    { id: "parchment", label: "Parchment", color: "#F5F1EA" },
    { id: "espresso", label: "Espresso", color: "#14100C" },
    { id: "ivory", label: "Ivory", color: "#FAFAFA" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center pt-8 pb-4 px-4 relative"
    >
      {/* Physical Tag Verification Stamp */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase border border-brand-strong bg-brand-card/60 backdrop-blur-sm text-brand-muted mb-5">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
        <span>{brandConfig.physicalTagBadge}</span>
      </div>

      {/* Brand Crest / Wordmark */}
      <div className="space-y-1 mb-2">
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-widest text-brand-primary uppercase">
          {brandConfig.wordmark}
        </h1>
        <div className="h-0.5 w-12 mx-auto bg-brand-accent rounded-full opacity-80" />
      </div>

      {/* Tagline & Subtagline */}
      <p className="text-base sm:text-lg font-medium text-brand-primary tracking-tight mt-1">
        {brandConfig.tagline}
      </p>
      <p className="text-xs text-brand-muted tracking-wider uppercase font-medium mt-1">
        {brandConfig.subtagline}
      </p>

      {/* Theme Switcher Widget */}
      <div className="mt-5 flex items-center justify-center gap-2 p-1.5 rounded-full border border-brand-subtle bg-brand-card/70 backdrop-blur-md shadow-xs">
        <Palette className="w-3.5 h-3.5 text-brand-muted ml-2 mr-1" />
        <span className="text-[11px] font-medium text-brand-muted mr-1 uppercase tracking-wider">Theme:</span>
        <div className="flex items-center gap-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              aria-label={`Switch to ${t.label} theme`}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                currentTheme === t.id
                  ? "bg-brand-accent text-white shadow-xs"
                  : "text-brand-muted hover:text-brand-primary hover:bg-brand-subtle"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/20"
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

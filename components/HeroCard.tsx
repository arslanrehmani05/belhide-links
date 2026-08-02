"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Shield, ShoppingBag } from "lucide-react";
import { heroAction, Market } from "@/lib/links-config";

interface HeroCardProps {
  activeMarket: Market;
}

export default function HeroCard({ activeMarket }: HeroCardProps) {
  // Append active market query parameter to storefront URL
  const destinationUrl = activeMarket.url || heroAction.url;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="w-full max-w-md mx-auto px-4 mb-5"
    >
      <a
        href={destinationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block relative overflow-hidden rounded-3xl border-2 border-brand-strong bg-brand-card p-6 shadow-hero hover:border-brand-accent transition-all duration-300 transform active:scale-[0.99]"
      >
        {/* Leather grain background accent pattern */}
        <div className="absolute inset-0 leather-texture opacity-40 pointer-events-none" />

        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-accent/15 rounded-full blur-2xl group-hover:bg-brand-accent/25 transition-all duration-500 pointer-events-none" />

        {/* Card Header & Badge */}
        <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-brand-accent text-white shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-200" />
            <span>{heroAction.badge}</span>
          </div>

          <span className="text-[11px] font-medium text-brand-muted flex items-center gap-1">
            <span>{activeMarket.flag}</span>
            <span>{activeMarket.name}</span>
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="relative z-10 mb-5">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-brand-primary group-hover:text-brand-accent transition-colors duration-200">
            {heroAction.title}
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2 leading-relaxed font-normal">
            {heroAction.subtitle}
          </p>
        </div>

        {/* Quality Highlight Metric */}
        {heroAction.highlightMetric && (
          <div className="relative z-10 flex items-center gap-2 py-2 px-3 rounded-xl bg-brand-primary/60 border border-brand-subtle mb-5">
            <Shield className="w-4 h-4 text-brand-accent shrink-0" />
            <div className="text-left">
              <span className="text-xs font-bold text-brand-primary mr-1">
                {heroAction.highlightMetric}
              </span>
              <span className="text-[11px] text-brand-muted">
                {heroAction.highlightText}
              </span>
            </div>
          </div>
        )}

        {/* Primary CTA Button */}
        <div className="relative z-10 flex items-center justify-between gap-3 w-full py-3.5 px-5 rounded-2xl bg-brand-accent text-white font-medium text-sm tracking-wide shadow-md group-hover:bg-brand-accent-hover transition-all duration-300">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>{heroAction.ctaText}</span>
          </div>

          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </a>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Sparkles, Flame, Shirt, Briefcase, Wallet, Gift, ArrowUpRight } from "lucide-react";
import { shopCategories, ShopCategory, Market } from "@/lib/links-config";

interface ShopSectionProps {
  activeMarket: Market;
}

export default function ShopSection({ activeMarket }: ShopSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "flame":
        return <Flame className="w-5 h-5" />;
      case "jacket":
        return <Shirt className="w-5 h-5" />;
      case "bag":
        return <Briefcase className="w-5 h-5" />;
      case "wallet":
        return <Wallet className="w-5 h-5" />;
      case "gift":
        return <Gift className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 mb-8 text-left">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="font-serif text-2xl font-bold text-brand-primary tracking-tight">
          Shop BELHIDE Collections
        </h3>
        <span className="text-[11px] font-medium text-brand-muted flex items-center gap-1">
          <span>{activeMarket.flag}</span>
          <span>{activeMarket.name}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {shopCategories.map((cat, idx) => (
          <motion.a
            key={cat.id}
            href={`${cat.url}?market=${activeMarket.id}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="group relative flex flex-col justify-between p-4 rounded-2xl border border-brand-subtle bg-brand-card hover:border-brand-accent transition-all duration-300 transform active:scale-[0.98] shadow-xs"
          >
            {cat.badge && (
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-brand-accent text-white shadow-xs">
                {cat.badge}
              </span>
            )}

            <div>
              <div className="w-9 h-9 rounded-xl bg-brand-primary border border-brand-subtle flex items-center justify-center text-brand-accent mb-3 group-hover:scale-105 transition-transform duration-200">
                {getIcon(cat.icon)}
              </div>

              <h4 className="font-semibold text-sm text-brand-primary leading-tight group-hover:text-brand-accent transition-colors">
                {cat.title}
              </h4>
              <p className="text-[11px] text-brand-muted mt-1 leading-snug font-normal">
                {cat.subtitle}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between text-brand-muted group-hover:text-brand-primary pt-2 border-t border-brand-subtle/50">
              <span className="text-[10px] font-medium tracking-wide uppercase">
                Explore
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-brand-accent" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

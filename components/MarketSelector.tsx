"use client";

import { motion } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { Market, markets } from "@/lib/links-config";
import { useState } from "react";

interface MarketSelectorProps {
  activeMarket: Market;
  onSelectMarket: (market: Market) => void;
}

export default function MarketSelector({ activeMarket, onSelectMarket }: MarketSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-md mx-auto px-4 mb-4"
    >
      <div className="rounded-2xl border border-brand-subtle bg-brand-card p-3 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-primary flex items-center justify-center border border-brand-subtle text-brand-accent">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-wider text-brand-muted uppercase block">
                Storefront Region
              </span>
              <span className="text-xs font-semibold text-brand-primary flex items-center gap-1.5">
                <span>{activeMarket.flag}</span>
                <span>{activeMarket.name}</span>
                <span className="text-[10px] font-normal text-brand-muted">({activeMarket.currency})</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-brand-primary hover:bg-brand-strong/10 border border-brand-subtle transition-all text-brand-primary"
          >
            <span>Change</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Dropdown Options Grid */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-brand-subtle grid grid-cols-2 gap-2"
          >
            {markets.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  onSelectMarket(m);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all border ${
                  activeMarket.id === m.id
                    ? "bg-brand-accent text-white border-brand-accent font-semibold shadow-xs"
                    : "bg-brand-primary hover:bg-brand-card text-brand-primary border-brand-subtle"
                }`}
              >
                <span className="text-base">{m.flag}</span>
                <div className="overflow-hidden">
                  <p className="truncate leading-tight">{m.name}</p>
                  <p className={`text-[10px] ${activeMarket.id === m.id ? "text-white/80" : "text-brand-muted"}`}>
                    {m.currency}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

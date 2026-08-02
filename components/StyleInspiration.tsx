"use client";

import { motion } from "framer-motion";
import { Instagram, Camera, Sparkles, BookOpen, Layers, ArrowUpRight } from "lucide-react";
import { styleLinks, StyleLink } from "@/lib/links-config";

export default function StyleInspiration() {
  const getIcon = (platform: StyleLink["platform"]) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "pinterest":
        return <Camera className="w-4 h-4" />;
      case "editorial":
        return <Sparkles className="w-4 h-4" />;
      case "lookbook":
        return <BookOpen className="w-4 h-4" />;
      case "outfit":
        return <Layers className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 mb-8 text-left">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="font-serif text-2xl font-bold text-brand-primary tracking-tight">
          Style & Inspiration
        </h3>
        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-accent">
          Visual Lookbooks
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {styleLinks.map((item, idx) => {
          const isFull = idx === 0;

          return (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className={`group relative flex flex-col justify-between p-4 rounded-2xl border border-brand-subtle bg-brand-card hover:border-brand-accent transition-all duration-300 transform active:scale-[0.98] shadow-xs ${
                isFull ? "col-span-2" : "col-span-1"
              }`}
            >
              {item.badge && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-brand-primary text-brand-accent border border-brand-subtle">
                  {item.badge}
                </span>
              )}

              <div>
                <div className="w-8 h-8 rounded-xl bg-brand-primary border border-brand-subtle flex items-center justify-center text-brand-accent mb-2 group-hover:scale-105 transition-transform duration-200">
                  {getIcon(item.platform)}
                </div>

                <h4 className="font-semibold text-xs sm:text-sm text-brand-primary group-hover:text-brand-accent transition-colors leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-brand-muted mt-1 leading-snug font-normal">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between text-brand-muted group-hover:text-brand-primary pt-2 border-t border-brand-subtle/50">
                <span className="text-[10px] font-medium tracking-wide uppercase">
                  View Board
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-brand-accent" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

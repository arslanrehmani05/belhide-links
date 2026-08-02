"use client";

import { motion } from "framer-motion";
import { 
  Instagram, 
  BookOpen, 
  Ruler, 
  MessageCircle, 
  Scissors, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  Heart,
  ShoppingBag,
  ArrowUpRight
} from "lucide-react";
import { secondaryLinks, SecondaryLink, IconType } from "@/lib/links-config";

interface BentoGridProps {
  onOpenCareGuide: () => void;
  onOpenSizeGuide: () => void;
}

export default function BentoGrid({ onOpenCareGuide, onOpenSizeGuide }: BentoGridProps) {
  // Icon mapper helper
  const getIcon = (iconType: IconType) => {
    switch (iconType) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "book":
        return <BookOpen className="w-5 h-5" />;
      case "ruler":
        return <Ruler className="w-5 h-5" />;
      case "message":
        return <MessageCircle className="w-5 h-5" />;
      case "scissors":
        return <Scissors className="w-5 h-5" />;
      case "shield":
        return <ShieldCheck className="w-5 h-5" />;
      case "globe":
        return <Globe className="w-5 h-5" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "heart":
        return <Heart className="w-5 h-5" />;
      case "shopping-bag":
        return <ShoppingBag className="w-5 h-5" />;
      default:
        return <ArrowUpRight className="w-5 h-5" />;
    }
  };

  const handleCardClick = (item: SecondaryLink, e: React.MouseEvent) => {
    if (item.isModal) {
      e.preventDefault();
      if (item.modalType === "care-guide") {
        onOpenCareGuide();
      } else if (item.modalType === "size-guide") {
        onOpenSizeGuide();
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md mx-auto px-4 mb-8"
    >
      <div className="grid grid-cols-2 gap-3">
        {secondaryLinks.map((item, index) => {
          const isFullWidth = item.cardSize === "full";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
              className={isFullWidth ? "col-span-2" : "col-span-1"}
            >
              <a
                href={item.url}
                target={item.isModal ? "_self" : "_blank"}
                rel={item.isModal ? "" : "noopener noreferrer"}
                onClick={(e) => handleCardClick(item, e)}
                className={`group relative block h-full p-4 rounded-2xl border bg-brand-card transition-all duration-300 transform active:scale-[0.98] ${
                  item.accentBorder
                    ? "border-brand-strong hover:border-brand-accent shadow-xs"
                    : "border-brand-subtle hover:border-brand-accent/60 shadow-xs"
                }`}
              >
                {/* Badge if present */}
                {item.badge && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-brand-primary text-brand-accent border border-brand-subtle">
                    {item.badge}
                  </div>
                )}

                {/* Icon & Title */}
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-brand-accent border border-brand-subtle mb-3 group-hover:scale-105 transition-transform duration-200">
                      {getIcon(item.icon)}
                    </div>

                    <h3 className="font-semibold text-sm text-brand-primary leading-tight group-hover:text-brand-accent transition-colors">
                      {item.label}
                    </h3>

                    {item.subtitle && (
                      <p className="text-[11px] text-brand-muted mt-1 leading-snug font-normal">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Card Footer Action Indicator */}
                  <div className="mt-3 flex items-center justify-between text-brand-muted group-hover:text-brand-primary pt-2 border-t border-brand-subtle/50">
                    <span className="text-[10px] font-medium tracking-wide uppercase">
                      {item.isModal ? "Read Guide" : item.handle || "Open"}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-brand-accent" />
                  </div>
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

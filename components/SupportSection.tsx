"use client";

import { motion } from "framer-motion";
import { MessageCircle, Truck, RotateCcw, HelpCircle, ArrowUpRight } from "lucide-react";
import { supportLinks, SupportLink } from "@/lib/links-config";

export default function SupportSection() {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "message":
        return <MessageCircle className="w-4 h-4" />;
      case "truck":
        return <Truck className="w-4 h-4" />;
      case "rotate-ccw":
        return <RotateCcw className="w-4 h-4" />;
      case "help-circle":
        return <HelpCircle className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 mb-8 text-left">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="font-serif text-2xl font-bold text-brand-primary tracking-tight">
          Customer Support
        </h3>
        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-accent">
          Help Desk
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {supportLinks.map((item, idx) => (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="group flex flex-col justify-between p-3.5 rounded-2xl border border-brand-subtle bg-brand-card hover:border-brand-accent transition-all duration-300 transform active:scale-[0.98] shadow-xs"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-brand-primary border border-brand-subtle flex items-center justify-center text-brand-accent mb-2 group-hover:scale-105 transition-transform duration-200">
                {getIcon(item.icon)}
              </div>

              <h4 className="font-semibold text-xs text-brand-primary group-hover:text-brand-accent transition-colors leading-tight">
                {item.title}
              </h4>
              <p className="text-[10px] text-brand-muted mt-1 leading-snug font-normal">
                {item.subtitle}
              </p>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-brand-muted group-hover:text-brand-primary pt-2 border-t border-brand-subtle/50">
              <span className="text-[9px] font-medium tracking-wide uppercase">
                Access
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-brand-accent" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

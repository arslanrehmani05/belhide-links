"use client";

import { motion } from "framer-motion";
import { QrCode, Lock, Globe } from "lucide-react";
import { brandConfig } from "@/lib/links-config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-md mx-auto px-4 pb-12 pt-6 text-center space-y-4 border-t border-brand-subtle/60 mt-4"
    >
      <div className="flex items-center justify-center gap-2 text-[11px] text-brand-muted font-medium">
        <QrCode className="w-3.5 h-3.5 text-brand-accent" />
        <span>links.belhide.com</span>
        <span>•</span>
        <Lock className="w-3 h-3 text-brand-muted" />
        <span>Production QR Infrastructure</span>
      </div>

      {/* Footer Navigation Links */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-brand-primary font-medium">
        <a
          href={brandConfig.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-accent transition-colors flex items-center gap-1"
        >
          <Globe className="w-3.5 h-3.5 text-brand-accent" />
          <span>BELHIDE Website</span>
        </a>
        <span>•</span>
        <a href="https://belhide.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
          Privacy Policy
        </a>
        <span>•</span>
        <a href="https://belhide.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
          Terms & Conditions
        </a>
        <span>•</span>
        <a href="https://belhide.com/cookies" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
          Cookie Policy
        </a>
      </div>

      <p className="text-xs text-brand-muted font-normal tracking-wide">
        © {currentYear} {brandConfig.name}. All rights reserved. Handcrafted Leather Goods.
      </p>
    </motion.footer>
  );
}

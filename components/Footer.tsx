"use client";

import { motion } from "framer-motion";
import { QrCode, Lock } from "lucide-react";
import { brandConfig } from "@/lib/links-config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-md mx-auto px-4 pb-10 pt-4 text-center space-y-3"
    >
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-muted font-medium">
        <QrCode className="w-3.5 h-3.5 text-brand-accent" />
        <span>links.belhide.com</span>
        <span>•</span>
        <Lock className="w-3 h-3 text-brand-muted" />
        <span>Production QR Infrastructure</span>
      </div>

      <p className="text-xs text-brand-muted font-normal tracking-wide">
        © {currentYear} {brandConfig.name}. All rights reserved. Handcrafted Leather Goods.
      </p>
    </motion.footer>
  );
}

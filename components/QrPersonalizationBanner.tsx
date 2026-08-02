"use client";

import { motion } from "framer-motion";
import { QrCode, ShieldCheck, Sparkles } from "lucide-react";
import { QrParams } from "@/lib/use-qr-params";

interface QrPersonalizationBannerProps {
  params: QrParams;
}

export default function QrPersonalizationBanner({ params }: QrPersonalizationBannerProps) {
  if (!params.hasParams) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto px-4 mb-4"
    >
      <div className="p-3.5 rounded-2xl bg-brand-accent/10 border border-brand-strong backdrop-blur-md shadow-xs">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-accent text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <QrCode className="w-4 h-4" />
          </div>

          <div className="text-left space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-brand-accent">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authentic Product Tag Scanned</span>
            </div>

            <p className="text-xs font-semibold text-brand-primary leading-tight">
              {params.product ? `Registered Piece: ${params.product}` : "Official Belhide Product QR"}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-brand-muted">
              {params.color && (
                <span className="px-2 py-0.5 rounded-md bg-brand-card border border-brand-subtle font-medium text-brand-primary">
                  Color: {params.color}
                </span>
              )}
              {params.size && (
                <span className="px-2 py-0.5 rounded-md bg-brand-card border border-brand-subtle font-medium text-brand-primary">
                  Size: {params.size}
                </span>
              )}
              {params.season && (
                <span className="px-2 py-0.5 rounded-md bg-brand-card border border-brand-subtle font-medium text-brand-primary">
                  Season: {params.season}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler, Info } from "lucide-react";
import { sizeGuideData } from "@/lib/links-config";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-brand-card border border-brand-strong p-6 shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-brand-subtle">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-primary border border-brand-subtle flex items-center justify-center text-brand-accent">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-primary">
                    {sizeGuideData.title}
                  </h3>
                  <p className="text-xs text-brand-muted">
                    {sizeGuideData.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-brand-primary hover:bg-brand-subtle flex items-center justify-center text-brand-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="mt-4 space-y-4 text-left">
              <div className="flex items-start gap-2 p-3 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary">
                <Info className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <span>{sizeGuideData.measurementTip}</span>
              </div>

              {/* Sizing Table */}
              <div className="overflow-x-auto rounded-2xl border border-brand-subtle">
                <table className="w-full text-xs text-left">
                  <thead className="bg-brand-primary text-brand-primary font-bold uppercase tracking-wider border-b border-brand-subtle text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3">Chest</th>
                      <th className="py-2.5 px-3">Shoulder</th>
                      <th className="py-2.5 px-3">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-subtle/50 text-brand-primary font-medium">
                    {sizeGuideData.sizes.map((s, idx) => (
                      <tr key={idx} className="hover:bg-brand-primary/40 transition-colors">
                        <td className="py-2.5 px-3">
                          <span className="font-bold text-brand-accent">{s.size}</span>
                          <span className="block text-[10px] text-brand-muted font-normal">{s.usEu}</span>
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">{s.chest}</td>
                        <td className="py-2.5 px-3 whitespace-nowrap">{s.shoulder}</td>
                        <td className="py-2.5 px-3 whitespace-nowrap">{s.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-xl bg-brand-primary/50 border border-brand-subtle text-center text-xs text-brand-muted">
                Need help finding your exact size? Contact our concierge for custom bespoke sizing:{" "}
                <a href="mailto:belhideofficial@gmail.com" className="text-brand-accent font-semibold underline">
                  belhideofficial@gmail.com
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-3 border-t border-brand-subtle text-center">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-brand-accent text-white font-medium text-xs uppercase tracking-wider hover:bg-brand-accent-hover transition-colors shadow-sm"
              >
                Close Size Guide
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import { careGuideData } from "@/lib/links-config";

interface CareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CareGuideModal({ isOpen, onClose }: CareGuideModalProps) {
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
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-primary">
                    {careGuideData.title}
                  </h3>
                  <p className="text-xs text-brand-muted">
                    {careGuideData.subtitle}
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
            <div className="mt-4 space-y-5 text-left">
              <p className="text-xs sm:text-sm text-brand-primary leading-relaxed bg-brand-primary/50 p-3 rounded-xl border border-brand-subtle">
                {careGuideData.introduction}
              </p>

              {/* Care Steps */}
              <div className="space-y-4">
                {careGuideData.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-brand-primary border border-brand-subtle space-y-1.5"
                  >
                    <h4 className="font-semibold text-sm text-brand-primary flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                      <span>{step.title}</span>
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed pl-6">
                      {step.description}
                    </p>
                    <div className="pl-6 pt-1 flex items-start gap-1 text-[11px] text-brand-accent italic font-medium">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{step.tip}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pro Tips */}
              <div className="p-4 rounded-2xl bg-brand-accent/10 border border-brand-strong space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-accent uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Artisan Pro-Tips</span>
                </div>
                <ul className="space-y-1.5 text-xs text-brand-primary list-disc list-inside">
                  {careGuideData.proTips.map((tip, idx) => (
                    <li key={idx} className="leading-normal">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-3 border-t border-brand-subtle text-center">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-brand-accent text-white font-medium text-xs uppercase tracking-wider hover:bg-brand-accent-hover transition-colors shadow-sm"
              >
                Close Care Guide
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

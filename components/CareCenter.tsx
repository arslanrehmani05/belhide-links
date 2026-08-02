"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, X, CheckCircle2, ChevronRight, ShieldAlert, HelpCircle } from "lucide-react";
import { careArticles, CareArticle } from "@/lib/links-config";

export default function CareCenter() {
  const [selectedArticle, setSelectedArticle] = useState<CareArticle | null>(null);

  return (
    <section className="w-full max-w-md mx-auto px-4 mb-8 text-left">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-brand-accent block">
            The Leather Library
          </span>
          <h3 className="font-serif text-2xl font-bold text-brand-primary tracking-tight">
            Leather Care Center
          </h3>
        </div>
        <div className="w-8 h-8 rounded-xl bg-brand-primary border border-brand-subtle flex items-center justify-center text-brand-accent">
          <BookOpen className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-2.5">
        {careArticles.map((article, idx) => (
          <motion.button
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.03 }}
            className="group w-full p-3.5 rounded-2xl border border-brand-subtle bg-brand-card hover:border-brand-accent transition-all text-left flex items-center justify-between gap-3 shadow-xs active:scale-[0.99]"
          >
            <div className="space-y-0.5 overflow-hidden">
              <span className="text-[9px] font-bold uppercase tracking-wider text-brand-accent block">
                {article.category}
              </span>
              <h4 className="font-semibold text-xs sm:text-sm text-brand-primary truncate group-hover:text-brand-accent transition-colors">
                {article.title}
              </h4>
              <p className="text-[11px] text-brand-muted truncate font-normal">
                {article.summary}
              </p>
            </div>

            <div className="w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center shrink-0 text-brand-muted group-hover:text-brand-accent transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Article Reader Slide-Over Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-brand-card border border-brand-strong p-6 shadow-2xl z-10 text-left"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-brand-subtle">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent block">
                    {selectedArticle.category} Article
                  </span>
                  <h3 className="font-serif text-xl font-bold text-brand-primary">
                    {selectedArticle.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-brand-primary hover:bg-brand-subtle transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Article Content */}
              <div className="mt-4 space-y-4">
                <p className="text-xs text-brand-muted italic bg-brand-primary/60 p-3 rounded-xl border border-brand-subtle">
                  {selectedArticle.summary}
                </p>

                <div className="space-y-3">
                  {selectedArticle.content.map((paragraph, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-primary leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <span>{paragraph}</span>
                    </div>
                  ))}
                </div>

                {selectedArticle.proTip && (
                  <div className="p-3.5 rounded-2xl bg-brand-accent/10 border border-brand-strong flex items-start gap-2 text-xs text-brand-primary">
                    <ShieldAlert className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-brand-accent uppercase tracking-wider block text-[10px]">
                        Artisan Pro-Tip
                      </span>
                      <span>{selectedArticle.proTip}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-brand-subtle">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full py-3 rounded-2xl bg-brand-accent text-white font-medium text-xs uppercase tracking-wider hover:bg-brand-accent-hover transition-colors shadow-sm"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

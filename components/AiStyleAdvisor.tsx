"use client";

import { motion } from "framer-motion";
import { Sparkles, Camera, Bot } from "lucide-react";

export default function AiStyleAdvisor() {
  return (
    <section className="w-full max-w-md mx-auto px-4 mb-8 text-left">
      <div className="rounded-3xl border border-brand-strong bg-brand-card p-6 shadow-card relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-accent/15 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-accent/20 text-brand-accent border border-brand-strong">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Coming Soon</span>
          </div>

          <span className="text-[10px] font-semibold tracking-wider text-brand-muted uppercase">
            AI Personalization
          </span>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-primary border border-brand-subtle flex items-center justify-center text-brand-accent shrink-0">
            <Bot className="w-5 h-5" />
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold text-brand-primary tracking-tight">
              AI Personal Style Advisor
            </h3>
            <p className="text-xs text-brand-muted mt-1 leading-relaxed">
              Upload photos of yourself or existing wardrobe pieces to receive AI-powered outfit recommendations built specifically around your BELHIDE leather garments.
            </p>

            <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-brand-accent">
              <Camera className="w-3.5 h-3.5" />
              <span>Smart Fit & Color Harmonization Engine</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

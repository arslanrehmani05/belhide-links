"use client";

import { motion } from "framer-motion";
import { Gift, Sparkles, Users } from "lucide-react";

export default function ReferralTeaser() {
  return (
    <section className="w-full max-w-md mx-auto px-4 mb-8 text-left">
      <div className="rounded-3xl border border-brand-subtle bg-brand-card p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-accent font-bold tracking-wider uppercase bg-brand-accent text-[#1C120E] border border-brand-subtle">
            <Sparkles className="w-3 h-3" />
            <span>Coming Soon</span>
          </div>

          <span className="text-[10px] font-accent font-semibold tracking-wider text-brand-muted uppercase">
            Referral Rewards
          </span>
        </div>

        <div className="flex items-center gap-3 font-body">
          <div className="w-9 h-9 rounded-xl bg-brand-primary border border-brand-subtle flex items-center justify-center text-brand-accent shrink-0">
            <Users className="w-4 h-4" />
          </div>

          <div>
            <h4 className="font-heading font-serif text-lg font-bold text-brand-primary tracking-tight">
              Refer a Friend Program
            </h4>
            <p className="font-body text-xs text-brand-muted mt-0.5 leading-relaxed font-normal">
              Share your love for Belhide leather craftsmanship. Gift your inner circle $50 off their first piece and earn store credits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

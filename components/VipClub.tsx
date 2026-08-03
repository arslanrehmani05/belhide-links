"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { vipBenefits } from "@/lib/links-config";

export default function VipClub() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("United States");
  const [isJoined, setIsJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsJoined(true);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 mb-8">
      <div className="rounded-3xl border border-brand-strong bg-brand-card p-6 shadow-card relative overflow-hidden text-left">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-accent font-bold tracking-wider uppercase bg-brand-accent text-[#1C120E] shadow-xs">
            <Crown className="w-3.5 h-3.5 text-[#1C120E]" />
            <span>VIP Members Club</span>
          </div>

          <span className="text-[10px] font-accent font-semibold tracking-wider text-brand-muted uppercase">
            Exclusive Access
          </span>
        </div>

        <h3 className="font-heading font-serif text-2xl font-bold text-brand-primary tracking-tight mb-1">
          Join the BELHIDE Inner Circle
        </h3>
        <p className="font-body text-xs text-brand-muted mb-4 leading-relaxed">
          Receive priority invitations to private drops, seasonal lookbooks, and bespoke member privileges.
        </p>

        {/* Benefits Grid */}
        <div className="space-y-2 mb-5 font-body">
          {vipBenefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-brand-primary">
              <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <span className="leading-snug">{benefit}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!isJoined ? (
            <motion.form
              key="vip-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-3 pt-2 border-t border-brand-subtle font-body"
            >
              <div>
                <label className="block text-[11px] font-accent font-semibold text-brand-primary uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your preferred email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-accent font-semibold text-brand-primary uppercase tracking-wider mb-1">
                  Country *
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent transition-colors"
                >
                  <option value="United States">United States 🇺🇸</option>
                  <option value="United Kingdom">United Kingdom 🇬🇧</option>
                  <option value="Europe">Europe 🇪🇺</option>
                  <option value="Canada">Canada 🇨🇦</option>
                  <option value="Other">Other Region</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-brand-accent text-[#1C120E] font-accent font-semibold text-xs uppercase tracking-wider hover:bg-brand-accent-hover hover:text-black transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Unlock VIP Member Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="vip-success"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-4 text-center space-y-3 border-t border-brand-subtle"
            >
              <div className="w-12 h-12 rounded-full bg-brand-accent/15 text-brand-accent flex items-center justify-center mx-auto border border-brand-strong">
                <Crown className="w-6 h-6" />
              </div>

              <h4 className="font-serif text-xl font-bold text-brand-primary">
                Welcome to the Inner Circle
              </h4>
              <p className="text-xs text-brand-muted max-w-xs mx-auto leading-relaxed">
                Your VIP membership confirmation has been sent to <span className="font-semibold text-brand-primary">{email}</span>. Look out for your first private lookbook invite!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

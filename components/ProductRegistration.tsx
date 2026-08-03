"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Sparkles, CheckCircle2, QrCode, Lock, FileCheck } from "lucide-react";

export default function ProductRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "United States",
    productName: "Artisan Biker Jacket (Cognac)",
    purchaseDate: new Date().toISOString().split("T")[0],
    orderNumber: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.productName) {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="product-registration" className="w-full max-w-md mx-auto px-4 mb-8">
      <div className="rounded-3xl border-2 border-brand-strong bg-brand-card p-6 shadow-hero relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-accent/15 rounded-full blur-xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-accent font-bold tracking-wider uppercase bg-brand-accent text-[#1C120E] shadow-xs">
            <ShieldCheck className="w-3 h-3" />
            <span>Product Authentication</span>
          </div>

          <span className="text-[10px] font-accent font-semibold tracking-wider text-brand-muted uppercase">
            Official Registry
          </span>
        </div>

        <h3 className="font-heading font-serif text-2xl font-bold text-brand-primary tracking-tight mb-1 text-left">
          Register Your Belhide Piece
        </h3>
        <p className="font-body text-xs text-brand-muted text-left mb-5 leading-relaxed">
          Activate your craftsmanship warranty and secure ownership history for your handcrafted outerwear.
        </p>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="registration-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-3.5 text-left font-body"
            >
              <div>
                <label className="block text-[11px] font-accent font-semibold text-brand-primary uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-accent font-semibold text-brand-primary uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-accent font-semibold text-brand-primary uppercase tracking-wider mb-1">
                    Country *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent transition-colors"
                  >
                    <option value="United States">United States 🇺🇸</option>
                    <option value="United Kingdom">United Kingdom 🇬🇧</option>
                    <option value="Europe">Europe 🇪🇺</option>
                    <option value="Canada">Canada 🇨🇦</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="Other">Other Region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-accent font-semibold text-brand-primary uppercase tracking-wider mb-1">
                    Purchase Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-accent font-semibold text-brand-primary uppercase tracking-wider mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artisan Biker Jacket (Cognac)"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-accent font-semibold text-brand-primary uppercase tracking-wider mb-1">
                  Order Number <span className="text-brand-muted font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. #BEL-89240"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 mt-2 rounded-2xl bg-brand-accent text-[#1C120E] font-accent font-semibold text-xs uppercase tracking-wider hover:bg-brand-accent-hover hover:text-black transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Register Product Ownership</span>
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="submitted-confirmation"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-4 text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-brand-primary">
                  Product Registered Successfully!
                </h4>
                <p className="text-xs text-brand-muted max-w-xs mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-brand-primary">{formData.name}</span>. Your registration for <span className="font-semibold text-brand-primary">{formData.productName}</span> is confirmed.
                </p>
              </div>

              {/* Digital Passport Preview Badge */}
              <div className="p-3.5 rounded-2xl bg-brand-primary border border-brand-subtle text-left space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-brand-accent">
                  <span className="flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Digital Product Passport Active</span>
                  </span>
                  <span className="text-emerald-600 font-semibold">Verified</span>
                </div>
                <div className="text-[11px] text-brand-primary font-medium space-y-0.5">
                  <p>Owner: {formData.name}</p>
                  <p>Product: {formData.productName}</p>
                  <p className="text-brand-muted text-[10px]">Registry Key: BEL-PASS-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
              </div>

              {/* Future Expansion Placeholders */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-brand-primary/50 border border-brand-subtle text-left space-y-1">
                  <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider block">
                    Warranty Status
                  </span>
                  <span className="text-[11px] text-brand-primary font-semibold block">
                    Lifetime Grain Warranty
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-brand-primary/50 border border-brand-subtle text-left space-y-1">
                  <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider block">
                    Authentication
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold block flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>NFC Authenticated</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-semibold text-brand-accent hover:underline pt-2 block mx-auto"
              >
                Register Another Product
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Share, PlusSquare, Smartphone, X, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface IosInstallDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onHaptic?: (pattern: "gentle" | "double" | "success" | "leather") => void;
}

export default function IosInstallDrawer({ isOpen, onClose, onHaptic }: IosInstallDrawerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md transition-opacity">
        {/* Backdrop click to dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Drawer Sheet */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#1C120E] text-[#F5F4F2] border border-[#3D2D24] rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl overflow-hidden z-10"
        >
          {/* Subtle Ambient Gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-amber-600/10 blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => {
              if (onHaptic) onHaptic("gentle");
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#2A1D17] text-[#C4A484] hover:text-white transition-colors"
            aria-label="Close iOS install guide"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2A1D17] border border-[#4A372C] flex items-center justify-center overflow-hidden shadow-inner">
              <img src="/icon.svg" alt="Belhide Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-700/40 text-[10px] uppercase font-sans tracking-widest text-amber-300 mb-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>iOS 27 PWA Experience</span>
              </div>
              <h3 className="text-lg font-serif font-semibold tracking-wide text-white">
                Install B Links App on iPhone
              </h3>
            </div>
          </div>

          <p className="text-xs text-[#A8988C] mb-6 leading-relaxed">
            Experience B Links as a standalone iOS application. Instant offline access to leather care guides, digital warranty registration, and push notification drop alerts.
          </p>

          {/* Step-by-Step iOS Safari Instructions */}
          <div className="space-y-4 mb-6">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#251812] border border-[#38261E]">
              <div className="w-8 h-8 rounded-lg bg-[#36231A] text-amber-400 flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                1
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between font-medium text-white mb-0.5">
                  <span>Tap Safari Share Button</span>
                  <Share className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-[#8C7A6D]">
                  Tap the <strong className="text-amber-200 font-normal">Share icon</strong> at the bottom of your Safari browser bar.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#251812] border border-[#38261E]">
              <div className="w-8 h-8 rounded-lg bg-[#36231A] text-amber-400 flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                2
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between font-medium text-white mb-0.5">
                  <span>Select &quot;Add to Home Screen&quot;</span>
                  <PlusSquare className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-[#8C7A6D]">
                  Scroll down the options list and select <strong className="text-amber-200 font-normal">Add to Home Screen</strong>.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#251812] border border-[#38261E]">
              <div className="w-8 h-8 rounded-lg bg-[#36231A] text-amber-400 flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                3
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between font-medium text-white mb-0.5">
                  <span>Confirm Installation</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-[#8C7A6D]">
                  Tap <strong className="text-emerald-300 font-normal">Add</strong> in the top-right corner to launch B Links from your home screen.
                </p>
              </div>
            </div>
          </div>

          {/* iOS Device Frame Preview */}
          <div className="relative p-4 rounded-xl bg-gradient-to-r from-[#201510] to-[#2B1B14] border border-[#3D2C22] text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#1C120E] border border-[#4A372C] flex items-center justify-center shadow-lg">
                <img src="/icon.svg" alt="App Icon" className="w-7 h-7" />
              </div>
              <div className="text-left">
                <div className="text-xs font-serif font-semibold text-white">B Links</div>
                <div className="text-[10px] text-[#A8988C]">Handcrafted Leather Goods</div>
              </div>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] text-amber-300/90">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Standalone iOS App Capabilities</span>
            </div>
          </div>

          {/* Got it button */}
          <button
            onClick={() => {
              if (onHaptic) onHaptic("success");
              onClose();
            }}
            className="w-full mt-5 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-serif font-semibold text-sm tracking-wide shadow-lg shadow-amber-950/40 transition-all active:scale-[0.98]"
          >
            I Understand — Ready to Add
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

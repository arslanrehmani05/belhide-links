"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Smartphone, X, Sparkles, ChevronRight } from "lucide-react";
import IosInstallDrawer from "./IosInstallDrawer";

interface InstallBannerProps {
  isIOS: boolean;
  canInstall: boolean;
  isStandalone: boolean;
  onInstall: () => Promise<boolean | void>;
  onHaptic: (pattern: "gentle" | "double" | "success" | "leather") => void;
  onOpenControlCenter?: () => void;
}

export default function InstallBanner({
  isIOS,
  canInstall,
  isStandalone,
  onInstall,
  onHaptic,
  onOpenControlCenter,
}: InstallBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showIosDrawer, setShowIosDrawer] = useState(false);

  // If already running in PWA standalone mode or dismissed, don't show floating banner
  if (isStandalone || isDismissed) {
    return (
      <IosInstallDrawer
        isOpen={showIosDrawer}
        onClose={() => setShowIosDrawer(false)}
        onHaptic={onHaptic}
      />
    );
  }

  const handleInstallClick = async () => {
    onHaptic("double");
    if (isIOS) {
      setShowIosDrawer(true);
    } else if (canInstall) {
      await onInstall();
    } else {
      setShowIosDrawer(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto z-40"
        >
          <div className="relative p-3.5 sm:p-4 rounded-2xl bg-[#1C120E]/95 backdrop-blur-xl border border-[#3D2D24] text-[#F5F4F2] shadow-2xl overflow-hidden flex items-center justify-between gap-3">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20" />

            {/* Left App Icon & Info */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#2A1D17] border border-[#4A372C] flex items-center justify-center overflow-hidden shadow-inner">
                <img src="/icon.svg" alt="B Links Icon" className="w-6 h-6 object-contain" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-serif font-semibold tracking-wide text-white">B Links</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-amber-900/60 border border-amber-700/40 text-amber-300 rounded-full font-sans uppercase">
                    PWA
                  </span>
                </div>
                <p className="text-[11px] text-[#A8988C] line-clamp-1">
                  Offline care guides, warranty &amp; VIP alerts
                </p>
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstallClick}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-serif font-medium text-xs tracking-wide shadow-md flex items-center gap-1.5 transition-transform active:scale-95"
              >
                {isIOS ? <Smartphone className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                <span>Install</span>
              </button>

              <button
                onClick={() => {
                  onHaptic("gentle");
                  setIsDismissed(true);
                }}
                className="p-1.5 rounded-lg text-[#8C7A6D] hover:text-white hover:bg-[#2A1D17] transition-colors"
                aria-label="Dismiss PWA Banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <IosInstallDrawer
        isOpen={showIosDrawer}
        onClose={() => setShowIosDrawer(false)}
        onHaptic={onHaptic}
      />
    </>
  );
}

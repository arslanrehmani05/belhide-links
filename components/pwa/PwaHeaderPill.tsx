"use client";

import { Wifi, WifiOff, Smartphone, ShieldCheck, Sparkles } from "lucide-react";

interface PwaHeaderPillProps {
  isOnline: boolean;
  isStandalone: boolean;
  isIOS: boolean;
  offlineQueueCount: number;
  onClick: () => void;
  onHaptic: (pattern: "gentle" | "double" | "success" | "leather") => void;
}

export default function PwaHeaderPill({
  isOnline,
  isStandalone,
  isIOS,
  offlineQueueCount,
  onClick,
  onHaptic,
}: PwaHeaderPillProps) {
  const handleClick = () => {
    onHaptic("gentle");
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium transition-all duration-300 border shadow-sm ${
        !isOnline
          ? "bg-rose-950/80 text-rose-200 border-rose-800/60 animate-pulse"
          : isStandalone
          ? "bg-emerald-950/70 text-emerald-300 border-emerald-800/50 hover:bg-emerald-900/80"
          : "bg-[#251812]/90 text-amber-200 border-[#4A372C] hover:bg-[#322119] hover:border-amber-600/50"
      }`}
      title="PWA Status & Diagnostics Center"
    >
      {!isOnline ? (
        <>
          <WifiOff className="w-3.5 h-3.5 text-rose-400" />
          <span>Offline Mode</span>
          {offlineQueueCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
              {offlineQueueCount}
            </span>
          )}
        </>
      ) : isStandalone ? (
        <>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>App Active</span>
        </>
      ) : (
        <>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>PWA Suite</span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </>
      )}
    </button>
  );
}

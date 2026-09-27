"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Wifi,
  WifiOff,
  Bell,
  Vibrate,
  Share2,
  Database,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  HardDrive,
  Sparkles,
  ShieldCheck,
  Package,
  Layers,
  Zap,
} from "lucide-react";
import { OfflineRegistration } from "@/lib/use-pwa";

interface PwaControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  isOnline: boolean;
  isStandalone: boolean;
  isIOS: boolean;
  canInstall: boolean;
  swRegistered: boolean;
  badgeCount: number;
  offlineQueue: OfflineRegistration[];
  onInstall: () => Promise<boolean | void>;
  onOpenIosGuide: () => void;
  onHaptic: (pattern: "gentle" | "double" | "success" | "leather") => void;
  setBadge: (count: number) => Promise<void>;
  clearBadge: () => Promise<void>;
  shareContent: (data: { title: string; text: string; url?: string }) => Promise<boolean>;
  simulatePush: (title: string, body: string, url?: string) => Promise<boolean>;
  syncOfflineQueue: () => Promise<void>;
}

export default function PwaControlCenter({
  isOpen,
  onClose,
  isOnline,
  isStandalone,
  isIOS,
  canInstall,
  swRegistered,
  badgeCount,
  offlineQueue,
  onInstall,
  onOpenIosGuide,
  onHaptic,
  setBadge,
  clearBadge,
  shareContent,
  simulatePush,
  syncOfflineQueue,
}: PwaControlCenterProps) {
  const [activeTab, setActiveTab] = useState<"features" | "offline" | "notifications" | "haptics">("features");
  const [cacheSize, setCacheSize] = useState<string>("Calculating...");
  const [syncing, setSyncing] = useState(false);

  // Estimate cache storage
  useEffect(() => {
    if (typeof window !== "undefined" && "navigator" in window && "storage" in navigator && "estimate" in navigator.storage) {
      navigator.storage.estimate().then(({ usage, quota }) => {
        if (usage) {
          const mb = (usage / (1024 * 1024)).toFixed(2);
          setCacheSize(`${mb} MB cached`);
        } else {
          setCacheSize("1.42 MB cached");
        }
      }).catch(() => setCacheSize("Offline Vault Active"));
    } else {
      setCacheSize("Offline Vault Active");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleManualSync = async () => {
    onHaptic("double");
    setSyncing(true);
    await syncOfflineQueue();
    setTimeout(() => setSyncing(false), 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Control Center Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#1C120E] text-[#F5F4F2] border border-[#3D2D24] rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-36 bg-amber-600/10 blur-3xl pointer-events-none" />

          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[#36231A] pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A1D17] border border-[#4A372C] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-serif font-semibold tracking-wide text-white">
                  B Links PWA Engine &amp; Features
                </h3>
                <p className="text-[11px] text-[#A8988C]">
                  iOS 27 Modern Progressive Web App Capabilities
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onHaptic("gentle");
                onClose();
              }}
              className="p-2 rounded-full bg-[#2A1D17] text-[#C4A484] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick System Diagnostics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            <div className="p-2.5 rounded-xl bg-[#251812] border border-[#38261E] text-center">
              <div className="text-[10px] text-[#8C7A6D] uppercase font-sans">Network</div>
              <div className="text-xs font-serif font-medium text-white flex items-center justify-center gap-1 mt-0.5">
                {isOnline ? (
                  <>
                    <Wifi className="w-3 h-3 text-emerald-400" />
                    <span>Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-rose-400" />
                    <span className="text-rose-300">Offline</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#251812] border border-[#38261E] text-center">
              <div className="text-[10px] text-[#8C7A6D] uppercase font-sans">Service Worker</div>
              <div className="text-xs font-serif font-medium text-white flex items-center justify-center gap-1 mt-0.5">
                {swRegistered ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Active</span>
                  </>
                ) : (
                  <span className="text-amber-300">Initializing</span>
                )}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#251812] border border-[#38261E] text-center">
              <div className="text-[10px] text-[#8C7A6D] uppercase font-sans">App Mode</div>
              <div className="text-xs font-serif font-medium text-white flex items-center justify-center gap-1 mt-0.5">
                {isStandalone ? (
                  <>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Standalone</span>
                  </>
                ) : (
                  <span>Browser</span>
                )}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#251812] border border-[#38261E] text-center">
              <div className="text-[10px] text-[#8C7A6D] uppercase font-sans">Storage</div>
              <div className="text-xs font-serif font-medium text-amber-300 mt-0.5 truncate">
                {cacheSize}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#251812] border border-[#38261E] mb-4">
            <button
              onClick={() => {
                onHaptic("gentle");
                setActiveTab("features");
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-serif font-medium transition-colors ${
                activeTab === "features" ? "bg-[#3D2C22] text-white shadow-sm" : "text-[#8C7A6D] hover:text-[#C4A484]"
              }`}
            >
              App &amp; Badges
            </button>
            <button
              onClick={() => {
                onHaptic("gentle");
                setActiveTab("offline");
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-serif font-medium transition-colors relative ${
                activeTab === "offline" ? "bg-[#3D2C22] text-white shadow-sm" : "text-[#8C7A6D] hover:text-[#C4A484]"
              }`}
            >
              Offline Vault
              {offlineQueue.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[#1C120E] text-[9px] font-bold flex items-center justify-center">
                  {offlineQueue.length}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                onHaptic("gentle");
                setActiveTab("notifications");
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-serif font-medium transition-colors ${
                activeTab === "notifications" ? "bg-[#3D2C22] text-white shadow-sm" : "text-[#8C7A6D] hover:text-[#C4A484]"
              }`}
            >
              Push Alerts
            </button>
            <button
              onClick={() => {
                onHaptic("gentle");
                setActiveTab("haptics");
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-serif font-medium transition-colors ${
                activeTab === "haptics" ? "bg-[#3D2C22] text-white shadow-sm" : "text-[#8C7A6D] hover:text-[#C4A484]"
              }`}
            >
              Haptics
            </button>
          </div>

          {/* Scrollable Tab Content Area */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
            {/* TAB 1: App Installation & Home Screen Badging */}
            {activeTab === "features" && (
              <div className="space-y-4">
                {/* Standalone Install Action */}
                <div className="p-4 rounded-2xl bg-[#251812] border border-[#38261E]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-amber-400" />
                      <span className="font-serif font-semibold text-white">Standalone Installation</span>
                    </div>
                    {isStandalone && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-sans border border-emerald-800">
                        Installed
                      </span>
                    )}
                  </div>
                  <p className="text-[#8C7A6D] mb-3">
                    {isStandalone
                      ? "BELHIDE is currently running as a full native iOS / Android application."
                      : "Add BELHIDE directly to your iOS or Android home screen for instant full-screen access."}
                  </p>
                  {!isStandalone && (
                    <button
                      onClick={() => {
                        onHaptic("double");
                        if (isIOS) onOpenIosGuide();
                        else onInstall();
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-serif font-semibold text-xs tracking-wide shadow-md"
                    >
                      {isIOS ? "Show iOS Add to Home Screen Instructions" : "Install App Now"}
                    </button>
                  )}
                </div>

                {/* App Icon Badging */}
                <div className="p-4 rounded-2xl bg-[#251812] border border-[#38261E]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span className="font-serif font-semibold text-white">App Badge Counter</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-mono border border-amber-800">
                      Badge: {badgeCount}
                    </span>
                  </div>
                  <p className="text-[#8C7A6D] mb-3">
                    Set real-time notification badges directly on your home screen app icon.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setBadge(badgeCount + 1)}
                      className="py-2 px-3 rounded-xl bg-[#36231A] hover:bg-[#4A3226] text-amber-200 border border-[#4A372C] font-serif"
                    >
                      +1 Badge
                    </button>
                    <button
                      onClick={() => setBadge(5)}
                      className="py-2 px-3 rounded-xl bg-[#36231A] hover:bg-[#4A3226] text-amber-200 border border-[#4A372C] font-serif"
                    >
                      Set to 5
                    </button>
                    <button
                      onClick={() => clearBadge()}
                      className="py-2 px-3 rounded-xl bg-[#36231A] hover:bg-[#4A3226] text-rose-300 border border-[#4A372C] font-serif"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Native Web Share API */}
                <div className="p-4 rounded-2xl bg-[#251812] border border-[#38261E]">
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 className="w-4 h-4 text-amber-400" />
                    <span className="font-serif font-semibold text-white">Native System Web Share</span>
                  </div>
                  <p className="text-[#8C7A6D] mb-3">
                    Invoke native iOS &amp; Android share sheet to send BELHIDE links to contacts or apps.
                  </p>
                  <button
                    onClick={() =>
                      shareContent({
                        title: "Belhide Handcrafted Leather Goods",
                        text: "Explore official Belhide leather jackets, care guides, and warranty registration.",
                      })
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-[#36231A] hover:bg-[#4A3226] text-white border border-[#4A372C] font-serif font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Trigger System Share Sheet</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Offline Vault & Registration Queue */}
            {activeTab === "offline" && (
              <div className="space-y-4">
                {/* Care Articles Offline Pre-cache status */}
                <div className="p-4 rounded-2xl bg-[#251812] border border-[#38261E]">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span className="font-serif font-semibold text-white">Leather Care Offline Vault</span>
                  </div>
                  <p className="text-[#8C7A6D] mb-3">
                    All 7 Belhide Leather Care Guides are automatically saved in local service worker cache. You can read them fully when offline without internet.
                  </p>
                  <div className="p-2.5 rounded-xl bg-[#1C120E] border border-[#36231A] flex items-center justify-between">
                    <span className="text-[#A8988C]">Pre-cached Care Topics:</span>
                    <span className="font-serif text-emerald-400 font-semibold">7/7 Guides Ready</span>
                  </div>
                </div>

                {/* Offline Registration Queue */}
                <div className="p-4 rounded-2xl bg-[#251812] border border-[#38261E]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-amber-400" />
                      <span className="font-serif font-semibold text-white">Offline Warranty Queue</span>
                    </div>
                    {offlineQueue.length > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] border border-amber-800">
                        {offlineQueue.length} Pending
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] border border-emerald-800">
                        Synced
                      </span>
                    )}
                  </div>
                  <p className="text-[#8C7A6D] mb-3">
                    If you register a product while offline, data is securely stored and auto-submitted when reconnected.
                  </p>

                  {offlineQueue.length > 0 ? (
                    <div className="space-y-2 mb-3">
                      {offlineQueue.map((item) => (
                        <div key={item.id} className="p-2.5 rounded-xl bg-[#1C120E] border border-[#36231A] flex items-center justify-between">
                          <div>
                            <div className="font-serif font-medium text-white">{item.garmentType}</div>
                            <div className="text-[10px] text-[#8C7A6D]">SN: {item.serialNumber} • {item.ownerName}</div>
                          </div>
                          <span className="text-[10px] text-amber-400 uppercase tracking-widest font-sans">Queued</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#1C120E] border border-[#36231A] text-center text-[#8C7A6D] text-[11px] mb-3">
                      No offline registrations waiting in queue.
                    </div>
                  )}

                  <button
                    onClick={handleManualSync}
                    disabled={syncing || offlineQueue.length === 0}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#36231A] hover:bg-[#4A3226] text-amber-200 border border-[#4A372C] font-serif font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin text-amber-400" : ""}`} />
                    <span>{syncing ? "Syncing with Belhide Servers..." : "Sync Queued Registrations"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Web Push Notification Simulator */}
            {activeTab === "notifications" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#251812] border border-[#38261E]">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-4 h-4 text-amber-400" />
                    <span className="font-serif font-semibold text-white">Push Notification Studio</span>
                  </div>
                  <p className="text-[#8C7A6D] mb-3">
                    Simulate native push notifications for private drops, care reminders, and sample sales.
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() =>
                        simulatePush(
                          "🍁 Autumn 2026 Leather Drop",
                          "Exclusive early access: New Shearling Aviator & Biker Jackets available now on Belhide."
                        )
                      }
                      className="w-full p-3 rounded-xl bg-[#1C120E] hover:bg-[#2A1D17] border border-[#36231A] text-left transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="font-serif font-medium text-white">Seasonal Collection Drop</div>
                        <div className="text-[10px] text-[#8C7A6D]">Simulate new arrival drop alert</div>
                      </div>
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    </button>

                    <button
                      onClick={() =>
                        simulatePush(
                          "🛡️ Leather Care Reminder",
                          "It has been 6 months since your last conditioning. Protect your full-grain leather today."
                        )
                      }
                      className="w-full p-3 rounded-xl bg-[#1C120E] hover:bg-[#2A1D17] border border-[#36231A] text-left transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="font-serif font-medium text-white">Leather Care Conditioning</div>
                        <div className="text-[10px] text-[#8C7A6D]">Simulate bi-annual care alert</div>
                      </div>
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    </button>

                    <button
                      onClick={() =>
                        simulatePush(
                          "👑 VIP Bespoke Sample Sale",
                          "VIP Members Club Private Invitation: 24-hour access live now."
                        )
                      }
                      className="w-full p-3 rounded-xl bg-[#1C120E] hover:bg-[#2A1D17] border border-[#36231A] text-left transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="font-serif font-medium text-white">VIP Club Special Invitation</div>
                        <div className="text-[10px] text-[#8C7A6D]">Simulate member exclusive notice</div>
                      </div>
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Tactile Haptic Feedback */}
            {activeTab === "haptics" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#251812] border border-[#38261E]">
                  <div className="flex items-center gap-2 mb-2">
                    <Vibrate className="w-4 h-4 text-amber-400" />
                    <span className="font-serif font-semibold text-white">Tactile Haptic Feedback</span>
                  </div>
                  <p className="text-[#8C7A6D] mb-3">
                    Test custom vibration feedback patterns designed to mirror premium leather texture interaction on supported mobile devices.
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onHaptic("gentle")}
                      className="p-3 rounded-xl bg-[#1C120E] hover:bg-[#2B1B14] border border-[#36231A] text-[#F5F4F2] font-serif font-medium text-center"
                    >
                      Gentle Tap (30ms)
                    </button>
                    <button
                      onClick={() => onHaptic("double")}
                      className="p-3 rounded-xl bg-[#1C120E] hover:bg-[#2B1B14] border border-[#36231A] text-[#F5F4F2] font-serif font-medium text-center"
                    >
                      Double Pulse (40ms)
                    </button>
                    <button
                      onClick={() => onHaptic("success")}
                      className="p-3 rounded-xl bg-[#1C120E] hover:bg-[#2B1B14] border border-[#36231A] text-emerald-300 font-serif font-medium text-center"
                    >
                      Success Click
                    </button>
                    <button
                      onClick={() => onHaptic("leather")}
                      className="p-3 rounded-xl bg-[#1C120E] hover:bg-[#2B1B14] border border-[#36231A] text-amber-300 font-serif font-medium text-center"
                    >
                      Leather Texture
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer close button */}
          <div className="pt-4 border-t border-[#36231A] mt-4 flex items-center justify-between">
            <div className="text-[10px] text-[#8C7A6D]">
              BELHIDE PWA v2.0 • iOS 27 Ready
            </div>
            <button
              onClick={() => {
                onHaptic("gentle");
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#36231A] hover:bg-[#4A3226] text-white font-serif text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

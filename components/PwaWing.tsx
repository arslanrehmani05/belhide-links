"use client";

import { useState, createContext, useContext } from "react";
import { usePwa, PwaState, OfflineRegistration } from "@/lib/use-pwa";
import PwaHeaderPill from "@/components/pwa/PwaHeaderPill";
import InstallBanner from "@/components/pwa/InstallBanner";
import IosInstallDrawer from "@/components/pwa/IosInstallDrawer";
import PwaControlCenter from "@/components/pwa/PwaControlCenter";

interface PwaContextType extends PwaState {
  promptInstall: () => Promise<boolean | void>;
  triggerHaptic: (pattern?: "gentle" | "double" | "success" | "leather") => void;
  setBadge: (count: number) => Promise<void>;
  clearBadge: () => Promise<void>;
  shareContent: (data: { title: string; text: string; url?: string }) => Promise<boolean>;
  simulatePushNotification: (title: string, body: string, url?: string) => Promise<boolean>;
  queueOfflineRegistration: (data: Omit<OfflineRegistration, "id" | "timestamp">) => boolean;
  syncOfflineQueue: () => Promise<void>;
  openControlCenter: () => void;
  openIosGuide: () => void;
}

const PwaContext = createContext<PwaContextType | null>(null);

export function usePwaContext() {
  const ctx = useContext(PwaContext);
  if (!ctx) {
    throw new Error("usePwaContext must be used within a PwaWing component");
  }
  return ctx;
}

export default function PwaWing({ children }: { children?: React.ReactNode }) {
  const pwa = usePwa();
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isIosGuideOpen, setIsIosGuideOpen] = useState(false);

  const contextValue: PwaContextType = {
    ...pwa,
    openControlCenter: () => {
      pwa.triggerHaptic("gentle");
      setIsControlCenterOpen(true);
    },
    openIosGuide: () => {
      pwa.triggerHaptic("double");
      setIsIosGuideOpen(true);
    },
  };

  return (
    <PwaContext.Provider value={contextValue}>
      {/* Optional Top Floating Status Header Bar / Pill */}
      <div className="w-full flex items-center justify-center pt-3 pb-1 px-4">
        <PwaHeaderPill
          isOnline={pwa.isOnline}
          isStandalone={pwa.isStandalone}
          isIOS={pwa.isIOS}
          offlineQueueCount={pwa.offlineQueue.length}
          onClick={() => {
            pwa.triggerHaptic("gentle");
            setIsControlCenterOpen(true);
          }}
          onHaptic={pwa.triggerHaptic}
        />
      </div>

      {children}

      {/* Floating Bottom PWA Install Banner */}
      <InstallBanner
        isIOS={pwa.isIOS}
        canInstall={pwa.canInstall}
        isStandalone={pwa.isStandalone}
        onInstall={pwa.promptInstall}
        onHaptic={pwa.triggerHaptic}
        onOpenControlCenter={() => setIsControlCenterOpen(true)}
      />

      {/* Standalone iOS PWA Guide Drawer */}
      <IosInstallDrawer
        isOpen={isIosGuideOpen}
        onClose={() => setIsIosGuideOpen(false)}
        onHaptic={pwa.triggerHaptic}
      />

      {/* Interactive PWA Diagnostics & Feature Control Center */}
      <PwaControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        isOnline={pwa.isOnline}
        isStandalone={pwa.isStandalone}
        isIOS={pwa.isIOS}
        canInstall={pwa.canInstall}
        swRegistered={pwa.swRegistered}
        badgeCount={pwa.badgeCount}
        offlineQueue={pwa.offlineQueue}
        onInstall={pwa.promptInstall}
        onOpenIosGuide={() => setIsIosGuideOpen(true)}
        onHaptic={pwa.triggerHaptic}
        setBadge={pwa.setBadge}
        clearBadge={pwa.clearBadge}
        shareContent={pwa.shareContent}
        simulatePush={pwa.simulatePushNotification}
        syncOfflineQueue={pwa.syncOfflineQueue}
      />
    </PwaContext.Provider>
  );
}

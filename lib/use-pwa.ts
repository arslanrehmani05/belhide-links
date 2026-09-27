"use client";

import { useState, useEffect, useCallback } from "react";

export interface OfflineRegistration {
  id: string;
  serialNumber: string;
  ownerName: string;
  email: string;
  garmentType: string;
  purchaseDate: string;
  timestamp: string;
}

export interface PwaState {
  isSupported: boolean;
  isInstalled: boolean;
  isStandalone: boolean;
  isOnline: boolean;
  isIOS: boolean;
  canInstall: boolean;
  badgeCount: number;
  swRegistered: boolean;
  offlineQueue: OfflineRegistration[];
}

export function usePwa() {
  const [state, setState] = useState<PwaState>({
    isSupported: false,
    isInstalled: false,
    isStandalone: false,
    isOnline: true,
    isIOS: false,
    canInstall: false,
    badgeCount: 0,
    swRegistered: false,
    offlineQueue: [],
  });

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  // Check iOS environment
  const checkIfIOS = (): boolean => {
    if (typeof window === "undefined") return false;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isMacTouch = Boolean(navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /macintosh/.test(userAgent));
    return Boolean(isIosDevice || isMacTouch);
  };

  // Check standalone mode
  const checkIfStandalone = (): boolean => {
    if (typeof window === "undefined") return false;
    const isStandaloneMedia = window.matchMedia("(display-mode: standalone)").matches;
    const isIosStandalone = Boolean((window.navigator as any).standalone === true);
    return Boolean(isStandaloneMedia || isIosStandalone);
  };

  // Load offline queue from localStorage
  const loadOfflineQueue = () => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("belhide_offline_registrations");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Initialize PWA detection & Service Worker registration
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isIOS = checkIfIOS();
    const isStandalone = checkIfStandalone();
    const isOnline = navigator.onLine;
    const isSupported = "serviceWorker" in navigator;
    const loadedQueue = loadOfflineQueue();

    setState((prev) => ({
      ...prev,
      isSupported,
      isIOS,
      isStandalone,
      isInstalled: isStandalone,
      isOnline,
      offlineQueue: loadedQueue,
    }));

    // Service Worker Registration
    if (isSupported) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          setSwRegistration(reg);
          setState((prev) => ({ ...prev, swRegistered: true }));
          console.log("[PWA] Service Worker registered successfully:", reg.scope);
        })
        .catch((err) => {
          console.warn("[PWA] Service Worker registration failed:", err);
        });
    }

    // Event listeners for online / offline
    const handleOnline = () => {
      setState((prev) => ({ ...prev, isOnline: true }));
      triggerHaptic("success");
      syncOfflineQueue();
    };

    const handleOffline = () => {
      setState((prev) => ({ ...prev, isOnline: false }));
      triggerHaptic("gentle");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Capture beforeinstallprompt for Android / Chrome / Desktop
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setState((prev) => ({ ...prev, canInstall: true }));
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setState((prev) => ({ ...prev, canInstall: false, isInstalled: true, isStandalone: true }));
      triggerHaptic("success");
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Trigger Native Haptic Feedback
  const triggerHaptic = useCallback((pattern: "gentle" | "double" | "success" | "leather" = "gentle") => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        switch (pattern) {
          case "gentle":
            navigator.vibrate(30);
            break;
          case "double":
            navigator.vibrate([40, 60, 40]);
            break;
          case "success":
            navigator.vibrate([30, 40, 80]);
            break;
          case "leather":
            navigator.vibrate([20, 30, 20, 30, 50]);
            break;
        }
      } catch (err) {
        // Haptic API not supported or user didn't interact yet
      }
    }
  }, []);

  // Prompt Install (for Android / Chrome / Desktop)
  const promptInstall = async () => {
    triggerHaptic("double");
    if (!deferredPrompt) return false;
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setState((prev) => ({ ...prev, canInstall: false, isInstalled: true }));
      }
      setDeferredPrompt(null);
      return outcome === "accepted";
    } catch {
      return false;
    }
  };

  // App Badging (Native app icon badge counter on home screen)
  const setBadge = useCallback(async (count: number) => {
    if (typeof window === "undefined") return;
    setState((prev) => ({ ...prev, badgeCount: count }));
    if ("setAppBadge" in navigator) {
      try {
        if (count > 0) {
          await (navigator as any).setAppBadge(count);
        } else {
          await (navigator as any).clearAppBadge();
        }
      } catch (e) {
        console.warn("[PWA] Badging API error:", e);
      }
    }
  }, []);

  const clearBadge = useCallback(async () => {
    setBadge(0);
  }, [setBadge]);

  // Web Share API
  const shareContent = useCallback(async (shareData: { title: string; text: string; url?: string }) => {
    triggerHaptic("gentle");
    if (typeof window !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url || window.location.href,
        });
        return true;
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.warn("[PWA] Share failed:", err);
        }
      }
    }
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareData.url || window.location.href);
      alert("Link copied to clipboard!");
      return true;
    } catch {
      return false;
    }
  }, [triggerHaptic]);

  // Push Notification Simulation / Trigger
  const simulatePushNotification = useCallback(async (title: string, body: string, url = "/") => {
    triggerHaptic("leather");
    if (swRegistration && "showNotification" in swRegistration) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          swRegistration.showNotification(title, {
            body,
            icon: "/icon-192.png",
            badge: "/icon-192.png",
            vibrate: [100, 50, 100],
            data: { url },
          } as any);
          return true;
        }
      } catch (e) {
        console.warn("[PWA] Notification error:", e);
      }
    }
    return false;
  }, [swRegistration, triggerHaptic]);

  // Add item to offline queue
  const queueOfflineRegistration = useCallback((data: Omit<OfflineRegistration, "id" | "timestamp">) => {
    const newEntry: OfflineRegistration = {
      ...data,
      id: "reg_" + Date.now(),
      timestamp: new Date().toISOString(),
    };

    const current = loadOfflineQueue();
    const updated = [newEntry, ...current];
    try {
      localStorage.setItem("belhide_offline_registrations", JSON.stringify(updated));
      setState((prev) => ({ ...prev, offlineQueue: updated }));
      setBadge(updated.length);
      triggerHaptic("success");
      return true;
    } catch {
      return false;
    }
  }, [setBadge, triggerHaptic]);

  // Sync offline queue when connection returns
  const syncOfflineQueue = useCallback(async () => {
    const queue = loadOfflineQueue();
    if (queue.length === 0) return;

    // Simulate sending registrations to backend
    console.log("[PWA Sync] Syncing queued registrations:", queue);
    try {
      // Clear localStorage queue after successful sync
      localStorage.removeItem("belhide_offline_registrations");
      setState((prev) => ({ ...prev, offlineQueue: [] }));
      clearBadge();
      triggerHaptic("success");
      simulatePushNotification(
        "Warranty Registrations Synced",
        `Successfully uploaded ${queue.length} offline leather product registration(s).`
      );
    } catch (e) {
      console.warn("[PWA Sync] Sync error:", e);
    }
  }, [clearBadge, triggerHaptic, simulatePushNotification]);

  return {
    ...state,
    promptInstall,
    triggerHaptic,
    setBadge,
    clearBadge,
    shareContent,
    simulatePushNotification,
    queueOfflineRegistration,
    syncOfflineQueue,
  };
}

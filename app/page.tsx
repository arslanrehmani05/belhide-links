"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import MarketSelector from "@/components/MarketSelector";
import HeroCard from "@/components/HeroCard";
import BentoGrid from "@/components/BentoGrid";
import CareGuideModal from "@/components/CareGuideModal";
import SizeGuideModal from "@/components/SizeGuideModal";
import Footer from "@/components/Footer";
import { brandConfig, markets, Market, ThemeVariant } from "@/lib/links-config";

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>(brandConfig.theme);
  const [activeMarket, setActiveMarket] = useState<Market>(
    markets.find((m) => m.isDefault) || markets[0]
  );
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Apply data-theme attribute on <html> element when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-between selection:bg-brand-accent selection:text-white transition-colors duration-300">
      {/* Background ambient lighting accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-gradient-to-b from-brand-accent/10 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-between">
        <div>
          {/* Header Block with Brand & Theme Switcher */}
          <Header
            currentTheme={currentTheme}
            onThemeChange={(newTheme) => setCurrentTheme(newTheme)}
          />

          {/* Region / Market Selector */}
          <MarketSelector
            activeMarket={activeMarket}
            onSelectMarket={(m) => setActiveMarket(m)}
          />

          {/* Hero Action Priority Card */}
          <HeroCard activeMarket={activeMarket} />

          {/* Secondary Links Bento Grid */}
          <BentoGrid
            onOpenCareGuide={() => setIsCareGuideOpen(true)}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />
        </div>

        {/* Minimal Footer */}
        <Footer />
      </div>

      {/* Interactive Care Guide Drawer Modal */}
      <CareGuideModal
        isOpen={isCareGuideOpen}
        onClose={() => setIsCareGuideOpen(false)}
      />

      {/* Interactive Size Guide Drawer Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </main>
  );
}

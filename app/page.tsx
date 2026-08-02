"use client";

import { useState, useEffect, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import MarketSelector from "@/components/MarketSelector";
import QrPersonalizationBanner from "@/components/QrPersonalizationBanner";
import ProductRegistration from "@/components/ProductRegistration";
import VipClub from "@/components/VipClub";
import ShopSection from "@/components/ShopSection";
import CareCenter from "@/components/CareCenter";
import StyleInspiration from "@/components/StyleInspiration";
import AiStyleAdvisor from "@/components/AiStyleAdvisor";
import CustomerReviews from "@/components/CustomerReviews";
import ReferralTeaser from "@/components/ReferralTeaser";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";
import { brandConfig, markets, Market, ThemeVariant } from "@/lib/links-config";
import { useQrParams } from "@/lib/use-qr-params";

function CustomerHubContent() {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>(brandConfig.theme);
  const [activeMarket, setActiveMarket] = useState<Market>(
    markets.find((m) => m.isDefault) || markets[0]
  );

  const qrParams = useQrParams();

  // Apply data-theme attribute on <html> element when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const scrollToRegistration = () => {
    const el = document.getElementById("product-registration");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-between selection:bg-brand-accent selection:text-white transition-colors duration-300">
      {/* Background ambient lighting accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-gradient-to-b from-brand-accent/10 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-between">
        <div>
          {/* Hero Section with logo, headline, dual buttons & theme switcher */}
          <HeroSection
            currentTheme={currentTheme}
            onThemeChange={(newTheme) => setCurrentTheme(newTheme)}
            onRegisterClick={scrollToRegistration}
          />

          {/* Dynamic QR Parameter Personalization Banner */}
          <QrPersonalizationBanner params={qrParams} />

          {/* Storefront Region Selector */}
          <MarketSelector
            activeMarket={activeMarket}
            onSelectMarket={(m) => setActiveMarket(m)}
          />

          {/* Product Registration Section */}
          <ProductRegistration />

          {/* VIP Members Club Section */}
          <VipClub />

          {/* Shop BELHIDE Category Bento Grid */}
          <ShopSection activeMarket={activeMarket} />

          {/* Leather Care Center */}
          <CareCenter />

          {/* Style & Inspiration Lookbooks */}
          <StyleInspiration />

          {/* AI Style Advisor Teaser */}
          <AiStyleAdvisor />

          {/* Verified Customer Reviews */}
          <CustomerReviews />

          {/* Refer a Friend Teaser */}
          <ReferralTeaser />

          {/* Customer Support Quick Links */}
          <SupportSection />
        </div>

        {/* Refined Legal & Brand Footer */}
        <Footer />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-xs font-serif tracking-widest uppercase text-brand-muted">
        Loading BELHIDE Customer Hub...
      </div>
    }>
      <CustomerHubContent />
    </Suspense>
  );
}

export type ThemeVariant = 'parchment' | 'espresso' | 'ivory';

export interface Market {
  id: string;
  name: string;
  flag: string;
  currency: string;
  url: string;
  isDefault?: boolean;
}

export interface HeroActionConfig {
  title: string;
  subtitle: string;
  ctaText: string;
  url: string;
  badge?: string;
  badgeType?: 'featured' | 'new' | 'limited';
  highlightMetric?: string;
  highlightText?: string;
}

export type IconType = 
  | 'instagram' 
  | 'book' 
  | 'ruler' 
  | 'message' 
  | 'scissors' 
  | 'shield' 
  | 'globe' 
  | 'sparkles'
  | 'heart'
  | 'shopping-bag';

export interface SecondaryLink {
  id: string;
  label: string;
  subtitle?: string;
  url: string;
  icon: IconType;
  handle?: string;
  badge?: string;
  cardSize: 'full' | 'half'; // Bento grid layout sizing
  accentBorder?: boolean;
  isModal?: boolean; // Opens built-in rich modal instead of navigating away
  modalType?: 'care-guide' | 'size-guide';
}

export interface CareStep {
  title: string;
  description: string;
  tip: string;
}

export interface CareGuideData {
  title: string;
  subtitle: string;
  introduction: string;
  steps: CareStep[];
  proTips: string[];
}

export interface SizeGuideData {
  title: string;
  subtitle: string;
  measurementTip: string;
  sizes: {
    size: string;
    usEu: string;
    chest: string;
    shoulder: string;
    sleeve: string;
    fitNote: string;
  }[];
}

export interface BrandConfig {
  name: string;
  wordmark: string;
  tagline: string;
  subtagline: string;
  established: string;
  theme: ThemeVariant;
  supportEmail: string;
  whatsappNumber?: string;
  whatsappUrl?: string;
  instagramHandle: string;
  instagramUrl: string;
  websiteUrl: string;
  physicalTagBadge: string;
}

// ============================================================================
// SINGLE SOURCE OF TRUTH — BELHIDE LINKS CONFIGURATION
// All copy, links, markets, and content can be updated right here.
// ============================================================================

export const brandConfig: BrandConfig = {
  name: "Belhide",
  wordmark: "BELHIDE",
  tagline: "Leather goods, made to last",
  subtagline: "Handcrafted Heritage • Est. 1998",
  established: "1998",
  theme: "parchment", // Active default theme: "parchment" | "espresso" | "ivory"
  supportEmail: "belhideofficial@gmail.com",
  whatsappNumber: "+1 (800) 555-BELHIDE",
  whatsappUrl: "https://wa.me/18005552354?text=Hello%20Belhide%20Team%2C%20I%20have%20an%20inquiry%20regarding%20a%20leather%20jacket.",
  instagramHandle: "@belhide.official",
  instagramUrl: "https://instagram.com/belhide.official",
  websiteUrl: "https://belhide.com",
  physicalTagBadge: "Official Product Tag • links.belhide.com",
};

export const heroAction: HeroActionConfig = {
  title: "Shop the Flagship Collection",
  subtitle: "Handcrafted full-grain leather jackets, bombers, shearling coats & suede outerwear.",
  ctaText: "Explore Collection",
  url: "https://belhide.com",
  badge: "2026 Ready-to-Wear",
  badgeType: "featured",
  highlightMetric: "100%",
  highlightText: "Full-Grain Italian & Turkish Leathers",
};

export const markets: Market[] = [
  { 
    id: "us", 
    name: "United States", 
    flag: "🇺🇸", 
    currency: "USD ($)", 
    url: "https://belhide.com?market=us", 
    isDefault: true 
  },
  { 
    id: "uk", 
    name: "United Kingdom", 
    flag: "🇬🇧", 
    currency: "GBP (£)", 
    url: "https://belhide.com?market=uk" 
  },
  { 
    id: "eu", 
    name: "Europe", 
    flag: "🇪🇺", 
    currency: "EUR (€)", 
    url: "https://belhide.com?market=eu" 
  },
  { 
    id: "ca", 
    name: "Canada", 
    flag: "🇨🇦", 
    currency: "CAD ($)", 
    url: "https://belhide.com?market=ca" 
  },
];

export const secondaryLinks: SecondaryLink[] = [
  {
    id: "instagram",
    label: "Follow on Instagram",
    subtitle: "@belhide.official • Artisanal drops & studio stories",
    url: "https://instagram.com/belhide.official",
    icon: "instagram",
    handle: "@belhide.official",
    badge: "Official",
    cardSize: "full",
  },
  {
    id: "care-guide",
    label: "Leather Care Guide",
    subtitle: "Cleaning, conditioning & longevity practices",
    url: "#care-guide",
    icon: "book",
    badge: "Essential",
    cardSize: "half",
    accentBorder: true,
    isModal: true,
    modalType: "care-guide",
  },
  {
    id: "bespoke",
    label: "Bespoke & Custom",
    subtitle: "Made-to-measure jackets from $350",
    url: "https://belhide.com/custom",
    icon: "scissors",
    badge: "Custom",
    cardSize: "half",
  },
  {
    id: "size-guide",
    label: "Fit & Size Guide",
    subtitle: "Chest measurements & fit comparison",
    url: "#size-guide",
    icon: "ruler",
    cardSize: "half",
    isModal: true,
    modalType: "size-guide",
  },
  {
    id: "contact",
    label: "VIP Concierge & Support",
    subtitle: "Direct WhatsApp & email assistance",
    url: "mailto:belhideofficial@gmail.com",
    icon: "message",
    cardSize: "half",
  },
];

// Rich Care Guide Content
export const careGuideData: CareGuideData = {
  title: "Leather Care & Preservation",
  subtitle: "Preserving your Belhide garment for generations",
  introduction: "Full-grain leather develops a rich, distinctive patina over time. Follow these essential guidelines to preserve its suppleness and structural integrity.",
  steps: [
    {
      title: "1. Regular Cleaning",
      description: "Wipe gently with a soft, dry micro-fiber cloth after wear to remove surface dust. For minor spots, use a damp cloth with mild soap water.",
      tip: "Never submerge leather in water or use harsh chemical detergents."
    },
    {
      title: "2. Conditioning (Every 6 Months)",
      description: "Apply a small amount of premium natural leather balm or cream in circular motions. Let it absorb for 30 minutes before buffing gently.",
      tip: "Conditioning prevents drying, cracking, and keeps the grain supple."
    },
    {
      title: "3. Moisture & Rain Protection",
      description: "If caught in rain, wipe off water immediately and let the jacket air-dry naturally at room temperature on a wide padded hanger.",
      tip: "Never dry leather near artificial heat sources like radiators or hair dryers."
    },
    {
      title: "4. Proper Storage",
      description: "Hang your jacket on a broad, contoured wooden hanger to maintain shoulder shape. Store in a breathable cotton garment bag in a cool, dry place.",
      tip: "Avoid plastic covers which trap moisture and promote mildew growth."
    }
  ],
  proTips: [
    "Full-grain leather stretches slightly over time to mirror your body's silhouette.",
    "Hardware (YKK brass zippers) can be polished with a dry cloth.",
    "For deep scuffs, massage natural skin oils or leather balm into the scratch."
  ]
};

// Rich Size Guide Data
export const sizeGuideData: SizeGuideData = {
  title: "Fit & Sizing Guide",
  subtitle: "Precision tailoring for outerwear",
  measurementTip: "Measure across the fullest part of your chest, keeping the tape measure horizontal under your arms.",
  sizes: [
    {
      size: "S",
      usEu: "US 36 / EU 46",
      chest: '36" - 38" (91-96 cm)',
      shoulder: '17.5" (44.5 cm)',
      sleeve: '25.0" (63.5 cm)',
      fitNote: "Tailored slim fit"
    },
    {
      size: "M",
      usEu: "US 38 / EU 48",
      chest: '38" - 40" (96-101 cm)',
      shoulder: '18.0" (45.7 cm)',
      sleeve: '25.5" (64.8 cm)',
      fitNote: "Classic tailored fit"
    },
    {
      size: "L",
      usEu: "US 40 / EU 50",
      chest: '40" - 42" (101-106 cm)',
      shoulder: '18.5" (47.0 cm)',
      sleeve: '26.0" (66.0 cm)',
      fitNote: "Comfortable regular fit"
    },
    {
      size: "XL",
      usEu: "US 42 / EU 52",
      chest: '42" - 44" (106-111 cm)',
      shoulder: '19.0" (48.3 cm)',
      sleeve: '26.5" (67.3 cm)',
      fitNote: "Relaxed layering fit"
    },
    {
      size: "2XL",
      usEu: "US 44 / EU 54",
      chest: '44" - 46" (111-117 cm)',
      shoulder: '19.5" (49.5 cm)',
      sleeve: '27.0" (68.5 cm)',
      fitNote: "Generous fit"
    }
  ]
};

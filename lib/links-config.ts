export type ThemeVariant = 'parchment' | 'espresso' | 'ivory';

export interface Market {
  id: string;
  name: string;
  flag: string;
  currency: string;
  url: string;
  isDefault?: boolean;
}

export interface HeroConfig {
  headline: string;
  subheading: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  badge: string;
}

export interface ShopCategory {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
  icon: string;
}

export interface CareArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string[];
  proTip?: string;
}

export interface StyleLink {
  id: string;
  title: string;
  subtitle: string;
  platform: 'pinterest' | 'instagram' | 'editorial' | 'lookbook' | 'outfit';
  url: string;
  badge?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  productName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface SupportLink {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: string;
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
  pinterestUrl: string;
  websiteUrl: string;
  physicalTagBadge: string;
}

// ============================================================================
// SINGLE SOURCE OF TRUTH — BELHIDE CUSTOMER HUB & LINKS CONFIGURATION
// Everything on the hub is editable in this single file.
// ============================================================================

export const brandConfig: BrandConfig = {
  name: "Belhide",
  wordmark: "BELHIDE",
  tagline: "Crafted to Last.",
  subtagline: "Handcrafted Heritage • Est. 1998",
  established: "1998",
  theme: "parchment", // Active default theme: "parchment" | "espresso" | "ivory"
  supportEmail: "belhideofficial@gmail.com",
  whatsappNumber: "+1 (800) 555-BELHIDE",
  whatsappUrl: "https://wa.me/18005552354?text=Hello%20Belhide%20Team%2C%20I%20have%20an%20inquiry%20regarding%20a%20leather%20jacket.",
  instagramHandle: "@belhide.official",
  instagramUrl: "https://instagram.com/belhide.official",
  pinterestUrl: "https://pinterest.com/belhide",
  websiteUrl: "https://belhide.com",
  physicalTagBadge: "Official Product Tag • links.belhide.com",
};

export const heroConfig: HeroConfig = {
  headline: "Crafted to Last.",
  subheading: "Welcome to the BELHIDE Customer Hub. Everything you need to register your product, care for your leather, discover new collections, and stay connected with the brand.",
  primaryCtaText: "Shop Collection",
  primaryCtaUrl: "https://belhide.com",
  secondaryCtaText: "Register Your Product",
  badge: "Customer Hub & Authentication",
};

export const markets: Market[] = [
  { id: "us", name: "United States", flag: "🇺🇸", currency: "USD ($)", url: "https://belhide.com?market=us", isDefault: true },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", currency: "GBP (£)", url: "https://belhide.com?market=uk" },
  { id: "eu", name: "Europe", flag: "🇪🇺", currency: "EUR (€)", url: "https://belhide.com?market=eu" },
  { id: "ca", name: "Canada", flag: "🇨🇦", currency: "CAD ($)", url: "https://belhide.com?market=ca" },
];

export const shopCategories: ShopCategory[] = [
  { id: "new-arrivals", title: "New Arrivals", subtitle: "2026 Ready-to-wear seasonal drops", url: "https://belhide.com/new-arrivals", badge: "Latest", icon: "sparkles" },
  { id: "best-sellers", title: "Best Sellers", subtitle: "Our most iconic handcrafted silhouettes", url: "https://belhide.com/best-sellers", badge: "Popular", icon: "flame" },
  { id: "leather-jackets", title: "Leather Jackets", subtitle: "Biker, racer, bomber & shearling coats", url: "https://belhide.com/jackets", icon: "jacket" },
  { id: "leather-bags", title: "Leather Bags", subtitle: "Full-grain duffels, holdalls & briefcases", url: "https://belhide.com/bags", icon: "bag" },
  { id: "leather-accessories", title: "Leather Accessories", subtitle: "Wallets, belts, key fobs & watch straps", url: "https://belhide.com/accessories", icon: "wallet" },
  { id: "gift-ideas", title: "Gift Ideas", subtitle: "Curated heirloom gifts & bespoke sets", url: "https://belhide.com/gifts", badge: "Curated", icon: "gift" },
];

export const careArticles: CareArticle[] = [
  {
    id: "care-guide",
    title: "Essential Leather Care Guide",
    category: "Overview",
    summary: "The foundational practices for keeping full-grain leather supple and rich.",
    content: [
      "Full-grain leather is a natural living material that absorbs environmental oils and develops a rich patina over time.",
      "Always wipe down your jacket with a clean micro-fiber cloth after wearing outdoors.",
      "Store your garment in a breathable cotton garment bag, away from direct sunlight."
    ],
    proTip: "Never use artificial heat sources like hair dryers to dry wet leather."
  },
  {
    id: "cleaning",
    title: "Cleaning Leather Safely",
    category: "Cleaning",
    summary: "How to remove surface dust, rain spots, and minor stains without damaging the hide.",
    content: [
      "For everyday dust, dry buff gentle circular strokes with a lint-free cloth.",
      "For water spots, lightly dampen a cloth with distilled water and gently feather the edges.",
      "Allow to air dry naturally at room temperature."
    ],
    proTip: "Never submerge leather in water or use household liquid soap."
  },
  {
    id: "conditioning",
    title: "Conditioning Leather",
    category: "Conditioning",
    summary: "Replenish essential natural oils every 6 months to prevent cracking.",
    content: [
      "Apply a pea-sized amount of natural wax/oil balm to a soft applicator sponge.",
      "Massage evenly across panels in gentle circular movements.",
      "Let rest for 30 minutes, then buff lightly with a dry microfiber cloth."
    ],
    proTip: "Always test conditioner on an inconspicuous interior hem first."
  },
  {
    id: "storage",
    title: "Storage & Protection",
    category: "Storage",
    summary: "Maintain structural shoulder shape and prevent mildew during off-seasons.",
    content: [
      "Always use a broad, contoured wooden hanger that supports shoulder pads.",
      "Avoid plastic garment bags which seal in humidity; use breathable unbleached cotton.",
      "Keep in a climate-controlled closet away from damp basements or hot attics."
    ],
    proTip: "Insert cedar blocks nearby for natural moisture absorption and moth defense."
  },
  {
    id: "rain-protection",
    title: "Rain & Weather Defense",
    category: "Weather",
    summary: "What to do if caught in unexpected downpours.",
    content: [
      "If drenched, shake off excess droplets immediately.",
      "Hang on a wide wooden hanger and absorb surface water with dry towels.",
      "Let air dry slowly away from radiators or heaters."
    ],
    proTip: "Apply a natural beeswax-based leather protector spray before rainy seasons."
  },
  {
    id: "travel-tips",
    title: "Travel & Packing Guide",
    category: "Travel",
    summary: "Protect your outerwear when packing for flights or weekend getaways.",
    content: [
      "Turn the jacket inside out, folding shoulders inward to prevent exterior scuffs.",
      "Place tissue paper inside sleeves to preserve sleeve curvature.",
      "Wear your jacket on flights whenever possible to keep shape intact."
    ]
  },
  {
    id: "leather-faq",
    title: "Leather FAQs",
    category: "FAQ",
    summary: "Answers to common questions regarding full-grain leather breakdown.",
    content: [
      "Q: Why does my leather have natural grain variations?\nA: Full-grain leather retains the natural hide characteristics, proving genuine authenticity.",
      "Q: Can scratches be removed?\nA: Minor fingernail scratches fade by massaging skin oils into the grain with warm fingers."
    ]
  }
];

export const styleLinks: StyleLink[] = [
  { id: "instagram-style", title: "Instagram Community", subtitle: "@belhide.official • Daily outfit inspiration & studio drops", platform: "instagram", url: "https://instagram.com/belhide.official", badge: "12K+ Community" },
  { id: "pinterest-board", title: "Pinterest Moodboards", subtitle: "Curated leather jacket styling, editorial looks & aesthetic boards", platform: "pinterest", url: "https://pinterest.com/belhide", badge: "Inspiration" },
  { id: "editorials", title: "Editorial Features", subtitle: "Press & style features in GQ, Esquire & Vogue", platform: "editorial", url: "https://belhide.com/editorials" },
  { id: "lookbooks", title: "Seasonal Lookbooks", subtitle: "Explore our 2026 Autumn & Winter campaign shoots", platform: "lookbook", url: "https://belhide.com/lookbook" },
  { id: "outfit-guide", title: "Outfit Styling Guide", subtitle: "How to style biker & racer jackets for casual and formal occasions", platform: "outfit", url: "https://belhide.com/style-guide" },
];

export const vipBenefits = [
  "Early access to limited edition drops 24 hours before public launch",
  "Exclusive invitations to private seasonal sample sales",
  "Member-only 15% discount on custom bespoke tailoring",
  "Complimentary annual leather care kit with every jacket purchase",
  "Direct line to Belhide master artisans for custom sizing consultation"
];

export const initialReviews: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Marcus V.",
    location: "New York, NY",
    productName: "Artisan Biker Jacket (Cognac)",
    rating: 5,
    date: "2 days ago",
    comment: "The weight and smell of the full-grain leather is unmatched. Scanned the QR code on the tag and registered my jacket instantly. Outstanding craftsmanship!",
    verifiedPurchase: true
  },
  {
    id: "rev-2",
    author: "Sophia L.",
    location: "London, UK",
    productName: "Shearling Aviator Coat",
    rating: 5,
    date: "1 week ago",
    comment: "Kept me incredibly warm in the British winter. The care guide in this hub helped me treat a rain mark effortlessly.",
    verifiedPurchase: true
  },
  {
    id: "rev-3",
    author: "David K.",
    location: "Toronto, CA",
    productName: "Classic Café Racer Jacket",
    rating: 5,
    date: "2 weeks ago",
    comment: "Bespoke sizing was spot on. Highly recommend registering your product here for warranty protection.",
    verifiedPurchase: true
  }
];

export const supportLinks: SupportLink[] = [
  { id: "contact-us", title: "Contact Customer Care", subtitle: "Email & WhatsApp concierge team", url: "mailto:belhideofficial@gmail.com", icon: "message" },
  { id: "shipping-info", title: "Shipping & Delivery", subtitle: "Free US shipping & international delivery details", url: "https://belhide.com/shipping", icon: "truck" },
  { id: "returns", title: "Returns & Exchanges", subtitle: "14-day hassle-free return policy", url: "https://belhide.com/returns", icon: "rotate-ccw" },
  { id: "faq", title: "Help & FAQ", subtitle: "Orders, tracking, sizing & payments", url: "https://belhide.com/faq", icon: "help-circle" },
];

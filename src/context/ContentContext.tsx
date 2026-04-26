import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, FAQItem, CustomSection, OrderInfo } from '../types';
import { products as initialProducts } from '../data/products';
import i18n from '../i18n';

// Static translations from JSON files as defaults
import enTranslations from '../locales/en/translation.json';
import arTranslations from '../locales/ar/translation.json';

export interface SiteLanguageContent {
  homeHero: {
    season: string;
    titlePart1: string;
    titlePart2: string;
    titlePart3: string;
    subtitle: string;
    editorQuote: string;
    image: string;
  };
  homeBanners: {
    main: { subtitle: string; title: string; btn: string; image: string };
    sub: { subtitle: string; title: string; btn: string; image: string };
    text: { title: string; desc: string; btn: string };
  };
  customSections: CustomSection[];
  returnsPolicy: string;
  shippingPolicy: string;
  contactUs: string;
  faqs: FAQItem[];
}

export interface SiteContent {
  locales: {
    en: SiteLanguageContent;
    ar: SiteLanguageContent;
  };
  translations: {
    en: any;
    ar: any;
  };
  products: Product[];
  orders: OrderInfo[];
  paymentSettings: {
    cashOnDeliveryEnabled: boolean;
    walletTransferEnabled: boolean;
    wallets: { id: string; name: string; number: string }[];
    instapayEnabled: boolean;
    instapayAccounts: { id: string; name: string; address: string }[];
  };
  shippingPlans: {
    id: string;
    name: string;
    rate: number;
  }[];
}

const defaultLanguageContent: SiteLanguageContent = {
  homeHero: {
    season: "Spring / Summer 2026",
    titlePart1: "Refining",
    titlePart2: "Everyday",
    titlePart3: "Elegance.",
    subtitle: "Discover the modern aesthetic with our newly curated collection. Designed for the bold, the beautiful, and the minimalist.",
    editorQuote: "The perfect balance of form and function for the modern wardrobe.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80"
  },
  homeBanners: {
    main: { subtitle: "Archive", title: "Classic Winter", btn: "Explore Collection", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop&q=80" },
    sub: { subtitle: "Trending Now", title: "Summer Essentials", btn: "Shop Now", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80" },
    text: { title: "Accessories Sale", desc: "Up to 40% off on selected carefully curated items. Upgrade your look instantly.", btn: "Discover More" }
  },
  customSections: [],
  returnsPolicy: "We accept returns within 30 days of the delivery date. Items must be unworn, unwashed, and have original tags attached. We offer free returns for all domestic orders.",
  shippingPolicy: "We currently ship to over 50 countries worldwide. Shipping costs and delivery times vary by location, which will be calculated at checkout. Orders processed here will take 3-5 business days to arrive for domestic deliveries.",
  contactUs: "We would love to hear from you. Whether you have a question about our products, shipping, returns, or anything else, our team is ready to answer all your questions.",
  faqs: [
    {
      category: "Orders & Shipping",
      questions: [
        {
          q: "Where do you ship?",
          a: "We currently ship to over 50 countries worldwide. Shipping costs and delivery times vary by location, which will be calculated at checkout."
        },
        {
          q: "How long will it take to get my order?",
          a: "Orders processed here will take 3-5 business days to arrive for domestic deliveries. Overseas deliveries can take anywhere from 7-16 days. Delivery details will be provided in your confirmation email."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          q: "What is your return policy?",
          a: "We accept returns within 30 days of the delivery date. Items must be unworn, unwashed, and have original tags attached. We offer free returns for all domestic orders."
        }
      ]
    }
  ]
};

const defaultContent: SiteContent = {
  locales: {
    en: { ...defaultLanguageContent },
    ar: { ...defaultLanguageContent }, // In reality, we should provide translated defaults
  },
  translations: {
    en: enTranslations,
    ar: arTranslations
  },
  products: initialProducts,
  orders: [
    { id: '#ORD-001', customer: 'Sarah Miller', email: 'sarah@example.com', date: 'Oct 12, 2026', items: 3, total: 345.00, status: 'Delivered' },
    { id: '#ORD-002', customer: 'Elena Ridge', email: 'elena@example.com', date: 'Oct 11, 2026', items: 1, total: 120.00, status: 'Processing' },
    { id: '#ORD-003', customer: 'Jessica Thompson', email: 'jessica@example.com', date: 'Oct 10, 2026', items: 5, total: 890.00, status: 'Shipped' },
    { id: '#ORD-004', customer: 'Michael Chen', email: 'michael@example.com', date: 'Oct 09, 2026', items: 2, total: 210.00, status: 'Pending' }
  ],
  paymentSettings: {
    cashOnDeliveryEnabled: true,
    walletTransferEnabled: false,
    wallets: [],
    instapayEnabled: false,
    instapayAccounts: []
  },
  shippingPlans: [
    { id: 'free', name: 'Free Shipping', rate: 0 },
    { id: 'standard', name: 'Standard Shipping', rate: 15.00 },
    { id: 'express', name: 'Express Shipping', rate: 30.00 }
  ]
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  currentLocale: SiteLanguageContent;
  updateLocaleContent: (lang: 'en' | 'ar', newContent: SiteLanguageContent) => void;
  updateTranslations: (lang: 'en' | 'ar', newTranslations: any) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    const saved = localStorage.getItem('raav_site_content_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContent(parsed);
        
        // Sync custom translations with i18next
        if (parsed.translations) {
            i18n.addResourceBundle('en', 'translation', parsed.translations.en, true, true);
            i18n.addResourceBundle('ar', 'translation', parsed.translations.ar, true, true);
        }
      } catch (e) {
        console.error("Failed to parse site content");
      }
    }
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem('raav_site_content_v2', JSON.stringify(newContent));
    
    // Update local i18next bundles
    i18n.addResourceBundle('en', 'translation', newContent.translations.en, true, true);
    i18n.addResourceBundle('ar', 'translation', newContent.translations.ar, true, true);
  };

  const updateLocaleContent = (lang: 'en' | 'ar', newLocaleContent: SiteLanguageContent) => {
    updateContent({
      ...content,
      locales: {
        ...content.locales,
        [lang]: newLocaleContent
      }
    });
  };

  const updateTranslations = (lang: 'en' | 'ar', newTranslations: any) => {
    updateContent({
      ...content,
      translations: {
        ...content.translations,
        [lang]: newTranslations
      }
    });
  };

  const currentLang = i18n.language === 'ar' ? 'ar' : 'en';
  const currentLocale = content.locales[currentLang] || content.locales.en;

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      currentLocale, 
      updateLocaleContent,
      updateTranslations
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

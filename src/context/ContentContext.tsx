import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FAQItem {
  category: string;
  questions: { q: string; a: string }[];
}

export interface CustomSection {
  id: string;
  type: 'banner' | 'text-image';
  title: string;
  subtitle: string;
  image: string;
  btnText: string;
  align: 'left' | 'right' | 'center';
}

export interface SiteContent {
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

const defaultContent: SiteContent = {
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

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    const saved = localStorage.getItem('raav_site_content');
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse site content");
      }
    }
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem('raav_site_content', JSON.stringify(newContent));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
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

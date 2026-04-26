export interface ProductReview {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  colors: string[];
  sizes: string[];
  shippingPlanId?: string;
  description?: string;
  composition?: string;
  care?: string;
  translations?: {
    [locale: string]: {
      name?: string;
      description?: string;
      composition?: string;
      care?: string;
    }
  };
  reviews?: ProductReview[];
}

export interface OrderInfo {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  shippingCost?: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';
  paymentMethod?: 'COD' | 'Wallet' | 'Card' | 'InstaPay';
  paymentStatus?: 'Pending' | 'Collected' | 'Refunded';
  paymentAccountName?: string;
  paymentAccountNumber?: string;
  trackingNumber?: string;
  shippingCompany?: string;
  shippingAddress?: string;
  cartItems?: {
    id: string;
    productId: number;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }[];
}

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

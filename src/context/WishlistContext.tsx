import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from './ToastContext';

export interface WishlistItem {
  productId: string | number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (productId: string | number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const { addToast } = useToast();

  const toggleWishlist = (newItem: WishlistItem) => {
    setItems((prevItems) => {
      const exists = prevItems.some(item => item.productId === newItem.productId);
      if (exists) {
        addToast(`${newItem.name} removed from Wishlist`, 'info');
        return prevItems.filter(item => item.productId !== newItem.productId);
      } else {
        addToast(`${newItem.name} added to Wishlist`, 'success');
        return [...prevItems, newItem];
      }
    });
  };

  const isInWishlist = (productId: string | number) => {
    return items.some(item => item.productId === productId);
  };

  const wishlistCount = items.length;

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

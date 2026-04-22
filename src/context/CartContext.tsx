import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from './ToastContext';

export interface CartItem {
  cartItemId: string; // Unique ID for the cart row (combines id, size, and color)
  productId: string | number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToast } = useToast();

  const addToCart = (newItem: Omit<CartItem, 'cartItemId'>) => {
    setItems(prevItems => {
      // Create a unique identifier based on product ID, size, and color
      const cartItemId = `${newItem.productId}-${newItem.size}-${newItem.color}`;
      
      const existingItemIndex = prevItems.findIndex(item => item.cartItemId === cartItemId);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      
      // New item
      return [...prevItems, { ...newItem, cartItemId }];
    });
    
    // Toast notification
    addToast(`${newItem.quantity}x ${newItem.name} added to bag`, 'success');
    
    // Automatically open cart when adding an item
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prevItems => 
      prevItems.map(item => 
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      isCartOpen, 
      setIsCartOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

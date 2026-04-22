/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import AboutUs from './pages/AboutUs';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import CartDrawer from './components/CartDrawer';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Header />
      <CartDrawer />
      <main className="flex-grow">
        {children}
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>

              {/* Public Routes */}
              <Route path="/*" element={
                <PublicLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                  </Routes>
                </PublicLayout>
              } />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}

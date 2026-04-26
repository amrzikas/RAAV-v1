/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import Lookbook from './pages/Lookbook';
import Returns from './pages/Returns';
import Shipping from './pages/Shipping';
import Profile from './pages/Profile';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminSettings from './pages/admin/AdminSettings';
import AdminDiscounts from './pages/admin/AdminDiscounts';
import AdminCustomers from './pages/admin/AdminCustomers';
import { useTranslation } from 'react-i18next';
import { ContentProvider } from './context/ContentContext';

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
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <ThemeProvider>
      <ContentProvider>
        <ToastProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <BrowserRouter>
                <ScrollToTop />
                <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="discounts" element={<AdminDiscounts />} />
                  <Route path="settings" element={<AdminSettings />} />
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
                      <Route path="/returns" element={<Returns />} />
                      <Route path="/shipping" element={<Shipping />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/lookbook" element={<Lookbook />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                    </Routes>
                  </PublicLayout>
                } />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
        </AuthProvider>
      </ToastProvider>
      </ContentProvider>
    </ThemeProvider>
  );
}

import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div>
            <Link to="/" className="inline-block text-2xl font-serif font-bold mb-6 tracking-wide">RAAV</Link>
            <p className="text-gray-500 leading-relaxed mb-6">
              Sophisticated aesthetics for the modern individual. Elevate your wardrobe with our meticulously curated collections.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-black transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-gray-500 hover:text-black transition-colors">Shop</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6 uppercase tracking-wider">Help & Info</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-500 hover:text-black transition-colors">Track Your Order</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-black transition-colors">Returns Policies</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-black transition-colors">Shipping + Delivery</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-black transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6 uppercase tracking-wider">Contact Us</h4>
            <p className="text-gray-500 mb-4">
              Do you have any queries or suggestions?<br />
              <a href="mailto:info@raav.com" className="text-black font-medium hover:underline">info@raav.com</a>
            </p>
            <p className="text-gray-500 mb-4">
              If you need support? Just give us a call.<br />
              <a href="tel:+55111222333" className="text-black font-medium hover:underline">+55 111 222 333 44</a>
            </p>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RAAV Store. All rights reserved. <Link to="/admin" className="ml-2 hover:text-gray-900 transition-colors">Admin Panel</Link>
          </p>
          <div className="flex space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
}

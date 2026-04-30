import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 rtl:text-right">
          
          <div>
            <Link to="/" className="inline-block text-2xl font-serif font-bold mb-6 tracking-wide">RAAV</Link>
            <p className="text-gray-500 leading-relaxed mb-6">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6 uppercase tracking-wider">{t('footer.quick_links')}</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-black transition-colors">{t('header.home')}</Link></li>
              <li><Link to="/shop" className="text-gray-500 hover:text-black transition-colors">{t('header.shop')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6 uppercase tracking-wider">{t('footer.help_info')}</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-500 hover:text-black transition-colors">{t('footer.track_order')}</Link></li>
              <li><Link to="/returns" className="text-gray-500 hover:text-black transition-colors">{t('footer.returns')}</Link></li>
              <li><Link to="/shipping" className="text-gray-500 hover:text-black transition-colors">{t('footer.shipping')}</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-black transition-colors">{t('footer.contact')}</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-black transition-colors">{t('footer.faqs')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6 uppercase tracking-wider">{t('footer.contact')}</h4>
            <p className="text-gray-500 mb-4">
              {t('footer.queries')}<br />
              <a href="mailto:info@raav.com" className="text-black font-medium hover:underline">info@raav.com</a>
            </p>
            <p className="text-gray-500 mb-4">
              {t('footer.support')}<br />
              <a href="tel:+201050740202" className="text-black font-medium hover:underline" dir="ltr">+201050740202</a>
            </p>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
            {user?.role === 'admin' && (
              <Link to="/admin" className="rtl:mr-2 ltr:ml-2 hover:text-gray-900 transition-colors">{t('footer.admin')}</Link>
            )}
          </p>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Search, User, ShoppingBag, Menu, X, Heart, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import AuthModal from './AuthModal';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkBg = location.pathname === '/';

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || !isDarkBg || isSearchOpen ? 'bg-white shadow-sm py-4 text-black' : 'bg-transparent py-6 text-black'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="md:hidden mr-4" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
                <Link to="/" className="text-sm font-medium tracking-wide hover:text-gray-500 transition-colors">{t('header.home')}</Link>
                <Link to="/shop" className="text-sm font-medium tracking-wide hover:text-gray-500 transition-colors">{t('header.shop')}</Link>
                <Link to="/about" className="text-sm font-medium tracking-wide hover:text-gray-500 transition-colors">{t('header.about')}</Link>
              </nav>
            </div>

            <Link to="/" className="text-3xl font-serif font-bold tracking-wider text-center absolute left-1/2 -translate-x-1/2">
              RAAV
            </Link>

            <div className="flex items-center space-x-4 rtl:space-x-reverse md:space-x-6 md:rtl:space-x-reverse">
              <button 
                onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
                className="text-sm font-medium hover:text-gray-500 transition-colors hidden sm:block"
              >
                {i18n.language === 'ar' ? 'EN' : 'AR'}
              </button>

              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover:text-gray-500 transition-colors">
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              
              <button onClick={toggleTheme} className="hover:text-gray-500 transition-colors">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <Link to="/wishlist" className="hover:text-gray-500 transition-colors relative hidden sm:block">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <button 
                onClick={() => user ? navigate('/profile') : setIsAuthOpen(true)} 
                className="hidden sm:block hover:text-gray-500 transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="hover:text-gray-500 transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 flex flex-col space-y-4 border-t text-black">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-wide text-left rtl:text-right">{t('header.home')}</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-wide text-left rtl:text-right">{t('header.shop')}</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-wide text-left rtl:text-right">{t('header.about')}</Link>
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-wide text-left rtl:text-right">{t('header.wishlist')} ({wishlistCount})</Link>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (user) {
                  navigate('/profile');
                } else {
                  setIsAuthOpen(true);
                }
              }} 
              className="text-left rtl:text-right text-sm font-medium tracking-wide uppercase"
            >
              {t('header.account')}
            </button>
            <button 
              onClick={() => {
                i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
                setMobileMenuOpen(false);
              }}
              className="text-left rtl:text-right text-sm font-medium tracking-wide uppercase text-gray-500"
            >
              Language: {i18n.language === 'ar' ? 'English' : 'عربي'}
            </button>
          </div>
        )}
      </header>

      {/* Full Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-white/95 backdrop-blur-md pt-24"
          >
            <div className="container mx-auto px-4 md:px-6 h-full overflow-y-auto">
              <div className="max-w-3xl mx-auto mt-10">
                <div className="relative border-b-2 border-black pb-2 mb-10">
                  <Search className="absolute left-0 rtl:left-auto rtl:right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input 
                    type="text" 
                    autoFocus
                    placeholder={t('header.search')} 
                    className="w-full text-2xl md:text-4xl font-light pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-2 bg-transparent outline-none placeholder-gray-300 border-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {searchQuery.length > 0 && (
                  <div className="pb-20">
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-6">{t('header.results')} ({searchResults.length})</p>
                    
                    {searchResults.length === 0 ? (
                      <p className="text-gray-400 italic">{t('header.no_matches')} "{searchQuery}"</p>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {searchResults.slice(0, 8).map(product => (
                          <Link 
                            key={product.id} 
                            to={`/product/${product.id}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="group"
                          >
                            <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <h3 className="text-sm font-medium group-hover:text-gray-500 transition-colors line-clamp-1">{product.name}</h3>
                            <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}

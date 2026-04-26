import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useContent } from '../context/ContentContext';

export default function Products() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { content } = useContent();
  const products = content.products || [];

  // Extract unique categories from dynamic products
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))].slice(0, 5);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleQuickAdd = (product: any) => {
    const productName = product.translations?.[currentLang]?.name || product.name;
    addToCart({
      productId: product.id,
      name: productName,
      price: product.price,
      image: product.image,
      size: 'M', // default size
      color: '#000000', // default color
      quantity: 1
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            {t('featured_products', 'Featured Products')}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm font-medium tracking-wider uppercase pb-1 border-b-2 transition-colors ${
                  activeCategory === category 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                {category === 'All' ? t('all', 'All') : category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2 md:px-0">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => {
              const productName = product.translations?.[currentLang]?.name || product.name;
              
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.image} 
                        alt={productName}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors opacity-0 group-hover:opacity-100 pointer-events-none flex items-center justify-center gap-4">
                      <button 
                        onClick={() => handleQuickAdd(product)}
                        className="pointer-events-auto bg-white p-3 rounded-full hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 shadow-lg"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                      <Link to={`/product/${product.id}`} className="pointer-events-auto bg-white p-3 rounded-full hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 delay-75 shadow-lg">
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={() => toggleWishlist({ productId: product.id, name: productName, price: product.price, image: product.image, category: product.category })}
                        className={`pointer-events-auto bg-white p-3 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 delay-150 shadow-lg ${isInWishlist(product.id) ? 'text-red-500' : 'text-black'}`}
                      >
                        <Heart className="w-5 h-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    {product.id % 3 === 0 && (
                      <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold uppercase py-1 px-3">
                        {t('sale', 'Sale')}
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm text-gray-500 mb-1">{product.category}</h3>
                    <Link to={`/product/${product.id}`} className={`block text-lg font-medium hover:text-gray-600 transition-colors mb-2 ${currentLang === 'ar' ? 'font-arabic' : ''}`}>
                      {productName}
                    </Link>
                    <p className="text-lg font-serif tracking-tighter">${product.price.toFixed(2)}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/shop" className="inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
            {t('load_more', 'Load More Options')}
          </Link>
        </div>
      </div>
    </section>
  );
}

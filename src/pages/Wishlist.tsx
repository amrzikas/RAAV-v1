import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { items, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleQuickAdd = (product: any) => {
    addToCart({
      productId: product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M',
      color: '#000000',
      quantity: 1,
    });
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="bg-[#F9F9F8] py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight text-gray-900">Your Wishlist</h1>
          <p className="text-gray-500 max-w-xl mx-auto font-light">
            {items.length === 0 ? "You haven't added any items to your wishlist yet." : `You have ${items.length} items saved.`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <Link to="/shop" className="inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            <AnimatePresence>
              {items.map((product) => (
                <motion.div
                  key={product.productId}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                    <Link to={`/product/${product.productId}`}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </Link>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none"></div>
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full hover:text-red-500 transition-colors shadow-sm"
                    >
                      <X className="w-4 h-4 text-black" />
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={() => handleQuickAdd(product)}
                        className="pointer-events-auto bg-white text-black px-6 py-3 hover:bg-black hover:text-white transition-colors shadow-lg text-sm font-bold tracking-widest uppercase flex items-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" /> Add to Bag
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xs text-gray-400 mb-1 tracking-wider uppercase font-medium">{product.category}</h3>
                    <Link to={`/product/${product.productId}`} className="block text-base text-gray-900 font-medium hover:text-gray-500 transition-colors mb-2">
                      {product.name}
                    </Link>
                    <p className="text-lg font-serif text-gray-900 font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

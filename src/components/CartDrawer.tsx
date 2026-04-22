import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleRemove = (cartItemId: string, name: string) => {
    removeFromCart(cartItemId);
    addToast(`${name} removed from bag`, 'info');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold uppercase tracking-widest flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" /> Shopping Bag
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4 text-gray-200" strokeWidth={1} />
                  <p className="text-lg font-serif mb-2">Your bag is currently empty.</p>
                  <p className="text-sm font-light mb-8">Discover our new collections and find your next favorite piece.</p>
                  <Link 
                    to="/shop" 
                    onClick={() => setIsCartOpen(false)}
                    className="border border-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors text-black"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="flex gap-4">
                      {/* Item Image */}
                      <div className="w-24 h-32 bg-gray-50 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                            <button 
                              onClick={() => handleRemove(item.cartItemId, item.name)}
                              className="text-gray-400 hover:text-black transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm font-serif font-bold">${item.price.toFixed(2)}</p>
                          <p className="text-xs text-gray-500 mt-2 font-light">Size: {item.size}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 font-light">Color:</span>
                            <span className="block w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: item.color }}></span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 w-24 h-8 mt-4">
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <div className="flex-1 flex items-center justify-center text-xs font-medium">
                            {item.quantity}
                          </div>
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm uppercase tracking-widest font-medium text-gray-500">Subtotal</span>
                  <span className="text-2xl font-serif font-bold text-black">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-center text-gray-500 mb-6 font-light">
                  Tax and shipping calculated at checkout.
                </p>
                <div className="flex gap-4">
                  <Link 
                    to="/shop" 
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 flex items-center justify-center border border-black bg-white text-black h-12 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
                  >
                    View Bag
                  </Link>
                  <button 
                    onClick={handleCheckout}
                    className="flex-1 bg-black text-white h-12 flex items-center justify-center text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

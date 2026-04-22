import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

export default function OrderConfirmation() {
  const { clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Generate mock order number and clear cart
    setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase());
    clearCart();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-[80vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full text-center">
        <div className="flex justify-center mb-8 gap-4">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Order Confirmed</h1>
        
        <p className="text-gray-500 font-light text-lg mb-8">
          Thank you for your purchase! We've received your order and are getting it ready to ship.
        </p>

        <div className="bg-[#F9F9F8] p-8 border border-gray-100 mb-10 text-left">
          <div className="flex items-start gap-4 border-b border-gray-200 pb-6 mb-6">
            <Package className="w-6 h-6 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500 font-light mb-1 uppercase tracking-widest">Order Number</p>
              <p className="font-mono text-lg font-bold text-black">#{orderNumber}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="text-gray-500 font-light mb-1 uppercase tracking-widest">Status</p>
              <p className="font-medium text-black">Processing</p>
            </div>
            <div>
              <p className="text-gray-500 font-light mb-1 uppercase tracking-widest">Date</p>
              <p className="font-medium text-black">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 font-light">
              You will receive an email confirmation with tracking details once your item has dispatched.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/shop" 
            className="flex-1 max-w-[200px] flex items-center justify-center gap-2 border border-black bg-black text-white h-12 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors mx-auto"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

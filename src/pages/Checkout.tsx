import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ChevronRight, ShieldCheck, CreditCard, Lock } from 'lucide-react';

export default function Checkout() {
  const { items, cartTotal } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'United States',
    zipCode: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment with Stripe/PayPal etc.
    navigate('/order-confirmation');
  };

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 0 ? 15.00 : 0;
  const total = cartTotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Your bag is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">There's nothing to checkout yet. Explore our latest collections.</p>
        <Link to="/shop" className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-10 font-light">
          <Link to="/cart" className="hover:text-black transition-colors">Cart</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Checkout</span>
        </nav>

        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16">
          
          {/* Checkout Form */}
          <div className="w-full lg:w-3/5">
            <form onSubmit={handleSubmit}>
              
              {/* Contact Info */}
              <section className="mb-10">
                <h2 className="text-xl font-serif font-bold mb-6 border-b border-gray-100 pb-2">Contact Information</h2>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Email address</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                </div>
              </section>

              {/* Shipping Address */}
              <section className="mb-10">
                <h2 className="text-xl font-serif font-bold mb-6 border-b border-gray-100 pb-2">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">First name</label>
                    <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Last name</label>
                    <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Address</label>
                  <input type="text" id="address" name="address" required value={formData.address} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                </div>
                <div className="mb-4">
                  <label htmlFor="country" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Country/Region</label>
                  <select id="country" name="country" value={formData.country} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors bg-white">
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">City</label>
                    <input type="text" id="city" name="city" required value={formData.city} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">ZIP / Postal Code</label>
                    <input type="text" id="zipCode" name="zipCode" required value={formData.zipCode} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                </div>
              </section>

              {/* Payment Info */}
              <section className="mb-10">
                <h2 className="text-xl font-serif font-bold mb-6 border-b border-gray-100 pb-2 flex items-center justify-between">
                  Payment Details
                  <div className="flex gap-2">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                </h2>
                <div className="bg-gray-50 border border-gray-200 p-6">
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Card number</label>
                    <input type="text" id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" required value={formData.cardNumber} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors bg-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expDate" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Expiration date (MM/YY)</label>
                      <input type="text" id="expDate" name="expDate" placeholder="MM/YY" required value={formData.expDate} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors bg-white" />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Security code</label>
                      <input type="text" id="cvv" name="cvv" placeholder="CVV" required value={formData.cvv} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors bg-white" />
                    </div>
                  </div>
                </div>
              </section>

              <button type="submit" className="w-full bg-black text-white h-14 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                <ShieldCheck className="w-4 h-4" /> Pay ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gray-50 p-6 lg:p-8 sticky top-28">
              <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border border-gray-200" />
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500 font-light mt-1">{item.size} / <span className="inline-block w-2 h-2 rounded-full border border-gray-300 ml-1" style={{ backgroundColor: item.color }}></span></p>
                    </div>
                    <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-6">
                  <span className="text-gray-500">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 text-lg font-serif">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-black">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

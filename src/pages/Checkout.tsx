import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ShieldCheck, CreditCard, Lock, Wallet, FileText, Smartphone } from 'lucide-react';

export default function Checkout() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { items, cartTotal } = useCart();
  const { content, updateContent } = useContent();
  const navigate = useNavigate();
  
  const paymentSettings = content.paymentSettings || {
    cashOnDeliveryEnabled: true,
    walletTransferEnabled: false,
    wallets: [],
    instapayEnabled: false,
    instapayAccounts: []
  };

  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'cod' | 'wallet' | 'instapay'>('credit');
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [selectedWalletId, setSelectedWalletId] = useState<string>('');
  const [selectedInstapayId, setSelectedInstapayId] = useState<string>('');

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
    // Create new order
    const newOrder: any = {
      id: `#ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      customer: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: items.reduce((acc, item) => acc + item.quantity, 0),
      total: total,
      shippingCost: shipping,
      status: 'Pending',
      paymentMethod: paymentMethod === 'cod' ? 'COD' : paymentMethod === 'wallet' ? 'Wallet' : paymentMethod === 'instapay' ? 'InstaPay' : 'Card',
      paymentStatus: 'Pending',
      paymentAccountName: paymentMethod === 'wallet' ? content.paymentSettings?.wallets?.find(w => w.id === selectedWalletId)?.name : paymentMethod === 'instapay' ? content.paymentSettings?.instapayAccounts?.find(a => a.id === selectedInstapayId)?.name : undefined,
      paymentAccountNumber: paymentMethod === 'wallet' ? content.paymentSettings?.wallets?.find(w => w.id === selectedWalletId)?.number : paymentMethod === 'instapay' ? content.paymentSettings?.instapayAccounts?.find(a => a.id === selectedInstapayId)?.address : undefined,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.country} ${formData.zipCode}`,
      cartItems: items.map(cItem => {
        const prod = content.products?.find(p => p.id === cItem.productId);
        return {
          id: cItem.id,
          productId: cItem.productId,
          name: prod?.name || 'Unknown Product',
          price: prod?.price || 0,
          quantity: cItem.quantity,
          size: cItem.size,
          color: cItem.color
        };
      })
    };

    updateContent({
      ...content,
      orders: [newOrder, ...(content.orders || [])]
    });

    // Mock Email Service
    console.log(`[MOCK EMAIL SERVICE] Sending Order Confirmation to: ${formData.email}`);
    alert(`Order Confirmation email sent to ${formData.email} (Mock Service).`);

    navigate('/order-confirmation');
  };

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 0 ? items.reduce((maxRate, item) => {
    const product = content.products?.find(p => p.id === item.productId);
    let itemRate = 15.00; // fallback default
    if (product?.shippingPlanId && content.shippingPlans) {
      const plan = content.shippingPlans.find(sp => sp.id === product.shippingPlanId);
      if (plan) itemRate = plan.rate;
    }
    return Math.max(maxRate, itemRate);
  }, 0) : 0;
  const total = cartTotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className={`pt-32 pb-20 min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center ${currentLang === 'ar' ? 'font-arabic' : ''}`}>
        <h1 className="text-3xl font-serif font-bold mb-4">{t('checkout.bag_empty', 'Your bag is empty')}</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">{t('checkout.nothing_here', "There's nothing to checkout yet. Explore our latest collections.")}</p>
        <Link to="/shop" className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
          {t('checkout.return_shop', 'Return to Shop')}
        </Link>
      </div>
    );
  }

  return (
    <div className={`pt-24 pb-20 bg-white min-h-screen ${currentLang === 'ar' ? 'font-arabic text-right' : ''}`}>
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-10 font-light">
          <Link to="/cart" className="hover:text-black transition-colors">{t('header.results', 'Cart')}</Link>
          <ChevronRight className={`w-4 h-4 mx-2 ${currentLang === 'ar' ? 'rotate-180' : ''}`} />
          <span className="text-gray-900 font-medium">{t('checkout.title', 'Checkout')}</span>
        </nav>

        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16">
          
          {/* Checkout Form */}
          <div className="w-full lg:w-3/5">
            <form onSubmit={handleSubmit}>
              
              {/* Contact Info */}
              <section className="mb-10">
                <h2 className="text-xl font-serif font-bold mb-6 border-b border-gray-100 pb-2">{t('checkout.contact_info', 'Contact Information')}</h2>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.email', 'Email address')}</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                </div>
              </section>

              {/* Shipping Address */}
              <section className="mb-10">
                <h2 className="text-xl font-serif font-bold mb-6 border-b border-gray-100 pb-2">{t('checkout.shipping_address', 'Shipping Address')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.first_name', 'First name')}</label>
                    <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.last_name', 'Last name')}</label>
                    <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.address', 'Address')}</label>
                  <input type="text" id="address" name="address" required value={formData.address} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                </div>
                <div className="mb-4">
                  <label htmlFor="country" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.country', 'Country/Region')}</label>
                  <select id="country" name="country" value={formData.country} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors bg-white">
                    <option value="United States">{currentLang === 'ar' ? 'الولايات المتحدة' : 'United States'}</option>
                    <option value="Canada">{currentLang === 'ar' ? 'كندا' : 'Canada'}</option>
                    <option value="United Kingdom">{currentLang === 'ar' ? 'المملكة المتحدة' : 'United Kingdom'}</option>
                    <option value="Australia">{currentLang === 'ar' ? 'أستراليا' : 'Australia'}</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.city', 'City')}</label>
                    <input type="text" id="city" name="city" required value={formData.city} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.postal_code', 'ZIP / Postal Code')}</label>
                    <input type="text" id="zipCode" name="zipCode" required value={formData.zipCode} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                </div>
              </section>

              {/* Payment Info */}
              <section className="mb-10">
                <h2 className="text-xl font-serif font-bold mb-6 border-b border-gray-100 pb-2 flex items-center justify-between">
                  {t('checkout.payment', 'Payment Details')}
                  <div className="flex gap-2">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                </h2>
                
                <div className="space-y-4">
                  {/* Credit Card Option */}
                  <div className={`border rounded-lg ${paymentMethod === 'credit' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                    <label className="flex items-center gap-3 p-4 cursor-pointer">
                      <input type="radio" name="paymentMethod" value="credit" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} className="w-4 h-4 text-black focus:ring-black" />
                      <span className="font-medium text-gray-900 flex-1">{t('checkout.credit_card', 'Credit Card')}</span>
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </label>
                    {paymentMethod === 'credit' && (
                      <div className="p-4 pt-0 border-t border-gray-200 mt-2">
                        <div className="mb-4 text-left rtl:text-right mt-4">
                          <label htmlFor="cardNumber" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.card_num', 'Card number')}</label>
                          <input type="text" id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" required={paymentMethod === 'credit'} value={formData.cardNumber} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors bg-white" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left rtl:text-right">
                          <div>
                            <label htmlFor="expDate" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.exp_date', 'Expiration date (MM/YY)')}</label>
                            <input type="text" id="expDate" name="expDate" placeholder="MM/YY" required={paymentMethod === 'credit'} value={formData.expDate} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors bg-white" />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.cvv', 'Security code (CVV)')}</label>
                            <input type="text" id="cvv" name="cvv" placeholder="CVV" required={paymentMethod === 'credit'} value={formData.cvv} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors bg-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash On Delivery Option */}
                  {paymentSettings.cashOnDeliveryEnabled && (
                    <div className={`border rounded-lg ${paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                      <label className="flex items-center gap-3 p-4 cursor-pointer">
                        <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-black focus:ring-black" />
                        <span className="font-medium text-gray-900 flex-1">{t('checkout.cod', 'Cash on Delivery')}</span>
                        <FileText className="w-5 h-5 text-gray-400" />
                      </label>
                      {paymentMethod === 'cod' && (
                        <div className="p-4 pt-0 border-t border-gray-200 mt-2">
                          <p className="text-sm text-gray-500 mt-4">{t('checkout.cod_desc', 'Pay in cash upon receiving your order.')}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Wallet Transfer Option */}
                  {paymentSettings.walletTransferEnabled && paymentSettings.wallets && paymentSettings.wallets.length > 0 && (
                    <div className={`border rounded-lg ${paymentMethod === 'wallet' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                      <label className="flex items-center gap-3 p-4 cursor-pointer">
                        <input type="radio" name="paymentMethod" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="w-4 h-4 text-black focus:ring-black" />
                        <span className="font-medium text-gray-900 flex-1">{t('checkout.wallet_transfer', 'Wallet Transfer')}</span>
                        <Wallet className="w-5 h-5 text-gray-400" />
                      </label>
                      {paymentMethod === 'wallet' && (
                        <div className="p-4 pt-0 border-t border-gray-200 mt-2">
                          <p className="text-sm text-gray-500 mt-4 mb-4">{t('checkout.wallet_instructions', 'Please transfer the total amount to one of the following mobile wallets, then upload a screenshot of your transfer receipt.')}</p>
                          <div className="grid gap-3 mb-6">
                            {paymentSettings.wallets.map(w => (
                              <label key={w.id} className={`bg-white border p-3 rounded-md flex justify-between items-center cursor-pointer transition-colors ${selectedWalletId === w.id ? 'border-black ring-1 ring-black' : 'border-gray-200'}`}>
                                <div className="flex items-center gap-3">
                                  <input type="radio" required={paymentMethod === 'wallet'} name="selectedWallet" value={w.id} checked={selectedWalletId === w.id} onChange={() => setSelectedWalletId(w.id)} className="w-4 h-4 text-black focus:ring-black" />
                                  <span className="font-medium text-sm text-gray-900">{w.name}</span>
                                </div>
                                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{w.number}</span>
                              </label>
                            ))}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.upload_receipt', 'Upload Transfer Receipt')}</label>
                            <input type="file" accept="image/*" required={paymentMethod === 'wallet'} onChange={(e) => setReceiptImage(e.target.files ? e.target.files[0] : null)} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors bg-white text-sm" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* InstaPay Option */}
                  {paymentSettings.instapayEnabled && paymentSettings.instapayAccounts && paymentSettings.instapayAccounts.length > 0 && (
                    <div className={`border rounded-lg ${paymentMethod === 'instapay' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                      <label className="flex items-center gap-3 p-4 cursor-pointer">
                        <input type="radio" name="paymentMethod" value="instapay" checked={paymentMethod === 'instapay'} onChange={() => setPaymentMethod('instapay')} className="w-4 h-4 text-black focus:ring-black" />
                        <span className="font-medium text-gray-900 flex-1">{t('checkout.instapay_transfer', 'InstaPay Transfer')}</span>
                        <Smartphone className="w-5 h-5 text-gray-400" />
                      </label>
                      {paymentMethod === 'instapay' && (
                        <div className="p-4 pt-0 border-t border-gray-200 mt-2">
                          <p className="text-sm text-gray-500 mt-4 mb-4">{t('checkout.instapay_instructions', 'Please transfer the total amount using InstaPay to one of the following accounts, then upload a screenshot of your transfer receipt.')}</p>
                          <div className="grid gap-3 mb-6">
                            {paymentSettings.instapayAccounts.map(a => (
                              <label key={a.id} className={`bg-white border p-3 rounded-md flex justify-between items-center cursor-pointer transition-colors ${selectedInstapayId === a.id ? 'border-black ring-1 ring-black' : 'border-gray-200'}`}>
                                <div className="flex items-center gap-3">
                                  <input type="radio" required={paymentMethod === 'instapay'} name="selectedInstapay" value={a.id} checked={selectedInstapayId === a.id} onChange={() => setSelectedInstapayId(a.id)} className="w-4 h-4 text-black focus:ring-black" />
                                  <span className="font-medium text-sm text-gray-900">{a.name}</span>
                                </div>
                                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{a.address}</span>
                              </label>
                            ))}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('checkout.upload_receipt', 'Upload Transfer Receipt')}</label>
                            <input type="file" accept="image/*" required={paymentMethod === 'instapay'} onChange={(e) => setReceiptImage(e.target.files ? e.target.files[0] : null)} className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black transition-colors bg-white text-sm" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>

              <button type="submit" className="w-full bg-black text-white h-14 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                <ShieldCheck className="w-4 h-4" /> {t('checkout.place_order', 'Place Order')} (${total.toFixed(2)})
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gray-50 p-6 lg:p-8 sticky top-28">
              <h2 className="text-xl font-serif font-bold mb-6">{t('checkout.summary', 'Order Summary')}</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 rtl:pr-0 rtl:pl-2">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border border-gray-200" />
                      <span className={`absolute -top-2 ${currentLang === 'ar' ? '-left-2' : '-right-2'} bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold`}>
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
                  <span className="text-gray-500">{t('checkout.subtotal', 'Subtotal')}</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('checkout.shipping', 'Shipping')}</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-6">
                  <span className="text-gray-500">{t('tax', 'Estimated Tax')}</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 text-lg font-serif">
                  <span className="font-bold text-gray-900">{t('checkout.total', 'Total')}</span>
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

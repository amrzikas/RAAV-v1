import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, ChevronRight, Star, Truck, RefreshCw, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';

const defaultProductPlaceholder = {
  id: 0,
  name: 'Refined Editor Collection Piece',
  price: 295.00,
  category: 'Exclusive',
  image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80',
  colors: ['#000000', '#F5F5DC', '#556B2F'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  description: 'Meticulously crafted with unparalleled attention to detail. This piece represents the perfect equilibrium between modern aesthetics and timeless wearability. Elevate your wardrobe instantly.'
};

export default function ProductDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { content, updateContent } = useContent();
  const { user } = useAuth();
  const products = content.products || [];

  const product = useMemo(() => {
    const found = products.find(p => p.id === Number(id));
    return found || defaultProductPlaceholder;
  }, [id, products]);

  const productName = product.translations?.[currentLang]?.name || product.name;
  const productDescription = product.translations?.[currentLang]?.description || product.description || defaultProductPlaceholder.description;
  const productComposition = product.translations?.[currentLang]?.composition || product.composition || "We source only the finest sustainable materials to ensure longevity and minimal environmental impact.";
  const productCare = product.translations?.[currentLang]?.care || product.care || "To maintain the exceptional quality of this piece, please observe the following care instructions.";

  const galleryImages = [
    "?auto=format&fit=crop&w=1200&q=80",
    "?auto=format&fit=crop&w=1200&q=80&sat=-100", 
    "?auto=format&fit=crop&w=1200&q=80&con=2",
  ];
  
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#000000');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: productName,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    });
  };

  const isWished = isInWishlist(product.id);

  // Parse out the base URL of the image to apply simulated gallery queries
  const baseImageUrl = product.image.split('?')[0];

  const shippingPlan = useMemo(() => {
    if (product.shippingPlanId) {
      return content.shippingPlans?.find(p => p.id === product.shippingPlanId);
    }
    return null;
  }, [product.shippingPlanId, content.shippingPlans]);

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-10 font-light">
          <Link to="/" className="hover:text-black transition-colors">{t('home', 'Home')}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/shop" className="hover:text-black transition-colors">{t('shop', 'Shop')}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 flex-shrink-0 hide-scrollbar pb-2 md:pb-0">
              {galleryImages.map((query, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-[3/4] overflow-hidden border-2 transition-all flex-shrink-0 w-20 md:w-full ${activeImage === idx ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={`${baseImageUrl}${query}`} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            <div className="relative aspect-[3/4] md:aspect-[4/5] bg-gray-50 flex-grow overflow-hidden cursor-zoom-in">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={`${baseImageUrl}${galleryImages[activeImage]}`} 
                  alt={productName} 
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-gray-500">{product.category}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
                <span className="text-xs text-gray-500 ml-1 font-medium">(128)</span>
              </div>
            </div>
            
            <h1 className={`text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 ${currentLang === 'ar' ? 'font-arabic' : ''}`}>{productName}</h1>
            <p className="text-2xl font-serif text-gray-900 mb-8 border-b border-gray-100 pb-8">${product.price.toFixed(2)}</p>

            <p className={`text-gray-600 font-light leading-relaxed mb-8 ${currentLang === 'ar' ? 'font-arabic' : ''}`}>
              {productDescription}
            </p>

            {/* Selectors */}
            <div className="mb-8 border-b border-gray-100 pb-8 space-y-6">
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium uppercase tracking-widest text-gray-900">{t('color', 'Color')}</span>
                </div>
                <div className="flex gap-3">
                  {(product.colors || defaultProductPlaceholder.colors).map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'border-gray-900 scale-110' : 'border-transparent shadow-sm'}`}
                      style={{ backgroundColor: color }}
                      aria-label="Select color"
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium uppercase tracking-widest text-gray-900">{t('size', 'Size')}</span>
                  <a href="#" className="text-xs text-gray-500 font-light hover:text-black underline transition-colors">{t('size_guide', 'Size Guide')}</a>
                </div>
                <div className="flex flex-wrap gap-3">
                  {(product.sizes || defaultProductPlaceholder.sizes).map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border flex items-center justify-center text-sm transition-all ${
                        selectedSize === size 
                          ? 'border-black bg-black text-white font-medium' 
                          : 'border-gray-200 text-gray-600 hover:border-black font-light'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-gray-200 h-14 w-full sm:w-32 flex-shrink-0">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Minus className="w-4 h-4" /></button>
                <div className="flex-grow flex items-center justify-center text-sm font-medium">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-black text-white h-14 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
               >
                <ShoppingBag className="w-4 h-4" /> {t('add_to_bag', 'Add to Bag')}
              </button>
              <button 
                onClick={() => toggleWishlist({ productId: product.id, name: productName, price: product.price, image: product.image, category: product.category })}
                className={`border border-gray-200 h-14 w-14 flex items-center justify-center transition-colors flex-shrink-0 ${isWished ? 'text-red-500 hover:border-red-200' : 'text-gray-600 hover:border-black hover:text-black'}`}
              >
                <Heart className="w-5 h-5" fill={isWished ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Features list */}
            <div className="flex flex-col gap-4 mb-10 bg-gray-50 p-6">
              <div className="flex items-start gap-4">
                <Truck className="w-5 h-5 text-black flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm border-b border-black inline-block font-medium mb-1 cursor-pointer">
                    {shippingPlan ? `${shippingPlan.name} ($${shippingPlan.rate.toFixed(2)})` : t('free_shipping', 'Free Standard Shipping')}
                  </p>
                  <p className="text-xs text-gray-500 font-light">{t('delivery_estimate', 'Estimated delivery within 3-5 business days')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <RefreshCw className="w-5 h-5 text-black flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium mb-1">{t('easy_returns', 'Easy 30-Day Returns')}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex gap-8 mb-6 border-b border-gray-100">
                {['details', 'composition', 'care'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium uppercase tracking-widest transition-colors ${
                      activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {t(`tab_${tab}`, tab)}
                  </button>
                ))}
              </div>
              
              <div className="min-h-[120px] text-gray-600 font-light text-sm leading-relaxed">
                <AnimatePresence mode="wait">
                  {activeTab === 'details' && (
                    <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="mb-3 whitespace-pre-line">{productDescription}</p>
                    </motion.div>
                  )}
                  {activeTab === 'composition' && (
                    <motion.div key="comp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="mb-3 whitespace-pre-line">{productComposition}</p>
                    </motion.div>
                  )}
                  {activeTab === 'care' && (
                    <motion.div key="care" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="mb-3 whitespace-pre-line">{productCare}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl mt-24">
        <h2 className="text-2xl font-serif font-bold mb-10 text-center border-b border-gray-100 pb-4">{t('customer_reviews', 'Customer Reviews')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(product.reviews || []).map((review, i) => (
            <div key={i} className="bg-gray-50 p-6 border border-gray-100">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, idx) => (
                  <span key={idx} className={`text-xl ${idx < review.rating ? 'text-black' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <p className="text-gray-600 font-light text-sm italic mb-4 leading-relaxed">"{review.text}"</p>
              <div className="flex justify-between items-center mt-auto text-xs uppercase tracking-widest text-gray-400 font-bold">
                <span>{review.user}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
          {(!product.reviews || product.reviews.length === 0) && (
            <div className="col-span-3 text-center text-gray-500 font-light py-8">
              No reviews yet. Be the first to review this product!
            </div>
          )}
        </div>

        {/* Add Review Form */}
        <div className="mt-16 max-w-2xl mx-auto bg-gray-50 p-6 border border-gray-100">
          <h3 className="text-lg font-serif font-bold mb-4 text-center">Write a Review</h3>
          {user ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem('reviewerName') as HTMLInputElement).value;
              const text = (form.elements.namedItem('reviewText') as HTMLTextAreaElement).value;
              const rating = parseInt((form.elements.namedItem('reviewRating') as HTMLSelectElement).value);

              if (!name || !text) return;

              const newReview = {
                id: Date.now().toString(),
                user: name,
                rating,
                text,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
              };

              const updatedProducts = content.products.map(p => 
                p.id === product.id ? { ...p, reviews: [...(p.reviews || []), newReview] } : p
              );

              updateContent({ ...content, products: updatedProducts });
              form.reset();
            }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Your Name</label>
                  <input required name="reviewerName" type="text" defaultValue={user.email.split('@')[0]} className="w-full px-4 py-2 border border-gray-200 outline-none focus:border-black text-sm bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Rating</label>
                  <select name="reviewRating" className="w-full px-4 py-2 border border-gray-200 outline-none focus:border-black text-sm bg-white">
                    <option value="5">★★★★★ (5/5)</option>
                    <option value="4">★★★★☆ (4/5)</option>
                    <option value="3">★★★☆☆ (3/5)</option>
                    <option value="2">★★☆☆☆ (2/5)</option>
                    <option value="1">★☆☆☆☆ (1/5)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Your Review</label>
                <textarea required name="reviewText" rows={4} className="w-full px-4 py-2 border border-gray-200 outline-none focus:border-black text-sm bg-white resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                Submit Review
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4 text-sm font-light">You must be logged in to leave a review.</p>
              <Link to="/auth" className="inline-block bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* You Might Also Like */}
      {products.filter(p => p.category === product.category && p.id !== product.id).length > 0 && (
        <div className="container mx-auto px-4 md:px-6 max-w-6xl mt-32 border-t border-gray-100 pt-20">
          <h2 className="text-2xl font-serif font-bold mb-10 text-center">{t('you_might_also_like', 'You Might Also Like')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => {
                 const relName = relatedProduct.translations?.[currentLang]?.name || relatedProduct.name;
                 return (
                  <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="group">
                    <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-4 relative">
                      <img 
                        src={relatedProduct.image} 
                        alt={relName} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <h3 className={`text-sm font-medium mb-1 group-hover:text-gray-500 transition-colors line-clamp-1 ${currentLang === 'ar' ? 'font-arabic' : ''}`}>{relName}</h3>
                    <p className="text-gray-500 text-sm">${relatedProduct.price.toFixed(2)}</p>
                  </Link>
                );
              })}
          </div>
        </div>
      )}

    </div>
  );
}

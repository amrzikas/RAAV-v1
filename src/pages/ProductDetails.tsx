import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, ChevronRight, Star, Truck, RefreshCw, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// Centralized mock data for the product details to simulate a database query
const productDatabase = {
  1: { name: 'Silk Slip Dress', price: 189.00, category: 'Dresses', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=80' },
  2: { name: 'Oversized Wool Blazer', price: 245.00, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1604473855581-2c9ff50fe2ba?w=1200&auto=format&fit=crop&q=80' },
  3: { name: 'Linen Button-Up', price: 95.00, category: 'Tops', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=1200&auto=format&fit=crop&q=80' },
  4: { name: 'Leather Crossbody Kit', price: 320.00, category: 'Accessories', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&auto=format&fit=crop&q=80' },
  5: { name: 'Minimalist Loafers', price: 155.00, category: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&auto=format&fit=crop&q=80' },
  6: { name: 'High-Rise Trousers', price: 140.00, category: 'Pants', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&auto=format&fit=crop&q=80' },
  7: { name: 'Knit Sweater', price: 120.00, category: 'Men', image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=1200&auto=format&fit=crop&q=80' },
  8: { name: 'Casual T-Shirt', price: 45.00, category: 'Men', image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1200&auto=format&fit=crop&q=80' },
};

const defaultProduct = {
  name: 'Refined Editor Collection Piece',
  price: 295.00,
  category: 'Exclusive',
  image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80'
};

const galleryImages = [
  "?auto=format&fit=crop&w=1200&q=80",
  "?auto=format&fit=crop&w=1200&q=80&sat=-100", // simulated variation
  "?auto=format&fit=crop&w=1200&q=80&con=2", // simulated variation
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = ['#000000', '#F5F5DC', '#556B2F'];

export default function ProductDetails() {
  const { id } = useParams();
  const productInfo = productDatabase[id as keyof typeof productDatabase] || defaultProduct;
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart({
      productId: id || 'default',
      name: productInfo.name,
      price: productInfo.price,
      image: productInfo.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    });
  };

  const currentProductId = id || 'default';
  const isWished = isInWishlist(currentProductId);

  // Parse out the base URL of the image to apply simulated gallery queries
  const baseImageUrl = productInfo.image.split('?')[0];

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-10 font-light">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">{productInfo.category}</span>
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
                  alt={productInfo.name} 
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-gray-500">{productInfo.category}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-black text-black" />
                <Star className="w-4 h-4 fill-black text-black" />
                <Star className="w-4 h-4 fill-black text-black" />
                <Star className="w-4 h-4 fill-black text-black" />
                <Star className="w-4 h-4 fill-black text-black" />
                <span className="text-xs text-gray-500 ml-1 font-medium">(128)</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{productInfo.name}</h1>
            <p className="text-2xl font-serif text-gray-900 mb-8 border-b border-gray-100 pb-8">${productInfo.price.toFixed(2)}</p>

            <p className="text-gray-600 font-light leading-relaxed mb-8">
              Meticulously crafted with unparalleled attention to detail. This piece represents the perfect equilibrium between modern aesthetics and timeless wearability. Elevate your wardrobe instantly.
            </p>

            {/* Selectors */}
            <div className="mb-8 border-b border-gray-100 pb-8 space-y-6">
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium uppercase tracking-widest text-gray-900">Color</span>
                </div>
                <div className="flex gap-3">
                  {colors.map(color => (
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
                  <span className="text-sm font-medium uppercase tracking-widest text-gray-900">Size</span>
                  <a href="#" className="text-xs text-gray-500 font-light hover:text-black underline transition-colors">Size Guide</a>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map(size => (
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
                <ShoppingBag className="w-4 h-4" /> Add to Bag
              </button>
              <button 
                onClick={() => toggleWishlist({ productId: currentProductId, name: productInfo.name, price: productInfo.price, image: productInfo.image, category: productInfo.category })}
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
                  <p className="text-sm border-b border-black inline-block font-medium mb-1 cursor-pointer">Free Standard Shipping</p>
                  <p className="text-xs text-gray-500 font-light">Estimated delivery within 3-5 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <RefreshCw className="w-5 h-5 text-black flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium mb-1">Easy 30-Day Returns</p>
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
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="min-h-[120px] text-gray-600 font-light text-sm leading-relaxed">
                <AnimatePresence mode="wait">
                  {activeTab === 'details' && (
                    <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="mb-3">A signature piece in our latest collection. Designed with a draped, relaxed silhouette that flatters the wearer while providing unparalleled comfort. Includes side slip pockets and a concealed closure.</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Relaxed, contemporary fit</li>
                        <li>Concealed fastening</li>
                        <li>Ethically produced</li>
                      </ul>
                    </motion.div>
                  )}
                  {activeTab === 'composition' && (
                    <motion.div key="comp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="mb-3">We source only the finest sustainable materials to ensure longevity and minimal environmental impact.</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Main: 100% Organic Material</li>
                        <li>Lining: 100% Recycled Cupro</li>
                        <li>Designed in Milan, Handcrafted in Portugal</li>
                      </ul>
                    </motion.div>
                  )}
                  {activeTab === 'care' && (
                    <motion.div key="care" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="mb-3">To maintain the exceptional quality of this piece, please observe the following care instructions:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Dry clean only</li>
                        <li>Do not bleach</li>
                        <li>Cool iron on reverse</li>
                        <li>Store correctly on a premium hanger</li>
                      </ul>
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
        <h2 className="text-2xl font-serif font-bold mb-10 text-center border-b border-gray-100 pb-4">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah M.", date: "Oct 12, 2026", text: "Absolutely stunning piece. The quality of the fabric is exceptional and the fit is remarkably flattering. Worth every penny.", stars: 5 },
            { name: "Elena R.", date: "Sep 28, 2026", text: "I've received so many compliments wearing this. It's versatile enough for the office and elegant enough for evening wear. Sizing was perfect.", stars: 5 },
            { name: "Jessica T.", date: "Sep 15, 2026", text: "Beautiful design and great structure. Would highly recommend this brand to anyone looking for refined staples.", stars: 4 }
          ].map((review, i) => (
            <div key={i} className="bg-[#F9F9F8] p-6 border border-gray-100">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, idx) => (
                  <span key={idx} className={`text-sm ${idx < review.stars ? 'text-black' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <p className="text-gray-600 font-light text-sm italic mb-4 leading-relaxed">"{review.text}"</p>
              <div className="flex justify-between items-center mt-auto text-xs uppercase tracking-widest text-gray-400 font-bold">
                <span>{review.name}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* You Might Also Like */}
      {products.filter(p => p.category === productInfo.category && p.id !== currentProductId).length > 0 && (
        <div className="container mx-auto px-4 md:px-6 max-w-6xl mt-32 border-t border-gray-100 pt-20">
          <h2 className="text-2xl font-serif font-bold mb-10 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {products
              .filter(p => p.category === productInfo.category && p.id !== currentProductId)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="group">
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-4 relative">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <h3 className="text-sm font-medium mb-1 group-hover:text-gray-500 transition-colors line-clamp-1">{relatedProduct.name}</h3>
                  <p className="text-gray-500 text-sm">${relatedProduct.price.toFixed(2)}</p>
                </Link>
              ))}
          </div>
        </div>
      )}

    </div>
  );
}

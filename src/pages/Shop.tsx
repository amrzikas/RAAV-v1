import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Eye, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const categories = ['All', 'Dresses', 'Tops', 'Outerwear', 'Pants', 'Accessories', 'Shoes'];
const colorsList = ['Black', 'White', 'Beige', 'Navy', 'Olive', 'Burgundy'];
const sizesList = ['XS', 'S', 'M', 'L', 'XL'];

const products = [
  { id: 1, name: 'Silk Slip Dress', price: 189.00, category: 'Dresses', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80', colors: ['White', 'Beige'], sizes: ['S', 'M', 'L'] },
  { id: 2, name: 'Oversized Wool Blazer', price: 245.00, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1604473855581-2c9ff50fe2ba?w=600&auto=format&fit=crop&q=80', colors: ['Black', 'Olive'], sizes: ['M', 'L', 'XL'] },
  { id: 3, name: 'Linen Button-Up', price: 95.00, category: 'Tops', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&auto=format&fit=crop&q=80', colors: ['White', 'Navy'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 4, name: 'Leather Crossbody Kit', price: 320.00, category: 'Accessories', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80', colors: ['Black', 'Burgundy'], sizes: ['M'] },
  { id: 5, name: 'Minimalist Loafers', price: 155.00, category: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80', colors: ['Black', 'Beige'], sizes: ['M', 'L', 'XL'] },
  { id: 6, name: 'High-Rise Trousers', price: 140.00, category: 'Pants', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80', colors: ['Navy', 'Black'], sizes: ['S', 'M', 'L'] },
  { id: 7, name: 'Cashmere V-Neck Sweater', price: 180.00, category: 'Tops', image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&auto=format&fit=crop&q=80', colors: ['Beige', 'Burgundy'], sizes: ['S', 'M'] },
  { id: 8, name: 'Ribbed Knit Tank', price: 45.00, category: 'Tops', image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&auto=format&fit=crop&q=80', colors: ['White', 'Black', 'Olive'], sizes: ['XS', 'S', 'M'] },
  { id: 9, name: 'Denim Midi Skirt', price: 115.00, category: 'Pants', image: 'https://images.unsplash.com/photo-1583496922786-2580798e4f50?w=600&auto=format&fit=crop&q=80', colors: ['Navy'], sizes: ['S', 'M', 'L'] },
  { id: 10, name: 'Classic Trench Coat', price: 295.00, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&auto=format&fit=crop&q=80', colors: ['Beige', 'Black'], sizes: ['M', 'L', 'XL'] },
  { id: 11, name: 'Gold Chain Necklace', price: 85.00, category: 'Accessories', image: 'https://images.unsplash.com/photo-1599643478524-fb66f45bc569?w=600&auto=format&fit=crop&q=80', colors: ['White', 'Beige'], sizes: ['S'] },
  { id: 12, name: 'Satin Blouse', price: 135.00, category: 'Tops', image: 'https://images.unsplash.com/photo-1564222256577-45e728f2c611?w=600&auto=format&fit=crop&q=80', colors: ['Olive', 'White'], sizes: ['XS', 'S', 'M'] },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState('Featured');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Advanced Filter States
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Toggle Filters
  const togglePrice = (range: string) => {
    setSelectedPrices(prev => prev.includes(range) ? prev.filter(p => p !== range) : [...prev, range]);
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  // Apply Filters & Sorting
  const filteredProducts = useMemo(() => {
    let result = products;

    // Category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Price
    if (selectedPrices.length > 0) {
      result = result.filter(p => {
        return selectedPrices.some(range => {
          if (range === 'under50') return p.price < 50;
          if (range === '50-100') return p.price >= 50 && p.price <= 100;
          if (range === '100-200') return p.price > 100 && p.price <= 200;
          if (range === 'over200') return p.price > 200;
          return false;
        });
      });
    }

    // Colors
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors && p.colors.some(c => selectedColors.includes(c)));
    }

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes && p.sizes.some(s => selectedSizes.includes(s)));
    }

    // Sorting
    if (sortOption === 'Price: Low to High') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Newest') {
      result = [...result].sort((a, b) => b.id - a.id); // Mocking 'Newest' by ID descending
    }

    return result;
  }, [activeCategory, selectedPrices, selectedColors, selectedSizes, sortOption]);

  const handleQuickAdd = (product: any) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes ? product.sizes[0] : 'M', 
      color: product.colors ? product.colors[0] : '#000000', 
      quantity: 1
    });
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Shop Header */}
      <div className="bg-gray-50 py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 tracking-tight text-gray-900">The Collection</h1>
          <p className="text-gray-500 max-w-xl mx-auto font-light">Explore our entire catalogue of meticulously crafted pieces. Filter by standard categories or refine your search for the perfect addition to your wardrobe.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Mobile Filter & Sort Bar */}
          <div className="flex justify-between items-center lg:hidden mb-6 pb-4 border-b border-gray-200">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-black"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gray-500"
              >
                {sortOption} <ChevronDown className="w-4 h-4" />
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-xl z-20">
                  {['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                    <button 
                      key={option}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                      onClick={() => { setSortOption(option); setShowSortDropdown(false); }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Filters */}
          <div className={`w-full lg:w-1/4 flex-shrink-0 lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
            <div className="sticky top-32 pr-6">
              
              <div className="mb-10">
                <h3 className="text-lg font-serif font-bold mb-5 text-gray-900">Categories</h3>
                <ul className="space-y-3">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={`text-sm transition-colors w-full text-left flex justify-between items-center ${
                          activeCategory === category 
                            ? 'font-bold text-black' 
                            : 'font-light text-gray-500 hover:text-black'
                        }`}
                      >
                        {category}
                        {activeCategory === category && <Check className="w-4 h-4" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-serif font-bold mb-5 text-gray-900">Price</h3>
                <ul className="space-y-3">
                  <li>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={selectedPrices.includes('under50')} onChange={() => togglePrice('under50')} className="w-4 h-4 accent-black" />
                      <span className="text-sm font-light text-gray-600">Under $50</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={selectedPrices.includes('50-100')} onChange={() => togglePrice('50-100')} className="w-4 h-4 accent-black" />
                      <span className="text-sm font-light text-gray-600">$50 - $100</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={selectedPrices.includes('100-200')} onChange={() => togglePrice('100-200')} className="w-4 h-4 accent-black" />
                      <span className="text-sm font-light text-gray-600">$100 - $200</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={selectedPrices.includes('over200')} onChange={() => togglePrice('over200')} className="w-4 h-4 accent-black" />
                      <span className="text-sm font-light text-gray-600">Over $200</span>
                    </label>
                  </li>
                </ul>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-serif font-bold mb-5 text-gray-900">Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {colorsList.map(color => (
                    <button 
                      key={color} 
                      onClick={() => toggleColor(color)}
                      className={`px-3 py-1 text-xs border transition-colors rounded-sm ${
                        selectedColors.includes(color)
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold mb-5 text-gray-900">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {sizesList.map(size => (
                    <button 
                      key={size} 
                      onClick={() => toggleSize(size)}
                      className={`w-10 h-10 border text-sm font-light transition-all flex items-center justify-center ${
                        selectedSizes.includes(size)
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            
            {/* Desktop Sort Bar */}
            <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <span className="text-sm text-gray-500 font-light">Showing {filteredProducts.length} results</span>
              <div className="relative">
                <button 
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-black"
                >
                  <span className="text-gray-400 font-light">Sort by:</span> {sortOption} <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 shadow-xl z-20">
                    {['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                      <button 
                        key={option}
                        className="block w-full text-left px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                        onClick={() => { setSortOption(option); setShowSortDropdown(false); }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-gray-500 text-lg font-light mb-4">No products found matching your filters.</p>
                <button 
                  onClick={() => {
                    setActiveCategory('All');
                    setSelectedPrices([]);
                    setSelectedColors([]);
                    setSelectedSizes([]);
                  }}
                  className="text-black uppercase tracking-widest text-sm font-bold border-b border-black pb-1"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="group relative"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                        <Link to={`/product/${product.id}`}>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </Link>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none"></div>
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <button 
                            onClick={() => handleQuickAdd(product)}
                            className="pointer-events-auto bg-white text-black p-3 hover:bg-black hover:text-white transition-colors shadow-lg rounded-full"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                          <Link to={`/product/${product.id}`} className="pointer-events-auto bg-white text-black p-3 hover:bg-black hover:text-white transition-colors shadow-lg rounded-full">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => toggleWishlist({ productId: product.id, name: product.name, price: product.price, image: product.image, category: product.category })}
                            className={`pointer-events-auto bg-white p-3 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors shadow-lg ${isInWishlist(product.id) ? 'text-red-500' : 'text-black'}`}
                          >
                            <Heart className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xs text-gray-400 mb-1 tracking-wider uppercase font-medium">{product.category}</h3>
                        <Link to={`/product/${product.id}`} className="block text-base text-gray-900 font-medium hover:text-gray-500 transition-colors mb-2">
                          {product.name}
                        </Link>
                        <p className="text-lg font-serif text-gray-900 font-bold">${product.price.toFixed(2)}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Pagination Placeholder */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 flex justify-center items-center gap-2">
                <button className="w-10 h-10 border border-gray-200 flex items-center justify-center text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-colors">1</button>
                <button className="w-10 h-10 flex items-center justify-center text-sm font-medium text-gray-500 hover:text-black transition-colors">2</button>
                <div className="w-10 h-10 flex items-center justify-center text-gray-500">...</div>
                <button className="px-4 text-sm font-bold uppercase tracking-widest text-black hover:text-gray-500 transition-colors">Next</button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

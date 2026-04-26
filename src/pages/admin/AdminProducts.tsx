import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Upload, X } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Product } from '../../types';

export default function AdminProducts() {
  const { content, updateContent } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Existing categories derived from dynamic data 
  const products = content.products || [];
  const initialCategories = Array.from(new Set(products.map(p => p.category)));
  const [categories, setCategories] = useState<string[]>(initialCategories);

  // Form states
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState(categories[0] || '');
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCustomCategory, setNewCustomCategory] = useState('');
  const [productTranslations, setProductTranslations] = useState<{ [locale: string]: { name: string, description: string, composition?: string, care?: string } }>({
    ar: { name: '', description: '', composition: '', care: '' }
  });
  const [editingFormLang, setEditingFormLang] = useState<'en' | 'ar'>('en');

  // New form states for additional fields
  const [productDetails, setProductDetails] = useState('');
  const [productComposition, setProductComposition] = useState('');
  const [productCare, setProductCare] = useState('');
  const [activeDetailsTab, setActiveDetailsTab] = useState<'description' | 'composition' | 'care'>('description');

  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  
  // Colors (simple hex text array for mock)
  const [newColor, setNewColor] = useState('#000000');
  const [colors, setColors] = useState<string[]>([]);
  
  // Sizes (simple text string array for mock)
  const [newSize, setNewSize] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [newShippingPlanId, setNewShippingPlanId] = useState<string>('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewCategory = () => {
    if (newCustomCategory.trim() && !categories.includes(newCustomCategory.trim())) {
      const added = newCustomCategory.trim();
      setCategories([...categories, added]);
      setNewProductCategory(added);
    }
    setIsAddingNewCategory(false);
    setNewCustomCategory('');
  };

  const resetForm = () => {
    setNewProductName('');
    setNewProductPrice('');
    setNewProductCategory(categories[0] || '');
    setProductDetails('');
    setProductComposition('');
    setProductCare('');
    setActiveDetailsTab('description');
    setImages([]);
    setColors([]);
    setSizes([]);
    setNewShippingPlanId('');
    setProductTranslations({ ar: { name: '', description: '', composition: '', care: '' } });
    setEditingFormLang('en');
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSaveProduct = () => {
    if (!newProductName || !newProductPrice) return;

    const productData: Product = {
      id: editingId || Date.now(),
      name: newProductName,
      price: parseFloat(newProductPrice),
      category: newProductCategory,
      image: images[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      colors: colors.length > 0 ? colors : ['Black'],
      sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L'],
      shippingPlanId: newShippingPlanId || undefined,
      description: productDetails,
      composition: productComposition,
      care: productCare,
      translations: productTranslations
    };

    let newProducts: Product[];
    if (editingId) {
      newProducts = products.map(p => p.id === editingId ? productData : p);
    } else {
      newProducts = [...products, productData];
    }

    updateContent({
      ...content,
      products: newProducts
    });

    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setNewProductName(product.name);
    setNewProductPrice(product.price.toString());
    setNewProductCategory(product.category);
    setProductDetails(product.description || '');
    setProductComposition(product.composition || '');
    setProductCare(product.care || '');
    setImages([product.image]); // Simplified for demo
    setColors(product.colors);
    setSizes(product.sizes);
    setNewShippingPlanId(product.shippingPlanId || '');
    setProductTranslations(product.translations || { ar: { name: '', description: '', composition: '', care: '' } });
    setIsAdding(true);
    setActiveDetailsTab('description');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      updateContent({
        ...content,
        products: products.filter(p => p.id !== id)
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && images.length < 5) {
      // In a real app we'd upload the file to a server here.
      // For mock, create a local object URL to display preview
      const files = Array.from(e.target.files);
      const newImages = files.slice(0, 5 - images.length).map((f: File) => URL.createObjectURL(f));
      setImages([...images, ...newImages]);
    }
    // reset input
    if (e.target) e.target.value = '';
  };
  
  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };
  
  const handleAddImageUrl = () => {
    if (newImageUrl.trim() && images.length < 5) {
      setImages([...images, newImageUrl.trim()]);
    }
    setNewImageUrl('');
  };
  
  const handleAddColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      setColors([...colors, newColor.trim()]);
    }
    setNewColor('#000000');
  };
  
  const removeColor = (colorToRemove: string) => {
    setColors(colors.filter(c => c !== colorToRemove));
  };
  
  const handleAddSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim().toUpperCase())) {
      setSizes([...sizes, newSize.trim().toUpperCase()]);
    }
    setNewSize('');
  };
  
  const removeSize = (sizeToRemove: string) => {
    setSizes(sizes.filter(s => s !== sizeToRemove));
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors bg-white text-sm"
          />
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          {isAdding ? 'Cancel' : <><Plus className="w-4 h-4" /> Add Product</>}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg font-serif font-bold text-gray-900">{editingId ? 'Edit Product' : 'Create New Product'}</h2>
            
            {/* Language Switcher for Product Content */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-md">
              <button 
                onClick={() => setEditingFormLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${editingFormLang === 'en' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                English
              </button>
              <button 
                onClick={() => setEditingFormLang('ar')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${editingFormLang === 'ar' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                العربية
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {editingFormLang === 'en' ? (
              <div>
                <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Product Name (EN)</label>
                <input 
                  type="text" 
                  placeholder="Product Name" 
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2 text-right">اسم المنتج (العربية)</label>
                <input 
                  type="text" 
                  dir="rtl"
                  placeholder="اسم المنتج" 
                  value={productTranslations.ar.name}
                  onChange={(e) => setProductTranslations({ ...productTranslations, ar: { ...productTranslations.ar, name: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm text-right font-arabic" 
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Price ($)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
               <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Category</label>
               {!isAddingNewCategory ? (
                 <select 
                   value={newProductCategory}
                   onChange={(e) => {
                     if (e.target.value === 'ADD_NEW') {
                       setIsAddingNewCategory(true);
                     } else {
                       setNewProductCategory(e.target.value);
                     }
                   }}
                   className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm bg-white"
                 >
                   {categories.map(cat => (
                     <option key={cat} value={cat}>{cat}</option>
                   ))}
                   <option value="ADD_NEW" className="font-bold text-black border-t border-gray-100">+ Add New Category...</option>
                 </select>
               ) : (
                 <div className="flex gap-2">
                   <input 
                     type="text" 
                     placeholder="New Category Name" 
                     value={newCustomCategory}
                     onChange={(e) => setNewCustomCategory(e.target.value)}
                     className="flex-1 px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                   />
                   <button 
                     type="button"
                     onClick={handleAddNewCategory}
                     className="bg-black text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
                   >
                     Save
                   </button>
                   <button 
                     type="button"
                     onClick={() => setIsAddingNewCategory(false)}
                     className="bg-gray-100 text-gray-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
                   >
                     Cancel
                   </button>
                 </div>
               )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Shipping Plan</label>
              <select 
                value={newShippingPlanId}
                onChange={(e) => setNewShippingPlanId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm bg-white"
              >
                <option value="">Default/No Shipping Plan</option>
                {content.shippingPlans?.map(plan => (
                  <option key={plan.id} value={plan.id}>{plan.name} (${plan.rate.toFixed(2)})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Stock Status</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm bg-white">
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex border-b border-gray-200 mb-4">
              <button 
                type="button"
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeDetailsTab === 'description' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveDetailsTab('description')}
              >
                Description
              </button>
              <button 
                type="button"
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeDetailsTab === 'composition' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveDetailsTab('composition')}
              >
                Composition
              </button>
              <button 
                type="button"
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeDetailsTab === 'care' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveDetailsTab('care')}
              >
                Care
              </button>
            </div>

            {editingFormLang === 'en' ? (
              <>
                {activeDetailsTab === 'description' && (
                  <textarea 
                    rows={4}
                    placeholder="Detailed description of the product in English..." 
                    value={productDetails}
                    onChange={(e) => setProductDetails(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none" 
                  />
                )}
                {activeDetailsTab === 'composition' && (
                  <textarea 
                    rows={4}
                    placeholder="Product composition in English..." 
                    value={productComposition}
                    onChange={(e) => setProductComposition(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none" 
                  />
                )}
                {activeDetailsTab === 'care' && (
                  <textarea 
                    rows={4}
                    placeholder="Care instructions in English..." 
                    value={productCare}
                    onChange={(e) => setProductCare(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none" 
                  />
                )}
              </>
            ) : (
              <>
                {activeDetailsTab === 'description' && (
                  <textarea 
                    rows={4}
                    dir="rtl"
                    placeholder="وصف تفصيلي للمنتج باللغة العربية..." 
                    value={productTranslations.ar.description}
                    onChange={(e) => setProductTranslations({ ...productTranslations, ar: { ...productTranslations.ar, description: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm text-right font-arabic resize-none" 
                  />
                )}
                {activeDetailsTab === 'composition' && (
                  <textarea 
                    rows={4}
                    dir="rtl"
                    placeholder="تكوين المنتج باللغة العربية..." 
                    value={productTranslations.ar.composition}
                    onChange={(e) => setProductTranslations({ ...productTranslations, ar: { ...productTranslations.ar, composition: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm text-right font-arabic resize-none" 
                  />
                )}
                {activeDetailsTab === 'care' && (
                  <textarea 
                    rows={4}
                    dir="rtl"
                    placeholder="تعليمات العناية باللغة العربية..." 
                    value={productTranslations.ar.care}
                    onChange={(e) => setProductTranslations({ ...productTranslations, ar: { ...productTranslations.ar, care: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm text-right font-arabic resize-none" 
                  />
                )}
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Available Colors (Hex)</label>
              <div className="flex gap-2 mb-2">
                <div className="relative">
                  <input 
                    type="color" 
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-10 h-10 p-0 border border-gray-200 rounded-md cursor-pointer absolute inset-0 opacity-0"
                  />
                  <div 
                    className="w-10 h-10 border border-gray-200 rounded-md shadow-sm"
                    style={{ backgroundColor: newColor }}
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="e.g. #000000" 
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddColor(); } }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                />
                <button type="button" onClick={handleAddColor} className="bg-gray-100 text-black px-3 py-2 rounded-md hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {colors.map((color, i) => (
                  <div key={i} className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-full pl-1 pr-2 py-1">
                    <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: color }}></span>
                    <span className="text-xs uppercase ml-1">{color}</span>
                    <button type="button" onClick={() => removeColor(color)} className="text-gray-400 hover:text-red-500 ml-1"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Available Sizes</label>
              <div className="flex gap-2 mb-2">
                <input 
                  type="text" 
                  placeholder="e.g. S, M, L, XL" 
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSize(); } }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm uppercase" 
                />
                <button type="button" onClick={handleAddSize} className="bg-gray-100 text-black px-3 py-2 rounded-md hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {sizes.map((size, i) => (
                  <div key={i} className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
                    <span className="text-xs font-bold uppercase">{size}</span>
                    <button type="button" onClick={() => removeSize(size)} className="text-gray-400 hover:text-red-500 ml-1"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider">Product Images (Up to 5)</label>
              <span className="text-xs text-gray-500">{images.length}/5 uploaded</span>
            </div>
            
            {images.length < 5 && (
              <div className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  value={newImageUrl} 
                  onChange={(e) => setNewImageUrl(e.target.value)} 
                  placeholder="Or paste an image URL here..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddImageUrl();
                    }
                  }}
                />
                <button 
                  type="button" 
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 bg-gray-100 text-black border border-gray-200 rounded-md hover:bg-gray-200 transition-colors text-sm"
                >
                  Add URL
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {images.map((img, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-md relative group border border-gray-200 overflow-hidden">
                  <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {images.length < 5 && (
                <label className="aspect-square bg-gray-50 rounded-md border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500 font-medium text-center px-2">Upload Image</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              onClick={handleSaveProduct}
            >
              {editingId ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Product</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Category</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Price</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Stock</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-gray-900 truncate max-w-[200px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      In Stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="text-gray-400 hover:text-black transition-colors p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

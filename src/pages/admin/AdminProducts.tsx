import { useState } from 'react';
import { Plus, Search, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { products } from '../../data/products';

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  // Existing categories derived from mock data 
  const initialCategories = Array.from(new Set(products.map(p => p.category)));
  const [categories, setCategories] = useState<string[]>(initialCategories);

  // Form states
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState(categories[0] || '');
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCustomCategory, setNewCustomCategory] = useState('');

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
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-6">Create New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Product Name</label>
              <input 
                type="text" 
                placeholder="Product Name" 
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
              />
            </div>
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
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Stock Details</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm bg-white">
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              onClick={() => {
                alert('Mock: Product Added.');
                setIsAdding(false);
              }}
            >
              Save Product
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
                    <button className="text-gray-400 hover:text-black transition-colors p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-2">
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

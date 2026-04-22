import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { products } from '../../data/products';

interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'expired';
  usageCount: number;
  appliesTo: 'all' | string[];
}

const mockDiscounts: Discount[] = [
  { id: '1', code: 'SPRING26', type: 'percentage', value: 20, startDate: '2026-03-01', endDate: '2026-05-31', status: 'active', usageCount: 145, appliesTo: 'all' },
  { id: '2', code: 'WELCOME10', type: 'percentage', value: 10, startDate: '2026-01-01', endDate: '2026-12-31', status: 'active', usageCount: 890, appliesTo: 'all' },
  { id: '3', code: 'WINTERCLEAN', type: 'fixed', value: 50, startDate: '2026-01-15', endDate: '2026-02-28', status: 'expired', usageCount: 320, appliesTo: ['1', '2'] },
  { id: '4', code: 'SUMMERFLASH', type: 'percentage', value: 30, startDate: '2026-07-01', endDate: '2026-07-04', status: 'scheduled', usageCount: 0, appliesTo: 'all' },
];

export default function AdminDiscounts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [newCode, setNewCode] = useState('');
  const [newType, setNewType] = useState<'percentage' | 'fixed'>('percentage');
  const [newValue, setNewValue] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [appliesTo, setAppliesTo] = useState<'all' | 'specific'>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const filteredDiscounts = mockDiscounts.filter(d => 
    d.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search discount codes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors bg-white text-sm"
          />
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          {isAdding ? 'Cancel' : <><Plus className="w-4 h-4" /> Create Discount</>}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-6">Create New Discount</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Discount Code</label>
              <input 
                type="text" 
                placeholder="e.g. SUMMER20" 
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm uppercase" 
              />
            </div>
            <div className="flex gap-4">
               <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Discount Type</label>
                  <select 
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
               </div>
               <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Value</label>
                  <input 
                    type="number" 
                    placeholder={newType === 'percentage' ? "20" : "50"}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                  />
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="date" 
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                />
              </div>
            </div>
             <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">End Date (Optional)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Applies To</label>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="radio" 
                  checked={appliesTo === 'all'} 
                  onChange={() => setAppliesTo('all')}
                  className="accent-black w-4 h-4 cursor-pointer"
                />
                Entire Store
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="radio" 
                  checked={appliesTo === 'specific'} 
                  onChange={() => setAppliesTo('specific')}
                  className="accent-black w-4 h-4 cursor-pointer"
                />
                Specific Products
              </label>
            </div>

            {appliesTo === 'specific' && (
              <div className="border border-gray-200 rounded-md p-4 max-h-56 overflow-y-auto">
                <div className="flex justify-between items-center mb-3 text-sm text-gray-500 font-medium">
                  <span>Select Products</span>
                  <span>{selectedProductIds.length} Selected</span>
                </div>
                <div className="space-y-2 relative">
                  {products.map(product => (
                    <label key={product.id} className="flex items-center gap-4 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors border border-transparent hover:border-gray-100">
                      <input 
                        type="checkbox" 
                        className="accent-black rounded-sm w-4 h-4 cursor-pointer"
                        checked={selectedProductIds.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProductIds([...selectedProductIds, product.id]);
                          } else {
                            setSelectedProductIds(selectedProductIds.filter(id => id !== product.id));
                          }
                        }}
                      />
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                        <img src={product.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <span className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
                      <span className="ml-auto text-gray-500 font-medium">${product.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              onClick={() => {
                alert('Mock: Discount Code Created!');
                setIsAdding(false);
              }}
            >
              Save Discount
            </button>
          </div>
        </div>
      )}

      {/* Discounts Table */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Code</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Type & Value</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Active Dates</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Uses</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDiscounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="font-mono font-medium text-gray-900">{discount.code}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div>{discount.type === 'percentage' ? `${discount.value}% Off` : `$${discount.value} Off`}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {discount.appliesTo === 'all' 
                        ? 'Entire Store' 
                        : `${discount.appliesTo.length} Product${discount.appliesTo.length !== 1 ? 's' : ''}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    <div>From: {discount.startDate}</div>
                    {discount.endDate && <div>To: {discount.endDate}</div>}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {discount.usageCount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${discount.status === 'active' ? 'bg-green-100 text-green-800' : 
                        discount.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {discount.status}
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
          {filteredDiscounts.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No discounts found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

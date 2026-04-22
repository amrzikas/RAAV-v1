import { useState } from 'react';
import { Search, Mail, ExternalLink, Calendar, ShoppingBag, DollarSign } from 'lucide-react';

const mockCustomers = [
  { id: '1', name: 'Sarah Miller', email: 'sarah@example.com', orders: 12, spent: 1250.00, joined: '2023-10-12', status: 'Active' },
  { id: '2', name: 'Elena Ridge', email: 'elena@example.com', orders: 3, spent: 340.50, joined: '2024-01-05', status: 'Active' },
  { id: '3', name: 'Michael Chen', email: 'michael@example.com', orders: 1, spent: 210.00, joined: '2024-02-20', status: 'Inactive' },
  { id: '4', name: 'Jessica Thompson', email: 'jessica@example.com', orders: 5, spent: 890.00, joined: '2023-11-30', status: 'Active' },
  { id: '5', name: 'David Smith', email: 'david@example.com', orders: 0, spent: 0.00, joined: '2024-03-01', status: 'Inactive' },
];

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search customers by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors bg-white text-sm"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Customer</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Orders</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Total Spent</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Member Since</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" /> {customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{customer.orders}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      {customer.spent.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3 h-3" /> {new Date(customer.joined).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-black transition-colors p-1" title="View Details">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No customers found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

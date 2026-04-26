import React, { useState, useMemo } from 'react';
import { Search, Mail, ExternalLink, Calendar, ShoppingBag, DollarSign, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { OrderInfo } from '../../types';

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const { content } = useContent();

  const derivedCustomers = useMemo(() => {
    const customerMap = new Map<string, any>();
    
    (content.orders || []).forEach(order => {
      if (!customerMap.has(order.email)) {
        customerMap.set(order.email, {
          id: order.email,
          name: order.customer,
          email: order.email,
          ordersCount: 0,
          spent: 0,
          orders: [] as OrderInfo[]
        });
      }
      const c = customerMap.get(order.email);
      c.ordersCount += 1;
      c.spent += order.total;
      c.orders.push(order);
    });
    
    return Array.from(customerMap.values()).map(c => {
      c.orders.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const oldestOrder = c.orders[c.orders.length - 1];
      c.joined = oldestOrder ? oldestOrder.date : 'Unknown';
      c.status = 'Active';
      return c;
    });
  }, [content.orders]);

  const filteredCustomers = derivedCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCustomer = selectedCustomerEmail ? derivedCustomers.find(c => c.email === selectedCustomerEmail) : null;

  if (selectedCustomer) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => {
            setSelectedCustomerEmail(null);
            setExpandedOrderId(null);
          }}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Customers
        </button>

        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-800 flex-shrink-0">
              {selectedCustomer.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">{selectedCustomer.name}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {selectedCustomer.email}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Customer since {selectedCustomer.joined}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 border-t border-gray-100 pt-6">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Spent</div>
              <div className="text-2xl font-medium text-gray-900">${selectedCustomer.spent.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Orders</div>
              <div className="text-2xl font-medium text-gray-900">{selectedCustomer.ordersCount}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Status</div>
              <div className="mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {selectedCustomer.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Order History</h3>
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs w-10"></th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Order ID</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Date</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Items</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Total</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedCustomer.orders.map((order: OrderInfo) => (
                    <React.Fragment key={order.id}>
                      <tr 
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                      >
                        <td className="px-6 py-4 text-gray-400">
                          {expandedOrderId === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 text-gray-500">{order.items}</td>
                        <td className="px-6 py-4 text-gray-900 font-medium">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                              order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                              order.status === 'Canceled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                      {expandedOrderId === order.id && (
                        <tr className="bg-gray-50">
                          <td colSpan={6} className="px-6 py-4">
                            <div className="border border-gray-200 rounded-md bg-white p-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">Order Items Details</h4>
                              {order.cartItems && order.cartItems.length > 0 ? (
                                <ul className="space-y-3">
                                  {order.cartItems.map((item, idx) => (
                                    <li key={idx} className="flex justify-between text-sm">
                                      <div>
                                        <span className="font-medium text-gray-900">{item.name}</span>
                                        <div className="text-xs text-gray-500 mt-1">
                                          Qty: {item.quantity} 
                                          {item.color && <span className="ml-2">Color: {item.color}</span>}
                                          {item.size && <span className="ml-2">Size: {item.size}</span>}
                                        </div>
                                      </div>
                                      <div className="text-gray-900 font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="text-sm text-gray-500 italic">No detailed items recorded for this order.</div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              {selectedCustomer.orders.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  No orders found for this customer.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                      <span className="font-medium">{customer.ordersCount}</span>
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
                      <Calendar className="w-3 h-3" /> {customer.joined}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedCustomerEmail(customer.email)}
                      className="text-gray-400 hover:text-black transition-colors p-1" 
                      title="View Details"
                    >
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

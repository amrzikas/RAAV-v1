import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { OrderInfo } from '../../types';
import { ChevronDown, ChevronUp, Package, Truck, DollarSign, CreditCard } from 'lucide-react';

export default function AdminOrders() {
  const { content, updateContent } = useContent();
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled'>('All');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const orders = content.orders || [];

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  const updateOrderStatus = (orderId: string, updates: Partial<OrderInfo>) => {
    const newOrders = orders.map(o => o.id === orderId ? { ...o, ...updates } : o);
    updateContent({ ...content, orders: newOrders });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === f ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              {f === 'All' ? 'All Orders' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs w-10"></th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Order ID</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Customer</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Date</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Total</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                  >
                    <td className="px-6 py-4 text-gray-400">
                      {expandedOrderId === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                       <Package className="w-4 h-4 text-gray-400" />
                       {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{order.customer}</div>
                      <div className="text-gray-500 text-xs">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-col gap-1">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, { status: e.target.value as OrderInfo['status'] })}
                          className={`border rounded-md px-2 py-1 text-xs outline-none bg-white font-medium
                            ${order.status === 'Delivered' ? 'border-green-200 text-green-800' : 
                              order.status === 'Processing' ? 'border-blue-200 text-blue-800' : 
                              order.status === 'Shipped' ? 'border-purple-200 text-purple-800' :
                              order.status === 'Canceled' ? 'border-red-200 text-red-800' :
                              'border-yellow-200 text-yellow-800'}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                        {order.trackingNumber && <span className="text-[10px] text-gray-500 uppercase tracking-wider">{order.shippingCompany}: {order.trackingNumber}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                       <div className="flex flex-col items-end gap-1">
                         <div className="flex items-center gap-1 text-xs text-gray-600">
                           {order.paymentMethod === 'COD' ? <DollarSign className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}
                           {order.paymentMethod || 'Card'}
                         </div>
                         <select 
                           value={order.paymentStatus || 'Pending'}
                           onChange={(e) => updateOrderStatus(order.id, { paymentStatus: e.target.value as OrderInfo['paymentStatus'] })}
                           className="border border-gray-200 rounded-md px-2 py-0.5 text-[10px] outline-none bg-white uppercase tracking-wider text-gray-700"
                         >
                           <option value="Pending">Pending</option>
                           <option value="Collected">Collected</option>
                           <option value="Refunded">Refunded</option>
                         </select>
                       </div>
                    </td>
                  </tr>
                  {expandedOrderId === order.id && (
                    <tr className="bg-gray-50 border-t-0 p-0">
                      <td colSpan={7} className="p-0">
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                          {/* Order Details */}
                          <div>
                            <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Order Summary</h4>
                            <div className="space-y-3">
                               {order.cartItems?.map((item, idx) => (
                                 <div key={idx} className="flex justify-between">
                                   <div className="text-gray-600">
                                     {item.quantity}x {item.name}
                                     <div className="text-xs text-gray-400">
                                       {item.size && <span>Size: {item.size} </span>}
                                       {item.color && <span>Color: {item.color}</span>}
                                     </div>
                                   </div>
                                   <div className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                                 </div>
                               ))}
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between font-bold text-gray-900">
                              <span>Total ({order.items} Items)</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          {/* Shipping Details */}
                          <div>
                            <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Fulfillment Details</h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Shipping Address</label>
                                <div className="text-gray-800 bg-white p-3 border border-gray-200 rounded-md">
                                  {order.shippingAddress || "123 Main St, New York, NY 10001 (Mock Address)"}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Shipping Company</label>
                                  <select 
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
                                    value={order.shippingCompany || ''}
                                    onChange={(e) => updateOrderStatus(order.id, { shippingCompany: e.target.value })}
                                  >
                                    <option value="">Select Carrier...</option>
                                    <option value="Aramex">Aramex</option>
                                    <option value="DHL">DHL</option>
                                    <option value="FedEx">FedEx</option>
                                    <option value="Local Courier">Local Courier</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tracking Number</label>
                                  <div className="relative">
                                    <input 
                                      type="text" 
                                      placeholder="e.g. 1Z9999..."
                                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-black pl-8"
                                      value={order.trackingNumber || ''}
                                      onChange={(e) => updateOrderStatus(order.id, { trackingNumber: e.target.value })}
                                    />
                                    <Truck className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
                                  </div>
                                </div>
                              </div>
                              <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-xs mt-2 border border-blue-100 flex gap-2">
                                <DollarSign className="w-4 h-4 flex-shrink-0" />
                                <p>For COD orders, hand over to the shipping company. Once delivered and cash collected, update the Payment Status to 'Collected'.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

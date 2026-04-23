const orders = [
  { id: '#ORD-001', customer: 'Sarah Miller', email: 'sarah@example.com', date: 'Oct 12, 2026', items: 3, total: '$345.00', status: 'Delivered' },
  { id: '#ORD-002', customer: 'Elena Ridge', email: 'elena@example.com', date: 'Oct 11, 2026', items: 1, total: '$120.00', status: 'Processing' },
  { id: '#ORD-003', customer: 'Jessica Thompson', email: 'jessica@example.com', date: 'Oct 10, 2026', items: 5, total: '$890.00', status: 'Shipped' },
  { id: '#ORD-004', customer: 'Michael Chen', email: 'michael@example.com', date: 'Oct 09, 2026', items: 2, total: '$210.00', status: 'Pending' },
  { id: '#ORD-005', customer: 'Emma Watson', email: 'emma@example.com', date: 'Oct 08, 2026', items: 1, total: '$54.00', status: 'Delivered' },
  { id: '#ORD-006', customer: 'David Smith', email: 'david@example.com', date: 'Oct 07, 2026', items: 4, total: '$450.00', status: 'Canceled' },
];

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md">All Orders</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">Pending</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">Completed</button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Order ID</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Customer</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Date</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Items</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Total</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{order.customer}</div>
                    <div className="text-gray-500 text-xs">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{order.total}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

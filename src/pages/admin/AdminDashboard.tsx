import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';

const stats = [
  { name: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign },
  { name: 'Sales', value: '+2350', change: '+180.1%', icon: ShoppingBag },
  { name: 'Active Users', value: '+12,234', change: '+19%', icon: Users },
  { name: 'Conversion Rate', value: '3.2%', change: '+1.2%', icon: TrendingUp },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Sarah Miller', date: 'Oct 12, 2026', total: '$345.00', status: 'Delivered' },
  { id: '#ORD-002', customer: 'Elena Ridge', date: 'Oct 11, 2026', total: '$120.00', status: 'Processing' },
  { id: '#ORD-003', customer: 'Jessica Thompson', date: 'Oct 10, 2026', total: '$890.00', status: 'Shipped' },
  { id: '#ORD-004', customer: 'Michael Chen', date: 'Oct 09, 2026', total: '$210.00', status: 'Pending' },
  { id: '#ORD-005', customer: 'Emma Watson', date: 'Oct 08, 2026', total: '$54.00', status: 'Delivered' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
              <stat.icon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-serif font-bold text-gray-900">{stat.value}</p>
              <span className="text-xs font-medium text-green-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-serif font-bold text-gray-900">Recent Orders</h2>
          <button className="text-sm font-medium text-black hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Order ID</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Customer</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Date</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Total</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 
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

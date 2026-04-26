import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useContent } from '../../context/ContentContext';
import { Link } from 'react-router-dom';

const salesData = [
  { name: 'Mon', sales: 4000, visitors: 2400 },
  { name: 'Tue', sales: 3000, visitors: 1398 },
  { name: 'Wed', sales: 2000, visitors: 9800 },
  { name: 'Thu', sales: 2780, visitors: 3908 },
  { name: 'Fri', sales: 1890, visitors: 4800 },
  { name: 'Sat', sales: 2390, visitors: 3800 },
  { name: 'Sun', sales: 3490, visitors: 4300 },
];

const conversionData = [
  { name: 'Week 1', rate: 2.1 },
  { name: 'Week 2', rate: 2.4 },
  { name: 'Week 3', rate: 2.9 },
  { name: 'Week 4', rate: 3.2 },
];

export default function AdminDashboard() {
  const { content } = useContent();
  const orders = content.orders || [];

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  const stats = [
    { name: 'Total Revenue', value: '$' + totalRevenue.toFixed(2), change: '+20.1%', icon: DollarSign },
    { name: 'Sales', value: '+' + orders.length, change: '+180.1%', icon: ShoppingBag },
    { name: 'Active Visitors', value: '+12,234', change: '+19%', icon: Users },
    { name: 'Conversion Rate', value: '3.2%', change: '+1.2%', icon: TrendingUp },
  ];

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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-6">Daily Sales & Visitors</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="sales" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-6">Weekly Conversion Rate (%)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="rate" fill="#000" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-serif font-bold text-gray-900">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm font-medium text-black hover:underline">View All</Link>
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
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">${order.total.toFixed(2)}</td>
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

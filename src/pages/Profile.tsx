import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, MapPin, User, LogOut, Heart, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const mockOrders = [
  { id: '#ORD-001', date: 'Oct 12, 2026', total: 345.00, status: 'Delivered', items: 3 },
  { id: '#ORD-002', date: 'Sep 28, 2026', total: 120.00, status: 'Processing', items: 1 },
];

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  
  if (!user) {
    return (
      <div className="pt-28 pb-20 min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Account Access Required</h1>
          <p className="text-gray-500 mb-6">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-500 mb-10">Welcome back, {user.email}</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="md:col-span-1 space-y-1">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Package className="w-5 h-5 flex-shrink-0" /> Orders
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <User className="w-5 h-5 flex-shrink-0" /> Personal Info
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'addresses' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <MapPin className="w-5 h-5 flex-shrink-0" /> Addresses
              </button>
              <Link 
                to="/wishlist"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Heart className="w-5 h-5 flex-shrink-0" /> Wishlist
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 border-t border-gray-200 mt-4 text-sm font-medium text-gray-500 hover:text-black transition-colors"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" /> Logout
              </button>
            </div>

            {/* Content Area */}
            <div className="md:col-span-3">
              
              {activeTab === 'orders' && (
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order History</h2>
                  {mockOrders.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <Link to="/shop" className="text-black font-medium hover:underline">Start shopping</Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="border border-gray-100 rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gray-200 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-gray-900">{order.id}</span>
                              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}</p>
                          </div>
                          <div className="text-right sm:text-left flex-shrink-0">
                            <p className="font-serif font-bold text-gray-900 mb-1">${order.total.toFixed(2)}</p>
                            <button className="text-sm text-gray-500 hover:text-black flex items-center md:justify-end gap-1 transition-colors">
                              View Details <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Personal Information</h2>
                  <form className="max-w-md space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                      <input type="email" value={user.email} disabled className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 text-sm text-gray-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">First Name</label>
                      <input type="text" placeholder="First Name" className="w-full border border-gray-200 rounded-md py-2 px-3 text-sm outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Last Name</label>
                      <input type="text" placeholder="Last Name" className="w-full border border-gray-200 rounded-md py-2 px-3 text-sm outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="pt-4 border-t border-gray-100 mt-6">
                      <button className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Saved Addresses</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-gray-200 p-4 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs uppercase tracking-widest font-bold bg-gray-100 px-2 py-1 rounded">Default</span>
                      </div>
                      <p className="font-bold text-gray-900 mb-1">{user.email?.split('@')[0]} Doe</p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        123 Fashion Ave, Suite 400<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                      <div className="mt-4 flex gap-3">
                        <button className="text-sm text-gray-500 hover:text-black">Edit</button>
                        <button className="text-sm text-red-500 hover:text-red-700">Delete</button>
                      </div>
                    </div>
                    
                    <button className="border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-6 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors group">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors cursor-pointer">
                        <span className="text-xl leading-none font-light">+</span>
                      </div>
                      <span className="text-sm font-medium font-sans">Add new address</span>
                    </button>
                  </div>
                </div>
              )}
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

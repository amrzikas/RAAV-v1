import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Tag } from 'lucide-react';
import { useAuth } from '../../../src/context/AuthContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Discounts', path: '/admin/discounts', icon: Tag },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link to="/" className="text-2xl font-serif font-bold tracking-wider text-black">RAAV <span className="font-sans text-xs tracking-widest text-gray-400 font-normal uppercase ml-2">Admin</span></Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#F9F9F8]">
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-serif font-medium text-gray-900 flex items-center capitalize">
            {location.pathname === '/admin' ? 'Dashboard' : location.pathname.split('/').pop()}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { Save, Store, Mail, CreditCard, Bell } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  const [newOrderEmail, setNewOrderEmail] = useState(true);
  const [newOrderPush, setNewOrderPush] = useState(false);
  const [lowStockEmail, setLowStockEmail] = useState(true);
  const [lowStockPush, setLowStockPush] = useState(false);
  const [customerMessageEmail, setCustomerMessageEmail] = useState(true);
  const [marketingEmail, setMarketingEmail] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Settings Navigation */}
      <div className="w-full md:w-64 flex-shrink-0">
        <nav className="flex flex-col space-y-1">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'general' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <Store className="w-4 h-4" /> Store Details
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'notifications' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('payment')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'payment' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <CreditCard className="w-4 h-4" /> Payment Gateways
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'email' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <Mail className="w-4 h-4" /> Email Templates
          </button>
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1">
        {activeTab === 'general' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Store Details</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Store Name</label>
                  <input type="text" defaultValue="RAAV" className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Contact Email</label>
                  <input type="email" defaultValue="info@raav.com" className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Store Description</label>
                <textarea rows={4} defaultValue="Sophisticated aesthetics for the modern individual. Elevate your wardrobe with our meticulously curated collections." className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Currency</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm bg-white">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Timezone</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm bg-white">
                    <option value="EST">Eastern Standard Time (EST)</option>
                    <option value="PST">Pacific Standard Time (PST)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button type="button" className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Notification Preferences</h2>
            
            <div className="space-y-8">
              {/* Order Notifications */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Order Alerts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">New Orders (Email)</p>
                      <p className="text-xs text-gray-500 mt-0.5">Receive an email whenever a customer places a new order.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={newOrderEmail} onChange={() => setNewOrderEmail(!newOrderEmail)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">New Orders (Push)</p>
                      <p className="text-xs text-gray-500 mt-0.5">Receive browser push notifications for new orders.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={newOrderPush} onChange={() => setNewOrderPush(!newOrderPush)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Inventory Notifications */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-t border-gray-100 pt-6">Inventory Alerts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Low Stock (Email)</p>
                      <p className="text-xs text-gray-500 mt-0.5">Get notified when product variations drop below 5 units.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={lowStockEmail} onChange={() => setLowStockEmail(!lowStockEmail)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Low Stock (Push)</p>
                      <p className="text-xs text-gray-500 mt-0.5">Receive browser push notifications for low inventory.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={lowStockPush} onChange={() => setLowStockPush(!lowStockPush)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Customer Notifications */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-t border-gray-100 pt-6">Customer & Marketing</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Customer Messages</p>
                      <p className="text-xs text-gray-500 mt-0.5">Receive emails when a customer submits the contact form.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={customerMessageEmail} onChange={() => setCustomerMessageEmail(!customerMessageEmail)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Marketing & Platform Updates</p>
                      <p className="text-xs text-gray-500 mt-0.5">Receive news, updates, and best practices from RAAV platform.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={marketingEmail} onChange={() => setMarketingEmail(!marketingEmail)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button type="button" className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors" onClick={() => alert("Notification settings saved!")}>
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'general' && activeTab !== 'notifications' && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'notifications' && <Bell className="w-6 h-6 text-gray-400" />}
              {activeTab === 'payment' && <CreditCard className="w-6 h-6 text-gray-400" />}
              {activeTab === 'email' && <Mail className="w-6 h-6 text-gray-400" />}
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 capitalize">{activeTab} Settings</h3>
            <p className="text-gray-500 max-w-sm mx-auto">This section is currently under development. Configurable options for {activeTab} will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

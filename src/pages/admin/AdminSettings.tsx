import { useState } from 'react';
import { Save, Store, Mail, CreditCard, Bell, Plus, Trash2 } from 'lucide-react';
import { useContent, CustomSection } from '../../context/ContentContext';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const { content, updateContent } = useContent();

  const [newOrderEmail, setNewOrderEmail] = useState(true);
  const [newOrderPush, setNewOrderPush] = useState(false);
  const [lowStockEmail, setLowStockEmail] = useState(true);
  const [lowStockPush, setLowStockPush] = useState(false);
  const [customerMessageEmail, setCustomerMessageEmail] = useState(true);
  const [marketingEmail, setMarketingEmail] = useState(false);

  // Helper arrays for Custom Sections
  const handleAddSection = () => {
    const newSection: CustomSection = {
      id: "sec_" + Date.now().toString(),
      type: 'text-image',
      title: 'New Section',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
      btnText: 'Shop Now',
      align: 'left'
    };
    updateContent({ ...content, customSections: [...content.customSections, newSection] });
  };

  const handeRemoveSection = (id: string) => {
    updateContent({ ...content, customSections: content.customSections.filter(s => s.id !== id) });
  };

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
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'content' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <Store className="w-4 h-4" /> Site Content
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

        {activeTab === 'content' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Site Content</h2>
            
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Site content saved successfully!"); }}>
              {/* Home Page Content */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Home Page Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Hero Pre-title</label>
                    <input 
                      type="text" 
                      value={content.homeHero.season} 
                      onChange={(e) => updateContent({ ...content, homeHero: { ...content.homeHero, season: e.target.value }})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Editor's Quote</label>
                    <input 
                      type="text" 
                      value={content.homeHero.editorQuote} 
                      onChange={(e) => updateContent({ ...content, homeHero: { ...content.homeHero, editorQuote: e.target.value }})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Hero Main Image URL</label>
                    <input 
                      type="text" 
                      value={content.homeHero.image} 
                      onChange={(e) => updateContent({ ...content, homeHero: { ...content.homeHero, image: e.target.value }})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Hero Subtitle</label>
                    <textarea 
                      rows={3} 
                      value={content.homeHero.subtitle} 
                      onChange={(e) => updateContent({ ...content, homeHero: { ...content.homeHero, subtitle: e.target.value }})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Home Banners */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-t border-gray-100 pt-6">Home Banners</h3>
                <div className="space-y-6">
                  {/* Main Banner */}
                  <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h4 className="text-xs font-bold uppercase mb-4 tracking-wider">Main Banner (Large)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                        <input type="text" value={content.homeBanners.main.image} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, main: { ...content.homeBanners.main, image: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Pre-Title (Subtitle)</label>
                        <input type="text" value={content.homeBanners.main.subtitle} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, main: { ...content.homeBanners.main, subtitle: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                        <input type="text" value={content.homeBanners.main.title} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, main: { ...content.homeBanners.main, title: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
                        <input type="text" value={content.homeBanners.main.btn} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, main: { ...content.homeBanners.main, btn: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Sub Banner */}
                  <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h4 className="text-xs font-bold uppercase mb-4 tracking-wider">Sub Banner (Top Right)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                        <input type="text" value={content.homeBanners.sub.image} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, sub: { ...content.homeBanners.sub, image: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Pre-Title</label>
                        <input type="text" value={content.homeBanners.sub.subtitle} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, sub: { ...content.homeBanners.sub, subtitle: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                        <input type="text" value={content.homeBanners.sub.title} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, sub: { ...content.homeBanners.sub, title: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
                        <input type="text" value={content.homeBanners.sub.btn} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, sub: { ...content.homeBanners.sub, btn: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Text Banner */}
                  <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h4 className="text-xs font-bold uppercase mb-4 tracking-wider">Text Banner (Bottom Right)</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                        <input type="text" value={content.homeBanners.text.title} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, text: { ...content.homeBanners.text, title: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                        <textarea rows={2} value={content.homeBanners.text.desc} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, text: { ...content.homeBanners.text, desc: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm resize-none"></textarea>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
                        <input type="text" value={content.homeBanners.text.btn} onChange={(e) => updateContent({ ...content, homeBanners: { ...content.homeBanners, text: { ...content.homeBanners.text, btn: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Sections Editor */}
              <div>
                <div className="flex items-center justify-between mb-4 border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Dynamic Home Sections</h3>
                  <button type="button" onClick={handleAddSection} className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider">
                    <Plus className="w-3 h-3" /> Add Section
                  </button>
                </div>
                
                <div className="space-y-6">
                  {content.customSections.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No custom sections added. Click "Add Section" to create one.</p>
                  ) : (
                    content.customSections.map((section, idx) => (
                      <div key={section.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 relative">
                        <button type="button" onClick={() => handeRemoveSection(section.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <h4 className="text-xs font-bold uppercase mb-4 tracking-wider">Section {idx + 1} ({section.type})</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                            <select 
                              value={section.type} 
                              onChange={(e) => {
                                const newSections = [...content.customSections];
                                newSections[idx] = { ...section, type: e.target.value as any };
                                updateContent({ ...content, customSections: newSections });
                              }}
                              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
                            >
                              <option value="text-image">Split: Text & Image</option>
                              <option value="banner">Full Banner</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                            <input type="text" value={section.image} onChange={(e) => { const newSections = [...content.customSections]; newSections[idx] = { ...section, image: e.target.value }; updateContent({ ...content, customSections: newSections }); }} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                            <input type="text" value={section.title} onChange={(e) => { const newSections = [...content.customSections]; newSections[idx] = { ...section, title: e.target.value }; updateContent({ ...content, customSections: newSections }); }} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
                            <input type="text" value={section.subtitle} onChange={(e) => { const newSections = [...content.customSections]; newSections[idx] = { ...section, subtitle: e.target.value }; updateContent({ ...content, customSections: newSections }); }} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
                            <input type="text" value={section.btnText} onChange={(e) => { const newSections = [...content.customSections]; newSections[idx] = { ...section, btnText: e.target.value }; updateContent({ ...content, customSections: newSections }); }} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Alignment</label>
                            <select value={section.align} onChange={(e) => { const newSections = [...content.customSections]; newSections[idx] = { ...section, align: e.target.value as any }; updateContent({ ...content, customSections: newSections }); }} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white">
                              <option value="left">Left (or Image Right)</option>
                              <option value="right">Right (or Image Left)</option>
                              <option value="center">Center</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Informational Pages */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-t border-gray-100 pt-6">Information Pages</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Returns Policies</label>
                    <textarea 
                      rows={4} 
                      value={content.returnsPolicy} 
                      onChange={(e) => updateContent({ ...content, returnsPolicy: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Shipping + Delivery</label>
                    <textarea 
                      rows={4} 
                      value={content.shippingPolicy} 
                      onChange={(e) => updateContent({ ...content, shippingPolicy: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Contact Us Content</label>
                    <textarea 
                      rows={4} 
                      value={content.contactUs} 
                      onChange={(e) => updateContent({ ...content, contactUs: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Save className="w-4 h-4" /> Save Content
                </button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-t border-gray-100 pt-6">FAQs Json Edit</h3>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">Here you can directly edit the FAQs in JSON format.</p>
                <div className="space-y-6">
                  <div>
                    <textarea 
                      rows={12} 
                      defaultValue={JSON.stringify(content.faqs, null, 2)} 
                      onBlur={(e) => {
                        try {
                           const parsed = JSON.parse(e.target.value);
                           updateContent({ ...content, faqs: parsed });
                        } catch (err) {
                           alert("Invalid JSON format in FAQs");
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-xs font-mono resize-y"
                    ></textarea>
                  </div>
                </div>
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

        {activeTab !== 'general' && activeTab !== 'notifications' && activeTab !== 'content' && (
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

import React, { useState, useRef } from 'react';
import { Save, Store, Mail, CreditCard, Bell, Plus, Trash2, Languages, FileJson, UploadCloud } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { CustomSection } from '../../types';
import AdminAccounting from './AdminAccounting';

function ImageUploadInput({ value, onChange, label = "Image URL" }: { value: string, onChange: (val: string) => void, label?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{label}</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
          placeholder="https://..."
        />
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
        >
          <UploadCloud className="w-4 h-4" /> Upload
        </button>
      </div>
      {value && value.startsWith('data:image') && (
        <div className="mt-2 flex items-center gap-2">
          <img src={value} alt="Preview" className="h-10 border border-gray-200 rounded object-cover" />
          <span className="text-xs text-gray-500">Local image</span>
        </div>
      )}
    </div>
  );
}

function VideoUploadInput({ value, onChange, label = "Video URL" }: { value: string, onChange: (val: string) => void, label?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (optional, but good practice for base64 storage)
    if (file.size > 10 * 1024 * 1024) { // 10MB limit for local storage safety
      alert("Video file is too large. Please use a file smaller than 10MB or provide a URL.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{label}</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
          placeholder="https://..."
        />
        <input 
          type="file" 
          accept="video/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
        >
          <UploadCloud className="w-4 h-4" /> Upload
        </button>
      </div>
      {value && (value.startsWith('data:video') || value.includes('mp4') || value.includes('mov')) && (
        <div className="mt-2 flex items-center gap-2">
          <video src={value} className="h-20 w-32 border border-gray-200 rounded object-cover" muted />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase">Video Preview</span>
            <button 
              type="button" 
              onClick={() => onChange('')}
              className="text-[10px] text-red-500 hover:underline text-left"
            >
              Remove video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminSettings() {

  const [activeTab, setActiveTab] = useState('general');
  const { content, updateContent, updateLocaleContent, updateTranslations } = useContent();
  const [editingLang, setEditingLang] = useState<'en' | 'ar'>('en');

  const [newOrderEmail, setNewOrderEmail] = useState(true);
  const [newOrderPush, setNewOrderPush] = useState(false);
  const [lowStockEmail, setLowStockEmail] = useState(true);
  const [lowStockPush, setLowStockPush] = useState(false);
  const [customerMessageEmail, setCustomerMessageEmail] = useState(true);
  const [marketingEmail, setMarketingEmail] = useState(false);

  const currentLocale = content.locales[editingLang];

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
    updateLocaleContent(editingLang, { ...currentLocale, customSections: [...currentLocale.customSections, newSection] });
  };

  const handeRemoveSection = (id: string) => {
    updateLocaleContent(editingLang, { ...currentLocale, customSections: currentLocale.customSections.filter(s => s.id !== id) });
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
            onClick={() => setActiveTab('translations')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'translations' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <Languages className="w-4 h-4" /> Translations
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'notifications' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('shipping')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'shipping' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <Store className="w-4 h-4" /> Shipping Plans
          </button>
          <button 
            onClick={() => setActiveTab('payment')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'payment' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <CreditCard className="w-4 h-4" /> Payment Gateways
          </button>
          <button 
            onClick={() => setActiveTab('accounting')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'accounting' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <Store className="w-4 h-4" /> Accounting
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-lg font-serif font-bold text-gray-900">Site Content</h2>
              
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-md">
                <button 
                  onClick={() => setEditingLang('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${editingLang === 'en' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setEditingLang('ar')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${editingLang === 'ar' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                >
                  العربية
                </button>
              </div>
            </div>
            
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert(`Site content (${editingLang.toUpperCase()}) saved successfully!`); }}>
              {/* Home Page Content */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Home Page Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Hero Pre-title</label>
                    <input 
                      type="text" 
                      value={currentLocale.homeHero.season} 
                      onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeHero: { ...currentLocale.homeHero, season: e.target.value }})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Editor's Quote</label>
                    <input 
                      type="text" 
                      value={currentLocale.homeHero.editorQuote} 
                      onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeHero: { ...currentLocale.homeHero, editorQuote: e.target.value }})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                    />
                  </div>
                  <div>
                    <ImageUploadInput 
                      label="Hero Main Image URL"
                      value={currentLocale.homeHero.image}
                      onChange={(val) => updateLocaleContent(editingLang, { ...currentLocale, homeHero: { ...currentLocale.homeHero, image: val }})}
                    />
                  </div>
                  <div>
                    <VideoUploadInput 
                      label="Hero Video URL or Upload"
                      value={currentLocale.homeHero.videoUrl || ''} 
                      onChange={(val) => updateLocaleContent(editingLang, { ...currentLocale, homeHero: { ...currentLocale.homeHero, videoUrl: val }})}
                    />
                    <p className="text-[10px] text-gray-400 mt-1 italic">Providing a video will replace the hero image. Supports direct URLs, YouTube/Vimeo links, or local uploads.</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Hero Subtitle</label>
                    <textarea 
                      rows={3} 
                      value={currentLocale.homeHero.subtitle} 
                      onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeHero: { ...currentLocale.homeHero, subtitle: e.target.value }})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Home Banners */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-t border-gray-100 pt-6">Instagram Feed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Section Title</label>
                    <input 
                      type="text" 
                      value={currentLocale.homeInstagram?.title || ''} 
                      onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeInstagram: { ...(currentLocale.homeInstagram || { handle: '', images: [] }), title: e.target.value }})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Instagram Handle</label>
                    <input 
                      type="text" 
                      value={currentLocale.homeInstagram?.handle || ''} 
                      onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeInstagram: { ...(currentLocale.homeInstagram || { title: '', images: [] }), handle: e.target.value }})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Images (6 URLs recommended)</label>
                    <div className="space-y-2">
                      {(currentLocale.homeInstagram?.images || []).map((img, i) => (
                        <div key={i} className="flex gap-2">
                          <input 
                            type="text" 
                            value={img} 
                            onChange={(e) => {
                              const newImgs = [...(currentLocale.homeInstagram?.images || [])];
                              newImgs[i] = e.target.value;
                              updateLocaleContent(editingLang, { ...currentLocale, homeInstagram: { ...(currentLocale.homeInstagram || { title: '', handle: '' }), images: newImgs } });
                            }}
                            className="flex-1 px-3 py-1 border border-gray-200 rounded-md text-xs"
                          />
                          <button 
                            type="button" 
                            onClick={() => {
                              const newImgs = (currentLocale.homeInstagram?.images || []).filter((_, idx) => idx !== i);
                               updateLocaleContent(editingLang, { ...currentLocale, homeInstagram: { ...(currentLocale.homeInstagram || { title: '', handle: '' }), images: newImgs } });
                            }}
                            className="text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button 
                         type="button"
                         onClick={() => {
                           const currentImgs = currentLocale.homeInstagram?.images || [];
                           updateLocaleContent(editingLang, { ...currentLocale, homeInstagram: { ...(currentLocale.homeInstagram || { title: '', handle: '' }), images: [...currentImgs, ''] } });
                         }}
                         className="text-xs text-blue-600 font-bold uppercase"
                      >
                        + Add Image
                      </button>
                    </div>
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
                        <ImageUploadInput 
                          label="Image URL"
                          value={currentLocale.homeBanners.main.image}
                          onChange={(val) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, main: { ...currentLocale.homeBanners.main, image: val } }})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Pre-Title (Subtitle)</label>
                        <input type="text" value={currentLocale.homeBanners.main.subtitle} onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, main: { ...currentLocale.homeBanners.main, subtitle: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                        <input type="text" value={currentLocale.homeBanners.main.title} onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, main: { ...currentLocale.homeBanners.main, title: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
                        <input type="text" value={currentLocale.homeBanners.main.btn} onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, main: { ...currentLocale.homeBanners.main, btn: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Sub Banner */}
                  <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h4 className="text-xs font-bold uppercase mb-4 tracking-wider">Sub Banner (Top Right)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <ImageUploadInput 
                          label="Image URL"
                          value={currentLocale.homeBanners.sub.image}
                          onChange={(val) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, sub: { ...currentLocale.homeBanners.sub, image: val } }})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Pre-Title</label>
                        <input type="text" value={currentLocale.homeBanners.sub.subtitle} onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, sub: { ...currentLocale.homeBanners.sub, subtitle: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                        <input type="text" value={currentLocale.homeBanners.sub.title} onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, sub: { ...currentLocale.homeBanners.sub, title: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
                        <input type="text" value={currentLocale.homeBanners.sub.btn} onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, sub: { ...currentLocale.homeBanners.sub, btn: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Text Banner */}
                  <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h4 className="text-xs font-bold uppercase mb-4 tracking-wider">Text Banner (Bottom Right)</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                        <input type="text" value={currentLocale.homeBanners.text.title} onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, text: { ...currentLocale.homeBanners.text, title: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                        <textarea rows={2} value={currentLocale.homeBanners.text.desc} onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, text: { ...currentLocale.homeBanners.text, desc: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm resize-none"></textarea>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
                        <input type="text" value={currentLocale.homeBanners.text.btn} onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, homeBanners: { ...currentLocale.homeBanners, text: { ...currentLocale.homeBanners.text, btn: e.target.value } }})} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
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
                  {currentLocale.customSections.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No custom sections added. Click "Add Section" to create one.</p>
                  ) : (
                    currentLocale.customSections.map((section, idx) => (
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
                                const newSections = [...currentLocale.customSections];
                                newSections[idx] = { ...section, type: e.target.value as any };
                                updateLocaleContent(editingLang, { ...currentLocale, customSections: newSections });
                              }}
                              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
                            >
                              <option value="text-image">Split: Text & Image</option>
                              <option value="banner">Full Banner</option>
                              <option value="gallery">Animated Gallery</option>
                            </select>
                          </div>
                          <div>
                            {section.type !== 'gallery' ? (
                              <ImageUploadInput 
                                label="Image URL"
                                value={section.image}
                                onChange={(val) => { const newSections = [...currentLocale.customSections]; newSections[idx] = { ...section, image: val }; updateLocaleContent(editingLang, { ...currentLocale, customSections: newSections }); }}
                              />
                            ) : (
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Gallery Images</label>
                                <div className="space-y-2">
                                  {(section.images || []).map((img, i) => (
                                    <div key={i} className="flex gap-2">
                                      <input 
                                        type="text" 
                                        value={img} 
                                        onChange={(e) => {
                                          const newImgs = [...(section.images || [])];
                                          newImgs[i] = e.target.value;
                                          const newSections = [...currentLocale.customSections];
                                          newSections[idx] = { ...section, images: newImgs };
                                          updateLocaleContent(editingLang, { ...currentLocale, customSections: newSections });
                                        }}
                                        className="flex-1 px-3 py-1 border border-gray-200 rounded-md text-xs"
                                        placeholder="Image URL"
                                      />
                                      <button type="button" onClick={() => {
                                        const newImgs = (section.images || []).filter((_, imgIdx) => imgIdx !== i);
                                        const newSections = [...currentLocale.customSections];
                                        newSections[idx] = { ...section, images: newImgs };
                                        updateLocaleContent(editingLang, { ...currentLocale, customSections: newSections });
                                      }} className="text-red-500"><Trash2 className="w-3 h-3" /></button>
                                    </div>
                                  ))}
                                  <button type="button" onClick={() => {
                                    const newImgs = [...(section.images || []), ''];
                                    const newSections = [...currentLocale.customSections];
                                    newSections[idx] = { ...section, images: newImgs };
                                    updateLocaleContent(editingLang, { ...currentLocale, customSections: newSections });
                                  }} className="text-[10px] font-bold text-blue-600 uppercase">+ Add Gallery Image</button>
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                            <input type="text" value={section.title} onChange={(e) => { const newSections = [...currentLocale.customSections]; newSections[idx] = { ...section, title: e.target.value }; updateLocaleContent(editingLang, { ...currentLocale, customSections: newSections }); }} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
                            <input type="text" value={section.subtitle} onChange={(e) => { const newSections = [...currentLocale.customSections]; newSections[idx] = { ...section, subtitle: e.target.value }; updateLocaleContent(editingLang, { ...currentLocale, customSections: newSections }); }} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
                            <input type="text" value={section.btnText} onChange={(e) => { const newSections = [...currentLocale.customSections]; newSections[idx] = { ...section, btnText: e.target.value }; updateLocaleContent(editingLang, { ...currentLocale, customSections: newSections }); }} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Alignment</label>
                            <select value={section.align} onChange={(e) => { const newSections = [...currentLocale.customSections]; newSections[idx] = { ...section, align: e.target.value as any }; updateLocaleContent(editingLang, { ...currentLocale, customSections: newSections }); }} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white">
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
                      value={currentLocale.returnsPolicy} 
                      onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, returnsPolicy: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Shipping + Delivery</label>
                    <textarea 
                      rows={4} 
                      value={currentLocale.shippingPolicy} 
                      onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, shippingPolicy: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-sm resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Contact Us Content</label>
                    <textarea 
                      rows={4} 
                      value={currentLocale.contactUs} 
                      onChange={(e) => updateLocaleContent(editingLang, { ...currentLocale, contactUs: e.target.value })}
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
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-t border-gray-100 pt-6">FAQs Json Edit ({editingLang.toUpperCase()})</h3>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">Here you can directly edit the FAQs in JSON format.</p>
                <div className="space-y-6">
                  <div>
                    <textarea 
                      rows={12} 
                      key={`${editingLang}-faqs`}
                      defaultValue={JSON.stringify(currentLocale.faqs, null, 2)} 
                      onBlur={(e) => {
                        try {
                           const parsed = JSON.parse(e.target.value);
                           updateLocaleContent(editingLang, { ...currentLocale, faqs: parsed });
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

        {activeTab === 'translations' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-gray-900" />
                <h2 className="text-lg font-serif font-bold text-gray-900">Application Translations</h2>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-md">
                <button 
                  onClick={() => setEditingLang('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${editingLang === 'en' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                >
                  English JSON
                </button>
                <button 
                  onClick={() => setEditingLang('ar')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${editingLang === 'ar' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                >
                  Arabic JSON
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6 font-light">
              Edit the raw translation strings for the {editingLang === 'en' ? 'English' : 'Arabic'} version of the application. 
              These keys are used throughout the UI for static labels (e.g., buttons, menu items).
            </p>

            <div className="space-y-6">
              <textarea 
                rows={20} 
                key={`${editingLang}-translations`}
                defaultValue={JSON.stringify(content.translations[editingLang], null, 2)} 
                onBlur={(e) => {
                  try {
                     const parsed = JSON.parse(e.target.value);
                     updateTranslations(editingLang, parsed);
                  } catch (err) {
                     alert("Invalid JSON format in translations");
                  }
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-md outline-none focus:border-black transition-colors text-xs font-mono resize-y bg-gray-50 leading-relaxed"
              ></textarea>
              
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button 
                  onClick={() => alert("Translations saved and applied!")}
                  className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <Save className="w-4 h-4" /> Save & Apply
                </button>
              </div>
            </div>
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

        {activeTab === 'payment' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Payment Gateways</h2>
            
            <div className="space-y-8">
              {/* Cash On Delivery */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Cash on Delivery</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Allow customers to pay in cash upon receiving their order.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={content.paymentSettings?.cashOnDeliveryEnabled ?? true} onChange={() => updateContent({ ...content, paymentSettings: { ...content.paymentSettings, cashOnDeliveryEnabled: !content.paymentSettings?.cashOnDeliveryEnabled } })} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
              </div>

              {/* Wallet Transfer */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Wallet Transfer</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Customers can transfer via Mobile Wallets and upload a receipt.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={content.paymentSettings?.walletTransferEnabled ?? false} onChange={() => updateContent({ ...content, paymentSettings: { ...content.paymentSettings, walletTransferEnabled: !content.paymentSettings?.walletTransferEnabled } })} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
                
                {content.paymentSettings?.walletTransferEnabled && (
                  <div className="bg-gray-50 p-4 rounded-md space-y-4">
                    <p className="text-xs font-medium text-gray-700">Digital Wallets Options</p>
                    {content.paymentSettings.wallets.map((wallet) => (
                      <div key={wallet.id} className="flex gap-2 items-center bg-white p-2 rounded-md border border-gray-200">
                        <input className="flex-1 text-sm px-2 py-1 outline-none" value={wallet.name} placeholder="Wallet Name (e.g., Vodafone Cash)" onChange={(e) => {
                          const w = content.paymentSettings.wallets.map(x => x.id === wallet.id ? { ...x, name: e.target.value } : x);
                          updateContent({ ...content, paymentSettings: { ...content.paymentSettings, wallets: w } });
                        }} />
                        <input className="flex-1 text-sm px-2 py-1 outline-none border-l border-gray-200" value={wallet.number} placeholder="Wallet Number" onChange={(e) => {
                          const w = content.paymentSettings.wallets.map(x => x.id === wallet.id ? { ...x, number: e.target.value } : x);
                          updateContent({ ...content, paymentSettings: { ...content.paymentSettings, wallets: w } });
                        }} />
                        <button className="text-red-500 hover:text-red-700 p-1" onClick={() => {
                          updateContent({ ...content, paymentSettings: { ...content.paymentSettings, wallets: content.paymentSettings.wallets.filter(x => x.id !== wallet.id) } });
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button className="text-sm font-medium text-black flex items-center gap-1" onClick={() => {
                      updateContent({ ...content, paymentSettings: { ...content.paymentSettings, wallets: [...content.paymentSettings.wallets, { id: 'w_' + Date.now(), name: '', number: '' }] } });
                    }}>
                      <Plus className="w-4 h-4" /> Add Wallet
                    </button>
                  </div>
                )}
              </div>

              {/* Instapay Transfer */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">InstaPay Transfer</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Customers can transfer via InstaPay and upload a receipt.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={content.paymentSettings?.instapayEnabled ?? false} onChange={() => updateContent({ ...content, paymentSettings: { ...content.paymentSettings, instapayEnabled: !content.paymentSettings?.instapayEnabled } })} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
                
                {content.paymentSettings?.instapayEnabled && (
                  <div className="bg-gray-50 p-4 rounded-md space-y-4">
                    <p className="text-xs font-medium text-gray-700">InstaPay Accounts</p>
                    {content.paymentSettings.instapayAccounts.map((account) => (
                      <div key={account.id} className="flex gap-2 items-center bg-white p-2 rounded-md border border-gray-200">
                        <input className="flex-1 text-sm px-2 py-1 outline-none" value={account.name} placeholder="Account Name (e.g., John Doe)" onChange={(e) => {
                          const a = content.paymentSettings.instapayAccounts.map(x => x.id === account.id ? { ...x, name: e.target.value } : x);
                          updateContent({ ...content, paymentSettings: { ...content.paymentSettings, instapayAccounts: a } });
                        }} />
                        <input className="flex-1 text-sm px-2 py-1 outline-none border-l border-gray-200" value={account.address} placeholder="Payment Address/Number" onChange={(e) => {
                          const a = content.paymentSettings.instapayAccounts.map(x => x.id === account.id ? { ...x, address: e.target.value } : x);
                          updateContent({ ...content, paymentSettings: { ...content.paymentSettings, instapayAccounts: a } });
                        }} />
                        <button className="text-red-500 hover:text-red-700 p-1" onClick={() => {
                          updateContent({ ...content, paymentSettings: { ...content.paymentSettings, instapayAccounts: content.paymentSettings.instapayAccounts.filter(x => x.id !== account.id) } });
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button className="text-sm font-medium text-black flex items-center gap-1" onClick={() => {
                      updateContent({ ...content, paymentSettings: { ...content.paymentSettings, instapayAccounts: [...content.paymentSettings.instapayAccounts, { id: 'i_' + Date.now(), name: '', address: '' }] } });
                    }}>
                      <Plus className="w-4 h-4" /> Add InstaPay Account
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Shipping Plans</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <p className="text-xs font-medium text-gray-700 uppercase tracking-wider">Available Plans</p>
                {content.shippingPlans?.map((plan) => (
                  <div key={plan.id} className="flex gap-2 items-center bg-white p-2 rounded-md border border-gray-200">
                    <input className="flex-[2] text-sm px-2 py-1 outline-none" value={plan.name} placeholder="Plan Name (e.g., Express Delivery)" onChange={(e) => {
                      const sp = content.shippingPlans.map(x => x.id === plan.id ? { ...x, name: e.target.value } : x);
                      updateContent({ ...content, shippingPlans: sp });
                    }} />
                    <input type="number" className="flex-1 text-sm px-2 py-1 outline-none border-l border-gray-200" value={plan.rate} placeholder="Rate ($)" onChange={(e) => {
                      const sp = content.shippingPlans.map(x => x.id === plan.id ? { ...x, rate: parseFloat(e.target.value) || 0 } : x);
                      updateContent({ ...content, shippingPlans: sp });
                    }} />
                    <button className="text-red-500 hover:text-red-700 p-1" onClick={() => {
                      updateContent({ ...content, shippingPlans: content.shippingPlans.filter(x => x.id !== plan.id) });
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button className="text-sm font-medium text-black flex items-center gap-1 mt-4" onClick={() => {
                  const plans = content.shippingPlans || [];
                  updateContent({ ...content, shippingPlans: [...plans, { id: 'sp_' + Date.now(), name: 'New Shipping Plan', rate: 0 }] });
                }}>
                  <Plus className="w-4 h-4" /> Add Shipping Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'accounting' && (
          <AdminAccounting />
        )}

        {activeTab !== 'general' && activeTab !== 'notifications' && activeTab !== 'content' && activeTab !== 'translations' && activeTab !== 'payment' && activeTab !== 'shipping' && activeTab !== 'accounting' && (
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

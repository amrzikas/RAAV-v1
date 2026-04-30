import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useContent } from '../context/ContentContext';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { addToast } = useToast();
  const { content } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
}
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Simulate API call
  setTimeout(() => {
    addToast(t('contact_form.success', 'Your message has been sent successfully. We will get back to you shortly!'), 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  }, 500);
};

return (
  <div className={`pt-32 pb-20 bg-white min-h-screen ${currentLang === 'ar' ? 'font-arabic' : ''}`}>
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 tracking-tight text-gray-900">{t('footer.contact', 'Contact Us')}</h1>
        <p className={`text-gray-500 max-w-2xl mx-auto font-light whitespace-pre-wrap ${currentLang === 'ar' ? 'font-arabic' : ''}`}>
          {content.locales[currentLang as 'en' | 'ar']?.contactUs || content.contactUs}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">

        {/* Contact Info */}
        <div className={`w-full lg:w-1/3 ${currentLang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h3 className="text-2xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">{currentLang === 'ar' ? 'متجرنا' : 'Our Store'}</h3>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className={`w-6 h-6 text-gray-400 mt-1 flex-shrink-0 ${currentLang === 'ar' ? 'ml-4' : ''}`} />
              <div>
                <h4 className="font-medium text-gray-900 mb-1 uppercase tracking-widest text-sm">{t('checkout.address', 'Address')}</h4>
                <p className="text-gray-500 font-light leading-relaxed">
                  October<br />
                  Giza<br />
                  Egypt
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className={`w-6 h-6 text-gray-400 mt-1 flex-shrink-0 ${currentLang === 'ar' ? 'ml-4' : ''}`} />
              <div>
                <h4 className="font-medium text-gray-900 mb-1 uppercase tracking-widest text-sm">{t('checkout.phone', 'Phone')}</h4>
                <p className="text-gray-500 font-light leading-relaxed text-lg font-serif">
                  +201050740202
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className={`w-6 h-6 text-gray-400 mt-1 flex-shrink-0 ${currentLang === 'ar' ? 'ml-4' : ''}`} />
              <div>
                <h4 className="font-medium text-gray-900 mb-1 uppercase tracking-widest text-sm">{t('contact_form.email', 'Email')}</h4>
                <a href="mailto:hello@raav.com" className="text-black hover:text-gray-500 font-medium transition-colors">
                  hello@raav.com
                </a>
              </div>
            </div>
            {/* Contact Form */}
            <div className="w-full lg:w-2/3 bg-gray-50 p-8 md:p-12">
              <h3 className={`text-2xl font-serif font-bold mb-8 ${currentLang === 'ar' ? 'text-right' : 'text-left'}`}>{t('contact_form.title', 'Send a Message')}</h3>

              <form onSubmit={handleSubmit} className={`space-y-6 ${currentLang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('contact_form.name', 'Name')} *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-white border border-gray-200 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('contact_form.email', 'Email')} *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-white border border-gray-200 px-4 py-3 outline-none focus:border-black transition-colors" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('contact_form.subject', 'Subject')}</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-white border border-gray-200 px-4 py-3 outline-none focus:border-black transition-colors" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{t('contact_form.message', 'Message')} *</label>
                  <textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleChange} className="w-full bg-white border border-gray-200 px-4 py-3 outline-none focus:border-black transition-colors resize-none"></textarea>
                </div>

                <button type="submit" className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors inline-block text-center w-full sm:w-auto">
                  {t('contact_form.send_btn', 'Send Message')}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

);


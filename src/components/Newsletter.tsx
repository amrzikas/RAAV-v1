import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useTranslation } from 'react-i18next';

export default function Newsletter() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addToast(t('newsletter.success', 'Successfully subscribed to newsletter!'), 'success');
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto ${currentLang === 'ar' ? 'font-arabic' : ''}`}>
          <div className={`md:w-1/2 ${currentLang === 'ar' ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('newsletter.title', 'Sign Up for our newsletter')}</h2>
            <p className="text-gray-400">
              {t('newsletter.subtitle', 'Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.')}
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <form onSubmit={handleSubmit} className="flex w-full">
              <input 
                type="email" 
                placeholder={t('newsletter.placeholder', 'Enter your email address')} 
                className={`w-full bg-white text-black px-4 py-3 outline-none ${currentLang === 'ar' ? 'text-right' : 'text-left'}`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-gray-800 px-6 py-3 font-medium uppercase tracking-wider hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {t('newsletter.button', 'Subscribe')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

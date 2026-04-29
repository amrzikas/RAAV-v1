import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';

export default function Hero() {
  const { t } = useTranslation();
  const { currentLocale } = useContent();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 z-10 pt-10"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-black"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">
                {currentLocale.homeHero.season}
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-[1.05] tracking-tight text-gray-900">
              {currentLocale.homeHero.titlePart1} <br /> 
              <span className="italic font-light text-gray-500">{currentLocale.homeHero.titlePart2}</span> <br /> 
              {currentLocale.homeHero.titlePart3}
            </h1>
            
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-10 max-w-md leading-relaxed font-light whitespace-pre-wrap">
              {currentLocale.homeHero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link to="/shop" className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-all">
                {t('hero.shop_btn')}
                <ArrowRight className="w-4 h-4 group-hover:rtl:-translate-x-1 group-hover:ltr:translate-x-1 transition-transform rtl:rotate-180" />
              </Link>
              <Link to="/lookbook" className="w-full sm:w-auto flex items-center justify-center bg-transparent border border-black text-black px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                {t('hero.lookbook_btn')}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative h-[60vh] lg:h-[80vh] mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gray-200 overflow-hidden shadow-2xl">
              {currentLocale.homeHero.videoUrl ? (
                (() => {
                  const url = currentLocale.homeHero.videoUrl;
                  const isDirectVideo = url.startsWith('data:video') || url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.mov') || url.toLowerCase().includes('.webm');
                  
                  if (isDirectVideo) {
                    return (
                      <video 
                        src={url} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="w-full h-full object-cover"
                      />
                    );
                  }

                  return (
                    <iframe
                      src={url.includes('renderforest.com') 
                        ? url.replace('/watch-', '/watch-embed/')
                        : url}
                      title="Hero Video"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  );
                })()
              ) : (
                <img 
                  src={currentLocale.homeHero.image} 
                  alt="Contemporary Fashion" 
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
            
            {/* Floating editorial element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 md:-left-12 rtl:-right-6 md:rtl:-right-12 rtl:left-auto bg-white p-6 shadow-xl max-w-[240px] hidden md:block"
            >
              <p className="text-xs font-bold tracking-widest uppercase mb-3 text-black">{t('hero.editors_pick')}</p>
              <p className="text-sm text-gray-600 font-serif italic leading-relaxed">
                "{currentLocale.homeHero.editorQuote}"
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

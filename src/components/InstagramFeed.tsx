import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

import { useContent } from '../context/ContentContext';

export default function InstagramFeed() {
  const { currentLocale } = useContent();
  
  if (!currentLocale.homeInstagram) {
    return null;
  }

  const { title, handle, images } = currentLocale.homeInstagram;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{title}</h2>
        <a 
          href={`https://instagram.com/${handle.replace('@', '')}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
        >
          <Instagram className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide uppercase">{handle}</span>
        </a>
      </div>

      <div className="flex w-full overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ 
            ease: "linear", 
            duration: 25, 
            repeat: Infinity 
          }}
          className="flex flex-nowrap"
        >
          {/* We duplicate the array to create a seamless infinite scroll loop */}
          {[...images, ...images, ...images].map((src, index) => (
            <div 
              key={index} 
              className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 group overflow-hidden border-r border-white"
            >
              <img 
                src={src} 
                alt={`Instagram Post ${index}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

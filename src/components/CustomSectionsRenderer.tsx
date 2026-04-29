import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function CustomSectionsRenderer() {
  const { currentLocale } = useContent();

  if (!currentLocale.customSections || currentLocale.customSections.length === 0) {
    return null;
  }

  return (
    <>
      {currentLocale.customSections.map((section, index) => {
        if (section.type === 'banner') {
          return (
            <section key={section.id} className="py-20 bg-white">
              <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="relative h-[400px] md:h-[600px] w-full overflow-hidden group"
                >
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className={`absolute inset-0 flex flex-col justify-center p-10 md:p-14 ${
                    section.align === 'center' ? 'items-center text-center' : 
                    section.align === 'right' ? 'items-end text-right' : 'items-start text-left'
                  }`}>
                    {section.subtitle && (
                      <span className="text-white text-sm font-medium tracking-[0.2em] uppercase mb-3 block">
                        {section.subtitle}
                      </span>
                    )}
                    <h3 className="text-white text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-8 max-w-4xl leading-tight">
                      {section.title}
                    </h3>
                    {section.btnText && (
                      <Link to="/shop" className="flex items-center gap-3 border-b border-white text-white pb-2 text-sm font-medium uppercase tracking-widest hover:gap-5 transition-all w-fit">
                        {section.btnText} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </div>
            </section>
          );
        }

        if (section.type === 'text-image') {
          return (
            <section key={section.id} className="py-20 bg-white overflow-hidden">
              <div className="container mx-auto px-4 md:px-6">
                <div className={`flex flex-col gap-12 lg:gap-20 items-center ${section.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: section.align === 'right' ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2"
                  >
                    {section.subtitle && (
                      <div className="inline-flex items-center gap-4 mb-6">
                        <span className="h-[1px] w-12 bg-black"></span>
                        <span className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">
                          {section.subtitle}
                        </span>
                      </div>
                    )}
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight text-gray-900">
                      {section.title}
                    </h2>
                    {section.btnText && (
                      <Link to="/shop" className="group inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-all mt-4">
                        {section.btnText}
                        <ArrowRight className="w-4 h-4 group-hover:rtl:-translate-x-1 group-hover:ltr:translate-x-1 transition-transform rtl:rotate-180" />
                      </Link>
                    )}
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full lg:w-1/2 relative h-[500px]"
                  >
                    <div className="absolute inset-0 bg-gray-100">
                      <img 
                        src={section.image} 
                        alt={section.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        }

        if (section.type === 'gallery') {
          return (
            <section key={section.id} className="py-24 bg-white overflow-hidden">
               <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
                 <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{section.title}</h2>
                 <p className="text-gray-500 text-sm max-w-2xl mx-auto">{section.subtitle}</p>
               </div>

               <div className="flex w-full overflow-hidden">
                 <motion.div 
                   animate={{ x: [0, -1200] }}
                   transition={{ 
                     ease: "linear", 
                     duration: 30, 
                     repeat: Infinity 
                   }}
                   className="flex flex-nowrap"
                 >
                   {[...(section.images || []), ...(section.images || []), ...(section.images || [])].map((src, idx) => (
                     <div key={idx} className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 px-2">
                       <img src={src} alt="" className="w-full h-full object-cover rounded-md" />
                     </div>
                   ))}
                 </motion.div>
               </div>
            </section>
          );
        }

        return null;
      })}
    </>
  );
}

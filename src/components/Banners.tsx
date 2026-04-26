import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function Banners() {
  const { currentLocale } = useContent();
  const { main, sub, text } = currentLocale.homeBanners;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative h-[500px] lg:h-[700px] overflow-hidden group"
          >
            <img 
              src={main.image} 
              alt={main.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">
              <span className="text-white text-sm font-medium tracking-[0.2em] uppercase mb-3 block">
                {main.subtitle}
              </span>
              <h3 className="text-white text-4xl md:text-5xl font-serif font-bold mb-8">
                {main.title}
              </h3>
              <Link to="/shop" className="flex items-center gap-3 border-b border-white text-white pb-2 text-sm font-medium uppercase tracking-widest hover:gap-5 transition-all w-fit">
                {main.btn} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex-grow min-h-[350px] lg:min-h-0 overflow-hidden group"
            >
              <img 
                src={sub.image} 
                alt={sub.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out object-top" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <span className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
                  {sub.subtitle}
                </span>
                <h3 className="text-white text-3xl font-serif font-bold mb-5">
                  {sub.title}
                </h3>
                <Link to="/shop" className="flex items-center gap-3 text-white text-sm font-medium uppercase tracking-widest hover:gap-5 transition-all w-fit">
                  {sub.btn} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-50 p-10 flex flex-col justify-center border border-gray-100 min-h-[250px]"
            >
              <h4 className="font-serif text-2xl font-bold mb-3 text-gray-900">{text.title}</h4>
              <p className="text-gray-500 mb-6 font-light leading-relaxed">
                {text.desc}
              </p>
              <Link to="/shop" className="inline-block text-sm font-bold uppercase tracking-widest border-b border-black pb-1 w-fit hover:text-gray-500 hover:border-gray-500 transition-colors">
                {text.btn}
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

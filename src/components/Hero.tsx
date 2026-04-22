import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#F9F9F8]">
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
                Spring / Summer 2026
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-[1.05] tracking-tight text-gray-900">
              Refining <br /> 
              <span className="italic font-light text-gray-500">Everyday</span> <br /> 
              Elegance.
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-md leading-relaxed font-light">
              Discover the modern aesthetic with our newly curated collection. Designed for the bold, the beautiful, and the minimalist.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="group flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-all">
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/lookbook" className="flex items-center justify-center bg-transparent border border-black text-black px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                Explore Lookbook
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
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80" 
                alt="Contemporary Fashion" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Floating editorial element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 shadow-xl max-w-[240px] hidden md:block"
            >
              <p className="text-xs font-bold tracking-widest uppercase mb-3 text-black">Editor's Pick</p>
              <p className="text-sm text-gray-600 font-serif italic leading-relaxed">
                "The perfect balance of form and function for the modern wardrobe."
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

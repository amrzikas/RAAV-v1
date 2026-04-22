import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Banners() {
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
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop&q=80" 
              alt="Winter Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">
              <span className="text-white text-sm font-medium tracking-[0.2em] uppercase mb-3 block">
                Archive
              </span>
              <h3 className="text-white text-4xl md:text-5xl font-serif font-bold mb-8">
                Classic Winter
              </h3>
              <button className="flex items-center gap-3 border-b border-white text-white pb-2 text-sm font-medium uppercase tracking-widest hover:gap-5 transition-all w-fit">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </button>
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
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80" 
                alt="Summer Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out object-top" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <span className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
                  Trending Now
                </span>
                <h3 className="text-white text-3xl font-serif font-bold mb-5">
                  Summer Essentials
                </h3>
                <button className="flex items-center gap-3 text-white text-sm font-medium uppercase tracking-widest hover:gap-5 transition-all w-fit">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#F9F9F8] p-10 flex flex-col justify-center border border-gray-100"
            >
              <h4 className="font-serif text-2xl font-bold mb-3 text-gray-900">Accessories Sale</h4>
              <p className="text-gray-500 mb-6 font-light leading-relaxed">
                Up to 40% off on selected carefully curated items. Upgrade your look instantly.
              </p>
              <a href="#" className="inline-block text-sm font-bold uppercase tracking-widest border-b border-black pb-1 w-fit hover:text-gray-500 hover:border-gray-500 transition-colors">
                Discover More
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

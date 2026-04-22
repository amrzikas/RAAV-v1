import { motion } from 'motion/react';
import { Quote as QuoteIcon } from 'lucide-react';

export default function Quote() {
  return (
    <section className="py-24 md:py-32 bg-[#F9F9F8]">
      <div className="container mx-auto px-4 text-center max-w-4xl relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8 text-black/10"
        >
          <QuoteIcon className="w-16 h-16 fill-current" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-10 text-gray-900"
        >
          "We love a good compliment,<br className="hidden md:block" /> 
          <span className="italic font-light text-gray-500">but we love a great fit even more.</span>"
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg mb-10 font-light"
        >
          Elegance is the only beauty that never fades. We carefully curate our pieces to ensure you not only look exceptional but feel perfectly at ease in your own skin.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="w-12 h-[1px] bg-black mx-auto mb-6"></div>
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-gray-900">
            The RAAV Team
          </p>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const lookbookImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80',
    title: 'Urban Minimal',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80',
    title: 'Spring Essentials',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1434389678232-06b2a4131af6?auto=format&fit=crop&q=80',
    title: 'Raw Textures',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80',
    title: 'Evening Silhouette',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    title: 'The Modern Suit',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-2',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1534126416832-a88fdf291122?auto=format&fit=crop&q=80',
    title: 'Layered Contrast',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1485230895905-31d0115e8111?auto=format&fit=crop&q=80',
    title: 'Casual Refined',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
  }
];

export default function Lookbook() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Content */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <span className="h-[1px] w-8 bg-black"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
              Editorial
            </span>
            <span className="h-[1px] w-8 bg-black"></span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 tracking-tight"
          >
            Spring / Summer <br/><span className="italic font-light text-gray-500">2026 Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-light leading-relaxed text-lg"
          >
            A visual exploration of forms, fabrics, and movement. Raw elegance meets modern sensibilities designed for the bold and the beautiful.
          </motion.p>
        </div>

        {/* Masonry-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {lookbookImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              className={`relative group overflow-hidden bg-gray-100 ${image.colSpan} ${image.rowSpan}`}
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl md:text-2xl font-serif font-bold mb-2 tracking-wide">
                    {image.title}
                  </h3>
                  <Link to="/shop" className="inline-flex items-center gap-2 text-white/90 hover:text-white text-xs font-bold uppercase tracking-widest group/link">
                    Shop The Look <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center pb-12"
        >
          <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-8">Ready to elevate your wardrobe?</p>
          <Link to="/shop" className="inline-block bg-black text-white px-10 py-5 text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors">
            View All Products
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

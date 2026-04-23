import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Header Area */}
      <div className="bg-gray-50 py-20 mb-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 tracking-tight text-gray-900"
          >
            About RAAV
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto font-light text-lg"
          >
            A dedication to modern aesthetics, timeless craftsmanship, and the beauty of simplicity.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80" 
              alt="Atelier workspace" 
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-6">
              Founded on the principles of conscious design and enduring quality, RAAV was born from a desire to create a wardrobe that transcends transient trends. We believe that true elegance lies in the details.
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              Every piece in our collection is a testament to meticulous craftsmanship. We source only the finest sustainable materials, ensuring that our garments not only look exceptional but feel extraordinary and endure gracefully over time.
            </p>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-10 text-center"
          >
            <h3 className="text-xl font-serif font-bold mb-4">Design</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">
              Clean lines, understated silhouettes, and an unwavering commitment to minimalist aesthetics form the core of our design language.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 p-10 text-center"
          >
            <h3 className="text-xl font-serif font-bold mb-4">Sustainability</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">
              We prioritize ethical manufacturing and eco-conscious materials, recognizing our responsibility to the planet and future generations.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 p-10 text-center"
          >
            <h3 className="text-xl font-serif font-bold mb-4">Craftsmanship</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">
              Partnering with skilled artisans, we ensure every seam, stitch, and finish meets our uncompromising standards of quality.
            </p>
          </motion.div>
        </div>

        {/* Studio Image Full Width */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <img 
            src="https://images.unsplash.com/photo-1595348020949-81ce4fcdd912?w=1600&auto=format&fit=crop&q=80" 
            alt="Fashion studio" 
            className="w-full h-96 md:h-[500px] object-cover"
          />
        </motion.div>

      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "Where do you ship?",
        a: "We currently ship to over 50 countries worldwide. Shipping costs and delivery times vary by location, which will be calculated at checkout."
      },
      {
        q: "How long will it take to get my order?",
        a: "Orders processed here will take 3-5 business days to arrive for domestic deliveries. Overseas deliveries can take anywhere from 7-16 days. Delivery details will be provided in your confirmation email."
      },
      {
        q: "Can I track my order?",
        a: "Yes! Once your order ships, we will send you a shipment confirmation email with a tracking number so you can keep tabs on your package."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of the delivery date. Items must be unworn, unwashed, and have original tags attached. We offer free returns for all domestic orders."
      },
      {
        q: "How do I process a return?",
        a: "To process a return, simply log into your account, visit your order history, and click 'Initiate Return' next to the appropriate item. A prepaid shipping label will be generated for you."
      }
    ]
  },
  {
    category: "Product & Fit",
    questions: [
      {
        q: "How do I know my size?",
        a: "We provide detailed sizing charts on every product page. If you are between sizes, we generally recommend sizing up for a more relaxed, modern fit."
      },
      {
        q: "Are the colors accurate representation?",
        a: "We make every effort to display as accurately as possible the colors and images of our products. However, computer monitors vary, so we cannot guarantee that your monitor's display of any color will be completely accurate."
      }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        <div className="text-center mb-16">
          <HelpCircle className="w-12 h-12 mx-auto mb-6 text-gray-200" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-light">
            Find answers to our most common questions below. If you can't find what you're looking for, please don't hesitate to contact our support team.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="text-2xl font-serif font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2">{group.category}</h2>
              <div className="space-y-4">
                {group.questions.map((faq, index) => {
                  const id = `${groupIndex}-${index}`;
                  const isOpen = openIndex === id;
                  
                  return (
                    <div key={index} className="border border-gray-200 overflow-hidden">
                      <button 
                        onClick={() => toggleFAQ(id)}
                        className="w-full bg-gray-50 flex items-center justify-between p-5 text-left hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{faq.q}</span>
                        {isOpen ? <Minus className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" /> : <Plus className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />}
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white"
                          >
                            <div className="p-5 text-gray-600 font-light leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 p-8 text-center border border-gray-200">
          <h3 className="text-xl font-serif font-bold mb-2">Still need help?</h3>
          <p className="text-gray-500 font-light mb-6">Our customer support team is available Monday through Friday.</p>
          <Link to="/contact" className="inline-block bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}

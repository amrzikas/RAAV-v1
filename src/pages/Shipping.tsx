import { Truck } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Shipping() {
  const { content } = useContent();

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <Truck className="w-12 h-12 mx-auto mb-6 text-gray-200" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight text-gray-900">Shipping & Delivery</h1>
          <div className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-wrap text-left rtl:text-right">
            {content.shippingPolicy}
          </div>
        </div>
      </div>
    </div>
  );
}

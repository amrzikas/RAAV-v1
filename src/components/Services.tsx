import { Truck, RefreshCw, ShieldCheck, Tag } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Complimentary shipping on all orders over $150.',
  },
  {
    icon: RefreshCw,
    title: '30 Days Return',
    description: 'Simply return it within 30 days for an exchange.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    description: 'Safe and encrypted transactions guaranteed.',
  },
  {
    icon: Tag,
    title: 'Member Discounts',
    description: 'Register and get exclusive offers and deals.',
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <feature.icon className="w-8 h-8 text-black" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

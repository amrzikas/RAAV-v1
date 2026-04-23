import Hero from '../components/Hero';
import Services from '../components/Services';
import Products from '../components/Products';
import Banners from '../components/Banners';
import Quote from '../components/Quote';
import InstagramFeed from '../components/InstagramFeed';
import CustomSectionsRenderer from '../components/CustomSectionsRenderer';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Products />
      <Banners />
      <CustomSectionsRenderer />
      <Quote />
      <InstagramFeed />
    </>
  );
}

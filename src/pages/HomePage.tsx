import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, ShoppingCart, Scissors, MessageSquare } from 'lucide-react';
import { galleryImages, products } from '@/lib/data';
import { useCartStore, Product } from '@/stores/cartStore';
import { toast } from 'sonner';
export function HomePage() {
  const addItem = useCartStore(s => s.addItem);
  const openCart = useCartStore(s => s.openCart);
  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
    openCart();
  };
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-beagle-brown/5 overflow-hidden">
        <div className="container-padding section-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <h1 className="font-display text-5xl md:text-7xl text-beagle-brown leading-tight">
                A Haven for <br /> Beagle Lovers
              </h1>
              <p className="mt-6 text-lg text-beagle-brown/80 max-w-md mx-auto md:mx-0">
                Welcome to Beagle Bliss, the ultimate destination for everything beagle. Share photos, shop curated products, book grooming, and get expert AI vet advice.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-beagle-coral hover:bg-beagle-coral/90 text-white shadow-lg transition-transform hover:scale-105">
                  <NavLink to="/gallery">Explore Gallery <ArrowRight className="ml-2 h-5 w-5" /></NavLink>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-beagle-coral text-beagle-coral hover:bg-beagle-coral/10 hover:text-beagle-coral transition-transform hover:scale-105">
                  <NavLink to="/shop">Shop Now</NavLink>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-80 md:h-auto aspect-[4/3]"
            >
              <img
                src="https://images.unsplash.com/photo-1598875184988-5e67b1a8e4b4?q=80&w=2187&auto=format&fit=crop"
                alt="Happy Beagle"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl transform md:rotate-3"
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="section-padding container-padding">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-beagle-brown">What We Offer</h2>
          <p className="mt-4 text-lg text-beagle-brown/70 max-w-2xl mx-auto">
            Everything your beagle needs for a happy, healthy life, all in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard icon={Heart} title="Photo Gallery" description="Share and admire adorable photos of beagles from our community." link="/gallery" />
          <FeatureCard icon={ShoppingCart} title="Curated Shop" description="Find the best food, toys, and supplies specifically chosen for beagles." link="/shop" />
          <FeatureCard icon={Scissors} title="Grooming Services" description="Book professional grooming sessions to keep your beagle looking sharp." link="/services" />
          <FeatureCard icon={MessageSquare} title="Vet AI Assistant" description="Get instant, helpful advice for your beagle-related questions." link="/vet-ai" />
        </div>
      </section>
      {/* Gallery Preview */}
      <section className="section-padding bg-beagle-brown/5">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-beagle-brown">Community Gallery</h2>
            <p className="mt-4 text-lg text-beagle-brown/70">A glimpse of our adorable beagle community.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.slice(0, 4).map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="aspect-square"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-beagle-brown text-beagle-brown hover:bg-beagle-brown/10 hover:text-beagle-brown transition-transform hover:scale-105">
              <NavLink to="/gallery">View More <ArrowRight className="ml-2 h-5 w-5" /></NavLink>
            </Button>
          </div>
        </div>
      </section>
      {/* Shop Preview */}
      <section className="section-padding container-padding">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-beagle-brown">Featured Products</h2>
          <p className="mt-4 text-lg text-beagle-brown/70">Our top picks for your beloved beagle.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col group">
                <div className="overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-beagle-brown">{product.name}</h3>
                  <p className="text-beagle-brown/70 mt-2 flex-grow">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-beagle-coral">${product.price}</span>
                    <Button onClick={() => handleAddToCart(product)} className="bg-beagle-coral hover:bg-beagle-coral/90 text-white">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-beagle-coral hover:bg-beagle-coral/90 text-white shadow-lg transition-transform hover:scale-105">
            <NavLink to="/shop">Visit Shop <ArrowRight className="ml-2 h-5 w-5" /></NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
}
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}
function FeatureCard({ icon: Icon, title, description, link }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 text-center h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className="inline-block p-4 bg-beagle-coral/20 rounded-full mb-4">
          <Icon className="h-8 w-8 text-beagle-coral" />
        </div>
        <h3 className="text-2xl font-bold text-beagle-brown">{title}</h3>
        <p className="mt-2 text-beagle-brown/70">{description}</p>
        <Button asChild variant="link" className="mt-4 text-beagle-coral">
          <NavLink to={link}>Learn More <ArrowRight className="ml-1 h-4 w-4" /></NavLink>
        </Button>
      </Card>
    </motion.div>
  );
}
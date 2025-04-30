
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&auto=format&fit=crop&w=3024&q=80')"
        }}
      >
        <div className="hero-overlay" />
      </div>
      
      <div className="relative h-full container-custom flex flex-col justify-center items-start">
        <div className="max-w-xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Experience Desert Adventure in Morocco
          </h1>
          <p className="text-lg md:text-xl text-sand-100 mb-8">
            Explore the magnificent Moroccan desert on our premium quad bikes. 
            Book your thrilling adventure today!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/booking">
              <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-8 py-6 text-lg">
                Book Now
              </Button>
            </Link>
            <Link to="/tours">
              <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6 text-lg">
                Explore Tours
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

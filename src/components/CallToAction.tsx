
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

const CallToAction: React.FC = () => {
  const { theme } = useTheme();

  const bgClass = theme === 'dark' 
    ? 'bg-terracotta-900 text-white' 
    : 'bg-terracotta-500 text-white';

  return (
    <section className={`section-padding ${bgClass} relative overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-moroccan-pattern bg-repeat"></div>
      </div>
      
      <div className="container-custom text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Ready for an Adventure?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
          Book your quad bike adventure today and experience the thrill of riding through Morocco's stunning desert landscapes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/booking" className="animate-fade-in delay-200">
            <Button className={`${theme === 'dark' 
              ? 'bg-white text-terracotta-900 hover:bg-sand-100' 
              : 'bg-white text-terracotta-600 hover:bg-sand-100'} px-8 py-6 text-lg`}
            >
              Book Now
            </Button>
          </Link>
          <Link to="/contact" className="animate-fade-in delay-300">
            <Button variant="outline" className="border-white text-white hover:bg-terracotta-600/30 px-8 py-6 text-lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

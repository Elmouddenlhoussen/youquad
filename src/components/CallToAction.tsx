
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="section-padding bg-terracotta-500 text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for an Adventure?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Book your quad bike adventure today and experience the thrill of riding through Morocco's stunning desert landscapes.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/booking">
            <Button className="bg-white text-terracotta-600 hover:bg-sand-100 px-8 py-6 text-lg">
              Book Now
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-white text-white hover:bg-terracotta-600 px-8 py-6 text-lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

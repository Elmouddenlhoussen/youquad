
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import LocationMap from '@/components/LocationMap';
import { quads } from '@/data/quads';
import QuadCard from '@/components/QuadCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  // Display only 3 quads on homepage
  const featuredQuads = quads.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      {/* Featured Quads Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="heading-md">Featured Quads</h2>
            <Link to="/quads">
              <Button variant="outline" className="border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50">
                View All Quads
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredQuads.map((quad) => (
              <QuadCard
                key={quad.id}
                id={quad.id}
                name={quad.name}
                image={quad.image}
                price={quad.price}
                rating={quad.rating}
                capacity={quad.capacity}
                type={quad.type}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Testimonials />
      <LocationMap />
      <CallToAction />
    </div>
  );
};

export default Index;

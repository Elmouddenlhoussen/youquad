
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
import { motion } from 'framer-motion';
import WeatherWidget from '@/components/WeatherWidget';
import DesertScene from '@/components/3D/DesertScene';
import QuadShowcase from '@/components/3D/QuadShowcase';

const Index = () => {
  // Display only 3 quads on homepage
  const featuredQuads = quads.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      {/* Interactive 3D Desert Scene */}
      <motion.section 
        className="section-padding bg-gradient-to-b from-white to-sand-100 dark:from-sand-900 dark:to-sand-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container-custom">
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="heading-md text-center mb-2">Experience Morocco in 3D</h2>
            <p className="text-center text-sand-600 dark:text-sand-300 mb-6 max-w-2xl">
              Explore the stunning landscapes and thrilling adventures that await you in the magnificent Moroccan desert
            </p>
            <DesertScene className="w-full max-w-4xl shadow-xl" />
          </div>
        </div>
      </motion.section>
      
      {/* 3D Quad Showcase */}
      <section className="section-padding bg-white dark:bg-sand-900">
        <div className="container-custom">
          <QuadShowcase className="shadow-xl" />
        </div>
      </section>
      
      {/* Featured Quads Section */}
      <section className="section-padding bg-sand-50 dark:bg-sand-800">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="heading-md">Featured Quads</h2>
            <Link to="/quads">
              <Button variant="outline" className="border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50 dark:border-terracotta-400 dark:text-terracotta-400 dark:hover:bg-terracotta-900/30">
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
      
      {/* Weather Section */}
      <section className="section-padding bg-white dark:bg-sand-900">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="heading-md">Desert Weather</h2>
            <p className="text-sand-600 dark:text-sand-300">
              Check current conditions before planning your adventure
            </p>
          </div>
          <div className="max-w-xl mx-auto">
            <WeatherWidget />
            <div className="mt-6 text-center">
              <p className="text-sand-600 dark:text-sand-400 mb-4">
                Weather conditions can change quickly in the desert. We recommend checking the 
                forecast before booking your tour.
              </p>
              <Link to="/tours">
                <Button className="bg-terracotta-600 hover:bg-terracotta-700">
                  View Tours
                </Button>
              </Link>
            </div>
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


import React from 'react';
import { MapPin, Calendar, Star, Shield } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <MapPin className="h-10 w-10 text-terracotta-500" />,
      title: 'Prime Locations',
      description: 'Access exclusive routes through the stunning Moroccan desert landscapes of Ait Melloul.'
    },
    {
      icon: <Calendar className="h-10 w-10 text-terracotta-500" />,
      title: 'Easy Booking',
      description: 'Simple online reservation system with real-time availability and instant confirmation.'
    },
    {
      icon: <Star className="h-10 w-10 text-terracotta-500" />,
      title: 'Quality Equipment',
      description: 'Modern, well-maintained quad bikes suitable for beginners and experienced riders.'
    },
    {
      icon: <Shield className="h-10 w-10 text-terracotta-500" />,
      title: 'Safety First',
      description: 'Comprehensive safety briefing, quality gear, and experienced guides for your peace of mind.'
    }
  ];

  return (
    <section className="bg-sand-50 section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Why Choose YouQuad</h2>
          <p className="text-sand-700 max-w-2xl mx-auto text-lg">
            We provide the best quad biking experience in Morocco with top-quality equipment, 
            experienced guides, and breathtaking routes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center card-hover"
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-sand-800 mb-2">{feature.title}</h3>
              <p className="text-sand-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

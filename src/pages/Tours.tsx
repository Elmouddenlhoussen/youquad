
import React from 'react';
import { tourPackages } from '@/data/quads';
import { Star, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Tours = () => {
  return (
    <div className="min-h-screen bg-sand-50">
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">Guided Tour Packages</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Experience the Moroccan desert with our expert guides on carefully planned routes.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {tourPackages.map((tour, index) => (
          <div 
            key={tour.id} 
            className={`bg-white rounded-lg shadow-md overflow-hidden mb-8 ${index === 0 ? 'border-2 border-terracotta-500' : ''}`}
          >
            {index === 0 && (
              <div className="bg-terracotta-500 text-white text-center py-2 font-medium">
                Most Popular
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="h-64 md:h-auto">
                <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:col-span-2">
                <div className="flex justify-between items-start flex-wrap">
                  <h2 className="text-2xl font-bold text-sand-800 mb-2">{tour.name}</h2>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">{tour.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-sand-500 mr-1" />
                  <span className="mr-4">{tour.duration}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tour.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-700' 
                      : tour.difficulty === 'Moderate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {tour.difficulty}
                  </span>
                </div>
                
                <p className="text-sand-600 mb-4">{tour.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-medium text-sand-800 mb-2">Includes:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1">
                    {tour.includes.map((item, i) => (
                      <li key={i} className="text-sand-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-terracotta-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center flex-wrap">
                  <div className="text-2xl font-bold text-terracotta-600 mb-4 md:mb-0">
                    {tour.price} MAD <span className="text-sm text-sand-500 font-normal">/ person</span>
                  </div>
                  <Link to="/booking">
                    <Button className="bg-terracotta-600 hover:bg-terracotta-700">
                      Book This Tour
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-sand-100 rounded-lg p-6 mt-12 border border-sand-200">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-terracotta-500 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-sand-800 mb-2">Custom Tours Available</h3>
              <p className="text-sand-600">
                Looking for a different kind of adventure? Contact us to create a custom tour package 
                tailored to your group's preferences and skill level.
              </p>
              <Link to="/contact" className="text-terracotta-600 font-medium hover:text-terracotta-700 inline-block mt-4">
                Contact Us for Custom Tours →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tours;


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { quads } from '@/data/quads';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Star, Clock, Users, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const QuadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const quad = quads.find(q => q.id === parseInt(id || '0'));

  if (!quad) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="heading-lg mb-4">Quad Not Found</h1>
        <p className="text-sand-600 mb-8">The quad you are looking for does not exist.</p>
        <Link to="/quads">
          <Button>View All Quads</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="container-custom py-12">
        <div className="mb-8">
          <Link to="/quads" className="text-terracotta-600 hover:text-terracotta-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Quads
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quad Image */}
            <div className="h-96 overflow-hidden">
              <img src={quad.image} alt={quad.name} className="w-full h-full object-cover" />
            </div>

            {/* Quad Info */}
            <div className="p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-sand-800">{quad.name}</h1>
                <span className="bg-terracotta-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {quad.type}
                </span>
              </div>

              <div className="flex items-center mt-2 mb-4">
                <div className="flex items-center mr-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{quad.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center mr-4">
                  <Clock className="h-5 w-5 text-sand-500 mr-1" />
                  <span>Hourly Rental</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-sand-500 mr-1" />
                  <span>{quad.capacity} rider{quad.capacity > 1 ? 's' : ''}</span>
                </div>
              </div>

              <p className="text-sand-600 mb-6">{quad.description}</p>

              <div className="text-2xl font-bold text-terracotta-600 mb-6">
                {quad.price} MAD <span className="text-sm text-sand-500 font-normal">/ hour</span>
              </div>

              <Link to="/booking">
                <Button className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-lg py-6">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="specs" className="p-8 border-t border-sand-100">
            <TabsList>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-sand-800">Technical Specifications</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-sand-600">Engine</span>
                      <span className="font-medium text-sand-800">{quad.specs.engine}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sand-600">Power</span>
                      <span className="font-medium text-sand-800">{quad.specs.power}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sand-600">Transmission</span>
                      <span className="font-medium text-sand-800">{quad.specs.transmission}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sand-600">Top Speed</span>
                      <span className="font-medium text-sand-800">{quad.specs.topSpeed}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="pt-6">
              <h3 className="font-semibold text-lg mb-4 text-sand-800">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                {quad.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-terracotta-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12">
          <h2 className="heading-md mb-6">Safety Information</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="mb-4">
              Please note the following safety guidelines when riding our quad bikes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sand-700">
              <li>All riders must wear helmets at all times (provided with your rental)</li>
              <li>Minimum age requirement: 16 years for adult quads, 10 years for youth models</li>
              <li>Follow the guide's instructions and stay on designated paths</li>
              <li>Maintain a safe distance from other riders</li>
              <li>No alcohol consumption before or during your ride</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuadDetail;

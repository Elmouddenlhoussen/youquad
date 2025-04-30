
import React from 'react';
import { MapPin } from 'lucide-react';

const LocationMap: React.FC = () => {
  // In a real implementation, we would integrate with Google Maps API
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Find Us</h2>
          <p className="text-sand-700 max-w-2xl mx-auto text-lg">
            Located in Lmzar, Ait Melloul, Morocco. Easy to reach and with convenient pickup options.
          </p>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg border border-sand-200 h-[400px] relative bg-sand-100">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md text-center max-w-md">
              <MapPin className="h-10 w-10 text-terracotta-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-sand-800 mb-1">YouQuad Desert Adventures</h3>
              <p className="text-sand-600">Lmzar, Ait Melloul, Morocco</p>
              <p className="text-sand-600 mt-2">+212 600 000 000</p>
              <div className="mt-4">
                <button className="btn-primary">Get Directions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;


import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

const LocationMap: React.FC = () => {
  const { theme } = useTheme();
  
  const bgClass = theme === 'dark' 
    ? 'bg-sand-800 text-sand-100' 
    : 'bg-white text-sand-700';
  
  const mapBgClass = theme === 'dark'
    ? 'bg-sand-700 border-sand-600'
    : 'bg-sand-100 border-sand-200';
    
  const cardClass = theme === 'dark'
    ? 'bg-sand-800 text-white shadow-lg border border-sand-700'
    : 'bg-white text-sand-800 shadow-md';

  return (
    <section className={`section-padding ${bgClass}`}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className={`heading-lg mb-4 ${theme === 'dark' ? 'text-sand-100' : 'text-sand-800'}`}>Find Us</h2>
          <p className={`${theme === 'dark' ? 'text-sand-300' : 'text-sand-700'} max-w-2xl mx-auto text-lg`}>
            Located in Lmzar, Ait Melloul, Morocco. Easy to reach and with convenient pickup options.
          </p>
        </div>

        <div className={`rounded-lg overflow-hidden shadow-lg border h-[400px] relative ${mapBgClass}`}>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`p-6 rounded-lg ${cardClass} text-center max-w-md animate-fade-in`}>
              <MapPin className={`h-10 w-10 ${theme === 'dark' ? 'text-terracotta-400' : 'text-terracotta-500'} mx-auto mb-2`} />
              <h3 className="text-xl font-bold mb-1">YouQuad Desert Adventures</h3>
              <p className={theme === 'dark' ? 'text-sand-300' : 'text-sand-600'}>Lmzar, Ait Melloul, Morocco</p>
              <p className={`${theme === 'dark' ? 'text-sand-300' : 'text-sand-600'} mt-2`}>+212 600 000 000</p>
              <div className="mt-4">
                <Button className={theme === 'dark' 
                  ? 'bg-terracotta-600 hover:bg-terracotta-700 text-white' 
                  : 'bg-terracotta-500 hover:bg-terracotta-600 text-white'}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;

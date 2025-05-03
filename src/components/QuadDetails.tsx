
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuadScene from './3D/QuadScene';
import ReviewsSection from './reviews/ReviewsSection';

interface QuadFeature {
  icon: React.ReactNode;
  name: string;
  description: string;
}

interface QuadDetailsProps {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  features?: QuadFeature[];
  specs?: Record<string, string>;
  color: string;
  capacity?: number;
  images?: string[];
  className?: string;
}

const QuadDetails: React.FC<QuadDetailsProps> = ({
  id,
  name,
  description,
  longDescription,
  price,
  features,
  specs,
  color,
  capacity,
  images,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left column - Quad 3D model and images */}
        <div>
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
            <QuadScene color={color} autoRotate={true} />
          </div>
          
          {images && images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
                  <img 
                    src={img} 
                    alt={`${name} - view ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Right column - Quad details and booking */}
        <div>
          <div className="flex items-center mb-2">
            <Badge className="bg-terracotta-500 text-white mr-2">Featured</Badge>
            {capacity && <Badge variant="outline">{capacity} person{capacity > 1 ? 's' : ''}</Badge>}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          
          <div className="mb-4">
            <p className="text-xl font-semibold text-terracotta-600 dark:text-terracotta-400">
              {price} MAD <span className="text-sm font-normal">/ day</span>
            </p>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">{description}</p>
          
          <div className="mb-8">
            <Link to={`/booking?quad=${id}`}>
              <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-white flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book Now
              </Button>
            </Link>
          </div>
          
          {features && features.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2 text-terracotta-500 dark:text-terracotta-400">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium mb-1">{feature.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Tabs for additional information */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="p-6 bg-white dark:bg-sand-800 rounded-lg shadow-md">
          <div className="prose dark:prose-invert max-w-none">
            {longDescription ? (
              <div dangerouslySetInnerHTML={{ __html: longDescription }} />
            ) : (
              <p>{description}</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="p-6 bg-white dark:bg-sand-800 rounded-lg shadow-md">
          {specs && Object.keys(specs).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 border-b">
                  <span className="font-medium">{key}</span>
                  <span className="text-gray-600 dark:text-gray-400">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Specifications coming soon.</p>
          )}
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-4">
          <ReviewsSection allowFiltering={true} allowAddReview={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuadDetails;

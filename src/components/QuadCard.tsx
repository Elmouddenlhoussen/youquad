
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuadCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  capacity: number;
  type: string;
}

const QuadCard: React.FC<QuadCardProps> = ({ 
  id, 
  name, 
  image, 
  price, 
  rating, 
  capacity, 
  type 
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-terracotta-500 text-white text-sm font-bold px-2 py-1 rounded">
          {type}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-sand-800 mb-1">{name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sand-600 mb-2">Capacity: {capacity} rider{capacity > 1 ? 's' : ''}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-terracotta-600 font-bold">
            {price} MAD <span className="text-xs text-sand-500 font-normal">/ hour</span>
          </div>
          <Link to={`/quad/${id}`}>
            <Button variant="outline" className="border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuadCard;

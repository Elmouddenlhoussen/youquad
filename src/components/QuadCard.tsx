
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <Card className={`overflow-hidden ${theme === 'dark' ? 'bg-sand-800 border-sand-700' : 'bg-white'} h-full flex flex-col`}>
        <div className="relative h-48 overflow-hidden group">
          <motion.img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700"
            whileHover={{ scale: 1.05 }}
          />
          <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${theme === 'dark' ? 'from-black/40 to-transparent' : 'from-black/20 to-transparent'}`} />
          <div className="absolute top-2 right-2 bg-terracotta-500 text-white text-sm font-bold px-2 py-1 rounded shadow-md">
            {type}
          </div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full flex items-center cursor-pointer">
                <ShieldCheck className="w-3 h-3 mr-1" />
                <span>Safety Info</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className={theme === 'dark' ? 'bg-sand-800 border-sand-700' : ''}>
              <div className="flex flex-col space-y-2">
                <h4 className="font-bold">Safety Guidelines</h4>
                <ul className="text-xs list-disc pl-4 space-y-1">
                  <li>Helmets provided and required</li>
                  <li>Comprehensive training session</li>
                  <li>Experienced guides accompany all tours</li>
                  <li>Insurance included with booking</li>
                </ul>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-sand-100' : 'text-sand-800'}`}>
              {name}
            </h3>
            <div className="flex items-center bg-yellow-100 px-2 py-0.5 rounded-full">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-medium text-sm text-yellow-800">{rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center text-sm">
              <Users className={`h-4 w-4 ${theme === 'dark' ? 'text-sand-300' : 'text-sand-600'} mr-1`} />
              <span className={theme === 'dark' ? 'text-sand-300' : 'text-sand-600'}>
                {capacity} {capacity > 1 ? 'riders' : 'rider'}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className={`h-4 w-4 ${theme === 'dark' ? 'text-sand-300' : 'text-sand-600'} mr-1`} />
              <span className={theme === 'dark' ? 'text-sand-300' : 'text-sand-600'}>1-3 hours</span>
            </div>
          </div>

          <div className="mt-auto pt-4 flex flex-col space-y-3">
            <div className={`text-lg font-bold ${theme === 'dark' ? 'text-terracotta-300' : 'text-terracotta-600'}`}>
              {price} MAD <span className={`text-xs ${theme === 'dark' ? 'text-sand-400' : 'text-sand-500'} font-normal`}>/ hour</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link to={`/quad/${id}`} className="col-span-1">
                <Button 
                  variant="outline" 
                  className={`w-full ${theme === 'dark' 
                    ? "border-sand-600 text-sand-300 hover:bg-sand-700 hover:text-sand-200" 
                    : "border-sand-300 text-sand-700 hover:bg-sand-100"
                  }`}
                >
                  Details
                </Button>
              </Link>
              <Link to={`/booking?quad=${id}`} className="col-span-1">
                <Button 
                  className="w-full bg-terracotta-500 text-white hover:bg-terracotta-600"
                >
                  Book
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuadCard;

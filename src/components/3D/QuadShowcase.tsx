
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Bike } from 'lucide-react';
import QuadBike3D from './QuadBike3D';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

interface QuadFeature {
  name: string;
  value: string;
}

interface QuadInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  features?: QuadFeature[];
  tag?: string;
}

interface QuadShowcaseProps {
  className?: string;
  quads?: QuadInfo[];
}

const DEFAULT_QUADS: QuadInfo[] = [
  {
    id: 1,
    name: "Adventure Sport",
    description: "Our premium model for thrill-seekers. Powerful engine and superior handling.",
    price: 500,
    color: "#DE6547",
    tag: "Best Seller",
    features: [
      { name: "Engine", value: "450cc" },
      { name: "Max Speed", value: "70 km/h" },
      { name: "Range", value: "150 km" }
    ]
  },
  {
    id: 2,
    name: "Desert Explorer",
    description: "Perfect for long rides across varied terrain. Comfortable with great stability.",
    price: 450,
    color: "#2a6d82",
    features: [
      { name: "Engine", value: "400cc" },
      { name: "Max Speed", value: "65 km/h" },
      { name: "Range", value: "180 km" }
    ]
  },
  {
    id: 3,
    name: "Family Tandem",
    description: "Two-seater model ideal for sharing the adventure with a partner or child.",
    price: 650,
    color: "#6b4423",
    tag: "New",
    features: [
      { name: "Engine", value: "500cc" },
      { name: "Max Speed", value: "60 km/h" },
      { name: "Range", value: "140 km" }
    ]
  },
  {
    id: 4,
    name: "Mountain Climber",
    description: "Specialized for rough terrain and steep slopes. Ultimate performance.",
    price: 580,
    color: "#517a33",
    features: [
      { name: "Engine", value: "475cc" },
      { name: "Max Speed", value: "65 km/h" },
      { name: "Range", value: "160 km" }
    ]
  }
];

const QuadShowcase: React.FC<QuadShowcaseProps> = ({
  className = '',
  quads = DEFAULT_QUADS
}) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const currentQuad = quads[currentIndex];

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : quads.length - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex < quads.length - 1 ? prevIndex + 1 : 0));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <Card className={`${className} ${theme === 'dark' ? 'bg-sand-800/50' : 'bg-sand-100/50'} backdrop-blur-sm border-sand-200 dark:border-sand-700`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              <Bike className="h-6 w-6 text-terracotta-500" />
              <span>Quad Bike Collection</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Explore our quad bikes in 3D • Rotate and zoom to see details
            </CardDescription>
          </div>
          
          {currentQuad.tag && (
            <Badge className="bg-terracotta-500">{currentQuad.tag}</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 hover:bg-sand-200 dark:hover:bg-sand-700"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="flex-1 relative min-h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div 
                  className="relative h-72 md:h-auto"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <QuadBike3D color={currentQuad.color} autoRotate={!isHovered} />
                  
                  {isHovered && (
                    <motion.div 
                      className="absolute bottom-4 left-0 right-0 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={`text-sm px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-white/10 text-white/80' : 'bg-black/10 text-black/80'}`}>
                        Drag to rotate • Scroll to zoom
                      </span>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >                    
                    <h3 className={`text-xl md:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-sand-800'}`}>
                      {currentQuad.name}
                    </h3>
                    
                    <p className={`${theme === 'dark' ? 'text-sand-300' : 'text-sand-700'}`}>
                      {currentQuad.description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {currentQuad.features?.map((feature, idx) => (
                        <div key={idx} className="text-center p-2 rounded-md bg-sand-200/50 dark:bg-sand-700/50">
                          <p className="text-xs text-sand-500 dark:text-sand-400">{feature.name}</p>
                          <p className="font-medium">{feature.value}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`text-lg font-bold ${
                      theme === 'dark' ? 'text-terracotta-300' : 'text-terracotta-600'
                    }`}>
                      {currentQuad.price} MAD <span className="text-xs font-normal">/ day</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="ml-2 hover:bg-sand-200 dark:hover:bg-sand-700"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col pt-0 gap-4">
        <div className="flex justify-center w-full">
          {quads.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full mx-1 transition-colors duration-300 ${
                index === currentIndex
                  ? theme === 'dark'
                    ? 'bg-terracotta-500'
                    : 'bg-terracotta-600'
                  : theme === 'dark'
                  ? 'bg-sand-600'
                  : 'bg-sand-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="flex justify-center w-full">
          <Link to={`/quad/${currentQuad.id}`}>
            <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
              View Details & Book Now
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuadShowcase;

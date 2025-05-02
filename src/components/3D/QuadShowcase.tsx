
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Cuboid } from 'lucide-react';
import QuadBike3D from './QuadBike3D';
import { Link } from 'react-router-dom';

interface QuadInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
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
    color: "#DE6547"
  },
  {
    id: 2,
    name: "Desert Explorer",
    description: "Perfect for long rides across varied terrain. Comfortable with great stability.",
    price: 450,
    color: "#2a6d82"
  },
  {
    id: 3,
    name: "Family Tandem",
    description: "Two-seater model ideal for sharing the adventure with a partner or child.",
    price: 650,
    color: "#6b4423"
  },
  {
    id: 4,
    name: "Mountain Climber",
    description: "Specialized for rough terrain and steep slopes. Ultimate performance.",
    price: 580,
    color: "#517a33"
  }
];

const QuadShowcase: React.FC<QuadShowcaseProps> = ({
  className = '',
  quads = DEFAULT_QUADS
}) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
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
    <div className={`${className} ${theme === 'dark' ? 'bg-sand-800' : 'bg-sand-100'} rounded-xl p-6 overflow-hidden`}>
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-sand-800'}`}>
          3D Quad Bike Models
        </h2>
        <p className={`text-sm ${theme === 'dark' ? 'text-sand-400' : 'text-sand-600'}`}>
          Explore our quad bikes in 3D • Rotate and zoom to see details
        </p>
      </div>

      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
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
              <div className="relative h-72 md:h-auto">
                <QuadBike3D color={currentQuad.color} />
              </div>
              
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    theme === 'dark' ? 'bg-terracotta-900/30 text-terracotta-300' : 'bg-terracotta-100 text-terracotta-700'
                  }`}>
                    <Cuboid className="h-4 w-4" />
                    <span>Interactive 3D Model</span>
                  </div>
                  
                  <h3 className={`text-xl md:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-sand-800'}`}>
                    {currentQuad.name}
                  </h3>
                  
                  <p className={`${theme === 'dark' ? 'text-sand-300' : 'text-sand-700'}`}>
                    {currentQuad.description}
                  </p>
                  
                  <div className={`text-lg font-bold ${
                    theme === 'dark' ? 'text-terracotta-300' : 'text-terracotta-600'
                  }`}>
                    {currentQuad.price} MAD <span className="text-xs font-normal">/ day</span>
                  </div>
                  
                  <div className="pt-4">
                    <Link to={`/quad/${currentQuad.id}`}>
                      <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex justify-center mt-6">
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
    </div>
  );
};

export default QuadShowcase;

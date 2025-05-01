
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Check, X, Info, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const QuadComparison = () => {
  // Quad comparison data
  const quads = [
    {
      id: 1,
      name: "Standard Single",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
      price: 350,
      engineSize: "150cc",
      maxSpeed: "60 km/h",
      capacity: 1,
      suitable: ["Beginners", "Solo Riders"],
      terrainTypes: ["Desert", "Flat Terrain"],
      features: {
        automaticTransmission: true,
        electricStart: true,
        reverseGear: false,
        waterCooled: false,
        digitalDisplay: false
      }
    },
    {
      id: 2,
      name: "Adventure Sport",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      price: 500,
      engineSize: "250cc",
      maxSpeed: "80 km/h",
      capacity: 1,
      suitable: ["Intermediate", "Adventure Seekers"],
      terrainTypes: ["Desert", "Rocky Terrain", "Hills"],
      features: {
        automaticTransmission: true,
        electricStart: true,
        reverseGear: true,
        waterCooled: true,
        digitalDisplay: true
      }
    },
    {
      id: 3,
      name: "Utility Quad",
      image: "https://images.unsplash.com/photo-1526473125627-a94d583649a5",
      price: 450,
      engineSize: "300cc",
      maxSpeed: "70 km/h",
      capacity: 1,
      suitable: ["Experienced", "Utility Users"],
      terrainTypes: ["Desert", "Rocky Terrain", "Hills", "Muddy Areas"],
      features: {
        automaticTransmission: false,
        electricStart: true,
        reverseGear: true,
        waterCooled: true,
        digitalDisplay: false
      }
    },
    {
      id: 4,
      name: "Family Tandem",
      image: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab",
      price: 650,
      engineSize: "350cc",
      maxSpeed: "65 km/h",
      capacity: 2,
      suitable: ["Families", "Couples", "Beginners"],
      terrainTypes: ["Desert", "Flat Terrain", "Light Hills"],
      features: {
        automaticTransmission: true,
        electricStart: true,
        reverseGear: true,
        waterCooled: true,
        digitalDisplay: true
      }
    }
  ];

  // Feature descriptions for tooltips
  const featureDescriptions = {
    automaticTransmission: "Automatic transmission makes the quad easier to control without manual gear shifting",
    electricStart: "Push-button start system instead of kick-start",
    reverseGear: "Ability to reverse the quad without turning around",
    waterCooled: "Water cooling system for better engine performance in hot conditions",
    digitalDisplay: "Digital dashboard displaying speed, fuel level, and other information"
  };

  // Animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-sand-900">
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">Quad Bike Comparison</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Compare our different quad models to find the perfect match for your adventure.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Desktop comparison table (hidden on mobile) */}
          <motion.div 
            className="hidden lg:block overflow-x-auto"
            variants={itemVariants}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Feature</TableHead>
                  {quads.map((quad) => (
                    <TableHead key={quad.id} className="text-center">
                      {quad.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Image row */}
                <TableRow>
                  <TableCell className="font-medium">Image</TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id} className="text-center">
                      <img 
                        src={quad.image} 
                        alt={quad.name}
                        className="w-32 h-24 object-cover mx-auto rounded-lg" 
                      />
                    </TableCell>
                  ))}
                </TableRow>

                {/* Price row */}
                <TableRow>
                  <TableCell className="font-medium">Price (MAD/day)</TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id} className="text-center font-semibold">
                      {quad.price}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Engine Size row */}
                <TableRow>
                  <TableCell className="font-medium">Engine Size</TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id} className="text-center">
                      {quad.engineSize}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Max Speed row */}
                <TableRow>
                  <TableCell className="font-medium">Max Speed</TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id} className="text-center">
                      {quad.maxSpeed}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Capacity row */}
                <TableRow>
                  <TableCell className="font-medium">Rider Capacity</TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id} className="text-center">
                      {quad.capacity}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Suitable for row */}
                <TableRow>
                  <TableCell className="font-medium">Suitable for</TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id}>
                      <ul className="list-disc pl-5">
                        {quad.suitable.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Terrain Types row */}
                <TableRow>
                  <TableCell className="font-medium">Terrain Types</TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id}>
                      <ul className="list-disc pl-5">
                        {quad.terrainTypes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Features */}
                <TableRow>
                  <TableCell colSpan={5} className="font-medium text-lg border-b">
                    Features
                  </TableCell>
                </TableRow>

                {/* Automatic Transmission row */}
                <TableRow>
                  <TableCell className="font-medium">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-2">
                          Automatic Transmission
                          <HelpCircle className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">{featureDescriptions.automaticTransmission}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id} className="text-center">
                      {quad.features.automaticTransmission ? 
                        <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <X className="h-5 w-5 text-red-500 mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Electric Start row */}
                <TableRow>
                  <TableCell className="font-medium">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-2">
                          Electric Start
                          <HelpCircle className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">{featureDescriptions.electricStart}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id} className="text-center">
                      {quad.features.electricStart ? 
                        <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <X className="h-5 w-5 text-red-500 mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Reverse Gear row */}
                <TableRow>
                  <TableCell className="font-medium">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-2">
                          Reverse Gear
                          <HelpCircle className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">{featureDescriptions.reverseGear}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id} className="text-center">
                      {quad.features.reverseGear ? 
                        <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <X className="h-5 w-5 text-red-500 mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Water Cooled row */}
                <TableRow>
                  <TableCell className="font-medium">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-2">
                          Water Cooled
                          <HelpCircle className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">{featureDescriptions.waterCooled}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id} className="text-center">
                      {quad.features.waterCooled ? 
                        <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <X className="h-5 w-5 text-red-500 mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Digital Display row */}
                <TableRow>
                  <TableCell className="font-medium">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-2">
                          Digital Display
                          <HelpCircle className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">{featureDescriptions.digitalDisplay}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  {quads.map((quad) => (
                    <TableCell key={quad.id} className="text-center">
                      {quad.features.digitalDisplay ? 
                        <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <X className="h-5 w-5 text-red-500 mx-auto" />}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </motion.div>

          {/* Mobile cards (visible on mobile) */}
          <motion.div 
            className="grid grid-cols-1 gap-8 lg:hidden"
            variants={containerVariants}
          >
            {quads.map((quad, index) => (
              <motion.div 
                key={quad.id}
                className="bg-white dark:bg-sand-800 rounded-lg shadow-md overflow-hidden"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={quad.image} 
                    alt={quad.name} 
                    className="w-full h-48 object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-sand-800 dark:text-sand-100">{quad.name}</h3>
                  <p className="text-xl font-semibold text-terracotta-500 mt-2">{quad.price} MAD/day</p>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sand-600 dark:text-sand-400">Engine Size:</span>
                      <span className="font-medium text-sand-800 dark:text-sand-100">{quad.engineSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sand-600 dark:text-sand-400">Max Speed:</span>
                      <span className="font-medium text-sand-800 dark:text-sand-100">{quad.maxSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sand-600 dark:text-sand-400">Rider Capacity:</span>
                      <span className="font-medium text-sand-800 dark:text-sand-100">{quad.capacity}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-sand-800 dark:text-sand-100">Suitable for:</h4>
                    <ul className="list-disc pl-5 mt-1 text-sand-600 dark:text-sand-300">
                      {quad.suitable.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-sand-800 dark:text-sand-100">Terrain Types:</h4>
                    <ul className="list-disc pl-5 mt-1 text-sand-600 dark:text-sand-300">
                      {quad.terrainTypes.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-sand-800 dark:text-sand-100 mb-2">Features:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        {quad.features.automaticTransmission ? 
                          <Check className="h-5 w-5 text-green-500 mr-2" /> : 
                          <X className="h-5 w-5 text-red-500 mr-2" />}
                        <span className="text-sand-700 dark:text-sand-300">Automatic Transmission</span>
                      </div>
                      <div className="flex items-center">
                        {quad.features.electricStart ? 
                          <Check className="h-5 w-5 text-green-500 mr-2" /> : 
                          <X className="h-5 w-5 text-red-500 mr-2" />}
                        <span className="text-sand-700 dark:text-sand-300">Electric Start</span>
                      </div>
                      <div className="flex items-center">
                        {quad.features.reverseGear ? 
                          <Check className="h-5 w-5 text-green-500 mr-2" /> : 
                          <X className="h-5 w-5 text-red-500 mr-2" />}
                        <span className="text-sand-700 dark:text-sand-300">Reverse Gear</span>
                      </div>
                      <div className="flex items-center">
                        {quad.features.waterCooled ? 
                          <Check className="h-5 w-5 text-green-500 mr-2" /> : 
                          <X className="h-5 w-5 text-red-500 mr-2" />}
                        <span className="text-sand-700 dark:text-sand-300">Water Cooled</span>
                      </div>
                      <div className="flex items-center">
                        {quad.features.digitalDisplay ? 
                          <Check className="h-5 w-5 text-green-500 mr-2" /> : 
                          <X className="h-5 w-5 text-red-500 mr-2" />}
                        <span className="text-sand-700 dark:text-sand-300">Digital Display</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-10"
            variants={itemVariants}
          >
            <p className="text-sand-600 dark:text-sand-300 mb-4">
              Ready to book your adventure? Choose your preferred quad and start exploring!
            </p>
            <Link to="/booking">
              <Button className="bg-terracotta-500 text-white hover:bg-terracotta-600">
                Book Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuadComparison;

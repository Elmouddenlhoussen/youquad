import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Gallery images data
const galleryData = {
  adventures: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      alt: "Desert sand dunes adventure",
      caption: "Exploring the vast Sahara dunes"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1487525219605-eadb39ae229c",
      alt: "Quad bike tour through the desert",
      caption: "Group tour through golden sand valleys"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1542442828-287217bfb87f",
      alt: "Sunset quad tour",
      caption: "Magical sunset quad biking experience"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1511497584788-876760111969",
      alt: "Desert camping",
      caption: "Overnight camping adventure in the desert"
    }
  ],
  quads: [
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
      alt: "Sport quad bike",
      caption: "High-performance sport quad"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      alt: "Utility quad bike",
      caption: "Powerful utility quad for any terrain"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1526473125627-a94d583649a5",
      alt: "Racing quad bike",
      caption: "Professional racing quad"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab",
      alt: "Family quad bike",
      caption: "Family-friendly quad for all ages"
    }
  ],
  landscapes: [
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1547234935-80c7145ec969",
      alt: "Desert mountain range",
      caption: "Breathtaking desert mountain landscapes"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
      alt: "Desert oasis",
      caption: "Peaceful desert oasis surrounded by sand dunes"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1547473078-cbab237054c0",
      alt: "Sand dunes at sunset",
      caption: "Golden hour over magnificent sand dunes"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Desert wildlife",
      caption: "Encounter with desert wildlife"
    }
  ]
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    alt: string;
    caption: string;
    id: number;
    category: string;
  }>(null);

  const handleImageClick = (image: any, category: string) => {
    setSelectedImage({ ...image, category });
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    
    const currentCategory = galleryData[selectedImage.category as keyof typeof galleryData];
    const currentIndex = currentCategory.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % currentCategory.length;
    setSelectedImage({ ...currentCategory[nextIndex], category: selectedImage.category });
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    
    const currentCategory = galleryData[selectedImage.category as keyof typeof galleryData];
    const currentIndex = currentCategory.findIndex(img => img.id === selectedImage.id);
    const previousIndex = (currentIndex - 1 + currentCategory.length) % currentCategory.length;
    setSelectedImage({ ...currentCategory[previousIndex], category: selectedImage.category });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-sand-900">
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">Our Gallery</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Explore our stunning collection of desert adventures, quad bikes, and breathtaking landscapes.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <Tabs defaultValue="adventures" className="w-full">
          <TabsList className="mb-8 flex justify-center w-full overflow-x-auto">
            <TabsTrigger value="adventures" className="text-lg px-6">Adventures</TabsTrigger>
            <TabsTrigger value="quads" className="text-lg px-6">Quad Bikes</TabsTrigger>
            <TabsTrigger value="landscapes" className="text-lg px-6">Desert Landscapes</TabsTrigger>
          </TabsList>

          {/* Adventures Tab */}
          <TabsContent value="adventures" className="mt-2">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {galleryData.adventures.map((image) => (
                <motion.div
                  key={image.id}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => handleImageClick(image, 'adventures')}
                  variants={itemVariants}
                >
                  <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-4 bg-white dark:bg-sand-800">
                    <p className="text-sand-800 dark:text-sand-100 font-medium">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Quads Tab */}
          <TabsContent value="quads" className="mt-2">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {galleryData.quads.map((image) => (
                <motion.div
                  key={image.id}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => handleImageClick(image, 'quads')}
                  variants={itemVariants}
                >
                  <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-4 bg-white dark:bg-sand-800">
                    <p className="text-sand-800 dark:text-sand-100 font-medium">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Landscapes Tab */}
          <TabsContent value="landscapes" className="mt-2">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {galleryData.landscapes.map((image) => (
                <motion.div
                  key={image.id}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => handleImageClick(image, 'landscapes')}
                  variants={itemVariants}
                >
                  <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-4 bg-white dark:bg-sand-800">
                    <p className="text-sand-800 dark:text-sand-100 font-medium">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Lightbox modal for clicked images */}
      <Dialog open={!!selectedImage} onOpenChange={() => handleClose()}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-0">
          <div className="relative bg-black/95 rounded-lg overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-white z-50 hover:bg-white/20"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative h-[80vh] flex items-center justify-center p-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-2 text-white z-40 hover:bg-white/20"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              {selectedImage && (
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="max-h-full max-w-full object-contain" 
                />
              )}

              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 text-white z-40 hover:bg-white/20"
                onClick={handleNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            {selectedImage && (
              <div className="p-4 text-center text-white">
                <p className="text-lg">{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;

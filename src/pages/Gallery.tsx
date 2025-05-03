
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Filter, Bike } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Gallery images data with improved quad bike images
const galleryData = {
  adventures: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1539622230226-3d9381519348",
      alt: "Desert quad adventure",
      caption: "Exploring the vast Sahara dunes on quad bikes",
      tags: ["adventure", "desert", "group"]
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1608334481162-c0afa714aca1",
      alt: "Quad bike tour through the desert",
      caption: "Group tour through golden sand valleys",
      tags: ["tour", "group", "desert"]
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1594739393338-9559febdad31",
      alt: "Sunset quad tour",
      caption: "Magical sunset quad biking experience",
      tags: ["sunset", "tour", "scenic"]
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1626474378349-d29abf4993cb",
      alt: "Desert camping with quads",
      caption: "Overnight camping adventure in the desert with quad bikes",
      tags: ["camping", "adventure", "overnight"]
    }
  ],
  quads: [
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1587147081330-e9f61671addc",
      alt: "Sport quad bike",
      caption: "High-performance sport quad",
      tags: ["sport", "high-performance"]
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1578167635648-df04b80ca32a",
      alt: "Utility quad bike",
      caption: "Powerful utility quad for any terrain",
      tags: ["utility", "all-terrain"]
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1590212151753-237af0b60b87",
      alt: "Racing quad bike",
      caption: "Professional racing quad",
      tags: ["racing", "professional"]
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1612721047293-b7ee7c56a1c8",
      alt: "Family quad bike",
      caption: "Family-friendly quad for all ages",
      tags: ["family", "beginner"]
    }
  ],
  landscapes: [
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1594498653385-d5172c532c00",
      alt: "Desert mountain range with quad trails",
      caption: "Breathtaking desert mountain landscapes with quad trails",
      tags: ["mountains", "trails", "scenic"]
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1600182610361-8e4f75fa4580",
      alt: "Desert oasis with parked quads",
      caption: "Peaceful desert oasis perfect for quad adventures",
      tags: ["oasis", "resting", "scenic"]
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1605216663980-b7ca6e9f2451",
      alt: "Sand dunes for quad riding",
      caption: "Golden hour over magnificent sand dunes - perfect for quad biking",
      tags: ["dunes", "sunset", "scenic"]
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1503751071777-d2918b21bbd9",
      alt: "Desert quad adventure spot",
      caption: "Popular quad biking spot in the desert",
      tags: ["popular", "adventure", "scenic"]
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
    tags?: string[];
  }>(null);
  
  const [activeCategory, setActiveCategory] = useState<string>("adventures");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get all unique tags across all images
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    Object.values(galleryData).forEach(category => {
      category.forEach(image => {
        image.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags);
  }, []);

  const filteredImages = React.useMemo(() => {
    return galleryData[activeCategory as keyof typeof galleryData].filter(image => {
      const matchesSearch = searchTerm === "" || 
        image.caption.toLowerCase().includes(searchTerm.toLowerCase()) || 
        image.alt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = !activeTag || image.tags?.includes(activeTag);
      
      return matchesSearch && matchesTag;
    });
  }, [activeCategory, searchTerm, activeTag]);

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

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveTag(null);
    setSearchTerm("");
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
          <h1 className="text-4xl font-bold text-white mb-4">Quad Bike Gallery</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Explore our stunning collection of quad bikes, desert adventures, and breathtaking landscapes.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
          <TabsList className="mb-8 flex justify-center w-full overflow-x-auto">
            <TabsTrigger value="adventures" className="text-lg px-6">Adventures</TabsTrigger>
            <TabsTrigger value="quads" className="text-lg px-6">Quad Bikes</TabsTrigger>
            <TabsTrigger value="landscapes" className="text-lg px-6">Desert Landscapes</TabsTrigger>
          </TabsList>

          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3">
              <div className="flex items-center gap-2">
                <Bike className="h-5 w-5 text-terracotta-500" />
                <Label htmlFor="search" className="text-lg">Search Gallery</Label>
              </div>
              <Input
                id="search"
                placeholder="Search by description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-terracotta-500" />
                <Label className="text-lg">Filter by Tags</Label>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                <Button
                  key="all"
                  variant={activeTag === null ? "default" : "outline"} 
                  onClick={() => setActiveTag(null)}
                  size="sm"
                  className="text-xs"
                >
                  All
                </Button>
                
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={activeTag === tag ? "default" : "outline"} 
                    onClick={() => setActiveTag(tag)}
                    size="sm"
                    className="text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Featured Images Carousel */}
          <div className="block md:hidden mb-8">
            <h3 className="text-xl font-bold mb-4">Featured {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {filteredImages.map((image) => (
                  <CarouselItem key={image.id}>
                    <div 
                      className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
                      onClick={() => handleImageClick(image, activeCategory)}
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
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center mt-4">
                <CarouselPrevious className="static mx-2 transform-none" />
                <CarouselNext className="static mx-2 transform-none" />
              </div>
            </Carousel>
          </div>

          {/* Adventures Tab */}
          <TabsContent value="adventures" className="mt-2">
            {filteredImages.length > 0 ? (
              <motion.div 
                className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredImages.map((image) => (
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
                      <div className="mt-2 flex flex-wrap gap-1">
                        {image.tags?.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs bg-sand-200 dark:bg-sand-700 px-2 py-0.5 rounded-full text-sand-700 dark:text-sand-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-xl text-sand-500">No images match your search criteria</p>
              </div>
            )}
          </TabsContent>

          {/* Quads Tab */}
          <TabsContent value="quads" className="mt-2">
            {filteredImages.length > 0 ? (
              <motion.div 
                className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredImages.map((image) => (
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
                      <div className="mt-2 flex flex-wrap gap-1">
                        {image.tags?.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs bg-sand-200 dark:bg-sand-700 px-2 py-0.5 rounded-full text-sand-700 dark:text-sand-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-xl text-sand-500">No images match your search criteria</p>
              </div>
            )}
          </TabsContent>

          {/* Landscapes Tab */}
          <TabsContent value="landscapes" className="mt-2">
            {filteredImages.length > 0 ? (
              <motion.div 
                className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredImages.map((image) => (
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
                      <div className="mt-2 flex flex-wrap gap-1">
                        {image.tags?.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs bg-sand-200 dark:bg-sand-700 px-2 py-0.5 rounded-full text-sand-700 dark:text-sand-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-xl text-sand-500">No images match your search criteria</p>
              </div>
            )}
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
                {selectedImage.tags && (
                  <div className="mt-2 flex flex-wrap gap-1 justify-center">
                    {selectedImage.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;

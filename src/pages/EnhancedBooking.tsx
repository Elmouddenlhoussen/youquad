
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { quads } from '@/data/quads';
import { useToast } from '@/hooks/use-toast';

// Available tour types
const tourTypes = [
  {
    id: 'standard',
    name: 'Standard Desert Tour',
    description: 'Explore the desert landscapes with our standard guided tour',
    durations: [1, 2, 3, 4],
    basePrice: 300,
    image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302'
  },
  {
    id: 'sunset',
    name: 'Sunset Adventure',
    description: 'Experience the magical colors of the desert sunset',
    durations: [2, 3],
    basePrice: 400,
    image: 'https://images.unsplash.com/photo-1542442828-287217bfb87f'
  },
  {
    id: 'overnight',
    name: 'Overnight Camping',
    description: 'Camp under the stars with a traditional dinner and breakfast',
    durations: [16, 24],
    basePrice: 700,
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969'
  },
  {
    id: 'private',
    name: 'Private Tour',
    description: 'Customize your own adventure with a private guide',
    durations: [1, 2, 3, 4, 5, 6],
    basePrice: 500,
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3'
  }
];

// Available time slots
const timeSlots = {
  standard: ['08:00', '10:00', '14:00', '16:00'],
  sunset: ['16:00', '17:00'],
  overnight: ['15:00', '16:00'],
  private: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
};

// Additional services
const additionalServices = [
  {
    id: 'pickup',
    name: 'Hotel Pickup & Return',
    price: 50,
    description: 'Convenient transportation from and to your hotel'
  },
  {
    id: 'photography',
    name: 'Photography Package',
    price: 80,
    description: 'Professional photos of your adventure delivered digitally'
  },
  {
    id: 'meal',
    name: 'Traditional Berber Meal',
    price: 30,
    description: 'Authentic local cuisine served during your tour'
  },
  {
    id: 'gopro',
    name: 'GoPro Rental',
    price: 40,
    description: 'Record your entire adventure with a mounted GoPro'
  },
  {
    id: 'private-guide',
    name: 'Private Guide Upgrade',
    price: 100,
    description: 'Exclusive guide for your group for a personalized experience'
  }
];

const EnhancedBooking = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    tourType: '',
    date: undefined as Date | undefined,
    time: '',
    duration: '',
    participants: 1,
    quadSelection: [] as any[],
    name: '',
    email: '',
    phone: '',
    additionalServices: [] as string[],
    specialRequests: '',
    experience: 'beginner',
    paymentMethod: 'creditCard',
    agreeToTerms: false
  });
  const [selectedTourType, setSelectedTourType] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate prices
  const calculateTotalPrice = () => {
    if (!selectedTourType) return 0;
    
    // Base price calculation
    const basePrice = selectedTourType.basePrice * parseInt(formData.duration || '1');
    
    // Selected quads price
    const quadsPrice = formData.quadSelection.reduce((total, quad) => {
      return total + quad.price * parseInt(formData.duration || '1');
    }, 0);
    
    // Additional services
    const servicesPrice = formData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
    
    return basePrice + quadsPrice + servicesPrice;
  };

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      const updatedData = { ...prev, [field]: value };
      
      // If tour type changes, reset related fields
      if (field === 'tourType') {
        const selected = tourTypes.find(tour => tour.id === value);
        setSelectedTourType(selected);
        return {
          ...updatedData,
          time: '',
          duration: selected ? String(selected.durations[0]) : '',
          quadSelection: []
        };
      }
      
      return updatedData;
    });
  };

  // Handle adding/removing a quad to selection
  const handleQuadSelection = (quad: any) => {
    setFormData(prev => {
      const isSelected = prev.quadSelection.some(selected => selected.id === quad.id);
      
      if (isSelected) {
        // Remove from selection
        return {
          ...prev,
          quadSelection: prev.quadSelection.filter(selected => selected.id !== quad.id)
        };
      } else {
        // Add to selection if not exceeding participants count
        if (prev.quadSelection.length < prev.participants) {
          return {
            ...prev,
            quadSelection: [...prev.quadSelection, quad]
          };
        }
      }
      
      return prev;
    });
  };

  // Handle additional services selection
  const handleAdditionalService = (serviceId: string) => {
    setFormData(prev => {
      const isSelected = prev.additionalServices.includes(serviceId);
      
      if (isSelected) {
        // Remove from selection
        return {
          ...prev,
          additionalServices: prev.additionalServices.filter(id => id !== serviceId)
        };
      } else {
        // Add to selection
        return {
          ...prev,
          additionalServices: [...prev.additionalServices, serviceId]
        };
      }
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (currentStep === 1 && (!formData.tourType || !formData.date || !formData.time || !formData.duration)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && formData.quadSelection.length === 0) {
      toast({
        title: "Quad Selection Required",
        description: "Please select at least one quad for your tour.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 3 && (!formData.name || !formData.email || !formData.phone)) {
      toast({
        title: "Contact Information Required",
        description: "Please provide your contact details to continue.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 4 && !formData.agreeToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and conditions to complete your booking.",
        variant: "destructive"
      });
      return;
    }
    
    // Process different steps
    if (currentStep < 4) {
      // Move to next step
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0); // Scroll to top for better UX
    } else {
      // Final submission
      setIsProcessing(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Booking Confirmed!",
          description: `Your booking reference is #YQ-${Math.floor(100000 + Math.random() * 900000)}`,
          variant: "default"
        });
        
        // Show confirmation
        setCurrentStep(5);
        window.scrollTo(0, 0); // Scroll to top
      }, 2000);
    }
  };

  // Format date for display
  const formattedDate = formData.date ? format(formData.date, 'PPP') : null;
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-sand-900">
      {/* Hero Section */}
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">Book Your Desert Adventure</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Choose from our selection of thrilling quad bike tours and customize your perfect desert experience.
          </p>
        </div>
      </div>

      {/* Booking Process */}
      <div className="container-custom py-12">
        {/* Progress Steps */}
        {currentStep < 5 && (
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step === currentStep
                          ? 'bg-terracotta-500 text-white'
                          : step < currentStep
                            ? 'bg-green-500 text-white'
                            : 'bg-sand-200 dark:bg-sand-700 text-sand-500 dark:text-sand-400'
                      }`}
                    >
                      {step < currentStep ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        step
                      )}
                    </div>
                    <span 
                      className={`mt-2 text-sm ${
                        step <= currentStep
                          ? 'text-sand-800 dark:text-sand-200 font-medium'
                          : 'text-sand-500 dark:text-sand-400'
                      }`}
                    >
                      {step === 1 && "Tour Details"}
                      {step === 2 && "Choose Quads"}
                      {step === 3 && "Your Info"}
                      {step === 4 && "Review & Pay"}
                    </span>
                  </div>
                  
                  {step < 4 && (
                    <div 
                      className={`flex-1 h-1 mx-2 ${
                        step < currentStep
                          ? 'bg-green-500'
                          : 'bg-sand-200 dark:bg-sand-700'
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Tour Selection */}
        {currentStep === 1 && (
          <motion.div 
            className="space-y-8"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="dark:bg-sand-800">
              <CardHeader>
                <CardTitle>Choose Your Adventure</CardTitle>
                <CardDescription>Select the type of tour you want to experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {tourTypes.map((tour) => (
                    <div 
                      key={tour.id}
                      className={`relative rounded-lg overflow-hidden border-2 p-1 cursor-pointer transition-all hover:shadow-md ${
                        formData.tourType === tour.id
                          ? 'border-terracotta-500 bg-terracotta-50 dark:bg-terracotta-900/20'
                          : 'border-sand-200 dark:border-sand-700'
                      }`}
                      onClick={() => handleChange('tourType', tour.id)}
                    >
                      <div className="flex">
                        <div className="w-1/3">
                          <img 
                            src={tour.image} 
                            alt={tour.name} 
                            className="h-24 w-full object-cover rounded-l-md" 
                          />
                        </div>
                        <div className="w-2/3 p-3">
                          <h3 className="font-medium text-sand-800 dark:text-sand-100">{tour.name}</h3>
                          <p className="text-sm text-sand-600 dark:text-sand-300 line-clamp-2">
                            {tour.description}
                          </p>
                          <p className="text-sm font-semibold text-terracotta-600 dark:text-terracotta-400 mt-1">
                            From {tour.basePrice} MAD
                          </p>
                        </div>
                      </div>
                      
                      {formData.tourType === tour.id && (
                        <div className="absolute top-2 right-2 bg-terracotta-500 text-white rounded-full p-1">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tourDate">Select Date</Label>
                      <div className="mt-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !formData.date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.date ? formattedDate : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.date}
                              onSelect={(date) => handleChange('date', date)}
                              disabled={(date) =>
                                date < new Date() || // Disable past dates
                                date > new Date(new Date().setMonth(new Date().getMonth() + 3)) // Disable dates more than 3 months in advance
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="participants">Number of Participants</Label>
                      <div className="mt-1">
                        <Select 
                          value={formData.participants.toString()} 
                          onValueChange={(value) => handleChange('participants', parseInt(value))}
                        >
                          <SelectTrigger id="participants">
                            <SelectValue placeholder="Select number of participants" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'Person' : 'People'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="duration">Duration (hours)</Label>
                      <div className="mt-1">
                        <Select 
                          value={formData.duration} 
                          onValueChange={(value) => handleChange('duration', value)}
                          disabled={!formData.tourType}
                        >
                          <SelectTrigger id="duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedTourType?.durations.map((hours: number) => (
                              <SelectItem key={hours} value={hours.toString()}>
                                {hours} {hours === 1 ? 'Hour' : 'Hours'}
                                {hours >= 16 && " (Overnight)"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="time">Start Time</Label>
                      <div className="mt-1">
                        <Select 
                          value={formData.time} 
                          onValueChange={(value) => handleChange('time', value)}
                          disabled={!formData.tourType}
                        >
                          <SelectTrigger id="time">
                            <SelectValue placeholder="Select start time" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.tourType && timeSlots[formData.tourType as keyof typeof timeSlots]?.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Label htmlFor="experience">Your Experience Level</Label>
                  <RadioGroup 
                    className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4"
                    defaultValue="beginner"
                    value={formData.experience}
                    onValueChange={(value) => handleChange('experience', value)}
                  >
                    <div className="flex items-center space-x-2 border border-sand-200 dark:border-sand-700 rounded-md p-3 hover:bg-sand-50 dark:hover:bg-sand-700 cursor-pointer">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label htmlFor="beginner" className="cursor-pointer">Beginner</Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-sand-200 dark:border-sand-700 rounded-md p-3 hover:bg-sand-50 dark:hover:bg-sand-700 cursor-pointer">
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <Label htmlFor="intermediate" className="cursor-pointer">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-sand-200 dark:border-sand-700 rounded-md p-3 hover:bg-sand-50 dark:hover:bg-sand-700 cursor-pointer">
                      <RadioGroupItem value="experienced" id="experienced" />
                      <Label htmlFor="experienced" className="cursor-pointer">Experienced</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.tourType || !formData.date || !formData.time || !formData.duration}
                  className="bg-terracotta-500 hover:bg-terracotta-600 text-white"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Quad Selection */}
        {currentStep === 2 && (
          <motion.div 
            className="space-y-8"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="dark:bg-sand-800">
              <CardHeader>
                <CardTitle>Choose Your Quad Bikes</CardTitle>
                <CardDescription>
                  Select {formData.participants} {formData.participants === 1 ? 'quad' : 'quads'} for your adventure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {quads.map((quad) => (
                    <div 
                      key={quad.id}
                      className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        formData.quadSelection.some(q => q.id === quad.id)
                          ? 'border-terracotta-500 bg-terracotta-50 dark:bg-terracotta-900/20 shadow-md'
                          : 'border-sand-200 dark:border-sand-700 hover:shadow-sm'
                      } ${
                        formData.quadSelection.length >= formData.participants && 
                        !formData.quadSelection.some(q => q.id === quad.id)
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                      onClick={() => {
                        if (!(formData.quadSelection.length >= formData.participants && 
                            !formData.quadSelection.some(q => q.id === quad.id))) {
                          handleQuadSelection(quad);
                        }
                      }}
                    >
                      <div className="aspect-w-16 aspect-h-10">
                        <img 
                          src={quad.image} 
                          alt={quad.name} 
                          className="object-cover w-full h-44" 
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-sand-800 dark:text-sand-100">{quad.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-sand-600 dark:text-sand-300">
                            {quad.capacity} {quad.capacity === 1 ? 'Person' : 'People'}
                          </span>
                          <span className="text-terracotta-600 dark:text-terracotta-400 font-semibold">
                            {quad.price} MAD/hour
                          </span>
                        </div>
                      </div>
                      
                      {formData.quadSelection.some(q => q.id === quad.id) && (
                        <div className="absolute top-2 right-2 bg-terracotta-500 text-white rounded-full p-1">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="bg-sand-100 dark:bg-sand-700 p-4 rounded-lg">
                  <h3 className="font-medium text-sand-800 dark:text-sand-100 mb-2">Selected Quads</h3>
                  {formData.quadSelection.length > 0 ? (
                    <div className="space-y-2">
                      {formData.quadSelection.map((quad, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{quad.name}</span>
                          <span>{quad.price * parseInt(formData.duration || '1')} MAD</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sand-500 dark:text-sand-400">No quads selected yet</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={formData.quadSelection.length === 0}
                  className="bg-terracotta-500 hover:bg-terracotta-600 text-white"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Personal Information */}
        {currentStep === 3 && (
          <motion.div 
            className="space-y-8"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="dark:bg-sand-800">
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Please provide your contact details and any special requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter your full name" 
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="Enter your phone number" 
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-sand-800 dark:text-sand-100 mb-3">Additional Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {additionalServices.map((service) => (
                        <div 
                          key={service.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            formData.additionalServices.includes(service.id)
                              ? 'border-terracotta-500 bg-terracotta-50 dark:bg-terracotta-900/20'
                              : 'border-sand-200 dark:border-sand-700 hover:border-terracotta-300 dark:hover:border-terracotta-700'
                          }`}
                          onClick={() => handleAdditionalService(service.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-sand-800 dark:text-sand-100">{service.name}</h4>
                              <p className="text-sm text-sand-600 dark:text-sand-300 mt-1">
                                {service.description}
                              </p>
                              <p className="text-terracotta-600 dark:text-terracotta-400 font-medium mt-1">
                                {service.price} MAD
                              </p>
                            </div>
                            <Checkbox 
                              checked={formData.additionalServices.includes(service.id)}
                              onCheckedChange={() => handleAdditionalService(service.id)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requirements, dietary restrictions, or other notes for your tour"
                      value={formData.specialRequests}
                      onChange={(e) => handleChange('specialRequests', e.target.value)}
                      className="mt-1 resize-none h-24"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="bg-terracotta-500 hover:bg-terracotta-600 text-white"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Review and Payment */}
        {currentStep === 4 && (
          <motion.div 
            className="space-y-8"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="dark:bg-sand-800">
              <CardHeader>
                <CardTitle>Review and Confirm</CardTitle>
                <CardDescription>Review your booking details and proceed to payment</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="summary">
                  <TabsList className="mb-4">
                    <TabsTrigger value="summary">Booking Summary</TabsTrigger>
                    <TabsTrigger value="payment">Payment Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-sand-100 dark:bg-sand-700 p-4 rounded-lg">
                          <h3 className="font-medium text-sand-800 dark:text-sand-100 mb-3">Tour Details</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sand-600 dark:text-sand-300">Tour Type:</span>
                              <span className="font-medium text-sand-800 dark:text-sand-100">
                                {tourTypes.find(t => t.id === formData.tourType)?.name}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sand-600 dark:text-sand-300">Date:</span>
                              <span className="font-medium text-sand-800 dark:text-sand-100">
                                {formattedDate}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sand-600 dark:text-sand-300">Time:</span>
                              <span className="font-medium text-sand-800 dark:text-sand-100">
                                {formData.time}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sand-600 dark:text-sand-300">Duration:</span>
                              <span className="font-medium text-sand-800 dark:text-sand-100">
                                {formData.duration} {parseInt(formData.duration) === 1 ? 'Hour' : 'Hours'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sand-600 dark:text-sand-300">Participants:</span>
                              <span className="font-medium text-sand-800 dark:text-sand-100">
                                {formData.participants}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sand-600 dark:text-sand-300">Experience Level:</span>
                              <span className="font-medium text-sand-800 dark:text-sand-100 capitalize">
                                {formData.experience}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-sand-100 dark:bg-sand-700 p-4 rounded-lg">
                          <h3 className="font-medium text-sand-800 dark:text-sand-100 mb-3">Contact Information</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sand-600 dark:text-sand-300">Name:</span>
                              <span className="font-medium text-sand-800 dark:text-sand-100">{formData.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sand-600 dark:text-sand-300">Email:</span>
                              <span className="font-medium text-sand-800 dark:text-sand-100">{formData.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sand-600 dark:text-sand-300">Phone:</span>
                              <span className="font-medium text-sand-800 dark:text-sand-100">{formData.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sand-800 dark:text-sand-100 mb-3">Selected Quads</h3>
                        <div className="bg-white dark:bg-sand-800 border border-sand-200 dark:border-sand-700 rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-sand-200 dark:divide-sand-700">
                            <thead className="bg-sand-50 dark:bg-sand-800">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-sand-500 dark:text-sand-400 uppercase tracking-wider">Quad</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-sand-500 dark:text-sand-400 uppercase tracking-wider">Capacity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-sand-500 dark:text-sand-400 uppercase tracking-wider">Price/Hour</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-sand-500 dark:text-sand-400 uppercase tracking-wider">Total</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-sand-800 divide-y divide-sand-200 dark:divide-sand-700">
                              {formData.quadSelection.map((quad, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sand-800 dark:text-sand-200">{quad.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sand-600 dark:text-sand-300">{quad.capacity}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sand-600 dark:text-sand-300">{quad.price} MAD</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sand-600 dark:text-sand-300">{quad.price * parseInt(formData.duration || '1')} MAD</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      {formData.additionalServices.length > 0 && (
                        <div>
                          <h3 className="font-medium text-sand-800 dark:text-sand-100 mb-3">Additional Services</h3>
                          <div className="bg-white dark:bg-sand-800 border border-sand-200 dark:border-sand-700 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-sand-200 dark:divide-sand-700">
                              <thead className="bg-sand-50 dark:bg-sand-800">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-sand-500 dark:text-sand-400 uppercase tracking-wider">Service</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-sand-500 dark:text-sand-400 uppercase tracking-wider">Price</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white dark:bg-sand-800 divide-y divide-sand-200 dark:divide-sand-700">
                                {formData.additionalServices.map((serviceId) => {
                                  const service = additionalServices.find(s => s.id === serviceId);
                                  return service ? (
                                    <tr key={serviceId}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sand-800 dark:text-sand-200">{service.name}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sand-600 dark:text-sand-300">{service.price} MAD</td>
                                    </tr>
                                  ) : null;
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {formData.specialRequests && (
                        <div className="bg-sand-100 dark:bg-sand-700 p-4 rounded-lg">
                          <h3 className="font-medium text-sand-800 dark:text-sand-100 mb-2">Special Requests</h3>
                          <p className="text-sand-600 dark:text-sand-300">{formData.specialRequests}</p>
                        </div>
                      )}
                      
                      <div className="bg-terracotta-50 dark:bg-terracotta-900/20 border border-terracotta-100 dark:border-terracotta-800 p-4 rounded-lg">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-sand-800 dark:text-sand-100">Total Price:</span>
                          <span className="text-terracotta-600 dark:text-terracotta-400">{calculateTotalPrice()} MAD</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payment">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="paymentMethod" className="mb-2 block">Payment Method</Label>
                        <RadioGroup 
                          defaultValue="creditCard"
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleChange('paymentMethod', value)}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 border border-sand-200 dark:border-sand-700 rounded-md p-4 hover:bg-sand-50 dark:hover:bg-sand-700 cursor-pointer">
                            <RadioGroupItem value="creditCard" id="creditCard" />
                            <Label htmlFor="creditCard" className="cursor-pointer flex-1">Credit Card</Label>
                            <div className="flex space-x-1">
                              <div className="w-8 h-5 bg-blue-500 rounded"></div>
                              <div className="w-8 h-5 bg-yellow-500 rounded"></div>
                              <div className="w-8 h-5 bg-red-500 rounded"></div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 border border-sand-200 dark:border-sand-700 rounded-md p-4 hover:bg-sand-50 dark:hover:bg-sand-700 cursor-pointer">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="cursor-pointer flex-1">PayPal</Label>
                            <div className="w-8 h-5 bg-blue-600 rounded"></div>
                          </div>
                          <div className="flex items-center space-x-2 border border-sand-200 dark:border-sand-700 rounded-md p-4 hover:bg-sand-50 dark:hover:bg-sand-700 cursor-pointer">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="cursor-pointer">Cash on Arrival</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {formData.paymentMethod === 'creditCard' && (
                        <div className="mt-4 space-y-4 border border-sand-200 dark:border-sand-700 rounded-lg p-4">
                          <h3 className="font-medium text-sand-800 dark:text-sand-100">Credit Card Information</h3>
                          <p className="text-sm text-sand-500 dark:text-sand-400">
                            This is a demo - no actual payment will be processed.
                          </p>
                          <div>
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <Input id="cardName" className="mt-1" placeholder="Name on card" />
                          </div>
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" className="mt-1" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input id="expiryDate" className="mt-1" placeholder="MM/YY" />
                            </div>
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" className="mt-1" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="terms" 
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleChange('agreeToTerms', checked === true)}
                        />
                        <div>
                          <Label 
                            htmlFor="terms" 
                            className="font-medium text-sand-800 dark:text-sand-100 cursor-pointer"
                          >
                            I agree to the Terms & Conditions
                          </Label>
                          <p className="text-sm text-sand-500 dark:text-sand-400 mt-1">
                            By proceeding with this booking, I acknowledge that I have read and agree to the 
                            cancellation policy, safety requirements, and terms of service.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(3)}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isProcessing || !formData.agreeToTerms}
                  className="bg-terracotta-500 hover:bg-terracotta-600 text-white"
                >
                  {isProcessing ? (
                    <>Processing<span className="ml-2 animate-pulse">...</span></>
                  ) : (
                    <>Confirm Booking</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Confirmation */}
        {currentStep === 5 && (
          <motion.div 
            className="text-center py-12"
            variants={pageVariants}
            initial="initial"
            animate="animate"
          >
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-sand-800 dark:text-sand-100 mb-4">Booking Confirmed!</h2>
            <p className="text-xl text-sand-600 dark:text-sand-300 mb-8 max-w-lg mx-auto">
              Your adventure is booked! A confirmation email has been sent to {formData.email}.
            </p>
            
            <div className="bg-white dark:bg-sand-800 rounded-lg p-6 max-w-md mx-auto mb-8 shadow-md">
              <h3 className="text-lg font-medium text-sand-800 dark:text-sand-100 mb-4">Booking Details</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-sand-600 dark:text-sand-300">Booking Reference:</span>
                  <span className="font-medium text-sand-800 dark:text-sand-100">#YQ-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-600 dark:text-sand-300">Tour:</span>
                  <span className="font-medium text-sand-800 dark:text-sand-100">
                    {tourTypes.find(t => t.id === formData.tourType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-600 dark:text-sand-300">Date & Time:</span>
                  <span className="font-medium text-sand-800 dark:text-sand-100">
                    {formattedDate}, {formData.time}
                  </span>
                </div>
                <div className="border-t border-sand-200 dark:border-sand-700 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-sand-800 dark:text-sand-100">Total Amount:</span>
                    <span className="text-terracotta-600 dark:text-terracotta-400">{calculateTotalPrice()} MAD</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-x-4">
              <Button 
                variant="outline"
                className="border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50 dark:border-terracotta-400 dark:text-terracotta-400 dark:hover:bg-terracotta-900/30"
                onClick={() => {
                  // Reset the form and go to step 1
                  setFormData({
                    tourType: '',
                    date: undefined,
                    time: '',
                    duration: '',
                    participants: 1,
                    quadSelection: [],
                    name: '',
                    email: '',
                    phone: '',
                    additionalServices: [],
                    specialRequests: '',
                    experience: 'beginner',
                    paymentMethod: 'creditCard',
                    agreeToTerms: false
                  });
                  setSelectedTourType(null);
                  setCurrentStep(1);
                }}
              >
                Book Another Tour
              </Button>
              <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
                <Link to="/tours">Browse Tours</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnhancedBooking;

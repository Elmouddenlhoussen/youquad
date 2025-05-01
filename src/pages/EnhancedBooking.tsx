
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Add this missing import
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import PaymentForm from '@/components/PaymentForm';
import { processPayment, PaymentMethod } from '@/services/paymentService';

const timeSlots = [
  { value: "08:00", label: "8:00 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
];

const tourOptions = [
  { 
    id: 'desert-adventure', 
    name: 'Desert Adventure Tour', 
    duration: '2 hours', 
    description: 'Experience the thrill of riding through sand dunes with our expert guides.',
    pricePerPerson: 89.99,
    difficulty: 'Beginner'
  },
  { 
    id: 'sunset-expedition', 
    name: 'Sunset Expedition', 
    duration: '3 hours', 
    description: 'Enjoy the breathtaking desert sunset views while riding on our premium quads.',
    pricePerPerson: 119.99,
    difficulty: 'Intermediate'
  },
  { 
    id: 'extreme-terrain', 
    name: 'Extreme Terrain Challenge', 
    duration: '4 hours', 
    description: 'For experienced riders looking to tackle challenging dunes and rocky paths.',
    pricePerPerson: 149.99,
    difficulty: 'Advanced'
  }
];

const quadOptions = [
  {
    id: 'standard',
    name: 'Standard Quad',
    powerRating: '350cc',
    description: 'Reliable and easy to handle, perfect for beginners.',
    pricePerDay: 0, // Included in base price
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256'
  },
  {
    id: 'sport',
    name: 'Sport Quad',
    powerRating: '450cc',
    description: 'Higher performance and better suspension for more experienced riders.',
    pricePerDay: 25,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70'
  },
  {
    id: 'premium',
    name: 'Premium Quad',
    powerRating: '700cc',
    description: 'Top-of-the-line power and handling for the ultimate desert experience.',
    pricePerDay: 50,
    image: 'https://images.unsplash.com/photo-1526473125627-a94d583649a5'
  }
];

const extraOptions = [
  { id: 'helmet-cam', name: 'Helmet Camera', price: 15, description: 'Capture your adventure with our HD helmet cameras' },
  { id: 'private-guide', name: 'Private Guide', price: 75, description: 'Get personalized attention with your own dedicated guide' },
  { id: 'picnic-lunch', name: 'Picnic Lunch', price: 25, description: 'Enjoy a delicious lunch in the desert' },
  { id: 'photo-package', name: 'Professional Photo Package', price: 40, description: 'Our photographer will capture your experience' },
  { id: 'transportation', name: 'Hotel Pickup & Drop-off', price: 30, description: 'Convenient transportation to and from your hotel' }
];

// Types for form data
interface FormData {
  date: Date | undefined;
  time: string;
  partySize: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tourType: string;
  quadType: string;
  extras: string[];
  specialRequests: string;
  termsAccepted: boolean;
}

// Enhanced Booking page with multi-step form
const EnhancedBooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    date: undefined,
    time: '',
    partySize: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tourType: '',
    quadType: 'standard',
    extras: [],
    specialRequests: '',
    termsAccepted: false
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.date) newErrors.date = 'Please select a date';
      if (!formData.time) newErrors.time = 'Please select a time';
      if (!formData.tourType) newErrors.tourType = 'Please select a tour type';
    } else if (currentStep === 2) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
        newErrors.phone = 'Phone number is invalid';
      }
    } else if (currentStep === 3) {
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (id: string) => {
    setFormData({
      ...formData,
      extras: formData.extras.includes(id)
        ? formData.extras.filter(item => item !== id)
        : [...formData.extras, id]
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData({
      ...formData,
      date
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTermsChange = (checked: boolean) => {
    setFormData({
      ...formData,
      termsAccepted: checked
    });
  };

  const getSelectedTour = () => {
    return tourOptions.find(tour => tour.id === formData.tourType);
  };

  const getSelectedQuad = () => {
    return quadOptions.find(quad => quad.id === formData.quadType);
  };

  const getSelectedExtras = () => {
    return extraOptions.filter(extra => formData.extras.includes(extra.id));
  };

  const calculateTotal = () => {
    const baseTour = getSelectedTour();
    const quadUpgrade = getSelectedQuad();
    const selectedExtras = getSelectedExtras();
    
    let total = 0;
    
    if (baseTour) {
      total += baseTour.pricePerPerson * formData.partySize;
    }
    
    if (quadUpgrade) {
      total += quadUpgrade.pricePerDay * formData.partySize;
    }
    
    if (selectedExtras.length > 0) {
      total += selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    }
    
    return total;
  };

  const handlePayment = async (paymentMethod: PaymentMethod, cardDetails?: { number: string, expiry: string, cvc: string }) => {
    setIsProcessingPayment(true);
    
    try {
      const total = calculateTotal();
      
      const paymentData = {
        amount: total,
        currency: 'USD',
        paymentMethod: paymentMethod,
        email: formData.email,
        cardNumber: cardDetails?.number,
        cardExpiry: cardDetails?.expiry,
        cardCvc: cardDetails?.cvc
      };
      
      const result = await processPayment(paymentData);
      
      if (result.success) {
        // Format date for display
        const formattedDate = formData.date ? format(formData.date, 'EEEE, MMMM d, yyyy') : '';
        
        // Get time slot label
        const timeSlot = timeSlots.find(slot => slot.value === formData.time);
        const formattedTime = timeSlot ? timeSlot.label : formData.time;
        
        // Navigate to success page with booking and payment details
        navigate('/payment-success', {
          state: {
            bookingDetails: {
              date: formattedDate,
              time: formattedTime,
              partySize: formData.partySize,
              tourName: getSelectedTour()?.name,
              quadName: getSelectedQuad()?.name
            },
            paymentDetails: {
              transactionId: result.transactionId,
              amount: total,
              method: paymentMethod === 'credit_card' ? 'Credit Card' : 'PayPal',
              date: result.date
            }
          }
        });
        
        toast.success('Payment successful!', {
          description: 'Your booking has been confirmed.'
        });
      } else {
        toast.error('Payment failed', {
          description: result.message
        });
      }
    } catch (error) {
      toast.error('An error occurred', {
        description: 'Please try again later.'
      });
      console.error('Payment error:', error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Animation variants for each step
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-sand-900 pt-24 pb-20">
      <div className="container-custom">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-sand-800 dark:text-sand-100">Book Your Desert Adventure</h1>
        <p className="text-sand-600 dark:text-sand-400 text-center max-w-2xl mx-auto mb-10">
          Complete the form below to reserve your desert quad biking experience. Our team will ensure you have an unforgettable adventure.
        </p>

        <div className="flex justify-center mb-10">
          <div className="flex items-center w-full max-w-2xl justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-sand-200 dark:bg-sand-700 -z-10"></div>
            
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium relative z-10 ${
                    step === stepNumber
                      ? 'bg-terracotta-500 text-white'
                      : step > stepNumber
                        ? 'bg-green-500 text-white' 
                        : 'bg-sand-200 dark:bg-sand-700 text-sand-600 dark:text-sand-400'
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                </div>
                <span className="text-xs mt-2 font-medium">
                  {stepNumber === 1 ? 'Tour Details' : 
                   stepNumber === 2 ? 'Your Info' : 
                   stepNumber === 3 ? 'Extras' : 'Payment'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-sand-800 rounded-lg shadow-md p-6 sm:p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-sand-800 dark:text-sand-100">Select Your Tour Details</h2>
              
              <div className="space-y-6">
                {/* Date Selection */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !formData.date ? 'text-sand-500 dark:text-sand-400' : ''
                        } ${errors.date ? 'border-red-500' : ''}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, 'PPP') : <span>Select a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={handleDateChange}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => handleSelectChange('time', value)}
                  >
                    <SelectTrigger className={errors.time ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Morning</SelectLabel>
                        {timeSlots.slice(0, 3).map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Afternoon</SelectLabel>
                        {timeSlots.slice(3).map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                </div>

                {/* Party Size */}
                <div className="space-y-2">
                  <Label htmlFor="partySize">Number of Participants</Label>
                  <div className="flex">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-r-none"
                      onClick={() => {
                        if (formData.partySize > 1) {
                          setFormData({
                            ...formData,
                            partySize: formData.partySize - 1
                          });
                        }
                      }}
                      disabled={formData.partySize <= 1}
                    >
                      -
                    </Button>
                    <Input
                      id="partySize"
                      name="partySize"
                      type="number"
                      min="1"
                      max="10"
                      className="rounded-none text-center"
                      value={formData.partySize}
                      onChange={handleInputChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-l-none"
                      onClick={() => {
                        if (formData.partySize < 10) {
                          setFormData({
                            ...formData,
                            partySize: formData.partySize + 1
                          });
                        }
                      }}
                      disabled={formData.partySize >= 10}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Tour Type */}
                <div className="space-y-4">
                  <Label htmlFor="tourType">Tour Type</Label>
                  <div className="grid gap-4">
                    {tourOptions.map((tour) => (
                      <div 
                        key={tour.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.tourType === tour.id
                            ? 'border-terracotta-500 bg-terracotta-50 dark:bg-terracotta-900/20'
                            : 'border-sand-200 dark:border-sand-700 hover:border-terracotta-300 dark:hover:border-terracotta-700'
                        } ${errors.tourType ? 'border-red-500' : ''}`}
                        onClick={() => handleSelectChange('tourType', tour.id)}
                      >
                        <div className="flex justify-between">
                          <div className="flex flex-col">
                            <span className="font-medium">{tour.name}</span>
                            <span className="text-sm text-sand-600 dark:text-sand-400">
                              {tour.duration} • {tour.difficulty}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-terracotta-600 dark:text-terracotta-400">
                              ${tour.pricePerPerson}
                            </span>
                            <span className="text-sm text-sand-600 dark:text-sand-400"> / person</span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-sand-600 dark:text-sand-400">
                          {tour.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  {errors.tourType && <p className="text-red-500 text-sm">{errors.tourType}</p>}
                </div>
                
                <Button
                  className="w-full mt-4"
                  onClick={handleNextStep}
                >
                  Continue to Personal Details <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-sand-800 rounded-lg shadow-md p-6 sm:p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-sand-800 dark:text-sand-100">Personal Information</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                </div>

                {/* Quad Selection */}
                <div className="space-y-4">
                  <Label>Select Your Quad</Label>
                  <RadioGroup
                    value={formData.quadType}
                    onValueChange={(value) => handleSelectChange('quadType', value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {quadOptions.map((quad) => (
                      <div key={quad.id} className="relative">
                        <RadioGroupItem value={quad.id} id={quad.id} className="sr-only" />
                        <Label
                          htmlFor={quad.id}
                          className={`h-full flex flex-col overflow-hidden rounded-lg border-2 transition-all cursor-pointer p-2 ${
                            formData.quadType === quad.id
                              ? 'border-terracotta-500 bg-terracotta-50 dark:bg-terracotta-900/20'
                              : 'border-sand-200 dark:border-sand-700 hover:border-terracotta-300 dark:hover:border-terracotta-700'
                          }`}
                        >
                          <div className="aspect-video w-full rounded-md overflow-hidden">
                            <img 
                              src={quad.image} 
                              alt={quad.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{quad.name}</span>
                              {quad.pricePerDay > 0 ? (
                                <span className="font-bold text-terracotta-600 dark:text-terracotta-400">
                                  +${quad.pricePerDay}
                                </span>
                              ) : (
                                <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                                  Included
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-sand-600 dark:text-sand-400">
                              {quad.powerRating}
                            </span>
                            <p className="mt-1 text-xs text-sand-600 dark:text-sand-400">
                              {quad.description}
                            </p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep}>
                    Continue to Extras <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-sand-800 rounded-lg shadow-md p-6 sm:p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-sand-800 dark:text-sand-100">Additional Options</h2>
              
              <div className="space-y-6">
                {/* Extras */}
                <div className="space-y-4">
                  <Label>Optional Add-ons</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {extraOptions.map((extra) => (
                      <div 
                        key={extra.id}
                        className={`p-4 border rounded-lg flex justify-between items-start cursor-pointer transition-all ${
                          formData.extras.includes(extra.id)
                            ? 'border-terracotta-500 bg-terracotta-50 dark:bg-terracotta-900/20'
                            : 'border-sand-200 dark:border-sand-700 hover:border-terracotta-300 dark:hover:border-terracotta-700'
                        }`}
                        onClick={() => handleCheckboxChange(extra.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            id={`extra-${extra.id}`} 
                            checked={formData.extras.includes(extra.id)} 
                            onCheckedChange={() => {}} 
                            className="mt-1"
                          />
                          <div>
                            <Label htmlFor={`extra-${extra.id}`} className="font-medium cursor-pointer">
                              {extra.name}
                            </Label>
                            <p className="text-sm text-sand-600 dark:text-sand-400">
                              {extra.description}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-terracotta-600 dark:text-terracotta-400">
                          +${extra.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests or Requirements</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    placeholder="Any allergies, accessibility needs, or other requests..."
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="termsAccepted" 
                      checked={formData.termsAccepted}
                      onCheckedChange={handleTermsChange} 
                      className={errors.termsAccepted ? 'border-red-500' : ''}
                    />
                    <div>
                      <Label htmlFor="termsAccepted" className="cursor-pointer">
                        I agree to the <Link to="/terms" className="text-terracotta-600 dark:text-terracotta-400 underline">terms and conditions</Link> and confirm I have read the <Link to="/safety" className="text-terracotta-600 dark:text-terracotta-400 underline">safety guidelines</Link>
                      </Label>
                      {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep}>
                    Continue to Payment <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              {/* Order Summary */}
              <div className="bg-white dark:bg-sand-800 rounded-lg shadow-md p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6 text-sand-800 dark:text-sand-100">Order Summary</h2>
                
                <div className="space-y-4">
                  {/* Tour details summary */}
                  <div className="border-b border-sand-200 dark:border-sand-700 pb-4">
                    <h3 className="font-medium mb-2">Tour Details</h3>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <span className="text-sand-600 dark:text-sand-400">Tour Type</span>
                      <span className="font-medium">{getSelectedTour()?.name || 'Not selected'}</span>
                      
                      <span className="text-sand-600 dark:text-sand-400">Date</span>
                      <span className="font-medium">
                        {formData.date ? format(formData.date, 'EEEE, MMMM d, yyyy') : 'Not selected'}
                      </span>
                      
                      <span className="text-sand-600 dark:text-sand-400">Time</span>
                      <span className="font-medium">
                        {timeSlots.find(slot => slot.value === formData.time)?.label || 'Not selected'}
                      </span>
                      
                      <span className="text-sand-600 dark:text-sand-400">Participants</span>
                      <span className="font-medium">{formData.partySize}</span>
                      
                      <span className="text-sand-600 dark:text-sand-400">Quad Type</span>
                      <span className="font-medium">{getSelectedQuad()?.name || 'Standard'}</span>
                    </div>
                  </div>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <h3 className="font-medium mb-2">Price Breakdown</h3>
                    
                    {/* Tour base price */}
                    <div className="flex justify-between text-sm">
                      <span>
                        {getSelectedTour()?.name} ({formData.partySize} {formData.partySize === 1 ? 'person' : 'people'})
                      </span>
                      <span className="font-medium">
                        ${((getSelectedTour()?.pricePerPerson || 0) * formData.partySize).toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Quad upgrade if any */}
                    {getSelectedQuad()?.pricePerDay ? (
                      <div className="flex justify-between text-sm">
                        <span>
                          {getSelectedQuad()?.name} Upgrade ({formData.partySize} {formData.partySize === 1 ? 'quad' : 'quads'})
                        </span>
                        <span className="font-medium">
                          ${((getSelectedQuad()?.pricePerDay || 0) * formData.partySize).toFixed(2)}
                        </span>
                      </div>
                    ) : null}
                    
                    {/* Extras */}
                    {getSelectedExtras().map(extra => (
                      <div key={extra.id} className="flex justify-between text-sm">
                        <span>{extra.name}</span>
                        <span className="font-medium">${extra.price.toFixed(2)}</span>
                      </div>
                    ))}
                    
                    {/* Total */}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-sand-200 dark:border-sand-700 mt-2">
                      <span>Total</span>
                      <span className="text-terracotta-600 dark:text-terracotta-400">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Form */}
              <div className="bg-white dark:bg-sand-800 rounded-lg shadow-md">
                <PaymentForm 
                  amount={calculateTotal()} 
                  onSubmit={handlePayment}
                  isProcessing={isProcessingPayment}
                />
              </div>
              
              <div className="flex justify-start">
                <Button variant="outline" onClick={handlePreviousStep}>
                  Back to Extras
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedBooking;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { quads, tourPackages } from '@/data/quads';

const Booking = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = React.useState<string>("09:00");
  const [selectedDuration, setSelectedDuration] = React.useState<string>("1");
  const [selectedRiders, setSelectedRiders] = React.useState<string>("1");
  const [selectedTourTime, setSelectedTourTime] = React.useState<string>("08:00");
  const [selectedParticipants, setSelectedParticipants] = React.useState<string>("1");

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">Book Your Adventure</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Select your preferred date, time, and quad bikes to start your desert adventure.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Tabs defaultValue="quads">
            <TabsList className="w-full bg-sand-100 p-0 h-auto">
              <TabsTrigger 
                value="quads" 
                className="flex-1 py-4 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none"
              >
                Quad Rental
              </TabsTrigger>
              <TabsTrigger 
                value="tours" 
                className="flex-1 py-4 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none"
              >
                Guided Tours
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quads" className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold text-sand-800 mb-4">Select Date & Time</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Starting Time</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Hour</SelectItem>
                          <SelectItem value="2">2 Hours</SelectItem>
                          <SelectItem value="3">3 Hours</SelectItem>
                          <SelectItem value="4">Half Day (4 Hours)</SelectItem>
                          <SelectItem value="8">Full Day (8 Hours)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="riders">Number of Riders</Label>
                      <Select value={selectedRiders} onValueChange={setSelectedRiders}>
                        <SelectTrigger id="riders">
                          <SelectValue placeholder="Select number of riders" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Rider</SelectItem>
                          <SelectItem value="2">2 Riders</SelectItem>
                          <SelectItem value="3">3 Riders</SelectItem>
                          <SelectItem value="4">4 Riders</SelectItem>
                          <SelectItem value="5">5 Riders</SelectItem>
                          <SelectItem value="6">6+ Riders (Group)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-sand-800 mb-4 mt-8">Select Quad Bikes</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {quads.slice(0, 4).map((quad) => (
                        <div
                          key={quad.id}
                          className="border border-sand-200 rounded-md p-4"
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox id={`quad-${quad.id}`} />
                              <Label
                                htmlFor={`quad-${quad.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {quad.name}
                              </Label>
                            </div>
                            <span className="text-sm font-medium text-terracotta-600">
                              {quad.price} MAD
                            </span>
                          </div>
                          <p className="text-xs text-sand-500 mt-1">
                            {quad.capacity} rider{quad.capacity > 1 ? 's' : ''} · {quad.type}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-sand-800 mb-4">Additional Options</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option-helmet" />
                        <Label htmlFor="option-helmet">Safety Helmet (Required)</Label>
                      </div>
                      <span>Included</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option-goggles" />
                        <Label htmlFor="option-goggles">Dust Goggles</Label>
                      </div>
                      <span>50 MAD</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option-gloves" />
                        <Label htmlFor="option-gloves">Riding Gloves</Label>
                      </div>
                      <span>30 MAD</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option-guide" />
                        <Label htmlFor="option-guide">Private Guide</Label>
                      </div>
                      <span>200 MAD</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option-photos" />
                        <Label htmlFor="option-photos">Adventure Photo Package</Label>
                      </div>
                      <span>100 MAD</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option-transport" />
                        <Label htmlFor="option-transport">Hotel Pickup/Drop-off</Label>
                      </div>
                      <span>150 MAD</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-sand-800 mb-4 mt-8">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+212..." />
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <a href="#" className="text-terracotta-600 hover:underline">
                            terms and conditions
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-terracotta-600 hover:underline">
                            waiver of liability
                          </a>
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-sand-50 rounded-md border border-sand-200">
                    <h3 className="text-lg font-bold text-sand-800 mb-2">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Desert Explorer 250 (1 hour)</span>
                        <span>350 MAD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Riding Gloves</span>
                        <span>30 MAD</span>
                      </div>
                      <div className="border-t border-sand-200 my-2 pt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-terracotta-600">380 MAD</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-terracotta-600 hover:bg-terracotta-700 mt-6">
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tours" className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold text-sand-800 mb-4">Select Tour Package</h2>
                  <div className="space-y-4">
                    {tourPackages.map((tour) => (
                      <div
                        key={tour.id}
                        className="border border-sand-200 rounded-md p-4"
                      >
                        <div className="flex justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Checkbox id={`tour-${tour.id}`} />
                              <Label
                                htmlFor={`tour-${tour.id}`}
                                className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {tour.name}
                              </Label>
                            </div>
                            <p className="text-xs text-sand-500 ml-6">
                              {tour.duration} · {tour.difficulty} · {tour.includes[0]}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-terracotta-600">
                            {tour.price} MAD
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold text-sand-800 mb-4 mt-8">Select Date & Time</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tour-date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tour-time">Starting Time</Label>
                      <Select value={selectedTourTime} onValueChange={setSelectedTourTime}>
                        <SelectTrigger id="tour-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">8:00 AM (Morning Tour)</SelectItem>
                          <SelectItem value="13:00">1:00 PM (Afternoon Tour)</SelectItem>
                          <SelectItem value="16:00">4:00 PM (Sunset Tour)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tour-participants">Number of Participants</Label>
                      <Select value={selectedParticipants} onValueChange={setSelectedParticipants}>
                        <SelectTrigger id="tour-participants">
                          <SelectValue placeholder="Select number of participants" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Person</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3">3 People</SelectItem>
                          <SelectItem value="4">4 People</SelectItem>
                          <SelectItem value="5">5 People</SelectItem>
                          <SelectItem value="6">6+ People (Group Rate)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-sand-800 mb-4">Additional Options</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tour-option-transport" />
                        <Label htmlFor="tour-option-transport">Hotel Pickup/Drop-off</Label>
                      </div>
                      <span>Included</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tour-option-meal" />
                        <Label htmlFor="tour-option-meal">Traditional Moroccan Meal</Label>
                      </div>
                      <span>150 MAD</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tour-option-photos" />
                        <Label htmlFor="tour-option-photos">Professional Photos</Label>
                      </div>
                      <span>100 MAD</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tour-option-private" />
                        <Label htmlFor="tour-option-private">Private Tour (No Other Guests)</Label>
                      </div>
                      <span>300 MAD</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-sand-800 mb-4 mt-8">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tour-firstName">First Name</Label>
                        <Input id="tour-firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tour-lastName">Last Name</Label>
                        <Input id="tour-lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tour-email">Email</Label>
                      <Input id="tour-email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tour-phone">Phone</Label>
                      <Input id="tour-phone" placeholder="+212..." />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tour-hotel">Hotel Name (for pickup)</Label>
                      <Input id="tour-hotel" placeholder="Hotel name or address" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tour-requests">Special Requests (Optional)</Label>
                      <Input id="tour-requests" placeholder="Any special requests or requirements" />
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tour-terms" />
                        <Label htmlFor="tour-terms" className="text-sm">
                          I agree to the{" "}
                          <a href="#" className="text-terracotta-600 hover:underline">
                            terms and conditions
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-terracotta-600 hover:underline">
                            waiver of liability
                          </a>
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-sand-50 rounded-md border border-sand-200">
                    <h3 className="text-lg font-bold text-sand-800 mb-2">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Desert Discovery Tour (2 people)</span>
                        <span>1,200 MAD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Traditional Moroccan Meal (2 people)</span>
                        <span>300 MAD</span>
                      </div>
                      <div className="border-t border-sand-200 my-2 pt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-terracotta-600">1,500 MAD</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-terracotta-600 hover:bg-terracotta-700 mt-6">
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Booking;

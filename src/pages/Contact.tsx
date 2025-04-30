
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact = () => {
  return (
    <div className="min-h-screen bg-sand-50">
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Have questions or want to make a reservation? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="heading-md mb-6">Send Us a Message</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <form className="space-y-4">
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
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" placeholder="+212..." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Booking inquiry" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us what you need..." 
                    className="min-h-[150px]"
                  />
                </div>
                
                <Button className="w-full bg-terracotta-600 hover:bg-terracotta-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          <div>
            <h2 className="heading-md mb-6">Contact Information</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-terracotta-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sand-800">Address</h3>
                    <p className="text-sand-600">YouQuad, Lmzar, Ait Melloul, Morocco</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-terracotta-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sand-800">Phone</h3>
                    <p className="text-sand-600">+212 600 000 000</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-terracotta-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sand-800">Email</h3>
                    <p className="text-sand-600">info@youquad.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-terracotta-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sand-800">Operating Hours</h3>
                    <p className="text-sand-600">
                      Monday - Sunday: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="heading-md mb-6">Our Location</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-64">
              {/* Placeholder for the map. In a real implementation, we would use Google Maps API */}
              <div className="w-full h-full bg-sand-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-terracotta-500 mx-auto mb-2" />
                  <p className="text-sand-600">Map will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

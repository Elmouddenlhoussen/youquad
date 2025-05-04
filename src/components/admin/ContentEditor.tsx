
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

const ContentEditor = () => {
  // State for different content sections
  const [aboutContent, setAboutContent] = useState({
    title: "About Morocco Quads",
    subtitle: "Experience the Thrill of the Desert",
    mainContent: "Welcome to Morocco Quads, where adventure meets the stunning landscapes of Morocco. Our quad biking experiences offer an unparalleled opportunity to explore the magnificent desert terrain while enjoying the thrill of riding our high-quality quad bikes. With experienced guides and well-maintained equipment, we ensure that your journey through Morocco's natural wonders is both safe and unforgettable.",
    mission: "Our mission is to provide safe, exciting, and memorable quad biking experiences while respecting the beautiful Moroccan environment. We aim to share our passion for adventure with visitors from around the world.",
    vision: "To be the premier adventure tourism provider in Morocco, known for exceptional service, safety standards, and sustainable tourism practices."
  });
  
  const [homeContent, setHomeContent] = useState({
    heroTitle: "Experience Morocco's Desert on Four Wheels",
    heroSubtitle: "Unforgettable quad biking adventures through magnificent landscapes",
    ctaText: "Book Your Adventure Now",
    featuresTitle: "Why Choose Morocco Quads",
    testimonialTitle: "What Our Adventurers Say"
  });
  
  const [contactContent, setContactContent] = useState({
    title: "Contact Us",
    subtitle: "We'd love to hear from you",
    address: "123 Adventure Street, Marrakech, Morocco",
    email: "info@moroccoquads.com",
    phone: "+212 123 456 789",
    hours: "Open daily: 8:00 AM - 6:00 PM"
  });
  
  // Function to handle saving changes
  const handleSave = (section: string) => {
    // In a real application, this would send data to a backend API
    toast.success(`${section} content updated successfully!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
        <p className="text-gray-500 dark:text-gray-400">Edit website content across different sections</p>
      </div>
      
      <Tabs defaultValue="about">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="contact">Contact Page</TabsTrigger>
        </TabsList>
        
        {/* About Page Content */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Page Content</CardTitle>
              <CardDescription>
                Edit the content displayed on the About page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">Page Title</Label>
                <Input 
                  id="about-title" 
                  value={aboutContent.title}
                  onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-subtitle">Subtitle</Label>
                <Input 
                  id="about-subtitle" 
                  value={aboutContent.subtitle}
                  onChange={(e) => setAboutContent({...aboutContent, subtitle: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-main">Main Content</Label>
                <Textarea 
                  id="about-main" 
                  rows={6}
                  value={aboutContent.mainContent}
                  onChange={(e) => setAboutContent({...aboutContent, mainContent: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-mission">Our Mission</Label>
                <Textarea 
                  id="about-mission" 
                  rows={4}
                  value={aboutContent.mission}
                  onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-vision">Our Vision</Label>
                <Textarea 
                  id="about-vision" 
                  rows={4}
                  value={aboutContent.vision}
                  onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
                />
              </div>
              <Button 
                className="bg-terracotta-600 hover:bg-terracotta-700"
                onClick={() => handleSave('About')}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Home Page Content */}
        <TabsContent value="home">
          <Card>
            <CardHeader>
              <CardTitle>Home Page Content</CardTitle>
              <CardDescription>
                Edit the content displayed on the Home page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Hero Title</Label>
                <Input 
                  id="hero-title" 
                  value={homeContent.heroTitle}
                  onChange={(e) => setHomeContent({...homeContent, heroTitle: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                <Input 
                  id="hero-subtitle" 
                  value={homeContent.heroSubtitle}
                  onChange={(e) => setHomeContent({...homeContent, heroSubtitle: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-text">CTA Button Text</Label>
                <Input 
                  id="cta-text" 
                  value={homeContent.ctaText}
                  onChange={(e) => setHomeContent({...homeContent, ctaText: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features-title">Features Section Title</Label>
                <Input 
                  id="features-title" 
                  value={homeContent.featuresTitle}
                  onChange={(e) => setHomeContent({...homeContent, featuresTitle: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonial-title">Testimonials Section Title</Label>
                <Input 
                  id="testimonial-title" 
                  value={homeContent.testimonialTitle}
                  onChange={(e) => setHomeContent({...homeContent, testimonialTitle: e.target.value})}
                />
              </div>
              <Button 
                className="bg-terracotta-600 hover:bg-terracotta-700"
                onClick={() => handleSave('Home')}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Contact Page Content */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Page Content</CardTitle>
              <CardDescription>
                Edit the contact information displayed on the website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-title">Page Title</Label>
                <Input 
                  id="contact-title" 
                  value={contactContent.title}
                  onChange={(e) => setContactContent({...contactContent, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-subtitle">Subtitle</Label>
                <Input 
                  id="contact-subtitle" 
                  value={contactContent.subtitle}
                  onChange={(e) => setContactContent({...contactContent, subtitle: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-address">Address</Label>
                <Input 
                  id="contact-address" 
                  value={contactContent.address}
                  onChange={(e) => setContactContent({...contactContent, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input 
                    id="contact-email" 
                    value={contactContent.email}
                    onChange={(e) => setContactContent({...contactContent, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input 
                    id="contact-phone" 
                    value={contactContent.phone}
                    onChange={(e) => setContactContent({...contactContent, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-hours">Business Hours</Label>
                <Input 
                  id="contact-hours" 
                  value={contactContent.hours}
                  onChange={(e) => setContactContent({...contactContent, hours: e.target.value})}
                />
              </div>
              <Button 
                className="bg-terracotta-600 hover:bg-terracotta-700"
                onClick={() => handleSave('Contact')}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentEditor;

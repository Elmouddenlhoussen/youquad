
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="min-h-screen bg-sand-50">
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">About YouQuad</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Learn about our story, our mission, and why we're passionate about providing the best quad biking experience in Morocco.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="heading-md mb-6">Our Story</h2>
            <p className="text-sand-700 mb-4">
              Founded in 2018, YouQuad began with a simple mission: to share the beauty of Morocco's desert landscapes with adventurous travelers and locals alike. What started as a small operation with just four quad bikes has grown into the premier quad biking experience in the Ait Melloul region.
            </p>
            <p className="text-sand-700 mb-4">
              Our founder, Mohammed Benali, grew up exploring the desert and wanted to create an experience that would allow others to discover the magic of these landscapes while respecting the natural environment and local communities.
            </p>
            <p className="text-sand-700">
              Today, YouQuad offers a range of experiences from beginner-friendly tours to challenging expeditions, all guided by our team of experienced local experts who are passionate about creating unforgettable adventures.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="YouQuad founder" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <Separator className="my-16" />

        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">Our Values</h2>
          <p className="text-sand-700 text-lg max-w-3xl mx-auto mb-12">
            At YouQuad, everything we do is guided by our core values that define who we are and how we operate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-terracotta-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-sand-800 mb-3">Adventure</h3>
              <p className="text-sand-600">
                We believe in the transformative power of adventure and strive to create experiences that push boundaries and create lasting memories.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-terracotta-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-sand-800 mb-3">Authenticity</h3>
              <p className="text-sand-600">
                We provide authentic experiences that connect visitors with the real Morocco, its landscapes, people, and culture.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-terracotta-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-sand-800 mb-3">Community</h3>
              <p className="text-sand-600">
                We're committed to supporting local communities, employing local guides, and contributing to sustainable economic development.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-16" />

        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">Meet Our Team</h2>
          <p className="text-sand-700 text-lg max-w-3xl mx-auto mb-12">
            Our experienced team of guides and staff are passionate about sharing the beauty of Morocco with you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-sand-800 text-xl">Mohammed Benali</h3>
                <p className="text-terracotta-600 mb-2">Founder & Lead Guide</p>
                <p className="text-sand-600">
                  Born and raised in Ait Melloul, Mohammed has been exploring the desert since childhood and has 15+ years of guiding experience.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://randomuser.me/api/portraits/women/32.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-sand-800 text-xl">Fatima Ouazzani</h3>
                <p className="text-terracotta-600 mb-2">Operations Manager</p>
                <p className="text-sand-600">
                  With a background in tourism management, Fatima ensures that every aspect of your experience runs smoothly from booking to departure.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://randomuser.me/api/portraits/men/67.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-sand-800 text-xl">Youssef Amrani</h3>
                <p className="text-terracotta-600 mb-2">Senior Guide</p>
                <p className="text-sand-600">
                  Youssef is an expert on local history and culture, making your adventure both exciting and educational with his insightful commentary.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-sand-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-sand-800 mb-4">Ready to Experience the Adventure?</h2>
          <p className="text-sand-700 mb-6 max-w-2xl mx-auto">
            Whether you're a first-time rider or an experienced quad enthusiast, we have the perfect adventure waiting for you.
          </p>
          <Link to="/booking">
            <Button className="bg-terracotta-600 hover:bg-terracotta-700">
              Book Your Adventure
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

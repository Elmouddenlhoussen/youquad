
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import CallToAction from '@/components/CallToAction';
import AdminPanel from '@/components/AdminPanel';
import { useUser } from '@/contexts/UserContext';

const Index = () => {
  const { user } = useUser();
  
  return (
    <>
      <Hero />
      {user && user.role === 'admin' && <AdminPanel />}
      <Features />
      <Testimonials />
      <FAQSection />
      <CallToAction />
    </>
  );
};

export default Index;


import React from 'react';
import FAQSection from '@/components/FAQSection';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-sand-50 dark:bg-sand-900">
      {/* Hero section */}
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-sand-100 text-lg md:text-xl max-w-3xl mx-auto">
              Get answers to common questions about our quad bike tours, rentals, and policies
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* FAQ Section */}
        <FAQSection />
        
        {/* Contact Section */}
        <motion.div 
          className="mt-16 bg-white dark:bg-sand-800 rounded-lg shadow-md p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            If you couldn't find the answer to your question, our friendly team is here to help. 
            Contact us via live chat during business hours or send us an email, and we'll get back to you as soon as possible.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="outline" className="flex items-center gap-2 border-terracotta-500 text-terracotta-600 hover:bg-terracotta-50 dark:border-terracotta-400 dark:text-terracotta-400 dark:hover:bg-terracotta-900/20">
                <MessageCircle className="h-5 w-5" />
                Chat With Us
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button className="flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600">
                <Mail className="h-5 w-5" />
                Send Email
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;

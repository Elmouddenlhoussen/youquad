
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import { HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  className?: string;
  faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Do I need prior experience to ride a quad bike?",
    answer: "No, prior experience is not necessary. Our guides provide a comprehensive safety briefing and instructions before each tour. The quad bikes are automatic and easy to operate. However, for more challenging tours, some experience is recommended.",
    category: "Experience & Safety"
  },
  {
    question: "What's the minimum age requirement for riding quad bikes?",
    answer: "The minimum age for driving our quad bikes is 16 years old with parental consent. Younger children (ages 7+) can ride as passengers with an adult on our tandem quads. All riders under 18 must have a parent or guardian sign a waiver form.",
    category: "Experience & Safety"
  },
  {
    question: "What should I wear for a quad biking tour?",
    answer: "We recommend wearing comfortable clothing suitable for the weather conditions. Long pants and closed shoes are mandatory. In summer, bring sun protection (hat, sunglasses, sunscreen) and in winter, bring warm layers. We provide helmets, goggles, and dust masks for all participants.",
    category: "Preparation"
  },
  {
    question: "Can I bring my camera or phone on the tour?",
    answer: "Yes, you can bring cameras or phones, but at your own risk. We recommend securing them in a zippered pocket or using a neck strap. For photography enthusiasts, we offer small storage compartments on our quad bikes, as well as professional photo packages where our guides take photos throughout your adventure.",
    category: "Tours"
  },
  {
    question: "What happens if the weather is bad on the day of my tour?",
    answer: "Tours operate in most weather conditions except in cases of severe weather that compromise safety (heavy rain, sandstorms, etc.). If we need to cancel due to unsafe weather conditions, we'll offer you the option to reschedule or receive a full refund.",
    category: "Booking"
  },
  {
    question: "How far in advance should I book a quad bike tour?",
    answer: "We recommend booking at least 3-5 days in advance, especially during peak tourist season (October-April). For large groups, booking 1-2 weeks in advance is advised. Last-minute bookings can sometimes be accommodated based on availability.",
    category: "Booking"
  },
  {
    question: "Can I rent a quad bike without joining a guided tour?",
    answer: "Yes, we offer quad bike rentals without guided tours for experienced riders. However, you'll need to show proof of experience and sign additional waiver forms. We can provide maps of recommended routes. For safety reasons, rentals without guides are restricted to certain areas.",
    category: "Rentals"
  },
  {
    question: "Are there weight or height restrictions for riding quad bikes?",
    answer: "We have quad bikes suitable for most riders. The standard weight limit is approximately 120 kg (265 lbs) per person. We don't have strict height restrictions, but riders should be able to comfortably reach all controls. If you have concerns, please contact us before booking.",
    category: "Experience & Safety"
  },
  {
    question: "Do you offer pickup and drop-off services from hotels?",
    answer: "Yes, we offer complimentary pickup and drop-off services from most hotels in central areas. For locations outside our standard pickup zones, additional transportation fees may apply. Pickup times are typically 30-60 minutes before your scheduled tour time.",
    category: "Logistics"
  },
  {
    question: "What's included in the tour price?",
    answer: "Our standard tour prices include quad bike rental, fuel, safety equipment (helmet, goggles, dust mask), guide services, basic insurance, water, and hotel pickup/drop-off from central locations. Premium tours may also include meals, professional photography, and extended routes.",
    category: "Tours"
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, cancellations made more than 48 hours before the scheduled tour receive a full refund. Cancellations within 24-48 hours receive a 50% refund. Cancellations less than 24 hours before the tour are non-refundable. Rescheduling is free of charge if done more than 24 hours in advance.",
    category: "Booking"
  },
  {
    question: "What types of quad bikes do you offer?",
    answer: "We offer various quad bike models to suit different preferences and experience levels. These include standard single-rider quads (250cc-450cc), high-performance sport quads, utility quads with enhanced suspension for rougher terrain, and tandem quads that can accommodate two riders.",
    category: "Rentals"
  }
];

const FAQSection: React.FC<FAQSectionProps> = ({ 
  className = '',
  faqs = defaultFAQs
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  
  // Filter FAQs based on search term and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className={`${className} max-w-4xl mx-auto`}>
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-terracotta-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Find answers to commonly asked questions about our quad bike tours and rentals. 
            If you can't find what you're looking for, feel free to contact us.
          </p>
        </motion.div>
        
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions..."
            className="pl-10"
          />
        </div>
      </div>
      
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory 
                ? 'bg-terracotta-500 text-white' 
                : 'bg-gray-200 dark:bg-sand-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-sand-700'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Questions
          </motion.button>
          
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-terracotta-500 text-white' 
                  : 'bg-gray-200 dark:bg-sand-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-sand-700'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>
      )}
      
      {filteredFAQs.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.3 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-sand-700/50 font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-white/50 dark:bg-sand-800/50">
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                    <div className="mt-2">
                      <span className="inline-block text-xs font-medium bg-gray-100 dark:bg-sand-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      ) : (
        <div className="text-center py-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 dark:text-gray-400 mb-2">No matching questions found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Try adjusting your search or category selection
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FAQSection;

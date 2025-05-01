
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const faqData = [
  {
    question: "Do I need a license to drive a quad bike?",
    answer: "No, you don't need a special license to drive our quad bikes. We provide full training and safety instructions before each tour. However, riders must be at least 16 years old to drive a quad bike. Younger participants can ride as passengers with an adult."
  },
  {
    question: "What should I wear for quad biking?",
    answer: "We recommend wearing comfortable, closed-toe shoes, long pants, and clothing that you don't mind getting dusty. We provide helmets, goggles, and gloves for all riders. During summer months, bring sunscreen, sunglasses, and a light jacket for evening rides. In winter, dress in warm layers as desert temperatures can drop."
  },
  {
    question: "How long are the quad biking tours?",
    answer: "We offer tours of various durations. Our standard tours last 2 hours, while our half-day adventures run for 4 hours. We also have sunset specials (3 hours) and full-day excursions (6-8 hours) with meals included. Custom tour durations can be arranged for private groups."
  },
  {
    question: "Is quad biking safe?",
    answer: "Yes, quad biking is safe when proper precautions are taken. All of our tours begin with a thorough safety briefing and basic training session. Our guides are certified and experienced, and all equipment is regularly maintained and inspected. We follow strict safety protocols and adjust tours according to weather conditions and rider experience levels."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Bookings can be cancelled up to 48 hours before the scheduled tour for a full refund. Cancellations within 48 hours are eligible for a 50% refund. No refunds are provided for no-shows. In case of bad weather, we offer rescheduling or full refunds if no suitable alternative date is available."
  },
  {
    question: "Can children participate in quad biking?",
    answer: "Children aged 6 and above can participate as passengers with an adult rider. Teenagers aged 16 and above can drive their own quad bikes after proper instruction. We also have special kids' quads for children aged 8-15 that can be used in a controlled area under direct supervision."
  },
  {
    question: "Do you provide transportation to the quad biking location?",
    answer: "Yes, we offer pickup and drop-off services from most hotels and accommodations in the area for an additional fee. Please provide your location details when booking to arrange transportation. Alternatively, we can provide directions if you prefer to drive to our base yourself."
  },
  {
    question: "What if I've never ridden a quad bike before?",
    answer: "No experience is necessary! Our tours are designed for both beginners and experienced riders. Before each tour, we provide comprehensive instructions and a practice session to ensure you're comfortable operating the quad bike. Our guides will adjust the pace to accommodate all skill levels in the group."
  },
  {
    question: "Are food and drinks included in the tours?",
    answer: "Water is provided on all tours. Our half-day tours include light refreshments, while full-day tours include lunch at a traditional desert camp. Sunset tours feature refreshments and traditional Moroccan tea. Special dietary requirements can be accommodated with advance notice."
  },
  {
    question: "What should I bring on a quad biking tour?",
    answer: "We recommend bringing sunscreen, a camera (secured in a dust-proof bag), sunglasses, and a bandana or buff to protect from dust. Don't forget to bring your sense of adventure! All safety equipment is provided, and we have secure storage for personal belongings at our base."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-sand-50 dark:bg-sand-900">
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Find answers to the most common questions about quad biking adventures.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-white dark:bg-sand-800 rounded-lg shadow-sm border border-sand-200 dark:border-sand-700"
                >
                  <AccordionTrigger className="px-6 py-4 text-sand-800 dark:text-sand-100 hover:text-terracotta-500 dark:hover:text-terracotta-400 font-medium text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-sand-600 dark:text-sand-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <div className="mt-12 text-center space-y-6">
            <p className="text-sand-600 dark:text-sand-300">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-terracotta-500 text-white hover:bg-terracotta-600 min-w-[150px]">
                  Contact Us
                </Button>
              </Link>
              <Link to="/booking">
                <Button variant="outline" className="border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50 dark:border-terracotta-400 dark:text-terracotta-400 dark:hover:bg-terracotta-900/30 min-w-[150px]">
                  Book a Tour
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;

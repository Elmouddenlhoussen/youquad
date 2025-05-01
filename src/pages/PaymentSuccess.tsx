
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/services/paymentService';

const PaymentSuccess = () => {
  const location = useLocation();
  const { bookingDetails, paymentDetails } = location.state || {
    bookingDetails: null,
    paymentDetails: null
  };

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
    <div className="min-h-screen bg-sand-50 dark:bg-sand-900 pt-24 pb-20">
      <motion.div 
        className="container-custom"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="max-w-2xl mx-auto bg-white dark:bg-sand-800 rounded-xl shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          <div className="bg-green-500 p-6 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.5 
              }}
            >
              <CheckCircle className="w-20 h-20 mx-auto text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold mt-4 text-white">Payment Successful!</h1>
            <p className="mt-2 text-green-100">Your booking has been confirmed</p>
          </div>

          <div className="p-6 md:p-8">
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-sand-800 dark:text-sand-100">Booking Details</h2>
              
              {bookingDetails ? (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 bg-sand-100 dark:bg-sand-700/50 p-3 rounded-lg">
                    <Calendar className="w-5 h-5 text-terracotta-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-sand-500 dark:text-sand-400">Date</p>
                      <p className="font-medium">{bookingDetails.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 bg-sand-100 dark:bg-sand-700/50 p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-terracotta-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-sand-500 dark:text-sand-400">Time</p>
                      <p className="font-medium">{bookingDetails.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 bg-sand-100 dark:bg-sand-700/50 p-3 rounded-lg">
                    <Users className="w-5 h-5 text-terracotta-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-sand-500 dark:text-sand-400">Party Size</p>
                      <p className="font-medium">{bookingDetails.partySize} {bookingDetails.partySize === 1 ? 'person' : 'people'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sand-600 dark:text-sand-400">Booking details not available</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-bold mb-4 text-sand-800 dark:text-sand-100">Payment Information</h2>
              
              {paymentDetails ? (
                <div className="border-t border-b border-sand-200 dark:border-sand-700 py-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sand-600 dark:text-sand-400">Transaction ID</span>
                    <span className="font-medium">{paymentDetails.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sand-600 dark:text-sand-400">Payment Method</span>
                    <span className="font-medium">{paymentDetails.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sand-600 dark:text-sand-400">Date</span>
                    <span className="font-medium">{new Date(paymentDetails.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold mt-2">
                    <span>Total</span>
                    <span className="text-terracotta-600 dark:text-terracotta-400">{formatCurrency(paymentDetails.amount)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sand-600 dark:text-sand-400">Payment details not available</p>
              )}
            </motion.div>

            <motion.div 
              className="mt-8 text-center space-y-4"
              variants={itemVariants}
            >
              <p className="text-sand-600 dark:text-sand-400">
                A confirmation email has been sent to your email address.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline">
                    Return to Home
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button>
                    View My Bookings
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

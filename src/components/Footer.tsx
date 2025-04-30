
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Calendar, Star, Shield, Facebook, Instagram, Twitter } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import Logo from './Logo';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  const footerClass = theme === 'dark' 
    ? 'bg-sand-900 text-sand-100 border-t border-sand-800' 
    : 'bg-sand-800 text-white';
    
  const socialIconClass = theme === 'dark'
    ? 'bg-terracotta-600 hover:bg-terracotta-500'
    : 'bg-terracotta-500 hover:bg-terracotta-600';
    
  const linkClass = theme === 'dark'
    ? 'text-sand-300 hover:text-terracotta-300 transition-colors duration-200'
    : 'text-sand-100 hover:text-terracotta-300 transition-colors duration-200';

  const footerFeatures = [
    {
      icon: <Calendar className="h-5 w-5 text-terracotta-400" />,
      title: "Instant Bookings",
      description: "Book your adventure in seconds, 24/7"
    },
    {
      icon: <Shield className="h-5 w-5 text-terracotta-400" />,
      title: "Safety First",
      description: "Comprehensive training & quality equipment"
    },
    {
      icon: <MapPin className="h-5 w-5 text-terracotta-400" />,
      title: "Prime Locations",
      description: "Access exclusive desert routes"
    },
    {
      icon: <Star className="h-5 w-5 text-terracotta-400" />,
      title: "5-Star Experience",
      description: "Rated excellent by 95% of our customers"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <footer className={footerClass}>
      {/* Features Bar */}
      <div className={`py-10 ${theme === 'dark' ? 'bg-sand-800' : 'bg-sand-700'}`}>
        <div className="container-custom">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {footerFeatures.map((feature, index) => (
              <motion.div key={index} className="flex items-start space-x-4" variants={item}>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-sand-700' : 'bg-sand-600'}`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                  <p className={theme === 'dark' ? 'text-sand-300' : 'text-sand-200'}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Logo size="large" />
            </div>
            <p className={`${theme === 'dark' ? 'text-sand-300' : 'text-sand-100'} mb-6`}>
              Experience the thrill of quad biking through the stunning desert landscapes of Ait Melloul. Book your adventure today!
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://facebook.com" 
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${socialIconClass}`}
                aria-label="Facebook"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${socialIconClass}`}
                aria-label="Instagram"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${socialIconClass}`}
                aria-label="Twitter"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className={`px-4 py-2 rounded-l-md flex-grow focus:outline-none ${
                    theme === 'dark' ? 'bg-sand-700 text-white border-sand-600' : 'bg-white text-sand-800'
                  }`} 
                />
                <Button className="rounded-l-none bg-terracotta-500 hover:bg-terracotta-600">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className={linkClass}>Home</Link></li>
                <li><Link to="/quads" className={linkClass}>Quads</Link></li>
                <li><Link to="/tours" className={linkClass}>Tours</Link></li>
                <li><Link to="/about" className={linkClass}>About Us</Link></li>
                <li><Link to="/contact" className={linkClass}>Contact</Link></li>
                <li><Link to="/login" className={linkClass}>Login</Link></li>
                <li><Link to="/register" className={linkClass}>Register</Link></li>
              </ul>
            </motion.div>

            <motion.div variants={item}>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link to="/quads" className={linkClass}>Quad Rentals</Link></li>
                <li><Link to="/tours" className={linkClass}>Guided Tours</Link></li>
                <li><Link to="/tours" className={linkClass}>Group Packages</Link></li>
                <li><Link to="/tours" className={linkClass}>Training Sessions</Link></li>
                <li><Link to="/faq" className={linkClass}>FAQs</Link></li>
                <li><Link to="/terms" className={linkClass}>Terms & Conditions</Link></li>
              </ul>
            </motion.div>

            <motion.div variants={item}>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className={`h-5 w-5 ${theme === 'dark' ? 'text-terracotta-400' : 'text-terracotta-400'} mr-2 mt-0.5`} />
                  <span className={theme === 'dark' ? 'text-sand-300' : 'text-sand-100'}>Lmzar, Ait Melloul, Morocco</span>
                </li>
                <li className="flex items-center">
                  <Phone className={`h-5 w-5 ${theme === 'dark' ? 'text-terracotta-400' : 'text-terracotta-400'} mr-2`} />
                  <a href="tel:+212600000000" className={linkClass}>+212 600 000 000</a>
                </li>
                <li className="flex items-center">
                  <Mail className={`h-5 w-5 ${theme === 'dark' ? 'text-terracotta-400' : 'text-terracotta-400'} mr-2`} />
                  <a href="mailto:info@youquad.com" className={linkClass}>info@youquad.com</a>
                </li>
              </ul>
              
              <div className="mt-4">
                <h4 className="font-bold mb-2">Working Hours:</h4>
                <p className={theme === 'dark' ? 'text-sand-300' : 'text-sand-100'}>
                  Daily: 8:00 AM - 7:00 PM
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className={`border-t ${theme === 'dark' ? 'border-sand-800' : 'border-sand-700'} mt-12 pt-6 text-center`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className={theme === 'dark' ? 'text-sand-400' : 'text-sand-300'}>© {new Date().getFullYear()} YouQuad. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

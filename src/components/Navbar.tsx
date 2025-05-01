
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navClass = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${scrolled 
      ? theme === 'dark' 
        ? 'bg-sand-800/95 shadow-lg backdrop-blur-sm' 
        : 'bg-white/95 shadow-md backdrop-blur-sm' 
      : theme === 'dark'
        ? 'bg-sand-800/80'
        : 'bg-white'
    }
  `;

  const mobileMenuClass = `
    md:hidden fixed top-[61px] left-0 right-0 z-40 overflow-hidden
    ${theme === 'dark' ? 'bg-sand-800/95 backdrop-blur-sm border-t border-sand-700' : 'bg-white/95 backdrop-blur-sm border-t border-sand-200'}
  `;

  const activeLinkClass = theme === 'dark' 
    ? 'text-terracotta-300' 
    : 'text-terracotta-600';

  const linkClass = `
    relative text-sm font-medium transition-colors hover:scale-105 transform duration-150 px-2 py-1
    ${theme === 'dark' ? 'text-sand-100 hover:text-terracotta-300' : 'text-sand-800 hover:text-terracotta-600'}
  `;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Updated nav links including new pages
  const navLinks = [
    { path: '/', label: 'Home' },
    { 
      label: 'Quads', 
      children: [
        { path: '/quads', label: 'Browse Quads' },
        { path: '/quad-comparison', label: 'Compare Quads' }
      ]
    },
    { path: '/tours', label: 'Tours' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog' },
    { 
      label: 'Info', 
      children: [
        { path: '/enhanced-about', label: 'About Us' },
        { path: '/contact', label: 'Contact' },
        { path: '/faq', label: 'FAQ' },
      ]
    },
  ];

  // Animation variants
  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        when: 'beforeChildren' 
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: { 
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <motion.nav 
      className={navClass}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container-custom flex justify-between items-center py-3">
        <Link to="/" className="flex items-center space-x-2 z-50">
          <Logo showTooltip />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((navItem, idx) => 
            'children' in navItem ? (
              <DropdownMenu key={idx}>
                <DropdownMenuTrigger className={`flex items-center space-x-1 ${linkClass}`}>
                  <span>{navItem.label}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={theme === 'dark' ? 'bg-sand-800 border-sand-700 text-sand-100' : ''}>
                  {navItem.children.map((child, childIdx) => (
                    <DropdownMenuItem key={childIdx} asChild>
                      <Link 
                        to={child.path} 
                        className={`w-full ${isActive(child.path) ? activeLinkClass : ''}`}
                      >
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                key={idx}
                to={navItem.path} 
                className={`${linkClass} ${isActive(navItem.path) ? activeLinkClass : ''}`}
              >
                <span>{navItem.label}</span>
                {isActive(navItem.path) && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terracotta-500"
                    layoutId="activeNavIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link to="/profile">
            <Button 
              variant="outline" 
              className={`transition-all duration-300 ${theme === 'dark' 
                ? "border-terracotta-400 text-terracotta-400 hover:bg-terracotta-900/30" 
                : "border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50"
              }`}
            >
              My Account
            </Button>
          </Link>
          <Link to="/enhanced-booking">
            <Button 
              className={`relative overflow-hidden group transition-all duration-300 ${theme === 'dark' 
                ? "bg-terracotta-500 text-white hover:bg-terracotta-600" 
                : "bg-terracotta-500 text-white hover:bg-terracotta-600"
              }`}
            >
              <span className="relative z-10">Book Now</span>
              <span className="absolute inset-0 bg-terracotta-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`p-2 rounded-full ${theme === 'dark' ? 'text-sand-100 hover:bg-sand-700' : 'text-sand-800 hover:bg-sand-100'}`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: isOpen ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: isOpen ? 90 : -90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={mobileMenuClass}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="container-custom py-4 flex flex-col space-y-3">
              {navLinks.map((navItem, idx) => 
                'children' in navItem ? (
                  <motion.div key={idx} variants={itemVariants} className="space-y-2">
                    <p className={`${theme === 'dark' ? 'text-sand-300' : 'text-sand-500'} px-4 text-xs font-bold uppercase`}>
                      {navItem.label}
                    </p>
                    <div className="space-y-1 pl-2">
                      {navItem.children.map((child, childIdx) => (
                        <Link 
                          key={childIdx}
                          to={child.path} 
                          className={`block py-2 px-4 rounded-md ${isActive(child.path) 
                            ? theme === 'dark' ? 'bg-sand-700 text-terracotta-300' : 'bg-sand-100 text-terracotta-600' 
                            : theme === 'dark' ? 'hover:bg-sand-700' : 'hover:bg-sand-100'} ${linkClass}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={idx} variants={itemVariants}>
                    <Link 
                      to={navItem.path} 
                      className={`block py-2 px-4 rounded-md ${isActive(navItem.path) 
                        ? theme === 'dark' ? 'bg-sand-700 text-terracotta-300' : 'bg-sand-100 text-terracotta-600' 
                        : theme === 'dark' ? 'hover:bg-sand-700' : 'hover:bg-sand-100'} ${linkClass}`}
                    >
                      {navItem.label}
                    </Link>
                  </motion.div>
                )
              )}

              <motion.div className="flex flex-col space-y-2 pt-2" variants={itemVariants}>
                <Link to="/profile">
                  <Button 
                    variant="outline" 
                    className={`w-full ${theme === 'dark' 
                      ? "border-terracotta-400 text-terracotta-400 hover:bg-terracotta-900/30" 
                      : "border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50"
                    }`}
                  >
                    My Account
                  </Button>
                </Link>
                <Link to="/enhanced-booking">
                  <Button className="w-full bg-terracotta-500 text-white hover:bg-terracotta-600">
                    Book Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

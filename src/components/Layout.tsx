
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '@/hooks/useTheme';
import { Toaster } from '@/components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Apply theme class to document when theme changes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-sand-900 text-sand-100' : 'bg-background text-foreground'}`}>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Toaster position="bottom-right" closeButton richColors />
    </div>
  );
};

export default Layout;

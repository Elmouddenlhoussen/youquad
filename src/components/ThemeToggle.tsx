
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className={`w-9 h-9 rounded-full relative ${theme === 'dark' ? 'bg-sand-700/50 hover:bg-sand-700' : 'bg-sand-200/50 hover:bg-sand-200'}`}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme === 'dark' ? 'dark' : 'light'}
          initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-300" />
          ) : (
            <Moon className="h-5 w-5 text-sand-700" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};

export default ThemeToggle;

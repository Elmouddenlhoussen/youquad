
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useTheme } from '@/hooks/useTheme';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

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
    md:hidden bg-transparent animate-fade-in absolute top-full left-0 right-0
    ${theme === 'dark' ? 'bg-sand-800/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'}
  `;

  const linkClass = `
    text-sm font-medium transition-colors hover:scale-105 transform duration-150
    ${theme === 'dark' ? 'text-sand-100 hover:text-terracotta-300' : 'text-sand-800 hover:text-terracotta-600'}
  `;

  return (
    <nav className={navClass}>
      <div className="container-custom flex justify-between items-center py-3">
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={linkClass}>Home</Link>
          <Link to="/quads" className={linkClass}>Quads</Link>
          <Link to="/tours" className={linkClass}>Tours</Link>
          <Link to="/about" className={linkClass}>About</Link>
          <Link to="/contact" className={linkClass}>Contact</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link to="/login">
            <Button 
              variant="outline" 
              className={theme === 'dark' 
                ? "border-terracotta-400 text-terracotta-400 hover:bg-terracotta-900/30" 
                : "border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50"
              }
            >
              Login
            </Button>
          </Link>
          <Link to="/booking">
            <Button className={theme === 'dark' 
              ? "bg-terracotta-500 text-white hover:bg-terracotta-600" 
              : "bg-terracotta-500 text-white hover:bg-terracotta-600"
            }>
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={theme === 'dark' ? 'p-2 text-sand-100' : 'p-2 text-sand-800'}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className={mobileMenuClass}>
          <div className="container-custom py-4 flex flex-col space-y-3">
            <Link to="/" className={`py-2 px-4 hover:bg-sand-100/10 rounded-md ${linkClass}`} onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/quads" className={`py-2 px-4 hover:bg-sand-100/10 rounded-md ${linkClass}`} onClick={() => setIsOpen(false)}>
              Quads
            </Link>
            <Link to="/tours" className={`py-2 px-4 hover:bg-sand-100/10 rounded-md ${linkClass}`} onClick={() => setIsOpen(false)}>
              Tours
            </Link>
            <Link to="/about" className={`py-2 px-4 hover:bg-sand-100/10 rounded-md ${linkClass}`} onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link to="/contact" className={`py-2 px-4 hover:bg-sand-100/10 rounded-md ${linkClass}`} onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button 
                  variant="outline" 
                  className={`w-full ${theme === 'dark' 
                    ? "border-terracotta-400 text-terracotta-400 hover:bg-terracotta-900/30" 
                    : "border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50"
                  }`}
                >
                  Login
                </Button>
              </Link>
              <Link to="/booking" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-terracotta-500 text-white hover:bg-terracotta-600">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

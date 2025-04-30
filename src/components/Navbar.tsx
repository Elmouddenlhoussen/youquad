
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-terracotta-500"></div>
          <span className="text-xl font-bold text-sand-800">YouQuad</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sand-800 hover:text-terracotta-600 font-medium">Home</Link>
          <Link to="/quads" className="text-sand-800 hover:text-terracotta-600 font-medium">Quads</Link>
          <Link to="/tours" className="text-sand-800 hover:text-terracotta-600 font-medium">Tours</Link>
          <Link to="/about" className="text-sand-800 hover:text-terracotta-600 font-medium">About</Link>
          <Link to="/contact" className="text-sand-800 hover:text-terracotta-600 font-medium">Contact</Link>
          <div className="px-2">
            <LanguageSwitcher />
          </div>
          <Link to="/login">
            <Button variant="outline" className="border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50">
              Login
            </Button>
          </Link>
          <Link to="/booking">
            <Button className="bg-terracotta-500 text-white hover:bg-terracotta-600">
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <LanguageSwitcher />
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-sand-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white animate-fade-in">
          <div className="container-custom py-4 flex flex-col space-y-3">
            <Link to="/" className="text-sand-800 py-2 px-4 hover:bg-sand-100 rounded-md" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/quads" className="text-sand-800 py-2 px-4 hover:bg-sand-100 rounded-md" onClick={() => setIsOpen(false)}>
              Quads
            </Link>
            <Link to="/tours" className="text-sand-800 py-2 px-4 hover:bg-sand-100 rounded-md" onClick={() => setIsOpen(false)}>
              Tours
            </Link>
            <Link to="/about" className="text-sand-800 py-2 px-4 hover:bg-sand-100 rounded-md" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="text-sand-800 py-2 px-4 hover:bg-sand-100 rounded-md" onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50">
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

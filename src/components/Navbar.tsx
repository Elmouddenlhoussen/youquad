
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useUser } from '@/contexts/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from './SearchBar';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useUser();
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Navbar items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Quads', path: '/quads' },
    { name: 'Tours', path: '/tours' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check if current route is active
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2 dark:bg-sand-800 dark:shadow-sand-900/30' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <Logo showText={false} />
              <span className="ml-2 text-xl font-bold text-sand-800 dark:text-sand-100">
                YouQuad
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Search bar in navbar for desktop - shown when clicked */}
            {showSearchBar ? (
              <div className="w-64 mr-2 transition-all duration-300 ease-in-out">
                <SearchBar 
                  compact={true} 
                  placeholder="Search..." 
                />
              </div>
            ) : null}

            {/* Navigation links - shown when search bar is hidden */}
            {!showSearchBar && navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-terracotta-600 dark:text-terracotta-300'
                      : 'text-sand-600 hover:text-terracotta-600 dark:text-sand-300 dark:hover:text-terracotta-300'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            
            {/* Search button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearchBar(!showSearchBar)}
              aria-label="Toggle search"
              className={`ml-1 px-2 text-sand-600 hover:text-terracotta-600 dark:text-sand-300 dark:hover:text-terracotta-300 ${
                showSearchBar ? 'bg-sand-100 dark:bg-sand-700' : ''
              }`}
            >
              {showSearchBar ? (
                <X className="h-5 w-5" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </Button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile search trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-sand-600 hover:text-terracotta-600 dark:text-sand-300 dark:hover:text-terracotta-300"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="sr-only">Search</span>
            </Button>
            
            {/* User Avatar or Login Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-1 rounded-full h-10 w-10">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-terracotta-100 text-terracotta-700 dark:bg-terracotta-900 dark:text-terracotta-300">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-sand-500 dark:text-sand-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/booking">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm" className="ml-2">
                <Link to="/login">Login</Link>
              </Button>
            )}
            
            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="lg:hidden"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 sm:w-80">
                <div className="flex flex-col h-full">
                  <div className="space-y-4 py-4">
                    {/* Mobile search */}
                    <div className="px-3 py-2">
                      <SearchBar placeholder="Search..." />
                    </div>
                    
                    {/* Mobile nav links */}
                    <div className="px-3">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`flex items-center py-2 px-3 rounded-md transition-colors ${
                            isActive(item.path)
                              ? 'bg-sand-100 text-terracotta-600 dark:bg-sand-700 dark:text-terracotta-300'
                              : 'text-sand-600 hover:bg-sand-100 dark:text-sand-300 dark:hover:bg-sand-700'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    
                    <div className="border-t border-sand-200 dark:border-sand-700"></div>
                    
                    {/* Language switcher in mobile menu */}
                    <div className="px-6 py-2">
                      <p className="text-sm font-medium text-sand-500 dark:text-sand-400 mb-2">
                        Language
                      </p>
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile Search Bar (shown when triggered) */}
        {showSearchBar && isMobile && (
          <div className="pt-3 pb-2 px-2 lg:hidden">
            <SearchBar placeholder="Search..." />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

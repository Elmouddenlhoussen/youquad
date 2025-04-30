
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '@/hooks/useTheme';

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
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-sand-900 text-sand-100' : 'bg-background text-foreground'}`}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

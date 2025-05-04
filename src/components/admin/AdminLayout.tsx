
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Image, 
  Calendar, 
  MessageSquare,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useTheme } from '@/hooks/useTheme';
import { useUser } from '@/contexts/UserContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const { logout, user, updateProfile } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems: NavItem[] = [
    { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { title: 'Content', href: '/admin/content', icon: FileText },
    { title: 'Media Gallery', href: '/admin/gallery', icon: Image },
    { title: 'Users', href: '/admin/users', icon: Users },
    { title: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { title: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    { title: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-sand-900">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-sand-800 border-r border-gray-200 dark:border-sand-700">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-terracotta-600">YouQuad Admin</h1>
          </div>
          <div className="mt-8 flex flex-col flex-1">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className="w-full justify-start mb-1"
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Button>
              ))}
              
              <div className="pt-2 mt-6 border-t border-gray-200 dark:border-sand-700">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Log out
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          className="m-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <svg 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </Button>
      </div>
      
      {/* Mobile menu sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[250px]">
          <SheetHeader>
            <SheetTitle>YouQuad Admin</SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className="w-full justify-start mb-1"
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Button>
              ))}
              
              <div className="pt-2 mt-6 border-t border-gray-200 dark:border-sand-700">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Log out
                </Button>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white dark:bg-sand-800 shadow-sm">
          <div className="px-4 py-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              YouQuad Admin Dashboard
            </h2>
            <div className="ml-4 flex items-center md:ml-6">
              {/* User profile dropdown could go here */}
            </div>
          </div>
        </header>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

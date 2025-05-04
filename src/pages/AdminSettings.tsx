
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const AdminSettings = () => {
  const { user, isLoading } = useUser();
  
  // Check if user is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta-600"></div>
      </div>
    );
  }
  
  // Check if user is an admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  // Mock settings state
  const [generalSettings, setGeneralSettings] = React.useState({
    siteName: 'Morocco Quads Adventures',
    siteDescription: 'Experience the thrill of Morocco\'s desert with our premium quad biking tours.',
    contactEmail: 'info@moroccoquads.com',
    contactPhone: '+212 123 456 789',
    address: '123 Adventure Street, Marrakech, Morocco'
  });
  
  const [seoSettings, setSeoSettings] = React.useState({
    metaTitle: 'Morocco Quads Adventures - Premium Desert Quad Biking Tours',
    metaDescription: 'Explore the Moroccan desert with our thrilling quad biking tours. Book your adventure today!',
    googleAnalyticsId: 'UA-12345678-1'
  });
  
  const [functionalSettings, setFunctionalSettings] = React.useState({
    enableBooking: true,
    enableReviews: true,
    enableUserRegistration: true,
    maintenanceMode: false
  });
  
  // Handle saving settings
  const handleSaveGeneral = () => {
    // In a real application, this would send data to a backend API
    toast.success('General settings saved successfully!');
  };
  
  const handleSaveSEO = () => {
    toast.success('SEO settings saved successfully!');
  };
  
  const handleSaveFunctional = () => {
    toast.success('Functional settings saved successfully!');
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage global settings for your website</p>
        </div>
        
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic information about your website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input 
                id="site-name" 
                value={generalSettings.siteName}
                onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="site-description">Site Description</Label>
              <Textarea 
                id="site-description" 
                rows={3}
                value={generalSettings.siteDescription}
                onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input 
                  id="contact-email" 
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input 
                  id="contact-phone" 
                  value={generalSettings.contactPhone}
                  onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Input 
                id="address" 
                value={generalSettings.address}
                onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
              />
            </div>
            
            <Button 
              className="bg-terracotta-600 hover:bg-terracotta-700"
              onClick={handleSaveGeneral}
            >
              Save General Settings
            </Button>
          </CardContent>
        </Card>
        
        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Search engine optimization settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Meta Title</Label>
              <Input 
                id="meta-title" 
                value={seoSettings.metaTitle}
                onChange={(e) => setSeoSettings({...seoSettings, metaTitle: e.target.value})}
              />
              <p className="text-xs text-gray-500">
                Recommended length: 50-60 characters. Current: {seoSettings.metaTitle.length}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
              <Textarea 
                id="meta-description" 
                rows={3}
                value={seoSettings.metaDescription}
                onChange={(e) => setSeoSettings({...seoSettings, metaDescription: e.target.value})}
              />
              <p className="text-xs text-gray-500">
                Recommended length: 150-160 characters. Current: {seoSettings.metaDescription.length}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ga-id">Google Analytics ID</Label>
              <Input 
                id="ga-id" 
                value={seoSettings.googleAnalyticsId}
                onChange={(e) => setSeoSettings({...seoSettings, googleAnalyticsId: e.target.value})}
              />
            </div>
            
            <Button 
              className="bg-terracotta-600 hover:bg-terracotta-700"
              onClick={handleSaveSEO}
            >
              Save SEO Settings
            </Button>
          </CardContent>
        </Card>
        
        {/* Functional Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Functional Settings</CardTitle>
            <CardDescription>Control website features and functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="booking-switch">Enable Booking System</Label>
                <p className="text-sm text-gray-500">Allow users to book tours on the website</p>
              </div>
              <Switch 
                id="booking-switch" 
                checked={functionalSettings.enableBooking}
                onCheckedChange={(checked) => setFunctionalSettings({...functionalSettings, enableBooking: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reviews-switch">Enable Reviews</Label>
                <p className="text-sm text-gray-500">Allow users to leave reviews on tours</p>
              </div>
              <Switch 
                id="reviews-switch" 
                checked={functionalSettings.enableReviews}
                onCheckedChange={(checked) => setFunctionalSettings({...functionalSettings, enableReviews: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="registration-switch">Enable User Registration</Label>
                <p className="text-sm text-gray-500">Allow visitors to create user accounts</p>
              </div>
              <Switch 
                id="registration-switch" 
                checked={functionalSettings.enableUserRegistration}
                onCheckedChange={(checked) => setFunctionalSettings({...functionalSettings, enableUserRegistration: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenance-switch">Maintenance Mode</Label>
                <p className="text-sm text-gray-500 text-red-500">When enabled, only admins can access the site</p>
              </div>
              <Switch 
                id="maintenance-switch" 
                checked={functionalSettings.maintenanceMode}
                onCheckedChange={(checked) => setFunctionalSettings({...functionalSettings, maintenanceMode: checked})}
              />
            </div>
            
            <Button 
              className="bg-terracotta-600 hover:bg-terracotta-700"
              onClick={handleSaveFunctional}
            >
              Save Functional Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;

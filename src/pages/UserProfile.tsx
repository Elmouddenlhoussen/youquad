
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import type { UserProfile as UserProfileType, BookingHistory } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, User, Mail, Phone, Calendar, LogOut, Clock } from 'lucide-react';
import { formatCurrency } from '@/services/paymentService';

const UserProfile = () => {
  const { user, logout, updateProfile, isLoading } = useUser();
  const [formData, setFormData] = useState<Partial<UserProfileType>>(
    user ? { name: user.name, email: user.email, phone: user.phone } : {}
  );
  const [isEditing, setIsEditing] = useState(false);
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };
  
  const renderBookingStatus = (status: BookingHistory['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Confirmed</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Pending</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Cancelled</span>;
      default:
        return null;
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-sand-200 dark:border-sand-700">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xl bg-terracotta-100 text-terracotta-700 dark:bg-terracotta-900 dark:text-terracotta-300">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sand-500 dark:text-sand-400">{user.email}</p>
                  {user.phone && <p className="text-sand-500 dark:text-sand-400">{user.phone}</p>}
                </div>
                
                <Button 
                  variant="outline" 
                  className="border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50 dark:border-terracotta-700 dark:text-terracotta-400 dark:hover:bg-terracotta-900/30 w-full"
                  onClick={() => logout()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="profile">My Profile</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card className="border-sand-200 dark:border-sand-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                    <CardDescription>Update your profile information</CardDescription>
                  </div>
                  
                  {!isEditing && (
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50 dark:border-terracotta-700 dark:text-terracotta-400 dark:hover:bg-terracotta-900/30"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-sand-500" />
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-sand-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-sand-500" />
                        <Input
                          id="phone"
                          placeholder="+1 (234) 567-8901"
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="flex space-x-3 pt-4">
                        <Button 
                          type="submit"
                          className="bg-terracotta-600 hover:bg-terracotta-700"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setFormData({
                              name: user.name,
                              email: user.email,
                              phone: user.phone
                            });
                            setIsEditing(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings">
              <Card className="border-sand-200 dark:border-sand-700">
                <CardHeader>
                  <CardTitle className="text-xl">Booking History</CardTitle>
                  <CardDescription>View all your bookings</CardDescription>
                </CardHeader>
                
                <CardContent>
                  {user.bookings && user.bookings.length > 0 ? (
                    <div className="space-y-4">
                      {user.bookings.map((booking) => (
                        <div 
                          key={booking.id} 
                          className="border border-sand-200 dark:border-sand-700 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                        >
                          <div className="space-y-2">
                            <h3 className="font-bold text-lg">{booking.tourName}</h3>
                            <div className="flex items-center text-sand-500 dark:text-sand-400 space-x-4">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {renderBookingStatus(booking.status)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right w-full md:w-auto">
                            <div className="font-bold text-lg text-terracotta-600 dark:text-terracotta-400">
                              {formatCurrency(booking.price)}
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="mt-2 w-full md:w-auto"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-sand-500 dark:text-sand-400">No bookings found</h3>
                      <p className="mt-1 text-sand-500 dark:text-sand-400">Your booking history will appear here</p>
                      <Button className="mt-4 bg-terracotta-600 hover:bg-terracotta-700">
                        Browse Tours
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

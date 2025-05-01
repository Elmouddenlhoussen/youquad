
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Settings,
  Bell,
  CreditCard,
  LogOut,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

// Mock user data
const userData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  phone: "+212 612 345 678",
  dateJoined: "2024-12-10",
  address: "123 Marrakech Ave, Marrakech, Morocco"
};

// Mock bookings data
const bookingsData = [
  {
    id: "B-2025-042",
    date: "2025-05-10",
    time: "09:00 AM",
    tourName: "Desert Adventure Tour",
    quads: 2,
    duration: "3 hours",
    price: 700,
    status: "upcoming"
  },
  {
    id: "B-2025-036",
    date: "2025-04-28",
    time: "10:30 AM",
    tourName: "Sunrise Desert Experience",
    quads: 1,
    duration: "2 hours",
    price: 300,
    status: "upcoming"
  },
  {
    id: "B-2025-027",
    date: "2025-04-15",
    time: "04:00 PM",
    tourName: "Sunset Tour",
    quads: 2,
    duration: "3 hours",
    price: 750,
    status: "completed"
  },
  {
    id: "B-2025-019",
    date: "2025-03-22",
    time: "11:00 AM",
    tourName: "Desert Adventure Tour",
    quads: 1,
    duration: "4 hours",
    price: 450,
    status: "completed"
  },
  {
    id: "B-2025-008",
    date: "2025-02-14",
    time: "02:00 PM",
    tourName: "Quad Explorer Package",
    quads: 2,
    duration: "5 hours",
    price: 900,
    status: "completed"
  }
];

// Mock reviews
const reviewsData = [
  {
    id: 1,
    tourName: "Desert Adventure Tour",
    date: "2025-04-15",
    rating: 5,
    comment: "Amazing experience! The guides were knowledgeable and friendly. The quads were in excellent condition. Highly recommend!",
    guide: "Mohammed"
  },
  {
    id: 2,
    tourName: "Sunset Tour",
    date: "2025-03-22",
    rating: 4,
    comment: "Beautiful sunset views. The tour was well organized. Would have liked a bit more time for photos.",
    guide: "Ahmed"
  }
];

// Form type
type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  preferredLanguage: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
};

const UserProfile = () => {
  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailBookingConfirmations: true,
    emailPromotions: false,
    emailReminders: true,
    smsBookingConfirmations: true,
    smsReminders: false,
    pushNotifications: true
  });

  // Handle notification toggle
  const handleToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Form for profile settings
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      preferredLanguage: "english",
      password: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form submitted:", data);
    // Here you would save the profile changes
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render stars for ratings
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-yellow-500' : 'text-sand-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-sand-900">
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">My Account</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Manage your profile, bookings, and settings.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-8 flex justify-center w-full overflow-x-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>My Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>My Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Account Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* User Profile Card */}
              <motion.div variants={itemVariants}>
                <Card className="dark:bg-sand-800">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={userData.avatar} alt={userData.name} />
                        <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle>{userData.name}</CardTitle>
                    <CardDescription>{userData.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-sand-500">Gold Member</Badge>
                      <Badge variant="outline">15 Tours</Badge>
                    </div>
                    <div className="text-sm text-sand-600 dark:text-sand-300 mt-2">
                      <p className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" />
                        {userData.address}
                      </p>
                      <p className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" />
                        Member since {formatDate(userData.dateJoined)}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" className="border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50 dark:border-terracotta-400 dark:text-terracotta-400 dark:hover:bg-terracotta-900/30">
                      Edit Profile
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Quick Stats */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <Card className="h-full dark:bg-sand-800">
                  <CardHeader>
                    <CardTitle>Your Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-sand-100 dark:bg-sand-700 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-sand-800 dark:text-sand-100">Upcoming Bookings</h3>
                        <p className="text-3xl font-bold text-terracotta-500">2</p>
                        <p className="text-sm text-sand-600 dark:text-sand-300 mt-2">Next: Desert Adventure Tour</p>
                        <p className="text-sm text-sand-600 dark:text-sand-300">May 10, 2025</p>
                      </div>
                      <div className="bg-sand-100 dark:bg-sand-700 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-sand-800 dark:text-sand-100">Completed Tours</h3>
                        <p className="text-3xl font-bold text-terracotta-500">3</p>
                        <p className="text-sm text-sand-600 dark:text-sand-300 mt-2">Total Hours: 12</p>
                        <p className="text-sm text-sand-600 dark:text-sand-300">Last: April 15, 2025</p>
                      </div>
                      <div className="bg-sand-100 dark:bg-sand-700 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-sand-800 dark:text-sand-100">Loyalty Points</h3>
                        <p className="text-3xl font-bold text-terracotta-500">450</p>
                        <p className="text-sm text-sand-600 dark:text-sand-300 mt-2">50 points until next level</p>
                        <p className="text-sm text-sand-600 dark:text-sand-300">Level: Gold</p>
                      </div>
                      <div className="bg-sand-100 dark:bg-sand-700 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-sand-800 dark:text-sand-100">Special Offers</h3>
                        <p className="text-3xl font-bold text-terracotta-500">2</p>
                        <p className="text-sm text-sand-600 dark:text-sand-300 mt-2">15% off your next booking</p>
                        <p className="text-sm text-sand-600 dark:text-sand-300">Expires: June 1, 2025</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Bookings */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <Card className="dark:bg-sand-800">
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Tour</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookingsData.slice(0, 3).map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>{formatDate(booking.date)}</TableCell>
                            <TableCell>{booking.tourName}</TableCell>
                            <TableCell>{booking.duration}</TableCell>
                            <TableCell>
                              <Badge 
                                className={booking.status === 'upcoming' 
                                  ? 'bg-green-500' 
                                  : booking.status === 'completed'
                                    ? 'bg-blue-500'
                                    : 'bg-yellow-500'
                                }
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Bookings</Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Recent Reviews */}
              <motion.div variants={itemVariants}>
                <Card className="dark:bg-sand-800">
                  <CardHeader>
                    <CardTitle>Your Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reviewsData.slice(0, 1).map((review) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{review.tourName}</h4>
                          <span className="text-xs text-sand-500">{formatDate(review.date)}</span>
                        </div>
                        <div>{renderStars(review.rating)}</div>
                        <p className="text-sm text-sand-600 dark:text-sand-300 line-clamp-3">{review.comment}</p>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Reviews</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="dark:bg-sand-800">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <CardTitle>My Bookings</CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm" className="h-8">
                          All
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 bg-green-500/10 text-green-500 border-green-500 hover:bg-green-500/20">
                          Upcoming
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 bg-blue-500/10 text-blue-500 border-blue-500 hover:bg-blue-500/20">
                          Completed
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 bg-orange-500/10 text-orange-500 border-orange-500 hover:bg-orange-500/20">
                          Cancelled
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Tour</TableHead>
                          <TableHead>Quads</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Price (MAD)</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookingsData.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>
                              {formatDate(booking.date)}
                              <br />
                              <span className="text-xs text-sand-500 dark:text-sand-400 flex items-center">
                                <Clock className="h-3 w-3 mr-1" /> {booking.time}
                              </span>
                            </TableCell>
                            <TableCell>{booking.tourName}</TableCell>
                            <TableCell>{booking.quads}</TableCell>
                            <TableCell>{booking.duration}</TableCell>
                            <TableCell>{booking.price}</TableCell>
                            <TableCell>
                              <Badge 
                                className={booking.status === 'upcoming' 
                                  ? 'bg-green-500' 
                                  : booking.status === 'completed'
                                    ? 'bg-blue-500'
                                    : 'bg-yellow-500'
                                }
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-8">
                                  {booking.status === 'upcoming' ? 'Modify' : 'Details'}
                                </Button>
                                {booking.status === 'upcoming' && (
                                  <Button variant="outline" size="sm" className="h-8 border-red-500 text-red-500 hover:bg-red-500/10">
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="dark:bg-sand-800">
                  <CardHeader>
                    <CardTitle>My Reviews</CardTitle>
                    <CardDescription>Reviews you've left for our tours</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {reviewsData.map((review) => (
                      <div 
                        key={review.id} 
                        className="border-b border-sand-200 dark:border-sand-700 pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                          <h3 className="font-medium text-lg">{review.tourName}</h3>
                          <div className="text-sm text-sand-500 dark:text-sand-400">
                            {formatDate(review.date)}
                          </div>
                        </div>
                        <div className="mb-2">{renderStars(review.rating)}</div>
                        <p className="text-sand-600 dark:text-sand-300 mb-2">{review.comment}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-sand-500 dark:text-sand-400">
                            Guide: {review.guide}
                          </span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 border-red-500 text-red-500 hover:bg-red-500/10">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-sand-500 dark:text-sand-400">
                      {reviewsData.length} reviews in total
                    </p>
                    <Button>Write a New Review</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {/* Account Settings Tab */}
          <TabsContent value="account">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Personal Information */}
              <motion.div className="md:col-span-2" variants={itemVariants}>
                <Card className="dark:bg-sand-800">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your account details and personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="preferredLanguage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Language</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="french">French</SelectItem>
                                    <SelectItem value="arabic">Arabic</SelectItem>
                                    <SelectItem value="spanish">Spanish</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit">Save Changes</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Password Update */}
              <motion.div variants={itemVariants}>
                <Card className="dark:bg-sand-800">
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">Update Password</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Notification Settings */}
              <motion.div variants={itemVariants}>
                <Card className="dark:bg-sand-800">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how we contact you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-sand-800 dark:text-sand-100 mb-2">Email Notifications</h3>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-booking" className="text-sm text-sand-600 dark:text-sand-300">
                          Booking confirmations
                        </Label>
                        <Switch 
                          id="email-booking" 
                          checked={notificationSettings.emailBookingConfirmations}
                          onCheckedChange={() => handleToggle('emailBookingConfirmations')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-promotions" className="text-sm text-sand-600 dark:text-sand-300">
                          Promotional offers
                        </Label>
                        <Switch 
                          id="email-promotions" 
                          checked={notificationSettings.emailPromotions}
                          onCheckedChange={() => handleToggle('emailPromotions')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-reminders" className="text-sm text-sand-600 dark:text-sand-300">
                          Tour reminders
                        </Label>
                        <Switch 
                          id="email-reminders" 
                          checked={notificationSettings.emailReminders}
                          onCheckedChange={() => handleToggle('emailReminders')}
                        />
                      </div>
                      
                      <div className="border-t border-sand-200 dark:border-sand-700 pt-4 mt-4">
                        <h3 className="text-sm font-medium text-sand-800 dark:text-sand-100 mb-2">SMS Notifications</h3>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-booking" className="text-sm text-sand-600 dark:text-sand-300">
                            Booking confirmations
                          </Label>
                          <Switch 
                            id="sms-booking" 
                            checked={notificationSettings.smsBookingConfirmations}
                            onCheckedChange={() => handleToggle('smsBookingConfirmations')}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-reminders" className="text-sm text-sand-600 dark:text-sand-300">
                            Tour reminders
                          </Label>
                          <Switch 
                            id="sms-reminders" 
                            checked={notificationSettings.smsReminders}
                            onCheckedChange={() => handleToggle('smsReminders')}
                          />
                        </div>
                      </div>
                      
                      <div className="border-t border-sand-200 dark:border-sand-700 pt-4 mt-4">
                        <h3 className="text-sm font-medium text-sand-800 dark:text-sand-100 mb-2">App Notifications</h3>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-notifications" className="text-sm text-sand-600 dark:text-sand-300">
                            Push notifications
                          </Label>
                          <Switch 
                            id="push-notifications" 
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={() => handleToggle('pushNotifications')}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Save Preferences</Button>
                  </CardFooter>
                </Card>
              </motion.div>
              
              {/* Payment Methods */}
              <motion.div className="md:col-span-2" variants={itemVariants}>
                <Card className="dark:bg-sand-800">
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-sand-200 dark:border-sand-700 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-2 rounded">
                            <CreditCard className="h-6 w-6 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-sand-500">Expires 05/2027</p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-sand-200 dark:border-sand-700 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="bg-red-100 p-2 rounded">
                            <CreditCard className="h-6 w-6 text-red-500" />
                          </div>
                          <div>
                            <p className="font-medium">Mastercard ending in 8888</p>
                            <p className="text-sm text-sand-500">Expires 09/2026</p>
                          </div>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">Set as Default</Button>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        Add New Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Account Actions */}
              <motion.div variants={itemVariants}>
                <Card className="dark:bg-sand-800">
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                    <Button variant="outline" className="w-full text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;

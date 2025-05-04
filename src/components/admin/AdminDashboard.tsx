
import React from 'react';
import { 
  Users, 
  FileText, 
  Image, 
  Calendar, 
  MessageSquare, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for dashboard
  const stats = [
    { title: 'Total Users', value: 1236, icon: Users, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' },
    { title: 'Quads Available', value: 24, icon: FileText, color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' },
    { title: 'Media Items', value: 87, icon: Image, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' },
    { title: 'Bookings (Monthly)', value: 58, icon: Calendar, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' },
    { title: 'Reviews', value: 124, icon: MessageSquare, color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300' },
  ];
  
  // Mock recent bookings data
  const recentBookings = [
    { id: 'B-1021', customer: 'John Doe', date: '2023-05-01', status: 'Confirmed', price: '$120.00' },
    { id: 'B-1020', customer: 'Jane Smith', date: '2023-04-30', status: 'Pending', price: '$95.00' },
    { id: 'B-1019', customer: 'Mike Johnson', date: '2023-04-29', status: 'Confirmed', price: '$220.00' },
    { id: 'B-1018', customer: 'Sarah Williams', date: '2023-04-28', status: 'Cancelled', price: '$150.00' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">YouQuad Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Overview of your platform's performance and recent activity.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-md ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button 
            onClick={() => navigate('/admin/content')}
            className="bg-terracotta-600 hover:bg-terracotta-700"
          >
            Edit Content
          </Button>
          <Button 
            onClick={() => navigate('/admin/gallery')}
            className="bg-terracotta-600 hover:bg-terracotta-700"
          >
            Manage Media
          </Button>
          <Button 
            onClick={() => navigate('/admin/users')}
            className="bg-terracotta-600 hover:bg-terracotta-700"
          >
            View Users
          </Button>
          <Button 
            onClick={() => navigate('/admin/bookings')}
            className="bg-terracotta-600 hover:bg-terracotta-700"
          >
            Handle Bookings
          </Button>
        </CardContent>
      </Card>
      
      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {booking.status === 'Confirmed' && (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      )}
                      {booking.status === 'Pending' && (
                        <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                      )}
                      {booking.status === 'Cancelled' && (
                        <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                      )}
                      {booking.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{booking.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/bookings')}
            >
              View All Bookings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

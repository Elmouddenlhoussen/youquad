
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { 
  CalendarIcon, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Search, 
  Eye, 
  Edit, 
  Trash2 
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Mock booking data for demonstration
const mockBookings = [
  { 
    id: 'B-1024', 
    customer: 'John Doe', 
    email: 'john@example.com',
    phone: '+212 612 345 678',
    tourName: 'Desert Adventure', 
    quadName: 'Sport 450',
    date: '2023-05-15',
    time: '10:00 AM',
    duration: '3 hours',
    participants: 2,
    price: 240.00,
    status: 'confirmed',
    paymentMethod: 'Credit Card',
    notes: 'First-time rider, requested safety briefing',
  },
  { 
    id: 'B-1023', 
    customer: 'Jane Smith', 
    email: 'jane@example.com',
    phone: '+212 613 456 789',
    tourName: 'Mountain Trail', 
    quadName: 'Utility 350',
    date: '2023-05-18',
    time: '2:00 PM',
    duration: '2 hours',
    participants: 1,
    price: 120.00,
    status: 'pending',
    paymentMethod: 'PayPal',
    notes: '',
  },
  { 
    id: 'B-1022', 
    customer: 'Mike Johnson', 
    email: 'mike@example.com',
    phone: '+212 614 567 890',
    tourName: 'Sunset Tour', 
    quadName: 'Sport 450',
    date: '2023-05-20',
    time: '5:00 PM',
    duration: '4 hours',
    participants: 3,
    price: 450.00,
    status: 'confirmed',
    paymentMethod: 'Bank Transfer',
    notes: 'Anniversary celebration',
  },
  { 
    id: 'B-1021', 
    customer: 'Sarah Williams', 
    email: 'sarah@example.com',
    phone: '+212 615 678 901',
    tourName: 'Desert Adventure', 
    quadName: 'Family 500',
    date: '2023-05-12',
    time: '9:00 AM',
    duration: '3 hours',
    participants: 4,
    price: 400.00,
    status: 'cancelled',
    paymentMethod: 'Credit Card',
    notes: 'Cancelled due to weather conditions',
  },
];

const BookingManagement = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);

  // Filter bookings based on search query and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Update booking status
  const handleUpdateStatus = () => {
    const updatedBookings = bookings.map(booking => 
      booking.id === currentBooking.id ? { ...currentBooking } : booking
    );
    
    setBookings(updatedBookings);
    setCurrentBooking(null);
    setIsEditDialogOpen(false);
    toast.success('Booking updated successfully!');
  };
  
  // Delete booking
  const handleDeleteBooking = () => {
    const updatedBookings = bookings.filter(booking => booking.id !== currentBooking.id);
    setBookings(updatedBookings);
    setCurrentBooking(null);
    setIsDeleteDialogOpen(false);
    toast.success('Booking deleted successfully!');
  };
  
  // View booking details
  const openViewDialog = (booking: any) => {
    setCurrentBooking(booking);
    setIsViewDialogOpen(true);
  };
  
  // Open edit dialog
  const openEditDialog = (booking: any) => {
    setCurrentBooking(booking);
    setIsEditDialogOpen(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (booking: any) => {
    setCurrentBooking(booking);
    setIsDeleteDialogOpen(true);
  };
  
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            <span className="text-green-600 dark:text-green-400">Confirmed</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
            <span className="text-yellow-600 dark:text-yellow-400">Pending</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center">
            <XCircle className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-600 dark:text-red-400">Cancelled</span>
          </div>
        );
      default:
        return <span>{status}</span>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Booking Management</h1>
        <p className="text-gray-500 dark:text-gray-400">View and manage all tour bookings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>
            Manage customer bookings for tours and quad rentals
          </CardDescription>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search bookings..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.tourName}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewDialog(booking)}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">View</span>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(booking)}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Edit</span>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDeleteDialog(booking)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <span className="sr-only">Delete</span>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredBookings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarIcon className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No bookings found</h3>
              <p className="text-gray-500 mt-1">
                {searchQuery ? 'Try adjusting your search query' : 'No bookings match the selected filter'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {currentBooking && (
            <div className="space-y-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Booking #{currentBooking.id}</h3>
                {getStatusBadge(currentBooking.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">Customer Information</h4>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Name:</span> {currentBooking.customer}</p>
                    <p><span className="font-medium">Email:</span> {currentBooking.email}</p>
                    <p><span className="font-medium">Phone:</span> {currentBooking.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">Booking Information</h4>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Tour:</span> {currentBooking.tourName}</p>
                    <p><span className="font-medium">Quad:</span> {currentBooking.quadName}</p>
                    <p><span className="font-medium">Date:</span> {currentBooking.date}</p>
                    <p><span className="font-medium">Time:</span> {currentBooking.time}</p>
                    <p><span className="font-medium">Duration:</span> {currentBooking.duration}</p>
                    <p><span className="font-medium">Participants:</span> {currentBooking.participants}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-500 dark:text-gray-400">Payment Information</h4>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Price:</span> ${currentBooking.price.toFixed(2)}</p>
                  <p><span className="font-medium">Payment Method:</span> {currentBooking.paymentMethod}</p>
                </div>
              </div>
              
              {currentBooking.notes && (
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">Additional Notes</h4>
                  <p className="mt-2">{currentBooking.notes}</p>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                <Button 
                  className="bg-terracotta-600 hover:bg-terracotta-700"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    openEditDialog(currentBooking);
                  }}
                >
                  Edit Booking
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          {currentBooking && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={currentBooking.status}
                  onValueChange={(value) => setCurrentBooking({...currentBooking, status: value})}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input 
                  id="edit-date" 
                  type="date"
                  value={currentBooking.date}
                  onChange={(e) => setCurrentBooking({...currentBooking, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input 
                  id="edit-time" 
                  value={currentBooking.time}
                  onChange={(e) => setCurrentBooking({...currentBooking, time: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-participants">Participants</Label>
                <Input 
                  id="edit-participants" 
                  type="number"
                  min="1"
                  value={currentBooking.participants}
                  onChange={(e) => setCurrentBooking({...currentBooking, participants: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input 
                  id="edit-notes" 
                  value={currentBooking.notes}
                  onChange={(e) => setCurrentBooking({...currentBooking, notes: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-terracotta-600 hover:bg-terracotta-700"
              onClick={handleUpdateStatus}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Booking Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Booking</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this booking? This action cannot be undone.</p>
          {currentBooking && (
            <div className="mt-4 p-4 border rounded-md">
              <p><strong>ID:</strong> {currentBooking.id}</p>
              <p><strong>Customer:</strong> {currentBooking.customer}</p>
              <p><strong>Tour:</strong> {currentBooking.tourName}</p>
              <p><strong>Date:</strong> {currentBooking.date}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteBooking}
            >
              Delete Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;


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
import { Textarea } from '@/components/ui/textarea';
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
  MessageSquare, 
  Trash2, 
  Edit, 
  Star,
  ThumbsUp,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

// Mock review data
const mockReviews = [
  {
    id: 1,
    author: 'John Doe',
    email: 'john@example.com',
    rating: 5,
    content: 'Amazing experience! The quad bikes were in excellent condition and the guide was very knowledgeable. Would definitely recommend.',
    approved: true,
    date: '2023-04-15',
    tourName: 'Desert Adventure',
    likes: 12
  },
  {
    id: 2,
    author: 'Jane Smith',
    email: 'jane@example.com',
    rating: 4,
    content: 'Great tour overall. The views were spectacular. Only taking one star off because the safety briefing was a bit rushed.',
    approved: true,
    date: '2023-04-10',
    tourName: 'Mountain Trail',
    likes: 8
  },
  {
    id: 3,
    author: 'Mike Johnson',
    email: 'mike@example.com',
    rating: 3,
    content: 'The quad bikes were fun but our group was too large so we had to wait a lot. Would prefer a smaller group next time.',
    approved: true,
    date: '2023-04-05',
    tourName: 'Desert Adventure',
    likes: 3
  },
  {
    id: 4,
    author: 'Sarah Williams',
    email: 'sarah@example.com',
    rating: 5,
    content: 'Best experience in Morocco! The sunset tour was absolutely magical and our guide took some amazing photos for us.',
    approved: false,
    date: '2023-04-02',
    tourName: 'Sunset Tour',
    likes: 0
  },
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [approvalFilter, setApprovalFilter] = useState('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  // Filter reviews based on search query and approval status
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.tourName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesApproval = 
      approvalFilter === 'all' || 
      (approvalFilter === 'approved' && review.approved) || 
      (approvalFilter === 'pending' && !review.approved);
    
    return matchesSearch && matchesApproval;
  });
  
  // Update review approval status
  const handleApprovalToggle = (id: number) => {
    const updatedReviews = reviews.map(review => 
      review.id === id ? { ...review, approved: !review.approved } : review
    );
    
    setReviews(updatedReviews);
    toast.success(`Review ${updatedReviews.find(r => r.id === id)?.approved ? 'approved' : 'unapproved'} successfully!`);
  };
  
  // Update review content
  const handleUpdateReview = () => {
    const updatedReviews = reviews.map(review => 
      review.id === currentReview.id ? { ...currentReview } : review
    );
    
    setReviews(updatedReviews);
    setCurrentReview(null);
    setIsEditDialogOpen(false);
    toast.success('Review updated successfully!');
  };
  
  // Delete review
  const handleDeleteReview = () => {
    const updatedReviews = reviews.filter(review => review.id !== currentReview.id);
    setReviews(updatedReviews);
    setCurrentReview(null);
    setIsDeleteDialogOpen(false);
    toast.success('Review deleted successfully!');
  };
  
  // Reply to review
  const handleReplyToReview = () => {
    // In a real app, this would save the reply to the database
    toast.success('Reply posted successfully!');
    setReplyText('');
    setIsReplyDialogOpen(false);
  };
  
  // View review details
  const openViewDialog = (review: any) => {
    setCurrentReview(review);
    setIsViewDialogOpen(true);
  };
  
  // Open edit dialog
  const openEditDialog = (review: any) => {
    setCurrentReview(review);
    setIsEditDialogOpen(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (review: any) => {
    setCurrentReview(review);
    setIsDeleteDialogOpen(true);
  };
  
  // Open reply dialog
  const openReplyDialog = (review: any) => {
    setCurrentReview(review);
    setIsReplyDialogOpen(true);
  };
  
  // Render star rating
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Review Management</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage customer reviews and feedback</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>
            Moderate reviews and respond to customer feedback
          </CardDescription>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search reviews..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={approvalFilter} onValueChange={setApprovalFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter reviews" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="hidden md:table-cell">Tour</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.author}</TableCell>
                  <TableCell>{renderStarRating(review.rating)}</TableCell>
                  <TableCell className="hidden md:table-cell">{review.tourName}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      review.approved 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                    }`}>
                      {review.approved ? 'Approved' : 'Pending'}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{review.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openViewDialog(review)}
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">View</span>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApprovalToggle(review.id)}
                        className={`h-8 w-8 p-0 ${
                          review.approved 
                            ? 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                            : 'text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                        }`}
                      >
                        <span className="sr-only">Toggle Approval</span>
                        {review.approved ? <ThumbsUp className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(review)}
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Edit</span>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(review)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <span className="sr-only">Delete</span>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredReviews.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No reviews found</h3>
              <p className="text-gray-500 mt-1">
                {searchQuery ? 'Try adjusting your search query' : 'No reviews match the selected filter'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* View Review Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {currentReview && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{currentReview.author}</h3>
                  <p className="text-sm text-gray-500">{currentReview.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  currentReview.approved 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                }`}>
                  {currentReview.approved ? 'Approved' : 'Pending'}
                </span>
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  {renderStarRating(currentReview.rating)}
                  <span className="text-sm text-gray-500">{currentReview.date}</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Tour: {currentReview.tourName}</p>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p>{currentReview.content}</p>
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                  <ThumbsUp className="h-4 w-4" /> {currentReview.likes} likes
                </div>
              </div>
              
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                <Button
                  variant={currentReview.approved ? "destructive" : "outline"}
                  className={currentReview.approved ? "" : "bg-green-600 text-white hover:bg-green-700"}
                  onClick={() => {
                    handleApprovalToggle(currentReview.id);
                    setIsViewDialogOpen(false);
                  }}
                >
                  {currentReview.approved ? 'Unapprove' : 'Approve'}
                </Button>
                <Button 
                  className="bg-terracotta-600 hover:bg-terracotta-700"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    openReplyDialog(currentReview);
                  }}
                >
                  Reply
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Review Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          {currentReview && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-author">Author</Label>
                <Input 
                  id="edit-author" 
                  value={currentReview.author}
                  onChange={(e) => setCurrentReview({...currentReview, author: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-rating">Rating</Label>
                <Select 
                  value={currentReview.rating.toString()}
                  onValueChange={(value) => setCurrentReview({...currentReview, rating: parseInt(value)})}
                >
                  <SelectTrigger id="edit-rating">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-content">Review Content</Label>
                <Textarea 
                  id="edit-content" 
                  rows={5}
                  value={currentReview.content}
                  onChange={(e) => setCurrentReview({...currentReview, content: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Approval Status</Label>
                <Select 
                  value={currentReview.approved ? "approved" : "pending"}
                  onValueChange={(value) => setCurrentReview({...currentReview, approved: value === "approved"})}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending Approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-terracotta-600 hover:bg-terracotta-700"
              onClick={handleUpdateReview}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Review Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this review? This action cannot be undone.</p>
          {currentReview && (
            <div className="mt-4 p-4 border rounded-md">
              <div className="flex justify-between">
                <p><strong>Author:</strong> {currentReview.author}</p>
                <div>{renderStarRating(currentReview.rating)}</div>
              </div>
              <p className="mt-2"><strong>Content:</strong> {currentReview.content}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteReview}
            >
              Delete Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reply to Review Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Review</DialogTitle>
          </DialogHeader>
          {currentReview && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="font-medium">{currentReview.author} wrote:</p>
                <p className="mt-1 italic">{currentReview.content}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply-text">Your Reply</Label>
                <Textarea 
                  id="reply-text" 
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response here..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-terracotta-600 hover:bg-terracotta-700"
              onClick={handleReplyToReview}
              disabled={!replyText.trim()}
            >
              Post Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReviews;

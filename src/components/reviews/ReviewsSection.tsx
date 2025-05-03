import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ThumbsUp, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
    location?: string;
  };
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful?: number;
  quadModel?: string;
  verified?: boolean;
  replies?: Reply[];
}

interface Reply {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isStaff?: boolean;
  };
  comment: string;
  date: string;
}

interface ReviewsSectionProps {
  reviews?: Review[];
  className?: string;
  allowFiltering?: boolean;
  allowAddReview?: boolean;
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      location: 'United Kingdom'
    },
    rating: 5,
    title: 'Amazing desert adventure!',
    comment: 'We had the most incredible experience exploring the desert on these quad bikes. The equipment was top notch and felt very safe. Our guide Mohammed was knowledgeable and made sure we had an unforgettable time. Would definitely recommend!',
    date: '2024-04-15',
    helpful: 12,
    quadModel: 'Adventure Sport',
    verified: true
  },
  {
    id: '2',
    author: {
      name: 'David Chen',
      location: 'Canada'
    },
    rating: 4,
    title: 'Great fun for the whole family',
    comment: 'We took the family tandem quads and had a blast with our kids. They loved the experience of riding through the dunes. Only giving 4 stars because the pickup from our hotel was a bit delayed, but otherwise a perfect day.',
    date: '2024-04-02',
    helpful: 8,
    quadModel: 'Family Tandem',
    verified: true
  },
  {
    id: '3',
    author: {
      name: 'Emma Taylor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      location: 'Australia'
    },
    rating: 5,
    title: 'Highlight of our Morocco trip',
    comment: 'This quad biking tour was the highlight of our entire Morocco vacation! The Desert Explorer quad was perfect for the terrain, and the sunset tour gave us breathtaking views of the dunes. The staff was incredibly friendly and professional.',
    date: '2024-03-28',
    helpful: 21,
    quadModel: 'Desert Explorer',
    verified: true,
    replies: [
      {
        id: 'r1',
        author: {
          name: 'Morocco Adventures Team',
          isStaff: true
        },
        comment: 'Thank you for your wonderful review, Emma! We\'re thrilled that you enjoyed your quad biking experience with us. The sunset tour is indeed one of our most popular options. We hope to welcome you back for another adventure soon!',
        date: '2024-03-29'
      }
    ]
  },
  {
    id: '4',
    author: {
      name: 'Michael Rodriguez',
      location: 'United States'
    },
    rating: 3,
    title: 'Good experience but needs improvements',
    comment: 'The quad bikes were in good condition and the route was exciting. However, our group was too large which meant less personal attention from the guides. Also, the safety briefing felt rushed. Still a fun experience overall, but there\'s room for improvement.',
    date: '2024-03-15',
    helpful: 5,
    quadModel: 'Mountain Climber',
    verified: true,
    replies: [
      {
        id: 'r2',
        author: {
          name: 'Morocco Adventures Team',
          isStaff: true
        },
        comment: 'Thank you for your feedback, Michael. We appreciate your honest review and will work on limiting our group sizes and improving our safety briefings. Customer safety is our top priority, and we'll make sure to address these issues for future tours.',
        date: '2024-03-16'
      }
    ]
  },
  {
    id: '5',
    author: {
      name: 'Sophia Nakamura',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      location: 'Japan'
    },
    rating: 5,
    title: 'Unforgettable experience in the desert',
    comment: 'The quad biking tour exceeded all expectations! The Adventure Sport quad was powerful and handled the dunes perfectly. Our guide took us to some amazing spots for photos, and we even saw a beautiful sunset over the desert. Highly recommend this experience!',
    date: '2024-02-28',
    helpful: 15,
    quadModel: 'Adventure Sport',
    verified: true
  }
];

const StarRating: React.FC<{ rating: number; size?: number; editable?: boolean; onChange?: (rating: number) => void }> = ({ 
  rating, 
  size = 16, 
  editable = false,
  onChange
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div 
          key={star}
          className={`${editable ? 'cursor-pointer' : ''} px-0.5`}
          onClick={() => {
            if (editable && onChange) {
              onChange(star);
            }
          }}
          onMouseEnter={() => {
            if (editable) setHoverRating(star);
          }}
          onMouseLeave={() => {
            if (editable) setHoverRating(0);
          }}
        >
          <Star
            fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
            className={`${size === 16 ? 'h-4 w-4' : size === 24 ? 'h-6 w-6' : 'h-5 w-5'} ${(hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        </div>
      ))}
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review; onHelpfulClick?: (id: string) => void }> = ({ 
  review,
  onHelpfulClick 
}) => {
  const [showReplies, setShowReplies] = useState(false);
  
  return (
    <motion.div 
      className="bg-white dark:bg-sand-800 rounded-lg shadow-md p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={review.author.avatar} alt={review.author.name} />
            <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h4 className="font-semibold">{review.author.name}</h4>
              {review.verified && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
              <span>{review.author.location}</span>
              <span>•</span>
              <span>{review.date}</span>
              {review.quadModel && (
                <>
                  <span>•</span>
                  <span>Quad: {review.quadModel}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      
      <h3 className="font-bold mb-2">{review.title}</h3>
      
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center space-x-1"
          onClick={() => onHelpfulClick && onHelpfulClick(review.id)}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>Helpful ({review.helpful || 0})</span>
        </Button>
        
        {review.replies && review.replies.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center"
            onClick={() => setShowReplies(!showReplies)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{showReplies ? 'Hide replies' : 'Show replies'} ({review.replies.length})</span>
          </Button>
        )}
      </div>
      
      <AnimatePresence>
        {showReplies && review.replies && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 ml-10 border-l-2 border-gray-200 dark:border-gray-700 pl-4"
          >
            {review.replies.map(reply => (
              <div key={reply.id} className="mb-3 last:mb-0">
                <div className="flex items-center mb-2">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={reply.author.avatar} />
                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{reply.author.name}</span>
                      {reply.author.isStaff && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full">
                          Staff
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{reply.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{reply.comment}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews = sampleReviews,
  className = '',
  allowFiltering = true,
  allowAddReview = true
}) => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<number | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    name: '',
    email: '',
    quadModel: '',
  });
  
  // Filter reviews based on rating
  const filteredReviews = filter 
    ? reviews.filter(review => review.rating === filter)
    : reviews;
  
  const averageRating = reviews.length 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;
    
  // Count reviews by rating
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: Math.round((reviews.filter(review => review.rating === rating).length / reviews.length) * 100) || 0
  }));
  
  const handleHelpfulClick = (id: string) => {
    // In a real app, this would call an API to update the helpful count
    toast({
      title: "Thank you for your feedback",
      description: "You marked this review as helpful"
    });
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to submit the review
    toast({
      title: "Review submitted",
      description: "Thank you for your review! It will be published after moderation."
    });
    setReviewDialogOpen(false);
  };
  
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Reviews summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-sand-800 rounded-lg shadow-md p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold mb-1">{averageRating.toFixed(1)}/5</h3>
              <div className="flex justify-center mb-1">
                <StarRating rating={Math.round(averageRating)} />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Based on {reviews.length} reviews</p>
            </div>
            
            <div className="space-y-2">
              {ratingCounts.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center">
                  <span className="w-12 text-sm">{rating} stars</span>
                  <div className="flex-grow mx-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400"
                      style={{ width: `${percentage}%` }} 
                    />
                  </div>
                  <span className="w-8 text-sm text-right">{count}</span>
                </div>
              ))}
            </div>
            
            {allowAddReview && (
              <div className="mt-6">
                <Button 
                  className="w-full bg-terracotta-500 hover:bg-terracotta-600"
                  onClick={() => setReviewDialogOpen(true)}
                >
                  Write a Review
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Reviews list */}
        <div className="lg:col-span-3">
          {allowFiltering && (
            <div className="mb-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger 
                    value="all" 
                    onClick={() => setFilter(null)}
                  >
                    All Reviews
                  </TabsTrigger>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <TabsTrigger 
                      key={rating}
                      value={`${rating}`}
                      onClick={() => setFilter(rating)}
                    >
                      {rating} Star
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}
          
          {filteredReviews.length > 0 ? (
            <div>
              {filteredReviews.map(review => (
                <ReviewCard 
                  key={review.id} 
                  review={review}
                  onHelpfulClick={handleHelpfulClick}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-sand-800 rounded-lg shadow-md p-6 text-center">
              <Quote className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No reviews with this rating yet.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Review dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience to help others make better decisions.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitReview}>
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center">
                <p className="mb-2">Your overall rating</p>
                <StarRating 
                  rating={newReview.rating} 
                  size={24} 
                  editable={true}
                  onChange={(rating) => setNewReview({...newReview, rating})}
                />
              </div>
              
              <div>
                <Label htmlFor="review-title">Review Title</Label>
                <Input
                  id="review-title"
                  placeholder="Summarize your experience"
                  value={newReview.title}
                  onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="review-comment">Your Review</Label>
                <Textarea
                  id="review-comment"
                  placeholder="What did you like or dislike? What was your experience with the quad bikes?"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="review-name">Name</Label>
                <Input
                  id="review-name"
                  placeholder="Your name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="review-email">Email</Label>
                <Input
                  id="review-email"
                  type="email"
                  placeholder="Your email (will not be published)"
                  value={newReview.email}
                  onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="review-quad">Quad bike model (optional)</Label>
                <Input
                  id="review-quad"
                  placeholder="Which quad bike did you use?"
                  value={newReview.quadModel}
                  onChange={(e) => setNewReview({...newReview, quadModel: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Review</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsSection;

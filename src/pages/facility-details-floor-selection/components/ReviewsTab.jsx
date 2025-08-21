import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewsTab = ({ facility }) => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const ratingFilters = [
    { value: 'all', label: 'All Reviews' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 5,
      date: "2025-01-15",
      comment: "Excellent parking facility! Very clean, well-lit, and secure. The staff is friendly and helpful. The location is perfect for downtown shopping.",
      helpful: 12,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"
      ]
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 4,
      date: "2025-01-12",
      comment: "Good parking facility with reasonable rates. The only downside is that it can get quite busy during peak hours. Overall, I'd recommend it.",
      helpful: 8,
      images: []
    },
    {
      id: 3,
      user: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      date: "2025-01-10",
      comment: "Love this place! Easy booking through the app, great security, and the EV charging stations are a huge plus. Will definitely use again.",
      helpful: 15,
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300"
      ]
    },
    {
      id: 4,
      user: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 3,
      date: "2025-01-08",
      comment: "Decent parking facility but could use better signage. Took me a while to find my reserved spot. The price is fair though.",
      helpful: 5,
      images: []
    },
    {
      id: 5,
      user: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      rating: 5,
      date: "2025-01-05",
      comment: "Fantastic experience! The facility is modern, clean, and very secure. The valet service is excellent and saves so much time. Highly recommended!",
      helpful: 20,
      images: [
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=300",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"
      ]
    }
  ];

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars?.push(
        <Icon
          key={i}
          name="Star"
          size={16}
          className={i <= rating ? 'text-warning fill-current' : 'text-muted-foreground'}
        />
      );
    }
    return stars;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 45, 4: 25, 3: 15, 2: 8, 1: 7 };
    const total = Object.values(distribution)?.reduce((sum, count) => sum + count, 0);
    
    return Object.entries(distribution)?.reverse()?.map(([rating, count]) => ({
      rating: parseInt(rating),
      count,
      percentage: (count / total) * 100
    }));
  };

  const filteredReviews = selectedRating === 'all' 
    ? reviews 
    : reviews?.filter(review => review?.rating === parseInt(selectedRating));

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews?.slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="bg-muted p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">{facility?.rating}</div>
            <div className="flex justify-center gap-1 mb-2">
              {getRatingStars(Math.floor(facility?.rating))}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {facility?.reviewCount} reviews
            </div>
          </div>
          
          <div className="space-y-2">
            {getRatingDistribution()?.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm text-foreground">{rating}</span>
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                </div>
                <div className="flex-1 bg-border rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-muted-foreground w-8">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Rating Filters */}
      <div>
        <div className="flex flex-wrap gap-2">
          {ratingFilters?.map((filter) => (
            <Button
              key={filter?.value}
              variant={selectedRating === filter?.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedRating(filter?.value)}
            >
              {filter?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="bg-card border border-border p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <Image
                src={review?.avatar}
                alt={review?.user}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-foreground">{review?.user}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(review?.date)}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {getRatingStars(review?.rating)}
                  </div>
                </div>
                
                <p className="text-foreground mb-4">{review?.comment}</p>
                
                {/* Review Images */}
                {review?.images?.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {review?.images?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" iconName="ThumbsUp" iconPosition="left">
                    Helpful ({review?.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      {filteredReviews?.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less' : `Show All ${filteredReviews?.length} Reviews`}
          </Button>
        </div>
      )}
      {/* Write Review Section */}
      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-4">Share Your Experience</h3>
        <p className="text-muted-foreground mb-4">
          Help other users by sharing your experience with this parking facility.
        </p>
        <Button variant="primary" iconName="Edit" iconPosition="left">
          Write a Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewsTab;
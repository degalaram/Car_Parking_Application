import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type }) => {
  const navigate = useNavigate();

  const getEmptyStateContent = () => {
    switch (type) {
      case 'active':
        return {
          icon: 'Clock',
          title: 'No Active Bookings',
          description: 'You don\'t have any active parking reservations at the moment.',
          actionText: 'Book a Slot',
          actionIcon: 'Plus'
        };
      case 'upcoming':
        return {
          icon: 'Calendar',
          title: 'No Upcoming Bookings',
          description: 'Plan ahead and book your next parking spot to avoid last-minute hassles.',
          actionText: 'Schedule Booking',
          actionIcon: 'CalendarPlus'
        };
      case 'completed':
        return {
          icon: 'CheckCircle',
          title: 'No Completed Bookings',
          description: 'Your booking history will appear here once you complete your first reservation.',
          actionText: 'Start Parking',
          actionIcon: 'Car'
        };
      default:
        return {
          icon: 'Search',
          title: 'No Bookings Found',
          description: 'Try adjusting your search criteria or create a new booking.',
          actionText: 'New Booking',
          actionIcon: 'Plus'
        };
    }
  };

  const content = getEmptyStateContent();

  const handleAction = () => {
    navigate('/location-search-map');
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name={content?.icon} size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {content?.title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {content?.description}
      </p>
      <Button
        variant="primary"
        onClick={handleAction}
        iconName={content?.actionIcon}
        iconPosition="left"
      >
        {content?.actionText}
      </Button>
    </div>
  );
};

export default EmptyState;
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const BookingFloatingActions = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const isOnFacilityPage = location?.pathname === '/facility-details-floor-selection';
  const isOnSearchPage = location?.pathname === '/location-search-map';

  // Don't show on booking flow pages
  if (location?.pathname === '/slot-selection-booking' || 
      location?.pathname === '/booking-confirmation-payment' ||
      location?.pathname === '/my-bookings-dashboard' ||
      location?.pathname === '/user-authentication') {
    return null;
  }

  const handleQuickBook = () => {
    if (isOnFacilityPage) {
      navigate('/slot-selection-booking');
    } else {
      // From search page, navigate to a sample facility
      navigate('/facility-details-floor-selection');
    }
  };

  const handleViewBookings = () => {
    navigate('/my-bookings-dashboard');
  };

  const handleFindNearby = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          navigate('/location-search-map', {
            state: {
              userLocation: {
                lat: position?.coords?.latitude,
                lng: position?.coords?.longitude
              },
              searchNearby: true
            }
          });
        },
        (error) => {
          console.error('Location access denied:', error);
          navigate('/location-search-map');
        }
      );
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed bottom-20 lg:bottom-6 right-4 z-90 ${className}`}>
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="mb-4 space-y-3 animate-slide-up">
          {!isOnSearchPage && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleFindNearby}
              iconName="MapPin"
              iconPosition="left"
              className="shadow-lg hover:shadow-xl transition-all duration-200 w-full justify-start"
            >
              Find Nearby
            </Button>
          )}
          
          <Button
            variant="secondary"
            size="sm"
            onClick={handleViewBookings}
            iconName="Calendar"
            iconPosition="left"
            className="shadow-lg hover:shadow-xl transition-all duration-200 w-full justify-start"
          >
            My Bookings
          </Button>
          
          {isOnFacilityPage && (
            <Button
              variant="success"
              size="sm"
              onClick={handleQuickBook}
              iconName="Clock"
              iconPosition="left"
              className="shadow-lg hover:shadow-xl transition-all duration-200 w-full justify-start"
            >
              Quick Book
            </Button>
          )}
        </div>
      )}

      {/* Main FAB */}
      <Button
        variant="primary"
        size="lg"
        onClick={isOnFacilityPage ? handleQuickBook : toggleExpanded}
        className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <Icon 
          name={isOnFacilityPage ? "Plus" : isExpanded ? "X" : "Plus"} 
          size={24} 
          className="text-primary-foreground"
        />
      </Button>

      {/* Quick Action Hint */}
      {!isExpanded && !isOnFacilityPage && (
        <div className="absolute -top-12 right-0 bg-popover text-popover-foreground px-3 py-1 rounded-lg text-sm shadow-md whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Quick Actions
        </div>
      )}
    </div>
  );
};

export default BookingFloatingActions;
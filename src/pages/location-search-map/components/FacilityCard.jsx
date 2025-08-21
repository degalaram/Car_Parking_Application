import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const FacilityCard = ({ facility, className = '' }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/facility-details-floor-selection', {
      state: { facility }
    });
  };

  const handleQuickBook = () => {
    navigate('/slot-selection-booking', {
      state: { facility }
    });
  };

  const getAvailabilityStatus = () => {
    const ratio = facility?.availableSlots / facility?.totalSlots;
    if (ratio > 0.6) return { color: 'text-success', text: 'Good availability' };
    if (ratio > 0.3) return { color: 'text-warning', text: 'Limited spots' };
    return { color: 'text-destructive', text: 'Almost full' };
  };

  const getDistanceText = (distance) => {
    if (distance < 1) return `${Math.round(distance * 1000)}m away`;
    return `${distance?.toFixed(1)} miles away`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < Math.floor(rating) ? "Star" : "Star"}
        size={12}
        className={i < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const availabilityStatus = getAvailabilityStatus();

  return (
    <div className={`bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${className}`}>
      <div className="flex gap-4">
        {/* Facility Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
            <Image
              src={facility?.image}
              alt={facility?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Facility Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{facility?.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{facility?.address}</p>
            </div>
            <div className="flex-shrink-0 ml-2">
              <div className="text-right">
                <div className="font-semibold text-foreground">₹{facility?.hourlyRate}/hr</div>
                {facility?.originalRate && facility?.originalRate > facility?.hourlyRate && (
                  <div className="text-xs text-muted-foreground line-through">
                    ₹{facility?.originalRate}/hr
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Distance and Rating */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span>{getDistanceText(facility?.distance)}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex">{renderStars(facility?.rating)}</div>
              <span className="text-sm text-muted-foreground">
                {facility?.rating} ({facility?.reviewCount})
              </span>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`text-sm font-medium ${availabilityStatus?.color}`}>
                {facility?.availableSlots}/{facility?.totalSlots} available
              </div>
              <span className="text-xs text-muted-foreground">
                • {availabilityStatus?.text}
              </span>
            </div>
          </div>

          {/* Amenities */}
          {facility?.amenities && facility?.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {facility?.amenities?.slice(0, 3)?.map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                >
                  {amenity === 'covered' && <Icon name="Umbrella" size={10} />}
                  {amenity === 'security' && <Icon name="Shield" size={10} />}
                  {amenity === 'ev_charging' && <Icon name="Zap" size={10} />}
                  {amenity === 'valet' && <Icon name="User" size={10} />}
                  {amenity === 'handicap' && <Icon name="Accessibility" size={10} />}
                  <span className="capitalize">{amenity?.replace('_', ' ')}</span>
                </span>
              ))}
              {facility?.amenities?.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{facility?.amenities?.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewDetails}
              className="flex-1"
            >
              View Details
            </Button>
            {facility?.availableSlots > 0 && (
              <Button
                variant="default"
                size="sm"
                onClick={handleQuickBook}
                className="flex-1"
              >
                Quick Book
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Special Offers */}
      {facility?.discount && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Tag" size={14} className="text-success" />
            <span className="text-success font-medium">
              {facility?.discount}% off for bookings over 2 hours
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityCard;
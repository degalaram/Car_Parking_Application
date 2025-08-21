import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FacilityHero = ({ facility, onBookNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === facility?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? facility?.images?.length - 1 : prev - 1
    );
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={16} className="text-warning fill-current" />);
    }

    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={16} className="text-warning fill-current" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={16} className="text-muted-foreground" />);
    }

    return stars;
  };

  return (
    <div className="bg-card">
      {/* Image Carousel */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={facility?.images?.[currentImageIndex]}
          alt={`${facility?.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {facility?.images?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Image Indicators */}
        {facility?.images?.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {facility?.images?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            facility?.isOpen ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
          }`}>
            {facility?.isOpen ? 'Open Now' : 'Closed'}
          </div>
        </div>
      </div>
      {/* Facility Information */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2">{facility?.name}</h1>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Icon name="MapPin" size={16} />
              <span className="text-sm">{facility?.address}</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {getRatingStars(facility?.rating)}
                <span className="text-sm font-medium ml-1">{facility?.rating}</span>
                <span className="text-sm text-muted-foreground">({facility?.reviewCount} reviews)</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>{facility?.distance}</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-foreground">{facility?.totalSlots}</div>
                <div className="text-sm text-muted-foreground">Total Slots</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-success">{facility?.availableSlots}</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">₹{facility?.hourlyRate}</div>
                <div className="text-sm text-muted-foreground">Per Hour</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:w-64">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Starting from</div>
              <div className="text-2xl font-bold text-foreground mb-1">₹{facility?.hourlyRate}/hour</div>
              <div className="text-sm text-success mb-4">Save up to 20% with advance booking</div>
              
              <Button
                variant="primary"
                fullWidth
                onClick={onBookNow}
                iconName="Calendar"
                iconPosition="left"
              >
                Book Now
              </Button>
              
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" fullWidth iconName="Heart">
                  Save
                </Button>
                <Button variant="outline" size="sm" fullWidth iconName="Share">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityHero;
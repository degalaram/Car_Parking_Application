import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlternativeSlotSuggestions = ({ 
  selectedSlot,
  vehicleType,
  dateTime,
  onSlotSelect,
  className = '' 
}) => {
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  // Mock alternative slot suggestions
  const generateAlternativeSlots = () => {
    const alternatives = [
      {
        id: '1-A-14',
        floorId: 1,
        row: 'A',
        slotNumber: 14,
        location: '1st Floor A Row 14th Parking Slot',
        status: 'available',
        walkingDistance: 75,
        priceDifference: 0,
        availableNow: true,
        amenities: ['CCTV', 'Lighting'],
        checkoutPrediction: null,
        reason: 'Same floor, closer to entrance'
      },
      {
        id: '1-B-5',
        floorId: 1,
        row: 'B',
        slotNumber: 5,
        location: '1st Floor B Row 5th Parking Slot',
        status: 'ending-soon',
        walkingDistance: 120,
        priceDifference: -5,
        availableNow: false,
        availableIn: new Date(Date.now() + 15 * 60000), // 15 minutes
        amenities: ['CCTV', 'Lighting', 'EV Charging'],
        checkoutPrediction: '15 minutes',
        reason: 'Premium amenities, slight discount'
      },
      {
        id: '2-A-8',
        floorId: 2,
        row: 'A',
        slotNumber: 8,
        location: '2nd Floor A Row 8th Parking Slot',
        status: 'available',
        walkingDistance: 95,
        priceDifference: 3,
        availableNow: true,
        amenities: ['CCTV', 'Lighting'],
        checkoutPrediction: null,
        reason: 'One floor up, good availability'
      },
      {
        id: '1-C-22',
        floorId: 1,
        row: 'C',
        slotNumber: 22,
        location: '1st Floor C Row 22nd Parking Slot',
        status: 'available',
        walkingDistance: 140,
        priceDifference: -2,
        availableNow: true,
        amenities: ['CCTV'],
        checkoutPrediction: null,
        reason: 'Budget-friendly option'
      },
      {
        id: '3-A-12',
        floorId: 3,
        row: 'A',
        slotNumber: 12,
        location: '3rd Floor A Row 12th Parking Slot',
        status: 'available',
        walkingDistance: 110,
        priceDifference: -8,
        availableNow: true,
        amenities: ['CCTV', 'Lighting', 'EV Charging'],
        checkoutPrediction: null,
        reason: 'Best value with premium amenities'
      }
    ];

    // Filter based on vehicle compatibility
    return alternatives?.filter(slot => {
      if (vehicleType === 'two-wheeler') {
        return ['E', 'F']?.includes(slot?.row) || Math.random() > 0.5; // Mock compatibility
      }
      return ['A', 'B', 'C', 'D']?.includes(slot?.row) || Math.random() > 0.3;
    });
  };

  const [alternativeSlots] = useState(generateAlternativeSlots());

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(Math.abs(amount));
  };

  const getPriceDifferenceDisplay = (difference) => {
    if (difference === 0) return 'Same price';
    if (difference > 0) return `+${formatCurrency(difference)}`;
    return `-${formatCurrency(difference)}`;
  };

  const getPriceDifferenceColor = (difference) => {
    if (difference === 0) return 'text-muted-foreground';
    if (difference > 0) return 'text-destructive';
    return 'text-success';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'ending-soon': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'ending-soon': return 'Clock';
      default: return 'Circle';
    }
  };

  const handleSlotSelect = (slot) => {
    onSlotSelect({
      ...slot,
      vehicleType: vehicleType
    });
  };

  const displayedSlots = showAllSuggestions ? alternativeSlots : alternativeSlots?.slice(0, 3);

  if (alternativeSlots?.length === 0) {
    return null;
  }

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Lightbulb" size={24} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Alternative Suggestions</h3>
              <p className="text-sm text-muted-foreground">
                {alternativeSlots?.length} better options available
              </p>
            </div>
          </div>
          
          {alternativeSlots?.length > 3 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAllSuggestions(!showAllSuggestions)}
            >
              {showAllSuggestions ? 'Show Less' : `View All ${alternativeSlots?.length}`}
            </Button>
          )}
        </div>

        {/* Suggestions List */}
        <div className="space-y-3">
          {displayedSlots?.map((slot, index) => (
            <div
              key={slot?.id}
              className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer border border-transparent hover:border-primary/20"
              onClick={() => handleSlotSelect(slot)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{slot?.location}</h4>
                    <div className={`flex items-center gap-1 ${getStatusColor(slot?.status)}`}>
                      <Icon name={getStatusIcon(slot?.status)} size={14} />
                      <span className="text-xs font-medium capitalize">
                        {slot?.status?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {slot?.reason}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      <span>{slot?.walkingDistance}m walk</span>
                    </div>
                    
                    {slot?.amenities?.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={12} />
                        <span>{slot?.amenities?.length} amenities</span>
                      </div>
                    )}
                    
                    {slot?.checkoutPrediction && (
                      <div className="flex items-center gap-1 text-warning">
                        <Icon name="Clock" size={12} />
                        <span>Available in {slot?.checkoutPrediction}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-medium ${getPriceDifferenceColor(slot?.priceDifference)}`}>
                    {getPriceDifferenceDisplay(slot?.priceDifference)}
                  </div>
                  {slot?.priceDifference < 0 && (
                    <div className="text-xs text-success">Save money</div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              {slot?.amenities?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {slot?.amenities?.map((amenity, amenityIndex) => (
                    <span
                      key={amenityIndex}
                      className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {index === 0 && (
                    <div className="bg-success/10 text-success px-2 py-1 rounded text-xs font-medium">
                      Recommended
                    </div>
                  )}
                  {slot?.priceDifference < -5 && (
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      Best Value
                    </div>
                  )}
                  {slot?.availableNow && (
                    <div className="bg-success/10 text-success px-2 py-1 rounded text-xs font-medium">
                      Available Now
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleSlotSelect(slot);
                  }}
                >
                  Select
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Filters */}
        <div className="border-t border-border pt-4">
          <div className="text-sm font-medium text-foreground mb-2">Quick Filters</div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" iconName="DollarSign">
              Best Price
            </Button>
            <Button variant="outline" size="sm" iconName="MapPin">
              Closest
            </Button>
            <Button variant="outline" size="sm" iconName="Zap">
              Available Now
            </Button>
            <Button variant="outline" size="sm" iconName="Star">
              Premium
            </Button>
          </div>
        </div>

        {/* Comparison Note */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-primary mb-1">Smart Suggestions</div>
              <div className="text-primary/80">
                These alternatives are selected based on your vehicle type, preferred timing, and cost optimization. 
                Checkout predictions are based on historical data.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeSlotSuggestions;
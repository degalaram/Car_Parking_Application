import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SlotDetailsPanel = ({ 
  selectedSlot,
  vehicleInfo,
  dateTime,
  pricingInfo,
  onBookingToggle,
  isQuickBooking,
  onProceedToPayment,
  className = '' 
}) => {
  const [countdownTime, setCountdownTime] = useState(null);

  // Mock alternative slots
  const alternativeSlots = [
    {
      id: '1-A-14',
      location: '1st Floor A Row 14th Parking Slot',
      walkingDistance: 75,
      availableIn: null,
      status: 'available'
    },
    {
      id: '1-B-5',
      location: '1st Floor B Row 5th Parking Slot',
      walkingDistance: 120,
      availableIn: new Date(Date.now() + 15 * 60000), // 15 minutes
      status: 'ending-soon'
    },
    {
      id: '2-A-8',
      location: '2nd Floor A Row 8th Parking Slot',
      walkingDistance: 95,
      availableIn: null,
      status: 'available'
    }
  ];

  // Countdown timer for slots ending soon
  useEffect(() => {
    if (selectedSlot?.endTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const timeLeft = selectedSlot?.endTime - now;
        
        if (timeLeft > 0) {
          const minutes = Math.floor(timeLeft / 60000);
          const seconds = Math.floor((timeLeft % 60000) / 1000);
          setCountdownTime(`${minutes}:${seconds?.toString()?.padStart(2, '0')}`);
        } else {
          setCountdownTime('Available Now');
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCountdownTime(null);
    }
  }, [selectedSlot]);

  if (!selectedSlot) {
    return (
      <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
        <div className="text-center text-muted-foreground py-8">
          <Icon name="MapPin" size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Slot Selected</h3>
          <p>Choose a parking slot from the floor layout to see details</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'ending-soon': return 'text-warning';
      case 'reserved': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'ending-soon': return 'Clock';
      case 'reserved': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Slot Details
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedSlot?.location}
            </p>
          </div>
          <div className={`flex items-center gap-2 ${getStatusColor(selectedSlot?.status)}`}>
            <Icon name={getStatusIcon(selectedSlot?.status)} size={20} />
            <span className="text-sm font-medium capitalize">
              {selectedSlot?.status?.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Countdown Timer */}
        {countdownTime && selectedSlot?.status === 'ending-soon' && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <div>
                <div className="font-medium text-warning">Available in</div>
                <div className="text-lg font-mono text-warning">{countdownTime}</div>
              </div>
            </div>
          </div>
        )}

        {/* Slot Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/20 rounded-lg p-3">
              <div className="text-muted-foreground text-sm mb-1">Walking Distance</div>
              <div className="font-medium text-foreground">
                {selectedSlot?.walkingDistance}m
              </div>
            </div>
            <div className="bg-muted/20 rounded-lg p-3">
              <div className="text-muted-foreground text-sm mb-1">Floor Level</div>
              <div className="font-medium text-foreground">
                {selectedSlot?.floorId === 1 ? '1st' : selectedSlot?.floorId === 2 ? '2nd' : '3rd'} Floor
              </div>
            </div>
          </div>

          {/* Amenities */}
          {selectedSlot?.amenities && selectedSlot?.amenities?.length > 0 && (
            <div>
              <div className="text-sm font-medium text-foreground mb-2">Available Amenities</div>
              <div className="flex flex-wrap gap-2">
                {selectedSlot?.amenities?.map((amenity, index) => (
                  <div key={index} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vehicle Compatibility */}
          {vehicleInfo && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="font-medium text-success">Vehicle Compatible</span>
              </div>
              <div className="text-sm text-success/80">
                Perfect fit for {vehicleInfo?.name} ({vehicleInfo?.dimensions})
              </div>
            </div>
          )}

          {/* Booking Summary */}
          {dateTime && pricingInfo && (
            <div className="bg-muted/20 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span className="text-foreground">
                    {new Date(`${dateTime.date}T${dateTime.time}`)?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })} at {new Date(`${dateTime.date}T${dateTime.time}`)?.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-foreground">{dateTime?.duration} hours</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-medium text-foreground">Total Cost</span>
                  <span className="font-semibold text-primary">
                    {formatCurrency(pricingInfo?.totalCost)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Booking Toggle */}
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-medium text-foreground">Quick Booking</div>
              <div className="text-sm text-muted-foreground">
                Reserve immediately vs scheduled booking
              </div>
            </div>
            <Button
              variant={isQuickBooking ? 'default' : 'outline'}
              size="sm"
              onClick={onBookingToggle}
              iconName={isQuickBooking ? 'Zap' : 'Clock'}
            >
              {isQuickBooking ? 'Quick' : 'Scheduled'}
            </Button>
          </div>
          
          {isQuickBooking && (
            <div className="bg-primary/10 border border-primary/20 rounded p-2 text-xs text-primary">
              Slot will be reserved immediately upon payment confirmation
            </div>
          )}
        </div>

        {/* Alternative Slots */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Alternative Slots</h4>
          <div className="space-y-2">
            {alternativeSlots?.slice(0, 3)?.map((slot) => (
              <div key={slot?.id} className="bg-muted/20 rounded-lg p-3 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      {slot?.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {slot?.walkingDistance}m walk
                      {slot?.availableIn && (
                        <span className="ml-2 text-warning">
                          • Available in {Math.ceil((slot?.availableIn - new Date()) / 60000)} min
                        </span>
                      )}
                    </div>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Action Button */}
      <div className="p-6 pt-0">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          disabled={selectedSlot?.status === 'reserved' || selectedSlot?.status === 'maintenance'}
          onClick={onProceedToPayment}
        >
          {selectedSlot?.status === 'ending-soon' ? 'Reserve When Available' : 'Proceed to Payment'}
        </Button>
      </div>
    </div>
  );
};

export default SlotDetailsPanel;
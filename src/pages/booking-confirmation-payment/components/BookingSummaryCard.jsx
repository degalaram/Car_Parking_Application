import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BookingSummaryCard = ({ bookingData }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2025-01-01T${time}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Booking Summary</h3>
        <div className="flex items-center gap-2 text-success">
          <Icon name="CheckCircle" size={20} />
          <span className="text-sm font-medium">Confirmed</span>
        </div>
      </div>
      {/* Facility Information */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Building" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{bookingData?.facility?.name}</h4>
            <p className="text-sm text-muted-foreground">{bookingData?.facility?.address}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span>0.2 miles away</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span>4.8 (324 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Slot Details */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Parking Slot</span>
          <span className="text-sm font-semibold text-primary">{bookingData?.slot?.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-muted-foreground">Floor</span>
            <p className="text-sm font-medium text-foreground">{bookingData?.slot?.floor}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Row</span>
            <p className="text-sm font-medium text-foreground">{bookingData?.slot?.row}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Icon name="Car" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Suitable for {bookingData?.vehicle?.type}</span>
        </div>
      </div>
      {/* Vehicle Information */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Vehicle Details</h4>
        <div className="flex items-center gap-3">
          <div className="w-16 h-12 bg-muted rounded-lg overflow-hidden">
            <Image 
              src={bookingData?.vehicle?.image} 
              alt={bookingData?.vehicle?.model}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">{bookingData?.vehicle?.model}</p>
            <p className="text-sm text-muted-foreground">{bookingData?.vehicle?.type}</p>
          </div>
        </div>
      </div>
      {/* Date & Time */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Booking Period</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Check-in</span>
            </div>
            <div className="pl-6">
              <p className="text-sm text-foreground">{formatDate(bookingData?.checkIn?.date)}</p>
              <p className="text-sm text-muted-foreground">{formatTime(bookingData?.checkIn?.time)}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Check-out</span>
            </div>
            <div className="pl-6">
              <p className="text-sm text-foreground">{formatDate(bookingData?.checkOut?.date)}</p>
              <p className="text-sm text-muted-foreground">{formatTime(bookingData?.checkOut?.time)}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Total Duration</span>
          <span className="text-sm font-medium text-foreground">{bookingData?.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;
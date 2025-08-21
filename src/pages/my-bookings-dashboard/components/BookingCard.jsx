import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, onExtend, onCancel, onRate }) => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (booking?.status === 'active' && booking?.endTime) {
      const updateTimer = () => {
        const now = new Date();
        const end = new Date(booking.endTime);
        const diff = end - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeRemaining(`${hours}h ${minutes}m`);
        } else {
          setTimeRemaining('Expired');
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 60000);
      return () => clearInterval(interval);
    }
  }, [booking?.endTime, booking?.status]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'upcoming':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleGetDirections = () => {
    const { lat, lng } = booking?.facility?.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleViewQR = () => {
    // In a real app, this would show a QR code modal
    alert(`QR Code for booking ${booking?.id}`);
  };

  const handleRebook = () => {
    navigate('/facility-details-floor-selection', {
      state: { facilityId: booking?.facility?.id }
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{booking?.facility?.name}</h3>
          <p className="text-sm text-muted-foreground">{booking?.facility?.address}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking?.status)}`}>
              {booking?.status?.charAt(0)?.toUpperCase() + booking?.status?.slice(1)}
            </span>
            {booking?.status === 'active' && timeRemaining && (
              <span className="text-sm font-medium text-primary">
                {timeRemaining} left
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-foreground">${booking?.totalAmount}</p>
          <p className="text-xs text-muted-foreground">Booking #{booking?.id}</p>
        </div>
      </div>
      {/* Slot Details */}
      <div className="bg-muted rounded-lg p-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Slot Location</p>
            <p className="font-medium text-foreground">{booking?.slotLocation}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Vehicle</p>
            <p className="font-medium text-foreground">{booking?.vehicleType}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date & Time</p>
            <p className="font-medium text-foreground">
              {new Date(booking.startTime)?.toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(booking.startTime)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
              {new Date(booking.endTime)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="font-medium text-foreground">{booking?.duration}</p>
          </div>
        </div>
      </div>
      {/* Vehicle Image */}
      {booking?.vehicleImage && (
        <div className="flex justify-center">
          <div className="w-24 h-16 overflow-hidden rounded-lg">
            <Image
              src={booking?.vehicleImage}
              alt={booking?.vehicleType}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {booking?.status === 'active' && (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={handleViewQR}
              iconName="QrCode"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              QR Code
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExtend(booking?.id)}
              iconName="Clock"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Extend
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGetDirections}
              iconName="Navigation"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Directions
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onCancel(booking?.id)}
              iconName="X"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          </>
        )}

        {booking?.status === 'upcoming' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/slot-selection-booking', { state: { bookingId: booking?.id } })}
              iconName="Edit"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Modify
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGetDirections}
              iconName="Navigation"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Directions
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onCancel(booking?.id)}
              iconName="X"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          </>
        )}

        {booking?.status === 'completed' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRebook}
              iconName="RotateCcw"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Book Again
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(booking?.receiptUrl, '_blank')}
              iconName="Download"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Receipt
            </Button>
            {!booking?.rated && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onRate(booking?.id)}
                iconName="Star"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Rate
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
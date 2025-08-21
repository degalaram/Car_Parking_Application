import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmationButton = ({ 
  isValid, 
  totalAmount, 
  onConfirmBooking,
  disabled = false 
}) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirmBooking = async () => {
    if (!isValid || disabled) return;

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Call parent confirmation handler
      if (onConfirmBooking) {
        await onConfirmBooking();
      }
      
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Show success state briefly then navigate
      setTimeout(() => {
        navigate('/my-bookings-dashboard', { 
          state: { 
            bookingConfirmed: true,
            showSuccessMessage: true 
          } 
        });
      }, 2000);
      
    } catch (error) {
      setIsProcessing(false);
      console.error('Booking confirmation failed:', error);
    }
  };

  const getButtonContent = () => {
    if (isSuccess) {
      return (
        <>
          <Icon name="CheckCircle" size={20} className="text-success-foreground" />
          Booking Confirmed!
        </>
      );
    }
    
    if (isProcessing) {
      return (
        <>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} />
          </div>
          Processing Payment...
        </>
      );
    }
    
    return (
      <>
        <Icon name="CreditCard" size={20} />Confirm Booking - ${totalAmount?.toFixed(2)}
      </>
    );
  };

  const getButtonVariant = () => {
    if (isSuccess) return 'success';
    if (isProcessing) return 'secondary';
    return 'primary';
  };

  return (
    <div className="space-y-4">
      {/* Security Reminder */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground mb-1">Secure Payment Processing</h4>
            <p className="text-xs text-muted-foreground">
              Your payment information is encrypted and processed securely. 
              You will receive a confirmation email with your booking details and QR code.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Button */}
      <Button
        variant={getButtonVariant()}
        size="lg"
        fullWidth
        onClick={handleConfirmBooking}
        disabled={!isValid || disabled || isProcessing || isSuccess}
        loading={isProcessing}
        className="h-14 text-lg font-semibold"
      >
        {getButtonContent()}
      </Button>

      {/* Additional Information */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          By confirming this booking, you agree to our Terms of Service and Privacy Policy
        </p>
        
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={12} />
            <span>Instant confirmation</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Mail" size={12} />
            <span>Email receipt</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="QrCode" size={12} />
            <span>QR code access</span>
          </div>
        </div>
      </div>

      {/* Success Animation Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-100">
          <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Booking Confirmed!</h3>
              <p className="text-sm text-muted-foreground">
                Redirecting to your bookings dashboard...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmationButton;
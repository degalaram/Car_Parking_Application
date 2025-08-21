import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookingProgressHeader from '../../components/ui/BookingProgressHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import BookingFloatingActions from '../../components/ui/BookingFloatingActions';
import BookingSummaryCard from './components/BookingSummaryCard';
import PricingBreakdown from './components/PricingBreakdown';
import PaymentMethodSection from './components/PaymentMethodSection';
import BookingTermsSection from './components/BookingTermsSection';
import BookingConfirmationButton from './components/BookingConfirmationButton';

const BookingConfirmationPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card_1');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Mock booking data - in real app, this would come from previous booking steps
  const bookingData = {
    facility: {
      name: "Downtown Business Center",
      address: "123 Main Street, Downtown, NY 10001",
      rating: 4.8,
      reviews: 324
    },
    slot: {
      location: "1st Floor A Row 13th Parking Slot",
      floor: "1st Floor",
      row: "A Row",
      number: "13",
      type: "Standard"
    },
    vehicle: {
      type: "Four-wheeler Car",
      model: "Mahindra XUV700",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop"
    },
    checkIn: {
      date: "2025-01-20",
      time: "09:00"
    },
    checkOut: {
      date: "2025-01-20",
      time: "18:00"
    },
    duration: "9 hours"
  };

  const pricingData = {
    baseRate: 45.00,
    timeAdjustment: 5.00, // Peak hours surcharge
    vehicleFee: 0.00,
    discounts: [
      { name: "Early Bird Discount", amount: 7.50 },
      { name: "First Time User", amount: 5.00 }
    ],
    subtotal: 37.50,
    serviceFee: 2.50,
    tax: 3.20,
    taxRate: 8.5,
    total: 43.20,
    totalSavings: 12.50,
    duration: "9 hours"
  };

  // Validate form whenever payment method or terms change
  useEffect(() => {
    const isPaymentMethodSelected = selectedPaymentMethod !== '';
    const areTermsAccepted = termsAccepted;
    
    setIsFormValid(isPaymentMethodSelected && areTermsAccepted);
  }, [selectedPaymentMethod, termsAccepted]);

  // Redirect if no booking data (in real app, check for actual booking state)
  useEffect(() => {
    if (!location?.state && !bookingData) {
      navigate('/location-search-map');
    }
  }, [location?.state, navigate]);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleTermsAcceptance = (accepted) => {
    setTermsAccepted(accepted);
  };

  const handleConfirmBooking = async () => {
    // In real app, this would process the actual payment
    console.log('Processing booking confirmation...', {
      bookingData,
      pricingData,
      paymentMethod: selectedPaymentMethod,
      termsAccepted
    });
    
    try {
      // Simulate API call
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, bookingId: 'BK-' + Date.now() });
        }, 1000);
      });
      
      if (result.success) {
        setBookingId(result.bookingId);
        setShowSuccessPopup(true);
        
        // Store the new booking in localStorage
        const newBooking = {
          id: result.bookingId,
          facility: {
            id: 'fac-new',
            name: 'Downtown Business Center',
            address: '123 Main Street, Downtown, NY 10001',
            location: { lat: 40.7128, lng: -74.0060 }
          },
          slotLocation: '1st Floor A Row 13th Parking Slot',
          vehicleType: 'Mahindra XUV700',
          vehicleImage: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop',
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          duration: '4 Hours',
          totalAmount: 43.20,
          status: 'active',
          receiptUrl: '#'
        };
        
        // Get existing bookings and add new one
        const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const updatedBookings = [newBooking, ...existingBookings];
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
        
        // Auto-hide popup after 5 seconds and redirect to home
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/home');
        }, 5000);
      }
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Progress */}
      <BookingProgressHeader />
      {/* Main Content */}
      <main className="container-app py-6 pb-24 lg:pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Title - Mobile */}
          <div className="lg:hidden mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Confirm & Pay</h1>
            <p className="text-muted-foreground">Review your booking details and complete payment</p>
          </div>

          {/* Desktop Layout */}
          <div className="lg:grid lg:grid-cols-5 lg:gap-8">
            {/* Left Column - Booking Summary (Desktop) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Page Title - Desktop */}
              <div className="hidden lg:block">
                <h1 className="text-3xl font-bold text-foreground mb-2">Confirm & Pay</h1>
                <p className="text-muted-foreground">Review your booking details and complete payment</p>
              </div>

              <BookingSummaryCard bookingData={bookingData} />
              <PricingBreakdown pricingData={pricingData} />
            </div>

            {/* Right Column - Payment & Terms */}
            <div className="lg:col-span-3 space-y-6 mt-6 lg:mt-0">
              <PaymentMethodSection 
                onPaymentMethodChange={handlePaymentMethodChange}
                selectedMethod={selectedPaymentMethod}
              />
              
              <BookingTermsSection 
                onTermsAcceptance={handleTermsAcceptance}
                termsAccepted={termsAccepted}
              />
              
              <BookingConfirmationButton 
                isValid={isFormValid}
                totalAmount={pricingData?.total}
                onConfirmBooking={handleConfirmBooking}
              />
            </div>
          </div>

          {/* Mobile Layout - Summary Cards */}
          <div className="lg:hidden space-y-6">
            <BookingSummaryCard bookingData={bookingData} />
            <PricingBreakdown pricingData={pricingData} />
            <PaymentMethodSection 
              onPaymentMethodChange={handlePaymentMethodChange}
              selectedMethod={selectedPaymentMethod}
            />
            <BookingTermsSection 
              onTermsAcceptance={handleTermsAcceptance}
              termsAccepted={termsAccepted}
            />
            <BookingConfirmationButton 
              isValid={isFormValid}
              totalAmount={pricingData?.total}
              onConfirmBooking={handleConfirmBooking}
            />
          </div>
        </div>
      </main>
      {/* Navigation */}
      <BottomTabNavigation />
      <BookingFloatingActions />

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={40} className="text-success" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              🎉 Parking Slot Booked Successfully!
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-muted/20 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Booking ID</div>
                <div className="font-mono font-semibold text-foreground">{bookingId}</div>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Location</div>
                <div className="font-medium text-foreground">{bookingData.slot.location}</div>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Duration</div>
                <div className="font-medium text-foreground">{bookingData.duration}</div>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              You will receive a confirmation email shortly. 
              Please arrive 5 minutes before your scheduled time.
            </p>
            
            <Button
              onClick={() => {
                setShowSuccessPopup(false);
                navigate('/home');
              }}
              className="w-full"
              size="lg"
            >
              Go to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmationPayment;
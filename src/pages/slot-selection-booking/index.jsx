import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingProgressHeader from '../../components/ui/BookingProgressHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import BookingFloatingActions from '../../components/ui/BookingFloatingActions';

// Import all components
import FloorLayoutVisualization from './components/FloorLayoutVisualization';
import VehicleSelector from './components/VehicleSelector';
import DateTimeSelector from './components/DateTimeSelector';
import PricingCalculator from './components/PricingCalculator';
import SlotDetailsPanel from './components/SlotDetailsPanel';
import AlternativeSlotSuggestions from './components/AlternativeSlotSuggestions';

const SlotSelectionBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State management
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState({
    id: 'car-1',
    name: 'Mahindra XUV700',
    type: 'four-wheeler',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    dimensions: '4.69m × 1.89m'
  });
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: new Date()?.toISOString()?.split('T')?.[0],
    time: '09:00',
    duration: 2
  });
  const [duration, setDuration] = useState(2);
  const [pricingInfo, setPricingInfo] = useState(null);
  const [isQuickBooking, setIsQuickBooking] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);

  // Get facility info from previous page
  const facilityInfo = location?.state?.facilityInfo || {
    name: 'Downtown Business Center',
    address: '123 Main Street, Downtown'
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowAlternatives(false);
  };

  // Handle vehicle change
  const handleVehicleChange = (vehicle) => {
    setSelectedVehicle(vehicle);
    // Reset slot selection when vehicle type changes
    if (selectedSlot && selectedSlot?.vehicleType !== vehicle?.type) {
      setSelectedSlot(null);
    }
  };

  // Handle date/time change
  const handleDateTimeChange = (dateTime) => {
    setSelectedDateTime(dateTime);
  };

  // Handle pricing update
  const handlePriceChange = (pricing) => {
    setPricingInfo(pricing);
  };

  // Handle booking toggle
  const handleBookingToggle = () => {
    setIsQuickBooking(!isQuickBooking);
  };

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (!selectedSlot || !pricingInfo) return;

    const bookingData = {
      facility: facilityInfo,
      slot: selectedSlot,
      vehicle: selectedVehicle,
      dateTime: selectedDateTime,
      pricing: pricingInfo,
      isQuickBooking
    };

    navigate('/booking-confirmation-payment', { state: { bookingData } });
  };

  // Show alternatives when slot becomes unavailable
  useEffect(() => {
    if (selectedSlot && selectedSlot?.status === 'reserved') {
      setShowAlternatives(true);
    }
  }, [selectedSlot]);

  // WebSocket simulation for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time slot status updates
      if (selectedSlot && Math.random() < 0.1) { // 10% chance of status change
        const newStatus = Math.random() < 0.5 ? 'available' : 'ending-soon';
        setSelectedSlot(prev => ({
          ...prev,
          status: newStatus,
          endTime: newStatus === 'ending-soon' ? new Date(Date.now() + Math.random() * 3600000) : null
        }));
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [selectedSlot]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <BookingProgressHeader />
      {/* Main Content */}
      <div className="container-app py-6 pb-24 lg:pb-6">
        {/* Facility Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Select Your Parking Slot
          </h1>
          <p className="text-muted-foreground">
            {facilityInfo?.name} • {facilityInfo?.address}
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Left Column - Floor Layout (70%) */}
          <div className="lg:col-span-8 space-y-6">
            <FloorLayoutVisualization
              selectedFloor={selectedFloor}
              onFloorChange={setSelectedFloor}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
              vehicleType={selectedVehicle?.type}
            />

            {/* Alternative Suggestions */}
            {showAlternatives && (
              <AlternativeSlotSuggestions
                selectedSlot={selectedSlot}
                vehicleType={selectedVehicle?.type}
                dateTime={selectedDateTime}
                onSlotSelect={handleSlotSelect}
              />
            )}
          </div>

          {/* Right Column - Controls (30%) */}
          <div className="lg:col-span-4 space-y-6">
            <VehicleSelector
              selectedVehicle={selectedVehicle}
              onVehicleChange={handleVehicleChange}
            />

            <DateTimeSelector
              selectedDateTime={selectedDateTime}
              onDateTimeChange={handleDateTimeChange}
              duration={duration}
              onDurationChange={setDuration}
            />

            <PricingCalculator
              selectedSlot={selectedSlot}
              vehicleType={selectedVehicle?.type}
              duration={duration}
              dateTime={selectedDateTime}
              onPriceChange={handlePriceChange}
            />

            <SlotDetailsPanel
              selectedSlot={selectedSlot}
              vehicleInfo={selectedVehicle}
              dateTime={selectedDateTime}
              pricingInfo={pricingInfo}
              onBookingToggle={handleBookingToggle}
              isQuickBooking={isQuickBooking}
              onProceedToPayment={handleProceedToPayment}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Vehicle Selection */}
          <VehicleSelector
            selectedVehicle={selectedVehicle}
            onVehicleChange={handleVehicleChange}
          />

          {/* Date & Time */}
          <DateTimeSelector
            selectedDateTime={selectedDateTime}
            onDateTimeChange={handleDateTimeChange}
            duration={duration}
            onDurationChange={setDuration}
          />

          {/* Floor Layout */}
          <FloorLayoutVisualization
            selectedFloor={selectedFloor}
            onFloorChange={setSelectedFloor}
            selectedSlot={selectedSlot}
            onSlotSelect={handleSlotSelect}
            vehicleType={selectedVehicle?.type}
          />

          {/* Slot Details */}
          {selectedSlot && (
            <SlotDetailsPanel
              selectedSlot={selectedSlot}
              vehicleInfo={selectedVehicle}
              dateTime={selectedDateTime}
              pricingInfo={pricingInfo}
              onBookingToggle={handleBookingToggle}
              isQuickBooking={isQuickBooking}
              onProceedToPayment={handleProceedToPayment}
            />
          )}

          {/* Pricing */}
          <PricingCalculator
            selectedSlot={selectedSlot}
            vehicleType={selectedVehicle?.type}
            duration={duration}
            dateTime={selectedDateTime}
            onPriceChange={handlePriceChange}
          />

          {/* Alternative Suggestions */}
          {showAlternatives && (
            <AlternativeSlotSuggestions
              selectedSlot={selectedSlot}
              vehicleType={selectedVehicle?.type}
              dateTime={selectedDateTime}
              onSlotSelect={handleSlotSelect}
            />
          )}
        </div>

        {/* Proceed Button - Mobile */}
        <div className="lg:hidden fixed bottom-20 left-4 right-4 z-50">
          <button
            onClick={handleProceedToPayment}
            disabled={!selectedSlot || !pricingInfo || selectedSlot?.status === 'reserved'}
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-medium text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            {!selectedSlot ? 'Select a Slot' : 
             selectedSlot?.status === 'reserved' ? 'Slot Unavailable' :
             pricingInfo ? `Proceed to Payment • ${new Intl.NumberFormat('en-IN', {
               style: 'currency',
               currency: 'INR',
               maximumFractionDigits: 0
             })?.format(pricingInfo?.totalCost)}` : 'Loading...'}
          </button>
        </div>
      </div>
      {/* Navigation */}
      <BottomTabNavigation />
      <BookingFloatingActions />
    </div>
  );
};

export default SlotSelectionBooking;
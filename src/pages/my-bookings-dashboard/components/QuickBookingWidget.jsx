import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuickBookingWidget = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  const locationOptions = [
    { value: 'downtown', label: 'Downtown Mall' },
    { value: 'airport', label: 'City Airport' },
    { value: 'office', label: 'Business District' },
    { value: 'hospital', label: 'General Hospital' },
    { value: 'university', label: 'State University' }
  ];

  const vehicleOptions = [
    { value: 'car', label: 'Car' },
    { value: 'bike', label: 'Motorcycle' },
    { value: 'suv', label: 'SUV' },
    { value: 'truck', label: 'Truck' }
  ];

  const durationOptions = [
    { value: '1', label: '1 Hour' },
    { value: '2', label: '2 Hours' },
    { value: '4', label: '4 Hours' },
    { value: '8', label: '8 Hours' },
    { value: '24', label: 'Full Day' }
  ];

  const handleQuickBook = () => {
    if (selectedLocation && selectedVehicle && selectedDuration) {
      navigate('/location-search-map', {
        state: {
          quickBook: true,
          location: selectedLocation,
          vehicle: selectedVehicle,
          duration: selectedDuration
        }
      });
    }
  };

  const isFormValid = selectedLocation && selectedVehicle && selectedDuration;

  return (
    <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 text-primary-foreground">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold">Quick Booking</h3>
          <p className="text-sm opacity-90">Book your next parking spot instantly</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            placeholder="Select location"
            options={locationOptions}
            value={selectedLocation}
            onChange={setSelectedLocation}
            className="bg-primary-foreground/10 border-primary-foreground/20"
          />
          <Select
            placeholder="Vehicle type"
            options={vehicleOptions}
            value={selectedVehicle}
            onChange={setSelectedVehicle}
            className="bg-primary-foreground/10 border-primary-foreground/20"
          />
          <Select
            placeholder="Duration"
            options={durationOptions}
            value={selectedDuration}
            onChange={setSelectedDuration}
            className="bg-primary-foreground/10 border-primary-foreground/20"
          />
        </div>

        <Button
          variant="secondary"
          onClick={handleQuickBook}
          disabled={!isFormValid}
          iconName="Search"
          iconPosition="left"
          className="w-full"
        >
          Find Available Slots
        </Button>
      </div>
    </div>
  );
};

export default QuickBookingWidget;
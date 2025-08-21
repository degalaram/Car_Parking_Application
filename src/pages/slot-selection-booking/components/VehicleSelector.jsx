import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Select from '../../../components/ui/Select';

const VehicleSelector = ({ 
  selectedVehicle, 
  onVehicleChange, 
  className = '' 
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // Mock vehicle data with different images for each type
  const vehicleOptions = [
    {
      value: 'two-wheeler',
      label: 'Two Wheeler',
      vehicles: [
        {
          id: 'bike-1',
          name: 'Honda Activa 6G',
          type: 'Scooter',
          image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
          dimensions: '1.83m × 0.68m'
        },
        {
          id: 'bike-2',
          name: 'Royal Enfield Classic',
          type: 'Motorcycle',
          image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
          dimensions: '2.16m × 0.80m'
        },
        {
          id: 'bike-3',
          name: 'Yamaha R15',
          type: 'Sports Bike',
          image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
          dimensions: '1.99m × 0.73m'
        },
        {
          id: 'bike-4',
          name: 'Bajaj Pulsar 150',
          type: 'Motorcycle',
          image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
          dimensions: '2.05m × 0.75m'
        },
        {
          id: 'bike-5',
          name: 'TVS Jupiter',
          type: 'Scooter',
          image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
          dimensions: '1.79m × 0.70m'
        },
        {
          id: 'bike-6',
          name: 'Hero Splendor Plus',
          type: 'Motorcycle',
          image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
          dimensions: '1.95m × 0.72m'
        },
        {
          id: 'bike-7',
          name: 'KTM Duke 200',
          type: 'Sports Bike',
          image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
          dimensions: '2.10m × 0.78m'
        },
        {
          id: 'bike-8',
          name: 'Suzuki Access 125',
          type: 'Scooter',
          image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
          dimensions: '1.81m × 0.69m'
        }
      ]
    },
    {
      value: 'four-wheeler',
      label: 'Four Wheeler',
      vehicles: [
        {
          id: 'car-1',
          name: 'Mahindra XUV700',
          type: 'SUV',
          image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
          dimensions: '4.69m × 1.89m'
        },
        {
          id: 'car-2',
          name: 'Maruti Swift',
          type: 'Hatchback',
          image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
          dimensions: '3.84m × 1.73m'
        },
        {
          id: 'car-3',
          name: 'Toyota Innova',
          type: 'MPV',
          image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
          dimensions: '4.58m × 1.83m'
        }
      ]
    }
  ];

  const [selectedVehicleType, setSelectedVehicleType] = useState(
    selectedVehicle?.type || 'four-wheeler'
  );
  const [selectedVehicleModel, setSelectedVehicleModel] = useState(
    selectedVehicle?.id || 'car-1'
  );

  // Get current vehicle data
  const currentVehicleGroup = vehicleOptions?.find(group => group?.value === selectedVehicleType);
  const currentVehicle = currentVehicleGroup?.vehicles?.find(v => v?.id === selectedVehicleModel);

  // Auto-rotate vehicle image
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRotating) {
        setRotationAngle(prev => (prev + 45) % 360);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isRotating]);

  // Update parent component when selection changes
  useEffect(() => {
    if (currentVehicle) {
      onVehicleChange({
        ...currentVehicle,
        type: selectedVehicleType
      });
    }
  }, [selectedVehicleType, selectedVehicleModel, currentVehicle, onVehicleChange]);

  const handleVehicleTypeChange = (value) => {
    setSelectedVehicleType(value);
    // Auto-select first vehicle of new type
    const newGroup = vehicleOptions?.find(group => group?.value === value);
    if (newGroup?.vehicles?.length > 0) {
      setSelectedVehicleModel(newGroup?.vehicles?.[0]?.id);
    }
  };

  const handleManualRotation = (direction) => {
    setIsRotating(true);
    setRotationAngle(prev => prev + (direction === 'left' ? -45 : 45));
    setTimeout(() => setIsRotating(false), 500);
  };

  const vehicleTypeOptions = vehicleOptions?.map(group => ({
    value: group?.value,
    label: group?.label
  }));

  const vehicleModelOptions = currentVehicleGroup?.vehicles?.map(vehicle => ({
    value: vehicle?.id,
    label: `${vehicle?.name} (${vehicle?.type})`
  })) || [];

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Icon name="Car" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Select Your Vehicle</h3>
        </div>

        {/* Vehicle Type Selection */}
        <div className="space-y-4">
          <Select
            label="Vehicle Type"
            options={vehicleTypeOptions}
            value={selectedVehicleType}
            onChange={handleVehicleTypeChange}
            placeholder="Choose vehicle type"
          />

          {/* Vehicle Model Selection */}
          {vehicleModelOptions?.length > 0 && (
            <Select
              label="Vehicle Model"
              options={vehicleModelOptions}
              value={selectedVehicleModel}
              onChange={setSelectedVehicleModel}
              placeholder="Choose your vehicle"
            />
          )}
        </div>

        {/* Vehicle Preview */}
        {currentVehicle && (
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-medium text-foreground mb-2">
                {currentVehicle?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {currentVehicle?.type} • {currentVehicle?.dimensions}
              </p>
            </div>

            {/* 360° Vehicle Image */}
            <div className="relative bg-muted/20 rounded-lg p-8 flex items-center justify-center">
              <div className="relative">
                <div 
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `rotateY(${rotationAngle}deg)` }}
                >
                  <Image
                    src={currentVehicle?.image}
                    alt={currentVehicle?.name}
                    className="w-48 h-32 object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Rotation Controls */}
                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
                  <button
                    onClick={() => handleManualRotation('left')}
                    className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                    title="Rotate left"
                  >
                    <Icon name="ChevronLeft" size={16} />
                  </button>
                </div>

                <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                  <button
                    onClick={() => handleManualRotation('right')}
                    className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                    title="Rotate right"
                  >
                    <Icon name="ChevronRight" size={16} />
                  </button>
                </div>
              </div>

              {/* 360° Indicator */}
              <div className="absolute top-2 right-2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                360° View
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/20 rounded-lg p-3">
                <div className="text-muted-foreground mb-1">Type</div>
                <div className="font-medium text-foreground">{currentVehicle?.type}</div>
              </div>
              <div className="bg-muted/20 rounded-lg p-3">
                <div className="text-muted-foreground mb-1">Dimensions</div>
                <div className="font-medium text-foreground">{currentVehicle?.dimensions}</div>
              </div>
            </div>

            {/* Compatibility Note */}
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-success">Compatible Slots Available</div>
                  <div className="text-success/80">
                    {selectedVehicleType === 'two-wheeler' ?'Rows E & F are designated for two-wheelers' :'Rows A, B, C & D are designated for four-wheelers'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleSelector;
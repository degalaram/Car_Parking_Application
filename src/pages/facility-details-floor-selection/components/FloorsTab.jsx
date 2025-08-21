import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FloorsTab = ({ facility, onFloorSelect, onBookSlot }) => {
  const [selectedFloor, setSelectedFloor] = useState(facility?.floors?.[0]);
  const [selectedVehicleType, setSelectedVehicleType] = useState('car');
  const [showTimeProjection, setShowTimeProjection] = useState(false);

  const vehicleTypeOptions = [
    { value: 'car', label: 'Car (4-Wheeler)' },
    { value: 'bike', label: 'Bike (2-Wheeler)' }
  ];

  const getSlotStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success';
      case 'reserved':
        return 'bg-destructive';
      case 'maintenance':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  const getSlotStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'reserved':
        return 'Reserved';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
    onFloorSelect(floor);
  };

  const filteredSlots = selectedFloor?.slots?.filter(slot => 
    slot?.vehicleType === selectedVehicleType || slot?.vehicleType === 'both'
  );

  const availableCount = filteredSlots?.filter(slot => slot?.status === 'available')?.length;
  const reservedCount = filteredSlots?.filter(slot => slot?.status === 'reserved')?.length;
  const maintenanceCount = filteredSlots?.filter(slot => slot?.status === 'maintenance')?.length;

  return (
    <div className="space-y-6">
      {/* Vehicle Type Selector */}
      <div className="bg-muted p-4 rounded-lg">
        <Select
          label="Vehicle Type"
          options={vehicleTypeOptions}
          value={selectedVehicleType}
          onChange={setSelectedVehicleType}
          className="max-w-xs"
        />
      </div>
      {/* Floor Selector */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Select Floor</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTimeProjection(!showTimeProjection)}
            iconName="Clock"
            iconPosition="left"
          >
            {showTimeProjection ? 'Current' : 'Projection'}
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {facility?.floors?.map((floor) => (
            <button
              key={floor?.id}
              onClick={() => handleFloorChange(floor)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedFloor?.id === floor?.id
                  ? 'border-primary bg-primary/10' :'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{floor?.name}</div>
                <div className="text-sm text-muted-foreground mb-2">{floor?.totalSlots} slots</div>
                <div className="flex justify-center gap-1">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-xs text-success">{floor?.availableSlots}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Floor Layout */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-foreground">
            {selectedFloor?.name} Layout
          </h4>
          <div className="text-sm text-muted-foreground">
            {availableCount} available of {filteredSlots?.length} slots
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success rounded"></div>
            <span className="text-sm text-foreground">Available ({availableCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive rounded"></div>
            <span className="text-sm text-foreground">Reserved ({reservedCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-warning rounded"></div>
            <span className="text-sm text-foreground">Maintenance ({maintenanceCount})</span>
          </div>
        </div>

        {/* Slot Grid */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
            {filteredSlots?.map((slot) => (
              <button
                key={slot?.id}
                onClick={() => slot?.status === 'available' && onBookSlot(slot)}
                disabled={slot?.status !== 'available'}
                className={`aspect-square rounded-lg border-2 transition-all relative ${
                  slot?.status === 'available' ?'border-success bg-success/20 hover:bg-success/40 cursor-pointer'
                    : slot?.status === 'reserved' ?'border-destructive bg-destructive/20 cursor-not-allowed' :'border-warning bg-warning/20 cursor-not-allowed'
                }`}
                title={`${slot?.row}${slot?.number} - ${getSlotStatusText(slot?.status)}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {slot?.row}{slot?.number}
                  </span>
                </div>
                {slot?.status === 'available' && (
                  <Icon 
                    name="Car" 
                    size={12} 
                    className="absolute top-0.5 right-0.5 text-success"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Row Breakdown */}
        <div className="mt-6">
          <h5 className="text-sm font-semibold text-foreground mb-3">Row-wise Availability</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedFloor?.rows?.map((row) => (
              <div key={row?.id} className="bg-muted p-3 rounded-lg">
                <div className="text-sm font-medium text-foreground">Row {row?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {row?.available}/{row?.total} available
                </div>
                <div className="w-full bg-border rounded-full h-2 mt-2">
                  <div
                    className="bg-success h-2 rounded-full transition-all"
                    style={{ width: `${(row?.available / row?.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time-based Availability */}
        {showTimeProjection && (
          <div className="mt-6 bg-muted p-4 rounded-lg">
            <h5 className="text-sm font-semibold text-foreground mb-3">Projected Availability Today</h5>
            <div className="grid grid-cols-6 gap-2">
              {selectedFloor?.hourlyProjection?.map((hour) => (
                <div key={hour?.time} className="text-center">
                  <div className="text-xs text-muted-foreground">{hour?.time}</div>
                  <div className={`text-sm font-medium ${
                    hour?.availability > 70 ? 'text-success' :
                    hour?.availability > 30 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {hour?.availability}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloorsTab;
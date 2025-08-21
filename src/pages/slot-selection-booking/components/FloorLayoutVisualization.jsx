import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloorLayoutVisualization = ({ 
  selectedFloor, 
  onFloorChange, 
  selectedSlot, 
  onSlotSelect,
  vehicleType,
  className = '' 
}) => {
  const [hoveredSlot, setHoveredSlot] = useState(null);

  // Mock floor data with hierarchical slot identification
  const floors = [
    { id: 1, name: '1st Floor', totalSlots: 120, availableSlots: 45 },
    { id: 2, name: '2nd Floor', totalSlots: 120, availableSlots: 67 },
    { id: 3, name: '3rd Floor', totalSlots: 100, availableSlots: 23 }
  ];

  // Generate mock slot data for selected floor
  const generateSlotData = (floorId) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const slotsPerRow = floorId === 3 ? 16 : 20;
    const slots = [];

    rows?.forEach((row, rowIndex) => {
      for (let slotNum = 1; slotNum <= slotsPerRow; slotNum++) {
        const slotId = `${floorId}-${row}-${slotNum}`;
        const random = Math.random();
        
        // Determine slot status based on random probability
        let status = 'available';
        if (random < 0.3) status = 'reserved';
        else if (random < 0.4) status = 'ending-soon';
        else if (random < 0.45) status = 'maintenance';

        // Vehicle compatibility
        const isCompatible = vehicleType === 'two-wheeler' ? 
          (rowIndex >= 4) : // Two-wheelers in rows E, F
          (rowIndex < 4);   // Four-wheelers in rows A, B, C, D

        slots?.push({
          id: slotId,
          floorId,
          row,
          slotNumber: slotNum,
          status: isCompatible ? status : 'incompatible',
          vehicleType: isCompatible ? vehicleType : null,
          location: `${floorId === 1 ? '1st' : floorId === 2 ? '2nd' : '3rd'} Floor ${row} Row ${slotNum}${slotNum === 1 ? 'st' : slotNum === 2 ? 'nd' : slotNum === 3 ? 'rd' : 'th'} Parking Slot`,
          walkingDistance: Math.floor(Math.random() * 150) + 50, // 50-200 meters
          amenities: ['CCTV', 'Lighting', random > 0.5 ? 'EV Charging' : null]?.filter(Boolean),
          endTime: status === 'ending-soon' ? new Date(Date.now() + Math.random() * 3600000) : null
        });
      }
    });

    return slots;
  };

  const [slotData, setSlotData] = useState(generateSlotData(selectedFloor));

  useEffect(() => {
    setSlotData(generateSlotData(selectedFloor));
  }, [selectedFloor, vehicleType]);

  const getSlotColor = (slot) => {
    switch (slot?.status) {
      case 'available':
        return 'bg-success hover:bg-success/80 border-success';
      case 'reserved':
        return 'bg-destructive border-destructive cursor-not-allowed';
      case 'ending-soon':
        return 'bg-warning hover:bg-warning/80 border-warning';
      case 'maintenance':
        return 'bg-muted border-muted cursor-not-allowed';
      case 'incompatible':
        return 'bg-muted/50 border-muted cursor-not-allowed opacity-50';
      default:
        return 'bg-muted border-muted';
    }
  };

  const getSlotIcon = (slot) => {
    if (slot?.status === 'incompatible') return null;
    if (vehicleType === 'two-wheeler') return 'Bike';
    return 'Car';
  };

  const handleSlotClick = (slot) => {
    if (slot?.status === 'available' || slot?.status === 'ending-soon') {
      onSlotSelect(slot);
    }
  };

  const currentFloor = floors?.find(f => f?.id === selectedFloor);
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Floor Selection Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Floor Layout</h3>
          <div className="text-sm text-muted-foreground">
            {currentFloor?.availableSlots} of {currentFloor?.totalSlots} available
          </div>
        </div>

        {/* Floor Tabs */}
        <div className="flex gap-2">
          {floors?.map((floor) => (
            <Button
              key={floor?.id}
              variant={selectedFloor === floor?.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFloorChange(floor?.id)}
              className="flex-1"
            >
              <div className="text-center">
                <div className="font-medium">{floor?.name}</div>
                <div className="text-xs opacity-80">{floor?.availableSlots} free</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded border"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded border"></div>
            <span>Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-warning rounded border"></div>
            <span>Ending Soon</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-muted rounded border"></div>
            <span>Maintenance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-muted/50 rounded border opacity-50"></div>
            <span>Incompatible</span>
          </div>
        </div>
      </div>
      {/* Slot Grid */}
      <div className="p-4">
        <div className="space-y-6">
          {rows?.map((row) => {
            const rowSlots = slotData?.filter(slot => slot?.row === row);
            const isVehicleCompatibleRow = vehicleType === 'two-wheeler' ? 
              ['E', 'F']?.includes(row) : 
              ['A', 'B', 'C', 'D']?.includes(row);

            return (
              <div key={row} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-sm font-medium">
                    {row}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Row {row} - {isVehicleCompatibleRow ? 
                      (vehicleType === 'two-wheeler' ? 'Two Wheeler' : 'Four Wheeler') : 
                      'Not Compatible'
                    }
                  </div>
                </div>
                <div className="grid grid-cols-10 sm:grid-cols-15 lg:grid-cols-20 gap-1">
                  {rowSlots?.map((slot) => (
                    <button
                      key={slot?.id}
                      onClick={() => handleSlotClick(slot)}
                      onMouseEnter={() => setHoveredSlot(slot)}
                      onMouseLeave={() => setHoveredSlot(null)}
                      className={`
                        relative w-8 h-8 rounded border-2 transition-all duration-200 flex items-center justify-center
                        ${getSlotColor(slot)}
                        ${selectedSlot?.id === slot?.id ? 'ring-2 ring-primary ring-offset-1' : ''}
                        ${slot?.status === 'available' || slot?.status === 'ending-soon' ? 'hover:scale-110' : ''}
                      `}
                      disabled={slot?.status === 'reserved' || slot?.status === 'maintenance' || slot?.status === 'incompatible'}
                      title={slot?.location}
                    >
                      {getSlotIcon(slot) && (
                        <Icon 
                          name={getSlotIcon(slot)} 
                          size={12} 
                          className="text-white"
                        />
                      )}
                      <span className="absolute -bottom-5 text-xs font-mono">
                        {slot?.slotNumber}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover Tooltip */}
        {hoveredSlot && (
          <div className="fixed z-50 bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border border-border pointer-events-none">
            <div className="font-medium">{hoveredSlot?.location}</div>
            <div className="text-sm text-muted-foreground">
              Walking distance: {hoveredSlot?.walkingDistance}m
            </div>
            {hoveredSlot?.amenities?.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Amenities: {hoveredSlot?.amenities?.join(', ')}
              </div>
            )}
            {hoveredSlot?.endTime && (
              <div className="text-sm text-warning">
                Available in: {Math.ceil((hoveredSlot?.endTime - new Date()) / 60000)} min
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloorLayoutVisualization;
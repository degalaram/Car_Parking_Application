import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ 
  facilities, 
  selectedFacility, 
  onFacilitySelect, 
  userLocation, 
  searchRadius,
  selectedCity,
  className = '' 
}) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(14);

  // Mock map center based on user location, selected city, or default
  const mapCenter = userLocation || selectedCity?.coordinates || { lat: 17.3850, lng: 78.4867 };

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMarkerClick = (facility) => {
    onFacilitySelect(facility);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  const getAvailabilityColor = (availableSlots, totalSlots) => {
    const ratio = availableSlots / totalSlots;
    if (ratio > 0.6) return 'bg-success';
    if (ratio > 0.3) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className={`relative bg-muted rounded-lg overflow-hidden ${className}`}>
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full relative">
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Google Maps Iframe */}
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Parking Locations Map"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
              className="absolute inset-0"
            />

            {/* Custom Markers Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {facilities?.map((facility, index) => {
                // Calculate marker position (mock positioning)
                const offsetX = (index % 3) * 80 + 100;
                const offsetY = Math.floor(index / 3) * 60 + 80;
                
                return (
                  <div
                    key={facility?.id}
                    className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${offsetX}px`,
                      top: `${offsetY}px`
                    }}
                    onClick={() => handleMarkerClick(facility)}
                  >
                    {/* Marker */}
                    <div className={`relative ${selectedFacility?.id === facility?.id ? 'scale-110' : ''} transition-transform`}>
                      <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${getAvailabilityColor(facility?.availableSlots, facility?.totalSlots)}`}>
                        <Icon name="Car" size={16} color="white" />
                      </div>
                      
                      {/* Price Badge */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 shadow-md whitespace-nowrap">
                        <span className="text-xs font-medium">₹{facility?.hourlyRate}/hr</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* User Location Marker */}
            {userLocation && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
              </div>
            )}
          </>
        )}
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleZoomIn}
          className="w-10 h-10 p-0 shadow-lg"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleZoomOut}
          className="w-10 h-10 p-0 shadow-lg"
        >
          <Icon name="Minus" size={16} />
        </Button>
      </div>
      {/* Current Location Button */}
      <div className="absolute bottom-4 right-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation?.getCurrentPosition(
                (position) => {
                  // Handle location update
                  console.log('Location updated:', position?.coords);
                },
                (error) => console.error('Location error:', error)
              );
            }
          }}
          className="w-10 h-10 p-0 shadow-lg"
          title="Center on current location"
        >
          <Icon name="Navigation" size={16} />
        </Button>
      </div>
      {/* Search Radius Indicator */}
      {searchRadius && (
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded px-3 py-2 shadow-md">
          <span className="text-xs text-muted-foreground">
            Within {searchRadius} miles
          </span>
        </div>
      )}
    </div>
  );
};

export default MapView;
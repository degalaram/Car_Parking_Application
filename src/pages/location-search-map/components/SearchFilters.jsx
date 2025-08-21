import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchFilters = ({ 
  filters, 
  onFiltersChange, 
  onLocationSearch,
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const vehicleTypes = [
    { value: 'all', label: 'All Vehicles' },
    { value: 'car', label: 'Car' },
    { value: 'bike', label: 'Motorcycle' },
    { value: 'suv', label: 'SUV' },
    { value: 'truck', label: 'Truck' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Any Price' },
    { value: '0-5', label: '$0 - $5/hr' },
    { value: '5-10', label: '$5 - $10/hr' },
    { value: '10-15', label: '$10 - $15/hr' },
    { value: '15+', label: '$15+/hr' }
  ];

  const distanceOptions = [
    { value: '1', label: 'Within 1 mile' },
    { value: '3', label: 'Within 3 miles' },
    { value: '5', label: 'Within 5 miles' },
    { value: '10', label: 'Within 10 miles' }
  ];

  const amenityOptions = [
    { value: 'covered', label: 'Covered Parking' },
    { value: 'security', label: '24/7 Security' },
    { value: 'ev_charging', label: 'EV Charging' },
    { value: 'valet', label: 'Valet Service' },
    { value: 'handicap', label: 'Handicap Accessible' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onLocationSearch(searchQuery?.trim());
    }
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleAmenityToggle = (amenity) => {
    const currentAmenities = filters?.amenities || [];
    const newAmenities = currentAmenities?.includes(amenity)
      ? currentAmenities?.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    handleFilterChange('amenities', newAmenities);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      vehicleType: 'all',
      priceRange: 'all',
      distance: '5',
      amenities: []
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.vehicleType && filters?.vehicleType !== 'all') count++;
    if (filters?.priceRange && filters?.priceRange !== 'all') count++;
    if (filters?.distance && filters?.distance !== '5') count++;
    if (filters?.amenities && filters?.amenities?.length > 0) count++;
    return count;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 space-y-6 ${className}`}>
      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search by address, landmark, or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-10 pr-12"
          />
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation?.getCurrentPosition(
                  (position) => {
                    onLocationSearch({
                      lat: position?.coords?.latitude,
                      lng: position?.coords?.longitude
                    });
                  },
                  (error) => console.error('Location error:', error)
                );
              }
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2"
            title="Use current location"
          >
            <Icon name="MapPin" size={16} />
          </Button>
        </div>
      </form>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Vehicle Type"
          options={vehicleTypes}
          value={filters?.vehicleType || 'all'}
          onChange={(value) => handleFilterChange('vehicleType', value)}
        />
        
        <Select
          label="Price Range"
          options={priceRanges}
          value={filters?.priceRange || 'all'}
          onChange={(value) => handleFilterChange('priceRange', value)}
        />
        
        <Select
          label="Distance"
          options={distanceOptions}
          value={filters?.distance || '5'}
          onChange={(value) => handleFilterChange('distance', value)}
        />

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="w-full"
          >
            Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </Button>
        </div>
      </div>
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-border pt-6 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Amenities</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {amenityOptions?.map((amenity) => (
                <Button
                  key={amenity?.value}
                  variant={filters?.amenities?.includes(amenity?.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAmenityToggle(amenity?.value)}
                  className="justify-start text-xs"
                >
                  {amenity?.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground"
            >
              Clear All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedFilters(false)}
            >
              Done
            </Button>
          </div>
        </div>
      )}
      {/* Active Filter Tags */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters?.vehicleType && filters?.vehicleType !== 'all' && (
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              <span>{vehicleTypes?.find(v => v?.value === filters?.vehicleType)?.label}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFilterChange('vehicleType', 'all')}
                className="w-4 h-4 p-0 hover:bg-primary/20"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          )}
          
          {filters?.priceRange && filters?.priceRange !== 'all' && (
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              <span>{priceRanges?.find(p => p?.value === filters?.priceRange)?.label}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFilterChange('priceRange', 'all')}
                className="w-4 h-4 p-0 hover:bg-primary/20"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          )}

          {filters?.amenities?.map((amenity) => (
            <div key={amenity} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              <span>{amenityOptions?.find(a => a?.value === amenity)?.label}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAmenityToggle(amenity)}
                className="w-4 h-4 p-0 hover:bg-primary/20"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
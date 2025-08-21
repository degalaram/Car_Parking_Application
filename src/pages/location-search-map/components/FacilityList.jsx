import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import FacilityCard from './FacilityCard';

const FacilityList = ({ 
  facilities, 
  loading, 
  onRefresh, 
  onSortChange,
  className = '' 
}) => {
  const [sortBy, setSortBy] = useState('distance');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sortOptions = [
    { value: 'distance', label: 'Distance' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'price_desc', label: 'Price (High to Low)' },
    { value: 'rating', label: 'Rating' },
    { value: 'availability', label: 'Availability' }
  ];

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getSortedFacilities = () => {
    const sorted = [...facilities];
    
    switch (sortBy) {
      case 'price':
        return sorted?.sort((a, b) => a?.hourlyRate - b?.hourlyRate);
      case 'price_desc':
        return sorted?.sort((a, b) => b?.hourlyRate - a?.hourlyRate);
      case 'rating':
        return sorted?.sort((a, b) => b?.rating - a?.rating);
      case 'availability':
        return sorted?.sort((a, b) => b?.availableSlots - a?.availableSlots);
      case 'distance':
      default:
        return sorted?.sort((a, b) => a?.distance - b?.distance);
    }
  };

  const sortedFacilities = getSortedFacilities();

  return (
    <div className={`bg-background ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">
            Nearby Parking ({facilities?.length})
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2"
            title="Refresh results"
          >
            <Icon 
              name="RefreshCw" 
              size={16} 
              className={isRefreshing ? 'animate-spin' : ''}
            />
          </Button>
        </div>

        <div className="w-40">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            placeholder="Sort by"
          />
        </div>
      </div>
      {/* Loading State */}
      {loading && (
        <div className="p-8 text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Finding parking spots...</p>
        </div>
      )}
      {/* Empty State */}
      {!loading && facilities?.length === 0 && (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No parking found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search area or filters to find more options.
          </p>
          <Button variant="outline" onClick={handleRefresh}>
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh Search
          </Button>
        </div>
      )}
      {/* Facility Cards */}
      {!loading && sortedFacilities?.length > 0 && (
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {sortedFacilities?.map((facility) => (
            <FacilityCard
              key={facility?.id}
              facility={facility}
            />
          ))}
        </div>
      )}
      {/* Pull to Refresh Indicator */}
      {isRefreshing && (
        <div className="absolute top-0 left-0 right-0 bg-primary/10 p-2 text-center">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Icon name="RefreshCw" size={16} className="animate-spin" />
            <span className="text-sm font-medium">Updating results...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityList;
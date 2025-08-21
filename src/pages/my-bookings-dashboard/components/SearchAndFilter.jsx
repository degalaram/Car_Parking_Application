import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilter, onClearFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const facilityOptions = [
    { value: '', label: 'All Facilities' },
    { value: 'downtown-mall', label: 'Downtown Mall' },
    { value: 'city-airport', label: 'City Airport' },
    { value: 'business-district', label: 'Business District' },
    { value: 'general-hospital', label: 'General Hospital' },
    { value: 'state-university', label: 'State University' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = () => {
    onFilter({
      facility: selectedFacility,
      dateRange: selectedDateRange
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedFacility('');
    setSelectedDateRange('');
    onClearFilters();
  };

  const hasActiveFilters = selectedFacility || selectedDateRange;

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search bookings by facility name, booking ID..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          iconName="Filter"
          iconPosition="left"
        >
          Filters
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
              {(selectedFacility ? 1 : 0) + (selectedDateRange ? 1 : 0)}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isFilterExpanded && (
        <div className="space-y-3 pt-2 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Facility"
              options={facilityOptions}
              value={selectedFacility}
              onChange={(value) => {
                setSelectedFacility(value);
                handleFilterChange();
              }}
            />
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={selectedDateRange}
              onChange={(value) => {
                setSelectedDateRange(value);
                handleFilterChange();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
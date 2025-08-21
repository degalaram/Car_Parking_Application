import React from 'react';
import Icon from '../AppIcon';
import Select from './Select';

const CitySelector = ({ selectedCity, onCityChange, className = '' }) => {
  const cities = [
    {
      value: 'hyderabad',
      label: 'Hyderabad',
      coordinates: { lat: 17.3850, lng: 78.4867 },
      icon: 'MapPin'
    },
    {
      value: 'bengaluru',
      label: 'Bengaluru',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      icon: 'MapPin'
    }
  ];

  const handleCityChange = (cityValue) => {
    const city = cities.find(c => c.value === cityValue);
    if (city) {
      onCityChange(city);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon name="Map" size={16} className="text-muted-foreground" />
      <Select
        options={cities.map(city => ({
          value: city.value,
          label: city.label
        }))}
        value={selectedCity?.value || cities[0].value}
        onChange={handleCityChange}
        placeholder="Select City"
        className="min-w-[120px]"
      />
    </div>
  );
};

export default CitySelector;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalSearchHeader from '../../components/ui/GlobalSearchHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import BookingFloatingActions from '../../components/ui/BookingFloatingActions';
import MapView from './components/MapView';
import SearchFilters from './components/SearchFilters';
import FacilityList from './components/FacilityList';
import MapResizeHandle from './components/MapResizeHandle';

const LocationSearchMap = () => {
  const location = useLocation();
  const [mapHeight, setMapHeight] = useState(60);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState({
    value: 'hyderabad',
    label: 'Hyderabad',
    coordinates: { lat: 17.3850, lng: 78.4867 }
  });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    vehicleType: 'all',
    priceRange: 'all',
    distance: '5',
    amenities: []
  });

  // Mock parking facilities data
  const [facilities] = useState([
    {
      id: 1,
      name: "Downtown Parking Plaza",
      address: "123 Main Street, Downtown",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      distance: 0.3,
      hourlyRate: 8,
      originalRate: 12,
      availableSlots: 45,
      totalSlots: 120,
      rating: 4.5,
      reviewCount: 234,
      amenities: ['covered', 'security', 'ev_charging'],
      discount: 25,
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      name: "Metro Center Garage",
      address: "456 Business Ave, Midtown",
      image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?w=400&h=300&fit=crop",
      distance: 0.7,
      hourlyRate: 6,
      availableSlots: 12,
      totalSlots: 80,
      rating: 4.2,
      reviewCount: 156,
      amenities: ['security', 'valet'],
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 3,
      name: "Riverside Parking Structure",
      address: "789 River Road, Waterfront",
      image: "https://images.pixabay.com/photo/2016/11/29/09/00/architecture-1868667_1280.jpg?w=400&h=300&fit=crop",
      distance: 1.2,
      hourlyRate: 10,
      availableSlots: 78,
      totalSlots: 200,
      rating: 4.7,
      reviewCount: 89,
      amenities: ['covered', 'handicap', 'ev_charging'],
      discount: 15,
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
      id: 4,
      name: "City Mall Parking",
      address: "321 Shopping Center Dr",
      image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400&h=300&fit=crop",
      distance: 1.8,
      hourlyRate: 5,
      availableSlots: 156,
      totalSlots: 300,
      rating: 4.0,
      reviewCount: 445,
      amenities: ['covered', 'security'],
      coordinates: { lat: 40.7282, lng: -74.0776 }
    },
    {
      id: 5,
      name: "Airport Express Lot",
      address: "555 Terminal Way, Airport",
      image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?w=400&h=300&fit=crop",
      distance: 2.5,
      hourlyRate: 15,
      availableSlots: 234,
      totalSlots: 500,
      rating: 4.3,
      reviewCount: 678,
      amenities: ['covered', 'security', 'valet', 'ev_charging'],
      coordinates: { lat: 40.6892, lng: -74.1745 }
    },
    {
      id: 6,
      name: "University District Garage",
      address: "888 Campus Drive, University",
      image: "https://images.pixabay.com/photo/2017/07/09/03/19/home-2486092_1280.jpg?w=400&h=300&fit=crop",
      distance: 3.1,
      hourlyRate: 4,
      availableSlots: 23,
      totalSlots: 150,
      rating: 3.8,
      reviewCount: 123,
      amenities: ['handicap'],
      discount: 20,
      coordinates: { lat: 40.8176, lng: -73.9782 }
    }
  ]);

  // Initialize user location from navigation state or get current location
  useEffect(() => {
    if (location?.state?.userLocation) {
      setUserLocation(location?.state?.userLocation);
    } else if (location?.state?.searchNearby) {
      // Auto-request location for nearby search
      if (navigator.geolocation) {
        navigator.geolocation?.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude
            });
          },
          (error) => {
            console.error('Location access denied:', error);
          }
        );
      }
    }
  }, [location?.state]);

  const handleLocationSearch = (query) => {
    setLoading(true);
    
    // Simulate search API call
    setTimeout(() => {
      if (typeof query === 'object' && query?.lat && query?.lng) {
        // Location coordinates provided
        setUserLocation(query);
      } else {
        // Text search - simulate geocoding
        console.log('Searching for:', query);
      }
      setLoading(false);
    }, 1000);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to facilities list
  };

  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
  };

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate refresh API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
  };

  const handleSortChange = (sortBy) => {
    // Sorting is handled in FacilityList component
    console.log('Sort by:', sortBy);
  };

  const handleMapResize = (newHeight) => {
    setMapHeight(newHeight);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setUserLocation(null); // Clear user location when city changes
  };

  const filteredFacilities = facilities?.filter(facility => {
    // Apply filters
    if (filters?.vehicleType !== 'all') {
      // Vehicle type filtering logic would go here
    }
    
    if (filters?.priceRange !== 'all') {
      const [min, max] = filters?.priceRange?.split('-')?.map(Number);
      if (max) {
        if (facility?.hourlyRate < min || facility?.hourlyRate > max) return false;
      } else if (filters?.priceRange === '15+') {
        if (facility?.hourlyRate < 15) return false;
      }
    }
    
    if (filters?.distance) {
      const maxDistance = parseFloat(filters?.distance);
      if (facility?.distance > maxDistance) return false;
    }
    
    if (filters?.amenities && filters?.amenities?.length > 0) {
      const hasRequiredAmenities = filters?.amenities?.every(amenity => 
        facility?.amenities?.includes(amenity)
      );
      if (!hasRequiredAmenities) return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <GlobalSearchHeader 
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
      />
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[420px] border-r border-border bg-card overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Filters */}
            <div className="flex-shrink-0 p-6 border-b border-border">
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onLocationSearch={handleLocationSearch}
              />
            </div>
            
            {/* Facility List */}
            <div className="flex-1 overflow-hidden">
              <FacilityList
                facilities={filteredFacilities}
                loading={loading}
                onRefresh={handleRefresh}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>

        {/* Mobile/Desktop Map and List */}
        <div className="flex-1 flex flex-col lg:block">
          {/* Mobile Filters */}
          <div className="lg:hidden flex-shrink-0 p-4 bg-card border-b border-border">
            <SearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onLocationSearch={handleLocationSearch}
            />
          </div>

          {/* Map Container */}
          <div 
            className="flex-shrink-0 lg:h-full"
            style={{ height: `${mapHeight}vh` }}
          >
            <MapView
              facilities={filteredFacilities}
              selectedFacility={selectedFacility}
              onFacilitySelect={handleFacilitySelect}
              userLocation={userLocation}
              selectedCity={selectedCity}
              searchRadius={parseFloat(filters?.distance)}
              className="h-full"
            />
          </div>

          {/* Mobile Resize Handle */}
          <div className="lg:hidden">
            <MapResizeHandle
              onResize={handleMapResize}
              initialMapHeight={mapHeight}
            />
          </div>

          {/* Mobile Facility List */}
          <div className="lg:hidden flex-1 overflow-hidden">
            <FacilityList
              facilities={filteredFacilities}
              loading={loading}
              onRefresh={handleRefresh}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
      </div>
      {/* Floating Actions */}
      <BookingFloatingActions />
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default LocationSearchMap;
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import CitySelector from './CitySelector';
import { useSidebar } from './SidebarContext';

const GlobalSearchHeader = ({ selectedCity, onCityChange, className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { toggle } = useSidebar();

  const isOnSearchPage = location?.pathname === '/location-search-map';
  const isOnFacilityPage = location?.pathname === '/facility-details-floor-selection';

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate('/location-search-map', { 
        state: { searchQuery: searchQuery?.trim() } 
      });
    }
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          navigate('/location-search-map', {
            state: {
              userLocation: {
                lat: position?.coords?.latitude,
                lng: position?.coords?.longitude
              }
            }
          });
        },
        (error) => {
          console.error('Location access denied:', error);
          // Fallback to search page without location
          navigate('/location-search-map');
        }
      );
    }
  };

  const handleBack = () => {
    if (isOnFacilityPage) {
      navigate('/location-search-map');
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={`bg-card border-b border-border sticky top-0 z-80 ${className}`}>
      <div className="container-app">
        <div className="flex items-center gap-4 py-4">
          {/* Logo and Back Navigation */}
          <div className="flex items-center gap-3">
            {(isOnSearchPage || isOnFacilityPage) ? (
              <div className="flex items-center gap-3">
                {/* Sidebar toggle button */}
                <button
                  type="button"
                  onClick={toggle}
                  aria-label="Toggle sidebar"
                  className="hidden lg:inline-flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Icon name="Menu" size={20} />
                </button>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Car" size={20} color="white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-foreground">ParkSlot Pro</h1>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                iconName="ArrowLeft"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground"
              >
                Back
              </Button>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for parking locations..."
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
                  onClick={handleLocationRequest}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2"
                  title="Use current location"
                >
                  <Icon name="MapPin" size={16} />
                </Button>
              </div>
            </form>

            {/* Mobile Search */}
            <div className="sm:hidden">
              {isSearchExpanded ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchExpanded(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchExpanded(true)}
                    className="flex-1 justify-start text-muted-foreground"
                  >
                    <Icon name="Search" size={20} className="mr-2" />
                    Search locations...
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLocationRequest}
                    title="Use current location"
                  >
                    <Icon name="MapPin" size={20} />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* City Selector - Only on search page */}
          {isOnSearchPage && selectedCity && onCityChange && (
            <CitySelector
              selectedCity={selectedCity}
              onCityChange={onCityChange}
              className="hidden sm:flex"
            />
          )}

          {/* Filter Button - Only on search page */}
          {isOnSearchPage && (
            <Button
              variant="outline"
              size="sm"
              iconName="Filter"
              className="hidden sm:flex"
            >
              Filters
            </Button>
          )}

          {/* Mobile Filter Button */}
          {isOnSearchPage && (
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden"
            >
              <Icon name="Filter" size={20} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default GlobalSearchHeader;
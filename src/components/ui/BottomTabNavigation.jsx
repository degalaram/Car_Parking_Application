import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useSidebar } from './SidebarContext';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/home',
      icon: 'Home',
      tooltip: 'Dashboard'
    },
    {
      label: 'Search',
      path: '/location-search-map',
      icon: 'Search',
      tooltip: 'Find parking spots'
    },
    {
      label: 'My Bookings',
      path: '/my-bookings-dashboard',
      icon: 'Calendar',
      tooltip: 'View your reservations'
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'User',
      tooltip: 'Account settings'
    }
  ];

  const isActive = (path) => {
    if (path === '/location-search-map') {
      return location?.pathname === path || location?.pathname === '/facility-details-floor-selection';
    }
    if (path === '/home') {
      return location?.pathname === path;
    }
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-100 ${className}`}>
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all ease-micro duration-200 min-w-0 flex-1 ${
                isActive(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`mb-1 ${isActive(item?.path) ? 'text-primary' : ''}`}
              />
              <span className="text-xs font-medium truncate">{item?.label}</span>
            </button>
          ))}
        </div>
      </nav>
      {/* Desktop Sidebar Navigation */}
      <nav
        className={`hidden lg:flex fixed left-0 top-0 h-full w-56 bg-card border-r border-border z-90 flex-col transform transition-transform duration-200 ease-micro ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${className}`}
        aria-hidden={!isOpen}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Car" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">ParkSlot Pro</h1>
              <p className="text-xs text-muted-foreground">Smart Parking</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ease-micro duration-200 text-left ${
                isActive(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted focus-ring'
              }`}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={isActive(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground'}
              />
              <span className="font-medium">{item?.label}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            © 2025 ParkSlot Pro
          </div>
        </div>
      </nav>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="hidden lg:block fixed inset-0 bg-black/20 z-80"
          onClick={close}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default BottomTabNavigation;
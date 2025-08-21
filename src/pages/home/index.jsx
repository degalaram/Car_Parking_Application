import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import GlobalSearchHeader from '../../components/ui/GlobalSearchHeader';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quickActions] = useState([
    {
      title: 'Find Parking',
      description: 'Search for available parking spots',
      icon: 'Search',
      action: () => navigate('/location-search-map'),
      color: 'bg-primary'
    },
    {
      title: 'My Bookings',
      description: 'View your current reservations',
      icon: 'Calendar',
      action: () => navigate('/my-bookings-dashboard'),
      color: 'bg-success'
    },
    {
      title: 'Quick Book',
      description: 'Book a spot in your favorite location',
      icon: 'Clock',
      action: () => navigate('/slot-selection-booking'),
      color: 'bg-warning'
    },
    {
      title: 'Profile',
      description: 'Manage your account settings',
      icon: 'User',
      action: () => navigate('/profile'),
      color: 'bg-accent'
    }
  ]);

  const [parkingAreas] = useState([
    { id: 1, name: 'Downtown Plaza', slots: 45, price: '₹8/hr', distance: '0.3 km' },
    { id: 2, name: 'Metro Center', slots: 12, price: '₹6/hr', distance: '0.7 km' },
    { id: 3, name: 'Riverside Parking', slots: 78, price: '₹10/hr', distance: '1.2 km' },
    { id: 4, name: 'City Mall', slots: 156, price: '₹5/hr', distance: '1.8 km' },
    { id: 5, name: 'Airport Express', slots: 234, price: '₹15/hr', distance: '2.5 km' },
    { id: 6, name: 'University District', slots: 23, price: '₹4/hr', distance: '3.1 km' }
  ]);

  const [selectedArea, setSelectedArea] = useState(null);
  const [showAreaDetails, setShowAreaDetails] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    
    if (!isAuthenticated || !userEmail) {
      navigate('/user-authentication');
      return;
    }
    
    setUser({
      email: userEmail,
      name: userName || 'User'
    });
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <GlobalSearchHeader 
        selectedCity={{
          value: 'hyderabad',
          label: 'Hyderabad',
          coordinates: { lat: 17.3850, lng: 78.4867 }
        }}
        onCityChange={() => {}}
      />
      
      {/* Logout Button */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('userVehicle');
            localStorage.removeItem('tempPassword');
            navigate('/user-authentication');
          }}
          className="bg-card/80 backdrop-blur-sm"
        >
          <Icon name="LogOut" size={16} className="mr-2" />
          Logout
        </Button>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[420px] border-r border-border bg-card overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Welcome Section */}
            <div className="flex-shrink-0 p-8 border-b border-border">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" size={32} className="text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Welcome back, {user.name}!</h2>
                <p className="text-muted-foreground text-sm">Ready to find your perfect parking spot?</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex-shrink-0 p-8 border-b border-border">
              <h3 className="font-medium text-foreground mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-xs text-muted-foreground">Active Bookings</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-success">0</div>
                  <div className="text-xs text-muted-foreground">Total Bookings</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="flex-1 p-8">
              <h3 className="font-medium text-foreground mb-4">Recent Activity</h3>
              <div className="text-center py-8">
                <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">No recent activity</p>
                <p className="text-muted-foreground text-xs">Start booking to see your activity here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to ParkSlot Pro</h1>
            <p className="text-muted-foreground">Your smart parking solution starts here</p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={action.action}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon name={action.icon} size={24} color="white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{action.title}</h3>
                    <p className="text-muted-foreground text-sm">{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Parking Available Areas */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Parking Available Areas</h3>
            <div className="space-y-3">
              {parkingAreas.map((area) => (
                <div
                  key={area.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedArea(area);
                    setShowAreaDetails(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={20} className="text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">{area.name}</h4>
                      <p className="text-sm text-muted-foreground">{area.distance} • {area.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{area.slots} slots</div>
                    <div className="text-xs text-muted-foreground">available</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Locations */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Popular Parking Locations</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Icon name="MapPin" size={32} className="text-primary mx-auto mb-2" />
                <h4 className="font-medium text-foreground">Downtown Plaza</h4>
                <p className="text-sm text-muted-foreground">Starting from ₹8/hr</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Icon name="MapPin" size={32} className="text-primary mx-auto mb-2" />
                <h4 className="font-medium text-foreground">Metro Center</h4>
                <p className="text-sm text-muted-foreground">Starting from ₹6/hr</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Icon name="MapPin" size={32} className="text-primary mx-auto mb-2" />
                <h4 className="font-medium text-foreground">City Mall</h4>
                <p className="text-sm text-muted-foreground">Starting from ₹5/hr</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomTabNavigation />

      {/* Area Details Modal */}
      {showAreaDetails && selectedArea && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">{selectedArea.name}</h3>
              <button
                onClick={() => setShowAreaDetails(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="X" size={20} className="text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Available Slots</span>
                <span className="font-semibold text-foreground">{selectedArea.slots}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Price</span>
                <span className="font-semibold text-foreground">{selectedArea.price}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-semibold text-foreground">{selectedArea.distance}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAreaDetails(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowAreaDetails(false);
                  navigate('/slot-selection-booking');
                }}
                className="flex-1"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

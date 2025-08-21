import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import BookingCard from './components/BookingCard';
import QuickBookingWidget from './components/QuickBookingWidget';
import BookingTabs from './components/BookingTabs';
import EmptyState from './components/EmptyState';
import SearchAndFilter from './components/SearchAndFilter';
import EmergencyContact from './components/EmergencyContact';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MyBookingsDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get bookings from localStorage or use mock data
  const getBookingsFromStorage = () => {
    const storedBookings = localStorage.getItem('userBookings');
    if (storedBookings) {
      return JSON.parse(storedBookings);
    }
    return [
      {
        id: 'BK001',
        facility: {
          id: 'fac-001',
          name: 'Downtown Mall Parking',
          address: '123 Main Street, Downtown',
          location: { lat: 40.7128, lng: -74.0060 }
        },
        slotLocation: '2nd Floor B Row 15th Parking Slot',
        vehicleType: 'Mahindra XUV700',
        vehicleImage: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000)?.toISOString(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000)?.toISOString(),
        duration: '4 Hours',
        totalAmount: 25.00,
        status: 'active',
        receiptUrl: '#'
      },
      {
        id: 'BK002',
        facility: {
          id: 'fac-002',
          name: 'City Airport Terminal 1',
          address: '456 Airport Blvd, Terminal 1',
          location: { lat: 40.6892, lng: -74.1745 }
        },
        slotLocation: '1st Floor A Row 8th Parking Slot',
        vehicleType: 'Honda Activa 6G',
        vehicleImage: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000)?.toISOString(),
        endTime: new Date(Date.now() + 28 * 60 * 60 * 1000)?.toISOString(),
        duration: '4 Hours',
        totalAmount: 15.00,
        status: 'upcoming',
        receiptUrl: '#'
      },
      {
        id: 'BK003',
        facility: {
          id: 'fac-003',
          name: 'Business District Plaza',
          address: '789 Corporate Ave, Business District',
          location: { lat: 40.7589, lng: -73.9851 }
        },
        slotLocation: '3rd Floor C Row 22nd Parking Slot',
        vehicleType: 'Toyota Camry',
        vehicleImage: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
        startTime: new Date(Date.now() - 48 * 60 * 60 * 1000)?.toISOString(),
        endTime: new Date(Date.now() - 40 * 60 * 60 * 1000)?.toISOString(),
        duration: '8 Hours',
        totalAmount: 45.00,
        status: 'completed',
        rated: false,
        receiptUrl: '#'
      }
    ];
  };

  const [bookings, setBookings] = useState(getBookingsFromStorage());
  const [filteredBookings, setFilteredBookings] = useState(getBookingsFromStorage());

  // Check for new bookings from localStorage
  useEffect(() => {
    const checkForNewBookings = () => {
      const storedBookings = localStorage.getItem('userBookings');
      if (storedBookings) {
        const newBookings = JSON.parse(storedBookings);
        setBookings(newBookings);
        setFilteredBookings(newBookings);
      }
    };

    // Check immediately
    checkForNewBookings();

    // Set up interval to check for new bookings
    const interval = setInterval(checkForNewBookings, 2000);

    return () => clearInterval(interval);
  }, []);

  // Filter bookings based on active tab
  const getBookingsByStatus = (status) => {
    return filteredBookings?.filter(booking => booking?.status === status);
  };

  // Get booking counts for tabs
  const bookingCounts = {
    active: bookings?.filter(b => b?.status === 'active')?.length,
    upcoming: bookings?.filter(b => b?.status === 'upcoming')?.length,
    completed: bookings?.filter(b => b?.status === 'completed')?.length
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    filterBookings(query, filters);
  };

  // Handle filters
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    filterBookings(searchQuery, newFilters);
  };

  // Filter bookings function
  const filterBookings = (query, filterOptions) => {
    let filtered = [...bookings];

    // Search filter
    if (query) {
      filtered = filtered?.filter(booking =>
        booking?.facility?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        booking?.id?.toLowerCase()?.includes(query?.toLowerCase()) ||
        booking?.slotLocation?.toLowerCase()?.includes(query?.toLowerCase())
      );
    }

    // Facility filter
    if (filterOptions?.facility) {
      filtered = filtered?.filter(booking =>
        booking?.facility?.id === filterOptions?.facility
      );
    }

    // Date range filter
    if (filterOptions?.dateRange) {
      const now = new Date();
      filtered = filtered?.filter(booking => {
        const bookingDate = new Date(booking.startTime);
        switch (filterOptions?.dateRange) {
          case 'today':
            return bookingDate?.toDateString() === now?.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return bookingDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return bookingDate >= monthAgo;
          case 'quarter':
            const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            return bookingDate >= quarterAgo;
          default:
            return true;
        }
      });
    }

    setFilteredBookings(filtered);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({});
    setFilteredBookings(bookings);
  };

  // Pull to refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Booking actions
  const handleExtendBooking = (bookingId) => {
    alert(`Extending booking ${bookingId}`);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev => prev?.map(booking =>
        booking?.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
    }
  };

  const handleRateBooking = (bookingId) => {
    alert(`Rating booking ${bookingId}`);
    setBookings(prev => prev?.map(booking =>
      booking?.id === bookingId
        ? { ...booking, rated: true }
        : booking
    ));
  };

  const currentBookings = getBookingsByStatus(activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container-app">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/home')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Back to Home"
              >
                <Icon name="ArrowLeft" size={20} className="text-foreground" />
              </button>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center lg:hidden">
                <Icon name="Calendar" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">My Bookings</h1>
                <p className="text-sm text-muted-foreground">Manage your parking reservations</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                iconName={isRefreshing ? "Loader2" : "RefreshCw"}
                className={isRefreshing ? "animate-spin" : ""}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/location-search-map')}
                iconName="Plus"
                iconPosition="left"
                className="hidden sm:flex"
              >
                New Booking
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="container-app py-6 pb-20 lg:pb-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick Booking Widget */}
            <QuickBookingWidget />

            {/* Search and Filter */}
            <SearchAndFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              onClearFilters={handleClearFilters}
            />

            {/* Booking Tabs */}
            <BookingTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              bookingCounts={bookingCounts}
            />

            {/* Bookings List */}
            <div className="space-y-4">
              {currentBookings?.length > 0 ? (
                currentBookings?.map((booking) => (
                  <BookingCard
                    key={booking?.id}
                    booking={booking}
                    onExtend={handleExtendBooking}
                    onCancel={handleCancelBooking}
                    onRate={handleRateBooking}
                  />
                ))
              ) : (
                <EmptyState type={activeTab} />
              )}
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            {/* Emergency Contact */}
            <EmergencyContact />

            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Bookings</span>
                  <span className="font-medium text-foreground">{bookings?.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-medium text-foreground">
                    ${bookings?.reduce((sum, b) => sum + b?.totalAmount, 0)?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avg. Duration</span>
                  <span className="font-medium text-foreground">4.5 hours</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Booking confirmed</p>
                    <p className="text-xs text-muted-foreground">Downtown Mall - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Payment processed</p>
                    <p className="text-xs text-muted-foreground">$25.00 - 3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Slot reserved</p>
                    <p className="text-xs text-muted-foreground">Airport Terminal - 1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default MyBookingsDashboard;
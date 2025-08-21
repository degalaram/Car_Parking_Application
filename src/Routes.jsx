import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SlotSelectionBooking from './pages/slot-selection-booking';
import LocationSearchMap from './pages/location-search-map';
import MyBookingsDashboard from './pages/my-bookings-dashboard';
import BookingConfirmationPayment from './pages/booking-confirmation-payment';
import UserAuthentication from './pages/user-authentication';
import FacilityDetailsFloorSelection from './pages/facility-details-floor-selection';
import Profile from './pages/profile';
import Home from './pages/home';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<UserAuthentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="/slot-selection-booking" element={<SlotSelectionBooking />} />
        <Route path="/location-search-map" element={<LocationSearchMap />} />
        <Route path="/my-bookings-dashboard" element={<MyBookingsDashboard />} />
        <Route path="/booking-confirmation-payment" element={<BookingConfirmationPayment />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/facility-details-floor-selection" element={<FacilityDetailsFloorSelection />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useSidebar } from './SidebarContext';

const BookingProgressHeader = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { toggle } = useSidebar();

  const bookingSteps = [
    {
      path: '/slot-selection-booking',
      label: 'Select Slot',
      step: 1
    },
    {
      path: '/booking-confirmation-payment',
      label: 'Payment',
      step: 2
    }
  ];

  const getCurrentStep = () => {
    const currentStep = bookingSteps?.find(step => step?.path === location?.pathname);
    return currentStep ? currentStep?.step : 1;
  };

  const handleBack = () => {
    const currentStep = getCurrentStep();
    if (currentStep === 2) {
      navigate('/slot-selection-booking');
    } else {
      navigate('/facility-details-floor-selection');
    }
  };

  const handleCancel = () => {
    navigate('/location-search-map');
  };

  const currentStepNumber = getCurrentStep();
  const totalSteps = bookingSteps?.length;

  return (
    <header className={`bg-card border-b border-border sticky top-0 z-80 ${className}`}>
      <div className="container-app">
        <div className="flex items-center justify-between py-4">
          {/* Back Button and Progress */}
          <div className="flex items-center gap-4">
            {/* Sidebar toggle (desktop) */}
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle sidebar"
              className="hidden lg:inline-flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Icon name="Menu" size={20} />
            </button>
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

            {/* Progress Indicator - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {bookingSteps?.map((step, index) => (
                <div key={step?.path} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 ${
                    step?.step <= currentStepNumber ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step?.step < currentStepNumber 
                        ? 'bg-primary text-primary-foreground' 
                        : step?.step === currentStepNumber
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step?.step < currentStepNumber ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        step?.step
                      )}
                    </div>
                    <span className="font-medium">{step?.label}</span>
                  </div>
                  {index < bookingSteps?.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step?.step < currentStepNumber ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Progress Indicator - Mobile */}
            <div className="md:hidden flex items-center gap-2">
              <div className="text-sm font-medium text-foreground">
                Step {currentStepNumber} of {totalSteps}
              </div>
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(currentStepNumber / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="text-muted-foreground hover:text-destructive"
          >
            Cancel
          </Button>
        </div>
      </div>
    </header>
  );
};

export default BookingProgressHeader;
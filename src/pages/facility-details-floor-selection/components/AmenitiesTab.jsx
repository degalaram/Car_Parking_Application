import React from 'react';
import Icon from '../../../components/AppIcon';

const AmenitiesTab = ({ facility }) => {
  const securityFeatures = [
    { icon: 'Shield', label: '24/7 Security Guards', available: true },
    { icon: 'Camera', label: 'CCTV Surveillance', available: true },
    { icon: 'Lock', label: 'Secure Entry/Exit', available: true },
    { icon: 'AlertTriangle', label: 'Emergency Assistance', available: true },
    { icon: 'Eye', label: 'Motion Sensors', available: facility?.hasMotionSensors },
    { icon: 'Bell', label: 'Alarm System', available: facility?.hasAlarmSystem }
  ];

  const paymentOptions = [
    { icon: 'CreditCard', label: 'Credit/Debit Cards', available: true },
    { icon: 'Smartphone', label: 'Mobile Payments', available: true },
    { icon: 'QrCode', label: 'QR Code Payments', available: true },
    { icon: 'DollarSign', label: 'Cash Payments', available: true },
    { icon: 'Wallet', label: 'Digital Wallets', available: true },
    { icon: 'Coins', label: 'Contactless Payments', available: true }
  ];

  const accessibilityFeatures = [
    { icon: 'Accessibility', label: 'Wheelchair Accessible', available: facility?.isWheelchairAccessible },
    { icon: 'Car', label: 'Disabled Parking Spots', available: facility?.hasDisabledSpots },
    { icon: 'Elevator', label: 'Elevator Access', available: facility?.hasElevator },
    { icon: 'Users', label: 'Wide Parking Spaces', available: facility?.hasWideSpaces },
    { icon: 'Volume2', label: 'Audio Assistance', available: facility?.hasAudioAssistance },
    { icon: 'Eye', label: 'Visual Indicators', available: facility?.hasVisualIndicators }
  ];

  const additionalServices = [
    { icon: 'Zap', label: 'EV Charging Stations', available: facility?.hasEVCharging, description: '4 fast charging ports available' },
    { icon: 'Car', label: 'Valet Parking', available: facility?.hasValet, description: 'Professional valet service' },
    { icon: 'Wrench', label: 'Car Wash Service', available: facility?.hasCarWash, description: 'On-site car cleaning' },
    { icon: 'Coffee', label: 'Waiting Area', available: facility?.hasWaitingArea, description: 'Comfortable seating with refreshments' },
    { icon: 'Wifi', label: 'Free WiFi', available: facility?.hasWifi, description: 'High-speed internet access' },
    { icon: 'ShoppingBag', label: 'Nearby Shopping', available: true, description: 'Mall and shops within walking distance' }
  ];

  const FeatureGrid = ({ title, features, showDescription = false }) => (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features?.map((feature, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-4 rounded-lg border ${
              feature?.available
                ? 'border-success/20 bg-success/5' :'border-border bg-muted'
            }`}
          >
            <Icon
              name={feature?.icon}
              size={20}
              className={feature?.available ? 'text-success' : 'text-muted-foreground'}
            />
            <div className="flex-1">
              <div className={`font-medium ${
                feature?.available ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {feature?.label}
              </div>
              {showDescription && feature?.description && (
                <div className="text-sm text-muted-foreground mt-1">
                  {feature?.description}
                </div>
              )}
            </div>
            {feature?.available && (
              <Icon name="Check" size={16} className="text-success" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <FeatureGrid title="Security Features" features={securityFeatures} />
      <FeatureGrid title="Payment Options" features={paymentOptions} />
      <FeatureGrid title="Accessibility" features={accessibilityFeatures} />
      <FeatureGrid title="Additional Services" features={additionalServices} showDescription={true} />

      {/* Facility Certifications */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Certifications & Compliance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border p-4 rounded-lg text-center">
            <Icon name="Award" size={32} className="text-primary mx-auto mb-2" />
            <div className="font-medium text-foreground">ISO 9001</div>
            <div className="text-sm text-muted-foreground">Quality Management</div>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg text-center">
            <Icon name="Shield" size={32} className="text-success mx-auto mb-2" />
            <div className="font-medium text-foreground">Security Certified</div>
            <div className="text-sm text-muted-foreground">Advanced Security Standards</div>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg text-center">
            <Icon name="Leaf" size={32} className="text-accent mx-auto mb-2" />
            <div className="font-medium text-foreground">Green Building</div>
            <div className="text-sm text-muted-foreground">Eco-Friendly Certified</div>
          </div>
        </div>
      </div>

      {/* Operating Standards */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Operating Standards</h3>
        <div className="bg-muted p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Safety Protocols</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  Regular safety inspections
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  Fire safety compliance
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  Emergency evacuation plans
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  First aid facilities
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Service Standards</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  24/7 customer support
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  Regular maintenance schedule
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  Clean and well-lit environment
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  Professional staff training
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesTab;
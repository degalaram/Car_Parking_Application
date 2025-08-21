import React from 'react';
import Icon from '../../../components/AppIcon';

const OverviewTab = ({ facility }) => {
  const features = [
    { icon: 'Shield', label: '24/7 Security', available: true },
    { icon: 'Camera', label: 'CCTV Monitoring', available: true },
    { icon: 'Zap', label: 'EV Charging', available: facility?.hasEVCharging },
    { icon: 'Wifi', label: 'Free WiFi', available: facility?.hasWifi },
    { icon: 'Car', label: 'Valet Service', available: facility?.hasValet },
    { icon: 'Umbrella', label: 'Covered Parking', available: facility?.isCovered }
  ];

  const paymentMethods = [
    { icon: 'CreditCard', label: 'Credit/Debit Cards' },
    { icon: 'Smartphone', label: 'Mobile Payments' },
    { icon: 'DollarSign', label: 'Cash' },
    { icon: 'Wallet', label: 'Digital Wallets' }
  ];

  return (
    <div className="space-y-8">
      {/* Pricing Structure */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Hourly Rate</div>
            <div className="text-xl font-bold text-foreground">₹{facility?.hourlyRate}</div>
            <div className="text-sm text-success">First hour</div>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Daily Rate</div>
            <div className="text-xl font-bold text-foreground">₹{facility?.dailyRate}</div>
            <div className="text-sm text-success">Up to 24 hours</div>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Monthly Pass</div>
            <div className="text-xl font-bold text-foreground">₹{facility?.monthlyRate}</div>
            <div className="text-sm text-success">Unlimited access</div>
          </div>
        </div>
      </div>
      {/* Operating Hours */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Operating Hours</h3>
        <div className="bg-muted p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-foreground mb-2">Weekdays</div>
              <div className="text-sm text-muted-foreground">{facility?.weekdayHours}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground mb-2">Weekends</div>
              <div className="text-sm text-muted-foreground">{facility?.weekendHours}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Features & Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features?.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                feature?.available ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
              }`}
            >
              <Icon name={feature?.icon} size={20} />
              <span className="text-sm font-medium">{feature?.label}</span>
              {feature?.available && <Icon name="Check" size={16} className="ml-auto" />}
            </div>
          ))}
        </div>
      </div>
      {/* Payment Methods */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Payment Methods</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {paymentMethods?.map((method, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Icon name={method?.icon} size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">{method?.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
        <div className="bg-muted p-4 rounded-lg space-y-3">
          <div className="flex items-center gap-3">
            <Icon name="Phone" size={20} className="text-primary" />
            <span className="text-sm text-foreground">{facility?.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="Mail" size={20} className="text-primary" />
            <span className="text-sm text-foreground">{facility?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="Globe" size={20} className="text-primary" />
            <span className="text-sm text-foreground">{facility?.website}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
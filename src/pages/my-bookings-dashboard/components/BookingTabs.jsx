import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingTabs = ({ activeTab, onTabChange, bookingCounts }) => {
  const tabs = [
    {
      id: 'active',
      label: 'Active',
      icon: 'Clock',
      count: bookingCounts?.active || 0
    },
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: 'Calendar',
      count: bookingCounts?.upcoming || 0
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: 'CheckCircle',
      count: bookingCounts?.completed || 0
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-1">
      <div className="flex">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-micro ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon 
              name={tab?.icon} 
              size={16} 
              className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-muted-foreground'}
            />
            <span className="font-medium">{tab?.label}</span>
            {tab?.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                activeTab === tab?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingTabs;
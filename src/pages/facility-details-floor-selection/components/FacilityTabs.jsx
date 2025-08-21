import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const FacilityTabs = ({ facility, activeTab, onTabChange, children }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'floors', label: 'Floors', icon: 'Building' },
    { id: 'amenities', label: 'Amenities', icon: 'Star' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' }
  ];

  return (
    <div className="bg-card">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="container-app">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => onTabChange(tab?.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                {tab?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Tab Content */}
      <div className="container-app py-6">
        {children}
      </div>
    </div>
  );
};

export default FacilityTabs;
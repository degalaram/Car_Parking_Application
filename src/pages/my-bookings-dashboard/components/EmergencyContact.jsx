import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const emergencyContacts = [
    {
      type: 'Security',
      phone: '+1-800-PARK-911',
      description: 'For security emergencies and vehicle issues'
    },
    {
      type: 'Support',
      phone: '+1-800-PARK-HELP',
      description: 'For booking and payment assistance'
    },
    {
      type: 'Facility',
      phone: '+1-800-FACILITY',
      description: 'Direct facility management contact'
    }
  ];

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <Button
        variant="outline"
        onClick={() => setIsExpanded(!isExpanded)}
        iconName="Phone"
        iconPosition="left"
        className="w-full justify-between"
      >
        Emergency Contact
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground"
        />
      </Button>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {emergencyContacts?.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{contact?.type}</h4>
                <p className="text-sm text-muted-foreground">{contact?.description}</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleCall(contact?.phone)}
                iconName="Phone"
                className="ml-3"
              >
                Call
              </Button>
            </div>
          ))}
          
          <div className="text-center pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Available 24/7 for emergency assistance
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContact;
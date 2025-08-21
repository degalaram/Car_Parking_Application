import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingTermsSection = ({ onTermsAcceptance, termsAccepted }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const termsData = {
    facilityRules: {
      title: "Facility Rules & Guidelines",
      icon: "Building",
      items: [
        "Vehicle must match the registered type during booking",
        "Maximum vehicle height: 6.5 feet for standard slots",
        "No overnight parking beyond booked duration",
        "Follow designated entry and exit routes",
        "Keep parking receipt visible on dashboard",
        "Report any damages or incidents immediately",
        "No smoking or open flames in parking areas",
        "Maintain cleanliness and dispose waste properly"
      ]
    },
    cancellationPolicy: {
      title: "Cancellation & Modification Policy",
      icon: "Calendar",
      items: [
        "Free cancellation up to 2 hours before check-in time",
        "50% refund for cancellations within 2 hours of check-in",
        "No refund for no-shows or late cancellations",
        "Modifications allowed up to 1 hour before check-in",
        "Extension requests subject to slot availability",
        "Refunds processed within 3-5 business days",
        "Cancellation fees may apply during peak hours",
        "Emergency cancellations reviewed case-by-case"
      ]
    },
    liabilityTerms: {
      title: "Liability & Insurance Terms",
      icon: "Shield",
      items: [
        "Facility not responsible for vehicle damage or theft",
        "Users advised to maintain comprehensive vehicle insurance",
        "Report incidents to facility management immediately",
        "CCTV monitoring for security purposes only",
        "Users liable for damages to facility property",
        "Emergency contact information must be accurate",
        "Facility reserves right to tow unauthorized vehicles",
        "Users responsible for personal belongings in vehicle"
      ]
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const contactInfo = {
    phone: "+1 (555) 123-4567",
    email: "support@parkslotpro.com",
    emergency: "+1 (555) 911-PARK"
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Terms & Conditions</h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="FileText" size={16} />
          <span className="text-xs">Last updated: Jan 15, 2025</span>
        </div>
      </div>
      {/* Expandable Terms Sections */}
      <div className="space-y-3">
        {Object.entries(termsData)?.map(([key, section]) => (
          <div key={key} className="border border-border rounded-lg">
            <button
              onClick={() => toggleSection(key)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon name={section?.icon} size={20} className="text-primary" />
                <span className="font-medium text-foreground">{section?.title}</span>
              </div>
              <Icon 
                name={expandedSection === key ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground"
              />
            </button>
            
            {expandedSection === key && (
              <div className="px-4 pb-4 border-t border-border">
                <ul className="space-y-2 mt-3">
                  {section?.items?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Contact Information */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-foreground flex items-center gap-2">
          <Icon name="Phone" size={16} className="text-primary" />
          Contact Information
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="space-y-1">
            <span className="text-muted-foreground">Support</span>
            <p className="font-medium text-foreground">{contactInfo?.phone}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Email</span>
            <p className="font-medium text-foreground">{contactInfo?.email}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Emergency</span>
            <p className="font-medium text-destructive">{contactInfo?.emergency}</p>
          </div>
        </div>
      </div>
      {/* Terms Acceptance */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label="I have read and agree to the Terms & Conditions"
          description="By checking this box, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions."
          checked={termsAccepted}
          onChange={(e) => onTermsAcceptance(e?.target?.checked)}
          required
        />
        
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
          <p>
            Your booking is subject to availability and confirmation. You will receive a confirmation email 
            with your booking details and QR code for facility access.
          </p>
        </div>
      </div>
      {/* Trust Signals */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Icon name="Award" size={16} className="text-warning" />
          <span className="text-xs text-muted-foreground">Booking Guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-primary" />
          <span className="text-xs text-muted-foreground">24/7 Support</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="RefreshCw" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">Easy Modifications</span>
        </div>
      </div>
    </div>
  );
};

export default BookingTermsSection;
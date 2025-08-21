import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-8 pt-6 border-t border-border">
      {/* SSL Badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs font-medium text-success">SSL Secured</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
          <Icon name="Lock" size={16} className="text-primary" />
          <span className="text-xs font-medium text-primary">256-bit Encryption</span>
        </div>
      </div>

      {/* Trust Features */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Users" size={16} className="text-accent" />
          </div>
          <p className="text-xs text-muted-foreground">50K+ Users</p>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Star" size={16} className="text-warning" />
          </div>
          <p className="text-xs text-muted-foreground">4.8 Rating</p>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Clock" size={16} className="text-success" />
          </div>
          <p className="text-xs text-muted-foreground">24/7 Support</p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-xs">
          <button className="text-muted-foreground hover:text-primary transition-micro">
            Privacy Policy
          </button>
          <span className="text-border">•</span>
          <button className="text-muted-foreground hover:text-primary transition-micro">
            Terms of Service
          </button>
          <span className="text-border">•</span>
          <button className="text-muted-foreground hover:text-primary transition-micro">
            Help Center
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          © {currentYear} ParkSlot Pro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;
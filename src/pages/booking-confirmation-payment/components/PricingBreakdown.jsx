import React from 'react';
import Icon from '../../../components/AppIcon';

const PricingBreakdown = ({ pricingData }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Pricing Breakdown</h3>
        <div className="flex items-center gap-1 text-success">
          <Icon name="Percent" size={16} />
          <span className="text-sm font-medium">Best Price</span>
        </div>
      </div>
      <div className="space-y-3">
        {/* Base Rate */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Base Rate ({pricingData?.duration})</span>
          </div>
          <span className="text-sm font-medium text-foreground">₹{pricingData?.baseRate?.toFixed(0)}</span>
        </div>

        {/* Time-based Adjustments */}
        {pricingData?.timeAdjustment !== 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Peak Hours Adjustment</span>
            </div>
            <span className={`text-sm font-medium ${pricingData?.timeAdjustment > 0 ? 'text-warning' : 'text-success'}`}>
              {pricingData?.timeAdjustment > 0 ? '+' : ''}₹{pricingData?.timeAdjustment?.toFixed(0)}
            </span>
          </div>
        )}

        {/* Vehicle Type Fee */}
        {pricingData?.vehicleFee > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Car" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Vehicle Type Fee</span>
            </div>
            <span className="text-sm font-medium text-foreground">+₹{pricingData?.vehicleFee?.toFixed(0)}</span>
          </div>
        )}

        {/* Discounts */}
        {pricingData?.discounts?.map((discount, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Tag" size={16} className="text-success" />
              <span className="text-sm text-foreground">{discount?.name}</span>
            </div>
            <span className="text-sm font-medium text-success">-${discount?.amount?.toFixed(2)}</span>
          </div>
        ))}

        {/* Subtotal */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Subtotal</span>
            <span className="text-sm font-medium text-foreground">₹{pricingData?.subtotal?.toFixed(0)}</span>
          </div>
        </div>

        {/* Taxes & Fees */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Receipt" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Service Fee</span>
            </div>
            <span className="text-sm text-muted-foreground">₹{pricingData?.serviceFee?.toFixed(0)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Calculator" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Tax ({pricingData?.taxRate}%)</span>
            </div>
            <span className="text-sm text-muted-foreground">₹{pricingData?.tax?.toFixed(0)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">Total Amount</span>
            <span className="text-lg font-bold text-primary">₹{pricingData?.total?.toFixed(0)}</span>
          </div>
        </div>

        {/* Savings Highlight */}
        {pricingData?.totalSavings > 0 && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                You saved ₹{pricingData?.totalSavings?.toFixed(0)} with this booking!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingBreakdown;
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const PricingCalculator = ({ 
  selectedSlot,
  vehicleType,
  duration,
  dateTime,
  onPriceChange,
  className = '' 
}) => {
  const [pricingBreakdown, setPricingBreakdown] = useState(null);
  const [appliedDiscounts, setAppliedDiscounts] = useState([]);

  // Base pricing rates for different vehicle types
  const basePricing = {
    'two-wheeler': {
      hourly: 25, // ₹/hour for bikes/scooters
      daily: 200
    },
    'four-wheeler': {
      hourly: 50, // ₹/hour for cars/SUVs
      daily: 400
    },
    'both': {
      hourly: 50, // Default to car pricing
      daily: 400
    }
  };

  // Time-based multipliers
  const timeMultipliers = {
    peak: 1.5,      // 8 AM - 10 AM, 5 PM - 8 PM
    normal: 1.0,    // 10 AM - 5 PM
    offPeak: 0.8    // 8 PM - 8 AM
  };

  // Available discounts
  const availableDiscounts = [
    {
      id: 'early-bird',
      name: 'Early Bird Discount',
      description: 'Book before 8 AM',
      percentage: 15,
      condition: (dateTime) => {
        const hour = new Date(`${dateTime?.date}T${dateTime?.time}`)?.getHours();
        return hour < 8;
      }
    },
    {
      id: 'long-duration',
      name: 'Long Duration Discount',
      description: '6+ hours booking',
      percentage: 20,
      condition: (duration) => duration >= 6
    },
    {
      id: 'weekend-special',
      name: 'Weekend Special',
      description: 'Weekend bookings',
      percentage: 10,
      condition: (dateTime) => {
        const day = new Date(`${dateTime?.date}T${dateTime?.time}`)?.getDay();
        return day === 0 || day === 6; // Sunday or Saturday
      }
    },
    {
      id: 'off-peak',
      name: 'Off-Peak Hours',
      description: 'After 8 PM or before 8 AM',
      percentage: 25,
      condition: (dateTime) => {
        const hour = new Date(`${dateTime?.date}T${dateTime?.time}`)?.getHours();
        return hour >= 20 || hour < 8;
      }
    }
  ];

  // Calculate time category
  const getTimeCategory = (dateTime) => {
    if (!dateTime) return 'normal';
    const hour = new Date(`${dateTime.date}T${dateTime.time}`)?.getHours();
    
    if ((hour >= 8 && hour < 10) || (hour >= 17 && hour < 20)) {
      return 'peak';
    } else if (hour >= 20 || hour < 8) {
      return 'offPeak';
    }
    return 'normal';
  };

  // Calculate pricing
  useEffect(() => {
    if (!vehicleType || !duration || !dateTime) {
      setPricingBreakdown(null);
      return;
    }

    const baseRate = basePricing?.[vehicleType]?.hourly || 25;
    const timeCategory = getTimeCategory(dateTime);
    const timeMultiplier = timeMultipliers?.[timeCategory];
    
    // Calculate base cost
    let baseCost = baseRate * duration;
    
    // Apply time multiplier
    const timeAdjustedCost = baseCost * timeMultiplier;
    
    // Check applicable discounts
    const applicableDiscounts = availableDiscounts?.filter(discount => {
      if (discount?.id === 'long-duration') return discount?.condition(duration);
      if (discount?.id === 'early-bird' || discount?.id === 'weekend-special' || discount?.id === 'off-peak') {
        return discount?.condition(dateTime);
      }
      return false;
    });

    // Calculate discount amount
    let totalDiscountPercentage = 0;
    applicableDiscounts?.forEach(discount => {
      totalDiscountPercentage += discount?.percentage;
    });
    
    // Cap discount at 50%
    totalDiscountPercentage = Math.min(totalDiscountPercentage, 50);
    
    const discountAmount = (timeAdjustedCost * totalDiscountPercentage) / 100;
    const finalCost = timeAdjustedCost - discountAmount;
    
    // Service fee and taxes (fixed rates for consistency)
    const serviceFee = Math.round(finalCost * 0.05); // 5% service fee, rounded
    const taxes = Math.round((finalCost + serviceFee) * 0.18); // 18% GST, rounded
    const totalCost = finalCost + serviceFee + taxes;

    const breakdown = {
      baseRate,
      baseCost,
      timeCategory,
      timeMultiplier,
      timeAdjustedCost,
      applicableDiscounts,
      totalDiscountPercentage,
      discountAmount,
      subtotal: finalCost,
      serviceFee,
      taxes,
      totalCost,
      savings: baseCost - finalCost
    };

    setPricingBreakdown(breakdown);
    setAppliedDiscounts(applicableDiscounts);
    onPriceChange(breakdown);
  }, [selectedSlot, vehicleType, duration, dateTime, onPriceChange]);

  if (!pricingBreakdown) {
    return (
      <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Calculator" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Pricing Calculator</h3>
        </div>
        <div className="text-center text-muted-foreground py-8">
          Select vehicle type, time, and duration to see pricing details
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getTimeCategoryLabel = (category) => {
    switch (category) {
      case 'peak': return 'Peak Hours';
      case 'offPeak': return 'Off-Peak Hours';
      default: return 'Normal Hours';
    }
  };

  const getTimeCategoryColor = (category) => {
    switch (category) {
      case 'peak': return 'text-destructive';
      case 'offPeak': return 'text-success';
      default: return 'text-foreground';
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Icon name="Calculator" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Pricing Calculator</h3>
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-4">
          {/* Base Cost */}
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-foreground">Base Rate</div>
              <div className="text-sm text-muted-foreground">
                {formatCurrency(pricingBreakdown?.baseRate)}/hour × {duration} hours
              </div>
            </div>
            <div className="font-medium text-foreground">
              {formatCurrency(pricingBreakdown?.baseCost)}
            </div>
          </div>

          {/* Time Adjustment */}
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-foreground">Time Adjustment</div>
              <div className={`text-sm ${getTimeCategoryColor(pricingBreakdown?.timeCategory)}`}>
                {getTimeCategoryLabel(pricingBreakdown?.timeCategory)} 
                ({pricingBreakdown?.timeMultiplier}x)
              </div>
            </div>
            <div className={`font-medium ${getTimeCategoryColor(pricingBreakdown?.timeCategory)}`}>
              {pricingBreakdown?.timeMultiplier > 1 ? '+' : ''}
              {formatCurrency(pricingBreakdown?.timeAdjustedCost - pricingBreakdown?.baseCost)}
            </div>
          </div>

          {/* Discounts */}
          {appliedDiscounts?.length > 0 && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Tag" size={16} className="text-success" />
                <span className="font-medium text-success">Applied Discounts</span>
              </div>
              <div className="space-y-1">
                {appliedDiscounts?.map((discount) => (
                  <div key={discount?.id} className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium text-success">{discount?.name}</div>
                      <div className="text-success/80">{discount?.description}</div>
                    </div>
                    <div className="font-medium text-success">
                      -{discount?.percentage}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-success/20">
                <span className="font-medium text-success">Total Discount</span>
                <span className="font-medium text-success">
                  -{formatCurrency(pricingBreakdown?.discountAmount)}
                </span>
              </div>
            </div>
          )}

          {/* Subtotal */}
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <div className="font-medium text-foreground">Subtotal</div>
            <div className="font-medium text-foreground">
              {formatCurrency(pricingBreakdown?.subtotal)}
            </div>
          </div>

          {/* Service Fee */}
          <div className="flex justify-between items-center text-sm">
            <div className="text-muted-foreground">Service Fee (5%)</div>
            <div className="text-muted-foreground">
              {formatCurrency(pricingBreakdown?.serviceFee)}
            </div>
          </div>

          {/* Taxes */}
          <div className="flex justify-between items-center text-sm">
            <div className="text-muted-foreground">GST (18%)</div>
            <div className="text-muted-foreground">
              {formatCurrency(pricingBreakdown?.taxes)}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-3 border-t border-border">
            <div className="text-lg font-semibold text-foreground">Total Amount</div>
            <div className="text-lg font-semibold text-primary">
              {formatCurrency(pricingBreakdown?.totalCost)}
            </div>
          </div>

          {/* Savings */}
          {pricingBreakdown?.savings > 0 && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={16} className="text-success" />
                  <span className="font-medium text-success">You're saving</span>
                </div>
                <span className="font-semibold text-success">
                  {formatCurrency(pricingBreakdown?.savings)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Alternative Pricing */}
        <div className="bg-muted/20 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">Compare with other durations</h4>
          <div className="space-y-2 text-sm">
            {[1, 2, 4, 8]?.filter(d => d !== duration)?.map((altDuration) => {
              const altCost = pricingBreakdown?.baseRate * altDuration * pricingBreakdown?.timeMultiplier;
              const altTotal = altCost * 1.23; // Approximate with fees and taxes
              return (
                <div key={altDuration} className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {altDuration} {altDuration === 1 ? 'hour' : 'hours'}
                  </span>
                  <span className="text-foreground">
                    {formatCurrency(altTotal)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
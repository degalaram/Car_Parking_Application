import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentMethodSection = ({ onPaymentMethodChange, selectedMethod }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    saveCard: false
  });

  const [errors, setErrors] = useState({});

  const savedCards = [
    {
      id: 'card_1',
      type: 'visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 'card_2',
      type: 'mastercard',
      last4: '8888',
      expiry: '08/25',
      isDefault: false
    }
  ];

  const digitalWallets = [
    { id: 'apple_pay', name: 'Apple Pay', icon: 'Smartphone', available: true },
    { id: 'google_pay', name: 'Google Pay', icon: 'Smartphone', available: true },
    { id: 'paypal', name: 'PayPal', icon: 'CreditCard', available: true }
  ];

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateCardDetails = () => {
    const newErrors = {};
    
    if (!cardDetails?.number || cardDetails?.number?.length < 16) {
      newErrors.number = 'Please enter a valid card number';
    }
    if (!cardDetails?.expiry || !/^\d{2}\/\d{2}$/?.test(cardDetails?.expiry)) {
      newErrors.expiry = 'Please enter expiry in MM/YY format';
    }
    if (!cardDetails?.cvv || cardDetails?.cvv?.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    if (!cardDetails?.name?.trim()) {
      newErrors.name = 'Please enter cardholder name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value?.replace(/\D/g, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa': return 'CreditCard';
      case 'mastercard': return 'CreditCard';
      default: return 'CreditCard';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Payment Method</h3>
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-success font-medium">Secure Payment</span>
        </div>
      </div>
      {/* Saved Cards */}
      {savedCards?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Saved Cards</h4>
          <div className="space-y-2">
            {savedCards?.map((card) => (
              <label key={card?.id} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={card?.id}
                  checked={selectedMethod === card?.id}
                  onChange={(e) => onPaymentMethodChange(e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-6 bg-muted rounded flex items-center justify-center">
                    <Icon name={getCardIcon(card?.type)} size={16} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">•••• •••• •••• {card?.last4}</span>
                      {card?.isDefault && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">Expires {card?.expiry}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
      {/* New Card */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="paymentMethod"
            value="new_card"
            checked={selectedMethod === 'new_card'}
            onChange={(e) => onPaymentMethodChange(e?.target?.value)}
            className="w-4 h-4 text-primary"
          />
          <h4 className="text-sm font-medium text-foreground">Add New Card</h4>
        </div>
        
        {selectedMethod === 'new_card' && (
          <div className="pl-7 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Card Number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails?.number}
                onChange={(e) => handleCardInputChange('number', formatCardNumber(e?.target?.value))}
                error={errors?.number}
                maxLength={19}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails?.expiry}
                  onChange={(e) => handleCardInputChange('expiry', formatExpiry(e?.target?.value))}
                  error={errors?.expiry}
                  maxLength={5}
                />
                <Input
                  label="CVV"
                  type="text"
                  placeholder="123"
                  value={cardDetails?.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e?.target?.value?.replace(/\D/g, ''))}
                  error={errors?.cvv}
                  maxLength={4}
                />
              </div>
              
              <Input
                label="Cardholder Name"
                type="text"
                placeholder="John Doe"
                value={cardDetails?.name}
                onChange={(e) => handleCardInputChange('name', e?.target?.value)}
                error={errors?.name}
              />
            </div>
            
            <Checkbox
              label="Save this card for future payments"
              checked={cardDetails?.saveCard}
              onChange={(e) => handleCardInputChange('saveCard', e?.target?.checked)}
            />
          </div>
        )}
      </div>
      {/* Digital Wallets */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Digital Wallets</h4>
        <div className="space-y-2">
          {digitalWallets?.map((wallet) => (
            <label key={wallet?.id} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value={wallet?.id}
                checked={selectedMethod === wallet?.id}
                onChange={(e) => onPaymentMethodChange(e?.target?.value)}
                className="w-4 h-4 text-primary"
                disabled={!wallet?.available}
              />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={wallet?.icon} size={16} className="text-muted-foreground" />
                </div>
                <span className={`text-sm font-medium ${wallet?.available ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {wallet?.name}
                </span>
                {!wallet?.available && (
                  <span className="text-xs text-muted-foreground">(Not available)</span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">PCI Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">256-bit Security</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSection;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    vehicleType: '',
    vehicleModel: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const vehicleTypeOptions = [
    { value: 'two-wheeler', label: 'Two Wheeler (Bike/Scooter)' },
    { value: 'four-wheeler', label: 'Four Wheeler (Car/SUV)' },
    { value: 'both', label: 'Both Types' }
  ];

  const vehicleModelOptions = [
    { value: 'honda-activa', label: 'Honda Activa' },
    { value: 'bajaj-pulsar', label: 'Bajaj Pulsar' },
    { value: 'yamaha-fz', label: 'Yamaha FZ' },
    { value: 'maruti-swift', label: 'Maruti Swift' },
    { value: 'hyundai-creta', label: 'Hyundai Creta' },
    { value: 'mahindra-xuv', label: 'Mahindra XUV' },
    { value: 'tata-nexon', label: 'Tata Nexon' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.vehicleType) {
      newErrors.vehicleType = 'Please select your vehicle type';
    }
    
    if (!formData?.vehicleModel) {
      newErrors.vehicleModel = 'Please select your vehicle model';
    }
    
    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Successful registration - store user data but don't mark as authenticated yet
      localStorage.setItem('userEmail', formData?.email);
      localStorage.setItem('userName', formData?.fullName);
      localStorage.setItem('userVehicle', formData?.vehicleType);
      localStorage.setItem('tempPassword', formData?.password); // Store password temporarily for demo
      localStorage.setItem('registrationSuccess', 'true');
      
      // Show success message and redirect to login page
      setIsLoading(false);
      navigate('/user-authentication');
    }, 300); // Reduced to 300ms for faster response
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        value={formData?.fullName}
        onChange={handleInputChange}
        placeholder="Enter your full name"
        error={errors?.fullName}
        required
        className="mb-4"
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="Enter your email address"
        error={errors?.email}
        required
        className="mb-4"
      />
      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData?.phone}
        onChange={handleInputChange}
        placeholder="Enter your phone number"
        error={errors?.phone}
        required
        className="mb-4"
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          placeholder="Create a strong password"
          error={errors?.password}
          required
          className="mb-4"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          error={errors?.confirmPassword}
          required
          className="mb-4"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <Select
        label="Vehicle Type"
        options={vehicleTypeOptions}
        value={formData?.vehicleType}
        onChange={(value) => handleSelectChange('vehicleType', value)}
        placeholder="Select your vehicle type"
        error={errors?.vehicleType}
        required
        className="mb-4"
      />
      <Select
        label="Vehicle Model"
        options={vehicleModelOptions}
        value={formData?.vehicleModel}
        onChange={(value) => handleSelectChange('vehicleModel', value)}
        placeholder="Select your vehicle model"
        error={errors?.vehicleModel}
        required
        searchable
        className="mb-4"
      />
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        name="acceptTerms"
        checked={formData?.acceptTerms}
        onChange={handleInputChange}
        error={errors?.acceptTerms}
        required
        className="mb-4"
      />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
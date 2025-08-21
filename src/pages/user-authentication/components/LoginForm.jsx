import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onForgotPassword }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demo + check for newly registered users
  const mockCredentials = {
    email: 'demo@parkslotpro.com',
    password: 'demo123'
  };

  // Check if user just registered
  const checkNewUserCredentials = () => {
    const userEmail = localStorage.getItem('userEmail');
    
    if (userEmail && formData.email === userEmail) {
      // This is a newly registered user, allow login with any password for demo
      return true;
    }
    
    return false;
  };

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Successful login with demo credentials
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        navigate('/home');
      } else if (checkNewUserCredentials()) {
        // Successful login for newly registered user
        localStorage.setItem('isAuthenticated', 'true');
        // Clear temporary password
        localStorage.removeItem('tempPassword');
        navigate('/home');
      } else {
        // Invalid credentials
        setErrors({
          email: 'Invalid email or password. Use demo@parkslotpro.com / demo123',
          password: 'Invalid email or password. Use demo@parkslotpro.com / demo123'
        });
      }
      setIsLoading(false);
    }, 200); // Reduced to 200ms for immediate response
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email or Phone"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="Enter your email address"
        error={errors?.email}
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
          placeholder="Enter your password"
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
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
        />
        
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-micro"
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        Sign In
      </Button>
      {/* Demo credentials hint */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          Demo credentials: demo@parkslotpro.com / demo123
        </p>
        {localStorage.getItem('userEmail') && (
          <p className="text-xs text-primary text-center mt-2">
            💡 Use the email you registered with and any password to login
          </p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
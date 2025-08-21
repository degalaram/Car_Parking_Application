import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import TrustSignals from './components/TrustSignals';

const UserAuthentication = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);

  // Check if user just registered
  useEffect(() => {
    const registrationSuccess = localStorage.getItem('registrationSuccess');
    if (registrationSuccess === 'true') {
      setShowRegistrationSuccess(true);
      setActiveTab('login');
      localStorage.removeItem('registrationSuccess');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setShowRegistrationSuccess(false);
      }, 3000);
    }
  }, []);

  // Check if user just logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setShowLoginSuccess(true);
      // Redirect to home page after showing success message
      setTimeout(() => {
        setShowLoginSuccess(false);
        navigate('/home');
      }, 2000); // Reduced to 2 seconds for faster redirect
    }
  }, [navigate]);

  // Commented out automatic redirect for development/testing
  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem('isAuthenticated');
  //   if (isAuthenticated === 'true') {
  //     navigate('/location-search-map');
  //   }
  // }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container-app">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Car" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">ParkSlot Pro</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Smart Parking Solutions</p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <select className="text-sm bg-transparent border-none text-muted-foreground focus:outline-none">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            
            {/* Development Helper - Clear Auth State */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  localStorage.removeItem('user');
                  window.location.reload();
                }}
                className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded border border-border hover:border-foreground transition-colors"
                title="Clear authentication state (dev only)"
              >
                Clear Auth
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-app py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content (Desktop Only) */}
            <div className="hidden lg:block">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern parking facility with smart technology"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">Smart Parking Made Simple</h2>
                  <p className="text-white/90 max-w-md">
                    Find, reserve, and pay for parking spots in seconds. Join thousands of satisfied users.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Real-time Availability</h3>
                    <p className="text-xs text-muted-foreground">Live parking updates</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="CreditCard" size={20} className="text-success" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Secure Payments</h3>
                    <p className="text-xs text-muted-foreground">Multiple payment options</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-warning" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Instant Booking</h3>
                    <p className="text-xs text-muted-foreground">Reserve in seconds</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Smartphone" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Mobile Friendly</h3>
                    <p className="text-xs text-muted-foreground">Works on all devices</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Authentication Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
                {/* Mobile Hero */}
                <div className="lg:hidden text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Car" size={32} className="text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Welcome to ParkSlot Pro</h2>
                  <p className="text-muted-foreground text-sm">
                    Your smart parking solution starts here
                  </p>
                </div>

                {/* Development Notice */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800 text-center">
                      🚧 Development Mode: Login/Signup page always shows for testing
                    </p>
                  </div>
                )}

                {/* Registration Success Message */}
                {showRegistrationSuccess && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-pulse">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} color="white" />
                      </div>
                      <p className="text-sm font-medium text-green-800">
                        🎉 Registration successful! Please sign in with your credentials.
                      </p>
                    </div>
                  </div>
                )}

                {/* Login Success Message */}
                {showLoginSuccess && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-pulse">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} color="white" />
                      </div>
                      <p className="text-sm font-medium text-green-800">
                        ✅ Login successful! Redirecting to home page...
                      </p>
                    </div>
                  </div>
                )}

                {/* Auth Tabs */}
                <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

                {/* Auth Forms */}
                {activeTab === 'login' ? (
                  <LoginForm onForgotPassword={handleForgotPassword} />
                ) : (
                  <RegisterForm />
                )}

                {/* Social Login */}
                <div className="mt-6">
                  <SocialLogin />
                </div>

                {/* Trust Signals */}
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default UserAuthentication;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import AuthImagePattern from '../components/AuthImagePattern';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSigningUp) return;
    
    const success = validateForm();
    
    if (success === true) {
      console.log('Attempting signup with:', formData);
      await signup(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col">
      {/* Simple Navbar for SignUp Page - EXACT COPY from LoginPage */}
      <header className="bg-gradient-to-r from-slate-900/80 via-blue-900/80 to-slate-800/80 backdrop-blur-xl border-b border-white/10 fixed w-full top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-6 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section - Left */}
            <Link 
              to="/" 
              className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors duration-300">
                Conversa
              </h1>
            </Link>

            {/* Sign In Button - Right */}
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 bg-gradient-to-r from-white/12 to-white/8 backdrop-blur-md border border-white/20 rounded-xl hover:from-white/20 hover:to-white/15 hover:border-white/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Sign In</span>
              <span className="sm:hidden">Sign In</span>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content - EXACTLY AS IT WAS BEFORE */}
      <div className="flex-1 grid lg:grid-cols-2 pt-16">
        {/* Left Side - Sign Up Form */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="max-w-md w-full">
            {/* Subtle Background Decoration for Mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Main Card */}
            <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-white/70 text-lg">Join the Conversa community today</p>
              </div>

              {/* Sign Up Form - KEPT EXACTLY AS IT WAS */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name Field */}
                <div className="group">
                  <label htmlFor="fullName" className="block text-sm font-medium text-white/90 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={isSigningUp}
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSigningUp}
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isSigningUp}
                      className="w-full px-4 py-4 pr-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Create a secure password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      disabled={isSigningUp}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/40 hover:text-white/60 transition-colors duration-200 bg-transparent border-none outline-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                    isSigningUp
                      ? 'bg-white/15 text-white/60 cursor-not-allowed backdrop-blur-md'
                      : 'bg-white/90 text-slate-900 hover:bg-white hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl backdrop-blur-md'
                  }`}
                >
                  {isSigningUp ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Create Account</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-white/70 text-lg">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-semibold text-white hover:text-white/90 underline decoration-2 underline-offset-4 hover:decoration-white/60 transition-all duration-200"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            {/* Bottom decoration for mobile */}
            <div className="mt-6 text-center lg:hidden">
              <p className="text-white/50 text-sm">
                Powered by Conversa • © 2025 All rights reserved
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - AuthImagePattern */}
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones. Experience seamless communication with Conversa."
        />
      </div>
    </div>
  );
};

export default SignUpPage;
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { useSettingsStore } from './store/useSettingsStore';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { settings } = useSettingsStore();

  console.log(onlineUsers);

  // Initial auth check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Request notification permission when app loads and desktop notifications are enabled
  useEffect(() => {
    if (settings?.desktopNotifications && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(console.error);
    }
  }, [settings?.desktopNotifications]);

  // Apply language, direction, and RTL changes
  useEffect(() => {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    const currentLanguage = settings?.language || 'en';
    const isRTL = rtlLanguages.includes(currentLanguage);
    
    // Set document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Apply RTL class to body
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }

    // Apply font size and spacing based on language needs
    if (isRTL) {
      document.documentElement.style.setProperty('--text-direction', 'rtl');
      document.documentElement.style.setProperty('--start', 'right');
      document.documentElement.style.setProperty('--end', 'left');
    } else {
      document.documentElement.style.setProperty('--text-direction', 'ltr');
      document.documentElement.style.setProperty('--start', 'left');
      document.documentElement.style.setProperty('--end', 'right');
    }
  }, [settings?.language]);

  // Apply compact mode styling
  useEffect(() => {
    if (settings?.compactMode) {
      document.body.classList.add('compact-mode');
      document.documentElement.style.setProperty('--base-font-size', '14px');
      document.documentElement.style.setProperty('--base-spacing', '0.75rem');
      document.documentElement.style.setProperty('--base-padding', '0.5rem');
    } else {
      document.body.classList.remove('compact-mode');
      document.documentElement.style.setProperty('--base-font-size', '16px');
      document.documentElement.style.setProperty('--base-spacing', '1rem');
      document.documentElement.style.setProperty('--base-padding', '1rem');
    }
  }, [settings?.compactMode]);

  // Apply online status visibility
  useEffect(() => {
    if (settings?.showOnlineStatus) {
      document.body.classList.add('show-online-status');
    } else {
      document.body.classList.remove('show-online-status');
    }
  }, [settings?.showOnlineStatus]);

  console.log({ authUser, settings });

  if(isCheckingAuth && !authUser){
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        {/* Subtle Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-8 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Conversa
          </h1>
          
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Connecting conversations across the globe
          </p>

          {/* Loading Animation */}
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="absolute bottom-8 text-center">
          <p className="text-white/40 text-sm">
            Powered by Conversa • © 2025 All rights reserved
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`app-container ${settings?.compactMode ? 'compact-mode' : ''}`}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      {/* Toaster with dynamic positioning based on language direction */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            backdropFilter: 'blur(16px)',
            direction: document.documentElement.dir || 'ltr',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
};

export default App;
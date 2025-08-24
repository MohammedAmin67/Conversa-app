import { useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize to fix layout issues
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Close sidebar on desktop
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserSelect = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleBackToContacts = () => {
    if (isMobile) {
      setSelectedUser(null);
    } else {
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Mobile Chat Header - Show when user is selected */}
      {selectedUser && isMobile && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 pt-16 backdrop-blur-md bg-slate-900/95 border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={handleBackToContacts}
              className="p-2 text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 shadow-lg">
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt={selectedUser.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Online indicator */}
                {onlineUsers.includes(selectedUser._id) && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse m-auto mt-0.5"></div>
                  </div>
                )}
              </div>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-base font-semibold text-white truncate">
                  {selectedUser.fullName}
                </h1>
                <p className={`text-sm font-medium ${
                  onlineUsers.includes(selectedUser._id) ? 'text-green-400' : 'text-white/60'
                }`}>
                  {onlineUsers.includes(selectedUser._id) ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>
          </div>
          
          <button className="p-2 text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="flex h-full pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar onUserSelect={handleUserSelect} />
        </div>

        {/* Mobile Sidebar */}
        <div className={`
          lg:hidden fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full pt-16">
            <Sidebar onUserSelect={handleUserSelect} />
          </div>
        </div>

        {/* Backdrop */}
        {isSidebarOpen && isMobile && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Chat Area */}
        <div className="flex-1 relative min-w-0 h-full">
          <div className={`h-full bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-slate-800/50 ${
            selectedUser && !isMobile ? 'lg:border-l lg:border-white/10' : ''
          } ${
            selectedUser && isMobile ? 'pt-20' : ''
          }`}>
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>

      {/* Mobile Contacts Button - Only show when no user selected */}
      {!selectedUser && isMobile && (
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed bottom-6 right-6 z-30 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      )}

      {/* Mobile Back to Contacts Button - Show when user is selected */}
      {selectedUser && isMobile && (
        <button
          onClick={handleBackToContacts}
          className="lg:hidden fixed top-4 left-4 z-40 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default HomePage;
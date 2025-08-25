import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useTranslation } from "../lib/i18n";
import useScreenSize from "../hooks/useScreenSize";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { t } = useTranslation();
  const { isMobile } = useScreenSize();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // Check if we're in a chat route
  const isChatRoute = location.pathname.startsWith('/chat/');
  const isMessageRoute = location.pathname.includes('/messages/');
  
  // Get current chat user ID from URL params
  const chatUserId = params.id || params.userId;

  // Function to get chat user info - you'll need to implement this based on your store
  const getChatUser = (userId) => {
    // This should come from your chat store or users store
    // For now, I'll use a placeholder - replace with your actual implementation
    const mockUsers = {
      '1': { id: '1', fullName: 'John Doe', isOnline: true },
      '2': { id: '2', fullName: 'Jane Smith', isOnline: false },
      '3': { id: '3', fullName: 'Mike Johnson', isOnline: true },
    };
    return mockUsers[userId] || { fullName: 'Unknown User', isOnline: false };
  };

  const handleBackFromChat = () => {
    // Navigate back to chat list or dashboard
    navigate('/'); // This will show the sidebar with contacts
  };

  const handleLogoClick = (e) => {
    // On mobile in chat view, act as back button
    if (isMobile && (isChatRoute || isMessageRoute) && chatUserId) {
      e.preventDefault();
      handleBackFromChat();
    }
    // On desktop or non-chat pages, navigate to home normally
  };

  // Mobile Chat Navbar
  if (isMobile && (isChatRoute || isMessageRoute) && chatUserId) {
    const chatUser = getChatUser(chatUserId);
    
    return (
      <header className="bg-gradient-to-r from-slate-900/90 via-blue-900/90 to-slate-800/90 backdrop-blur-xl border-b border-white/10 fixed w-full top-0 z-40 shadow-2xl">
        <div className="w-full px-4 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Back Button + User Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                onClick={handleBackFromChat}
                className="flex items-center justify-center w-10 h-10 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Chat User Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-semibold text-sm">
                      {chatUser.fullName?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  {chatUser.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold text-lg truncate">
                    {chatUser.fullName}
                  </h2>
                  <p className="text-white/60 text-xs">
                    {chatUser.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Actions */}
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center w-10 h-10 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button className="flex items-center justify-center w-10 h-10 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Regular Navbar (Desktop or Mobile non-chat pages)
  return (
    <header className="bg-gradient-to-r from-slate-900/80 via-blue-900/80 to-slate-800/80 backdrop-blur-xl border-b border-white/10 fixed w-full top-0 z-40 shadow-2xl">
      <div className="w-full px-0 h-16">
        <div className="flex items-center justify-between h-full px-4 sm:px-6">
          {/* Logo Section - Left */}
          <div className="flex items-center gap-3 sm:gap-8">
            {/* Make Logo clickable and context-aware */}
            {isMobile && (isChatRoute || isMessageRoute) ? (
              // Mobile in chat: Act as back button
              <button 
                onClick={handleLogoClick}
                className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-all duration-300 group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors duration-300">
                  Back
                </h1>
              </button>
            ) : (
              // Normal logo link
              <Link 
                to="/" 
                className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-all duration-300 group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors duration-300">
                  Conversa
                </h1>
              </Link>
            )}
          </div>

          {/* Right Side Navigation - Rest stays the same */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {authUser ? (
              <>
                {/* Settings Button */}
                <Link
                  to="/settings"
                  className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-white/80 bg-white/8 backdrop-blur-md border border-white/15 rounded-xl hover:bg-white/15 hover:border-white/25 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-900/90 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {t('settings')}
                  </div>
                </Link>

                {/* User Avatar & Name Button */}
                <Link 
                  to="/profile"
                  className="group flex items-center gap-2 sm:gap-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-white/12 to-white/8 backdrop-blur-md border border-white/20 rounded-xl hover:from-white/16 hover:to-white/12 hover:border-white/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-3 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 ring-2 ring-white/20 group-hover:ring-white/30">
                      {authUser.profilePic ? (
                        <img 
                          src={authUser.profilePic} 
                          alt={authUser.fullName}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-xs sm:text-sm font-bold tracking-wide">
                          {authUser.fullName?.charAt(0)?.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-slate-900 shadow-sm"></div>
                  </div>
                  
                  <div className="hidden md:flex flex-col justify-center min-w-0 flex-1">
                    <span className="text-white text-sm font-semibold leading-tight group-hover:text-blue-100 transition-colors duration-200 truncate">
                      {authUser.fullName?.split(' ')[0] || authUser.fullName}
                    </span>
                    <span className="text-white/60 text-xs leading-tight">
                      {t('profile')}
                    </span>
                  </div>
                  
                  <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all duration-200 hidden md:block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Logout Button */}
                <button 
                  onClick={logout}
                  className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-white/90 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg hover:bg-red-500/30 hover:border-red-400/50 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">{t('logout')}</span>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-900/90 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap sm:hidden pointer-events-none">
                    {t('logout')}
                  </div>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-white/90 bg-gradient-to-r from-white/12 to-white/8 backdrop-blur-md border border-white/20 rounded-xl hover:from-white/20 hover:to-white/15 hover:border-white/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">{t('login')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
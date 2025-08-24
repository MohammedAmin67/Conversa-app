import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useSettingsStore } from "../store/useSettingsStore";
import { useTranslation } from "../lib/i18n";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, MessageCircle, Sparkles } from "lucide-react";

const Sidebar = ({ onUserSelect }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { settings } = useSettingsStore();
  const { t } = useTranslation();
  
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    if (onUserSelect) {
      onUserSelect();
    }
  };

  const safeUsers = users || [];
  
  const filteredUsers = showOnlineOnly
    ? safeUsers.filter((user) => onlineUsers.includes(user._id))
    : safeUsers;

  if (isUsersLoading) return <SidebarSkeleton />;

  // Dynamic spacing based on compact mode
  const compactClass = settings?.compactMode ? 'compact' : '';
  const spacing = settings?.compactMode ? 'space-y-1' : 'space-y-2';
  const padding = settings?.compactMode ? 'p-2' : 'p-3';
  const headerPadding = settings?.compactMode ? 'p-4 lg:p-5' : 'p-5 lg:p-6';
  const bottomPadding = settings?.compactMode ? 'p-3' : 'p-5';

  return (
    <aside className={`h-full w-20 lg:w-80 backdrop-blur-2xl bg-gradient-to-b from-slate-900/90 via-blue-900/80 to-slate-800/90 border-r border-white/10 flex flex-col transition-all duration-300 relative overflow-hidden ${compactClass}`}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-20 h-20 lg:w-40 lg:h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-20 w-16 h-16 lg:w-32 lg:h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative flex-shrink-0 border-b border-white/10">
        <div className={headerPadding}>
          {/* Title */}
          <div className={`flex items-center gap-4 ${settings?.compactMode ? 'mb-4' : 'mb-6'}`}>
            <div className="relative group mx-auto lg:mx-0">
              <div className={`${settings?.compactMode ? 'p-2 lg:p-3' : 'p-3 lg:p-4'} bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-cyan-500/30 rounded-2xl lg:rounded-3xl backdrop-blur-sm border border-white/30 shadow-xl flex-shrink-0`}>
                <Users className={`${settings?.compactMode ? 'w-5 h-5 lg:w-6 lg:h-6' : 'w-6 h-6 lg:w-7 lg:h-7'} text-white`} />
              </div>
            </div>
            
            {/* Title text - only visible on large screens */}
            <div className="hidden lg:block flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className={`font-bold text-white ${settings?.compactMode ? 'text-lg' : 'text-xl'} tracking-wide truncate`}>
                  {t('home')}
                </h2>
                <Sparkles className={`${settings?.compactMode ? 'w-4 h-4' : 'w-5 h-5'} text-blue-400 animate-pulse flex-shrink-0`} />
              </div>
              <p className={`text-white/70 ${settings?.compactMode ? 'text-xs' : 'text-sm'} font-medium truncate`}>
                {t('online')} {onlineUsers.length - 1}
              </p>
            </div>
          </div>

          {/* Stats Card - only visible on large screens */}
          <div className="hidden lg:block relative group">
            <div className={`bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-xl ${settings?.compactMode ? 'p-3' : 'p-4'} border border-white/20 shadow-xl`}>
              <div className={`flex items-center justify-between ${settings?.compactMode ? 'mb-2' : 'mb-3'}`}>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className={`${settings?.compactMode ? 'p-1.5' : 'p-2'} bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-400/30 flex-shrink-0`}>
                    <MessageCircle className={`${settings?.compactMode ? 'w-3 h-3' : 'w-4 h-4'} text-blue-400`} />
                  </div>
                  <span className={`${settings?.compactMode ? 'text-xs' : 'text-sm'} text-white/90 font-semibold truncate`}>
                    {t('home')}
                  </span>
                </div>
                
                <div className={`bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white ${settings?.compactMode ? 'text-xs px-2 py-1' : 'text-xs px-3 py-1.5'} font-bold rounded-xl`}>
                  {filteredUsers.length}
                </div>
              </div>

              {/* Live Status */}
              <div className={`flex items-center justify-between text-xs ${settings?.compactMode ? 'mb-2' : 'mb-3'}`}>
                <div className="flex items-center gap-1">
                  <div className={`${settings?.compactMode ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-green-400 rounded-full animate-pulse`}></div>
                  <span className="text-white/70 font-medium">{t('online')}</span>
                </div>
                <span className="text-white/50">({onlineUsers.length - 1} {t('online')})</span>
              </div>

              {/* Online Filter Toggle */}
              <label className="cursor-pointer flex items-center justify-between w-full">
                <span className={`${settings?.compactMode ? 'text-xs' : 'text-xs'} text-white/80 font-medium`}>
                  {t('showOnlineStatus')}
                </span>
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={showOnlineOnly}
                    onChange={(e) => setShowOnlineOnly(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`${settings?.compactMode ? 'w-6 h-3' : 'w-8 h-4'} rounded-full transition-colors duration-200 flex items-center ${
                    showOnlineOnly 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-white/20'
                  }`}>
                    <div className={`${settings?.compactMode ? 'w-2 h-2' : 'w-3 h-3'} bg-white rounded-full shadow transition-transform duration-200 ${
                      showOnlineOnly ? (settings?.compactMode ? 'translate-x-3 ml-0.5' : 'translate-x-4 ml-0.5') : 'translate-x-0.5'
                    }`} />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List - NOW USING THE SPACING VARIABLE */}
      <div className={`flex-1 overflow-y-auto ${settings?.compactMode ? 'py-2' : 'py-3'} min-h-0`}>
        <div className={spacing}>
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => handleUserClick(user)}
              className={`
                w-full ${padding} flex items-center gap-3
                hover:bg-white/10 transition-all duration-200
                ${selectedUser?._id === user._id 
                  ? "bg-white/15 ring-1 ring-white/20" 
                  : ""
                }
              `}
            >
              {/* Avatar */}
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className={`${settings?.compactMode ? 'w-10 h-10' : 'w-12 h-12'} object-cover rounded-full`}
                />
                
                {/* Online indicator - only show if setting is enabled */}
                {settings?.showOnlineStatus && onlineUsers.includes(user._id) && (
                  <span className={`absolute bottom-0 right-0 ${settings?.compactMode ? 'w-2.5 h-2.5' : 'w-3 h-3'} bg-green-500 rounded-full ring-2 ring-slate-900`} />
                )}
              </div>

              {/* User Info - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block text-left min-w-0">
                <div className={`font-medium text-white truncate ${settings?.compactMode ? 'text-sm' : 'text-base'}`}>
                  {user.fullName}
                </div>
                <div className={`${settings?.compactMode ? 'text-xs' : 'text-sm'} text-zinc-400`}>
                  {settings?.showOnlineStatus && onlineUsers.includes(user._id) ? t('online') : t('offline')}
                </div>
              </div>
            </button>
          ))}

          {/* Empty state */}
          {filteredUsers.length === 0 && (
            <div className={`text-center text-zinc-500 ${settings?.compactMode ? 'py-3' : 'py-4'}`}>
              {showOnlineOnly ? t('offline') : 'No users'}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status - Only visible on desktop */}
      <div className={`hidden lg:block ${bottomPadding} border-t border-white/20 flex-shrink-0`}>
        <div className="flex items-center justify-center gap-2">
          <div className={`${settings?.compactMode ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-green-400 rounded-full animate-pulse`}></div>
          <span className={`${settings?.compactMode ? 'text-xs' : 'text-xs'} text-white/60 font-medium`}>
            {showOnlineOnly ? t('online') : 'Total'}
          </span>
          <span className={`${settings?.compactMode ? 'text-xs' : 'text-xs'} text-white/40`}>•</span>
          <span className={`${settings?.compactMode ? 'text-xs' : 'text-xs'} text-white/40`}>{filteredUsers.length}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
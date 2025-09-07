import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, MessageCircle, Sparkles } from "lucide-react";

const Sidebar = ({ onUserSelect }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
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

  return (
    <aside className="h-full w-20 lg:w-80 backdrop-blur-2xl bg-gradient-to-b from-slate-900/90 via-blue-900/80 to-slate-800/90 border-r border-white/10 flex flex-col transition-all duration-300 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-20 h-20 lg:w-40 lg:h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-20 w-16 h-16 lg:w-32 lg:h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative flex-shrink-0 border-b border-white/10 pt-16">
        <div className="p-5 lg:p-6">
          {/* Title - Fixed spacing */}
          <div className="flex items-center gap-4 mb-6 sm:mb-3">
            <div className="relative group mx-auto lg:mx-0">
              <div className="p-3 lg:p-4 bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-cyan-500/30 rounded-2xl lg:rounded-3xl backdrop-blur-sm border border-white/30 shadow-xl flex-shrink-0">
                <Users className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
            </div>
            
            {/* Title text - only visible on large screens */}
            <div className="hidden lg:block flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-white text-xl tracking-wide truncate">Messages</h2>
                <Sparkles className="w-5 h-5 text-blue-400 animate-pulse flex-shrink-0" />
              </div>
              <p className="text-white/70 text-sm font-medium truncate">Stay connected</p>
            </div>
          </div>

          {/* Stats Card - only visible on large screens */}
          <div className="hidden lg:block relative group">
            <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-400/30 flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm text-white/90 font-semibold truncate">Conversations</span>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                  {filteredUsers.length}
                </div>
              </div>

              {/* Live Status */}
              <div className="flex items-center justify-between text-xs mb-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/70 font-medium">Live</span>
                </div>
                <span className="text-white/50">({onlineUsers.length - 1} online)</span>
              </div>

              {/* Online Filter Toggle */}
              <label className="cursor-pointer flex items-center justify-between w-full">
                <span className="text-xs text-white/80 font-medium">Online only</span>
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={showOnlineOnly}
                    onChange={(e) => setShowOnlineOnly(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-8 h-4 rounded-full transition-colors duration-200 flex items-center ${
                    showOnlineOnly 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-white/20'
                  }`}>
                    <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 ${
                      showOnlineOnly ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'
                    }`} />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List - Clean mobile design */}
      <div className="flex-1 overflow-y-auto py-3 min-h-0 pt-16 lg:pt-0">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => handleUserClick(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-white/10 transition-all duration-200
              ${selectedUser?._id === user._id 
                ? "bg-white/15 ring-1 ring-white/20" 
                : ""
              }
            `}
          >
            {/* Avatar - Centered on mobile, left-aligned on desktop */}
            <div className="relative mx-auto lg:mx-0">
             {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-12 h-12 object-cover rounded-full"
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full">
                <User className="w-7 h-7 text-white/60" />
              </div>
            )}
              
              {/* Online indicator */}
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-900" />
              )}
            </div>

            {/* User Info - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-white truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            {showOnlineOnly ? 'No online users' : 'No users'}
          </div>
        )}
      </div>

      {/* Bottom Status - RESTORED - Only visible on desktop */}
      <div className="hidden lg:block p-5 border-t border-white/20 flex-shrink-0">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-white/60 font-medium">
            {showOnlineOnly ? 'Online' : 'Total'}
          </span>
          <span className="text-xs text-white/40">•</span>
          <span className="text-xs text-white/40">{filteredUsers.length}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
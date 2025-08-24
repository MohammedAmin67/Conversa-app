import { X, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 sm:p-4 border-b border-white/10 bg-gradient-to-r from-slate-900/80 via-blue-900/40 to-slate-800/80 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {/* Back to Contacts Button */}
          <button
            onClick={() => setSelectedUser(null)}
            className="group relative p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg backdrop-blur-sm flex-shrink-0"
          >
            {/* Hover glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg sm:rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            
            <ArrowLeft className="relative w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
          </button>

          {/* Avatar with online indicator */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-white/20 shadow-xl">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Online status indicator - Enhanced */}
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-slate-800 shadow-lg transition-all duration-300 ${
              onlineUsers.includes(selectedUser._id) 
                ? "bg-gradient-to-r from-green-400 to-emerald-500" 
                : "bg-gradient-to-r from-gray-400 to-gray-500"
            }`}>
              {/* Pulse animation for online users */}
              {onlineUsers.includes(selectedUser._id) && (
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
              )}
            </div>
          </div>

          {/* User info - Cleaned up */}
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="font-semibold text-white text-base sm:text-lg tracking-tight truncate">
              {selectedUser.fullName}
            </h3>
            
            {/* Simple status text without redundant dot */}
            <p className={`text-xs sm:text-sm font-medium truncate transition-colors duration-300 ${
              onlineUsers.includes(selectedUser._id) 
                ? "text-green-300" 
                : "text-gray-400"
            }`}>
              {onlineUsers.includes(selectedUser._id) ? "Active now" : "Offline"}
            </p>
          </div>
        </div>

        {/* Options/Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="group relative p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg backdrop-blur-sm flex-shrink-0"
        >
          {/* Hover glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-lg sm:rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          
          <X className="relative w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
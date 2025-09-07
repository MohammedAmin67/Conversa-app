import { useState, useRef, useEffect } from "react";
import { ArrowLeft, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

// Simple dropdown for 3-dots menu (not needed on desktop now)
const ChatOptionsMenu = ({ onClose }) => (
  <div className="absolute right-0 top-12 z-50 w-40 bg-slate-900 border border-white/10 rounded-xl shadow-xl py-2 animate-fade-in">
    <button
      className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition"
      onClick={() => {
        alert("Coming soon: Block user");
        onClose();
      }}
    >
      Block user
    </button>
    <button
      className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition"
      onClick={() => {
        alert("Coming soon: Clear chat");
        onClose();
      }}
    >
      Clear chat
    </button>
    <button
      className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition"
      onClick={onClose}
    >
      Cancel
    </button>
  </div>
);

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [showMenu]);

  if (!selectedUser) return null;

  return (
    <div className="
      px-2 sm:px-4 py-2 sm:py-3 border-b border-white/10 
      bg-gradient-to-r from-slate-900/80 via-blue-900/40 to-slate-800/80 
      backdrop-blur-xl
      min-h-[56px] sm:min-h-[70px]
      flex items-center
    ">
      <div className="flex items-center justify-between w-full relative">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          {/* Back to Contacts Button */}
          <button
            onClick={() => setSelectedUser(null)}
            className="group p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg backdrop-blur-sm flex-shrink-0 min-w-[40px] min-h-[40px]"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
          </button>
          {/* Avatar with online indicator */}
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-white/20 shadow-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              {selectedUser.profilePic ? (
                <img 
                  src={selectedUser.profilePic}
                  alt={selectedUser.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-2/3 h-2/3 text-white/60" />
              )}
            </div>
            {/* Online status indicator */}
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-slate-800 shadow-lg transition-all duration-300 ${
              onlineUsers.includes(selectedUser._id) 
                ? "bg-gradient-to-r from-green-400 to-emerald-500" 
                : "bg-gradient-to-r from-gray-400 to-gray-500"
            }`}>
              {onlineUsers.includes(selectedUser._id) && (
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
              )}
            </div>
          </div>
          {/* User info */}
          <div className="space-y-0.5 min-w-0 flex-1">
            <h3 className="font-semibold text-white text-base sm:text-lg tracking-tight truncate">
              {selectedUser.fullName}
            </h3>
            <p className={`text-xs sm:text-sm font-medium truncate transition-colors duration-300 ${
              onlineUsers.includes(selectedUser._id) 
                ? "text-green-300" 
                : "text-gray-400"
            }`}>
              {onlineUsers.includes(selectedUser._id) ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
        {/* Options/More (3-dots) button removed on desktop */}
        <div className="relative block sm:hidden" ref={menuRef}>
          {/* Only render 3-dots menu on mobile */}
          {/* 
          <button
            className="group p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg backdrop-blur-sm flex-shrink-0 min-w-[40px] min-h-[40px]"
            aria-label="More options"
            onClick={() => setShowMenu((v) => !v)}
          >
            <MoreVertical className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
          </button>
          */}
          {showMenu && (
            <ChatOptionsMenu onClose={() => setShowMenu(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
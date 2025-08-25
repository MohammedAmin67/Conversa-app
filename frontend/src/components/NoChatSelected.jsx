import { MessageSquare, Users, Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-slate-800/50 relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content Card */}
      <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8 lg:p-12 max-w-lg w-full">
        
        {/* Icon Display */}
        <div className="flex justify-center pt-5 sm:pt-10 gap-4 mb-8">
          <div className="relative group">
            {/* Animated glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 animate-pulse"></div>
            
            {/* Container that bounces together*/}
            <div className="relative animate-bounce">
              {/* Main icon container */}
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                <MessageSquare className="w-10 h-10 lg:w-12 lg:h-12 text-white drop-shadow-lg" />
              </div>

              {/* Floating mini icons - Now properly aligned and bounce together */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-4 h-4 text-cyan-300" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-purple-400/30 to-pink-400/30 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 text-purple-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Conversa
              </span>
              !
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto opacity-60"></div>
          </div>
          
          <p className="text-white/70 text-lg lg:text-xl leading-relaxed">
            Select a conversation from the sidebar to start chatting and connecting with others
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-300" />
              </div>
              <span className="text-white/80 text-sm font-medium">Real-time Chat</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-300" />
              </div>
              <span className="text-white/80 text-sm font-medium">Group Chats</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="text-white/80 text-sm font-medium">Instant Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="mt-8 text-center">
        <p className="text-white/40 text-sm">
          Start a conversation • Connect with friends • Share moments
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
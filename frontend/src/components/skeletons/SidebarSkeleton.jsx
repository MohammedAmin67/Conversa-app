import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col transition-all duration-200 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl"></div>
      </div>

      {/* Header */}
      <div className="relative border-b border-white/15 w-full p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-white/20">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-white hidden lg:block tracking-wide">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="relative overflow-y-auto w-full py-3 flex-1">
        {skeletonContacts.map((_, idx) => (
          <div 
            key={idx} 
            className="w-full p-3 mx-2 my-1 rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center gap-3"
          >
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/15 animate-pulse relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              </div>
              {/* Fake online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-white/10 to-white/5 rounded-full border-2 border-white/20 animate-pulse"></div>
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1 space-y-2">
              {/* Name skeleton */}
              <div className="h-4 bg-gradient-to-r from-white/15 via-white/10 to-white/5 rounded-lg animate-pulse relative overflow-hidden" style={{width: `${120 + Math.random() * 40}px`}}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              </div>
              {/* Status skeleton */}
              <div className="h-3 bg-gradient-to-r from-white/10 via-white/5 to-white/3 rounded-md animate-pulse relative overflow-hidden" style={{width: `${60 + Math.random() * 20}px`}}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="relative p-4 border-t border-white/10">
        <div className="flex items-center justify-center lg:justify-start gap-2">
          <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"></div>
          <span className="text-white/40 text-xs hidden lg:block">Loading contacts...</span>
        </div>
      </div>

      {/* Custom shimmer animation styles */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </aside>
  );
};

export default SidebarSkeleton;
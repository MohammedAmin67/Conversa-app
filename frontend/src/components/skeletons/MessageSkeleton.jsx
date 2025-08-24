const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-br from-slate-900/30 via-blue-900/20 to-slate-800/30">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`flex gap-3 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
          {/* Avatar - only show on left side (sender) */}
          {idx % 2 === 0 && (
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700/50 via-blue-600/30 to-slate-600/50 animate-pulse shadow-lg ring-2 ring-white/10"></div>
            </div>
          )}

          {/* Message Content */}
          <div className={`flex flex-col gap-2 max-w-[70%] ${idx % 2 === 0 ? "items-start" : "items-end"}`}>
            {/* Header with name/time */}
            <div className={`flex gap-2 ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
              <div className="h-3 w-16 bg-gradient-to-r from-slate-600/60 to-blue-600/40 rounded-full animate-pulse"></div>
              <div className="h-3 w-12 bg-gradient-to-r from-slate-500/50 to-slate-600/50 rounded-full animate-pulse"></div>
            </div>

            {/* Message Bubble */}
            <div className={`relative backdrop-blur-xl border shadow-xl animate-pulse ${
              idx % 2 === 0 
                ? "bg-white/5 border-white/10 rounded-2xl rounded-tl-md" 
                : "bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-cyan-500/20 border-blue-400/20 rounded-2xl rounded-tr-md"
            }`}>
              {/* Glow effect */}
              <div className={`absolute -inset-0.5 rounded-2xl blur-sm opacity-30 animate-pulse ${
                idx % 2 === 0 
                  ? "bg-gradient-to-r from-slate-400/20 to-blue-400/20" 
                  : "bg-gradient-to-r from-blue-400/30 via-purple-400/20 to-cyan-400/30"
              }`}></div>
              
              {/* Content */}
              <div className="relative p-4 space-y-2">
                {/* Text lines */}
                <div className={`h-4 rounded-full animate-pulse ${
                  idx % 2 === 0 
                    ? "bg-gradient-to-r from-slate-500/60 to-blue-500/40 w-[180px]" 
                    : "bg-gradient-to-r from-blue-400/60 to-purple-400/40 w-[160px]"
                }`}></div>
                
                {/* Random second line for some messages */}
                {(idx === 1 || idx === 4) && (
                  <div className={`h-4 rounded-full animate-pulse ${
                    idx % 2 === 0 
                      ? "bg-gradient-to-r from-slate-400/50 to-blue-400/30 w-[120px]" 
                      : "bg-gradient-to-r from-blue-300/50 to-purple-300/30 w-[100px]"
                  }`}></div>
                )}
              </div>
            </div>
          </div>

          {/* Avatar placeholder for right side (you) - invisible but maintains spacing */}
          {idx % 2 !== 0 && (
            <div className="flex-shrink-0 w-10"></div>
          )}
        </div>
      ))}

      {/* Loading indicator at bottom */}
      <div className="flex justify-center py-4">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400/60 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400/60 animate-bounce delay-100"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
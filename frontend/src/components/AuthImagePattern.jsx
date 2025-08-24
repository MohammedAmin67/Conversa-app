const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-slate-800 via-blue-800 to-slate-700 p-12 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-md text-center relative z-10">
        {/* Animated Grid Pattern */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg ${
                i % 2 === 0 ? "animate-pulse" : ""
              } ${
                i === 4 ? "bg-gradient-to-br from-blue-400/20 to-purple-500/20 border-white/30" : ""
              }`}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              {/* Add some decorative content to random squares */}
              {i === 1 && (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              )}
              {i === 4 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              )}
              {i === 7 && (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white/70 text-lg leading-relaxed">{subtitle}</p>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400/20 rounded-full blur-sm animate-bounce delay-500"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400/20 rounded-full blur-sm animate-bounce delay-1000"></div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
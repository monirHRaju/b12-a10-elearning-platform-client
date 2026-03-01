import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
      {/* Animated logo/brand mark */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center animate-pulse shadow-lg shadow-primary/25">
          <span className="text-2xl font-bold text-white">e</span>
        </div>
        <div className="absolute -inset-1 rounded-2xl bg-secondary/30 -z-10 blur-xl animate-pulse" />
      </div>

      {/* Bouncing dots loader */}
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" />
      </div>

      <p className="text-base-content/70 text-sm font-medium tracking-wide">Loading your content...</p>
    </div>
  )
}

export default Loading
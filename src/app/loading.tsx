export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-primary/10 blur-[80px] rounded-full opacity-50 pointer-events-none"
        aria-hidden="true" 
      />

      <div className="relative flex flex-col items-center justify-center gap-6 z-10">
        {/* Sleek Spinner */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 border-4 border-muted rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary/50 rounded-full animate-spin" />
        </div>
        
        {/* Animated Text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-foreground font-medium tracking-tight text-lg">
            Preparando experiencia
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}

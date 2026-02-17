import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const LuxuryDigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const timeString = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const [time, period] = timeString.split(' ');
  const [hours, minutes, seconds] = time.split(':');

  return (
    <Card className="border-0 shadow-luxury-xl overflow-hidden relative group">
      <div className="gradient-luxury rounded-2xl">
        {/* Ambient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.04] pointer-events-none rounded-2xl" />
        
        <CardContent className="p-6 text-center relative">
          {/* Geometric pattern */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <div className="absolute top-3 left-3 w-20 h-20 border border-white rounded-full" />
            <div className="absolute bottom-3 right-3 w-14 h-14 border border-white rounded-full" />
          </div>

          {/* Time */}
          <div className="relative z-10 mb-4">
            <div className="flex items-baseline justify-center gap-0.5 mb-2">
              <span className="font-mono text-5xl font-bold text-white tracking-tight" style={{ textShadow: '0 0 20px rgba(255,255,255,0.25)' }}>{hours}</span>
              <span className="font-mono text-4xl font-bold text-white/50 animate-pulse-gentle">:</span>
              <span className="font-mono text-5xl font-bold text-white tracking-tight" style={{ textShadow: '0 0 20px rgba(255,255,255,0.25)' }}>{minutes}</span>
              <span className="font-mono text-4xl font-bold text-white/50 animate-pulse-gentle">:</span>
              <span className="font-mono text-3xl font-bold text-white/70 tracking-tight">{seconds}</span>
            </div>
            <span className="font-mono text-sm font-semibold text-white/70 tracking-[0.3em] bg-white/10 px-4 py-1 rounded-full border border-white/10 inline-block">
              {period}
            </span>
          </div>

          {/* Date */}
          <div className="relative z-10">
            <p className="text-white/70 text-xs font-medium tracking-wide">{formatDate(currentTime)}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-10 h-px bg-white/20" />
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="w-10 h-px bg-white/20" />
            </div>
          </div>

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 bg-white/25 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }} />
            <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }} />
            <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white/15 rounded-full animate-float" style={{ animationDelay: '4s', animationDuration: '9s' }} />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default LuxuryDigitalClock;

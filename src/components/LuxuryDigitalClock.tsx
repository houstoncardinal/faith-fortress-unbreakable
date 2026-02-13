import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LuxuryDigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const timeString = formatTime(currentTime);
  const [time, period] = timeString.split(' ');
  const [hours, minutes, seconds] = time.split(':');

  return (
    <Card className="gradient-luxury text-white border-0 shadow-luxury-xl overflow-hidden relative">
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-white/[0.04] pointer-events-none" />

      <CardContent className="p-8 text-center relative">
        {/* Luxury Background Pattern - geometric circles */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute top-4 left-4 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-32 border border-white rounded-full"></div>
        </div>

        {/* Clock Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner-glow animate-float">
            <Clock className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          </div>
        </div>

        {/* Time Display */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-center gap-1 mb-3">
            <div className="font-mono text-5xl md:text-7xl font-bold tracking-wider" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.3)' }}>
              {hours}
            </div>
            <div className="font-mono text-5xl md:text-7xl font-bold text-white/70 animate-pulse-gentle">
              :
            </div>
            <div className="font-mono text-5xl md:text-7xl font-bold tracking-wider" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.3)' }}>
              {minutes}
            </div>
            <div className="font-mono text-5xl md:text-7xl font-bold text-white/70 animate-pulse-gentle">
              :
            </div>
            <div className="font-mono text-5xl md:text-7xl font-bold tracking-wider text-white/90" style={{ textShadow: '0 0 15px rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.3)' }}>
              {seconds}
            </div>
          </div>

          {/* AM/PM Badge */}
          <div className="font-mono text-xl font-semibold text-white/90 tracking-[0.25em] bg-white/15 backdrop-blur-md px-5 py-1.5 rounded-full inline-block border border-white/20 shadow-inner-glow">
            {period}
          </div>
        </div>

        {/* Date Display */}
        <div className="relative z-10">
          <div className="text-white/80 text-base font-medium mb-3 tracking-wide">
            {formatDate(currentTime)}
          </div>

          {/* Luxury Separator */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/50 shadow-[0_0_6px_rgba(255,255,255,0.4)]"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          </div>
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-float" style={{ animationDelay: '4s', animationDuration: '9s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LuxuryDigitalClock;
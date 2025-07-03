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
    <Card className="gradient-islamic text-white border-0 shadow-2xl overflow-hidden">
      <CardContent className="p-8 text-center relative">
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-32 border border-white/20 rounded-full"></div>
        </div>

        {/* Clock Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Time Display */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="font-mono text-6xl md:text-7xl font-bold tracking-wider text-shadow-lg">
              {hours}
            </div>
            <div className="font-mono text-6xl md:text-7xl font-bold text-white/80 animate-pulse">
              :
            </div>
            <div className="font-mono text-6xl md:text-7xl font-bold tracking-wider text-shadow-lg">
              {minutes}
            </div>
            <div className="font-mono text-6xl md:text-7xl font-bold text-white/80 animate-pulse">
              :
            </div>
            <div className="font-mono text-6xl md:text-7xl font-bold tracking-wider text-shadow-lg">
              {seconds}
            </div>
          </div>
          
          {/* AM/PM */}
          <div className="font-mono text-2xl font-semibold text-white/90 tracking-widest bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
            {period}
          </div>
        </div>

        {/* Date Display */}
        <div className="relative z-10">
          <div className="text-white/90 text-lg font-medium mb-2 tracking-wide">
            {formatDate(currentTime)}
          </div>
          
          {/* Luxury Separator */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-white/60"></div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LuxuryDigitalClock;
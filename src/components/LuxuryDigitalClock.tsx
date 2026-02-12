import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const LuxuryDigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }).split(' ')[0];
  const minutes = currentTime.toLocaleTimeString('en-US', { minute: '2-digit' });
  const seconds = currentTime.toLocaleTimeString('en-US', { second: '2-digit' }).slice(-2);
  const period = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }).split(' ')[1];

  const dateStr = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="border-0 shadow-xl overflow-hidden">
      <div className="gradient-islamic p-8 text-white text-center relative">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />

        <div className="relative z-10">
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="font-mono text-5xl lg:text-6xl font-bold tracking-tight">{hours}</span>
            <span className="font-mono text-5xl lg:text-6xl font-bold text-white/50 animate-pulse">:</span>
            <span className="font-mono text-5xl lg:text-6xl font-bold tracking-tight">{minutes}</span>
            <span className="font-mono text-2xl text-white/40 ml-1">{seconds}</span>
          </div>
          
          <div className="inline-block font-mono text-xs tracking-[0.3em] uppercase bg-white/10 px-3 py-1 rounded-full text-white/80 mb-4">
            {period}
          </div>

          <div className="text-white/60 text-sm font-medium">{dateStr}</div>
        </div>
      </div>
    </Card>
  );
};

export default LuxuryDigitalClock;


import { Plus, RotateCcw, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DhikrCounter = () => {
  const [count, setCount] = useState(0);
  const [currentDhikr, setCurrentDhikr] = useState(0);
  const [ripple, setRipple] = useState(false);
  
  const dhikrList = [
    { arabic: "سُبْحَانَ اللَّهِ", transliteration: "SubhanAllah", meaning: "Glory be to Allah", target: 33 },
    { arabic: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", meaning: "All praise is due to Allah", target: 33 },
    { arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest", target: 34 },
    { arabic: "لَا إِلَهَ إِلَّا اللَّهُ", transliteration: "La ilaha illa Allah", meaning: "There is no god but Allah", target: 100 }
  ];

  const currentTarget = dhikrList[currentDhikr].target;
  const progress = Math.min((count / currentTarget) * 100, 100);
  const circumference = 2 * Math.PI * 46;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setRipple(true);
    setTimeout(() => setRipple(false), 400);
    if (navigator.vibrate) navigator.vibrate(15);
  };

  const handleReset = () => setCount(0);
  const nextDhikr = () => { setCurrentDhikr(prev => (prev + 1) % dhikrList.length); setCount(0); };

  return (
    <Card className="border-0 shadow-luxury-xl overflow-hidden relative group">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-accent/[0.02] to-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <CardContent className="p-6 space-y-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
              <span className="text-base">📿</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Digital Tasbih</h3>
              <p className="text-[10px] text-muted-foreground">{count} / {currentTarget}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={nextDhikr} className="text-[10px] gap-1 text-muted-foreground hover:text-primary rounded-xl h-7 px-2">
            Next <ChevronRight className="w-3 h-3" />
          </Button>
        </div>

        {/* Dhikr Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDhikr}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center space-y-1.5 p-4 bg-gradient-to-br from-primary/[0.05] to-accent/[0.05] rounded-2xl border border-primary/[0.08]"
          >
            <div className="font-arabic text-2xl text-primary leading-relaxed">
              {dhikrList[currentDhikr].arabic}
            </div>
            <div className="font-medium text-xs">{dhikrList[currentDhikr].transliteration}</div>
            <div className="text-[10px] text-muted-foreground italic">{dhikrList[currentDhikr].meaning}</div>
          </motion.div>
        </AnimatePresence>

        {/* Counter Ring */}
        <div className="flex justify-center">
          <button
            onClick={handleIncrement}
            className="relative w-32 h-32 rounded-full active:scale-[0.96] transition-transform duration-150 focus:outline-none"
          >
            {/* SVG Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="hsl(var(--border))" strokeWidth="3" opacity="0.3" />
              <circle
                cx="50" cy="50" r="46" fill="none"
                stroke="url(#progressGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 ease-out"
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner circle */}
            <div className="absolute inset-3 rounded-full gradient-luxury flex items-center justify-center shadow-luxury-lg">
              <div className="absolute inset-0 rounded-full bg-white/[0.07]" />
              {/* Ripple */}
              <AnimatePresence>
                {ripple && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                  />
                )}
              </AnimatePresence>
              <span className="text-3xl font-bold text-white relative z-10" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                {count}
              </span>
            </div>
          </button>
        </div>

        <p className="text-center text-[10px] text-muted-foreground">Tap the circle to count</p>

        {/* Reset */}
        <Button variant="outline" size="sm" onClick={handleReset} className="w-full gap-2 rounded-xl border-border/50 hover:bg-muted/40 text-xs">
          <RotateCcw className="w-3 h-3" />
          Reset Counter
        </Button>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-border/30 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DhikrCounter;

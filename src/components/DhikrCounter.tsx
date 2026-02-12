import { Plus, RotateCcw, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DhikrCounter = () => {
  const [count, setCount] = useState(0);
  const [currentDhikr, setCurrentDhikr] = useState(0);
  
  const dhikrList = [
    { arabic: "سُبْحَانَ اللَّهِ", transliteration: "SubhanAllah", meaning: "Glory be to Allah", target: 33 },
    { arabic: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", meaning: "All praise is due to Allah", target: 33 },
    { arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest", target: 34 },
    { arabic: "لَا إِلَهَ إِلَّا اللَّهُ", transliteration: "La ilaha illa Allah", meaning: "There is no god but Allah", target: 100 }
  ];

  const current = dhikrList[currentDhikr];
  const progress = Math.min((count / current.target) * 100, 100);

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleReset = () => setCount(0);
  const nextDhikr = () => {
    setCurrentDhikr(prev => (prev + 1) % dhikrList.length);
    setCount(0);
  };

  return (
    <Card className="card-elevated overflow-hidden">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground">Digital Tasbih</h3>
          <Button variant="ghost" size="sm" onClick={nextDhikr} className="gap-1 text-xs text-muted-foreground hover:text-primary">
            Next <ChevronRight className="w-3 h-3" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentDhikr}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center space-y-2"
          >
            <div className="font-arabic text-3xl text-primary leading-relaxed">{current.arabic}</div>
            <div className="text-sm font-medium text-foreground/80">{current.transliteration}</div>
            <div className="text-xs text-muted-foreground italic">{current.meaning}</div>
          </motion.div>
        </AnimatePresence>

        {/* Count circle with progress ring */}
        <div className="flex justify-center">
          <button
            onClick={handleIncrement}
            className="relative w-28 h-28 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
          >
            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
              <circle 
                cx="50" cy="50" r="44" fill="none" 
                stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${progress * 2.76} 276`}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-2 rounded-full gradient-islamic flex flex-col items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow group-active:scale-95">
              <span className="text-3xl font-bold text-white font-mono">{count}</span>
              <span className="text-[10px] text-white/60">/ {current.target}</span>
            </div>
          </button>
        </div>

        <p className="text-center text-[11px] text-muted-foreground">Tap the circle to count</p>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleReset} 
          className="w-full gap-2 rounded-xl"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Counter
        </Button>
      </CardContent>
    </Card>
  );
};

export default DhikrCounter;


import { Plus, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DhikrCounter = () => {
  const [count, setCount] = useState(0);
  const [currentDhikr, setCurrentDhikr] = useState(0);
  
  const dhikrList = [
    { arabic: "سُبْحَانَ اللَّهِ", transliteration: "SubhanAllah", meaning: "Glory be to Allah" },
    { arabic: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", meaning: "All praise is due to Allah" },
    { arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest" },
    { arabic: "لَا إِلَهَ إِلَّا اللَّهُ", transliteration: "La ilaha illa Allah", meaning: "There is no god but Allah" }
  ];

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const nextDhikr = () => {
    setCurrentDhikr(prev => (prev + 1) % dhikrList.length);
    setCount(0);
  };

  return (
    <Card className="border-accent/20 shadow-luxury-lg overflow-hidden relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03] pointer-events-none" />

      <CardHeader className="pb-3 relative">
        <CardTitle className="text-center text-primary text-lg">Digital Tasbih</CardTitle>
        {/* Subtle separator */}
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-accent/40" />
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5 relative">
        {/* Dhikr Text Display */}
        <div className="text-center space-y-3 p-4 bg-gradient-to-br from-primary/[0.06] to-accent/[0.06] rounded-2xl border border-primary/10">
          <div className="font-arabic text-3xl text-primary leading-relaxed text-shadow-sm">
            {dhikrList[currentDhikr].arabic}
          </div>
          <div className="space-y-1">
            <div className="font-medium text-sm">{dhikrList[currentDhikr].transliteration}</div>
            <div className="text-xs text-muted-foreground italic">
              {dhikrList[currentDhikr].meaning}
            </div>
          </div>
        </div>

        {/* Counter Circle */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-luxury text-white text-3xl font-bold shadow-luxury-lg relative">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full animate-glow-ring" />
            <span className="relative z-10" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{count}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2 rounded-xl border-primary/20 hover:bg-primary/5 transition-all">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={handleIncrement}
            className="flex-1 gap-2 gradient-luxury border-0 text-lg py-6 rounded-xl shadow-luxury hover:shadow-luxury-lg active:scale-[0.98] transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Count
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={nextDhikr}
          className="w-full text-primary hover:bg-primary/10 rounded-xl transition-all"
        >
          Next Dhikr
        </Button>
      </CardContent>
    </Card>
  );
};

export default DhikrCounter;

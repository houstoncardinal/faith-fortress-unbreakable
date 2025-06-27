
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
    <Card className="border-accent/30 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-primary">Digital Tasbih</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-3">
          <div className="font-arabic text-3xl text-primary leading-relaxed">
            {dhikrList[currentDhikr].arabic}
          </div>
          <div className="space-y-1">
            <div className="font-medium text-sm">{dhikrList[currentDhikr].transliteration}</div>
            <div className="text-xs text-muted-foreground italic">
              {dhikrList[currentDhikr].meaning}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg">
            {count}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button 
            size="sm" 
            onClick={handleIncrement}
            className="flex-1 gap-2 gradient-islamic border-0 text-lg py-6"
          >
            <Plus className="w-5 h-5" />
            Count
          </Button>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={nextDhikr}
          className="w-full text-primary hover:bg-primary/10"
        >
          Next Dhikr
        </Button>
      </CardContent>
    </Card>
  );
};

export default DhikrCounter;

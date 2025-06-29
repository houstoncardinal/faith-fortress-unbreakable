
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
    <Card className="card-luxury border-2 border-islamic-gold/50 shadow-xl">
      <CardHeader className="pb-4 bg-glass-gold">
        <CardTitle className="text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-green to-islamic-gold text-shadow">
          Digital Tasbih
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-islamic-gold/20 to-islamic-green/20 rounded-xl blur-lg"></div>
            <div className="relative bg-glass-green p-6 rounded-xl border-2 border-islamic-green/30">
              <div className="font-arabic text-4xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-green to-islamic-gold leading-relaxed text-shadow-gold animate-float-divine">
                {dhikrList[currentDhikr].arabic}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-lg text-islamic-green">{dhikrList[currentDhikr].transliteration}</div>
            <div className="text-sm text-muted-foreground italic font-medium bg-glass-gold px-4 py-2 rounded-lg border border-islamic-gold/30">
              {dhikrList[currentDhikr].meaning}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-islamic-gold to-islamic-green rounded-full blur-lg animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full gradient-kaaba text-white text-3xl font-bold shadow-2xl border-4 border-islamic-gold animate-divine-pulse">
              {count}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset} 
            className="gap-2 border-islamic-green/30 hover:bg-glass-green hover:border-islamic-gold transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 text-islamic-gold" />
            Reset
          </Button>
          <Button 
            size="sm" 
            onClick={handleIncrement}
            className="flex-1 gap-3 btn-luxury text-xl py-8 shadow-xl hover:shadow-2xl"
          >
            <Plus className="w-6 h-6" />
            Count
          </Button>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={nextDhikr}
          className="w-full text-islamic-gold hover:bg-glass-gold hover:text-islamic-green border border-transparent hover:border-islamic-gold transition-all duration-300"
        >
          Next Dhikr
        </Button>
      </CardContent>
    </Card>
  );
};

export default DhikrCounter;

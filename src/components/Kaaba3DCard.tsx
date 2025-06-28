
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Maximize2, Heart, Book } from "lucide-react";
import KaabaScene from './KaabaScene';

const Kaaba3DCard = () => {
  const [autoRotate, setAutoRotate] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  const resetCamera = () => {
    setAutoRotate(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoRotate}
            className="bg-black/40 backdrop-blur-sm border-gold/30 text-white hover:bg-gold/20"
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetCamera}
            className="bg-black/40 backdrop-blur-sm border-gold/30 text-white hover:bg-gold/20"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-black/40 backdrop-blur-sm border-gold/30 text-white hover:bg-gold/20"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
        <KaabaScene autoRotate={autoRotate} showControls={true} />
      </div>
    );
  }

  return (
    <Card className="border-primary/30 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background via-background to-primary/5">
      <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-lg">
        <CardTitle className="flex items-center justify-between text-primary">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse-gentle shadow-lg"></div>
            <div>
              <div className="font-arabic text-2xl mb-1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                بَيْتِ اللَّهِ الْحَرَامِ
              </div>
              <div className="text-sm font-medium text-primary/80">The Sacred House of Allah</div>
              <div className="text-xs text-muted-foreground italic">Qiblah of the Believers</div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAutoRotate}
              className="h-9 w-9 p-0 hover:bg-primary/10"
            >
              {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetCamera}
              className="h-9 w-9 p-0 hover:bg-primary/10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-9 w-9 p-0 hover:bg-primary/10"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80 w-full relative overflow-hidden rounded-lg">
          <KaabaScene autoRotate={autoRotate} showControls={true} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none"></div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center space-y-4 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
            <div className="font-arabic text-2xl text-primary leading-relaxed">
              رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
            </div>
            <div className="text-sm text-muted-foreground italic font-medium">
              "Our Lord, accept this from us. Indeed You are the Hearing, the Knowing."
            </div>
            <div className="text-xs text-muted-foreground">Prayer of Ibrahim (AS) - Surah Al-Baqarah (2:127)</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary/10 to-transparent p-4 rounded-lg border border-primary/20">
              <div className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 fill-current" />
                Sacred History
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                Built by Prophet Ibrahim (AS) and his son Ismail (AS) as commanded by Allah. 
                The Black Stone was placed by Ibrahim himself and was touched by our beloved Prophet Muhammad ﷺ.
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-accent/10 to-transparent p-4 rounded-lg border border-accent/20">
              <div className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                <Book className="w-4 h-4" />
                Divine Wisdom
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                The Kiswah is renewed annually as a symbol of spiritual renewal. 
                Every year, millions of believers face this sacred direction in their daily prayers.
              </div>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-accent/10">
            <div className="font-arabic text-lg text-primary mb-2 leading-relaxed">
              وَطَهِّرْ بَيْتِيَ لِلطَّائِفِينَ وَالْقَائِمِينَ وَالرُّكَّعِ السُّجُودِ
            </div>
            <div className="text-xs text-muted-foreground italic">
              "And purify My House for those who perform Tawaf and those who stand and bow and prostrate."
            </div>
            <div className="text-xs text-muted-foreground mt-1">Surah Al-Baqarah (2:125)</div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex-1 gap-2 hover:bg-primary/5 border-primary/20">
              <Heart className="w-4 h-4" />
              Virtual Hajj
            </Button>
            <Button size="sm" className="flex-1 gradient-islamic border-0 shadow-lg hover:shadow-xl transition-shadow">
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Kaaba3DCard;

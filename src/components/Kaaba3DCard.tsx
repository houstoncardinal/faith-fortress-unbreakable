
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Maximize2, Heart } from "lucide-react";
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
      <div className="fixed inset-0 z-50 bg-background">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoRotate}
            className="bg-background/80 backdrop-blur-sm"
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetCamera}
            className="bg-background/80 backdrop-blur-sm"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-background/80 backdrop-blur-sm"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
        <KaabaScene autoRotate={autoRotate} showControls={true} />
      </div>
    );
  }

  return (
    <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-primary">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-gentle"></div>
            <div>
              <div className="font-arabic text-lg">بَيْتِ اللَّهِ الْحَرَامِ</div>
              <div className="text-sm font-normal text-muted-foreground">The Sacred House</div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAutoRotate}
              className="h-8 w-8 p-0"
            >
              {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetCamera}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 w-8 p-0"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-72 w-full">
          <KaabaScene autoRotate={autoRotate} showControls={true} />
        </div>
        
        <div className="p-4 space-y-4">
          <div className="text-center space-y-2">
            <div className="font-arabic text-xl text-primary leading-relaxed">
              اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً
            </div>
            <div className="text-sm text-muted-foreground italic">
              "O Allah, increase this House in honor, reverence, respect and awe"
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/10">
            <div className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 fill-current" />
              Sacred Knowledge
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              The Kaaba is draped with the Kiswah, a black silk cloth embroidered with gold Quranic verses. 
              It is replaced annually during Hajj as a symbol of renewal and devotion. The Black Stone (Hajar al-Aswad) 
              was placed by Prophet Ibrahim (AS) and touched by Prophet Muhammad ﷺ.
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 gap-2">
              <Heart className="w-4 h-4" />
              Learn History
            </Button>
            <Button size="sm" className="flex-1 gradient-islamic border-0">
              Virtual Hajj Guide
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Kaaba3DCard;

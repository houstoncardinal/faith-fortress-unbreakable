
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Maximize2 } from "lucide-react";
import KaabaScene from './KaabaScene';

const Kaaba3DCard = () => {
  const [autoRotate, setAutoRotate] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  const resetCamera = () => {
    // This would trigger a camera reset - implementation depends on the scene
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
    <Card className="border-primary/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-primary">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Sacred Kaaba
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
        <div className="h-64 w-full">
          <KaabaScene autoRotate={autoRotate} showControls={true} />
        </div>
        
        <div className="p-4 space-y-3">
          <div className="text-center">
            <div className="font-arabic text-lg text-primary mb-1">
              بَيْتِ اللَّهِ الْحَرَامِ
            </div>
            <div className="text-sm text-muted-foreground">
              The Sacred House of Allah
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <strong>Did you know?</strong> The Kaaba is covered with a black silk cloth called the Kiswah, 
            which is replaced annually during Hajj. The cloth is embroidered with Quranic verses in gold thread.
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Learn More
            </Button>
            <Button size="sm" className="flex-1 gradient-islamic border-0">
              Virtual Tawaf
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Kaaba3DCard;

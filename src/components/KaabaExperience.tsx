import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, Info, RotateCcw, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const Kaaba3D = lazy(() => import('./Kaaba3D'));

function Kaaba3DLoading() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-background to-primary/5 rounded-xl">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 animate-pulse flex items-center justify-center">
          <span className="text-3xl">🕋</span>
        </div>
        <p className="text-sm text-muted-foreground">Preparing sacred view...</p>
      </div>
    </div>
  );
}

const kaabaFacts = [
  { title: 'The First House of Worship', arabic: 'أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ', description: 'The Kaaba is the first house of worship established for mankind (Quran 3:96).' },
  { title: 'Built by Ibrahim (AS)', arabic: 'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ', description: 'Prophet Ibrahim and Ismail raised the foundations by divine command.' },
  { title: 'Direction of Prayer', arabic: 'فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ', description: 'Muslims worldwide face the Kaaba during their five daily prayers.' },
  { title: 'The Black Stone', arabic: 'الحَجَر الأَسْوَد', description: 'Set in the eastern corner, it marks the starting point of Tawaf.' },
  { title: 'The Kiswah', arabic: 'كِسْوَة الكَعْبَة', description: 'The black silk cloth embroidered with Quranic verses in gold thread.' },
  { title: 'Tawaf', arabic: 'الطَّوَاف', description: 'Pilgrims walk around the Kaaba seven times counter-clockwise.' }
];

export default function KaabaExperience() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <>
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-islamic flex items-center justify-center shadow-md">
              <span className="text-xl">🕋</span>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">The Holy Kaaba</h3>
              <p className="font-arabic text-sm text-primary/70">الكَعْبَة المُشَرَّفَة</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" onClick={() => setAutoRotate(!autoRotate)} className={`rounded-xl w-9 h-9 ${autoRotate ? 'bg-primary/8' : ''}`}>
              <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
            </Button>
            <Dialog open={showInfo} onOpenChange={setShowInfo}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl w-9 h-9"><Info className="w-4 h-4" /></Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">Sacred Facts</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-3">
                    {kaabaFacts.map((fact, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}
                        className="p-4 rounded-xl bg-muted/40 border border-border/50">
                        <div className="font-arabic text-primary text-lg mb-1">{fact.arabic}</div>
                        <h4 className="font-semibold text-sm">{fact.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{fact.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(true)} className="rounded-xl w-9 h-9">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative h-[320px] lg:h-[420px]">
          <Suspense fallback={<Kaaba3DLoading />}>
            <Kaaba3D autoRotate={autoRotate} />
          </Suspense>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
              <Eye className="w-3 h-3 mr-1" /> Interactive 3D
            </Badge>
            <span className="text-[10px] text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-lg">
              Drag · Scroll · Pinch
            </span>
          </div>
        </div>
        
        <CardContent className="p-5 border-t border-border/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-display text-lg font-semibold text-primary">15m</div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Height</p>
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-primary">12×10m</div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Dimensions</p>
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-primary">7</div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Tawaf Rounds</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AnimatePresence>
        {isFullscreen && (
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 overflow-hidden">
              <div className="absolute top-4 right-4 z-50 flex gap-2">
                <Button variant="secondary" size="icon" onClick={() => setAutoRotate(!autoRotate)} className="bg-background/80 backdrop-blur-sm rounded-xl">
                  <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                </Button>
                <Button variant="secondary" size="icon" onClick={() => setIsFullscreen(false)} className="bg-background/80 backdrop-blur-sm rounded-xl">
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="w-full h-full">
                <Suspense fallback={<Kaaba3DLoading />}>
                  <Kaaba3D autoRotate={autoRotate} className="h-[95vh]" />
                </Suspense>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}

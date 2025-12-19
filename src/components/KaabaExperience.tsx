import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, Info, RotateCcw, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

// Lazy load the 3D component
const Kaaba3D = lazy(() => import('./Kaaba3D'));

// Loading fallback for 3D
function Kaaba3DLoading() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-background to-primary/10 rounded-xl">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse flex items-center justify-center">
          <span className="text-3xl">🕋</span>
        </div>
        <p className="text-muted-foreground">Loading 3D Experience...</p>
        <p className="text-xs text-muted-foreground mt-1">Preparing the sacred view</p>
      </div>
    </div>
  );
}

const kaabaFacts = [
  {
    title: 'The First House of Worship',
    arabic: 'أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ',
    description: 'The Kaaba is the first house of worship established for mankind, as mentioned in the Quran (3:96).'
  },
  {
    title: 'Built by Ibrahim (AS)',
    arabic: 'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ',
    description: 'Prophet Ibrahim and his son Ismail (peace be upon them) raised the foundations of the Kaaba by divine command.'
  },
  {
    title: 'Direction of Prayer',
    arabic: 'فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ',
    description: 'Muslims around the world face the Kaaba during their five daily prayers, unifying 2 billion believers.'
  },
  {
    title: 'The Black Stone',
    arabic: 'الحَجَر الأَسْوَد',
    description: 'Set in the eastern corner, the Black Stone descended from Paradise and marks the starting point of Tawaf.'
  },
  {
    title: 'The Kiswah',
    arabic: 'كِسْوَة الكَعْبَة',
    description: 'The black silk cloth covering the Kaaba is embroidered with Quranic verses in gold thread, renewed annually.'
  },
  {
    title: 'Tawaf - Circumambulation',
    arabic: 'الطَّوَاف',
    description: 'Pilgrims walk around the Kaaba seven times counter-clockwise, symbolizing unity in worship.'
  }
];

export default function KaabaExperience() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <>
      <Card className="border-primary/20 shadow-xl overflow-hidden bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl">🕋</span>
              </div>
              <div>
                <span className="text-xl">The Holy Kaaba</span>
                <div className="font-arabic text-sm text-primary font-normal">الكَعْبَة المُشَرَّفَة</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setAutoRotate(!autoRotate)}
                className={autoRotate ? 'bg-primary/10' : ''}
              >
                <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
              </Button>
              
              <Dialog open={showInfo} onOpenChange={setShowInfo}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Info className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <span className="text-2xl">🕋</span>
                      Sacred Facts about the Kaaba
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[50vh] pr-4">
                    <div className="space-y-4">
                      {kaabaFacts.map((fact, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10"
                        >
                          <div className="font-arabic text-primary text-lg mb-1">{fact.arabic}</div>
                          <h4 className="font-semibold text-foreground">{fact.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{fact.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFullscreen(true)}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="relative h-[350px] lg:h-[450px]">
            <Suspense fallback={<Kaaba3DLoading />}>
              <Kaaba3D autoRotate={autoRotate} />
            </Suspense>
            
            {/* Overlay info */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                <Eye className="w-3 h-3 mr-1" />
                Interactive 3D View
              </Badge>
              <p className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
                Drag to rotate • Scroll to zoom
              </p>
            </div>
          </div>
          
          {/* Quick facts bar */}
          <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-t border-primary/10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-arabic text-lg text-primary">15م</div>
                <p className="text-xs text-muted-foreground">Height</p>
              </div>
              <div>
                <div className="font-arabic text-lg text-primary">12م × 10م</div>
                <p className="text-xs text-muted-foreground">Dimensions</p>
              </div>
              <div>
                <div className="font-arabic text-lg text-primary">7</div>
                <p className="text-xs text-muted-foreground">Tawaf Rounds</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Fullscreen Dialog */}
      <AnimatePresence>
        {isFullscreen && (
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 overflow-hidden">
              <div className="absolute top-4 right-4 z-50 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsFullscreen(false)}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="w-full h-full">
                <Suspense fallback={<Kaaba3DLoading />}>
                  <Kaaba3D autoRotate={autoRotate} className="h-[95vh]" />
                </Suspense>
              </div>
              
              {/* Fullscreen overlay info */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="font-arabic text-xl text-primary">الكَعْبَة المُشَرَّفَة</div>
                  <p className="text-sm text-muted-foreground">The Noble Kaaba - House of Allah</p>
                </div>
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  Press ESC or click outside to exit
                </Badge>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}

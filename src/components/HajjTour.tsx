import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Clock, BookOpen, Star, Play, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { hajjDays, type HajjDay, type HajjRitual } from '@/data/hajjGuide';

const Kaaba3D = lazy(() => import('./Kaaba3D'));
const Arafat3D = lazy(() => import('./hajj-scenes/Arafat3D'));
const Mina3D = lazy(() => import('./hajj-scenes/Mina3D'));
const Jamarat3D = lazy(() => import('./hajj-scenes/Jamarat3D'));
const Muzdalifa3D = lazy(() => import('./hajj-scenes/Muzdalifa3D'));

function Scene3DLoader() {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 animate-pulse" />
        <p className="text-sm text-muted-foreground">Loading 3D scene...</p>
      </div>
    </div>
  );
}

function get3DScene(scene: HajjDay['scene']) {
  switch (scene) {
    case 'makkah': return <Kaaba3D />;
    case 'arafat': return <Arafat3D />;
    case 'mina': return <Mina3D />;
    case 'muzdalifah': return <Muzdalifa3D />;
    case 'jamarat': return <Jamarat3D />;
    default: return <Kaaba3D />;
  }
}

function RitualCard({ ritual, index }: { ritual: HajjRitual; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-primary/10 hover:border-primary/30 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <div className="flex-1">
              <div className="font-arabic text-lg text-primary">{ritual.arabicName}</div>
              <h4 className="font-semibold">{ritual.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{ritual.description}</p>
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </div>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-border space-y-4">
                  {ritual.dua && (
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg">
                      <p className="font-arabic text-lg text-primary text-center mb-2">{ritual.dua.arabic}</p>
                      <p className="text-sm text-center italic text-muted-foreground">{ritual.dua.transliteration}</p>
                      <p className="text-sm text-center mt-2">"{ritual.dua.translation}"</p>
                    </div>
                  )}
                  
                  <div>
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Steps
                    </h5>
                    <ol className="space-y-2">
                      {ritual.detailedSteps.map((step, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <span className="text-primary font-medium">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h5 className="font-medium mb-1 flex items-center gap-2">
                      <Star className="w-4 h-4 text-accent" /> Significance
                    </h5>
                    <p className="text-sm text-muted-foreground">{ritual.significance}</p>
                  </div>
                  
                  {ritual.tips && (
                    <div>
                      <h5 className="font-medium mb-2">Tips</h5>
                      <ul className="space-y-1">
                        {ritual.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex gap-2">
                            <span>•</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function HajjTour() {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const currentDay = hajjDays[currentDayIndex];
  
  const goToNextDay = () => setCurrentDayIndex(prev => Math.min(prev + 1, hajjDays.length - 1));
  const goToPrevDay = () => setCurrentDayIndex(prev => Math.max(prev - 1, 0));

  return (
    <>
      <Card className="border-primary/20 shadow-xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl">🕋</span>
              </div>
              <div>
                <span className="text-xl">Virtual Hajj Tour</span>
                <p className="text-sm text-muted-foreground font-normal">Experience the sacred pilgrimage</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(true)}>
              <Play className="w-4 h-4 mr-1" /> Immersive View
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Day Navigation */}
          <div className="flex items-center justify-between bg-muted/50 p-3 rounded-xl">
            <Button variant="ghost" size="icon" onClick={goToPrevDay} disabled={currentDayIndex === 0}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="text-center">
              <Badge variant="secondary" className="mb-1">{currentDay.islamicDate}</Badge>
              <h3 className="font-semibold">{currentDay.name}</h3>
              <p className="font-arabic text-primary">{currentDay.arabicName}</p>
            </div>
            
            <Button variant="ghost" size="icon" onClick={goToNextDay} disabled={currentDayIndex === hajjDays.length - 1}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          {/* 3D Scene Preview */}
          <div className="h-[250px] rounded-xl overflow-hidden">
            <Suspense fallback={<Scene3DLoader />}>
              {get3DScene(currentDay.scene)}
            </Suspense>
          </div>
          
          {/* Day Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {currentDay.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {currentDay.rituals.length} ritual(s)</span>
          </div>
          
          <p className="text-sm">{currentDay.description}</p>
          
          {/* Rituals */}
          <div className="space-y-3">
            <h4 className="font-semibold">Rituals for this Day</h4>
            {currentDay.rituals.map((ritual, i) => (
              <RitualCard key={ritual.id} ritual={ritual} index={i} />
            ))}
          </div>
          
          {/* Day Progress */}
          <div className="flex gap-1 justify-center pt-2">
            {hajjDays.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentDayIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === currentDayIndex ? 'bg-primary' : 'bg-muted-foreground/30'}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
          <div className="absolute top-4 right-4 z-50">
            <Button variant="secondary" size="icon" onClick={() => setIsFullscreen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="w-full h-full">
            <Suspense fallback={<Scene3DLoader />}>
              {get3DScene(currentDay.scene)}
            </Suspense>
          </div>
          <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-sm p-4 rounded-xl">
            <Badge variant="secondary" className="mb-1">{currentDay.islamicDate}</Badge>
            <h3 className="font-semibold">{currentDay.name}</h3>
            <p className="text-sm text-muted-foreground">{currentDay.location}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


import { useState } from 'react';
import { Play, BookOpen, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import GuidedPrayerSession from './GuidedPrayerSession';
import { getPrayerGuide, PrayerGuide } from '@/data/generatePrayerGuides';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';

const GuidedPrayerLauncher = () => {
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerGuide | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const { prayerTimes, nextPrayer } = usePrayerTimes();

  const availablePrayers = [
    { key: 'fajr', name: 'Fajr', arabic: 'الفجر', description: 'Dawn Prayer (2 Rakats)' },
    { key: 'dhuhr', name: 'Dhuhr', arabic: 'الظهر', description: 'Midday Prayer (4 Rakats)' },
    { key: 'asr', name: 'Asr', arabic: 'العصر', description: 'Afternoon Prayer (4 Rakats)' },
    { key: 'maghrib', name: 'Maghrib', arabic: 'المغرب', description: 'Sunset Prayer (3 Rakats)' },
    { key: 'isha', name: 'Isha', arabic: 'العشاء', description: 'Night Prayer (4 Rakats)' }
  ];

  const handleStartSession = (prayerKey: string) => {
    const guide = getPrayerGuide(prayerKey);
    if (guide) {
      setSelectedPrayer(guide);
      setIsSessionActive(true);
    }
  };

  const handleCompleteSession = () => {
    setIsSessionActive(false);
    setSelectedPrayer(null);
  };

  const handleExitSession = () => {
    setIsSessionActive(false);
    setSelectedPrayer(null);
  };

  if (isSessionActive && selectedPrayer) {
    return (
      <GuidedPrayerSession
        prayerName={selectedPrayer.name}
        prayerSteps={selectedPrayer.steps}
        onComplete={handleCompleteSession}
        onExit={handleExitSession}
      />
    );
  }

  return (
    <Card className="border-primary/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary text-lg md:text-xl">
          <BookOpen className="w-5 h-5" />
          Guided Prayer Sessions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Perfect for beginners - learn step by step with audio and visual guidance
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Start - Next Prayer - Mobile Optimized */}
        {nextPrayer && (
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg border border-primary/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-primary">Next Prayer</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{nextPrayer.name} at {nextPrayer.time}</span>
                </div>
              </div>
              <div className="font-arabic text-xl text-primary text-center sm:text-right">
                {nextPrayer.arabic}
              </div>
            </div>
            <Button 
              onClick={() => handleStartSession(nextPrayer.name.toLowerCase())}
              className="w-full gap-2 gradient-islamic border-0"
            >
              <Play className="w-4 h-4" />
              Start Guided {nextPrayer.name}
            </Button>
          </div>
        )}

        {/* All Prayers Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 gap-3">
          {availablePrayers.map((prayer) => {
            const currentPrayerTime = prayerTimes.find(p => p.name.toLowerCase() === prayer.key);
            const isCurrentPrayer = nextPrayer?.name.toLowerCase() === prayer.key;
            
            return (
              <div 
                key={prayer.key}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  isCurrentPrayer 
                    ? 'border-primary/30 bg-primary/5' 
                    : 'border-primary/10 hover:border-primary/20 hover:bg-primary/2'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                      <h4 className="font-medium text-primary">{prayer.name}</h4>
                      <span className="font-arabic text-sm text-accent">{prayer.arabic}</span>
                      {isCurrentPrayer && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full w-fit">
                          Next
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{prayer.description}</p>
                    {currentPrayerTime && (
                      <p className="text-xs text-muted-foreground">
                        Time: {currentPrayerTime.time}
                      </p>
                    )}
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                        <Play className="w-3 h-3" />
                        Guide Me
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md mx-4 sm:mx-auto">
                      <DialogHeader>
                        <DialogTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-left">
                          <span>Start Guided {prayer.name}?</span>
                          <span className="font-arabic text-primary">{prayer.arabic}</span>
                        </DialogTitle>
                        <DialogDescription>
                          Begin your guided prayer session with step-by-step instructions, proper positioning, and Arabic recitations with translations.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            What you'll learn:
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            <li>Proper prayer positions and movements</li>
                            <li>Arabic recitations with translations</li>
                            <li>Step-by-step guidance with timing</li>
                            <li>Audio pronunciation (where available)</li>
                          </ul>
                        </div>
                        <Button 
                          onClick={() => handleStartSession(prayer.key)}
                          className="w-full gap-2 gradient-islamic border-0"
                        >
                          <Play className="w-4 h-4" />
                          Start Guided Session
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Text - Mobile Optimized */}
        <div className="bg-gradient-to-r from-accent/5 to-primary/5 p-3 rounded-lg border border-accent/20">
          <div className="font-arabic text-sm md:text-base text-primary mb-1 text-center">
            وَأَقِمِ الصَّلَاةَ لِذِكْرِي
          </div>
          <p className="text-xs text-muted-foreground italic text-center">
            "And establish prayer for My remembrance" - Quran 20:14
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuidedPrayerLauncher;

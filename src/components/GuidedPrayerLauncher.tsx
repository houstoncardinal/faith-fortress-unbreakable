import { useState } from 'react';
import { Play, BookOpen, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import GuidedPrayerSession from './GuidedPrayerSession';
import { getPrayerGuide, PrayerGuide } from '@/data/generatePrayerGuides';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';

const GuidedPrayerLauncher = () => {
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerGuide | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const { prayerTimes, nextPrayer } = usePrayerTimes();

  const availablePrayers = [
    { key: 'fajr', name: 'Fajr', arabic: 'الفجر', rakats: '2 Rakats' },
    { key: 'dhuhr', name: 'Dhuhr', arabic: 'الظهر', rakats: '4 Rakats' },
    { key: 'asr', name: 'Asr', arabic: 'العصر', rakats: '4 Rakats' },
    { key: 'maghrib', name: 'Maghrib', arabic: 'المغرب', rakats: '3 Rakats' },
    { key: 'isha', name: 'Isha', arabic: 'العشاء', rakats: '4 Rakats' }
  ];

  const handleStartSession = (prayerKey: string) => {
    const guide = getPrayerGuide(prayerKey);
    if (guide) {
      setSelectedPrayer(guide);
      setIsSessionActive(true);
    }
  };

  if (isSessionActive && selectedPrayer) {
    return (
      <GuidedPrayerSession
        prayerName={selectedPrayer.name}
        prayerSteps={selectedPrayer.steps}
        onComplete={() => { setIsSessionActive(false); setSelectedPrayer(null); }}
        onExit={() => { setIsSessionActive(false); setSelectedPrayer(null); }}
      />
    );
  }

  return (
    <Card className="card-elevated overflow-hidden">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">Guided Prayer</h3>
            <p className="text-xs text-muted-foreground">Step-by-step with audio guidance</p>
          </div>
        </div>

        {/* Quick Start */}
        {nextPrayer && (
          <button
            onClick={() => handleStartSession(nextPrayer.name.toLowerCase())}
            className="w-full p-5 rounded-2xl gradient-islamic text-white text-left group hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Start Now</p>
                <p className="font-display text-xl font-semibold">{nextPrayer.name}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-white/70">
                  <Clock className="w-3.5 h-3.5" />
                  <span>at {nextPrayer.time}</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <Play className="w-6 h-6 ml-0.5" />
              </div>
            </div>
          </button>
        )}

        {/* Prayer list */}
        <div className="space-y-2">
          {availablePrayers.map((prayer) => {
            const isNext = nextPrayer?.name.toLowerCase() === prayer.key;
            const prayerTime = prayerTimes.find(p => p.name.toLowerCase() === prayer.key);
            
            return (
              <Dialog key={prayer.key}>
                <DialogTrigger asChild>
                  <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all text-left ${
                    isNext ? 'bg-primary/5 border border-primary/10' : 'hover:bg-muted/40'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="font-arabic text-lg text-primary w-12 text-center">{prayer.arabic}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{prayer.name}</span>
                          {isNext && <Badge className="bg-accent/15 text-accent border-0 text-[10px] px-1.5 py-0">Next</Badge>}
                        </div>
                        <span className="text-xs text-muted-foreground">{prayer.rakats}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {prayerTime && <span className="text-xs font-mono text-muted-foreground">{prayerTime.time}</span>}
                      <Play className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-md rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl">
                      Guided {prayer.name}
                      <span className="font-arabic text-primary ml-2">{prayer.arabic}</span>
                    </DialogTitle>
                    <DialogDescription>
                      Step-by-step instructions with proper positioning and Arabic recitations.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-muted/40 p-4 rounded-xl">
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        What you'll learn:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Proper prayer positions</li>
                        <li>Arabic recitations with translations</li>
                        <li>Step-by-step timing guidance</li>
                      </ul>
                    </div>
                    <Button 
                      onClick={() => handleStartSession(prayer.key)}
                      className="w-full gap-2 gradient-islamic border-0 rounded-xl text-white"
                    >
                      <Play className="w-4 h-4" />
                      Begin Session
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuidedPrayerLauncher;

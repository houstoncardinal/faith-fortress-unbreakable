import { Clock, MapPin, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useState } from "react";

const PrayerTimesCard = () => {
  const { prayerTimes, nextPrayer, timeUntilNext, currentTime, isAzaanTime, location, accuracy } = usePrayerTimes();
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <Card className={`overflow-hidden border-0 shadow-xl transition-all duration-500 ${
      isAzaanTime ? 'animate-blessed-glow' : ''
    }`}>
      {/* Header gradient bar */}
      <div className="gradient-islamic p-6 lg:p-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg lg:text-xl font-semibold">Prayer Times</h2>
              <div className="flex items-center gap-1.5 text-xs text-white/70 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{location ? location.timezone : 'Locating...'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono bg-white/10 px-3 py-1.5 rounded-lg">{currentTime}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg w-9 h-9"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Next Prayer Highlight */}
        {nextPrayer && (
          <div className={`rounded-xl p-5 backdrop-blur-sm border transition-all ${
            isAzaanTime ? 'border-accent/40 bg-accent/15' : 'border-white/10 bg-white/8'
          }`}>
            <div className="text-xs uppercase tracking-widest text-white/60 mb-2 font-medium">
              {isAzaanTime ? "🕌 It's Prayer Time" : "Next Prayer"}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="font-display text-xl font-semibold">{nextPrayer.name}</div>
                <div className="font-arabic text-2xl mt-1 text-white/90">{nextPrayer.arabic}</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold font-mono tracking-tight">{nextPrayer.time}</div>
                {!isAzaanTime && <div className="text-sm text-white/60 mt-1">in {timeUntilNext}</div>}
                {isAzaanTime && <div className="text-sm text-accent font-semibold animate-pulse mt-1">Azaan Time</div>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prayer list */}
      <CardContent className="p-4 lg:p-6 space-y-1">
        {prayerTimes.map((prayer, index) => (
          <div 
            key={index} 
            className={`flex justify-between items-center py-3.5 px-4 rounded-xl transition-all duration-200 ${
              prayer.passed 
                ? 'opacity-50' 
                : prayer.name === nextPrayer?.name 
                  ? 'bg-primary/5 border border-primary/10' 
                  : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                prayer.passed ? 'bg-emerald' : prayer.name === nextPrayer?.name ? 'bg-accent' : 'bg-muted-foreground/20'
              }`} />
              <div>
                <div className="font-medium text-sm">{prayer.name}</div>
                <div className="font-arabic text-xs text-muted-foreground">{prayer.arabic}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm font-semibold">{prayer.time}</div>
              {prayer.passed && <div className="text-[10px] text-emerald font-medium">✓ Prayed</div>}
            </div>
          </div>
        ))}

        <div className="pt-4 mt-2 border-t border-border/40 text-center">
          <div className="font-arabic text-base text-primary/70 leading-relaxed">
            وَأَقِمِ الصَّلَاةَ لِذِكْرِي
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 italic">
            "And establish prayer for My remembrance" — 20:14
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerTimesCard;

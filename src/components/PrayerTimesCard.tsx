
import { Clock, MapPin, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useState } from "react";

const PrayerTimesCard = () => {
  const { prayerTimes, nextPrayer, timeUntilNext, currentTime, isAzaanTime, location, accuracy } = usePrayerTimes();
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <Card className={`gradient-islamic text-white border-0 shadow-lg transition-all duration-500 ${
      isAzaanTime ? 'animate-blessed-glow' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5" />
            Prayer Times
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <MapPin className="w-4 h-4" />
            <span>
              {location ? `${location.timezone}` : 'Getting location...'}
              {accuracy && accuracy > 0 && ` (±${Math.round(accuracy)}m)`}
            </span>
          </div>
          <div className="text-sm font-mono bg-white/10 px-2 py-1 rounded">
            {currentTime}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Next Prayer Highlight */}
        {nextPrayer && (
          <div className={`bg-white/15 rounded-lg p-4 backdrop-blur-sm border ${
            isAzaanTime ? 'border-yellow-300/50 bg-yellow-500/20' : 'border-white/10'
          } transition-all duration-300`}>
            <div className="text-sm opacity-90 mb-2">
              {isAzaanTime ? "🕌 It's Prayer Time!" : "Next Prayer"}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{nextPrayer.name}</div>
                <div className="font-arabic text-xl leading-relaxed">{nextPrayer.arabic}</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold font-mono">{nextPrayer.time}</div>
                {!isAzaanTime && (
                  <div className="text-sm opacity-75">in {timeUntilNext}</div>
                )}
                {isAzaanTime && (
                  <div className="text-sm text-yellow-200 font-medium animate-pulse">
                    Azaan Time
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* All Prayer Times Grid */}
        <div className="grid grid-cols-1 gap-2">
          {prayerTimes.map((prayer, index) => (
            <div 
              key={index} 
              className={`flex justify-between items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                prayer.passed 
                  ? 'bg-white/5 opacity-60' 
                  : prayer.name === nextPrayer?.name 
                    ? 'bg-white/15 border border-white/20' 
                    : 'bg-white/8'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  prayer.passed ? 'bg-green-400' : 'bg-white/40'
                }`} />
                <div>
                  <div className="font-medium">{prayer.name}</div>
                  <div className="font-arabic text-sm opacity-75 leading-relaxed">
                    {prayer.arabic}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-semibold">{prayer.time}</div>
                {prayer.passed && (
                  <div className="text-xs text-green-300">✓ Completed</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Islamic Prayer Reminder */}
        <div className="bg-white/5 rounded-lg p-3 text-center border-t border-white/10">
          <div className="font-arabic text-lg mb-1 leading-relaxed">
            وَأَقِمِ الصَّلَاةَ لِذِكْرِي
          </div>
          <div className="text-xs opacity-75 italic">
            "And establish prayer for My remembrance" - Quran 20:14
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerTimesCard;

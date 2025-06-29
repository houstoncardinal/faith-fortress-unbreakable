
import { Clock, MapPin, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useState } from "react";

const PrayerTimesCard = () => {
  const { prayerTimes, nextPrayer, timeUntilNext, currentTime, isAzaanTime } = usePrayerTimes();
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <Card className={`card-luxury border-2 border-gold shadow-2xl transition-all duration-500 ${
      isAzaanTime ? 'animate-blessed-glow' : 'animate-divine-pulse'
    }`}>
      <CardHeader className="pb-4 bg-gradient-islamic rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl text-white">
            <div className="p-2 bg-white/20 rounded-full border border-gold">
              <Clock className="w-6 h-6 text-islamic-gold" />
            </div>
            <span className="text-shadow-gold">Prayer Times</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-white/90 hover:text-white hover:bg-white/20 border border-transparent hover:border-gold transition-all duration-300"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-white/90">
            <div className="p-1 bg-white/20 rounded-full">
              <MapPin className="w-4 h-4 text-islamic-gold" />
            </div>
            <span className="font-medium">Current Location</span>
          </div>
          <div className="text-sm font-mono bg-white/20 px-3 py-2 rounded-lg border border-gold/50">
            {currentTime}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Next Prayer Highlight */}
        {nextPrayer && (
          <div className={`relative overflow-hidden rounded-xl p-6 backdrop-blur-sm border-2 transition-all duration-300 ${
            isAzaanTime 
              ? 'border-islamic-gold bg-gradient-to-r from-islamic-gold/20 to-islamic-green/20 animate-shimmer-gold' 
              : 'border-islamic-green/30 bg-glass-green'
          }`}>
            <div className="text-sm text-muted-foreground mb-3 font-medium">
              {isAzaanTime ? "🕌 It's Prayer Time!" : "Next Prayer"}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-2xl text-islamic-green mb-2">{nextPrayer.name}</div>
                <div className="font-arabic text-3xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-islamic-gold to-islamic-green text-shadow">
                  {nextPrayer.arabic}
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold font-mono text-islamic-gold text-shadow-gold">
                  {nextPrayer.time}
                </div>
                {!isAzaanTime && (
                  <div className="text-sm text-muted-foreground font-medium">in {timeUntilNext}</div>
                )}
                {isAzaanTime && (
                  <div className="text-sm text-islamic-gold font-bold animate-pulse">
                    Azaan Time
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* All Prayer Times Grid */}
        <div className="grid grid-cols-1 gap-3">
          {prayerTimes.map((prayer, index) => (
            <div 
              key={index} 
              className={`flex justify-between items-center py-4 px-5 rounded-xl transition-all duration-200 border ${
                prayer.passed 
                  ? 'bg-glass border-islamic-green/20 opacity-70' 
                  : prayer.name === nextPrayer?.name 
                    ? 'bg-glass-gold border-2 border-islamic-gold shadow-lg animate-divine-pulse' 
                    : 'bg-glass-green border-islamic-green/30 hover:border-islamic-gold/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full border-2 ${
                  prayer.passed 
                    ? 'bg-islamic-green border-islamic-green' 
                    : 'bg-transparent border-islamic-gold animate-pulse'
                }`} />
                <div>
                  <div className="font-semibold text-lg text-islamic-green">{prayer.name}</div>
                  <div className="font-arabic text-base text-transparent bg-clip-text bg-gradient-to-r from-islamic-gold to-islamic-green leading-relaxed">
                    {prayer.arabic}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-xl text-islamic-gold">{prayer.time}</div>
                {prayer.passed && (
                  <div className="text-xs text-islamic-green font-medium">✓ Completed</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Divine Reminder */}
        <div className="bg-glass-gold rounded-xl p-6 text-center border-2 border-islamic-gold/50 shadow-lg">
          <div className="font-arabic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-green to-islamic-gold mb-3 leading-relaxed text-shadow">
            وَأَقِمِ الصَّلَاةَ لِذِكْرِي
          </div>
          <div className="text-sm text-muted-foreground italic font-medium">
            "And establish prayer for My remembrance" - Quran 20:14
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerTimesCard;

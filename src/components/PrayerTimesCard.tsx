
import { Clock, MapPin, Volume2, VolumeX, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useAstronomy } from "@/hooks/useAstronomy";
import { getTwilightState, getTwilightLabel } from "@/utils/astronomyEngine";
import { formatInTimeZone } from "date-fns-tz";
import { useState } from "react";

const PrayerTimesCard = () => {
  const { prayerTimes, nextPrayer, timeUntilNext, currentTime, isAzaanTime, location, accuracy } = usePrayerTimes();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showAstro, setShowAstro] = useState(false);

  const astronomy = useAstronomy({
    lat: location?.lat ?? null,
    lng: location?.lng ?? null,
  });

  const timezone = location?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatTime = (date: Date | null): string => {
    if (!date) return '--:--';
    return formatInTimeZone(date, timezone, 'h:mm a');
  };

  const twilightState = astronomy.sun ? getTwilightState(astronomy.sun.altitude) : null;

  return (
    <Card className={`gradient-luxury text-white border-0 shadow-luxury-xl overflow-hidden transition-all duration-500 ${
      isAzaanTime ? 'animate-blessed-glow' : ''
    }`}>
      {/* Ambient glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

      <CardHeader className="pb-3 relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-inner-glow">
              <Clock className="w-4 h-4" />
            </div>
            Prayer Times
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-all"
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
          <div className="text-sm font-mono bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
            {currentTime}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        {/* Next Prayer Highlight */}
        {nextPrayer && (
          <div className={`rounded-2xl p-4 backdrop-blur-md border transition-all duration-500 ${
            isAzaanTime
              ? 'border-yellow-300/40 bg-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.2)]'
              : 'border-white/15 bg-white/10 shadow-inner-glow'
          }`}>
            <div className="text-xs uppercase tracking-widest opacity-80 mb-2 font-semibold">
              {isAzaanTime ? "It's Prayer Time!" : "Next Prayer"}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{nextPrayer.name}</div>
                <div className="font-arabic text-xl leading-relaxed text-white/90">{nextPrayer.arabic}</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold font-mono text-shadow-glow">{nextPrayer.time}</div>
                {!isAzaanTime && (
                  <div className="text-sm opacity-75 font-medium">in {timeUntilNext}</div>
                )}
                {isAzaanTime && (
                  <div className="text-sm text-yellow-200 font-semibold animate-pulse-gentle">
                    Azaan Time
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* All Prayer Times Grid */}
        <div className="grid grid-cols-1 gap-1.5">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-3 px-4 rounded-xl transition-all duration-300 ${
                prayer.passed
                  ? 'bg-white/5 opacity-50'
                  : prayer.name === nextPrayer?.name
                    ? 'bg-white/15 border border-white/20 shadow-inner-glow'
                    : 'bg-white/[0.06] hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  prayer.passed
                    ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]'
                    : prayer.name === nextPrayer?.name
                      ? 'bg-accent shadow-glow-accent'
                      : 'bg-white/30'
                }`} />
                <div>
                  <div className="font-medium text-sm">{prayer.name}</div>
                  <div className="font-arabic text-sm opacity-70 leading-relaxed">
                    {prayer.arabic}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-semibold">{prayer.time}</div>
                {prayer.passed && (
                  <div className="text-xs text-green-300 font-medium">Completed</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Astronomical Details (collapsible) */}
        {astronomy.twilight && (
          <div>
            <button
              onClick={() => setShowAstro(!showAstro)}
              className="flex items-center justify-between w-full text-xs opacity-50 hover:opacity-90 transition-all py-2 px-2 rounded-lg hover:bg-white/5"
            >
              <span className="tracking-wide">Astronomical Details (JPL Ephemeris)</span>
              {showAstro ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {showAstro && (
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-xl p-4 mt-1 space-y-2 text-xs border border-white/[0.08]">
                {twilightState && (
                  <div className="flex justify-between items-center">
                    <span className="opacity-70">Current State</span>
                    <span className="font-medium bg-white/10 px-2 py-0.5 rounded-md">{getTwilightLabel(twilightState)}</span>
                  </div>
                )}
                {astronomy.sun && (
                  <div className="flex justify-between">
                    <span className="opacity-70">Sun Altitude</span>
                    <span className="font-mono">
                      {astronomy.sun.altitude > 0 ? '+' : ''}{astronomy.sun.altitude}&deg;
                    </span>
                  </div>
                )}
                <div className="border-t border-white/[0.08] pt-2 mt-2 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="opacity-70">Astronomical Dawn (-18&deg;)</span>
                    <span className="font-mono">{formatTime(astronomy.twilight.astronomicalDawn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Civil Dawn (-6&deg;)</span>
                    <span className="font-mono">{formatTime(astronomy.twilight.civilDawn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Sunrise</span>
                    <span className="font-mono">{formatTime(astronomy.twilight.sunrise)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Sunset</span>
                    <span className="font-mono">{formatTime(astronomy.twilight.sunset)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Civil Dusk (-6&deg;)</span>
                    <span className="font-mono">{formatTime(astronomy.twilight.civilDusk)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Astronomical Dusk (-18&deg;)</span>
                    <span className="font-mono">{formatTime(astronomy.twilight.astronomicalDusk)}</span>
                  </div>
                </div>
                {astronomy.moon && (
                  <div className="border-t border-white/[0.08] pt-2 mt-2 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="opacity-70">Moon Phase</span>
                      <span>{astronomy.moon.emoji} {astronomy.moon.phaseName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Moon Illumination</span>
                      <span className="font-mono">{astronomy.moon.illuminationPercent}%</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Islamic Prayer Reminder */}
        <div className="bg-white/[0.06] backdrop-blur-sm rounded-xl p-4 text-center border border-white/[0.08]">
          <div className="font-arabic text-lg mb-1 leading-relaxed text-shadow-glow">
            وَأَقِمِ الصَّلَاةَ لِذِكْرِي
          </div>
          <div className="text-xs opacity-60 italic">
            "And establish prayer for My remembrance" - Quran 20:14
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerTimesCard;

import { Calendar, Star, Sun, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useAstronomy } from '@/hooks/useAstronomy';
import { useHijriDate } from '@/hooks/useHijriDate';
import { getTwilightState, getTwilightLabel } from '@/utils/astronomyEngine';
import { formatInTimeZone } from 'date-fns-tz';

const EnhancedIslamicCalendar = () => {
  const geo = useGeolocation();
  const astronomy = useAstronomy({
    lat: geo.latitude,
    lng: geo.longitude,
  });
  const hijri = useHijriDate();

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const twilightState = astronomy.sun
    ? getTwilightState(astronomy.sun.altitude)
    : null;

  const twilightLabel = twilightState ? getTwilightLabel(twilightState) : null;

  const formatTime = (date: Date | null): string => {
    if (!date) return '--:--';
    return formatInTimeZone(date, timezone, 'h:mm a');
  };

  return (
    <Card className="border-accent/20 shadow-luxury-lg overflow-hidden relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />

      <CardHeader className="pb-3 relative">
        <CardTitle className="flex items-center gap-2 text-primary text-lg">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          Islamic Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        {/* Section A: Dynamic Hijri Date */}
        <div className="text-center p-4 bg-gradient-to-br from-primary/[0.08] to-accent/[0.08] rounded-2xl border border-primary/10">
          <div className="text-sm text-muted-foreground mb-1">Today's Islamic Date</div>
          {hijri.today ? (
            <>
              <div className="font-semibold text-lg text-primary">
                {hijri.today.formatted}
              </div>
              <div className="font-arabic text-xl mt-1 text-accent leading-relaxed">
                {hijri.today.formattedArabic}
              </div>
            </>
          ) : (
            <div className="text-muted-foreground">Calculating...</div>
          )}
        </div>

        {/* Section B: Moon Phase */}
        {astronomy.moon && (
          <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-muted/30 to-accent/[0.06] rounded-xl border border-accent/10">
            <div className="text-4xl drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">{astronomy.moon.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-primary">
                {astronomy.moon.phaseName}
              </div>
              <div className="text-xs text-muted-foreground">
                {astronomy.moon.illuminationPercent}% illuminated
              </div>
              {astronomy.nextNewMoon && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  New moon in {astronomy.nextNewMoon.daysFromNow} days
                </div>
              )}
            </div>
            <div className="text-right">
              <Moon className={`w-4 h-4 transition-all ${astronomy.moon.isAboveHorizon ? 'text-accent drop-shadow-[0_0_6px_hsl(var(--accent)/0.5)]' : 'text-muted-foreground/40'}`} />
              <div className="text-xs text-muted-foreground mt-0.5">
                {astronomy.moon.isAboveHorizon ? 'Visible' : 'Below horizon'}
              </div>
            </div>
          </div>
        )}

        {/* Section C: Sun & Twilight Status */}
        {astronomy.sun && twilightLabel && (
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-muted/30 to-primary/[0.06] rounded-xl border border-primary/10">
            <Sun className={`w-5 h-5 transition-all ${astronomy.sun.isAboveHorizon ? 'text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]' : 'text-muted-foreground/40'}`} />
            <div className="flex-1">
              <div className="font-medium text-sm text-primary">{twilightLabel}</div>
              <div className="text-xs text-muted-foreground">
                Sun altitude: {astronomy.sun.altitude > 0 ? '+' : ''}
                {astronomy.sun.altitude}&deg;
              </div>
            </div>
            {astronomy.twilight && (
              <div className="text-right text-xs text-muted-foreground">
                <div>Rise {formatTime(astronomy.twilight.sunrise)}</div>
                <div>Set {formatTime(astronomy.twilight.sunset)}</div>
              </div>
            )}
          </div>
        )}

        {/* Section D: Upcoming Events */}
        {hijri.upcomingEvents.length > 0 && (
          <div className="space-y-2">
            <div className="font-medium text-sm text-primary tracking-wide">Upcoming Events</div>
            {hijri.upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-all duration-200 border border-transparent hover:border-primary/10"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Star className="w-4 h-4 text-accent flex-shrink-0 drop-shadow-[0_0_4px_hsl(var(--accent)/0.3)]" />
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{event.name}</div>
                    <div className="font-arabic text-xs text-muted-foreground">
                      {event.arabic}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="text-sm font-medium text-primary">{event.hijriDate}</div>
                  <div className="text-xs text-muted-foreground">
                    in {event.daysFromNow} day{event.daysFromNow !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section E: Dua */}
        <div className="text-center p-4 bg-gradient-to-br from-accent/[0.08] to-primary/[0.06] rounded-2xl border border-accent/10">
          <div className="font-arabic text-lg text-primary mb-1 leading-relaxed text-shadow-sm">
            {'\u0623\u064E\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0628\u064E\u0627\u0631\u0650\u0643\u0652 \u0644\u064E\u0646\u064E\u0627 \u0641\u0650\u064A\u0645\u064E\u0627 \u0631\u064E\u0632\u064E\u0642\u0652\u062A\u064E\u0646\u064E\u0627'}
          </div>
          <div className="text-xs text-muted-foreground italic">
            "O Allah, bless us in what You have provided for us"
          </div>
        </div>

        {/* Data Source Attribution */}
        <div className="text-center text-[10px] text-muted-foreground/40 tracking-wide">
          Powered by JPL DE405 Ephemeris
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedIslamicCalendar;

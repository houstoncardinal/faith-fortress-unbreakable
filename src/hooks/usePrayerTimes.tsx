
import { useState, useEffect, useMemo, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { formatInTimeZone } from 'date-fns-tz';
import {
  CalculationMethod,
  CalculationParameters,
  Coordinates,
  HighLatitudeRule,
  Madhab,
  PrayerTimes as AdhanPrayerTimes,
} from 'adhan';

export interface PrayerTime {
  name: string;
  time: string;
  timeObject: Date;
  arabic: string;
  passed: boolean;
}

interface PrayerTimesHook {
  prayerTimes: PrayerTime[];
  nextPrayer: PrayerTime | null;
  timeUntilNext: string;
  currentTime: string;
  isAzaanTime: boolean;
  location: { lat: number; lng: number; timezone: string } | null;
  accuracy: number | null;
}

interface LocationState {
  lat: number;
  lng: number;
  timezone: string;
  accuracy: number;
}

/**
 * Auto-detect the most appropriate Islamic calculation method based on coordinates.
 * Maps geographic regions to their conventional calculation authorities.
 *
 * Methods and their Fajr / Isha angles:
 *   NorthAmerica (ISNA)   – 15° / 15°
 *   MuslimWorldLeague     – 18° / 17°
 *   Egyptian               – 19.5° / 17.5°
 *   Karachi                – 18° / 18°
 *   UmmAlQura              – 18.5° / 90 min after Maghrib
 *   Dubai                  – 18.2° / 18.2°
 *   Qatar                  – 18° / 90 min
 *   Kuwait                 – 18° / 17.5°
 *   Singapore              – 20° / 18°
 *   Turkey                 – 18° / 17°
 *   Tehran                 – 17.7° / 14° (+ 4.5° Maghrib)
 */
const getCalculationMethod = (lat: number, lng: number): CalculationParameters => {
  // --- North America ---
  if (lat >= 15 && lat <= 75 && lng >= -170 && lng <= -50) {
    return CalculationMethod.NorthAmerica();
  }

  // --- Turkey & Balkans ---
  if (lat >= 36 && lat <= 42 && lng >= 26 && lng <= 45) {
    return CalculationMethod.Turkey();
  }

  // --- Iran ---
  if (lat >= 25 && lat <= 40 && lng >= 44 && lng <= 63) {
    return CalculationMethod.Tehran();
  }

  // --- Arabian Peninsula & Gulf (check specific countries before Saudi fallback) ---
  if (lat >= 15 && lat <= 33 && lng >= 34 && lng <= 60) {
    // Qatar
    if (lng >= 50.5 && lng <= 52 && lat >= 24.5 && lat <= 26.5) {
      return CalculationMethod.Qatar();
    }
    // Kuwait
    if (lng >= 46.5 && lng <= 49 && lat >= 28 && lat <= 31) {
      return CalculationMethod.Kuwait();
    }
    // UAE
    if (lng >= 51 && lng <= 56.5 && lat >= 22 && lat <= 26.5) {
      return CalculationMethod.Dubai();
    }
    // Saudi Arabia & remaining peninsula
    return CalculationMethod.UmmAlQura();
  }

  // --- Egypt & North Africa ---
  if (lat >= 18 && lat <= 37 && lng >= -17 && lng <= 34) {
    return CalculationMethod.Egyptian();
  }

  // --- South Asia (Pakistan, India, Bangladesh, Afghanistan) ---
  if (lat >= 5 && lat <= 37 && lng >= 60 && lng <= 93) {
    return CalculationMethod.Karachi();
  }

  // --- Southeast Asia (Singapore, Malaysia, Indonesia, Brunei) ---
  if (lat >= -11 && lat <= 8 && lng >= 95 && lng <= 141) {
    return CalculationMethod.Singapore();
  }

  // --- Default: Muslim World League (most widely accepted globally) ---
  return CalculationMethod.MuslimWorldLeague();
};

const PRAYER_ARABIC: Record<string, string> = {
  Fajr: 'الفجر',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

const PRAYER_ORDER: { key: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'; name: string }[] = [
  { key: 'fajr', name: 'Fajr' },
  { key: 'dhuhr', name: 'Dhuhr' },
  { key: 'asr', name: 'Asr' },
  { key: 'maghrib', name: 'Maghrib' },
  { key: 'isha', name: 'Isha' },
];

export const usePrayerTimes = (): PrayerTimesHook => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<LocationState | null>(null);
  const lastAzaanPrayerRef = useRef<string | null>(null);

  // ─── Get user location & timezone ─────────────────────────────────────────
  useEffect(() => {
    const getLocationAndTimezone = async () => {
      if (!navigator.geolocation) {
        console.error('Geolocation not supported');
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 300000, // 5 minutes
          });
        });

        const { latitude, longitude, accuracy } = position.coords;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        console.log('Prayer Times: Location acquired', {
          lat: latitude,
          lng: longitude,
          timezone,
          accuracy,
        });

        setLocation({ lat: latitude, lng: longitude, timezone, accuracy });
      } catch (error) {
        console.error('Failed to get location:', error);
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const timezoneDefaults: Record<string, { lat: number; lng: number }> = {
          'America/New_York': { lat: 40.7128, lng: -74.006 },
          'America/Chicago': { lat: 41.8781, lng: -87.6298 },
          'America/Denver': { lat: 39.7392, lng: -104.9903 },
          'America/Los_Angeles': { lat: 34.0522, lng: -118.2437 },
          'America/Toronto': { lat: 43.6532, lng: -79.3832 },
          'Europe/London': { lat: 51.5074, lng: -0.1278 },
          'Europe/Paris': { lat: 48.8566, lng: 2.3522 },
          'Europe/Istanbul': { lat: 41.0082, lng: 28.9784 },
          'Asia/Dubai': { lat: 25.2048, lng: 55.2708 },
          'Asia/Riyadh': { lat: 24.7136, lng: 46.6753 },
          'Asia/Karachi': { lat: 24.8607, lng: 67.0011 },
          'Asia/Kolkata': { lat: 28.6139, lng: 77.209 },
          'Asia/Dhaka': { lat: 23.8103, lng: 90.4125 },
          'Asia/Jakarta': { lat: -6.2088, lng: 106.8456 },
          'Asia/Kuala_Lumpur': { lat: 3.139, lng: 101.6869 },
          'Africa/Cairo': { lat: 30.0444, lng: 31.2357 },
        };

        const defaultCoords = timezoneDefaults[timezone] || { lat: 21.4225, lng: 39.8262 }; // Mecca fallback
        setLocation({ lat: defaultCoords.lat, lng: defaultCoords.lng, timezone, accuracy: 0 });
      }
    };

    getLocationAndTimezone();
  }, []);

  // ─── Tick every second ────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ─── Date key in user's timezone (recalculate only when day changes) ──────
  const currentDateKey = useMemo(() => {
    if (!location) return '';
    return formatInTimeZone(currentTime, location.timezone, 'yyyy-MM-dd');
  }, [currentTime, location]);

  // ─── Core adhan calculation – only recalculates when date or location changes
  const adhanTimes = useMemo(() => {
    if (!location || !currentDateKey) return null;

    try {
      const { lat, lng } = location;
      const coordinates = new Coordinates(lat, lng);
      const params = getCalculationMethod(lat, lng);
      params.madhab = Madhab.Shafi;
      params.highLatitudeRule = HighLatitudeRule.TwilightAngle;

      const times = new AdhanPrayerTimes(coordinates, new Date(), params);

      console.log(
        'Prayer calculation method:',
        params.method,
        '| Fajr angle:',
        params.fajrAngle,
        '| Isha angle:',
        params.ishaAngle,
        params.ishaInterval ? `| Isha interval: ${params.ishaInterval}min` : '',
      );

      return times;
    } catch (error) {
      console.error('Error calculating prayer times:', error);
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, currentDateKey]);

  // ─── Build display list (updates every second for `passed` status) ────────
  const prayerTimes = useMemo((): PrayerTime[] => {
    if (!adhanTimes || !location) return [];

    const { timezone } = location;
    const nowMs = currentTime.getTime();

    return PRAYER_ORDER.map(({ key, name }) => {
      const prayerDate = adhanTimes[key] as Date;
      return {
        name,
        time: formatInTimeZone(prayerDate, timezone, 'h:mm a'),
        timeObject: prayerDate,
        arabic: PRAYER_ARABIC[name],
        passed: nowMs >= prayerDate.getTime(),
      };
    });
  }, [adhanTimes, location, currentTime]);

  // ─── Next prayer ──────────────────────────────────────────────────────────
  const nextPrayer = useMemo((): PrayerTime | null => {
    if (prayerTimes.length === 0) return null;

    const upcoming = prayerTimes.find((p) => !p.passed);
    if (upcoming) return upcoming;

    // All prayers passed today → next is tomorrow's Fajr
    return { ...prayerTimes[0], passed: false };
  }, [prayerTimes]);

  // ─── Time until next prayer (smooth, Date-based) ─────────────────────────
  const timeUntilNext = useMemo((): string => {
    if (!nextPrayer) return '';

    const nowMs = currentTime.getTime();
    let targetMs = nextPrayer.timeObject.getTime();

    // If every prayer today has passed, target is tomorrow's Fajr
    const allPassed = prayerTimes.length > 0 && prayerTimes.every((p) => p.passed);
    if (allPassed) {
      targetMs += 24 * 60 * 60 * 1000;
    }

    let diffMs = targetMs - nowMs;
    if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;

    const totalMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }, [currentTime, nextPrayer, prayerTimes]);

  // ─── Azaan detection & notification ───────────────────────────────────────
  const isAzaanTime = useMemo(() => {
    if (!location || prayerTimes.length === 0) return false;

    const currentHHMM = formatInTimeZone(currentTime, location.timezone, 'HH:mm');
    return prayerTimes.some(
      (p) => formatInTimeZone(p.timeObject, location.timezone, 'HH:mm') === currentHHMM,
    );
  }, [currentTime, prayerTimes, location]);

  useEffect(() => {
    if (!location || prayerTimes.length === 0) return;

    const currentHHMM = formatInTimeZone(currentTime, location.timezone, 'HH:mm');

    const matchedPrayer = prayerTimes.find(
      (p) => formatInTimeZone(p.timeObject, location.timezone, 'HH:mm') === currentHHMM,
    );

    if (matchedPrayer && lastAzaanPrayerRef.current !== matchedPrayer.name) {
      lastAzaanPrayerRef.current = matchedPrayer.name;

      toast({
        title: 'Azaan - Time for Prayer',
        description: `${matchedPrayer.arabic} - ${matchedPrayer.name} Prayer Time`,
        duration: 8000,
      });

      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200]);
      }

      try {
        const audio = new Audio('/azaan.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      } catch {
        // Silent fail
      }
    }
  }, [currentTime, prayerTimes, location, toast]);

  // ─── Reset azaan tracker at midnight (stable – no currentTime dependency) ─
  useEffect(() => {
    if (!location) return;

    const scheduleReset = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const msUntilMidnight = midnight.getTime() - now.getTime();

      return setTimeout(() => {
        lastAzaanPrayerRef.current = null;
        scheduleReset();
      }, msUntilMidnight);
    };

    const timer = scheduleReset();
    return () => clearTimeout(timer);
  }, [location]);

  // ─── Formatted current time ───────────────────────────────────────────────
  const formattedCurrentTime = useMemo(() => {
    if (!location) {
      return currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
    }
    return formatInTimeZone(currentTime, location.timezone, 'h:mm:ss a');
  }, [currentTime, location]);

  return {
    prayerTimes,
    nextPrayer,
    timeUntilNext,
    currentTime: formattedCurrentTime,
    isAzaanTime,
    location: location
      ? { lat: location.lat, lng: location.lng, timezone: location.timezone }
      : null,
    accuracy: location?.accuracy ?? null,
  };
};

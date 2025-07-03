
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

export interface PrayerTime {
  name: string;
  time: string;
  timeObject: Date;
  minutes: number;
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

export const usePrayerTimes = (): PrayerTimesHook => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<LocationState | null>(null);
  const [lastAzaanPrayer, setLastAzaanPrayer] = useState<string | null>(null);

  // Arabic names for prayers  
  const prayerArabicNames = {
    'Fajr': "الفجر",
    'Dhuhr': "الظهر", 
    'Asr': "العصر",
    'Maghrib': "المغرب",
    'Isha': "العشاء"
  };

  // Get user's location and timezone
  useEffect(() => {
    const getLocationAndTimezone = async () => {
      if (!navigator.geolocation) {
        console.error('Geolocation not supported');
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 300000 // 5 minutes
            }
          );
        });

        const { latitude, longitude, accuracy } = position.coords;
        
        // Get timezone from browser
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        console.log('📍 Prayer Times: Location acquired', {
          lat: latitude,
          lng: longitude,
          timezone,
          accuracy
        });

        setLocation({
          lat: latitude,
          lng: longitude,
          timezone,
          accuracy
        });

      } catch (error) {
        console.error('Failed to get location:', error);
        // Fallback to approximate location based on timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Default coordinates for common timezones (you can expand this)
        const timezoneDefaults: Record<string, { lat: number; lng: number }> = {
          'America/New_York': { lat: 40.7128, lng: -74.0060 },
          'Europe/London': { lat: 51.5074, lng: -0.1278 },
          'Asia/Dubai': { lat: 25.2048, lng: 55.2708 },
          'Asia/Riyadh': { lat: 24.7136, lng: 46.6753 },
          'Asia/Karachi': { lat: 24.8607, lng: 67.0011 },
          'Asia/Jakarta': { lat: -6.2088, lng: 106.8456 }
        };

        const defaultCoords = timezoneDefaults[timezone] || { lat: 21.4225, lng: 39.8262 }; // Default to Mecca
        
        setLocation({
          lat: defaultCoords.lat,
          lng: defaultCoords.lng,
          timezone,
          accuracy: 0
        });
      }
    };

    getLocationAndTimezone();
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // High-precision astronomical prayer time calculations
  const calculatePrayerTimes = useCallback((): PrayerTime[] => {
    if (!location) return [];

    try {
      const { lat, lng, timezone } = location;
      const date = new Date();
      
      // Astronomical calculations for prayer times
      const dayOfYear = getDayOfYear(date);
      const timeEqn = getEquationOfTime(dayOfYear);
      const declinationAngle = getSolarDeclination(dayOfYear);
      
      // Standard prayer angle calculations (degrees)
      const angles = {
        fajr: -18,    // Civil twilight
        sunrise: -0.833, // Geometric horizon + refraction
        dhuhr: 0,     // Solar noon
        asr: 0,       // Shadow length ratio
        maghrib: -0.833, // Same as sunrise
        isha: -17     // Astronomical twilight
      };
      
      // Calculate prayer times
      const prayerCalculations = [
        { name: 'Fajr', angle: angles.fajr },
        { name: 'Dhuhr', angle: angles.dhuhr },
        { name: 'Asr', angle: angles.asr },
        { name: 'Maghrib', angle: angles.maghrib },
        { name: 'Isha', angle: angles.isha }
      ];
      
      return prayerCalculations.map(({ name, angle }) => {
        let prayerTime: Date;
        
        if (name === 'Dhuhr') {
          // Solar noon calculation
          const noon = 12 - lng / 15 + timeEqn / 60;
          prayerTime = new Date(date);
          prayerTime.setHours(Math.floor(noon), Math.round((noon % 1) * 60), 0, 0);
        } else if (name === 'Asr') {
          // Asr calculation (shadow length ratio)
          const noon = 12 - lng / 15 + timeEqn / 60;
          const shadowRatio = 1; // Standard ratio
          const asrAngle = Math.atan(1 / (shadowRatio + Math.tan(Math.abs(lat - declinationAngle) * Math.PI / 180))) * 180 / Math.PI;
          const hourAngle = Math.acos((Math.sin(-asrAngle * Math.PI / 180) - Math.sin(lat * Math.PI / 180) * Math.sin(declinationAngle * Math.PI / 180)) / (Math.cos(lat * Math.PI / 180) * Math.cos(declinationAngle * Math.PI / 180))) * 180 / Math.PI;
          const asrTime = noon + hourAngle / 15;
          prayerTime = new Date(date);
          prayerTime.setHours(Math.floor(asrTime), Math.round((asrTime % 1) * 60), 0, 0);
        } else {
          // Calculate hour angle for the prayer
          const hourAngle = Math.acos((Math.sin(angle * Math.PI / 180) - Math.sin(lat * Math.PI / 180) * Math.sin(declinationAngle * Math.PI / 180)) / (Math.cos(lat * Math.PI / 180) * Math.cos(declinationAngle * Math.PI / 180))) * 180 / Math.PI;
          
          const noon = 12 - lng / 15 + timeEqn / 60;
          let prayerHour: number;
          
          if (name === 'Fajr') {
            prayerHour = noon - hourAngle / 15;
          } else { // Maghrib, Isha
            prayerHour = noon + hourAngle / 15;
          }
          
          prayerTime = new Date(date);
          prayerTime.setHours(Math.floor(prayerHour), Math.round((prayerHour % 1) * 60), 0, 0);
        }
        
        // Convert to user's timezone
        const zonedTime = toZonedTime(prayerTime, timezone);
        const timeString = format(zonedTime, 'h:mm a'); // 12-hour format with AM/PM
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const prayerMinutes = zonedTime.getHours() * 60 + zonedTime.getMinutes();

        return {
          name,
          time: timeString,
          timeObject: zonedTime,
          minutes: prayerMinutes,
          arabic: prayerArabicNames[name as keyof typeof prayerArabicNames],
          passed: prayerMinutes <= currentMinutes
        };
      });
    } catch (error) {
      console.error('Error calculating prayer times:', error);
      return [];
    }
  }, [location, currentTime]);

  // Helper functions for astronomical calculations
  function getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function getEquationOfTime(dayOfYear: number): number {
    const B = 2 * Math.PI * (dayOfYear - 81) / 365;
    return 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  }

  function getSolarDeclination(dayOfYear: number): number {
    return 23.45 * Math.sin(2 * Math.PI * (284 + dayOfYear) / 365);
  }

  const prayerTimes = calculatePrayerTimes();

  // Find next prayer
  const getNextPrayer = useCallback((): PrayerTime | null => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    // Find next prayer today
    for (const prayer of prayerTimes) {
      if (prayer.minutes > currentMinutes) {
        return prayer;
      }
    }
    
    // If no more prayers today, next is tomorrow's Fajr
    if (prayerTimes.length > 0) {
      return { ...prayerTimes[0], passed: false };
    }
    
    return null;
  }, [currentTime, prayerTimes]);

  const nextPrayer = getNextPrayer();

  // Calculate time until next prayer
  const getTimeUntilNext = useCallback((): string => {
    if (!nextPrayer) return "";
    
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    let minutesUntil = nextPrayer.minutes - currentMinutes;
    
    // If it's tomorrow's prayer
    if (minutesUntil <= 0) {
      minutesUntil = (24 * 60) - currentMinutes + nextPrayer.minutes;
    }
    
    const hours = Math.floor(minutesUntil / 60);
    const mins = minutesUntil % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    } else {
      return `${mins}m`;
    }
  }, [currentTime, nextPrayer]);

  const timeUntilNext = getTimeUntilNext();

  // Check if it's exactly prayer time for azaan
  const checkAzaanTime = useCallback(() => {
    if (!location) return false;
    
    const currentTimeInTimezone = formatInTimeZone(currentTime, location.timezone, 'HH:mm');
    
    const currentPrayer = prayerTimes.find(prayer => {
      const prayerTimeFormatted = format(prayer.timeObject, 'HH:mm');
      return prayerTimeFormatted === currentTimeInTimezone;
    });
    
    if (currentPrayer && lastAzaanPrayer !== currentPrayer.name) {
      setLastAzaanPrayer(currentPrayer.name);
      
      // Show azaan notification
      toast({
        title: "🕌 Azaan - Time for Prayer",
        description: `${currentPrayer.arabic} - ${currentPrayer.name} Prayer Time - الله أكبر الله أكبر • Allahu Akbar`,
        duration: 8000,
      });

      // Vibration feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200]);
      }

      // Play azaan sound (if available)
      try {
        const audio = new Audio('/azaan.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Silent fail if no audio file or permissions denied
        });
      } catch (error) {
        // Silent fail
      }
    }
    
    return !!currentPrayer;
  }, [currentTime, prayerTimes, lastAzaanPrayer, toast, location]);

  const isAzaanTime = checkAzaanTime();

  // Reset azaan tracker at midnight
  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    
    const timeUntilMidnight = midnight.getTime() - currentTime.getTime();
    
    const timer = setTimeout(() => {
      setLastAzaanPrayer(null);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, [currentTime]);

  // Format current time in user's timezone with 12-hour format
  const formatCurrentTime = useCallback(() => {
    if (!location) {
      return currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    }
    
    return formatInTimeZone(currentTime, location.timezone, 'h:mm:ss a');
  }, [currentTime, location]);

  return {
    prayerTimes,
    nextPrayer,
    timeUntilNext,
    currentTime: formatCurrentTime(),
    isAzaanTime,
    location: location ? {
      lat: location.lat,
      lng: location.lng,
      timezone: location.timezone
    } : null,
    accuracy: location?.accuracy || null
  };
};

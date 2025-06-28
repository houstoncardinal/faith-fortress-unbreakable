
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface PrayerTime {
  name: string;
  time: string;
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
}

export const usePrayerTimes = (): PrayerTimesHook => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastAzaanPrayer, setLastAzaanPrayer] = useState<string | null>(null);

  // Static prayer times (in real app, these would come from an API)
  const basePrayerTimes = [
    { name: "Fajr", time: "05:30", arabic: "الفجر" },
    { name: "Dhuhr", time: "12:45", arabic: "الظهر" },
    { name: "Asr", time: "16:20", arabic: "العصر" },
    { name: "Maghrib", time: "18:45", arabic: "المغرب" },
    { name: "Isha", time: "20:15", arabic: "العشاء" }
  ];

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate prayer times with current status
  const prayerTimes = basePrayerTimes.map(prayer => {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    return {
      ...prayer,
      minutes: prayerMinutes,
      passed: prayerMinutes <= currentMinutes
    };
  });

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
    return { ...prayerTimes[0], passed: false };
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
    const currentTimeString = currentTime.toTimeString().slice(0, 5); // HH:MM format
    
    const currentPrayer = prayerTimes.find(prayer => 
      prayer.time === currentTimeString
    );
    
    if (currentPrayer && lastAzaanPrayer !== currentPrayer.name) {
      setLastAzaanPrayer(currentPrayer.name);
      
      // Show azaan notification with string description only
      toast({
        title: "🕌 Azaan - Time for Prayer",
        description: `${currentPrayer.arabic} - ${currentPrayer.name} Prayer Time - الله أكبر الله أكبر • Allahu Akbar`,
        duration: 8000,
      });

      // Play azaan sound (if available)
      try {
        const audio = new Audio('/azaan.mp3'); // User would need to add this file
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Silent fail if no audio file or permissions denied
        });
      } catch (error) {
        // Silent fail
      }
    }
    
    return !!currentPrayer;
  }, [currentTime, prayerTimes, lastAzaanPrayer, toast]);

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

  return {
    prayerTimes,
    nextPrayer,
    timeUntilNext,
    currentTime: currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }),
    isAzaanTime
  };
};

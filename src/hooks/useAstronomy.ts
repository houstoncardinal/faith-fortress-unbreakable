import { useState, useEffect, useMemo } from 'react';
import {
  getSunPosition,
  getTwilightTimes,
  getMoonData,
  getNextMoonPhases,
} from '@/utils/astronomyEngine';
import type { AstronomyData, SunPosition, TwilightTimes, MoonData, MoonPhaseEvent } from '@/types/astronomyTypes';

interface UseAstronomyOptions {
  lat: number | null;
  lng: number | null;
  updateIntervalMs?: number;
}

/**
 * Provides real-time astronomical data (sun position, moon phase, twilight times)
 * powered by JPL DE405 ephemeris via astronomy-engine.
 *
 * Updates every `updateIntervalMs` (default 60 seconds). Twilight times and moon
 * phase schedules are memoized per calendar day.
 */
export function useAstronomy({
  lat,
  lng,
  updateIntervalMs = 60_000,
}: UseAstronomyOptions): AstronomyData {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), updateIntervalMs);
    return () => clearInterval(timer);
  }, [updateIntervalMs]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const now = useMemo(() => new Date(), [tick]);

  const hasLocation = lat !== null && lng !== null;

  const dateKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

  const sun = useMemo((): SunPosition | null => {
    if (!hasLocation) return null;
    return getSunPosition(now, lat!, lng!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, lat, lng]);

  const twilight = useMemo((): TwilightTimes | null => {
    if (!hasLocation) return null;
    return getTwilightTimes(now, lat!, lng!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateKey, lat, lng]);

  const moon = useMemo((): MoonData | null => {
    if (!hasLocation) return null;
    return getMoonData(now, lat!, lng!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, lat, lng]);

  const nextMoonPhases = useMemo((): MoonPhaseEvent[] => {
    return getNextMoonPhases(now, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateKey]);

  const nextNewMoon = useMemo((): MoonPhaseEvent | null => {
    return nextMoonPhases.find((p) => p.phase === 'new') || null;
  }, [nextMoonPhases]);

  return {
    sun,
    twilight,
    moon,
    nextMoonPhases,
    nextNewMoon,
    isLoading: !hasLocation,
  };
}

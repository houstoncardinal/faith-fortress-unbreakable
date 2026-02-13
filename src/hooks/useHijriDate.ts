import { useMemo } from 'react';
import {
  gregorianToHijri,
  getUpcomingEvents,
  getDaysInHijriMonth,
  isHijriLeapYear,
} from '@/utils/hijriDate';
import type { HijriData } from '@/types/astronomyTypes';

/**
 * Provides the current Hijri (Islamic) date and upcoming Islamic events.
 * Uses the Kuwaiti/tabular algorithm (30-year cycle, used by Microsoft/ICU).
 * Recalculates only when the Gregorian date changes.
 */
export function useHijriDate(date?: Date): HijriData {
  const now = useMemo(() => date || new Date(), [date]);

  const dateKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

  const today = useMemo(() => {
    return gregorianToHijri(now);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateKey]);

  const upcomingEvents = useMemo(() => {
    if (!today) return [];
    return getUpcomingEvents(today, now);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateKey]);

  const isLeapYear = useMemo(() => {
    return today ? isHijriLeapYear(today.year) : false;
  }, [today]);

  const daysInCurrentMonth = useMemo(() => {
    return today ? getDaysInHijriMonth(today.year, today.month) : 30;
  }, [today]);

  return { today, upcomingEvents, isLeapYear, daysInCurrentMonth };
}

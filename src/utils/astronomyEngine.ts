import {
  Body,
  Observer,
  Equator,
  Horizon,
  Illumination,
  MoonPhase,
  SearchMoonQuarter,
  NextMoonQuarter,
  SearchRiseSet,
  SearchAltitude,
} from 'astronomy-engine';
import type { SunPosition, TwilightTimes, MoonData, MoonPhaseEvent } from '@/types/astronomyTypes';

// ─── Sun ────────────────────────────────────────────────────────────────────

export function getSunPosition(date: Date, lat: number, lng: number): SunPosition {
  const observer = new Observer(lat, lng, 0);
  const equ = Equator(Body.Sun, date, observer, true, true);
  const hor = Horizon(date, observer, equ.ra, equ.dec, 'normal');
  return {
    altitude: Math.round(hor.altitude * 10) / 10,
    azimuth: Math.round(hor.azimuth * 10) / 10,
    isAboveHorizon: hor.altitude > 0,
  };
}

/**
 * Get all twilight threshold times for a given date and location.
 * Returns null for any threshold that doesn't occur (e.g. polar regions).
 */
export function getTwilightTimes(date: Date, lat: number, lng: number): TwilightTimes {
  const observer = new Observer(lat, lng, 0);
  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return {
    astronomicalDawn: searchSunAltitude(observer, dayStart, -18, 1),
    nauticalDawn: searchSunAltitude(observer, dayStart, -12, 1),
    civilDawn: searchSunAltitude(observer, dayStart, -6, 1),
    sunrise: searchSunRiseSet(observer, dayStart, 1),
    sunset: searchSunRiseSet(observer, dayStart, -1),
    civilDusk: searchSunAltitude(observer, dayStart, -6, -1),
    nauticalDusk: searchSunAltitude(observer, dayStart, -12, -1),
    astronomicalDusk: searchSunAltitude(observer, dayStart, -18, -1),
  };
}

// ─── Moon ───────────────────────────────────────────────────────────────────

export function getMoonData(date: Date, lat: number, lng: number): MoonData {
  const observer = new Observer(lat, lng, 0);
  const equ = Equator(Body.Moon, date, observer, true, true);
  const hor = Horizon(date, observer, equ.ra, equ.dec, 'normal');
  const illum = Illumination(Body.Moon, date);
  const phaseAngle = MoonPhase(date);
  const { name, emoji } = getMoonPhaseName(phaseAngle);

  return {
    illumination: illum.phase_fraction,
    illuminationPercent: Math.round(illum.phase_fraction * 100),
    phaseAngle,
    phaseName: name,
    emoji,
    altitude: Math.round(hor.altitude * 10) / 10,
    azimuth: Math.round(hor.azimuth * 10) / 10,
    isAboveHorizon: hor.altitude > 0,
  };
}

/**
 * Get the next N moon phase events (new, first quarter, full, last quarter).
 */
export function getNextMoonPhases(date: Date, count: number = 4): MoonPhaseEvent[] {
  const phases: MoonPhaseEvent[] = [];
  let mq = SearchMoonQuarter(date);

  for (let i = 0; i < count; i++) {
    // Skip phases that are in the past
    if (mq.time.date.getTime() < date.getTime()) {
      mq = NextMoonQuarter(mq);
      continue;
    }
    phases.push(moonQuarterToEvent(mq, date));
    mq = NextMoonQuarter(mq);
  }

  // If we skipped some, fill up to count
  while (phases.length < count) {
    phases.push(moonQuarterToEvent(mq, date));
    mq = NextMoonQuarter(mq);
  }

  return phases;
}

// ─── Twilight state derivation ──────────────────────────────────────────────

export type TwilightState =
  | 'day'
  | 'civil-twilight'
  | 'nautical-twilight'
  | 'astronomical-twilight'
  | 'night';

export function getTwilightState(sunAltitude: number): TwilightState {
  if (sunAltitude > 0) return 'day';
  if (sunAltitude > -6) return 'civil-twilight';
  if (sunAltitude > -12) return 'nautical-twilight';
  if (sunAltitude > -18) return 'astronomical-twilight';
  return 'night';
}

export function getTwilightLabel(state: TwilightState): string {
  switch (state) {
    case 'day':
      return 'Daytime';
    case 'civil-twilight':
      return 'Civil Twilight';
    case 'nautical-twilight':
      return 'Nautical Twilight';
    case 'astronomical-twilight':
      return 'Astronomical Twilight';
    case 'night':
      return 'Night';
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function searchSunAltitude(
  observer: Observer,
  dayStart: Date,
  altitude: number,
  direction: number,
): Date | null {
  const result = SearchAltitude(Body.Sun, observer, direction, dayStart, 1, altitude);
  return result ? result.date : null;
}

function searchSunRiseSet(observer: Observer, dayStart: Date, direction: number): Date | null {
  const result = SearchRiseSet(Body.Sun, observer, direction, dayStart, 1);
  return result ? result.date : null;
}

const PHASE_MAP = [
  { max: 22.5, name: 'New Moon', emoji: '\uD83C\uDF11' },
  { max: 67.5, name: 'Waxing Crescent', emoji: '\uD83C\uDF12' },
  { max: 112.5, name: 'First Quarter', emoji: '\uD83C\uDF13' },
  { max: 157.5, name: 'Waxing Gibbous', emoji: '\uD83C\uDF14' },
  { max: 202.5, name: 'Full Moon', emoji: '\uD83C\uDF15' },
  { max: 247.5, name: 'Waning Gibbous', emoji: '\uD83C\uDF16' },
  { max: 292.5, name: 'Last Quarter', emoji: '\uD83C\uDF17' },
  { max: 337.5, name: 'Waning Crescent', emoji: '\uD83C\uDF18' },
] as const;

export function getMoonPhaseName(phaseAngle: number): { name: string; emoji: string } {
  for (const p of PHASE_MAP) {
    if (phaseAngle < p.max) return { name: p.name, emoji: p.emoji };
  }
  return { name: 'New Moon', emoji: '\uD83C\uDF11' };
}

const QUARTER_PHASE_MAP: Record<number, { phase: MoonPhaseEvent['phase']; name: string }> = {
  0: { phase: 'new', name: 'New Moon' },
  1: { phase: 'firstQuarter', name: 'First Quarter' },
  2: { phase: 'full', name: 'Full Moon' },
  3: { phase: 'lastQuarter', name: 'Last Quarter' },
};

function moonQuarterToEvent(
  mq: { quarter: number; time: { date: Date } },
  refDate: Date,
): MoonPhaseEvent {
  const info = QUARTER_PHASE_MAP[mq.quarter] ?? QUARTER_PHASE_MAP[0];
  const daysFromNow = Math.round(
    (mq.time.date.getTime() - refDate.getTime()) / (24 * 60 * 60 * 1000),
  );
  return {
    phase: info.phase,
    name: info.name,
    date: mq.time.date,
    daysFromNow,
  };
}

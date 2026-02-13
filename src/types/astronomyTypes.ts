export interface SunPosition {
  altitude: number;
  azimuth: number;
  isAboveHorizon: boolean;
}

export interface TwilightTimes {
  astronomicalDawn: Date | null;
  nauticalDawn: Date | null;
  civilDawn: Date | null;
  sunrise: Date | null;
  sunset: Date | null;
  civilDusk: Date | null;
  nauticalDusk: Date | null;
  astronomicalDusk: Date | null;
}

export interface MoonData {
  illumination: number;
  illuminationPercent: number;
  phaseAngle: number;
  phaseName: string;
  emoji: string;
  altitude: number;
  azimuth: number;
  isAboveHorizon: boolean;
}

export interface MoonPhaseEvent {
  phase: 'new' | 'firstQuarter' | 'full' | 'lastQuarter';
  name: string;
  date: Date;
  daysFromNow: number;
}

export interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  monthNameArabic: string;
  formatted: string;
  formattedArabic: string;
}

export interface IslamicEvent {
  name: string;
  arabic: string;
  hijriMonth: number;
  hijriDay: number;
  hijriDate: string;
  daysFromNow: number;
}

export interface AstronomyData {
  sun: SunPosition | null;
  twilight: TwilightTimes | null;
  moon: MoonData | null;
  nextMoonPhases: MoonPhaseEvent[];
  nextNewMoon: MoonPhaseEvent | null;
  isLoading: boolean;
}

export interface HijriData {
  today: HijriDate | null;
  upcomingEvents: IslamicEvent[];
  isLeapYear: boolean;
  daysInCurrentMonth: number;
}

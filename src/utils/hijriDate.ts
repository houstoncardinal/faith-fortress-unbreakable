import type { HijriDate, IslamicEvent } from '@/types/astronomyTypes';

// ─── Hijri month names ──────────────────────────────────────────────────────

const HIJRI_MONTHS: { english: string; arabic: string }[] = [
  { english: 'Muharram', arabic: '\u0645\u062D\u0631\u0645' },
  { english: 'Safar', arabic: '\u0635\u0641\u0631' },
  { english: "Rabi' al-Awwal", arabic: '\u0631\u0628\u064A\u0639 \u0627\u0644\u0623\u0648\u0644' },
  { english: "Rabi' al-Thani", arabic: '\u0631\u0628\u064A\u0639 \u0627\u0644\u0622\u062E\u0631' },
  { english: 'Jumada al-Ula', arabic: '\u062C\u0645\u0627\u062F\u0649 \u0627\u0644\u0623\u0648\u0644\u0649' },
  { english: 'Jumada al-Thani', arabic: '\u062C\u0645\u0627\u062F\u0649 \u0627\u0644\u0622\u062E\u0631\u0629' },
  { english: 'Rajab', arabic: '\u0631\u062C\u0628' },
  { english: "Sha'ban", arabic: '\u0634\u0639\u0628\u0627\u0646' },
  { english: 'Ramadan', arabic: '\u0631\u0645\u0636\u0627\u0646' },
  { english: 'Shawwal', arabic: '\u0634\u0648\u0627\u0644' },
  { english: "Dhul Qi'dah", arabic: '\u0630\u0648 \u0627\u0644\u0642\u0639\u062F\u0629' },
  { english: 'Dhul Hijjah', arabic: '\u0630\u0648 \u0627\u0644\u062D\u062C\u0629' },
];

// ─── Major Islamic events ───────────────────────────────────────────────────

const ISLAMIC_EVENTS: { name: string; arabic: string; month: number; day: number }[] = [
  { name: 'Islamic New Year', arabic: '\u0631\u0623\u0633 \u0627\u0644\u0633\u0646\u0629 \u0627\u0644\u0647\u062C\u0631\u064A\u0629', month: 1, day: 1 },
  { name: 'Ashura', arabic: '\u0639\u0627\u0634\u0648\u0631\u0627\u0621', month: 1, day: 10 },
  { name: 'Mawlid al-Nabi', arabic: '\u0627\u0644\u0645\u0648\u0644\u062F \u0627\u0644\u0646\u0628\u0648\u064A', month: 3, day: 12 },
  { name: "Lailat al-Mi'raj", arabic: '\u0644\u064A\u0644\u0629 \u0627\u0644\u0645\u0639\u0631\u0627\u062C', month: 7, day: 27 },
  { name: "Lailat al-Bara'at", arabic: '\u0644\u064A\u0644\u0629 \u0627\u0644\u0628\u0631\u0627\u0621\u0629', month: 8, day: 15 },
  { name: 'Ramadan Begins', arabic: '\u0631\u0645\u0636\u0627\u0646', month: 9, day: 1 },
  { name: 'Lailat al-Qadr', arabic: '\u0644\u064A\u0644\u0629 \u0627\u0644\u0642\u062F\u0631', month: 9, day: 27 },
  { name: 'Eid al-Fitr', arabic: '\u0639\u064A\u062F \u0627\u0644\u0641\u0637\u0631', month: 10, day: 1 },
  { name: 'Day of Arafah', arabic: '\u064A\u0648\u0645 \u0639\u0631\u0641\u0629', month: 12, day: 9 },
  { name: 'Eid al-Adha', arabic: '\u0639\u064A\u062F \u0627\u0644\u0623\u0636\u062D\u0649', month: 12, day: 10 },
];

// ─── Arabic-Indic numerals ──────────────────────────────────────────────────

const ARABIC_DIGITS = ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'];

export function toArabicNumerals(n: number): string {
  return String(n)
    .split('')
    .map((ch) => (ch >= '0' && ch <= '9' ? ARABIC_DIGITS[parseInt(ch)] : ch))
    .join('');
}

// ─── Kuwaiti / Tabular Hijri Algorithm ──────────────────────────────────────
//
// Converts a Gregorian date to a Hijri date using the tabular Islamic calendar.
// This is the 30-year cycle algorithm used by Microsoft, ICU, and many production apps.
// Accuracy: within +/-1 day of actual moon sightings for most regions.
//
// Reference: https://en.wikipedia.org/wiki/Tabular_Islamic_calendar

export function gregorianToHijri(date: Date): HijriDate {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  // Step 1: Convert Gregorian to Julian Day Number
  const jdn = gregorianToJDN(y, m, d);

  // Step 2: Convert JDN to Hijri
  // Islamic epoch in JDN = July 16, 622 CE (Julian) = JDN 1948439.5
  // Using the arithmetic/tabular algorithm
  const l = jdn - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const remainder = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - remainder) / 5316) * Math.floor((50 * remainder) / 17719) +
    Math.floor(remainder / 5670) * Math.floor((43 * remainder) / 15238);
  const remainderL = remainder - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hijriMonth = Math.floor((24 * remainderL) / 709);
  const hijriDay = remainderL - Math.floor((709 * hijriMonth) / 24);
  const hijriYear = 30 * n + j - 30;

  const monthInfo = HIJRI_MONTHS[hijriMonth - 1] || HIJRI_MONTHS[0];

  return {
    day: hijriDay,
    month: hijriMonth,
    year: hijriYear,
    monthName: monthInfo.english,
    monthNameArabic: monthInfo.arabic,
    formatted: `${hijriDay} ${monthInfo.english} ${hijriYear} AH`,
    formattedArabic: `${toArabicNumerals(hijriDay)} ${monthInfo.arabic} ${toArabicNumerals(hijriYear)}`,
  };
}

/**
 * Approximate reverse conversion: Hijri date to Gregorian.
 * Used for estimating event dates. Accuracy: +/-1 day.
 */
export function hijriToGregorianApprox(hijriYear: number, hijriMonth: number, hijriDay: number): Date {
  // Convert Hijri to JDN using tabular algorithm
  const jdn =
    Math.floor((11 * hijriYear + 3) / 30) +
    354 * hijriYear +
    30 * hijriMonth -
    Math.floor((hijriMonth - 1) / 2) +
    hijriDay +
    1948440 -
    385;

  // Convert JDN to Gregorian
  return jdnToGregorian(jdn);
}

// ─── Hijri calendar utilities ───────────────────────────────────────────────

/**
 * In the tabular calendar, odd months have 30 days and even months have 29.
 * Month 12 has 30 days in leap years.
 */
export function getDaysInHijriMonth(year: number, month: number): number {
  if (month % 2 === 1) return 30;
  if (month === 12 && isHijriLeapYear(year)) return 30;
  return 29;
}

/**
 * The 30-year cycle has 11 leap years: 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29
 */
export function isHijriLeapYear(year: number): boolean {
  const pos = ((year - 1) % 30) + 1;
  return [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29].includes(pos);
}

/**
 * Total days in a Hijri year (354 or 355).
 */
function daysInHijriYear(year: number): number {
  return isHijriLeapYear(year) ? 355 : 354;
}

// ─── Upcoming Islamic events ────────────────────────────────────────────────

export function getUpcomingEvents(hijriDate: HijriDate, gregorianDate: Date): IslamicEvent[] {
  const events: IslamicEvent[] = [];
  const currentDayOfYear = hijriDayOfYear(hijriDate.month, hijriDate.day, hijriDate.year);
  const totalDaysThisYear = daysInHijriYear(hijriDate.year);

  for (const event of ISLAMIC_EVENTS) {
    const eventDayOfYear = hijriDayOfYear(event.month, event.day, hijriDate.year);
    let daysFromNow = eventDayOfYear - currentDayOfYear;

    // If the event has passed this year, calculate for next year
    if (daysFromNow < 0) {
      daysFromNow = totalDaysThisYear - currentDayOfYear + hijriDayOfYear(event.month, event.day, hijriDate.year + 1);
    }

    const hijriDateStr = `${event.day} ${HIJRI_MONTHS[event.month - 1].english}`;

    events.push({
      name: event.name,
      arabic: event.arabic,
      hijriMonth: event.month,
      hijriDay: event.day,
      hijriDate: hijriDateStr,
      daysFromNow,
    });
  }

  // Sort by proximity
  events.sort((a, b) => a.daysFromNow - b.daysFromNow);

  return events.slice(0, 6);
}

// ─── Internal helpers ───────────────────────────────────────────────────────

function hijriDayOfYear(month: number, day: number, year: number): number {
  let total = 0;
  for (let m = 1; m < month; m++) {
    total += getDaysInHijriMonth(year, m);
  }
  return total + day;
}

function gregorianToJDN(y: number, m: number, d: number): number {
  // Algorithm from Meeus, "Astronomical Algorithms"
  const a = Math.floor((14 - m) / 12);
  const yAdj = y + 4800 - a;
  const mAdj = m + 12 * a - 3;
  return (
    d +
    Math.floor((153 * mAdj + 2) / 5) +
    365 * yAdj +
    Math.floor(yAdj / 4) -
    Math.floor(yAdj / 100) +
    Math.floor(yAdj / 400) -
    32045
  );
}

function jdnToGregorian(jdn: number): Date {
  // Reverse of gregorianToJDN
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor(146097 * b / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor(1461 * d / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  return new Date(year, month - 1, day);
}

// dates.js — week + quarter math in the user's timezone
// Set the school's first day of Q1 here (YYYY-MM-DD). Adjust if needed.
export const SCHOOL_YEAR_START = "2025-08-18"; // first day of Q1

export function todayInTimezone(tz = "America/New_York") {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
  });
  // en-CA yields YYYY-MM-DD
  return fmt.format(new Date());
}

/** Current quarter (1-4), assuming 8-week quarters from SCHOOL_YEAR_START. */
export function currentQuarter(schoolStart = SCHOOL_YEAR_START, todayStr = todayInTimezone()) {
  const start = new Date(schoolStart + "T00:00:00Z");
  const now = new Date(todayStr + "T00:00:00Z");
  const weeks = Math.floor((now - start) / (7 * 24 * 3600 * 1000));
  const q = Math.floor(weeks / 8) + 1;
  return Math.min(Math.max(q, 1), 4);
}

/** Current week-of-quarter (1-8). */
export function currentWeekOfQuarter(schoolStart = SCHOOL_YEAR_START, todayStr = todayInTimezone()) {
  const start = new Date(schoolStart + "T00:00:00Z");
  const now = new Date(todayStr + "T00:00:00Z");
  const weeks = Math.floor((now - start) / (7 * 24 * 3600 * 1000));
  return (weeks % 8) + 1;
}

/** Monday 00:00 and Sunday 23:59 of the current week, in the user's tz. */
export function currentWeekRange(tz = "America/New_York") {
  const today = todayInTimezone(tz);
  const d = new Date(today + "T12:00:00Z"); // noon UTC avoids DST edges
  const dow = d.getUTCDay(); // 0=Sun..6=Sat
  const offsetToMonday = (dow === 0 ? -6 : 1 - dow);
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() + offsetToMonday);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const fmt = (dt) => dt.toISOString().slice(0, 10);
  return { monday: fmt(monday), sunday: fmt(sunday) };
}
/** Returns an array of week numbers [1..8] for the current quarter. */
export function weeksOfQuarter() {
  return Array.from({ length: 8 }, (_, i) => i + 1);
}

/** Given a week number 1-8 and the quarter, return Mon/Sun ISO date strings. */
export function weekRange(weekNum, quarterNum, schoolStart = SCHOOL_YEAR_START) {
  const start = new Date(schoolStart + "T00:00:00Z");
  // Week 1 of Q1 = week 0 offset; each quarter is 8 weeks
  const weeksOffset = (quarterNum - 1) * 8 + (weekNum - 1);
  const monday = new Date(start);
  monday.setUTCDate(start.getUTCDate() + weeksOffset * 7);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const fmt = (dt) => dt.toISOString().slice(0, 10);
  return { monday: fmt(monday), sunday: fmt(sunday) };
}
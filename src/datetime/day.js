import {
  now as nativeNow,
  toDate,
  localWeekdayInShortForm as nativeLocalWeekdayInShortForm,
} from '../_external-deps/day';

import { dateInXDays } from './calc';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;

export const oneWeekAfter = (date) =>
  toDate(+date + ONE_WEEK);

export const oneWeekBefore = (date) =>
  toDate(+date - ONE_WEEK);

export const startOfDay = (date) => {
  const start = toDate(date);
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);
  return start;
};

export const now = () => nativeNow();
export const today = () => startOfDay(now());
export const tomorrow = () => toDate(today().setDate(today().getDate() + 1));

export const isSameDay = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear()
;

export const isToday = (date) => isSameDay(date, today());

export const isWeekend = (maybeWeekend) => {
  const sunday = 0;
  const saturday = 6;
  const dayOfWeek = toDate(maybeWeekend).getDay();

  return dayOfWeek === saturday || dayOfWeek === sunday;
};

const daysDifferenceToToday = (date, todayFn) => {
  return Math.floor((+date - todayFn()) / ONE_DAY);
};

export const daysDifferenceToTodayIncluding = (date, todayFn = today) =>
  daysDifferenceToToday(date, todayFn) + 1;

const isBefore = (date1, date2) =>
  (+date1) < (+date2);

const sortDates = (date1, date2) =>
  isBefore(date1, date2) ? [date1, date2] : [date2, date1];

export const dayAfter = (nextDay) =>
  dateInXDays(1, nextDay);

export const daysBetween = (_startDay, _endDay) => {
  const [startDay, endDay] = sortDates(_startDay, _endDay);
  const endDayStart = startOfDay(endDay);

  const ret = [startOfDay(startDay)];
  const lastOf = (arr) => arr[arr.length - 1];
  while (lastOf(ret) < endDayStart) {
    ret.push(dayAfter(lastOf(ret)));
  }
  return ret;
};

export const dayOfMonth = (date) => date.getDate();
export const localWeekdayInShortForm = nativeLocalWeekdayInShortForm;

export const getDaysInMonth = (month, year) => {
  const isFebruary = month === 2;
  const isLeapYear = (!(year % 4) && year % 100) || !(year % 400);

  if(isFebruary) {
    return isLeapYear ? 29 : 28;
  }

  const SEPTEMBER = 9;
  const APRIL = 4;
  const JUNE = 6;
  const NOVEMBER = 11;

  const is30DaysMonth = new RegExp(`${SEPTEMBER}|${APRIL}|${JUNE}|${NOVEMBER}`).test(month);
  return is30DaysMonth ? 30 : 31;
};

export const startOfWeek = (date = today()) => {
  const dayOfTheWeekStartingSunday = date.getDay();
  const dayOfTheWeekStartingMonday = dayOfTheWeekStartingSunday === 0
    ? 6
    : (dayOfTheWeekStartingSunday - 1);
  return dateInXDays(-dayOfTheWeekStartingMonday, date);
};

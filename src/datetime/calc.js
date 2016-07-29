import {
  getDaysInMonth,
} from './day';

import {
  toDate,
  now,
} from '../_external-deps/day';

const cloneDate = (date) =>
  toDate(date.getTime());

// `months` parameter maybe a decimal or fraction
export const dateInXMonths = (months, today = now()) => {
  if (months === 0) {
    return today;
  }
  if (months < 1 && months > 0) {
    const newToday = cloneDate(today);
    newToday.setDate(today.getDate() + Math.round(getDaysInMonth(today) * months));
    return newToday;
  }
  if (Math.floor(months) !== months) {
    const completeMonths = Math.floor(months);
    const newToday = dateInXMonths(completeMonths, today);
    const monthPartial = months - completeMonths;
    return dateInXMonths(monthPartial, newToday);
  }
  const date = cloneDate(today);
  date.setMonth(date.getMonth() + months);
  return date;
};

export const dateInXDays = (days, today = now()) => {
  const date = cloneDate(today);
  return toDate(date.setDate(date.getDate() + days));
};

export const differenceInMonths = (date1, date2) => {
  const yearsDiff = date2.getFullYear() - date1.getFullYear();
  const monthsDiff = date2.getMonth() - date1.getMonth();
  const daysDiff = date2.getDate() - date1.getDate();
  const APPROXIMATE_DAYS_PER_MONTH = 30;
  return monthsDiff + yearsDiff * 12 + daysDiff / APPROXIMATE_DAYS_PER_MONTH;
};

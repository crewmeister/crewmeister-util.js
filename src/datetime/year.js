import {
  thisYear,
  nextYear,
} from '../_external-deps/year';

export const containsThisYear = (years, _thisYear = thisYear) =>
  years.indexOf(_thisYear()) > -1;
export const containsNextYear = (years, _nextYear = nextYear) =>
  years.indexOf(_nextYear()) > -1;

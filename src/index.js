import * as datetimeDay from './datetime/day';
import * as datetimeMonth from './datetime/month';
import * as datetimeYear from './datetime/year';
import * as datetimeCalc from './datetime/calc';
import * as datetimeFormat from './datetime/format';

export const datetime = {
  day: datetimeDay,
  month: datetimeMonth,
  year: datetimeYear,
  format: datetimeFormat,
  calc: datetimeCalc,
};
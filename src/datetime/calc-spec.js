import {
  assertThat,
  equalTo,
} from 'hamjest';
import {
  isSameDay as _isSameDay,
} from './day';
import {
  dateInXMonths,
  dateInXDays,
  differenceInMonths,
} from './calc';

const isSameDay = (expected) => ({
  matches(actual) {
    return _isSameDay(actual, expected);
  },
  describeTo(description) {
    description
      .appendValue(expected.toDateString())
      .append(' to be the same day ')
    ;
  },
  describeMismatch(value, description) {
    description
      .append('was ')
      .appendValue(value.toDateString())
    ;
  },
});


describe('`dateInXMonths()`', () => {
  it('returns same date for offset=0', () => {
    const date = new Date('2000-01-01');
    assertThat(dateInXMonths(0, date), equalTo(date));
  });
  it('returns 1 month ahead for offset=1', () => {
    const date = new Date('2000-01-01');
    const expected = new Date('2000-02-01');
    assertThat(dateInXMonths(1, date), isSameDay(expected));
  });
  it('returns 2 month ahead for offset=2', () => {
    const date = new Date('2000-01-01');
    const expected = new Date('2000-03-01');
    assertThat(dateInXMonths(2, date), isSameDay(expected));
  });
  it('Dec`00 + 1 month is Jan`01', () => {
    const date = new Date('2000-12-01');
    const expected = new Date('2001-01-01');
    assertThat(dateInXMonths(1, date), isSameDay(expected));
  });
  it('Jan`00 + 12 months is Jan`01', () => {
    const date = new Date('2000-01-01');
    const expected = new Date('2001-01-01');
    assertThat(dateInXMonths(12, date), isSameDay(expected));
  });
  it('Jan`00 + 12 months is Jan`01', () => {
    const date = new Date('2001-03-01');
    const expected = new Date('2001-04-01');
    assertThat(dateInXMonths(1, date), isSameDay(expected));
  });
  it('Jan`00 + 18 months is Jun`01', () => {
    const date = new Date('2000-01-01');
    const expected = new Date('2001-07-01');
    assertThat(dateInXMonths(18, date), isSameDay(expected));
  });
  it('1st Jan`00 + 1/31 is 2nd Jan`00', () => {
    const date = new Date('2000-01-01');
    const expected = new Date('2000-01-02');
    assertThat(dateInXMonths(1 / 31, date), isSameDay(expected));
  });
  it('1st Jan`00 + 10/31 is 11nd Jan`00', () => {
    const date = new Date('2000-01-01');
    const expected = new Date('2000-01-11');
    assertThat(dateInXMonths(10 / 31, date), isSameDay(expected));
  });
});

describe('`differenceInMonths()`', () => {
  it('between same day is 0', () => {
    const aDay = new Date('2000-01-01');
    assertThat(differenceInMonths(aDay, aDay), equalTo(0));
  });
  it('between same day 1 month ahead, is 1', () => {
    const aDay = new Date('2000-01-01');
    const oneMonthAhead = new Date('2000-02-01');
    assertThat(differenceInMonths(aDay, oneMonthAhead), equalTo(1));
  });
  it('one year ahead, is 12', () => {
    const aDay = new Date('2000-01-01');
    const oneYearAhead = new Date('2001-01-01');
    assertThat(differenceInMonths(aDay, oneYearAhead), equalTo(12));
  });
  it('diff across year borders', () => {
    const aDay = new Date('2000-11-01');
    const oneMonthAhead = new Date('2001-02-01');
    assertThat(differenceInMonths(aDay, oneMonthAhead), equalTo(3));
  });
  it('3 days of April (which has 30 days) RETURN 0.1', () => {
    const aDay = new Date('2000-04-01');
    const oneMonthAhead = new Date('2000-04-04');
    assertThat(differenceInMonths(aDay, oneMonthAhead), equalTo(0.1));
  });
  it('2 months and 3 days RETURN 2.1', () => {
    const aDay = new Date('2000-01-30');
    const oneMonthAhead = new Date('2000-04-03');
    assertThat(differenceInMonths(aDay, oneMonthAhead), equalTo(2.1));
  });
});

describe('`dateInXDays()`', () => {
  it('returns today for 0 days', () => {
    const today = new Date('2015-01-01');
    assertThat(dateInXDays(0, today), equalTo(today));
  });
  it('returns today for 0 days if no start date given', () => {
    const today = new Date();
    assertThat(dateInXDays(0), equalTo(today));
  });

  it('returns tomorrows date for 1 day', () => {
    const today = new Date('2015-01-01');
    const tomorrow = new Date('2015-01-02');
    assertThat(dateInXDays(1, today), equalTo(tomorrow));
  });
  it('returns yesterdays date for -1 day', () => {
    const yesterday = new Date('2014-12-31');
    const today = new Date('2015-01-01');
    assertThat(dateInXDays(-1, today), equalTo(yesterday));
  });
  it('time stays 0:00 even when summer day saving time border is crossed', () => {
    const withDayLightSaving = new Date('2016-03-26 00:00');
    const withoutDayLightSaving = new Date('2016-03-28 00:00');
    assertThat(dateInXDays(2, withDayLightSaving), equalTo(withoutDayLightSaving));
  });
  it('does NOT modify a passed in date object', () => {
    const myDate = new Date('2000-01-01');
    dateInXDays(100, myDate);
    assertThat(myDate, equalTo(new Date('2000-01-01')));
  });
});

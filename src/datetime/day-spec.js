import {
  assertThat,
  equalTo,
} from 'hamjest';

import {
  ONE_DAY,
  daysBetween,
  startOfDay,
  isWeekend,
  oneWeekAfter,
  oneWeekBefore,
  dayAfter,
  daysDifferenceToTodayIncluding,
} from './day';

describe('dayAfter()', () => {
  it('30.Oct 16 is 31.Oct 16', () => {
    const date = new Date('2016-10-30 00:00');
    const dayAfterDate = new Date('2016-10-31 00:00');

    assertThat(dayAfter(date), equalTo(dayAfterDate));
  });
});

describe('daysDifferenceToTodayIncluding()', () => {
  it('days difference to today includes today', () => {
    const day = new Date('2016-01-01 00:00');
    const todayFn = () => new Date('2016-01-01 00:00');
    assertThat(daysDifferenceToTodayIncluding(day, todayFn), equalTo(1));
  });
});

describe('`daysBetween()`', () => {
  it('returns 1 day if start+end are same', () => {
    const day = new Date('2016-01-01 00:00');
    assertThat(daysBetween(day, day), equalTo([day]));
  });

  it('returns 2 days for 1 day between start+end', () => {
    const today = startOfDay(new Date());
    const tomorrow = startOfDay(new Date(+today + ONE_DAY));
    assertThat(daysBetween(today, tomorrow), equalTo([today, tomorrow]));
  });

  it('returns many days', () => {
    const today = startOfDay(new Date());
    const tomorrow = startOfDay(new Date(+today + ONE_DAY));
    const dayAfterTomorrow = startOfDay(new Date(+tomorrow + ONE_DAY));
    const twoDaysAfterTomorrow = startOfDay(new Date(+dayAfterTomorrow + ONE_DAY));

    const expected = [today, tomorrow, dayAfterTomorrow, twoDaysAfterTomorrow];
    assertThat(daysBetween(today, twoDaysAfterTomorrow), equalTo(expected));
  });

  it('flip end+start if end is before start', () => {
    const today = startOfDay(new Date());
    const tomorrow = startOfDay(new Date(+today + ONE_DAY));

    assertThat(daysBetween(tomorrow, today), equalTo([today, tomorrow]));
  });

  it('all days` time are 00:00', () => {
    const today = new Date('2000-01-01 23:42');
    const tomorrow = new Date(+today + ONE_DAY);
    const expected = [startOfDay(today), startOfDay(tomorrow)];
    assertThat(daysBetween(today, tomorrow), equalTo(expected));
  });

  it('30.Oct 16 - 31 Oct 16 = two days (incl day light saving)', () => {
    const today = new Date('2016-10-30');
    const threeDaysAfter = new Date('2016-10-31');

    assertThat(daysBetween(today, threeDaysAfter).length, equalTo(2));
  });
});

describe('`isWeekend()`', () => {
  it('2016-01-01 (Friday) was NOT a weekend', () => {
    const notAWeekend = new Date('2016-01-01');
    assertThat(isWeekend(notAWeekend), equalTo(false));
  });

  it('2016-01-02 (Saturday) was a weekend', () => {
    const aWeekend = new Date('2016-01-02');
    assertThat(isWeekend(aWeekend), equalTo(true));
  });

  it('2016-01-03 (Sunday) was a weekend', () => {
    const aWeekend = new Date('2016-01-03');
    assertThat(isWeekend(aWeekend), equalTo(true));
  });
});

describe('calculations', () => {
  it('`oneWeekAfter()` works', () => {
    const day1 = new Date('2000-01-01');
    const aWeekLater = new Date('2000-01-08');
    assertThat(oneWeekAfter(day1), equalTo(aWeekLater));
  });

  it('`oneWeekBefore()` works', () => {
    const day1 = new Date('2000-01-08');
    const aWeekBefore = new Date('2000-01-01');
    assertThat(oneWeekBefore(day1), equalTo(aWeekBefore));
  });
});

import { startOfWeek } from './day';
describe('`startOfWeek()`', () => {
  it('for 2001-01-01 its this day itself', () => {
    const aMonday = new Date('2001-01-01');
    assertThat(startOfWeek(aMonday), equalTo(aMonday));
  });
  it('for 2001-01-02 its the day before', () => {
    const aTuesday = new Date('2001-01-02');
    const aMonday = new Date('2001-01-01');
    assertThat(startOfWeek(aTuesday), equalTo(aMonday));
  });
  it('for 2001-01-02, a Sunday the Monday before', () => {
    const aSunday = new Date('2001-01-07');
    const aMonday = new Date('2001-01-01');
    assertThat(startOfWeek(aSunday), equalTo(aMonday));
  });
});

describe('`startOfDay`', () => {
  it('is always 00:00:00.000 (no milliseconds left)', () => {
    const dayWithMs = new Date('2001-01-01T12:34:56.789');
    const dateInSameTimezone = (date) => new Date(new Date(date).setMinutes(dayWithMs.getTimezoneOffset()));
    const dayWithoutMs = dateInSameTimezone('2001-01-01T00:00:00.000');
    assertThat(startOfDay(dayWithMs), equalTo(dayWithoutMs));
  });
});

import { getDaysInMonth } from './day';
describe('getDaysInMonth()', () => {
  it('April has 30 days', () =>
    assertThat(getDaysInMonth(4, 2016), equalTo(30)));

  it('June has 30 days', () =>
    assertThat(getDaysInMonth(6, 2016), equalTo(30)));

  it('Sept has 30 days', () =>
    assertThat(getDaysInMonth(9, 2016), equalTo(30)));

  it('Nov has 30 days', () =>
    assertThat(getDaysInMonth(11, 2016), equalTo(30)));

  describe('leap years', () => {
    it('Feb in 1900 has 28 days', () =>
      assertThat(getDaysInMonth(2, 1900), equalTo(28)));

    it('Feb in 1994 has 28 days', () =>
      assertThat(getDaysInMonth(2, 1994), equalTo(28)));

    it('Feb in 1996 has 29 days', () =>
      assertThat(getDaysInMonth(2, 1996), equalTo(29)));

    it('Feb in 1997 has 28 days', () =>
      assertThat(getDaysInMonth(2, 1997), equalTo(28)));

    it('Feb in 2000 has 29 days', () =>
      assertThat(getDaysInMonth(2, 2000), equalTo(29)));

    it('Feb in 2016 has 29 days', () =>
      assertThat(getDaysInMonth(2, 2016), equalTo(29)));

    it('Feb in 2400 has 29 days', () =>
      assertThat(getDaysInMonth(2, 2400), equalTo(29)));

    it('Feb in 2401 has 28 days', () =>
      assertThat(getDaysInMonth(2, 2401), equalTo(28)));
  });
});

import lolex from 'lolex';
import {
  assertThat,
  equalTo,
  instanceOf,
  not,
  strictlyEqualTo,
} from 'hamjest';

import {
  now,
  toDate,
} from './day';

describe('`now()` and `today()` with fake clock', () => {
  let clock;
  const date = '2015-01-01';
  const setFakeClockToYear = (fakeDate) => {
    clock = lolex.install(+new Date(`${fakeDate} 10:00:00`));
  };
  afterEach(() => clock.uninstall());

  it('`now()` reports correct time', () => {
    setFakeClockToYear(date);
    assertThat(now(), equalTo(new Date()));
  });
});

describe('`toDate()`', () => {
  it('parses an ISO date string and returns a date object', () => assertThat(
    toDate('2016-05-02T00:00:00.698Z'), instanceOf(Date)));

  it('returns a new instance of the date object', () => assertThat(
    toDate(new Date()), not(strictlyEqualTo(new Date()))));
});

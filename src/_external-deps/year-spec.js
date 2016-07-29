import assert from 'assert';
import lolex from 'lolex';
import {
  thisYear,
  nextYear,
} from './year';

// Normally we don't need to test external deps, but here
// it's ok, since we can ensure it working nicely, since we
// know here (which causes to couple those tests to the impl)
// that we are using `Date`, which we fake here.
describe('`thisYear()` and `nextYear()`', () => {
  let clock;
  const year = 2000;
  const setFakeClockToYear = (fakeYear) => {
    clock = lolex.install(+new Date(`${fakeYear}-01-01 00:00:00`));
  };
  afterEach(() => clock.uninstall());

  it('`thisYear()` reports the right date', () => {
    setFakeClockToYear(year);
    assert.equal(thisYear(), year);
  });
  it('`nextYear()` reports the right date', () => {
    setFakeClockToYear(year);
    assert.equal(nextYear(), year + 1);
  });
});

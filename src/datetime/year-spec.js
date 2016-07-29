import assert from 'assert';
import {
  containsThisYear as containsThisYearWithoutInjection,
  containsNextYear as containsNextYearWithoutInjection,
} from './year';

const thisYear = () => 1970;
const nextYear = () => thisYear() + 1;

const containsThisYear = (years) => containsThisYearWithoutInjection(years, thisYear);
const containsNextYear = (years) => containsNextYearWithoutInjection(years, nextYear);

const noYears = [];
const onlyNextYear = [nextYear()];
const onlyThisYear = [thisYear()];
const thisAndNextYear = [thisYear(), nextYear()];

describe('`containsThisYear()`', () => {
  describe('returns false', () => {
    it('for empty list', () => {
      assert.equal(containsThisYear(noYears), false);
    });
    it('for list containing only next year', () => {
      assert.equal(containsThisYear(onlyNextYear), false);
    });
  });
  describe('returns true', () => {
    it('for list containing this+next year', () => {
      assert.equal(containsThisYear(thisAndNextYear), true);
    });
    it('when list contains this year', () => {
      assert.equal(containsThisYear(onlyThisYear), true);
    });
  });
});

describe('`containsNextYear()`', () => {
  describe('false', () => {
    it('for empty list', () => {
      assert.equal(containsNextYear(noYears), false);
    });
    it('for list containing only this year', () => {
      assert.equal(containsNextYear(onlyThisYear), false);
    });
  });
  describe('true', () => {
    it('for list containing this+next year', () => {
      assert.equal(containsNextYear(thisAndNextYear), true);
    });
    it('when list contains only next year', () => {
      assert.equal(containsNextYear(onlyNextYear), true);
    });
  });
});

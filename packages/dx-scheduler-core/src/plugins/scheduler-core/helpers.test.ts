import { objectsAreEqual, datesAreEqual } from './helpers';

describe('SchedulerCore helpers', () => {
  describe('#objectsAreEqual', () => {
    it('should work with equal empty objects', () => {
      const last = {};
      const next = {};

      expect(objectsAreEqual(last, next))
        .toBeTruthy();
    });
    it('should work with equal objects', () => {
      const last = { a: 1 };
      const next = { a: 1 };

      expect(objectsAreEqual(last, next))
        .toBeTruthy();
    });
    it('should work with different objects', () => {
      const last = { a: 1 };
      const next = { a: 1, b: 2 };

      expect(objectsAreEqual(last, next))
        .toBeFalsy();
    });
    it('should work with different objects with same length', () => {
      const last = { a: 1 };
      const next = { b: 2 };

      expect(objectsAreEqual(last, next))
        .toBeFalsy();
    });
  });

  describe('#datesAreEqual', () => {
    it('should work with one date', () => {
      const date = new Date('2019-04-19 10:00');

      expect(datesAreEqual(date, date))
        .toBeTruthy();
    });
    it('should work with same dates', () => {
      const last = new Date('2019-04-19 10:00');
      const next = new Date('2019-04-19 10:00');

      expect(datesAreEqual(last, next))
        .toBeTruthy();
    });
    it('should work with different dates', () => {
      const last = new Date('2019-04-19 10:00');
      const next = new Date('2019-04-19 11:00');

      expect(datesAreEqual(last, next))
        .toBeFalsy();
    });
  });
});


import moment from 'moment';
import { allDayPredicate } from './helpers';

describe('AllDayPanel helpers', () => {
  describe('#allDayAppointment', () => {
    it('should work', () => {
      const appointment = { start: moment('2018-07-05'), end: moment('2018-07-06') };

      expect(allDayPredicate(appointment))
        .toBe(true);
    });

    it('should work with hours', () => {
      const appointment = { start: moment('2018-07-05 10:20'), end: moment('2018-07-06 10:19') };

      expect(allDayPredicate(appointment))
        .toBe(false);
    });

    it('should work with other years', () => {
      const appointment = { start: moment('2018-12-31 10:20'), end: moment('2019-01-01 10:00') };

      expect(allDayPredicate(appointment))
        .toBe(false);
    });
  });
});

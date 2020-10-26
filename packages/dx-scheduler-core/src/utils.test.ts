import moment from 'moment';
import {
  computed,
  viewPredicate,
  calculateFirstDateOfWeek,
  getAppointmentStyle,
  filterByViewBoundaries,
  getRRuleSetWithExDates,
  formatDateToString,
  excludedIntervals,
} from './utils';
import { addDateToKey } from '.';

const PACIFIC_TIMEZONE_OFFSET = 480;

describe('Utils', () => {
  describe('#viewPredicate', () => {
    it('should filter outside appointments', () => {
      const appointments = [
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 10:00') },
        { start: moment('2018-07-10 10:00'), end: moment('2018-07-10 12:00') },
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 12:00') },
        { start: moment('2018-07-10 09:30'), end: moment('2018-07-10 10:30') },
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 09:00') },
        { start: moment('2018-07-10 11:00'), end: moment('2018-07-10 12:00') },
      ];
      const filtered = appointments.filter(appointment =>
        viewPredicate(appointment, '2018-07-10 09:00', '2018-07-10 11:00'));

      expect(filtered)
        .toEqual(appointments.slice(0, 4));
    });

    it('should filter appointments from excluded days', () => {
      const appointments = [
        { start: moment('2018-07-03 09:00'), end: moment('2018-07-03 11:00') },
        { start: moment('2018-07-04 09:00'), end: moment('2018-07-05 11:00') },
        { start: moment('2018-07-05 09:00'), end: moment('2018-07-06 11:00') },
        { start: moment('2018-07-05 09:00'), end: moment('2018-07-07 10:00') },
        { start: moment('2018-07-05 09:00'), end: moment('2018-07-05 11:00') },
        { start: moment('2018-07-07 09:00'), end: moment('2018-07-07 09:00') },
        { start: moment('2018-07-07 09:00'), end: moment('2018-07-08 10:00') },
      ];
      const filtered = appointments.filter(appointment =>
        viewPredicate(appointment, '2018-07-02', '2018-07-08 23:59', [4, 6, 0]));

      expect(filtered)
        .toEqual(appointments.slice(0, 4));
    });

    it('should filter all-day appointments', () => {
      const appointments = [
        {
          start: moment('2018-07-10 22:00'), end: moment('2018-07-11 02:00'), allDay: false,
        },
        {
          start: moment('2018-07-10 08:00'), end: moment('2018-07-10 10:00'), allDay: true,
        },
        {
          start: moment('2018-07-09 08:00'), end: moment('2018-07-10 08:00'), allDay: undefined,
        },
      ];
      const filtered = appointments.filter(appointment =>
        viewPredicate(appointment, '2018-07-08', '2018-07-12', [], true));

      expect(filtered)
        .toEqual(appointments.slice(0, 1));
    });
  });
  describe('#excludedIntervals', () => {
    const start = moment('2020-03-03');
    it('should create an interval of excluded days', () => {
      const excludedDays = [3];

      expect(excludedIntervals(excludedDays, start))
        .toEqual([[
          moment(start.day(3)),
          moment(start.day(3)).endOf('day'),
        ]]);
    });
    it('should create several intervals of excluded days', () => {
      const excludedDays = [2, 5];

      expect(excludedIntervals(excludedDays, start))
        .toEqual([[
          moment(start.day(2)),
          moment(start.day(2)).endOf('day'),
        ], [
          moment(start.day(5)),
          moment(start.day(5)).endOf('day'),
        ]]);
    });
    it('should create an interval for several excluded days in a row', () => {
      const excludedDays = [2, 3, 4, 5];

      expect(excludedIntervals(excludedDays, start))
        .toEqual([[
          moment(start.day(2)),
          moment(start.day(5)).endOf('day'),
        ]]);
    });
    it('should work with week boundarie', () => {
      const excludedDays = [0, 5, 6];

      expect(excludedIntervals(excludedDays, start))
        .toEqual([[
          moment(start.day(5)),
          moment(start.day(7)).endOf('day'),
        ]]);
    });
  });
  describe('#calculateFirstDateOfWeek', () => {
    it('should calculate first daye of week', () => {
      const firstDateOfWeek = calculateFirstDateOfWeek('2018-07-06', 3);
      expect(firstDateOfWeek.toString())
        .toBe(new Date(2018, 6, 4).toString());
    });

    it('should calculate first date of week depend on excluded days', () => {
      const firstDateOfWeek = calculateFirstDateOfWeek('2018-07-06', 2, [3, 2, 1]);
      expect(firstDateOfWeek.toString())
        .toBe(new Date(2018, 6, 5).toString());
    });
  });
  describe('#getAppointmentStyle', () => {
    it('should work', () => {
      const geometry = {
        top: 10, left: 20, height: 30, width: 40,
      };
      expect(getAppointmentStyle(geometry))
        .toEqual({
          height: 30,
          width: '40%',
          transform: 'translateY(10px)',
          msTransform: 'translateY(10px)',
          left: '20%',
          position: 'absolute',
        });
    });
  });
  describe('#computed', () => {
    it('should work if viewName === currentView', () => {
      const baseComputed = () => 'baseComputed';
      const viewName = 'Week';
      const getters = {
        currentView: { name: 'Week' },
      };
      const defaultValue = 'defaultValue';

      expect(computed(getters, viewName, baseComputed, defaultValue))
        .toEqual('baseComputed');
    });

    it('should work if viewName !== currentView', () => {
      const baseComputed = () => 'baseComputed';
      const viewName = 'Month';
      const getters = {
        currentView: { name: 'Week' },
      };
      const defaultValue = 'defaultValue';

      expect(computed(getters, viewName, baseComputed, defaultValue))
        .toEqual('defaultValue');
    });

    it('should work if defaultValue === undefined', () => {
      const baseComputed = () => 'baseComputed';
      const viewName = 'Month';
      const getters = {
        currentView: { name: 'Week' },
      };
      const defaultValue = undefined;

      expect(computed(getters, viewName, baseComputed, defaultValue))
        .toEqual('baseComputed');
    });
  });
  describe('#filterByViewBoundaries', () => {
    const leftBound = new Date('2019-04-9 00:00');
    const rightBound = new Date('2019-04-11 00:00');
    it('should filter if appointment not in a view', () => {
      const appointment = {
        start: moment(new Date('2019-04-4 10:00')),
        end: moment(new Date('2019-04-4 11:00')),
      };
      const result = filterByViewBoundaries(appointment, leftBound, rightBound);

      expect(result)
        .toEqual([]);
    });
    it('should work with no recurrence appointment', () => {
      const appointment = {
        start: moment(new Date('2019-04-9 10:00')),
        end: moment(new Date('2019-04-9 11:00')),
      };
      const result = filterByViewBoundaries(appointment, leftBound, rightBound);

      expect(result)
        .toEqual([appointment]);
    });
    it('should work with recurrence appointment', () => {
      const appointment = {
        start: moment(new Date('2019-04-9 2:00')),
        end: moment(new Date('2019-04-9 11:00')),
        rRule: 'FREQ=DAILY;COUNT=2',
        customField: 'a',
        dataItem: {
          startDate: new Date('2019-04-9 2:00'),
          endDate: new Date('2019-04-9 11:00'),
          data: 1,
        },
      };
      const result = filterByViewBoundaries(appointment, leftBound, rightBound);

      expect(result[0].start.toString())
        .toBe(moment(new Date('2019-04-9 2:00')).toString());
      expect(result[0].end.toString())
        .toBe(moment(new Date('2019-04-9 11:00')).toString());

      expect(result[1].start.toString())
        .toBe(moment(new Date('2019-04-10 2:00')).toString());
      expect(result[1].end.toString())
        .toBe(moment(new Date('2019-04-10 11:00')).toString());

      expect(result)
        .toMatchObject([{
          dataItem: {
            startDate: new Date('2019-04-9 2:00'),
            endDate: new Date('2019-04-9 11:00'),
            data: 1,
          },
          customField: 'a',
          rRule: 'FREQ=DAILY;COUNT=2',
        }, {
          dataItem: {
            startDate: new Date('2019-04-10 2:00'),
            endDate: new Date('2019-04-10 11:00'),
            data: 1,
          },
          customField: 'a',
          rRule: 'FREQ=DAILY;COUNT=2',
        }]);
    });
    it('should filter recurrence appointment', () => {
      const leftBoundTest = new Date('2019-04-9 00:00');
      const rightBoundTest = new Date('2019-04-10 00:00');
      const appointment = {
        start: moment(new Date('2019-04-9 10:00')),
        end: moment(new Date('2019-04-10 9:00')),
        rRule: 'FREQ=DAILY;COUNT=2',
      };
      const result = filterByViewBoundaries(appointment, leftBoundTest, rightBoundTest);

      expect(result)
        .toHaveLength(1);
    });
    it('should filter recurrence all-day appointment', () => {
      const leftBoundTest = new Date('2019-04-9 00:00');
      const rightBoundTest = new Date('2019-04-10 00:00');
      const appointment = {
        start: moment(new Date('2019-04-9 8:00')),
        end: moment(new Date('2019-04-10 9:00')),
        rRule: 'FREQ=DAILY;COUNT=2',
      };
      const result = filterByViewBoundaries(appointment, leftBoundTest, rightBoundTest, [], true);

      expect(result)
        .toHaveLength(0);
    });
    it('should filter recurrence appointments by excluded days', () => {
      const leftBoundTest = new Date('2019-08-19 00:00');
      const rightBoundTest = new Date('2019-08-22 00:00');
      const appointment = {
        start: moment(new Date('2019-08-20 10:00')),
        end: moment(new Date('2019-08-20 11:00')),
        rRule: 'FREQ=DAILY;COUNT=2',
      };
      const result = filterByViewBoundaries(appointment, leftBoundTest, rightBoundTest, [2]);

      expect(result)
        .toHaveLength(1);
    });
    it('should work recurrence appointment with EXDATE', () => {
      const leftBoundTest = new Date(Date.UTC(2019, 3, 9, 0, 0));
      const rightBoundTest = new Date(Date.UTC(2019, 3, 12, 0, 0));
      const appointment = {
        start: moment('2019-04-09T10:00:00.000Z'),
        end: moment('2019-04-09T11:00:00.000Z'),
        rRule: 'FREQ=DAILY;COUNT=3',
        exDate: '20190410T100000Z',
      };
      const result = filterByViewBoundaries(appointment, leftBoundTest, rightBoundTest);

      expect(result)
        .toHaveLength(2);
      expect(result[0])
        .toMatchObject({
          dataItem: {
            startDate: new Date('2019-04-09T10:00:00.000Z'),
            endDate: new Date('2019-04-09T11:00:00.000Z'),
          },
        });
      expect(result[1])
        .toMatchObject({
          dataItem: {
            startDate: new Date('2019-04-11T10:00:00.000Z'),
            endDate: new Date('2019-04-11T11:00:00.000Z'),
          },
        });
    });
    it('should work with recurrence appointment with BYMONTHDAY set', () => {
      const monthlyLeftBound = new Date('2019-04-1 00:00');
      const monthlyRightBound = new Date('2019-05-30 00:00');
      const appointment = {
        start: moment(new Date('2019-04-9 00:00')),
        end: moment(new Date('2019-04-9 23:59')),
        rRule: 'FREQ=MONTHLY;COUNT=2;BYMONTHDAY=15',
      };
      const result = filterByViewBoundaries(appointment, monthlyLeftBound, monthlyRightBound);

      expect(result).toHaveLength(2);

      expect(result[0].start.toString())
        .toBe(moment(new Date('2019-04-15 0:00')).toString());
      expect(result[0].end.toString())
        .toBe(moment(new Date('2019-04-15 23:59')).toString());

      expect(result[1].start.toString())
        .toBe(moment(new Date('2019-05-15 0:00')).toString());
      expect(result[1].end.toString())
        .toBe(moment(new Date('2019-05-15 23:59')).toString());
    });
    it('should work correctly with different timezones', () => {
      const monthlyLeftBound = new Date('2019-04-1 00:00');
      const monthlyRightBound = new Date('2019-05-30 00:00');
      const appointment = {
        start: moment(new Date('2019-04-25T12:11:00+0600')),
        end: moment(new Date('2019-04-25T13:00:00+0600')),
        rRule: 'FREQ=DAILY;COUNT=2',
      };
      const result = filterByViewBoundaries(appointment, monthlyLeftBound, monthlyRightBound);

      expect(result).toHaveLength(2);

      expect(result[0].start.toString())
        .toBe(moment(new Date('2019-04-25T12:11:00+0600')).toString());
      expect(result[0].end.toString())
        .toBe(moment(new Date('2019-04-25T13:00:00+0600')).toString());

      expect(result[1].start.toString())
        .toBe(moment(new Date('2019-04-26T12:11:00+0600')).toString());
      expect(result[1].end.toString())
        .toBe(moment(new Date('2019-04-26T13:00:00+0600')).toString());
    });
    it('should work correctly with near-left-boundary appointments', () => {
      const leftBoundary = new Date('2019-04-25 00:00:00+0300');
      const rightBoundary = new Date('2019-04-26 23:59:00+0300');
      const appointment = {
        start: moment(new Date('2019-04-25T00:00:00+0300')),
        end: moment(new Date('2019-04-25T13:00:00+0300')),
        rRule: 'FREQ=DAILY;COUNT=2',
      };
      const result = filterByViewBoundaries(appointment, leftBoundary, rightBoundary);

      expect(result).toHaveLength(2);

      expect(result[0].start.toString())
        .toBe(moment(new Date('2019-04-25T00:00:00+0300')).toString());
      expect(result[0].end.toString())
        .toBe(moment(new Date('2019-04-25T13:00:00+0300')).toString());

      expect(result[1].start.toString())
        .toBe(moment(new Date('2019-04-26T00:00:00+0300')).toString());
      expect(result[1].end.toString())
        .toBe(moment(new Date('2019-04-26T13:00:00+0300')).toString());
    });
    it('should work correctly with near-right-boundary appointments', () => {
      const leftBoundary = new Date('2019-04-25 00:00:00+0300');
      const rightBoundary = new Date('2019-04-26 23:59:00+0300');
      const appointment = {
        start: moment(new Date('2019-04-25T22:11:00+0300')),
        end: moment(new Date('2019-04-25T23:00:00+0300')),
        rRule: 'FREQ=DAILY;COUNT=2',
      };

      const result = filterByViewBoundaries(appointment, leftBoundary, rightBoundary);

      expect(result).toHaveLength(2);

      expect(result[0].start.toString())
        .toBe(moment(new Date('2019-04-25T22:11:00+0300')).toString());
      expect(result[0].end.toString())
        .toBe(moment(new Date('2019-04-25T23:00:00+0300')).toString());

      expect(result[1].start.toString())
        .toBe(moment(new Date('2019-04-26T22:11:00+0300')).toString());
      expect(result[1].end.toString())
        .toBe(moment(new Date('2019-04-26T23:00:00+0300')).toString());
    });

    if ((new Date(2020, 2, 7)).getTimezoneOffset() !== PACIFIC_TIMEZONE_OFFSET) {
      it('should work with recurrence appointment with UNTIL set', () => {
        const monthlyLeftBound = new Date('2019-04-1 00:00');
        const monthlyRightBound = new Date('2019-05-30 00:00');
        const appointment = {
          start: moment(new Date('2019-04-9 00:00')),
          end: moment(new Date('2019-04-9 23:59')),
          rRule: 'FREQ=DAILY;UNTIL=20190410T000000Z',
        };
        const result = filterByViewBoundaries(appointment, monthlyLeftBound, monthlyRightBound);

        expect(result).toHaveLength(2);

        expect(result[0].start.toString())
          .toBe(moment(new Date('2019-04-09 0:00')).toString());
        expect(result[0].end.toString())
          .toBe(moment(new Date('2019-04-09 23:59')).toString());

        expect(result[1].start.toString())
          .toBe(moment(new Date('2019-04-10 0:00')).toString());
        expect(result[1].end.toString())
          .toBe(moment(new Date('2019-04-10 23:59')).toString());
      });
    }
  });
  describe('#getRRuleSetWithExDates', () => {
    it('should create RRuleSet', () => {
      const exDate = '20190410T100000Z';

      expect(getRRuleSetWithExDates(exDate).valueOf()[0])
        .toContain('EXDATE');
    });
  });
  describe('#formatDateToString', () => {
    it('should return valid string format to pass into Date constructor (Safari)', () => {
      const date = Date.UTC(2019, 5, 10, 12, 30);

      expect(formatDateToString(date))
        .toContain('2019-06-10T12:30');
    });
  });
  describe('#addDateToKey', () => {
    it('should add date converted to string to the provided key', () => {
      const date = moment(new Date('2019-04-10 0:00'));

      expect(addDateToKey('test', date))
        .toBe(`test_${(new Date('2019-04-10 0:00')).toString()}`);
    });
  });
});

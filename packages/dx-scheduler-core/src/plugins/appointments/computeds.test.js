import moment from 'moment';
import { getCellByDate, predicate } from './helpers';
import {
  filteredAppointments,
  sliceAppointmentsByDay,
  getRectByDates,
} from './computeds';

jest.mock('./helpers', () => ({
  getCellByDate: jest.fn(),
  predicate: jest.fn(),
}));

describe('Appointment computeds', () => {
  describe('#filteredAppointments', () => {
    beforeEach(() => {
      predicate
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => false);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should work', () => {
      const appointments = [
        { start: new Date(2018, 5, 27, 9), end: new Date(2018, 5, 27, 11), dataItem: {} },
        { start: new Date(2018, 5, 27, 11), end: new Date(2018, 5, 27, 16), dataItem: {} },
      ];
      const filtered = filteredAppointments(
        appointments,
        new Date(2018, 5, 27, 10),
        new Date(2018, 5, 27, 15),
        [],
      );

      expect(filtered).toEqual([
        { start: new Date(2018, 5, 27, 9), end: new Date(2018, 5, 27, 11), dataItem: {} },
      ]);
    });
  });

  describe('#sliceAppointmentsByDay', () => {
    it('should slice appointment to two days', () => {
      const appointments = [
        { start: moment('2018-06-27 09:00'), end: moment('2018-06-28 11:00') },
      ];
      const slicedAppointments = sliceAppointmentsByDay(appointments);
      const [first, last] = slicedAppointments;

      expect(slicedAppointments)
        .toHaveLength(2);
      expect(first.start.toJSON())
        .toEqual(moment('2018-06-27 09:00').toJSON());
      expect(first.end.toJSON())
        .toEqual(moment('2018-06-27').endOf('day').toJSON());
      expect(last.start.toJSON())
        .toEqual(moment('2018-06-28').toJSON());
      expect(last.end.toJSON())
        .toEqual(moment('2018-06-28 11:00').toJSON());
    });

    it('should not slice appointment if it in one day', () => {
      const appointments = [
        { start: moment('2018-06-27 09:00'), end: moment('2018-06-27 11:00') },
      ];
      const slicedAppointments = sliceAppointmentsByDay(appointments);

      expect(slicedAppointments)
        .toHaveLength(1);

      expect(slicedAppointments[0].start.toJSON())
        .toEqual(moment('2018-06-27 09:00').toJSON());
      expect(slicedAppointments[0].end.toJSON())
        .toEqual(moment('2018-06-27 11:00').toJSON());
    });
  });

  describe('#getRectByDates', () => {
    beforeEach(() => {
      getCellByDate
        .mockImplementationOnce(() => ({ index: 0, startDate: new Date(2018, 5, 25, 8, 30) }))
        .mockImplementationOnce(() => ({ index: 1, startDate: new Date(2018, 5, 25, 9) }));
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    const offsetParent = {
      getBoundingClientRect: () => ({
        top: 10, left: 10, width: 250,
      }),
    };
    const cellElements = [{
      getBoundingClientRect: () => ({
        top: 10, left: 20, width: 100, height: 100,
      }),
      offsetParent,
    }, {
      getBoundingClientRect: () => ({
        top: 110, left: 20, width: 100, height: 100,
      }),
      offsetParent,
    }];

    it('should calculate geometry by dates', () => {
      const times = [
        { start: new Date(2017, 6, 20, 8, 0), end: new Date(2017, 6, 20, 8, 30) },
        { start: new Date(2017, 6, 20, 8, 30), end: new Date(2017, 6, 20, 9, 0) },
        { start: new Date(2017, 6, 20, 9, 0), end: new Date(2017, 6, 20, 9, 30) },
        { start: new Date(2017, 6, 20, 9, 30), end: new Date(2017, 6, 20, 10, 0) },
      ];
      const days = [new Date(2018, 5, 24), new Date(2018, 5, 25), new Date(2018, 5, 26)];
      const cellDuration = 30;
      const startDate = new Date(2018, 5, 25, 8, 45);
      const endDate = new Date(2018, 5, 25, 9, 15);

      const {
        top, left, height, width, parentWidth,
      } = getRectByDates(
        startDate,
        endDate,
        days,
        times,
        cellDuration,
        cellElements,
      );

      expect(top).toBe(50);
      expect(left).toBe(10);
      expect(height).toBe(100);
      expect(width).toBe(85);
      expect(parentWidth).toBe(250);
    });
  });
});

import { getCellByDate, predicate } from './helpers';
import {
  filteredAppointments,
  getAppointments,
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

  describe('#getAppointments', () => {
    const getAppointmentStartDate = appointment => appointment.startField;
    const getAppointmentEndDate = appointment => appointment.endField;
    const data = [
      { startField: new Date(2018, 5, 27, 9), endField: new Date(2018, 5, 27, 11) },
      { startField: new Date(2018, 5, 27, 11), endField: new Date(2018, 5, 27, 16) },
    ];

    it('should work', () => {
      const filtered = getAppointments(
        data,
        getAppointmentStartDate,
        getAppointmentEndDate,
      );

      expect(filtered).toEqual([
        {
          start: new Date(2018, 5, 27, 9),
          end: new Date(2018, 5, 27, 11),
          dataItem: { startField: new Date(2018, 5, 27, 9), endField: new Date(2018, 5, 27, 11) },
        },
        {
          start: new Date(2018, 5, 27, 11),
          end: new Date(2018, 5, 27, 16),
          dataItem: { startField: new Date(2018, 5, 27, 11), endField: new Date(2018, 5, 27, 16) },
        },
      ]);
    });
  });

  describe('#sliceAppointmentsByDay', () => {
    it('should slice appointment to two days', () => {
      const appointments = [
        { start: new Date(2018, 5, 27, 9), end: new Date(2018, 5, 28, 11), dataItem: {} },
      ];
      expect(sliceAppointmentsByDay(appointments))
        .toEqual([
          {
            start: new Date(2018, 5, 27, 9),
            end: new Date(2018, 5, 27, 23, 59, 59, 999),
            dataItem: {},
          },
          { start: new Date(2018, 5, 28, 0), end: new Date(2018, 5, 28, 11), dataItem: {} },
        ]);
    });

    it('should not slice appointment if it in one day', () => {
      const appointments = [
        { start: new Date(2018, 5, 27, 9), end: new Date(2018, 5, 27, 11), dataItem: {} },
      ];
      expect(sliceAppointmentsByDay(appointments))
        .toEqual([
          { start: new Date(2018, 5, 27, 9), end: new Date(2018, 5, 27, 11), dataItem: {} },
        ]);
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

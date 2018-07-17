import moment from 'moment';
import {
  sliceAppointmentsByWeek,
  getRectByDates,
} from './helpers';

describe('MonthView Helpers', () => {
  const monthCells = [
    [
      { value: moment('2018-06-28') },
      { value: moment('2018-06-29') },
      { value: moment('2018-06-30') },
      { value: moment('2018-07-01') },
      { value: moment('2018-07-02') },
      { value: moment('2018-07-03') },
      { value: moment('2018-07-04') },
    ],
    [
      { value: moment('2018-07-05') },
      { value: moment('2018-07-06') },
      { value: moment('2018-07-07') },
      { value: moment('2018-07-08') },
      { value: moment('2018-07-09') },
      { value: moment('2018-07-10') },
      { value: moment('2018-07-11') },
    ],
    [
      { value: moment('2018-07-12') },
      { value: moment('2018-07-13') },
      { value: moment('2018-07-14') },
      { value: moment('2018-07-15') },
      { value: moment('2018-07-16') },
      { value: moment('2018-07-17') },
      { value: moment('2018-07-18') },
    ],
    [
      { value: moment('2018-07-19') },
      { value: moment('2018-07-20') },
      { value: moment('2018-07-21') },
      { value: moment('2018-07-22') },
      { value: moment('2018-07-23') },
      { value: moment('2018-07-24') },
      { value: moment('2018-07-25') },
    ],
    [
      { value: moment('2018-07-26') },
      { value: moment('2018-07-27') },
      { value: moment('2018-07-28') },
      { value: moment('2018-07-29') },
      { value: moment('2018-07-30') },
      { value: moment('2018-07-31') },
      { value: moment('2018-08-01') },
    ],
    [
      { value: moment('2018-08-02') },
      { value: moment('2018-08-03') },
      { value: moment('2018-08-04') },
      { value: moment('2018-08-05') },
      { value: moment('2018-08-06') },
      { value: moment('2018-08-07') },
      { value: moment('2018-08-08') },
    ],
  ];
  describe('#sliceAppointmentsByWeek', () => {
    it('should not slice appointments if they are short', () => {
      const appointments = [
        { start: moment('2018-07-05'), end: moment('2018-07-12'), dataItem: {} },
        { start: moment('2018-07-05'), end: moment('2018-07-06'), dataItem: {} },
      ];

      const slicedAppointments = sliceAppointmentsByWeek(appointments, monthCells);
      expect(slicedAppointments[0].start.format())
        .toEqual(moment('2018-07-05').format());
      expect(slicedAppointments[0].end.format())
        .toEqual(moment('2018-07-11 23:59:59.999').format());

      expect(slicedAppointments[1].start.format())
        .toEqual(moment('2018-07-05').format());
      expect(slicedAppointments[1].end.format())
        .toEqual(moment('2018-07-06').format());
    });

    it('should slice appointment if it start on first week and end on second week', () => {
      const appointments = [
        { start: moment('2018-07-11 22:00'), end: moment('2018-07-12 09:00'), dataItem: { id: 1 } },
      ];

      const slicedAppointments = sliceAppointmentsByWeek(appointments, monthCells);
      expect(slicedAppointments)
        .toHaveLength(2);
      expect(slicedAppointments[0].start.format())
        .toEqual(moment('2018-07-11 22:00').format());
      expect(slicedAppointments[0].end.format())
        .toEqual(moment('2018-07-11 23:59:59.999').format());
      expect(slicedAppointments[1].start.format())
        .toEqual(moment('2018-07-12 00:00').format());
      expect(slicedAppointments[1].end.format())
        .toEqual(moment('2018-07-12 09:00').format());
    });

    it('should slice appointment if it start on first week and end on third week', () => {
      const appointments = [
        { start: moment('2018-07-09 16:00'), end: moment('2018-07-23 05:00'), dataItem: { id: 1 } },
      ];

      const slicedAppointments = sliceAppointmentsByWeek(appointments, monthCells);
      expect(slicedAppointments)
        .toHaveLength(3);
      expect(slicedAppointments[0].start.format())
        .toEqual(moment('2018-07-09 16:00').format());
      expect(slicedAppointments[0].end.format())
        .toEqual(moment('2018-07-11 23:59:59.999').format());

      expect(slicedAppointments[1].start.format())
        .toEqual(moment('2018-07-12 00:00').format());
      expect(slicedAppointments[1].end.format())
        .toEqual(moment('2018-07-18 23:59:59.999').format());

      expect(slicedAppointments[2].start.format())
        .toEqual(moment('2018-07-19 00:00').format());
      expect(slicedAppointments[2].end.format())
        .toEqual(moment('2018-07-23 05:00').format());
    });
    describe('#getRectByDates', () => {
      const offsetParent = {
        getBoundingClientRect: () => ({
          top: 10, left: 10, width: 250,
        }),
      };
      const cellElements = [{}, {}, {}, {}, {}, {}, {}, {
        getBoundingClientRect: () => ({
          top: 110, left: 20, width: 100, height: 100,
        }),
        offsetParent,
      }, {}, {
        getBoundingClientRect: () => ({
          top: 110, left: 320, width: 100, height: 100,
        }),
        offsetParent,
      }];

      it('should calculate geometry by dates for one day long', () => {
        const startDate = new Date('2018-07-05 10:20');
        const endDate = new Date('2018-07-06 00:00');
        const {
          top, left, height, width, parentWidth,
        } = getRectByDates(
          startDate,
          endDate,
          monthCells,
          cellElements,
        );

        expect(top).toBe(132);
        expect(left).toBe(12);
        expect(height).toBe(68);
        expect(width).toBe(98);
        expect(parentWidth).toBe(250);
      });
      it('should calculate geometry by dates for many days long', () => {
        const startDate = new Date('2018-07-05 00:00');
        const endDate = new Date('2018-07-08 00:00');
        const {
          top, left, height, width, parentWidth,
        } = getRectByDates(
          startDate,
          endDate,
          monthCells,
          cellElements,
        );

        expect(top).toBe(132);
        expect(left).toBe(12);
        expect(height).toBe(68);
        expect(width).toBe(398);
        expect(parentWidth).toBe(250);
      });
    });
  });
});

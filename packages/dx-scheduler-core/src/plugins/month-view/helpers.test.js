import moment from 'moment';
import {
  sliceAppointmentByWeek,
} from './helpers';

describe('MonthView Helpers', () => {
  const viewCellsData = [
    [
      { startDate: moment('2018-06-28'), endDate: moment('2018-06-29') },
      { startDate: moment('2018-06-29'), endDate: moment('2018-06-30') },
      { startDate: moment('2018-06-30'), endDate: moment('2018-07-01') },
      { startDate: moment('2018-07-01'), endDate: moment('2018-07-02') },
      { startDate: moment('2018-07-02'), endDate: moment('2018-07-03') },
      { startDate: moment('2018-07-03'), endDate: moment('2018-07-04') },
      { startDate: moment('2018-07-04'), endDate: moment('2018-07-05') },
    ],
    [
      { startDate: moment('2018-07-05'), endDate: moment('2018-07-06') },
      { startDate: moment('2018-07-06'), endDate: moment('2018-07-07') },
      { startDate: moment('2018-07-07'), endDate: moment('2018-07-08') },
      { startDate: moment('2018-07-08'), endDate: moment('2018-07-09') },
      { startDate: moment('2018-07-09'), endDate: moment('2018-07-10') },
      { startDate: moment('2018-07-10'), endDate: moment('2018-07-11') },
      { startDate: moment('2018-07-11'), endDate: moment('2018-07-12') },
    ],
    [
      { startDate: moment('2018-07-12'), endDate: moment('2018-07-13') },
      { startDate: moment('2018-07-13'), endDate: moment('2018-07-14') },
      { startDate: moment('2018-07-14'), endDate: moment('2018-07-15') },
      { startDate: moment('2018-07-15'), endDate: moment('2018-07-16') },
      { startDate: moment('2018-07-16'), endDate: moment('2018-07-17') },
      { startDate: moment('2018-07-17'), endDate: moment('2018-07-18') },
      { startDate: moment('2018-07-18'), endDate: moment('2018-07-19') },
    ],
    [
      { startDate: moment('2018-07-19'), endDate: moment('2018-07-20') },
      { startDate: moment('2018-07-20'), endDate: moment('2018-07-21') },
      { startDate: moment('2018-07-21'), endDate: moment('2018-07-22') },
      { startDate: moment('2018-07-22'), endDate: moment('2018-07-23') },
      { startDate: moment('2018-07-23'), endDate: moment('2018-07-24') },
      { startDate: moment('2018-07-24'), endDate: moment('2018-07-25') },
      { startDate: moment('2018-07-25'), endDate: moment('2018-07-26') },
    ],
    [
      { startDate: moment('2018-07-26'), endDate: moment('2018-07-27') },
      { startDate: moment('2018-07-27'), endDate: moment('2018-07-28') },
      { startDate: moment('2018-07-28'), endDate: moment('2018-07-29') },
      { startDate: moment('2018-07-29'), endDate: moment('2018-07-30') },
      { startDate: moment('2018-07-30'), endDate: moment('2018-07-31') },
      { startDate: moment('2018-07-31'), endDate: moment('2018-08-01') },
      { startDate: moment('2018-08-01'), endDate: moment('2018-08-02') },
    ],
    [
      { startDate: moment('2018-08-02'), endDate: moment('2018-08-03') },
      { startDate: moment('2018-08-03'), endDate: moment('2018-08-04') },
      { startDate: moment('2018-08-04'), endDate: moment('2018-08-05') },
      { startDate: moment('2018-08-05'), endDate: moment('2018-08-06') },
      { startDate: moment('2018-08-06'), endDate: moment('2018-08-07') },
      { startDate: moment('2018-08-07'), endDate: moment('2018-08-08') },
      { startDate: moment('2018-08-08'), endDate: moment('2018-08-09') },
    ],
  ];
  describe('#sliceAppointmentByWeek', () => {
    const bounds = { left: viewCellsData[0][0].startDate, right: viewCellsData[5][6].startDate };

    it('should not slice appointments if they are short', () => {
      const appointment1 = { start: moment('2018-07-05'), end: moment('2018-07-12'), dataItem: {} };
      const appointment2 = { start: moment('2018-07-05'), end: moment('2018-07-06'), dataItem: {} };

      const slicedAppointment1 = sliceAppointmentByWeek(bounds, appointment1, 7);
      expect(slicedAppointment1[0].start.format())
        .toEqual(moment('2018-07-05').format());
      expect(slicedAppointment1[0].end.format())
        .toEqual(moment('2018-07-11 23:59:59.999').format());

      const slicedAppointment2 = sliceAppointmentByWeek(bounds, appointment2, 7);
      expect(slicedAppointment2[0].start.format())
        .toEqual(moment('2018-07-05').format());
      expect(slicedAppointment2[0].end.format())
        .toEqual(moment('2018-07-06').format());
    });

    it('should slice appointment if it starts on first week and ends on second', () => {
      const appointment = { start: moment('2018-07-11 22:00'), end: moment('2018-07-12 09:00'), dataItem: { id: 1 } };

      const slicedAppointment = sliceAppointmentByWeek(bounds, appointment, 7);
      expect(slicedAppointment)
        .toHaveLength(2);
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-11 22:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-07-11 23:59:59.999').format());
      expect(slicedAppointment[1].start.format())
        .toEqual(moment('2018-07-12 00:00').format());
      expect(slicedAppointment[1].end.format())
        .toEqual(moment('2018-07-12 09:00').format());
    });

    it('should slice appointment if it starts on first week and ends on third', () => {
      const appointment = { start: moment('2018-07-09 16:00'), end: moment('2018-07-23 05:00'), dataItem: { id: 1 } };

      const slicedAppointment = sliceAppointmentByWeek(bounds, appointment, 7);
      expect(slicedAppointment)
        .toHaveLength(3);
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-09 16:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-07-11 23:59:59.999').format());

      expect(slicedAppointment[1].start.format())
        .toEqual(moment('2018-07-12 00:00').format());
      expect(slicedAppointment[1].end.format())
        .toEqual(moment('2018-07-18 23:59:59.999').format());

      expect(slicedAppointment[2].start.format())
        .toEqual(moment('2018-07-19 00:00').format());
      expect(slicedAppointment[2].end.format())
        .toEqual(moment('2018-07-23 05:00').format());
    });

    it('should cut appointment if it starts before start view date', () => {
      const slicedAppointment = sliceAppointmentByWeek(
        { left: moment('2018-07-23'), right: moment('2018-08-05') },
        { start: moment('2018-07-21 00:00'), end: moment('2018-08-01 00:00') },
        7,
      );
      expect(slicedAppointment)
        .toHaveLength(2);
      expect(slicedAppointment[0].start.format())
        .toBe(moment('2018-07-23 00:00').format());
      expect(slicedAppointment[0].end.format())
        .toBe(moment('2018-07-29 23:59:59').format());
      expect(slicedAppointment[1].start.format())
        .toBe(moment('2018-07-30 00:00').format());
      expect(slicedAppointment[1].end.format())
        .toBe(moment('2018-08-01 00:00').format());
    });

    it('should cut appointment if it ends after end view date', () => {
      const slicedAppointment = sliceAppointmentByWeek(
        { left: moment('2018-07-23'), right: moment('2018-08-05') },
        { start: moment('2018-07-27 00:00'), end: moment('2018-08-08 00:00') },
        7,
      );
      expect(slicedAppointment)
        .toHaveLength(2);
      expect(slicedAppointment[0].start.format())
        .toBe(moment('2018-07-27 00:00').format());
      expect(slicedAppointment[0].end.format())
        .toBe(moment('2018-07-29 23:59:59').format());
      expect(slicedAppointment[1].start.format())
        .toBe(moment('2018-07-30 00:00').format());
      expect(slicedAppointment[1].end.format())
        .toBe(moment('2018-08-05 00:00').format());
    });

    it('should not return "zero-duration" appointments', () => {
      const slicedAppointment = sliceAppointmentByWeek(
        { left: moment('2018-06-25'), right: moment('2018-08-05') },
        { start: moment('2018-06-22'), end: moment('2018-07-02') },
        7,
      );
      expect(slicedAppointment)
        .toHaveLength(1);
    });
  });
});

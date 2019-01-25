import moment from 'moment';
import {
  sliceAppointmentByWeek,
  getMonthCellIndexByDate,
} from './helpers';

describe('MonthView Helpers', () => {
  describe('#sliceAppointmentByWeek', () => {
    const bounds = { left: moment('2018-06-28'), right: moment('2018-08-09') };

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
      const appointment = {
        start: moment('2018-07-11 22:00'), end: moment('2018-07-12 09:00'), dataItem: { id: 1 },
      };

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
      const appointment = {
        start: moment('2018-07-09 16:00'), end: moment('2018-07-23 05:00'), dataItem: { id: 1 },
      };

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
      const slicedAppointments = sliceAppointmentByWeek(
        { left: moment('2018-06-25'), right: moment('2018-08-05') },
        { start: moment('2018-06-22'), end: moment('2018-07-02') },
        7,
      );
      expect(slicedAppointments)
        .toHaveLength(1);
    });

    it('should slice appointment that ends with milliseconds', () => {
      const slicedAppointments = sliceAppointmentByWeek(
        { left: moment('2018-06-24'), right: moment('2018-08-04') },
        { start: moment('2018-07-21 09:00:00'), end: moment('2018-07-21T23:59:59.599') },
        7,
      );
      expect(slicedAppointments)
        .toHaveLength(1);
    });
  });

  describe('#getMonthCellIndexByDate', () => {
    const viewCellsData = [
      [
        { startDate: moment('2018-06-24'), endDate: moment('2018-06-25') },
        { startDate: moment('2018-06-25'), endDate: moment('2018-06-26') },
        { startDate: moment('2018-06-26'), endDate: moment('2018-06-27') },
        { startDate: moment('2018-06-27'), endDate: moment('2018-06-28') },
      ],
      [
        { startDate: moment('2018-06-28'), endDate: moment('2018-06-29') },
        { startDate: moment('2018-06-29'), endDate: moment('2018-06-30') },
        { startDate: moment('2018-06-30'), endDate: moment('2018-07-01') },
        { startDate: moment('2018-07-01'), endDate: moment('2018-07-02') },
      ],
    ];
    it('should return cell index', () => {
      const date = '2018-06-26 07:30';
      const takePrev = false;
      expect(getMonthCellIndexByDate(viewCellsData, date, takePrev))
        .toEqual(2);
    });

    it('should return cell index with takePrev property', () => {
      const date = '2018-06-29';
      expect(getMonthCellIndexByDate(viewCellsData, date, false))
        .toEqual(5);
      expect(getMonthCellIndexByDate(viewCellsData, date, true))
        .toEqual(4);
    });
  });
});

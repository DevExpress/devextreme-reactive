import moment from 'moment';
import {
  allDayPredicate, sliceAppointmentsByBoundaries,
  getAllDayCellIndexByAppointmentData, sliceAppointmentsByDays,
} from './helpers';

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

    it('should work with the "allDay" appointment field', () => {
      const appointment = {
        start: moment('2018-12-31 10:20'), end: moment('2019-01-01 10:00'), allDay: true,
      };

      expect(allDayPredicate(appointment))
        .toBe(true);
    });
  });
  describe('#sliceAppointmentsByBoundaries', () => {
    const left = new Date('2018-07-30 00:00');
    const right = new Date('2018-08-05 23:59:59');
    it('should slice without excludedDays', () => {
      const excludedDays = [];
      const appointment = {
        start: moment('2018-07-30 10:00'), end: moment('2018-07-31 22:30'), dataItem: {},
      };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-30 10:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-07-31 22:30').format());
    });

    it('should slice if start in excluded days', () => {
      const excludedDays = [1, 2];
      const appointment = {
        start: moment('2018-07-30 10:00'), end: moment('2018-08-01 22:30'), dataItem: {},
      };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-08-01 00:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-08-01 22:30').format());
    });

    it('should slice if end in excluded days', () => {
      const excludedDays = [2, 3];
      const appointment = {
        start: moment('2018-07-30 10:00'), end: moment('2018-08-01 22:30'), dataItem: {},
      };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-30 10:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-07-30 23:59:59').format());
    });

    it('should not slice if boundaries are not excluded days', () => {
      const excludedDays = [0, 2, 4];
      const appointment = {
        start: moment('2018-07-30 10:00'), end: moment('2018-08-03 22:30'), dataItem: {},
      };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-30 10:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-08-03 22:30').format());
    });

    it('should slice if start is before left boundary', () => {
      const excludedDays = [];
      const appointment = {
        start: moment('2018-07-27 10:00'), end: moment('2018-08-03 22:30'), dataItem: {},
      };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-30 00:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-08-03 22:30').format());
    });

    it('should slice if end is after right boundary', () => {
      const excludedDays = [];
      const appointment = {
        start: moment('2018-07-31 10:00'), end: moment('2018-08-06 22:30'), dataItem: {},
      };

      const slicedAppointment = sliceAppointmentsByBoundaries(
        appointment, left, right, excludedDays,
      );
      expect(slicedAppointment[0].start.format())
        .toEqual(moment('2018-07-31 10:00').format());
      expect(slicedAppointment[0].end.format())
        .toEqual(moment('2018-08-05 23:59:59').format());
    });

    it('should not fail if excluded days are not defined', () => {
      const appointment = {
        start: moment('2018-07-31 10:00'), end: moment('2018-08-06 22:30'), dataItem: {},
      };
      expect(() => {
        sliceAppointmentsByBoundaries(
          appointment, left, right,
        );
      }).not.toThrow();
    });
  });

  describe('#getAllDayCellIndexByDate', () => {
    const viewCellsDataBase = [
      [
        { startDate: new Date('2018-06-24 08:00'), endDate: new Date('2018-06-24 08:30') },
        { startDate: new Date('2018-06-25 08:00'), endDate: new Date('2018-06-25 08:30') },
        { startDate: new Date('2018-06-26 08:00'), endDate: new Date('2018-06-26 08:30') },
        { startDate: new Date('2018-06-27 08:00'), endDate: new Date('2018-06-27 08:30') },
      ],
      [
        { startDate: new Date('2018-06-24 08:30'), endDate: new Date('2018-06-24 09:00') },
        { startDate: new Date('2018-06-25 08:30'), endDate: new Date('2018-06-25 09:00') },
        { startDate: new Date('2018-06-26 08:30'), endDate: new Date('2018-06-26 09:00') },
        { startDate: new Date('2018-06-27 08:30'), endDate: new Date('2018-06-27 09:00') },
      ],
    ];
    it('should return cell index', () => {
      const date = '2018-06-24 07:30';
      const takePrev = false;
      expect(getAllDayCellIndexByAppointmentData(viewCellsDataBase, date, {}, takePrev))
        .toEqual(0);
    });

    it('should return cell index with takePrev property', () => {
      const date = '2018-06-25';
      expect(getAllDayCellIndexByAppointmentData(viewCellsDataBase, date, {}, false))
        .toEqual(1);
      expect(getAllDayCellIndexByAppointmentData(viewCellsDataBase, date, {}, true))
        .toEqual(0);
    });

    it('should return cell index depending on groupingInfo', () => {
      const viewCellsData = [[{
        startDate: new Date('2018-06-24 08:00'),
        endDate: new Date('2018-06-24 08:30'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: new Date('2018-06-24 08:00'),
        endDate: new Date('2018-06-24 08:30'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }]];
      const date = '2018-06-24 07:30';
      const firstTestAppointment = { test: 1 };
      const secondTestAppointment = { test: 2 };

      expect(getAllDayCellIndexByAppointmentData(viewCellsData, date, firstTestAppointment, false))
        .toEqual(0);
      expect(getAllDayCellIndexByAppointmentData(viewCellsData, date, secondTestAppointment, false))
        .toEqual(1);
    });
  });

  describe('#sliceAppointmentsByDays', () => {
    it('should return an array with one appointment if it is one-day long', () => {
      const appointment = {
        start: moment(new Date(2020, 0, 1, 0, 0)),
        end: moment(new Date(2020, 0, 1, 23, 59)),
      };

      const appointments = sliceAppointmentsByDays(appointment, []);
      expect(appointments)
        .toHaveLength(1);
      expect(appointments[0].start.format())
        .toEqual(moment(new Date(2020, 0, 1, 0, 0)).format());
      expect(appointments[0].end.format())
        .toEqual(moment(new Date(2020, 0, 1, 0, 0)).endOf('day').format());
    });

    it('should return an array of appointments', () => {
      const appointment = {
        start: moment(new Date(2020, 0, 1, 0, 0)),
        end: moment(new Date(2020, 0, 2, 23, 59)),
      };

      const appointments = sliceAppointmentsByDays(appointment, []);
      expect(appointments)
        .toHaveLength(2);
      expect(appointments[0].start.format())
        .toEqual(moment(new Date(2020, 0, 1, 0, 0)).format());
      expect(appointments[0].end.format())
        .toEqual(moment(new Date(2020, 0, 1, 0, 0)).endOf('day').format());
      expect(appointments[1].start.format())
        .toEqual(moment(new Date(2020, 0, 2, 0, 0)).format());
      expect(appointments[1].end.format())
        .toEqual(moment(new Date(2020, 0, 2, 0, 0)).endOf('day').format());
    });

    it('should work with excluded days', () => {
      const appointment = {
        start: moment(new Date(2020, 0, 1, 0, 0)),
        end: moment(new Date(2020, 0, 3, 23, 59)),
      };
      const excludedDys = [4];

      const appointments = sliceAppointmentsByDays(appointment, excludedDys);
      expect(appointments)
        .toHaveLength(2);
      expect(appointments[0].start.format())
        .toEqual(moment(new Date(2020, 0, 1, 0, 0)).format());
      expect(appointments[0].end.format())
        .toEqual(moment(new Date(2020, 0, 1, 0, 0)).endOf('day').format());
      expect(appointments[1].start.format())
        .toEqual(moment(new Date(2020, 0, 3, 0, 0)).format());
      expect(appointments[1].end.format())
        .toEqual(moment(new Date(2020, 0, 3, 0, 0)).endOf('day').format());
    });
  });
});

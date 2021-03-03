import moment from 'moment';
import {
  sliceAppointmentByWeek,
  getMonthCellIndexByAppointmentData,
  getMonthHorizontallyGroupedColumnIndex,
  getMonthVerticallyGroupedRowIndex,
} from './helpers';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '../../constants';
import { addDateToKey } from '../../utils';

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  addDateToKey: jest.fn(),
}));

describe('MonthView Helpers', () => {
  describe('#sliceAppointmentByWeek', () => {
    const bounds = { left: moment('2018-06-28'), right: moment('2018-08-09') };

    afterEach(() => {
      jest.resetAllMocks();
    });
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

    it('should call addDateToKey with correct parameters', () => {
      const start = moment('2018-07-27');
      const end = moment('2018-08-04');
      const left = moment('2018-07-23');
      const right = moment('2018-08-05');
      const key = 'test';
      sliceAppointmentByWeek(
        { left, right }, { start, end, key }, 7,
      );

      expect(addDateToKey)
        .toHaveBeenCalledTimes(2);
      expect(addDateToKey)
        .toHaveBeenCalledWith(key, start);
      expect(addDateToKey)
        .toHaveBeenCalledWith(key, left.clone().add(7, 'days'));
    });
  });

  describe('#getMonthCellIndexByAppointmentData ', () => {
    const firstTestAppointment = { test: 1 };
    const secondTestAppointment = { test: 2 };

    const viewCellsDataBase = [
      [
        { startDate: moment('2018-06-24'), endDate: moment('2018-06-25') },
        { startDate: moment('2018-06-25'), endDate: moment('2018-06-26') },
        { startDate: moment('2018-06-26'), endDate: moment('2018-06-27') },
        { startDate: moment('2018-06-27'), endDate: moment('2018-06-28') },
        { startDate: moment('2018-06-28'), endDate: moment('2018-06-29') },
        { startDate: moment('2018-06-29'), endDate: moment('2018-06-30') },
        { startDate: moment('2018-06-30'), endDate: moment('2018-07-01') },
      ],
      [
        { startDate: moment('2018-07-01'), endDate: moment('2018-07-02') },
        { startDate: moment('2018-07-02'), endDate: moment('2018-07-03') },
        { startDate: moment('2018-07-03'), endDate: moment('2018-07-04') },
        { startDate: moment('2018-07-04'), endDate: moment('2018-07-05') },
        { startDate: moment('2018-07-05'), endDate: moment('2018-07-06') },
        { startDate: moment('2018-07-06'), endDate: moment('2018-07-07') },
        { startDate: moment('2018-07-07'), endDate: moment('2018-07-08') },
      ],
    ];
    const horizontallyGroupedViewCells = [
      [{
        startDate: moment('2018-06-24'),
        endDate: moment('2018-06-25'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-25'),
        endDate: moment('2018-06-26'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-26'),
        endDate: moment('2018-06-27'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-27'),
        endDate: moment('2018-06-28'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-28'),
        endDate: moment('2018-06-29'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-29'),
        endDate: moment('2018-06-30'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-30'),
        endDate: moment('2018-07-01'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-24'),
        endDate: moment('2018-06-25'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-25'),
        endDate: moment('2018-06-26'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-26'),
        endDate: moment('2018-06-27'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-27'),
        endDate: moment('2018-06-28'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-28'),
        endDate: moment('2018-06-29'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-29'),
        endDate: moment('2018-06-30'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-30'),
        endDate: moment('2018-07-01'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }],
    ];
    const verticallyGroupedViewCells = [
      [{
        startDate: moment('2018-06-24'),
        endDate: moment('2018-06-25'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-25'),
        endDate: moment('2018-06-26'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-26'),
        endDate: moment('2018-06-27'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-27'),
        endDate: moment('2018-06-28'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-28'),
        endDate: moment('2018-06-29'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-29'),
        endDate: moment('2018-06-30'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-30'),
        endDate: moment('2018-07-01'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }], [{
        startDate: moment('2018-06-24'),
        endDate: moment('2018-06-25'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-25'),
        endDate: moment('2018-06-26'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-26'),
        endDate: moment('2018-06-27'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-27'),
        endDate: moment('2018-06-28'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-28'),
        endDate: moment('2018-06-29'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-29'),
        endDate: moment('2018-06-30'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-30'),
        endDate: moment('2018-07-01'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }],
    ];
    const groupedByDateViewCells = [
      [{
        startDate: moment('2018-06-24'),
        endDate: moment('2018-06-25'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-24'),
        endDate: moment('2018-06-25'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-25'),
        endDate: moment('2018-06-26'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-25'),
        endDate: moment('2018-06-26'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-26'),
        endDate: moment('2018-06-27'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-26'),
        endDate: moment('2018-06-27'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-27'),
        endDate: moment('2018-06-28'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-27'),
        endDate: moment('2018-06-28'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-28'),
        endDate: moment('2018-06-29'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-28'),
        endDate: moment('2018-06-29'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-29'),
        endDate: moment('2018-06-30'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-29'),
        endDate: moment('2018-06-30'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }, {
        startDate: moment('2018-06-30'),
        endDate: moment('2018-07-01'),
        groupingInfo: [{ fieldName: 'test', id: 1 }],
      }, {
        startDate: moment('2018-06-30'),
        endDate: moment('2018-07-01'),
        groupingInfo: [{ fieldName: 'test', id: 2 }],
      }],
    ];
    it('should return cell index', () => {
      const date = '2018-06-26 07:30';
      const takePrev = false;
      expect(getMonthCellIndexByAppointmentData(
        viewCellsDataBase,
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupedByDate: false,
          groupCount: 1,
        },
        date, {}, takePrev))
        .toEqual(2);
    });

    it('should return cell index with takePrev property', () => {
      const date = '2018-07-03';
      expect(getMonthCellIndexByAppointmentData(
        viewCellsDataBase,
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupedByDate: false,
          groupCount: 1,
        },
        date, {}, false,
      ))
        .toEqual(9);
      expect(getMonthCellIndexByAppointmentData(
        viewCellsDataBase,
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupedByDate: false,
          groupCount: 1,
        },
        date, {}, true,
      ))
        .toEqual(8);
    });

    it('should return cell index depending on grouping info', () => {
      expect(getMonthCellIndexByAppointmentData(
        horizontallyGroupedViewCells,
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupedByDate: false,
          groupCount: 2,
        },
        '2018-06-27', firstTestAppointment, false,
      ))
        .toEqual(3);
      expect(getMonthCellIndexByAppointmentData(
        horizontallyGroupedViewCells,
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupedByDate: false,
          groupCount: 2,
        },
        '2018-06-28', secondTestAppointment, false,
      ))
        .toEqual(11);
    });

    it('should return cell index depending on grouping info with dates grouping', () => {
      expect(getMonthCellIndexByAppointmentData(
        groupedByDateViewCells,
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupedByDate: true,
          groupCount: 2,
        },
        '2018-06-27', firstTestAppointment, false,
      ))
        .toEqual(6);
      expect(getMonthCellIndexByAppointmentData(
        groupedByDateViewCells,
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupedByDate: true,
          groupCount: 2,
        },
        '2018-06-28', secondTestAppointment, false,
      ))
        .toEqual(9);
    });

    it('should work with vertical grouping', () => {
      expect(getMonthCellIndexByAppointmentData(
        verticallyGroupedViewCells,
        {
          groupOrientation: VERTICAL_GROUP_ORIENTATION,
          groupedByDate: false,
          groupCount: 2,
        },
        '2018-06-27', firstTestAppointment, false,
      ))
        .toEqual(3);
      expect(getMonthCellIndexByAppointmentData(
        verticallyGroupedViewCells,
        {
          groupOrientation: VERTICAL_GROUP_ORIENTATION,
          groupedByDate: false,
          groupCount: 2,
        },
        '2018-06-28', secondTestAppointment, false,
      ))
        .toEqual(11);
    });

    describe('#getMonthHorizontallyGroupedColumnIndex', () => {
      it('should return column index', () => {
        expect(getMonthHorizontallyGroupedColumnIndex(
          horizontallyGroupedViewCells, firstTestAppointment, 0, 3, 2, false,
        ))
          .toEqual(3);
        expect(getMonthHorizontallyGroupedColumnIndex(
          horizontallyGroupedViewCells, secondTestAppointment, 0, 3, 2, false,
        ))
          .toEqual(10);
      });

      it('should work when appointments are grouped by date', () => {
        expect(getMonthHorizontallyGroupedColumnIndex(
          horizontallyGroupedViewCells, firstTestAppointment, 0, 3, 2, true,
        ))
          .toEqual(6);
        expect(getMonthHorizontallyGroupedColumnIndex(
          horizontallyGroupedViewCells, secondTestAppointment, 0, 3, 2, true,
        ))
          .toEqual(7);
      });
    });

    describe('#getMonthVerticallyGroupedRowIndex', () => {
      it('should return row index', () => {
        expect(getMonthVerticallyGroupedRowIndex(
          verticallyGroupedViewCells, firstTestAppointment, 0, 3, 2,
        ))
          .toEqual(0);
        expect(getMonthVerticallyGroupedRowIndex(
          verticallyGroupedViewCells, secondTestAppointment, 0, 3, 2,
        ))
          .toEqual(1);
      });
    });
  });
});

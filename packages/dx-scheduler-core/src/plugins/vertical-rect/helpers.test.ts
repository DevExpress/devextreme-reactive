import {
  getVerticalCellIndexByAppointmentData,
  getVerticalRectByAppointmentData,
} from './helpers';
import moment = require('moment');
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '../../constants';
import {
  getWeekHorizontallyGroupedRowIndex, getWeekVerticallyGroupedRowIndex,
  getWeekHorizontallyGroupedColumnIndex, getWeekVerticallyGroupedColumnIndex,
} from '../week-view/helpers';

jest.mock('../week-view/helpers', () => ({
  ...jest.requireActual('../week-view/helpers'),
  getWeekHorizontallyGroupedRowIndex: jest.fn(),
  getWeekVerticallyGroupedRowIndex: jest.fn(),
  getWeekHorizontallyGroupedColumnIndex: jest.fn(),
  getWeekVerticallyGroupedColumnIndex: jest.fn(),
}));

describe('Vertical rect helpers', () => {
  describe('#getVerticalCellIndexByAppointmentData', () => {
    const viewCellsDataBase = [
      [
        { startDate: new Date('2018-06-24 08:00'), endDate: new Date('2018-06-24 08:30') },
        { startDate: new Date('2018-06-25 08:00'), endDate: new Date('2018-06-25 08:30') },
        { startDate: new Date('2018-06-26 08:00'), endDate: new Date('2018-06-26 08:30') },
      ],
      [
        { startDate: new Date('2018-06-24 08:30'), endDate: new Date('2018-06-24 09:00') },
        { startDate: new Date('2018-06-25 08:30'), endDate: new Date('2018-06-25 09:00') },
        { startDate: new Date('2018-06-26 08:30'), endDate: new Date('2018-06-26 09:00') },
      ],
      [
        { startDate: new Date('2018-06-24 09:00'), endDate: new Date('2018-06-24 09:30') },
        { startDate: new Date('2018-06-25 09:00'), endDate: new Date('2018-06-25 09:30') },
        { startDate: new Date('2018-06-26 09:00'), endDate: new Date('2018-06-26 09:30') },
      ],
    ];
    beforeEach(() => {
      getWeekHorizontallyGroupedRowIndex.mockImplementation(() => 1);
      getWeekVerticallyGroupedRowIndex.mockImplementation(() => 1);
      getWeekHorizontallyGroupedColumnIndex.mockImplementation(() => 1);
      getWeekVerticallyGroupedColumnIndex.mockImplementation(() => 1);
    });
    afterEach(jest.resetAllMocks);

    it('should calculate cell index and start date', () => {
      const date = new Date(2018, 5, 25, 8, 30);
      const { index, startDate } = getVerticalCellIndexByAppointmentData(
        'appointment', viewCellsDataBase,
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupCount: 'groupCount',
        },
        date, 'takePrev',
      );

      expect(index)
        .toBe(4);
      expect(startDate.toString())
        .toBe(new Date(2018, 5, 25, 8, 30).toString());
      expect(getWeekHorizontallyGroupedColumnIndex)
        .toHaveBeenCalledWith(viewCellsDataBase, 'appointment', date);
      expect(getWeekHorizontallyGroupedRowIndex)
        .toHaveBeenCalledWith(viewCellsDataBase, date, 1, 'takePrev');
      expect(getWeekVerticallyGroupedRowIndex)
        .not.toHaveBeenCalled();
      expect(getWeekVerticallyGroupedColumnIndex)
        .not.toHaveBeenCalled();
    });

    it('should work with vertical grouping', () => {
      const date = new Date(2018, 5, 25, 8, 30);
      getVerticalCellIndexByAppointmentData(
        'appointment', viewCellsDataBase,
        {
          groupOrientation: VERTICAL_GROUP_ORIENTATION,
          groupCount: 'groupCount',
        },
        date, 'takePrev',
      );

      expect(getWeekVerticallyGroupedColumnIndex)
        .toHaveBeenCalledWith(viewCellsDataBase, date);
      expect(getWeekVerticallyGroupedRowIndex)
        .toHaveBeenCalledWith(
          viewCellsDataBase, 'appointment', date, 1, 'takePrev', 'groupCount',
        );
      expect(getWeekHorizontallyGroupedColumnIndex)
        .not.toHaveBeenCalled();
      expect(getWeekHorizontallyGroupedRowIndex)
        .not.toHaveBeenCalled();
    });

    it('should consider seconds instead of milliseconds', () => {
      getWeekHorizontallyGroupedRowIndex.mockImplementationOnce(() => 0);
      getWeekHorizontallyGroupedColumnIndex.mockImplementationOnce(() => 0);
      const viewCellsData = [
        [{
          startDate: new Date('2018-06-26 08:00:04:100'), endDate: new Date('2018-06-26 08:30:04'),
        }],
      ];
      expect(getVerticalCellIndexByAppointmentData(
        {}, viewCellsData,
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupCount: 1,
        },
        new Date(2018, 5, 26, 8, 0, 4, 50)).index,
      )
        .toBe(0);
    });
  });

  describe('#getVerticalRectByAppointmentData', () => {
    const cellElementsMeta = {
      parentRect: () => ({ top: 10, left: 10, width: 250 }),
      getCellRects: [{}, {}, {}, {},
        () => ({
          top: 10, left: 20, width: 100, height: 100,
        }), {}, {}, () => ({
          top: 110, left: 20, width: 100, height: 100,
        }),
      ],
    };
    const viewCellsData = [
      [
        { startDate: new Date('2018-06-24 08:00'), endDate: new Date('2018-06-24 08:30') },
        { startDate: new Date('2018-06-25 08:00'), endDate: new Date('2018-06-25 08:30') },
        { startDate: new Date('2018-06-26 08:00'), endDate: new Date('2018-06-26 08:30') },
      ],
      [
        { startDate: new Date('2018-06-24 08:30'), endDate: new Date('2018-06-24 09:00') },
        { startDate: new Date('2018-06-25 08:30'), endDate: new Date('2018-06-25 09:00') },
        { startDate: new Date('2018-06-26 08:30'), endDate: new Date('2018-06-26 09:00') },
      ],
      [
        { startDate: new Date('2018-06-24 09:00'), endDate: new Date('2018-06-24 09:30') },
        { startDate: new Date('2018-06-25 09:00'), endDate: new Date('2018-06-25 09:30') },
        { startDate: new Date('2018-06-26 09:00'), endDate: new Date('2018-06-26 09:30') },
      ],
      [
        { startDate: new Date('2018-06-24 10:00'), endDate: new Date('2018-06-24 10:30') },
        { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 10:30') },
        { startDate: new Date('2018-06-26 10:00'), endDate: new Date('2018-06-26 10:30') },
      ],
    ];
    const cellDuration = 30;

    beforeEach(() => {
      getWeekHorizontallyGroupedRowIndex.mockImplementation(() => 1);
      getWeekVerticallyGroupedRowIndex.mockImplementation(() => 1);
      getWeekHorizontallyGroupedColumnIndex.mockImplementation(() => 1);
      getWeekVerticallyGroupedColumnIndex.mockImplementation(() => 1);
    });
    afterEach(jest.resetAllMocks);

    it('should calculate geometry by dates', () => {
      const start = moment(new Date(2018, 5, 25, 8, 45));
      const end = moment(new Date(2018, 5, 25, 9, 15));
      const {
        top, left, height, width, parentWidth,
      } = getVerticalRectByAppointmentData(
        {
          start,
          end,
        },
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupCount: 3,
        },
        {
          cellDuration,
          viewCellsData,
          cellElementsMeta,
          placeAppointmentsNextToEachOther: true,
        },
      );

      expect(top).toBe(51);
      expect(left).toBe(11);
      expect(height).toBe(96);
      expect(width).toBe(89);
      expect(parentWidth).toBe(250);
    });

    it('should calculate geometry by dates', () => {
      const start = moment(new Date(2018, 5, 25, 8, 45));
      const end = moment(new Date(2018, 5, 25, 9, 15));
      const {
        top, left, height, width, parentWidth,
      } = getVerticalRectByAppointmentData(
        {
          start,
          end,
        },
        {
          groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
          groupCount: 3,
        },
        {
          cellDuration,
          viewCellsData,
          cellElementsMeta,
        },
      );

      expect(top).toBe(51);
      expect(left).toBe(11);
      expect(height).toBe(100);
      expect(width).toBe(89);
      expect(parentWidth).toBe(250);
    });
  });
});

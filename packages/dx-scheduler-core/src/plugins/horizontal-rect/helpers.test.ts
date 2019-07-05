import moment from 'moment';
import { getHorizontalRectByDates } from './helpers';
import { getAllDayCellIndexByDate } from '../all-day-panel/helpers';
import { getMonthCellIndexByDate } from '../month-view/helpers';

jest.mock('../all-day-panel/helpers', () => ({
  getAllDayCellIndexByDate: jest.fn(),
}));
jest.mock('../month-view/helpers', () => ({
  getMonthCellIndexByDate: jest.fn(),
}));

describe('Horizontal rect helpers', () => {
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
  describe('#getHorizontalRectByDates', () => {
    const cellElementsMeta = {
      parentRect: () => ({ top: 10, left: 10, width: 250 }),
      getCellRects: [{}, {}, {}, {}, {}, {}, {},
        () => ({
          top: 110, left: 20, width: 100, height: 100,
        }), {}, () => ({
          top: 110, left: 320, width: 100, height: 100,
        }),
      ],
    };
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should calculate geometry by dates for single day appointment', () => {
      getMonthCellIndexByDate
        .mockImplementationOnce(() => 7)
        .mockImplementationOnce(() => 7);
      const startDate = new Date('2018-07-05 10:20');
      const endDate = new Date('2018-07-06 00:00');
      const {
        top, left, height, width, parentWidth,
      } = getHorizontalRectByDates(
        startDate,
        endDate,
        {
          viewCellsData,
          multiline: true,
          cellElementsMeta,
        },
      );

      expect(top).toBe(132);
      expect(left).toBe(11);
      expect(height).toBe(68);
      expect(width).toBe(99);
      expect(parentWidth).toBe(250);
    });
    it('should calculate geometry by dates for many days appointment', () => {
      getMonthCellIndexByDate
        .mockImplementationOnce(() => 7)
        .mockImplementationOnce(() => 9);
      const startDate = new Date('2018-07-05 00:00');
      const endDate = new Date('2018-07-08 00:00');
      const {
        top, left, height, width, parentWidth,
      } = getHorizontalRectByDates(
        startDate,
        endDate,
        {
          viewCellsData,
          multiline: true,
          cellElementsMeta,
        },
      );

      expect(top).toBe(132);
      expect(left).toBe(11);
      expect(height).toBe(68);
      expect(width).toBe(399);
      expect(parentWidth).toBe(250);
    });
    it('should correct call with multiline property', () => {
      getMonthCellIndexByDate.mockImplementation(() => 7);
      getAllDayCellIndexByDate.mockImplementation(() => 7);

      const startDate = new Date('2018-07-05 00:00');
      const endDate = new Date('2018-07-08 00:00');
      getHorizontalRectByDates(
        startDate,
        endDate,
        {
          viewCellsData,
          multiline: false,
          cellElementsMeta,
        },
      );

      expect(getMonthCellIndexByDate)
        .not.toBeCalled();
      expect(getAllDayCellIndexByDate)
        .toBeCalledTimes(2);
      expect(getAllDayCellIndexByDate)
        .toHaveBeenCalledWith(viewCellsData, startDate, false);
    });
  });
});

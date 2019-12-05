import {
  getVerticalCellIndex,
  getVerticalRectByAppointmentData,
} from './helpers';
import moment = require('moment');

describe('Vertical rect helpers', () => {
  describe('#getVerticalCellIndex', () => {
    it('should calculate cell index and start date', () => {
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
      ];
      const { index, startDate } = getVerticalCellIndex(
        {}, viewCellsData, new Date(2018, 5, 25, 8, 30),
      );
      expect(index)
        .toBe(4);
      expect(startDate.toString())
        .toBe(new Date(2018, 5, 25, 8, 30).toString());
    });

    it('should consider seconds instead of milliseconds', () => {
      const viewCellsData = [
        [{
          startDate: new Date('2018-06-26 08:00:04:100'), endDate: new Date('2018-06-26 08:30:04'),
        }],
      ];
      expect(getVerticalCellIndex({}, viewCellsData, new Date(2018, 5, 26, 8, 0, 4, 50)).index)
        .toBe(0);
    });

    it('should calculate cell index by takePref property', () => {
      const viewCellsData = [
        [
          { startDate: new Date('2018-06-26 08:00'), endDate: new Date('2018-06-26 08:30') },
        ],
        [
          { startDate: new Date('2018-06-26 08:30'), endDate: new Date('2018-06-26 09:00') },
        ],
      ];
      const takePrev = true;
      expect(getVerticalCellIndex({}, viewCellsData, new Date(2018, 5, 26, 8, 30), takePrev).index)
        .toBe(0);
      expect(getVerticalCellIndex({}, viewCellsData, new Date(2018, 5, 26, 8, 30)).index)
        .toBe(1);
    });

    it('should return cell index depending on grouping info', () => {
      const viewCellsData = [
        [{
          startDate: new Date('2018-06-26 08:00'),
          endDate: new Date('2018-06-26 08:30'),
          groupingInfo: [{ fieldName: 'test', id: 1 }],
        }, {
          startDate: new Date('2018-06-26 08:00'),
          endDate: new Date('2018-06-26 08:30'),
          groupingInfo: [{ fieldName: 'test', id: 2 }],
        }], [{
          startDate: new Date('2018-06-26 08:30'),
          endDate: new Date('2018-06-26 09:00'),
          groupingInfo: [{ fieldName: 'test', id: 1 }],
        }, {
          startDate: new Date('2018-06-26 08:30'),
          endDate: new Date('2018-06-26 09:00'),
          groupingInfo: [{ fieldName: 'test', id: 2 }],
        }],
      ];
      const firstTestAppointment = { test: 1 };
      const secondTestAppointment = { test: 2 };

      expect(getVerticalCellIndex(
        firstTestAppointment, viewCellsData, new Date('2018-06-26 08:20'), false,
      ).index)
        .toBe(0);
      expect(getVerticalCellIndex(
        secondTestAppointment, viewCellsData, new Date('2018-06-26 08:40'),
      ).index)
        .toBe(3);
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

    it('should calculate geometry by dates', () => {
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
          cellDuration,
          viewCellsData,
          cellElementsMeta,
        },
      );

      expect(top).toBe(51);
      expect(left).toBe(11);
      expect(height).toBe(96);
      expect(width).toBe(89);
      expect(parentWidth).toBe(250);
    });
  });
});

import {
  getCellByDate,
  getRectByDates,
} from './helpers';

describe('Week view helpers', () => {
  describe('Rect calculation helper', () => {
    describe('#getCellByDate', () => {
      it('should calculate cell index and start date', () => {
        const times = [
          { start: new Date(2017, 6, 20, 8, 0), end: new Date(2017, 6, 20, 8, 30) },
          { start: new Date(2017, 6, 20, 8, 30), end: new Date(2017, 6, 20, 9, 0) },
          { start: new Date(2017, 6, 20, 9, 0), end: new Date(2017, 6, 20, 9, 30) },
        ];
        const days = [new Date(2018, 5, 24), new Date(2018, 5, 25), new Date(2018, 5, 26)];
        const { index, startDate } = getCellByDate(days, times, new Date(2018, 5, 25, 8, 30));
        expect(index)
          .toBe(4);
        expect(startDate.toString())
          .toBe(new Date(2018, 5, 25, 8, 30).toString());
      });

      it('should calculate cell index by takePref property', () => {
        const times = [
          { start: new Date(2017, 6, 20, 8, 0), end: new Date(2017, 6, 20, 8, 30) },
          { start: new Date(2017, 6, 20, 8, 30), end: new Date(2017, 6, 20, 9, 0) },
        ];
        const takePrev = true;
        const days = [new Date(2018, 5, 26)];
        expect(getCellByDate(days, times, new Date(2018, 5, 26, 8, 30), takePrev).index)
          .toBe(0);
        expect(getCellByDate(days, times, new Date(2018, 5, 26, 8, 30)).index)
          .toBe(1);
      });
    });

    describe('#getRectByDates', () => {
      const offsetParent = {
        getBoundingClientRect: () => ({
          top: 10, left: 10, width: 250,
        }),
      };
      const cellElements = [{}, {}, {}, {}, {
        getBoundingClientRect: () => ({
          top: 10, left: 20, width: 100, height: 100,
        }),
        offsetParent,
      }, {}, {}, {
        getBoundingClientRect: () => ({
          top: 110, left: 20, width: 100, height: 100,
        }),
        offsetParent,
      }];

      it('should calculate geometry by dates', () => {
        const timeScale = [
          { start: new Date(2017, 6, 20, 8, 0), end: new Date(2017, 6, 20, 8, 30) },
          { start: new Date(2017, 6, 20, 8, 30), end: new Date(2017, 6, 20, 9, 0) },
          { start: new Date(2017, 6, 20, 9, 0), end: new Date(2017, 6, 20, 9, 30) },
          { start: new Date(2017, 6, 20, 9, 30), end: new Date(2017, 6, 20, 10, 0) },
        ];
        const dayScale = [new Date(2018, 5, 24), new Date(2018, 5, 25), new Date(2018, 5, 26)];
        const cellDuration = 30;
        const startDate = new Date(2018, 5, 25, 8, 45);
        const endDate = new Date(2018, 5, 25, 9, 15);
        const {
          top, left, height, width, parentWidth,
        } = getRectByDates(
          startDate,
          endDate,
          {
            dayScale,
            timeScale,
            cellDuration,
            cellElements,
          },
        );

        expect(top).toBe(50);
        expect(left).toBe(10);
        expect(height).toBe(100);
        expect(width).toBe(85);
        expect(parentWidth).toBe(250);
      });
    });
  });
});

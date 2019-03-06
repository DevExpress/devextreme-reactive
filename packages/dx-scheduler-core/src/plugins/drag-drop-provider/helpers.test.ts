import { intervalDuration, cellIndex, cellData, cellType } from './helpers';

describe('DragDropProvider', () => {
  describe('#cellType', () => {
    it('should work with day cell interval', () => {
      const data = {
        startDate: new Date('2019-3-6'),
        endDate: new Date('2019-3-7'),
      };
      expect(cellType(data))
        .toEqual('horizontal');
    });

    it('should work with long cell interval', () => {
      const data = {
        startDate: new Date('2019-3-5'),
        endDate: new Date('2019-3-7'),
      };
      expect(cellType(data))
        .toEqual('horizontal');
    });

    it('should work with short cell interval', () => {
      const data = {
        startDate: new Date('2019-3-5'),
        endDate: new Date('2019-3-5 23:59:59'),
      };
      expect(cellType(data))
        .toEqual('vertical');
    });
  });

  describe('#intervalDuration', () => {
    const data = {
      startDate: new Date('2019-3-1 10:00'),
      endDate: new Date('2019-3-1 11:00'),
    };

    it('should work with minutes', () => {
      expect(intervalDuration(data, 'minutes'))
        .toEqual(60);
    });

    it('should work with seconds', () => {
      expect(intervalDuration(data, 'seconds'))
        .toEqual(60 * 60);
    });
  });

  describe('#cellIndex', () => {
    const cells = [
      { getBoundingClientRect: () => ({ top: 0, left: 0, right: 50, bottom: 50 }) },
      { getBoundingClientRect: () => ({ top: 0, left: 50, right: 100, bottom: 50 }) },
    ];

    it('should work', () => {
      expect(cellIndex(cells as Element[], { x: 10, y: 10 }))
        .toEqual(0);
    });

    it('should take only one cell by condition', () => {
      expect(cellIndex(cells as Element[], { x: 50, y: 10 }))
        .toEqual(0);
    });
  });

  describe('#cellData', () => {
    const cellsData = [
      [{ startDate: new Date('2019-3-1 10:00') }, { startDate: new Date('2019-3-2 10:00') }],
      [{ startDate: new Date('2019-3-1 11:00') }, { startDate: new Date('2019-3-2 11:00') }],
    ];

    it('should work with both indexes', () => {
      expect(cellData(1, 1, cellsData).startDate)
        .toEqual(new Date('2019-3-2 00:00'));
    });

    it('should work with only time table index', () => {
      expect(cellData(2, -1, cellsData).startDate)
        .toEqual(new Date('2019-3-1 11:00'));
    });
  });
});

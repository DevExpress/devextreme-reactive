import {
  getVisibleRows,
  firstVisibleRowOffset,
} from './virtual-table-utils';

describe('VirtualTableLaout utils', () => {
  describe('#getVisibleRows', () => {
    it('should return visible rows from top', () => {
      const rows = [
        { key: 0, height: 40 },
        { key: 1, height: 40 },
        { key: 2, height: 40 },
        { key: 3, height: 40 },
        { key: 4, height: 40 },
        { key: 5, height: 40 },
        { key: 6, height: 40 },
      ];

      expect(getVisibleRows(rows, 0, 50, row => row.height))
        .toEqual([
          { type: 'visible', height: 40, row: rows[0] },
          { type: 'visible', height: 40, row: rows[1] },
          { type: 'overscan', height: 40, row: rows[2] },
          { type: 'overscan', height: 40, row: rows[3] },
          { type: 'overscan', height: 40, row: rows[4] },
          { type: 'stub', height: 80, key: 'ending' },
        ]);
    });

    it('should return visible rows from bottom', () => {
      const rows = [
        { key: 0, height: 40 },
        { key: 1, height: 40 },
        { key: 2, height: 40 },
        { key: 3, height: 40 },
        { key: 4, height: 40 },
        { key: 5, height: 40 },
        { key: 6, height: 40 },
      ];

      expect(getVisibleRows(rows, 230, 50, row => row.height))
        .toEqual([
          { type: 'stub', height: 80, key: 'starting' },
          { type: 'overscan', height: 40, row: rows[2] },
          { type: 'overscan', height: 40, row: rows[3] },
          { type: 'overscan', height: 40, row: rows[4] },
          { type: 'visible', height: 40, row: rows[5] },
          { type: 'visible', height: 40, row: rows[6] },
        ]);
    });

    it('should return visible rows in center', () => {
      const rows = [
        { key: 0, height: 40 },
        { key: 1, height: 40 },
        { key: 2, height: 40 },
        { key: 3, height: 40 },
        { key: 4, height: 40 },
        { key: 5, height: 40 },
        { key: 6, height: 40 },
        { key: 7, height: 40 },
        { key: 8, height: 40 },
      ];

      expect(getVisibleRows(rows, 170, 20, row => row.height))
        .toEqual([
          { type: 'stub', height: 40, key: 'starting' },
          { type: 'overscan', height: 40, row: rows[1] },
          { type: 'overscan', height: 40, row: rows[2] },
          { type: 'overscan', height: 40, row: rows[3] },
          { type: 'visible', height: 40, row: rows[4] },
          { type: 'overscan', height: 40, row: rows[5] },
          { type: 'overscan', height: 40, row: rows[6] },
          { type: 'overscan', height: 40, row: rows[7] },
          { type: 'stub', height: 40, key: 'ending' },
        ]);
    });

    it('should return visible rows in center with one big row', () => {
      const rows = [
        { key: 0, height: 40 },
        { key: 1, height: 400 },
        { key: 2, height: 40 },
      ];

      expect(getVisibleRows(rows, 170, 20, row => row.height))
        .toEqual([
          { type: 'overscan', height: 40, row: rows[0] },
          { type: 'visible', height: 400, row: rows[1] },
          { type: 'overscan', height: 40, row: rows[2] },
        ]);

      expect(getVisibleRows(rows, 30, 20, row => row.height))
        .toEqual([
          { type: 'visible', height: 40, row: rows[0] },
          { type: 'visible', height: 400, row: rows[1] },
          { type: 'overscan', height: 40, row: rows[2] },
        ]);

      expect(getVisibleRows(rows, 430, 20, row => row.height))
        .toEqual([
          { type: 'overscan', height: 40, row: rows[0] },
          { type: 'visible', height: 400, row: rows[1] },
          { type: 'visible', height: 40, row: rows[2] },
        ]);
    });
  });

  describe('#firstVisibleRowOffset', () => {
    it('should return correct offset', () => {
      expect(firstVisibleRowOffset(
        [
          { type: 'stub', height: 160 },
          { type: 'overscan', height: 40, row: 3 },
          { type: 'overscan', height: 40, row: 4 },
          { type: 'overscan', height: 40, row: 5 },
          { type: 'visible', height: 40, row: 6 },
        ],
        [
          { type: 'stub', height: 120, key: 'starting' },
          { type: 'overscan', height: 50, row: 4 },
          { type: 'overscan', height: 40, row: 3 },
          { type: 'overscan', height: 40, row: 4 },
          { type: 'visible', height: 40, row: 5 },
          { type: 'overscan', height: 40, row: 6 },
        ],
      ))
        .toEqual(10);
    });

    it('should return 0 if row was not visible', () => {
      expect(firstVisibleRowOffset(
        [
          { type: 'stub', height: 160 },
          { type: 'overscan', height: 40, row: 2 },
          { type: 'overscan', height: 40, row: 3 },
          { type: 'overscan', height: 40, row: 4 },
          { type: 'visible', height: 40, row: 5 },
        ],
        [
          { type: 'stub', height: 120, key: 'starting' },
          { type: 'overscan', height: 50, row: 6 },
          { type: 'overscan', height: 40, row: 7 },
          { type: 'overscan', height: 40, row: 8 },
          { type: 'visible', height: 40, row: 9 },
          { type: 'overscan', height: 40, row: 10 },
        ],
      ))
        .toEqual(0);
    });
  });
});

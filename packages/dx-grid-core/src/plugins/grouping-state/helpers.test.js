import {
    getUngroupedColumnIndex,
} from './helpers';

describe('GroupingPlugin helpers', () => {
  describe('#ungroupedColumnIndex', () => {
    it('should find ungrouped column index', () => {
      const index = getUngroupedColumnIndex(
        [{ columnName: 'a' }, { columnName: 'b' }, { columnName: 'c' }],
        [{ columnName: 'a' }, { columnName: 'c' }],
      );

      expect(index).toBe(1);
    });

    it('should return -1 if columns were not ungrouped', () => {
      const index = getUngroupedColumnIndex(
        [{ columnName: 'a' }, { columnName: 'b' }],
        [{ columnName: 'a' }, { columnName: 'b' }],
      );

      expect(index).toBe(-1);
    });

    it('should work if all columns were ungrouped', () => {
      const index = getUngroupedColumnIndex(
        [{ columnName: 'a' }],
        [],
      );

      expect(index).toBe(0);
    });
  });
});

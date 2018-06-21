import { FIXED_COLUMN_BEFORE_SIDE, FIXED_COLUMN_AFTER_SIDE } from './constants';
import { isFixedCell, getFixedSide } from './helpers';

describe('TableFixedColumns Plugin helpers', () => {
  describe('#isFixedCell', () => {
    it('should discover fixed cells correctly', () => {
      const beforeColumnNames = ['column1', 'column2'];
      const afterColumnNames = ['column5'];

      expect(isFixedCell('column1', beforeColumnNames, afterColumnNames))
        .toBeTruthy();
      expect(isFixedCell('column5', beforeColumnNames, afterColumnNames))
        .toBeTruthy();
      expect(isFixedCell('column4', beforeColumnNames, afterColumnNames))
        .toBeFalsy();
    });
  });

  describe('#getFixedPosition', () => {
    it('should determine the "before" side correctly', () => {
      expect(getFixedSide('column1', ['column2', 'column1'], []))
        .toBe(FIXED_COLUMN_BEFORE_SIDE);
    });

    it('should determine the "after" side correctly', () => {
      expect(getFixedSide('column1', [], ['column2', 'column1']))
        .toBe(FIXED_COLUMN_AFTER_SIDE);
    });

    it('should return "null" if column does not belong to any of sides', () => {
      expect(getFixedSide('column1', [], []))
        .toBe(null);
    });
  });
});

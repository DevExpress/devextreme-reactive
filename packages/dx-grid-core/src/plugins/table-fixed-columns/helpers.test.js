import { FIXED_COLUMN_BEFORE_SIDE, FIXED_COLUMN_AFTER_SIDE } from './constants';
import { isFixedCell, getFixedPosition } from './helpers';

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
      expect(getFixedPosition('column1', ['column1'], []))
        .toEqual({
          side: FIXED_COLUMN_BEFORE_SIDE,
          index: 0,
        });
      expect(getFixedPosition('column1', ['column2', 'column1'], []))
        .toEqual({
          side: FIXED_COLUMN_BEFORE_SIDE,
          index: 1,
        });
    });

    it('should determine the "after" side correctly', () => {
      expect(getFixedPosition('column1', [], ['column1']))
        .toEqual({
          index: 0,
          side: FIXED_COLUMN_AFTER_SIDE,
        });
      expect(getFixedPosition('column1', [], ['column2', 'column1']))
        .toEqual({
          side: FIXED_COLUMN_AFTER_SIDE,
          index: 1,
        });
    });
  });
});

import { FIXED_COLUMN_BEFORE_SIDE, FIXED_COLUMN_AFTER_SIDE } from './constants';
import { getFixedColumnKeys, isFixedCell, getFixedSide } from './helpers';

describe('TableFixedColumns Plugin helpers', () => {
  describe('#getFixedColumnKeys', () => {
    it('should return the correct array of column keys', () => {
      const tableColumns = [
        { key: 'key_a', column: { name: 'a' } },
        { key: 'key_b', column: { name: 'b' } },
        { key: 'key_type1', type: 'type1' },
        { key: 'key_c', column: { name: 'c' } },
        { key: 'key_d', column: { name: 'd' } },
      ];
      const fixedNames = ['a', 'd'];
      const fixedTypes = ['type1'];

      expect(getFixedColumnKeys(tableColumns, fixedNames, fixedTypes))
        .toEqual(['key_a', 'key_type1', 'key_d']);
    });
  });

  describe('#isFixedCell', () => {
    it('should discover fixed cells correctly', () => {
      const fixedColumnNames = ['column1', 'column2', 'column5'];
      const fixedColumnTypes = ['type1'];

      expect(isFixedCell({ column: { name: 'column1' } }, fixedColumnNames, fixedColumnTypes))
        .toBeTruthy();
      expect(isFixedCell({ column: { name: 'column5' } }, fixedColumnNames, fixedColumnTypes))
        .toBeTruthy();
      expect(isFixedCell({ type: 'type1' }, fixedColumnNames, fixedColumnTypes))
        .toBeTruthy();
      expect(isFixedCell({ column: { name: 'column4' } }, fixedColumnNames, fixedColumnTypes))
        .toBeFalsy();
    });
  });

  describe('#getFixedPosition', () => {
    it('should determine the "before" side correctly', () => {
      expect(getFixedSide({ column: { name: 'column1' } }, ['column2', 'column1'], [], [], []))
        .toBe(FIXED_COLUMN_BEFORE_SIDE);
      expect(getFixedSide({ type: 'type1' }, ['column2', 'column1'], [], ['type1'], []))
        .toBe(FIXED_COLUMN_BEFORE_SIDE);
    });

    it('should determine the "after" side correctly', () => {
      expect(getFixedSide({ column: { name: 'column1' } }, [], ['column2', 'column1'], [], []))
        .toBe(FIXED_COLUMN_AFTER_SIDE);
      expect(getFixedSide({ type: 'type1' }, [], ['column2', 'column1'], [], ['type1']))
        .toBe(FIXED_COLUMN_AFTER_SIDE);
    });

    it('should return "null" if column does not belong to any of sides', () => {
      expect(getFixedSide({ column: { name: 'column1' } }, [], [], [], []))
        .toBe(null);
      expect(getFixedSide({ type: 'type1' }, [], [], [], []))
        .toBe(null);
    });
  });
});

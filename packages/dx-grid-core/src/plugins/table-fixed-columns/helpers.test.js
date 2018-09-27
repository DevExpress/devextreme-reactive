import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_FIXED_TYPE } from './constants';
import { getFixedColumnKeys, isFixedTableRow } from './helpers';

describe('TableFixedColumns Plugin helpers', () => {
  describe('#getFixedColumnKeys', () => {
    it('should return the correct array of column keys', () => {
      const sampleType = Symbol('sample');

      const tableColumns = [
        { key: 'key_a', type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { key: 'key_b', type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { key: 'key_type1', type: sampleType },
        { key: 'key_c', type: TABLE_DATA_TYPE, column: { name: 'c' } },
        { key: 'key_d', type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ];
      const fixedNames = ['a', 'd', sampleType];

      expect(getFixedColumnKeys(tableColumns, fixedNames))
        .toEqual(['key_a', 'key_type1', 'key_d']);
    });
  });

  describe('#isFixedTableRow', () => {
    it('should work', () => {
      expect(isFixedTableRow({ type: TABLE_FIXED_TYPE })).toBeTruthy();
      expect(isFixedTableRow({ type: 'undefined' })).toBeFalsy();
    });
  });
});

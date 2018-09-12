import { TABLE_DATA_TYPE } from '../table/constants';
import { FIXED_COLUMN_LEFT_SIDE, FIXED_COLUMN_RIGHT_SIDE, TABLE_FIXED_TYPE } from './constants';
import { tableColumnsWithFixed, tableHeaderRowsWithFixed } from './computeds';

describe('TableFixedColumns computeds', () => {
  describe('#tableColumnsWithFixed', () => {
    it('should mark fixed table column', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: 'type1' },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: 'type2' },
        { type: 'type3' },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ];
      expect(tableColumnsWithFixed(tableColumns, ['a'], ['type1'], ['d'], ['type3']))
        .toEqual([
          { type: TABLE_DATA_TYPE, column: { name: 'a' }, fixed: FIXED_COLUMN_LEFT_SIDE },
          { type: 'type1', fixed: FIXED_COLUMN_LEFT_SIDE },
          { type: TABLE_DATA_TYPE, column: { name: 'b' } },
          { type: TABLE_DATA_TYPE, column: { name: 'c' } },
          { type: 'type2' },
          { type: 'type3', fixed: FIXED_COLUMN_RIGHT_SIDE },
          { type: TABLE_DATA_TYPE, column: { name: 'd' }, fixed: FIXED_COLUMN_RIGHT_SIDE },
        ]);
    });
  });
  describe('#tableHeaderRowsWithFixed', () => {
    it('should work', () => {
      expect(tableHeaderRowsWithFixed([{}]))
        .toEqual([
          {},
          { type: TABLE_FIXED_TYPE, key: TABLE_FIXED_TYPE, height: 0 },
        ]);
    });
  });
});

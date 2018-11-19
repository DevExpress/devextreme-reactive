import { TABLE_DATA_TYPE } from '../table/constants';
import { FIXED_COLUMN_LEFT_SIDE, FIXED_COLUMN_RIGHT_SIDE, TABLE_FIXED_TYPE } from './constants';
import { tableColumnsWithFixed, tableHeaderRowsWithFixed, tableHeaderColumnChainsWithFixed } from './computeds';

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
      expect(tableColumnsWithFixed(tableColumns, ['a', 'type1'], ['d', 'type3']))
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
          { key: TABLE_FIXED_TYPE.toString(), type: TABLE_FIXED_TYPE, height: 0 },
        ]);
    });
  });

  describe('#tableHeaderColumnChainsWithFixed', () => {
    const columns = [
      { key: 'a' }, { key: 'b' }, { key: 'c' },
      { key: 'd' }, { key: 'e' },
    ];
    it('should split single fixed columns at boundaries', () => {
      const tableColumns = [
        { fixed: 'left' },
        ...columns,
        { fixed: 'right' },
      ];
      const existingChains = [
        [{ start: 0, columns: tableColumns }],
      ];

      const chains = tableHeaderColumnChainsWithFixed(existingChains, tableColumns);

      expect(chains).toHaveLength(1);
      expect(chains[0]).toMatchObject([
        { start: 0, columns: [{ fixed: 'left' }] },
        { start: 1, columns },
        { start: 5, columns: [{ fixed: 'left' }] },
      ]);
    });
  });
});

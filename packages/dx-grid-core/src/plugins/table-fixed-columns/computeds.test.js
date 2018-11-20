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
    const assertRowChainsSplit = (rowChains, expectedSplit) => {
      expect(rowChains.length).toBe(expectedSplit.length);
      let start = 0;
      rowChains.forEach((chain, i) => {
        expect(chain.columns).toMatchObject(
          expectedSplit[i].map(col => ({
            key: col,
          })),
        );
        expect(chain.start).toBe(start);
        start += expectedSplit[i].length;
      });
    };
    const assertChainsSplit = (tableColumns, expectedSplit) => {
      const existingChains = [
        [{ start: 0, columns: tableColumns }],
      ];
      const chains = tableHeaderColumnChainsWithFixed(existingChains, tableColumns);

      assertRowChainsSplit(chains[0], expectedSplit);
    };

    it('should split single fixed columns at boundaries', () => {
      const tableColumns = [
        { key: 'fixed_left', fixed: 'left' },
        ...columns.slice(0, 3),
        { key: 'fixed_right', fixed: 'right' },
      ];

      assertChainsSplit(tableColumns, [
        ['fixed_left'],
        ['a', 'b', 'c'],
        ['fixed_right'],
      ]);
    });

    it('should group multiple fixed columns at boundaries', () => {
      const tableColumns = [
        { key: 'fixed_left_0', fixed: 'left' },
        { key: 'fixed_left_1', fixed: 'left' },
        ...columns.slice(0, 3),
        { key: 'fixed_right_0', fixed: 'right' },
        { key: 'fixed_right_1', fixed: 'right' },
      ];

      assertChainsSplit(tableColumns, [
        ['fixed_left_0', 'fixed_left_1'],
        ['a', 'b', 'c'],
        ['fixed_right_0', 'fixed_right_1'],
      ]);
    });

    it('should split single column in the middle', () => {
      const tableColumns = [
        ...columns.slice(0, 3),
        { key: 'fixed_key', fixed: 'left' },
        ...columns.slice(3, 5),
      ];

      assertChainsSplit(tableColumns, [
        ['a', 'b', 'c'],
        ['fixed_key'],
        ['d', 'e'],
      ]);
    });

    it('should group multiple columns in the middle', () => {
      const tableColumns = [
        ...columns.slice(0, 2),
        { key: 'fixed_key_0', fixed: 'left' },
        { key: 'fixed_key_1', fixed: 'left' },
        ...columns.slice(3, 5),
      ];

      assertChainsSplit(tableColumns, [
        ['a', 'b'],
        ['fixed_key_0', 'fixed_key_1'],
        ['d', 'e'],
      ]);
    });

    it('should split columns with different fixed side', () => {
      const tableColumns = [
        ...columns.slice(0, 2),
        { key: 'fixed_left_0', fixed: 'left' },
        { key: 'fixed_left_1', fixed: 'left' },
        { key: 'fixed_right_0', fixed: 'right' },
        ...columns.slice(3, 5),
      ];

      assertChainsSplit(tableColumns, [
        ['a', 'b'],
        ['fixed_left_0', 'fixed_left_1'],
        ['fixed_right_0'],
        ['d', 'e'],
      ]);
    });

    it('should split multiple rows', () => {
      const tableColumns = [
        { key: 'fixed_key_0', fixed: 'left' },
        ...columns.slice(0, 3),
        { key: 'fixed_key_1', fixed: 'left' },
        { key: 'fixed_key_2', fixed: 'left' },
        ...columns.slice(3, 5),
      ];
      const existingChains =
    });
  });
});

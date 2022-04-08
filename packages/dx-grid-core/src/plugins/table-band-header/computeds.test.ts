import { TABLE_BAND_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_GROUP_TYPE } from '../table-group-row/constants';
import {
  tableRowsWithBands, tableHeaderColumnChainsWithBands, columnBandLevels, bandLevelsVisibility,
} from './computeds';
import { expandChainsCore } from '../table-fixed-columns/computeds.test';
import { generateChains } from './test-utils';

describe('TableBandHeader Plugin computeds', () => {
  describe('#tableRowsWithBands', () => {
    const tableHeaderRows = [{}];
    it('should add zero band row if one nested level', () => {
      const columnBands = [{ title: 'title-a' }];
      const tableColumns = [{ type: TABLE_DATA_TYPE, column: { columnName: 'b' } }];
      const rows = tableRowsWithBands(tableHeaderRows, columnBands, tableColumns);

      expect(rows)
        .toEqual([{}]);
    });

    it('should add one band row if two nested levels', () => {
      const columnBands = [
        { title: 'title-a', children: [{ columnName: 'a' }, { columnName: 'b' }] },
      ];
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
      ];
      const rows = tableRowsWithBands(tableHeaderRows, columnBands, tableColumns);

      expect(rows)
        .toEqual([{ key: `${TABLE_BAND_TYPE.toString()}_0`, type: TABLE_BAND_TYPE, level: 0 }, {}]);
    });

    it('should add one band row if one nested level is hidden', () => {
      const columnBands = [
        {
          title: 'title-a',
          children: [
            { columnName: 'a' },
            { columnName: 'b' },
            {
              title: 'title-b',
              children: [{ columnName: 'd' }, { columnName: 'e' }],
            },
          ],
        },
        { columnName: 'c' },
      ];
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      ];
      const rows = tableRowsWithBands(tableHeaderRows, columnBands, tableColumns);

      expect(rows)
        .toEqual([{ key: `${TABLE_BAND_TYPE.toString()}_0`, type: TABLE_BAND_TYPE, level: 0 }, {}]);
    });
  });

  describe('#tableHeaderColumnChainsWithBands', () => {
    const simpleColumns = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    ].map(name => ({ column: { name }, key: name, type: TABLE_DATA_TYPE }));

    const groupedColumns = [
      'a', 'b', 'c', 'd', 'e',
    ].map((name, index) => {
      if (index < 2) {
        return { column: { name }, key: name, type: TABLE_GROUP_TYPE };
      }
      return { column: { name }, key: name, type: TABLE_DATA_TYPE };
    });

    const expandChains = rowChains => rowChains && expandChainsCore(
      rowChains,
      col => ({
        column: {
          name: col,
        },
      }),
    );
    const compressChains = chains => (
      chains.map(rowChains => (
        rowChains.map(chain => (
          chain.columns.map(col => col.column.name)
        ))
      ))
    );
    const assertChainsSplit = (
      rows,
      columnBands,
      expectedCompressedChains,
      columns,
    ) => {
      const expectedChains = expandChains(expectedCompressedChains);

      const result = tableHeaderColumnChainsWithBands(
        rows, columns, columnBands,
      );
      const collapsedChains = compressChains(result);

      expect(collapsedChains).toMatchObject(expectedCompressedChains);
      expect(result).toMatchObject(expectedChains);
    };

    it('should split columns to band chains', () => {
      const bands = [
        {
          title: 'band A-0',
          children: [
            { columnName: 'a' },
            { columnName: 'b' },
            { columnName: 'c' },
            {
              title: 'Band B-0',
              children: [
                { columnName: 'c' },
                { columnName: 'd' },
              ],
            },
            {
              title: 'Band B-1',
              children: [
                { columnName: 'e' },
                { columnName: 'f' },
                {
                  title: 'Band C-0',
                  children: [
                    { columnName: 'f' },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: 'band A-1',
          children: [{ columnName: 'h' }],
        },
      ];
      const rows = [
        { key: 'band_0', type: TABLE_BAND_TYPE, level: 0 },
        { key: 'band_1', type: TABLE_BAND_TYPE, level: 1 },
        { key: 'band_2', type: TABLE_BAND_TYPE, level: 2 },
        { key: 'heading', type: 'heading' },
      ];

      assertChainsSplit(
        rows,
        bands,
        [
          [['a', 'b', 'c', 'd', 'e', 'f'], ['g'], ['h'], ['i']],
          [['a', 'b'], ['c', 'd'], ['e', 'f'], ['g'], ['h'], ['i']],
          [['a', 'b'], ['c', 'd'], ['e'], ['f'], ['g'], ['h'], ['i']],
          [['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']],
        ],
        simpleColumns,
      );
    });

    it('should split columns if adjust bands have the same title but different parents', () => {
      const adjacentBands = [
        {
          title: 'parent1',
          children: [
            {
              title: 'sharedName',
              children: [
                { columnName: 'a' },
                { columnName: 'b' },
              ],
            },
          ],
        },
        {
          title: 'parent2',
          children: [
            {
              title: 'sharedName',
              children: [
                { columnName: 'c' },
                { columnName: 'd' },
              ],
            },
          ],
        },
      ];
      const rows = [
        { key: 'band_0', type: TABLE_BAND_TYPE, level: 0 },
        { key: 'band_1', type: TABLE_BAND_TYPE, level: 1 },
        { key: 'heading', type: 'heading' },
      ];

      assertChainsSplit(
        rows,
        adjacentBands,
        [
          [['a', 'b'], ['c', 'd'], ['e', 'f', 'g', 'h', 'i']],
          [['a', 'b'], ['c', 'd'], ['e', 'f', 'g', 'h', 'i']],
          [['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']],
        ],
        simpleColumns,
      );
    });

    it('should split columns to band chains for grouped columns', () => {
      const bands = [
        {
          title: 'band C-0',
          children: [
            { columnName: 'c' }, { columnName: 'b' },
          ],
        },
        {
          title: 'band D-0',
          children: [{ columnName: 'd' }, { columnName: 'e' }],
        },
      ];
      const rows = [
        { key: 'band_0', type: TABLE_BAND_TYPE, level: 0 },
        { key: 'heading', type: 'heading' },
      ];

      assertChainsSplit(
        rows,
        bands,
        [
          [['a'], ['b'], ['c'], ['d', 'e']],
          [['a', 'b', 'c', 'd', 'e']],
        ],
        groupedColumns,
      );
    });
  });

  describe('#columnBandLevels', () => {
    it('should in simple case', () => {
      const bands = [{
        title: 'Band0',
        children: [{ columnName: 'a' }],
      }, {
        title: 'Band1',
        children: [{ columnName: 'b' }],
      }];

      expect(columnBandLevels(bands))
        .toEqual({
          Band0: 0,
          Band1: 0,
        });
    });

    it('should work with nested bands', () => {
      const bands = [{
        title: 'Band0',
        children: [{
          title: 'Band1',
          children: [{
            title: 'Band2',
            children: [{ columnName: 'a' }],
          }],
        }],
      }];

      expect(columnBandLevels(bands))
        .toEqual({
          Band0: 0,
          Band1: 1,
          Band2: 2,
        });
    });
  });

  describe('#bandLevelsVisibility', () => {
    it('should work when all columns are visible', () => {
      const columnVisibleIntervals = [[0, 4]];
      const headerColumnChains = generateChains(5, [
        { Band0: [1, 3] },
        { Band0: [1, 1], Band1: [2, 3] },
        {},
      ]);
      const bandLevels = {
        Band0: 0,
        Band1: 1,
      };

      expect(bandLevelsVisibility(columnVisibleIntervals, headerColumnChains, bandLevels))
        .toEqual([true, true]);
    });

    describe('hidden columns', () => {
      const headerColumnsChains = generateChains(10, [
        { Band0: [1, 3], Band01: [7, 9] },
        { Band0: [1, 3], Band01: [7, 8], Band1: [9, 9] },
        {},
      ]);
      const bandLevels = {
        Band0: 0,
        Band01: 0,
        Band1: 1,
      };

      it('should work with partially hidden bands', () => {
        const columnVisibleIntervals = [[2, 6]];

        expect(bandLevelsVisibility(columnVisibleIntervals, headerColumnsChains, bandLevels))
          .toEqual([
            true, // 0 - Band0
            false,
          ]);
      });

      it('should work with hidden bands', () => {
        const columnVisibleIntervals = [[4, 6]];

        expect(bandLevelsVisibility(columnVisibleIntervals, headerColumnsChains, bandLevels))
          .toEqual([
            false,
            false,
          ]);
      });

      it('should work with gapped column boundaries', () => {
        const columnVisibleIntervals = [[0, 0], [2, 2], [5, 6]];

        expect(bandLevelsVisibility(columnVisibleIntervals, headerColumnsChains, bandLevels))
          .toEqual([
            true,
            false,
          ]);
      });
    });
  });
});

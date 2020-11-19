// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';
import {
  TABLE_BAND_TYPE, BAND_GROUP_CELL, BAND_HEADER_CELL, BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER,
  BAND_FILL_LEVEL_CELL,
} from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { TABLE_STUB_TYPE } from '../../utils/virtual-table';
import {
  isNoDataColumn,
  isBandedTableRow,
  isBandedOrHeaderRow,
  getColumnMeta,
  getBandComponent,
  calculateBand,
} from './helpers';
import { tableHeaderColumnChainsWithBands } from './computeds';
import { tableHeaderColumnChainsWithFixed } from '../table-fixed-columns/computeds';
import { generateColumns } from './test-utils';

describe('TableBandHeader Plugin helpers', () => {
  const columnBands = [
    {
      title: 'Band A',
      children: [
        {
          title: 'Band B',
          children: [
            { columnName: 'a' },
            { columnName: 'b' },
          ],
        },
        { columnName: 'd' },
        {
          title: 'Band B',
          children: [
            { columnName: 'c' },
          ],
        },
      ],
    },
    {
      title: 'Band C',
      children: [
        { columnName: 'e' },
      ],
    },
  ];
  const tableColumns = [
    { key: 'a', column: { name: 'a' }, type: TABLE_DATA_TYPE },
    { key: 'b', column: { name: 'b' }, type: TABLE_DATA_TYPE },
    { key: 'd', column: { name: 'd' }, type: TABLE_DATA_TYPE },
    { key: 'c', column: { name: 'c' }, type: TABLE_DATA_TYPE },
    { key: 'e', column: { name: 'e' }, type: TABLE_DATA_TYPE },
  ];

  const computeColumnChains = (columns, rows, bands) => (
    tableHeaderColumnChainsWithBands(rows, columns, bands)
  );
  const computeColumnChainsWithFixed = (columns, rows, bands) => (
    tableHeaderColumnChainsWithFixed(
      computeColumnChains(columns, rows, bands),
      rows,
      columns,
    )
  );

  describe('#isNoDataColumn', () => {
    it('should work with not data column', () => {
      expect(isNoDataColumn('editCommand'))
        .toBeTruthy();
    });
    it('should work with data column', () => {
      expect(isNoDataColumn(TABLE_DATA_TYPE))
        .toBeFalsy();
    });
  });

  describe('#isBandedOrHeaderRow', () => {
    it('should work', () => {
      expect(isBandedOrHeaderRow({ type: TABLE_BAND_TYPE }))
        .toBeTruthy();
      expect(isBandedOrHeaderRow({ type: TABLE_HEADING_TYPE }))
        .toBeTruthy();
      expect(isBandedOrHeaderRow({ type: TABLE_DATA_TYPE }))
        .toBeFalsy();
    });
  });

  describe('#isBandedTableRow', () => {
    it('should work', () => {
      expect(isBandedTableRow({ type: TABLE_BAND_TYPE }))
        .toBeTruthy();
      expect(isBandedTableRow({}))
        .toBeFalsy();
    });
  });

  describe('#getColumnMeta', () => {
    it('should return correct column meta for the first level children', () => {
      expect(getColumnMeta('d', columnBands, 1))
        .toEqual({ title: 'Band A', level: 1, key: '_Band A' });
    });

    it('should return correct column meta for the deeper children levels', () => {
      expect(getColumnMeta('a', columnBands, 2))
        .toEqual({ title: 'Band B', level: 2, key: '_Band A_Band B' });
    });

    it('should work with immutable properties', () => {
      expect(() => getColumnMeta('d', Immutable(columnBands), 2)).not.toThrow();
    });
  });

  describe('#getBandComponent', () => {
    const tableHeaderRows = [
      { type: TABLE_BAND_TYPE, level: 0 },
      { type: TABLE_BAND_TYPE, level: 1 },
      { type: TABLE_HEADING_TYPE },
    ];
    const columnVisibleBoundaries = [[0, 4]];
    const levelsVisibility = [true, true];

    it('should return a duplicate render type if column has a rowSpan', () => {
      const params = {
        rowSpan: 3,
        tableColumn: {},
        tableRow: {},
      };

      expect(getBandComponent(params, {}, [], {}, [], columnVisibleBoundaries, levelsVisibility))
        .toEqual({ type: BAND_DUPLICATE_RENDER, payload: null });
    });

    it('should return an empty cell type if a column is not on its own line', () => {
      const params = {
        tableColumn: {
          type: TABLE_DATA_TYPE,
          key: 'd',
          column: { name: 'd' },
        },
        tableRow: {
          level: 2,
        },
      };
      const chains = computeColumnChains(tableColumns, tableHeaderRows, columnBands);

      expect(
        getBandComponent(
          params, tableHeaderRows, tableColumns, columnBands,
          chains, columnVisibleBoundaries, levelsVisibility,
      ))
        .toEqual({ type: BAND_EMPTY_CELL, payload: null });
    });

    it('should return a header cell type for a heading column', () => {
      const params = {
        tableColumn: {
          type: TABLE_DATA_TYPE,
          key: 'd',
          column: { name: 'd' },
        },
        tableRow: {
          level: 1,
        },
      };
      const chains = computeColumnChains(tableColumns, tableHeaderRows, columnBands);

      expect(
        getBandComponent(
          params, tableHeaderRows, tableColumns, columnBands,
          chains, columnVisibleBoundaries, levelsVisibility,
      ))
        .toEqual({
          type: BAND_HEADER_CELL,
          payload: {
            tableRow: { type: TABLE_HEADING_TYPE },
            rowSpan: 2,
          },
        });
    });

    it('should return a group cell type for a band title', () => {
      const params = {
        tableColumn: {
          type: TABLE_DATA_TYPE,
          key: 'a',
          column: { name: 'a' },
        },
        tableRow: {
          level: 0,
        },
      };
      const chains = computeColumnChains(tableColumns, tableHeaderRows, columnBands);

      expect(
        getBandComponent(
          params, tableHeaderRows, tableColumns, columnBands,
          chains, columnVisibleBoundaries, levelsVisibility,
      ))
        .toEqual({
          type: BAND_GROUP_CELL,
          payload: {
            colSpan: 4,
            value: 'Band A',
            column: { title: 'Band A', level: 2, key: '_Band A' },
          },
        });
    });

    it('should return a null-typed band component if the current cell will be merged', () => {
      const params = {
        tableColumn: {
          type: TABLE_DATA_TYPE,
          key: 'b',
          column: { name: 'b' },
        },
        tableRow: {
          level: 0,
        },
      };
      const chains = computeColumnChains(tableColumns, tableHeaderRows, columnBands);

      expect(
        getBandComponent(
          params, tableHeaderRows, tableColumns, columnBands,
          chains, columnVisibleBoundaries, levelsVisibility,
      ))
        .toEqual({
          type: null,
          payload: null,
        });
    });

    it('should return an empty cell type for column without key', () => {
      const params = {
        tableColumn: {
          type: TABLE_DATA_TYPE,
          column: { name: 'd' },
        },
        tableRow: {
          level: 1,
        },
      };
      const chains = computeColumnChains(tableColumns, tableHeaderRows, columnBands);

      expect(
        getBandComponent(
          params, tableHeaderRows, tableColumns, columnBands,
          chains, columnVisibleBoundaries, levelsVisibility,
      ))
        .toEqual({
          type: 'bandEmptyCell',
          payload: null,
        });
    });

    describe('with fixed columns', () => {
      it('should return correct data for cells in a fixed column', () => {
        const columns = [
          {
            ...tableColumns[0],
            fixed: 'left',
          },
          ...tableColumns.slice(1),
        ];
        const columnChains = computeColumnChainsWithFixed(columns, tableHeaderRows, columnBands);

        expect(
          getBandComponent({
            tableColumn: columns[0],
            tableRow: { level: 0 },
          },
          tableHeaderRows, tableColumns, columnBands, columnChains,
          columnVisibleBoundaries, levelsVisibility),
        )
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 1,
              value: 'Band A',
              column: { title: 'Band A', level: 2, key: '_Band A' },
            },
          });

        expect(
          getBandComponent({
            tableColumn: tableColumns[0],
            tableRow: { level: 1 },
          }, tableHeaderRows, tableColumns, columnBands, columnChains,
          columnVisibleBoundaries, levelsVisibility),
        )
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 1,
              value: 'Band B',
              column: { title: 'Band B', level: 2, key: '_Band A_Band B' },
            },
          });

        expect(
          getBandComponent({
            tableColumn: tableColumns[0],
            tableRow: { level: 2 },
          }, tableHeaderRows, tableColumns, columnBands, columnChains,
          columnVisibleBoundaries, levelsVisibility),
        )
          .toEqual({
            type: BAND_HEADER_CELL,
            payload: {
              tableRow: { type: TABLE_HEADING_TYPE },
              rowSpan: 1,
            },
          });
      });

      it('should return correct data for the cell going after a fixed column', () => {
        const columns = [
          {
            ...tableColumns[0],
            fixed: 'left',
          },
          ...tableColumns.slice(1),
        ];
        const columnChains = computeColumnChainsWithFixed(columns, tableHeaderRows, columnBands);
        expect(
          getBandComponent(
            {
              tableColumn: columns[1],
              tableRow: { level: 0 },
            },
            tableHeaderRows, columns,
            columnBands, columnChains,
            columnVisibleBoundaries, levelsVisibility,
          ),
        )
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 3,
              value: 'Band A',
              column: { title: 'Band A', level: 2, key: '_Band A' },
            },
          });
      });

      it('should return correct data when there are multiple fixed columns', () => {
        const columns = [
          { ...tableColumns[0], fixed: 'left' },
          { ...tableColumns[1], fixed: 'left' },
          ...tableColumns.slice(2),
        ];
        const columnChains = computeColumnChainsWithFixed(columns, tableHeaderRows, columnBands);
        expect(
          getBandComponent(
            {
              tableColumn: columns[0],
              tableRow: { level: 0 },
            },
            tableHeaderRows, columns,
            columnBands, columnChains,
            columnVisibleBoundaries, levelsVisibility,
          ),
        )
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 2,
              value: 'Band A',
              column: { title: 'Band A', level: 2, key: '_Band A' },
            },
          });
      });
    });

    describe('with command button', () => {
      const testTableHeaderRows = [
        { type: 'commandColumn' },
        { type: TABLE_BAND_TYPE, level: 0 },
        { type: TABLE_HEADING_TYPE },
        { type: TABLE_HEADING_TYPE },
      ];
      const testColumnBands = [
        {
          title: 'Band A',
          children: [
            { columnName: 'a' },
            { columnName: 'b' },
          ],
        },
      ];
      const testColumns = [
        { key: 'commandColumn', column: { name: 'commandColumn' }, type: 'commandColumn' },
        ...tableColumns,
      ];
      const columnChains = computeColumnChains(testColumns, testTableHeaderRows, testColumnBands);

      it('should add beforeBorder if commandButton is before BandGroupCell', () => {
        expect(
          getBandComponent(
            {
              tableColumn: tableColumns[0],
              tableRow: { level: 0 },
            },
            testTableHeaderRows, testColumns,
            testColumnBands, columnChains,
            columnVisibleBoundaries, levelsVisibility,
          ),
        )
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 2,
              value: 'Band A',
              column: { title: 'Band A', level: 1, key: '_Band A' },
              beforeBorder: true,
            },
          });
      });

      it('should add beforeBorder if commandButton is before BandHeaderCell', () => {
        expect(
          getBandComponent(
            {
              tableColumn: tableColumns[0],
              tableRow: { level: 1 },
            },
            testTableHeaderRows, testColumns,
            testColumnBands, columnChains,
            columnVisibleBoundaries, levelsVisibility,
          ),
        )
          .toEqual({
            type: BAND_HEADER_CELL,
            payload: {
              tableRow: { type: TABLE_HEADING_TYPE },
              rowSpan: 1,
              beforeBorder: true,
            },
          });
      });
    });

    describe('with virtual table', () => {
      const testColumns = generateColumns(10);

      describe('group cell colSpan', () => {
        const testBands = [
          {
            title: 'Band0',
            children: [
              { columnName: '4' },
              { columnName: '5' },
              { columnName: '6' },
              { columnName: '7' },
              {
                title: 'Band1',
                children: [
                  { columnName: '6' },
                  { columnName: '7' },
                ],
              },
            ],
          },
        ];
        const columnChains = computeColumnChains(testColumns, tableHeaderRows, testBands);
        const getParams = tableColumn => ({
          tableColumn,
          tableRow: { level: 0 },
        });
        const getBandComponentByViewport = (columnBoundaries, column) => getBandComponent(
          getParams(column), tableHeaderRows, testColumns, testBands, columnChains,
          columnBoundaries, levelsVisibility,
        );
        const groupCellWithColSpan = colSpan => ({
          type: BAND_GROUP_CELL,
          payload: {
            colSpan,
            value: 'Band0',
            column: { title: 'Band0', level: 1, key: '_Band0' },
          },
        });

        it('should be correct when a right part of band is hidden', () => {
          expect(getBandComponentByViewport([[0, 5]], testColumns[4]))
          .toEqual(
            groupCellWithColSpan(2),
          );
        });

        it('should be correct when whole band is visible', () => {
          expect(getBandComponentByViewport([[3, 8]], testColumns[4]))
          .toEqual(
            groupCellWithColSpan(4),
          );
        });

        it('should be correct when a left part of band is hidden', () => {
          expect(getBandComponentByViewport([[5, 9]], testColumns[5]))
          .toEqual(
            groupCellWithColSpan(3),
          );
        });
      });

      describe('fill level cell', () => {
        const testBands = [
          {
            title: 'Band0',
            children: [
              { columnName: '4' },
              { columnName: '5' },
              { columnName: '6' },
              { columnName: '7' },
              { columnName: '8' },
              {
                title: 'Band1',
                children: [
                  { columnName: '7' },
                  { columnName: '8' },
                  {
                    title: 'Band2',
                    children: [
                      { columnName: '7' },
                    ],
                  },
                ],
              },
            ],
          },
        ];
        const testTableHeaderRows = [
          { type: TABLE_BAND_TYPE, level: 0 },
          { type: TABLE_BAND_TYPE, level: 1 },
          { type: TABLE_BAND_TYPE, level: 2 },
          { type: TABLE_HEADING_TYPE },
        ];
        const columnChains = computeColumnChains(testColumns, tableHeaderRows, testBands);
        const getParams = (tableColumn, level) => ({
          tableColumn,
          tableRow: { level },
        });
        const getBandComponentGetter = (columnBoundaries, testLevelsVisibility) => (
          (tableColumn, level) => (getBandComponent(
            getParams(tableColumn, level), testTableHeaderRows, testColumns, testBands,
            columnChains, columnBoundaries, testLevelsVisibility,
          ))
        );

        it('should fill invisible level in place of invisible cell', () => {
          const columnBoundaries = [[4, 6]];
          const stubColumn = {
            type: TABLE_STUB_TYPE,
            key: 'stub_0-3',
          };
          const testLevelsVisibility = [true, false, false];
          const getBandComponentByLevel = getBandComponentGetter(
            columnBoundaries, testLevelsVisibility,
          );

          expect(getBandComponentByLevel(stubColumn, 0))
            .toEqual({
              payload: { rowSpan: 1 },
              type: BAND_FILL_LEVEL_CELL,
            });

          expect(getBandComponentByLevel(stubColumn, 1))
            .toEqual({
              payload: null,
              type: BAND_FILL_LEVEL_CELL,
            });

          expect(getBandComponentByLevel(stubColumn, 2))
            .toEqual({
              payload: null,
              type: BAND_FILL_LEVEL_CELL,
            });

          expect(getBandComponentByLevel(stubColumn, undefined)) // heading row
            .toEqual({
              payload: null,
              type: BAND_FILL_LEVEL_CELL,
            });
        });

        it('should fill space vertically', () => {
          const columnBoundaries = [[5, 7]];
          const stubColumn = {
            type: TABLE_STUB_TYPE,
            key: 'stub_0-4',
          };
          const testLevelsVisibility = [true, true, true];
          const getBandComponentByLevel = getBandComponentGetter(
            columnBoundaries, testLevelsVisibility,
          );
          const assertEmptyCell = (level) => {
            expect(getBandComponentByLevel(stubColumn, level))
              .toEqual({
                payload: null,
                type: BAND_EMPTY_CELL,
              });
          };

          expect(getBandComponentByLevel(stubColumn, 0))
            .toEqual({
              payload: { rowSpan: 4 },
              type: BAND_FILL_LEVEL_CELL,
            });

          assertEmptyCell(1);
          assertEmptyCell(2);
          assertEmptyCell(3);
        });
      });
    });
  });

  describe('#calculateBand', () => {
    const headerChain = {
      start: 1,
      columns: [{}, {}, {}],
    };

    it('should work', () => {
      expect(calculateBand([0, 5], headerChain))
        .toEqual([1, 4]);
      expect(calculateBand([2, 5], headerChain))
        .toEqual([2, 4]);
      expect(calculateBand([2, 2], headerChain))
        .toEqual([2, 3]);
      expect(calculateBand([0, 2], headerChain))
        .toEqual([1, 3]);
    });

    it('should return chain range if visibleBound is not defined', () => {
      expect(calculateBand(undefined, headerChain))
        .toEqual([1, 4]);
    });
  });
});

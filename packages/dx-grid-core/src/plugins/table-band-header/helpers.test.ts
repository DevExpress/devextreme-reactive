import * as Immutable from 'seamless-immutable';
import {
  TABLE_BAND_TYPE, BAND_GROUP_CELL, BAND_HEADER_CELL, BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER,
} from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import {
  isNoDataColumn,
  isBandedTableRow,
  isBandedOrHeaderRow,
  getColumnMeta,
  getBandComponent,
} from './helpers';
import { tableHeaderColumnChainsWithBands } from './computeds';
import { tableHeaderColumnChainsWithFixed } from '../table-fixed-columns/computeds';

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
        .toEqual({ title: 'Band A', level: 1 });
    });

    it('should return correct column meta for the deeper children levels', () => {
      expect(getColumnMeta('a', columnBands, 2))
        .toEqual({ title: 'Band B', level: 2 });
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

    it('should return a duplicate render type if column has a rowSpan', () => {
      const params = {
        rowSpan: 3,
        tableColumn: {},
        tableRow: {},
      };

      expect(getBandComponent(params, {}, {}, {}, []))
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

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnBands, chains))
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

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnBands, chains))
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

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnBands, chains))
        .toEqual({
          type: BAND_GROUP_CELL,
          payload: {
            colSpan: 4,
            value: 'Band A',
            column: { title: 'Band A', level: 2 },
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

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnBands, chains))
        .toEqual({
          type: null,
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
          }, tableHeaderRows, tableColumns, columnBands, columnChains),
        )
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 1,
              value: 'Band A',
              column: { title: 'Band A', level: 2 },
            },
          });

        expect(
          getBandComponent({
            tableColumn: tableColumns[0],
            tableRow: { level: 1 },
          }, tableHeaderRows, tableColumns, columnBands, columnChains),
        )
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 1,
              value: 'Band B',
              column: { title: 'Band B', level: 2 },
            },
          });

        expect(
          getBandComponent({
            tableColumn: tableColumns[0],
            tableRow: { level: 2 },
          }, tableHeaderRows, tableColumns, columnBands, columnChains),
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
            tableHeaderRows,
            columns,
            columnBands,
            columnChains,
          ),
        )
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 3,
              value: 'Band A',
              column: { title: 'Band A', level: 2 },
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
            tableHeaderRows,
            columns,
            columnBands,
            columnChains,
          ),
        )
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 2,
              value: 'Band A',
              column: { title: 'Band A', level: 2 },
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
            testTableHeaderRows,
            testColumns,
            testColumnBands,
            columnChains,
          ),
        )
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 2,
              value: 'Band A',
              column: { title: 'Band A', level: 1 },
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
            testTableHeaderRows,
            testColumns,
            testColumnBands,
            columnChains,
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
  });
});

import {
  TABLE_BAND_TYPE, BAND_GROUP_CELL, BAND_HEADER_CELL, BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER,
} from './constants';
import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from '../table/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import { TABLE_STUB_TYPE } from '../../utils/virtual-table';
import {
  isNoDataColumn,
  isBandedTableRow,
  isBandedOrHeaderRow,
  getColSpan,
  getColumnBandInfo,
  getCurrentColumnBandInfo,
  getBandComponent,
} from './helpers';

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

  describe('#getColumnBandInfo', () => {
    it('should return correct column meta for the first level children', () => {
      expect(getColumnBandInfo('d', columnBands, 1))
        .toEqual({ title: 'Band A', level: 1 });
    });

    it('should return correct column meta for the deeper children levels', () => {
      expect(getColumnBandInfo('a', columnBands, 2))
        .toEqual({ title: 'Band B', level: 2 });
    });
  });

  describe('#getCurrentColumnBandInfo', () => {
    it('should return band info for data columns', () => {
      const bandInfo = getCurrentColumnBandInfo({
        currentColumnIndex: 0,
        currentTableColumn: { type: TABLE_DATA_TYPE },
        currentRowLevel: 0,
      },
      { tableColumns, columnBands });

      expect(bandInfo).toEqual({ level: 2, title: 'Band A' });
    });

    it('should return band info for stub column if it substitutes a band column', () => {
      const bandInfo = getCurrentColumnBandInfo({
        currentColumnIndex: 2,
        currentTableColumn: { type: TABLE_STUB_TYPE },
        currentRowLevel: 0,
      },
      { tableColumns, columnBands });

      expect(bandInfo).toEqual({ level: 1, title: 'Band A' });
    });

    it('should return empty band for other column types', () => {
      const bandInfo = getCurrentColumnBandInfo({
        currentColumnIndex: 0,
        currentTableColumn: { type: TABLE_NODATA_TYPE },
        currentRowLevel: 0,
      },
      { tableColumns, columnBands });

      expect(bandInfo).toEqual({ level: 0, title: '' });
    });
  });

  describe('#getColSpan', () => {
    it('should work correctly for the first row level bands', () => {
      const currentColumnInfo = {
        currentColumnIndex: 0,
        currentRowLevel: 0,
        currentColumnBand: { title: 'Band A' },
      };
      const tableHeaderInfo = {
        tableColumns,
        columnBands,
      };

      expect(getColSpan(currentColumnInfo, tableHeaderInfo)).toBe(4);
    });

    it('should work correctly for nested row level bands', () => {
      const currentColumnInfo = {
        currentColumnIndex: 0,
        currentRowLevel: 1,
        currentColumnBand: { title: 'Band B' },
      };
      const tableHeaderInfo = {
        tableColumns,
        columnBands,
      };

      expect(getColSpan(currentColumnInfo, tableHeaderInfo)).toBe(2);
    });

    it('should work for nested row level non-band elements', () => {
      const currentColumnInfo = {
        currentColumnIndex: 2,
        currentRowLevel: 1,
        currentColumnBand: { title: 'Band A' },
      };
      const tableHeaderInfo = {
        tableColumns,
        columnBands,
      };

      expect(getColSpan(currentColumnInfo, tableHeaderInfo)).toBe(1);
    });

    it('should work with alternate titles', () => {
      const currentColumnInfo = {
        currentColumnIndex: 3,
        currentRowLevel: 1,
        currentColumnBand: { title: 'Band B' },
      };
      const tableHeaderInfo = {
        tableColumns,
        columnBands,
      };

      expect(getColSpan(currentColumnInfo, tableHeaderInfo)).toBe(1);
    });

    it('should consider fixed columns for the first row level bands', () => {
      const currentColumnInfo = {
        currentColumnIndex: 0,
        currentRowLevel: 0,
        isCurrentColumnFixed: true,
        currentColumnBand: { title: 'Band A' },
      };
      const tableHeaderInfo = {
        tableColumns: [
          { ...tableColumns[0], fixed: 'before' },
          ...tableColumns.slice(1),
        ],
        columnBands,
      };

      expect(getColSpan(currentColumnInfo, tableHeaderInfo)).toBe(1);
    });

    it('should consider fixed columns for nested row level bands', () => {
      const currentColumnInfo = {
        currentColumnIndex: 0,
        currentRowLevel: 1,
        isCurrentColumnFixed: true,
        currentColumnBand: { title: 'Band A' },
      };
      const tableHeaderInfo = {
        tableColumns: [
          { ...tableColumns[0], fixed: 'before' },
          ...tableColumns.slice(1),
        ],
        columnBands,
      };

      expect(getColSpan(currentColumnInfo, tableHeaderInfo)).toBe(1);
    });

    it('should consider multiple fixed columns', () => {
      const currentColumnInfo = {
        currentColumnIndex: 0,
        currentRowLevel: 0,
        isCurrentColumnFixed: true,
        currentColumnBand: { title: 'Band A' },
      };
      const tableHeaderInfo = {
        tableColumns: [
          { ...tableColumns[0], fixed: 'before' },
          { ...tableColumns[1], fixed: 'before' },
          ...tableColumns.slice(2),
        ],
        columnBands,
      };

      expect(getColSpan(currentColumnInfo, tableHeaderInfo)).toBe(2);
    });

    it('should calculate colspan for partially hidden band column when virtual scrolling is enabled', () => {
      const currentColumnInfo = {
        currentColumnIndex: 1,
        currentRowLevel: 0,
        currentColumnBand: { title: 'Band B' },
      };
      const tableHeaderInfo = {
        tableColumns,
        columnBands,
      };

      expect(getColSpan(currentColumnInfo, tableHeaderInfo)).toBe(1);
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

      expect(getBandComponent(params, {}, {}, {}))
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

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnBands))
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

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnBands))
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

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnBands))
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

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnBands))
        .toEqual({
          type: null,
          payload: null,
        });
    });

    it('should return correct data for cells in a fixed column', () => {
      expect(
        getBandComponent({
          tableColumn: {
            type: TABLE_DATA_TYPE,
            key: 'a',
            column: { name: 'a' },
            fixed: 'before',
          },
          tableRow: { level: 0 },
        }, tableHeaderRows, tableColumns, columnBands),
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
          tableColumn: {
            ...tableColumns[0],
            fixed: 'before',
          },
          tableRow: { level: 1 },
        }, tableHeaderRows, tableColumns, columnBands),
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
          tableColumn: {
            ...tableColumns[0],
            fixed: 'before',
          },
          tableRow: { level: 2 },
        }, tableHeaderRows, tableColumns, columnBands),
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
      expect(
        getBandComponent(
          {
            tableColumn: tableColumns[1],
            tableRow: { level: 0 },
          },
          tableHeaderRows,
          [{ ...tableColumns[0], fixed: 'before' }, ...tableColumns.slice(1)],
          columnBands,
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
      expect(
        getBandComponent(
          {
            tableColumn: { ...tableColumns[0], fixed: 'before' },
            tableRow: { level: 0 },
          },
          tableHeaderRows,
          [
            { ...tableColumns[0], fixed: 'before' },
            { ...tableColumns[1], fixed: 'before' },
            ...tableColumns.slice(2),
          ],
          columnBands,
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

      it('should add beforeBorder if commandButton is before BandGroupCell', () => {
        expect(
          getBandComponent(
            {
              tableColumn: { ...tableColumns[0] },
              tableRow: { level: 0 },
            },
            testTableHeaderRows,
            [
              { key: 'commandColumn', column: { name: 'commandColumn' }, type: 'commandColumn' },
              { ...tableColumns[0] },
              { ...tableColumns[1] },
            ],
            testColumnBands,
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
              tableColumn: { ...tableColumns[0] },
              tableRow: { level: 1 },
            },
            testTableHeaderRows,
            [
              { key: 'commandColumn', column: { name: 'commandColumn' }, type: 'commandColumn' },
              { ...tableColumns[0] },
              { ...tableColumns[1] },
            ],
            testColumnBands,
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
      it('should return band header cell for a stub column', () => {
        const params = {
          tableColumn: {
            type: TABLE_STUB_TYPE,
            key: 'stub_0_0',
            rightColumnIndex: 0,
            column: { },
          },
          tableRow: {
            level: 0,
          },
        };
        const extendedTableColumns = [
          { key: 'col0', column: { name: 'column 0' }, type: TABLE_DATA_TYPE },
          ...tableColumns,
        ];

        expect(getBandComponent(params, tableHeaderRows, extendedTableColumns, columnBands))
          .toEqual({
            type: BAND_HEADER_CELL,
            payload: {
              rowSpan: 3,
              tableRow: { type: TABLE_HEADING_TYPE },
            },
          });
      });

      it('should return a group cell for a partially hidden band title', () => {
        const params = {
          tableColumn: {
            type: TABLE_STUB_TYPE,
            key: 'stub_0_1',
            rightColumnIndex: 1,
            column: { },
          },
          tableRow: {
            level: 0,
          },
        };

        expect(getBandComponent(params, tableHeaderRows, tableColumns, columnBands))
          .toEqual({
            type: BAND_GROUP_CELL,
            payload: {
              colSpan: 3,
              value: 'Band A',
              column: { title: 'Band A', level: 2 },
            },
          });
      });
    });
  });
});

import { TABLE_BAND_TYPE, BAND_GROUP_CELL, BAND_HEADER_CELL, BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';
import {
  isBandedTableRow,
  isBandedOrHeaderRow,
  getColSpan,
  getColumnMeta,
  getBandComponent,
} from './helpers';

describe('TableBandHeader Plugin helpers', () => {
  const columnBands = [
    {
      title: 'A',
      children: [
        {
          title: 'AA',
          children: [
            { columnName: 'a' },
            { columnName: 'b' },
          ],
        },
        { columnName: 'd' },
        {
          title: 'AA',
          children: [
            { columnName: 'c' },
          ],
        },
      ],
    },
  ];

  const tableColumns = [
    {
      column: {
        name: 'a',
      },
      type: TABLE_DATA_TYPE,
    }, {
      column: {
        name: 'b',
      },
      type: TABLE_DATA_TYPE,
    }, {
      column: {
        name: 'd',
      },
      type: TABLE_DATA_TYPE,
    }, {
      column: {
        name: 'c',
      },
      type: TABLE_DATA_TYPE,
    },
  ];
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
    it('should get column meta if one children levels', () => {
      expect(getColumnMeta('d', columnBands, 1))
        .toEqual({ title: 'A', level: 1 });
    });

    it('should get column meta if two children levels', () => {
      expect(getColumnMeta('a', columnBands, 2))
        .toEqual({ title: 'AA', level: 2 });
    });
  });

  describe('#getColSpan', () => {
    it('should work for first row', () => {
      const currColumnTitle = 'A';
      const currColumnIndex = 0;
      const currRowLevel = 0;

      expect(getColSpan(
        currColumnIndex,
        tableColumns,
        columnBands,
        currRowLevel,
        currColumnTitle,
      )).toEqual(4);
    });

    it('should work for second row and children element', () => {
      const currColumnTitle = 'AA';
      const currColumnIndex = 0;
      const currRowLevel = 1;

      expect(getColSpan(
        currColumnIndex,
        tableColumns,
        columnBands,
        currRowLevel,
        currColumnTitle,
      )).toEqual(2);
    });

    it('should work for second row and not children element', () => {
      const currColumnTitle = 'A';
      const currColumnIndex = 2;
      const currRowLevel = 1;

      expect(getColSpan(
        currColumnIndex,
        tableColumns,
        columnBands,
        currRowLevel,
        currColumnTitle,
      )).toEqual(1);
    });

    it('should work with alternate titles', () => {
      const currColumnTitle = 'AA';
      const currColumnIndex = 3;
      const currRowLevel = 1;

      expect(getColSpan(
        currColumnIndex,
        tableColumns,
        columnBands,
        currRowLevel,
        currColumnTitle,
      )).toEqual(1);
    });
  });

  describe('#getBandComponent', () => {
    const tableHeaderRows = [
      { type: TABLE_BAND_TYPE, level: 0 },
      { type: TABLE_BAND_TYPE, level: 1 },
      { type: TABLE_HEADING_TYPE },
    ];

    it('should return duplicate render if column has rowSpan', () => {
      const params = {
        rowSpan: 3,
        tableColumn: {},
        tableRow: {},
      };

      expect(getBandComponent(params, {}, {}, {}))
        .toEqual({ type: BAND_DUPLICATE_RENDER, payload: null });
    });

    it('should return empty cell if a column is not on its own line', () => {
      const params = {
        tableColumn: {
          type: TABLE_DATA_TYPE,
          column: {
            name: 'd',
          },
        },
        tableRow: {
          level: 2,
        },
      };

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnBands))
        .toEqual({ type: BAND_EMPTY_CELL, payload: null });
    });

    it('should return header cell for heading column', () => {
      const params = {
        tableColumn: {
          type: TABLE_DATA_TYPE,
          column: {
            name: 'd',
          },
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

    it('should return group cell for band title', () => {
      const params = {
        tableColumn: {
          type: TABLE_DATA_TYPE,
          column: {
            name: 'a',
          },
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
            value: 'A',
            column: { title: 'A', level: 2 },
          },
        });
    });
  });
});

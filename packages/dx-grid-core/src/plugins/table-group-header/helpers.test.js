import { TABLE_BAND_TYPE } from './constants';
import {
  isBandedTableRow,
  isBandedOrHeaderRow,
  getColSpan,
  getColumnMeta,
  getBandComponent,
} from './helpers';

describe('TableGroupHeader Plugin helpers', () => {
  const columnGroups = [
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
      ],
    },
  ];

  const tableColumns = [
    {
      column: {
        name: 'a',
      },
      type: 'data',
    }, {
      column: {
        name: 'b',
      },
      type: 'data',
    }, {
      column: {
        name: 'd',
      },
      type: 'data',
    },
  ];
  describe('#isBandedOrHeaderRow', () => {
    it('should work', () => {
      expect(isBandedOrHeaderRow({ type: 'band' }))
        .toBeTruthy();
      expect(isBandedOrHeaderRow({ type: 'heading' }))
        .toBeTruthy();
      expect(isBandedOrHeaderRow({ type: 'data' }))
        .toBeFalsy();
    });
  });

  describe('#isBandedTableRow', () => {
    it('should work', () => {
      expect(isBandedTableRow({ type: TABLE_BAND_TYPE }))
        .toBeTruthy();
      expect(isBandedTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#getColumnMeta', () => {
    it('should get column meta if one children levels', () => {
      expect(getColumnMeta('d', columnGroups, 1))
        .toEqual({ title: 'A', level: 1 });
    });

    it('should get column meta if two children levels', () => {
      expect(getColumnMeta('a', columnGroups, 2))
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
        columnGroups,
        currRowLevel,
        currColumnTitle,
      )).toEqual(3);
    });
    it('should work for second row and children element', () => {
      const currColumnTitle = 'AA';
      const currColumnIndex = 0;
      const currRowLevel = 1;

      expect(getColSpan(
        currColumnIndex,
        tableColumns,
        columnGroups,
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
        columnGroups,
        currRowLevel,
        currColumnTitle,
      )).toEqual(1);
    });
  });

  describe('#getBandComponent', () => {
    const tableHeaderRows = [{ type: 'band', level: 0 }, { type: 'band', level: 1 }, { type: 'heading' }];

    it('should return duplicate render if column has rowSpan', () => {
      const params = {
        rowSpan: 3,
        tableColumn: {},
        tableRow: {},
      };

      expect(getBandComponent(params, {}, {}, {}))
        .toEqual({ type: 'duplicateRender', payload: null });
    });
    it('should return empty cell if a column is not on its own line', () => {
      const params = {
        tableColumn: {
          type: 'data',
          column: {
            name: 'd',
          },
        },
        tableRow: {
          level: 2,
        },
      };

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnGroups))
        .toEqual({ type: 'emptyCell', payload: null });
    });
    it('should return header cell for heading column', () => {
      const params = {
        tableColumn: {
          type: 'data',
          column: {
            name: 'd',
          },
        },
        tableRow: {
          level: 1,
        },
      };

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnGroups))
        .toEqual({
          type: 'headerCell',
          payload: {
            tableRow: { type: 'heading' },
            rowSpan: 2,
          },
        });
    });
    it('should return group cell for band title', () => {
      const params = {
        tableColumn: {
          type: 'data',
          column: {
            name: 'a',
          },
        },
        tableRow: {
          level: 0,
        },
      };

      expect(getBandComponent(params, tableHeaderRows, tableColumns, columnGroups))
        .toEqual({
          type: 'groupCell',
          payload: {
            colSpan: 3,
            value: 'A',
            column: { title: 'A', level: 2 },
          },
        });
    });
  });
});

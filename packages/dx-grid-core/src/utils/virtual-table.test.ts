// tslint:disable: max-line-length
import { TABLE_FLEX_TYPE } from '..';
import {
  getVisibleBoundary,
  getVisibleBoundaryWithFixed,
  getSpanBoundary,
  collapseBoundaries,
  getCollapsedColumns,
  getCollapsedCells,
  getCollapsedGrid,
  TABLE_STUB_TYPE,
  getColumnWidthGetter,
} from './virtual-table';

describe('VirtualTableLayout utils', () => {
  describe('#getVisibleBoundary', () => {
    it('should work in the simplest case', () => {
      const items = [
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
      ];

      expect(getVisibleBoundary(items, 80, 120, item => item.size))
        .toEqual([2, 4]);
    });

    it('should work with overscan', () => {
      const items = [
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
      ];

      expect(getVisibleBoundary(items, 80, 120, item => item.size, 1))
        .toEqual([1, 5]);
    });
  });

  describe('#getVisibleBoundaryWithFixed', () => {
    it('should support fixed columns', () => {
      const items = [
        { key: 'a', fixed: 'before' },
        { key: 'b' },
        { key: 'c' },
        { key: 'd', fixed: 'before' },
        { key: 'e' },
        { key: 'f' },
        { key: 'g', fixed: 'after' },
      ];

      expect(getVisibleBoundaryWithFixed([3, 5], items))
        .toEqual([[3, 5], [0, 0], [6, 6]]);
      expect(getVisibleBoundaryWithFixed([1, 5], items))
        .toEqual([[1, 5], [0, 0], [6, 6]]);
    });
  });

  describe('#getSpanBoundary', () => { // visibleBoundaryWithSpans
    it('should work in a simple case', () => {
      const items = [
        { colSpan: 1 }, // 0
        { colSpan: 1 }, // 1
        { colSpan: 1 }, // 2
        { colSpan: 1 }, // 3
        { colSpan: 1 }, // 4
        { colSpan: 1 }, // 5
        { colSpan: 1 }, // 6
      ];

      expect(getSpanBoundary(items, [[2, 4]], item => item.colSpan))
        .toEqual([[2, 4]]);
    });

    it('should work with span before visible area', () => {
      const items = [
        { colSpan: 1 }, // 0
        { colSpan: 2 }, // 1, 2
        { colSpan: 1 }, // 3
        { colSpan: 1 }, // 4
        { colSpan: 1 }, // 5
        { colSpan: 1 }, // 6
        { colSpan: 1 }, // 7
      ];

      expect(getSpanBoundary(items, [[2, 4]], item => item.colSpan))
        .toEqual([[1, 4]]);
    });

    it('should work with span after visible area', () => {
      const items = [
        { colSpan: 1 }, // 0
        { colSpan: 1 }, // 1
        { colSpan: 1 }, // 2
        { colSpan: 1 }, // 3
        { colSpan: 2 }, // 4, 5
        { colSpan: 1 }, // 6
        { colSpan: 1 }, // 7
      ];

      expect(getSpanBoundary(items, [[2, 4]], item => item.colSpan))
        .toEqual([[2, 5]]);
    });

    it('should work with span greater than visible area', () => {
      const items = [
        { colSpan: 1 }, // 0
        { colSpan: 5 }, // 1, 2, 3, 4, 5
        { colSpan: 1 }, // 6
        { colSpan: 1 }, // 7
        { colSpan: 1 }, // 8
        { colSpan: 1 }, // 9
        { colSpan: 1 }, // 10
      ];

      expect(getSpanBoundary(items, [[2, 4]], item => item.colSpan))
        .toEqual([[1, 5]]);
    });

    it('should work with multiple visible boundaries in a simple case', () => {
      const items = [
        { colSpan: 1 }, // 0
        { colSpan: 1 }, // 1
        { colSpan: 1 }, // 2
        { colSpan: 1 }, // 3
        { colSpan: 1 }, // 4
        { colSpan: 1 }, // 5
        { colSpan: 1 }, // 6
      ];

      expect(getSpanBoundary(items, [[0, 0], [3, 4], [6, 6]], item => item.colSpan))
        .toEqual([[0, 0], [3, 4], [6, 6]]);
    });

    it('should work with multiple visible boundaries and a span in fixed columns before the visible area', () => {
      const items = [
        { colSpan: 1 }, // 0
        { colSpan: 2 }, // 1, 2
        { colSpan: 1 }, // 3
        { colSpan: 1 }, // 4
        { colSpan: 1 }, // 5
        { colSpan: 1 }, // 6
        { colSpan: 1 }, // 7
      ];

      expect(getSpanBoundary(items, [[1, 1], [4, 5], [6, 6]], item => item.colSpan))
        .toEqual([[1, 2], [4, 5], [6, 6]]);
    });

    it('should work with multiple visible boundaries and a span in fixed columns after the visible area', () => {
      const items = [
        { colSpan: 1 }, // 0
        { colSpan: 1 }, // 1
        { colSpan: 1 }, // 2
        { colSpan: 1 }, // 3
        { colSpan: 2 }, // 4, 5
        { colSpan: 1 }, // 6
        { colSpan: 1 }, // 7
      ];

      expect(getSpanBoundary(items, [[2, 3], [5, 5]], item => item.colSpan))
        .toEqual([[2, 3], [4, 5]]);
    });
  });

  describe('#collapseBoundaries', () => {
    it('should work in a simple case', () => {
      const itemsCount = 9;
      const visibleBoundary = [[3, 4]];
      const spanBoundaries = [
        [[3, 4]], // row 0
      ];

      expect(collapseBoundaries(itemsCount, visibleBoundary, spanBoundaries))
        .toEqual([
          [0, 2], // stub
          [3, 3], // visible
          [4, 4], // visible
          [5, 8], // stub
        ]);
    });

    it('should work with spans before visible area', () => {
      const itemsCount = 9;
      const visibleBoundary = [[3, 5]];
      const spanBoundaries = [
        [[1, 5]], // row 0
        [[2, 5]], // row 1
      ];

      expect(collapseBoundaries(itemsCount, visibleBoundary, spanBoundaries))
        .toEqual([
          [0, 0], // stub
          [1, 1], // stub
          [2, 2], // stub
          [3, 3], // visible
          [4, 4], // visible
          [5, 5], // visible
          [6, 8], // stub
        ]);
    });

    it('should work with spans after visible area', () => {
      const itemsCount = 9;
      const visibleBoundary = [[3, 5]];
      const spanBoundaries = [
        [[3, 7]], // row 0
        [[3, 6]], // row 1
      ];

      expect(collapseBoundaries(itemsCount, visibleBoundary, spanBoundaries))
        .toEqual([
          [0, 2], // stub
          [3, 3], // visible
          [4, 4], // visible
          [5, 5], // visible
          [6, 6], // stub
          [7, 7], // stub
          [8, 8], // stub
        ]);
    });

    it('should work with spans greater than visible area', () => {
      const itemsCount = 9;
      const visibleBoundary = [[3, 5]];
      const spanBoundaries = [
        [[1, 6]], // row 0
        [[2, 7]], // row 1
      ];

      expect(collapseBoundaries(itemsCount, visibleBoundary, spanBoundaries))
        .toEqual([
          [0, 0], // stub
          [1, 1], // stub
          [2, 2], // stub
          [3, 3], // visible
          [4, 4], // visible
          [5, 5], // visible
          [6, 6], // stub
          [7, 7], // stub
          [8, 8], // stub
        ]);
    });

    it('should work with multiple visible areas', () => {
      const itemsCount = 10;
      const visibleBoundary = [[0, 0], [4, 6], [9, 9]];
      const spanBoundaries = [
        [[0, 0], [4, 6], [9, 9]], // row 0
        [[0, 1], [4, 6], [9, 9]], // row 1
        [[0, 0], [4, 8], [9, 9]], // row 2
      ];

      expect(collapseBoundaries(itemsCount, visibleBoundary, spanBoundaries))
        .toEqual([
          [0, 0], // visible
          [1, 1], // stub (for colspan [0, 1])
          [2, 3], // stub
          [4, 4], // visible
          [5, 5], // visible
          [6, 6], // visible
          [7, 8], // stub (for colspan [4, 8])
          [9, 9], // visible
        ]);
    });
  });

  describe('#getCollapsedColumns', () => {
    it('should work', () => {
      const columns = [
        { key: 0, width: 40 },
        { key: 1, width: 40 },
        { key: 2, width: 40 },
        { key: 3, width: 40 },
        { key: 4, width: 40 },
        { key: 5, width: 40 },
        { key: 6, width: 40 },
        { key: 7, width: 40 },
      ];
      const visibleBoundary = [[3, 4]];
      const boundaries = [[0, 0], [1, 2], [3, 3], [4, 4], [5, 6], [7, 7]];
      const getColumnWidth = column => column.width;

      const result = [
        { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_0_0`, width: 40 },
        { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_1_2`, width: 80 },
        { ...columns[3] },
        { ...columns[4] },
        { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_5_6`, width: 80 },
        { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_7_7`, width: 40 },
      ];

      expect(getCollapsedColumns(columns, visibleBoundary, boundaries, getColumnWidth))
        .toEqual(result);
    });

    it('should work with multiple visible boundaries', () => {
      const columns = [
        { key: 0, width: 40 },
        { key: 1, width: 40 },
        { key: 2, width: 40 },
        { key: 3, width: 40 },
        { key: 4, width: 40 },
        { key: 5, width: 40 },
        { key: 6, width: 40 },
        { key: 7, width: 40 },
        { key: 8, width: 40 },
      ];
      const visibleBoundary = [[0, 0], [1, 1], [4, 5], [8, 8]];
      const boundaries = [[0, 0], [1, 1], [2, 3], [4, 4], [5, 5], [6, 7], [8, 8]];
      const getColumnWidth = column => column.width;

      const result = [
        { ...columns[0] },
        { ...columns[1] },
        { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_2_3`, width: 80 },
        { ...columns[4] },
        { ...columns[5] },
        { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_6_7`, width: 80 },
        { ...columns[8] },
      ];

      expect(getCollapsedColumns(columns, visibleBoundary, boundaries, getColumnWidth))
        .toEqual(result);
    });

    it('should assign width to all columns', () => {
      const columns = [
        { key: 0, colWidth: 30 },
        { key: 1, colWidth: 40 },
        { key: 2, colWidth: 50 },
        { key: 3, colWidth: 60 },
        { key: 4, colWidth: 70 },
        { key: 5, colWidth: 80, width: 80 },
        { key: 6, colWidth: 90 },
        { key: 7, colWidth: 100 },
      ];
      const visibleBoundary = [[2, 5]];
      const boundaries = [[0, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 7]];
      const getColumnWidth = column => column.colWidth;

      const result = [
        { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_0_1`, width: 70 },
        { ...columns[2], width: 50 },
        { ...columns[3], width: 60 },
        { ...columns[4], width: 70 },
        { ...columns[5], width: 80 },
        { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_6_7`, width: 190 },
      ];

      expect(getCollapsedColumns(columns, visibleBoundary, boundaries, getColumnWidth))
        .toEqual(result);
    });
  });

  describe('#getCollapsedCells', () => {
    it('should work', () => {
      const columns = [
        { key: 0, colSpan: 1 },
        { key: 1, colSpan: 6 },
        { key: 2, colSpan: 1 },
        { key: 3, colSpan: 1 },
        { key: 4, colSpan: 1 },
        { key: 5, colSpan: 1 },
        { key: 6, colSpan: 1 },
        { key: 7, colSpan: 1 },
      ];
      const spanBoundary = [[1, 6]];
      const boundaries = [[0, 0], [1, 2], [3, 3], [4, 4], [5, 6], [7, 7]];
      const getColSpan = column => column.colSpan;

      const result = [
        { column: { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_0_0` }, colSpan: 1 },
        { column: columns[1], colSpan: 4 },
        { column: columns[3], colSpan: 1 },
        { column: columns[4], colSpan: 1 },
        { column: columns[5], colSpan: 1 },
        { column: { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_7_7` }, colSpan: 1 },
      ];

      expect(getCollapsedCells(columns, spanBoundary, boundaries, getColSpan))
        .toEqual(result);
    });

    it('should work with multiple span boundaries', () => {
      const columns = [
        { key: 0, colSpan: 1 },
        { key: 1, colSpan: 1 },
        { key: 2, colSpan: 1 },
        { key: 3, colSpan: 1 },
        { key: 4, colSpan: 3 },
        { key: 5, colSpan: 1 },
        { key: 6, colSpan: 1 },
        { key: 7, colSpan: 1 },
        { key: 8, colSpan: 1 },
        { key: 9, colSpan: 1 },
      ];
      const spanBoundary = [[0, 1], [4, 6], [9, 9]];
      const boundaries = [
        [0, 0], // visible
        [1, 1], // stub (for colspan [0, 1])
        [2, 3], // stub
        [4, 4], // visible
        [5, 5], // visible
        [6, 6], // visible
        [7, 8], // stub (for colspan [4, 8])
        [9, 9], // visible
      ];
      const getColSpan = column => column.colSpan;

      const result = [
        { column: columns[0], colSpan: 1 },
        { column: columns[1], colSpan: 1 },
        { column: { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_2_3` }, colSpan: 1 },
        { column: columns[4], colSpan: 3 },
        { column: columns[5], colSpan: 1 },
        { column: columns[6], colSpan: 1 },
        { column: { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_7_8` }, colSpan: 1 },
        { column: columns[9], colSpan: 1 },
      ];

      expect(getCollapsedCells(columns, spanBoundary, boundaries, getColSpan))
        .toEqual(result);
    });
  });

  describe('#getCollapsedGrid', () => {
    it('should work in a simple case', () => {
      const args = {
        rows: [
          { key: 0, height: 40 },
          { key: 1, height: 40 }, // visible (overscan)
          { key: 2, height: 40 }, // visible (overscan)
          { key: 3, height: 40 }, // visible (overscan)
          { key: 4, height: 40 }, // visible
          { key: 5, height: 40 }, // visible (overscan)
          { key: 6, height: 40 }, // visible (overscan)
          { key: 7, height: 40 }, // visible (overscan)
          { key: 8, height: 40 },
        ],
        columns: [
          { key: 0, width: 40 },
          { key: 1, width: 40 }, // visible (overscan)
          { key: 2, width: 40 }, // visible
          { key: 3, width: 40 }, // visible (overscan)
          { key: 4, width: 40 },
        ],
        top: 160,
        left: 80,
        height: 40,
        width: 40,
      };

      const result = getCollapsedGrid(args);

      expect(result.rows.map(row => row.row.type))
        .toEqual([
          TABLE_STUB_TYPE,
          ...Array.from({ length: 7 }).map(() => undefined),
          TABLE_STUB_TYPE,
        ]);
      expect(result.columns.map(column => column.type))
        .toEqual([
          TABLE_STUB_TYPE,
          ...Array.from({ length: 3 }).map(() => undefined),
          TABLE_STUB_TYPE,
        ]);
      expect(result.rows[1].cells.map(cell => cell.colSpan))
        .toEqual([...Array.from({ length: 5 }).map(() => 1)]);
    });

    it('should return empty result when there are no columns', () => {
      const args = {
        rows: [],
        columns: [
          { key: 0, width: 40 },
        ],
        top: 0,
        left: 0,
        height: 80,
        width: 80,
      };
      const result = {
        columns: [],
        rows: [],
      };
      expect(getCollapsedGrid(args))
        .toEqual(result);
    });

    it('should return empty result when there are no rows', () => {
      const args = {
        rows: [
          { key: 0, height: 40 },
        ],
        columns: [],
        top: 0,
        left: 0,
        height: 80,
        width: 80,
      };
      const result = {
        columns: [],
        rows: [],
      };
      expect(getCollapsedGrid(args))
        .toEqual(result);
    });

    fit('should work with colspan', () => {
      const args = {
        rows: [
          { key: 0, height: 40 }, // visible
          { key: 1, height: 40 }, // visible (overscan)
          { key: 2, height: 40 }, // visible (overscan)
          { key: 3, height: 40 }, // visible (overscan)
          { key: 4, height: 40 },
        ],
        columns: [
          { key: 0, width: 40 }, // stub ┐
          { key: 1, width: 40 }, // stub ┘
          { key: 2, width: 40 }, // stub
          { key: 3, width: 40 }, // visible (overscan)
          { key: 4, width: 40 }, // visible
          { key: 5, width: 40 }, // visible (overscan)
          { key: 6, width: 40 }, // stub ┐
          { key: 7, width: 40 }, // stub ┘
          { key: 8, width: 40 }, // stub
        ],
        rowsVisibleBoundary: [0, 3],
        columnsVisibleBoundary: [[3, 5]],
        getColSpan: (row, column) => {
          if (row.key === 0 && column.key === 2) return 2;
          if (row.key === 0 && column.key === 5) return 3;
          if (row.key === 1 && column.key === 2) return 6;
          if (row.key === 2 && column.key === 0) return 9;
          return 1;
        },
        totalRowCount: 5,
        offset: 0,
      };

      const result = getCollapsedGrid(args);

      expect(result.columns.map(column => column.type))
        .toEqual([
          TABLE_STUB_TYPE, TABLE_STUB_TYPE,
          ...Array.from({ length: 3 }).map(() => undefined),
          TABLE_STUB_TYPE, TABLE_STUB_TYPE,
        ]);

      expect(result.rows[0].cells.map(cell => cell.colSpan))
        .toEqual([1, 2, 1, 1, 2, 1, 1]);
      expect(result.rows[1].cells.map(cell => cell.colSpan))
        .toEqual([1, 5, 1, 1, 1, 1, 1]);
      expect(result.rows[2].cells.map(cell => cell.colSpan))
        .toEqual([7, 1, 1, 1, 1, 1, 1]);
    });
  });

  describe('#getColumnWidthGetter', () => {
    const columns = [
      { key: 'a', width: 20 },
      { key: 'b', width: 80 },
      { key: 'c' },
      { key: 'd' },
      { key: 'e', width: 200 },
    ];
    const tableWidth = 800;
    const minWidth = 150;
    const getWidths = (cols, width, minColWidth) => {
      const getColumnWidth = getColumnWidthGetter(cols, width, minColWidth);
      return cols.map(getColumnWidth);
    };

    it('should calculate width for free-width columns if table stretches to page', () => {
      expect(getWidths(columns, tableWidth, minWidth))
      .toMatchObject([
        20, 80,
        250, 250,
        200,
      ]);
    });

    it('should return minColumnWidth otherwise', () => {
      expect(getWidths([
        ...columns,
        { key: 'f' },
        { key: 'g' },
        { key: 'h' },
        { key: 'j' },
      ], 1200, minWidth)).toMatchObject([
        20, 80,
        minWidth, minWidth,
        200,
        minWidth, minWidth, minWidth, minWidth,
      ]);
    });

    it('should return null for flex columns', () => {
      expect(getWidths([
        ...columns,
        { key: 'f' },
        { key: 'g', type: TABLE_FLEX_TYPE },
      ], tableWidth, minWidth)).toMatchObject([
        20, 80,
        minWidth, minWidth,
        200,
        minWidth,
        null,
      ]);
    });
  });
});

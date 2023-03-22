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
  getRenderBoundary,
  getColumnBoundaries,
  getRowsVisibleBoundary,
  getCollapsedGrids,
} from './virtual-table';

describe('VirtualTableLayout utils', () => {
  describe('#getVisibleBoundary', () => {
    const getItemSize = (item) => {
      return item ? item.size : 40;
    };
    const items = [
      { size: 40 },
      { size: 40 },
      { size: 40 },
      { size: 40 },
      { size: 40 },
      { size: 40 },
      { size: 40 },
    ];
    it('should work in the simplest case', () => {
      expect(getVisibleBoundary(items, 80, 120, getItemSize, [0, 0]))
        .toEqual([2, 4]);
    });

    it('should return visible boundary, rows are not fit in the max window height', () => {
      expect(getVisibleBoundary(items, 80, 120, getItemSize, [2, 1]))
        .toEqual([4, 6]);
    });
  });

  describe('#getColumnBoundaries', () => {
    const getItemSize = (item) => {
      return item ? item.size : 40;
    };
    it('should return correct boundaries in simple case', () => {
      const columns =  [
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
      ];

      expect(getColumnBoundaries(columns, 90, 100, getItemSize))
        .toEqual([[1, 5]]);
    });

    it('should take fixed columns into account', () => {
      const columns =  [
        { size: 40, fixed: 'left' },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40, fixed: 'right' },
      ];

      expect(getColumnBoundaries(columns, 120, 80, getItemSize))
        .toEqual([
          [0, 0],
          [2, 5],
          [7, 7],
        ]);
    });
  });

  describe('#getRowsVisibleBoundary', () => {
    it('should work with local data', () => {
      const getItemSize = (item) => {
        return item ? item.size : 40;
      };
      const items = [
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
        { size: 40 },
      ];
      expect(getRowsVisibleBoundary(items, 80, 120, getItemSize, [0, 0], 0))
      .toEqual([2, 4]);
    });

    describe('remote data', () => {
      const items = [
        { size: 40, rowId: 20 },
        { size: 40, rowId: 21 },
        { size: 40, rowId: 22 },
        { size: 40, rowId: 23 },
        { size: 40, rowId: 24 },
      ];

      it('should consider rows start offset and default height', () => {
        const getItemSize = (item) => {
          return item ? item.size : 30;
        };
        expect(getVisibleBoundary(items, 600, 120, getItemSize, [0, 0], 20))
          .toEqual([20, 22]);
      });

      it('should work when rows are not loaded', () => {
        const getItemSize = (item) => {
          return item ? item.size : 40;
        };
        expect(getRowsVisibleBoundary(items, 240, 120, getItemSize, [0, 0], 0, true))
          .toEqual([6, 6]);
      });

      it('should work when rows are not loaded, skipItems is not zero', () => {
        const getItemSize = (item) => {
          return item ? item.size : 40;
        };
        expect(getRowsVisibleBoundary(items, 240, 120, getItemSize, [10, 0], 0, true))
          .toEqual([16, 16]);
      });

      it('should work when rows are loaded, skipItems is not zero', () => {
        const getItemSize = (item) => {
          return item ? item.size : 40;
        };
        expect(getRowsVisibleBoundary(items, 240, 120, getItemSize, [10, 0], 15, true))
          .toEqual([16, 18]);
      });
    });
  });

  describe('#getRenderBoundary', () => {
    it('should correctly add overscan in simple case', () => {
      expect(getRenderBoundary(20, [5, 10], 3)).toEqual([2, 13]);
    });

    it('should correctly add overscan when grid is scrolled to top', () => {
      expect(getRenderBoundary(10, [0, 5], 3)).toEqual([0, 8]);
    });

    it('should correctly add overscan when grid is scrolled to bottom', () => {
      expect(getRenderBoundary(10, [5, 9], 3)).toEqual([2, 9]);
    });
  });

  describe('#getVisibleBoundaryWithFixed', () => {
    it('should merge fixed columns in ranges', () => {
      const items = [
        { key: '0' },
        { key: '1', fixed: 'left' },
        { key: '2', fixed: 'left' },
        { key: '3', fixed: 'left' },
        { key: '4' },
        { key: '5', fixed: 'left' },
        { key: '6', fixed: 'left' },
        { key: '7' },
        { key: '8' },
        { key: '9' },
        { key: '10' },
        { key: '11' },
        { key: '12', fixed: 'right' },
      ];

      expect(getVisibleBoundaryWithFixed([8, 10], items))
        .toEqual([[1, 3], [5, 6], [8, 10], [12, 12]]);
    });
    it('should accept fixed columns inside viewport', () => {
      const items = [
        { key: '0', fixed: 'left' },
        { key: '1', fixed: 'left' },
        { key: '2' },
        { key: '3' },
        { key: '4', fixed: 'left' },
        { key: '5' },
        { key: '6' },
        { key: '7', fixed: 'right' },
      ];

      expect(getVisibleBoundaryWithFixed([3, 5], items))
        .toEqual([[0, 1], [3, 5], [7, 7]]);
    });
    it('should extend viewport range', () => {
      const items = [
        { key: '0' },
        { key: '1', fixed: 'left' },
        { key: '2' },
        { key: '3' },
        { key: '4' },
        { key: '5', fixed: 'right' },
        { key: '6' },
      ];

      expect(getVisibleBoundaryWithFixed([2, 4], items))
        .toEqual([[1, 5]]);
    });
    it('should not include fixed columns on the other side of the viewport', () => {
      let items = [
        { key: '0' },
        { key: '1', fixed: 'right' },
        { key: '2' },
        { key: '3' },
        { key: '4' },
        { key: '5' },
        { key: '6' },
        { key: '7', fixed: 'right' },
        { key: '8', fixed: 'right' },
        { key: '9' },
      ];

      expect(getVisibleBoundaryWithFixed([3, 5], items))
        .toEqual([[3, 5], [7, 8]]);

      items = [
        { key: '0' },
        { key: '1', fixed: 'left' },
        { key: '2', fixed: 'left' },
        { key: '3' },
        { key: '4' },
        { key: '5' },
        { key: '6' },
        { key: '7' },
        { key: '8', fixed: 'left' },
        { key: '9' },
      ];

      expect(getVisibleBoundaryWithFixed([4, 6], items))
        .toEqual([[1, 2], [4, 6]]);
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

    it('should nullify start of interval if that greater than end', () => {
      const items = [
        { colSpan: 1 }, // 0
        { colSpan: 2 }, // 1, 2
        { colSpan: 1 }, // 3
        { colSpan: 1 }, // 4
        { colSpan: 1 }, // 5
        { colSpan: 1 }, // 6
        { colSpan: 1 }, // 7
      ];

      expect(getSpanBoundary(items, [[5, 4]], item => item.colSpan))
        .toEqual([[0, 4]]);
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

    it('should adjust an end boundary to items count', () => {
      const items = [
        { colSpan: 1 }, // 0
        { colSpan: 1 }, // 1
        { colSpan: 1 }, // 2
      ];

      expect(getSpanBoundary(items, [[0, 3]], item => item.colSpan))
        .toEqual([[0, 2]]);
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

    it('should work when visible rows not loaded', () => {
      const itemsCount = 100;
      const visibleBoundary = [[Infinity, -Infinity]];
      const spanBoundaries = [];

      expect(collapseBoundaries(itemsCount, visibleBoundary, spanBoundaries))
        .toEqual([
          [0, 99], // stub
        ]);
    });

    it('should adjust an end boundary to items count', () => {
      const itemsCount = 3;
      const visibleBoundary = [[0, 3]];
      const spanBoundaries = [
        [[0, 3]],
      ];

      expect(collapseBoundaries(itemsCount, visibleBoundary, spanBoundaries))
        .toEqual([
          [0, 2], // visible
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
    const getColSpan = (row, column) => column.colSpan;
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

      const result = [
        { column: { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_0_0` }, colSpan: 1 },
        { column: columns[1], colSpan: 4 },
        { column: columns[3], colSpan: 1 },
        { column: columns[4], colSpan: 1 },
        { column: columns[5], colSpan: 1 },
        { column: { type: TABLE_STUB_TYPE, key: `${TABLE_STUB_TYPE.toString()}_7_7` }, colSpan: 1 },
      ];

      expect(getCollapsedCells({ key: 'row' }, columns, spanBoundary, boundaries, getColSpan))
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

      expect(getCollapsedCells({ key: 'row' }, columns, spanBoundary, boundaries, getColSpan))
        .toEqual(result);
    });

    it('should not recalculate colSpan when it is not needed', () => {
      const columns = [
        { key: 'Symbol(detail)', colSpan: 1 },
        { key: 'Symbol(group_1)', colSpan: 5 },
        { key: 'Symbol(data_1)', colSpan: 1 },
        { key: 'Symbol(data_2)', colSpan: 1 },
        { key: 'Symbol(data_3)', colSpan: 1 },
      ];
      const spanBoundary = [[0, 5]];
      const boundaries = [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ];

      const result = [
        { column: columns[0], colSpan: 1 },
        { column: columns[1], colSpan: 5 },
        { column: columns[2], colSpan: 1 },
        { column: columns[3], colSpan: 1 },
        { column: columns[4], colSpan: 1 },
      ];

      expect(getCollapsedCells({ key: 'row' }, columns, spanBoundary, boundaries, getColSpan))
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
        rowsVisibleBoundary: [1, 7],
        columnsVisibleBoundary: [[1, 3]],
        totalRowCount: 9,
        offset: 0,
        getColSpan: () => 1,
        getColumnWidth: column => column.width,
        getRowHeight: row => row.height,
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

    it('should return empty result when there are no rows', () => {
      const args = {
        rows: [],
        columns: [
          { key: 0, width: 40 },
        ],
        rowsVisibleBoundary: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
        columnsVisibleBoundary: [[0, 1]],
        totalRowCount: 0,
        offset: 0,
        getColumnWidth: column => column.width,
        getRowHeight: row => row.height,
      };
      const result = {
        columns: args.columns,
        rows: [],
      };
      expect(getCollapsedGrid(args))
        .toEqual(result);
    });

    it('should return empty result when there are no columns', () => {
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

    it('should work with colspan', () => {
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
        getColumnWidth: column => column.width,
        getRowHeight: row => row.height,
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

    it('should return correct cells for second row', () => {
      const args = {
        rows: [
          { key: 'Symbol(group_1)', height: 40 },
          { key: 'Symbol(group_2)', height: 40 },
        ],
        columns: [
          { key: 'Symbol(group_3)', width: 40 },
          { key: 'Symbol(group_4)', width: 40 },
          { key: 'Symbol(select)', width: 40 },
          { key: 'Symbol(data_3)', width: 40 },
          { key: 'Symbol(data_4)', width: 40 },
          { key: 'Symbol(data_5)', width: 40 },
          { key: 'Symbol(data_6)', width: 40 },
          { key: 'Symbol(data_7)', width: 40 },
          { key: 'Symbol(data_8)', width: 40 },
          { key: 'Symbol(data_9)', width: 40 },
          { key: 'Symbol(data_10)', width: 40 },
        ],
        rowsVisibleBoundary: [0, 1],
        columnsVisibleBoundary: [[5, 10]],
        getColSpan: (row, column) => {
          if (row.key === 'Symbol(group_1)') return 1;
          if (row.key === 'Symbol(group_2)' && column.key === 'Symbol(group_4)') return 11;
          return 1;
        },
        totalRowCount: 2,
        offset: 0,
        getColumnWidth: column => column.width,
        getRowHeight: row => row.height,
      };

      const result = getCollapsedGrid(args);

      result.rows[1].cells.forEach((cell, index) => {
        if (index === 1) {
          expect(cell.colSpan).toEqual(11);
          expect(cell.column.key).toEqual('Symbol(group_4)');
        } else {
          expect(cell.colSpan).toEqual(1);
        }
      });
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

    it('should return 0 for flex columns', () => {
      expect(getWidths([
        ...columns,
        { key: 'f' },
        { key: 'g', type: TABLE_FLEX_TYPE },
      ], tableWidth, minWidth)).toMatchObject([
        20, 80,
        minWidth, minWidth,
        200,
        minWidth,
        0,
      ]);
    });
  });

  describe('getCollapsedGrids', () => {
    const args = {
      headerRows: [{ key: 'header' }],
      bodyRows: [{ key: 'row_1' }, { key: 'row_2' }, { key: 'row_3' }, { key: 'row_4' }],
      footerRows: [{ key: 'footer' }],
      loadedRowsStart: 0,
      getCellColSpan: ({ tableRow, tableColumn }) => {
        if (tableRow.key && tableRow.key.includes('row') && (tableColumn.key !== 'column_0' ||
        tableColumn.key !== 'column_4')) {
          return 3;
        }
        return 1;
      },
      viewport: {
        headerRows: [0, 0],
        footerRows: [0, 0],
        columns: [[0, 5]],
        rows: [0, 3],
      },
      columns: [
        { key: 'column_0', width: 40 },
        { key: 'column_1', width: 40 },
        { key: 'column_2', width: 40 },
        { key: 'column_3', width: 40 },
        { key: 'column_4', width: 40 },
        { key: 'column_5', width: 40 },
        { key: 'column_6', width: 40 },
        { key: 'column_7', width: 40 },
        { key: 'column_8', width: 40 },
      ],
      skipItems: [0, 0],
      totalRowCount: 4,
      getColumnWidth: column => column.width,
      getRowHeight: row => row ? row.height : 40,
    };
    it('should return same columns for body, header and footer', () => {
      const result = getCollapsedGrids(args);

      const expectedColumns = [
        { key: 'column_0', width: 40 },
        { key: 'column_1', width: 40 },
        { key: 'column_2', width: 40 },
        { key: 'column_3', width: 40 },
        { key: 'column_4', width: 40 },
        { key: 'column_5', width: 40 },
        { key: 'Symbol(stub)_6_7', type: TABLE_STUB_TYPE, width: 80 },
        { key: 'Symbol(stub)_8_8', type: TABLE_STUB_TYPE, width: 40 },
      ];
      expect(result.bodyGrid.columns).toEqual(expectedColumns);
      expect(result.headerGrid.columns).toEqual(expectedColumns);
      expect(result.footerGrid.columns).toEqual(expectedColumns);
    });

    it('should return correct height of the first and the last row', () => {
      const bodyRows = [];
      for (let i = 0; i < 20; i += 1) {
        bodyRows.push({ key: `row_${i + 1}`, height: 20 });
      }
      const result = getCollapsedGrids({
        ...args,
        skipItems: [2, 4],
        bodyRows,
        viewport: {
          headerRows: [0, 0],
          footerRows: [0, 0],
          columns: [[0, 5]],
          rows: [8, 10],
        },
        totalRowCount: 20,
      });

      expect(result.bodyGrid.rows.length).toBe(11);
      expect(result.bodyGrid.rows[0].row.height).toBe(60);
      expect(result.bodyGrid.rows[result.bodyGrid.rows.length - 1].row.height).toBe(40);
    });

    it('should return correct height, remote data, before next rows will be loaded', () => {
      const bodyRows = [];
      for (let i = 0; i < 20; i += 1) {
        bodyRows.push({ key: `row_${i + 1}`, height: 20, rowId: i });
      }
      const result = getCollapsedGrids({
        ...args,
        skipItems: [2, 4],
        bodyRows,
        viewport: {
          headerRows: [0, 0],
          footerRows: [0, 0],
          columns: [[0, 5]],
          rows: [50, 50],
        },
        totalRowCount: 200,
      });

      expect(result.bodyGrid.rows.length).toBe(1);
      expect(result.bodyGrid.rows[0].row.height).toBe(7400);
    });
  });
});

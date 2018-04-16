import {
  getVisibleBoundary,
  getSpanBoundary,
  collapseBoundaries,
  getCollapsedColumns,
  getCollapsedCells,
  getCollapsedGrid,
  STUB_TYPE,
} from './virtual-table-utils';

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

  describe('#getSpanBoundary', () => {
    it('should work with span before visible area', () => {
      const items = [
        { colSpan: 1 },
        { colSpan: 2 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
      ];

      expect(getSpanBoundary(items, [2, 4], item => item.colSpan))
        .toEqual([1, 4]);
    });

    it('should work with span after visible area', () => {
      const items = [
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 2 },
        { colSpan: 1 },
        { colSpan: 1 },
      ];

      expect(getSpanBoundary(items, [2, 4], item => item.colSpan))
        .toEqual([2, 5]);
    });

    it('should work with span greater than visible area', () => {
      const items = [
        { colSpan: 1 },
        { colSpan: 5 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
      ];

      expect(getSpanBoundary(items, [2, 4], item => item.colSpan))
        .toEqual([1, 5]);
    });
  });

  describe('#collapseBoundaries', () => {
    it('should work with spans before visible area', () => {
      const itemsCount = 9;
      const visibleBoundary = [3, 5];
      const spanBoundaries = [
        [1, 5],
        [2, 5],
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
      const visibleBoundary = [3, 5];
      const spanBoundaries = [
        [3, 7],
        [3, 6],
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
      const visibleBoundary = [3, 5];
      const spanBoundaries = [
        [1, 6],
        [2, 7],
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
      const visibleBoundary = [3, 4];
      const boundaries = [[0, 0], [1, 2], [3, 3], [4, 4], [5, 6], [7, 7]];
      const getColumnWidth = column => column.width;

      const result = [
        { type: 'stub', key: 'stub_0_0', width: 40 },
        { type: 'stub', key: 'stub_1_2', width: 80 },
        { ...columns[3] },
        { ...columns[4] },
        { type: 'stub', key: 'stub_5_6', width: 80 },
        { type: 'stub', key: 'stub_7_7', width: 40 },
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
      const spanBoundary = [1, 6];
      const boundaries = [[0, 0], [1, 2], [3, 3], [4, 4], [5, 6], [7, 7]];
      const getColSpan = column => column.colSpan;

      const result = [
        { column: { type: 'stub', key: 'stub_0_0' }, colSpan: 1 },
        { column: columns[1], colSpan: 4 },
        { column: columns[3], colSpan: 1 },
        { column: columns[4], colSpan: 1 },
        { column: columns[5], colSpan: 1 },
        { column: { type: 'stub', key: 'stub_7_7' }, colSpan: 1 },
      ];

      expect(getCollapsedCells(columns, spanBoundary, boundaries, getColSpan))
        .toEqual(result);
    });
  });

  describe('#getCollapsedGrid', () => {
    it('should work in simple case', () => {
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
        .toEqual([STUB_TYPE, ...Array.from({ length: 7 }).map(() => undefined), STUB_TYPE]);
      expect(result.columns.map(column => column.type))
        .toEqual([STUB_TYPE, ...Array.from({ length: 3 }).map(() => undefined), STUB_TYPE]);
      expect(result.rows[1].cells.map(cell => cell.colSpan))
        .toEqual([...Array.from({ length: 5 }).map(() => 1)]);
    });

    it('should return empty resule when there are no columns', () => {
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

    it('should return empty resule when there are no rows', () => {
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

    it('should work with collspan', () => {
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
        top: 0,
        left: 160,
        height: 40,
        width: 40,
        getColSpan: (row, column) => {
          if (row.key === 0 && column.key === 2) return 2;
          if (row.key === 0 && column.key === 5) return 3;
          if (row.key === 1 && column.key === 2) return 6;
          if (row.key === 2 && column.key === 0) return 9;
          return 1;
        },
      };

      const result = getCollapsedGrid(args);

      expect(result.columns.map(column => column.type))
        .toEqual([
          STUB_TYPE, STUB_TYPE,
          ...Array.from({ length: 3 }).map(() => undefined),
          STUB_TYPE, STUB_TYPE,
        ]);

      expect(result.rows[0].cells.map(cell => cell.colSpan))
        .toEqual([1, 2, 1, 1, 2, 1, 1]);
      expect(result.rows[1].cells.map(cell => cell.colSpan))
        .toEqual([1, 5, 1, 1, 1, 1, 1]);
      expect(result.rows[2].cells.map(cell => cell.colSpan))
        .toEqual([7, 1, 1, 1, 1, 1, 1]);
    });
  });
});

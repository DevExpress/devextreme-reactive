import {
  getViewport,
  checkColumnWidths,
  calculateScrollHeight,
  getScrollTop,
  getTopRowId,
  getScrollLeft,
  isColumnsWidthDifferent,
} from './helpers';
import { TOP_POSITION, BOTTOM_POSITION, LEFT_POSITION, RIGHT_POSITION } from './constants';

const estimatedRowheight = 40;
const createItems = length => (
  Array.from({ length }).map((_, i) => ({ id: i }))
);
const createRows = (length, height = estimatedRowheight) => (
  createItems(length).map(item => ({ ...item, height }))
);
const createColumns = (length, width = 150) => (
  createItems(length).map(item => ({ ...item, width }))
);

describe('#getViewport', () => {
  const getRowHeight = row => row ? row.height : estimatedRowheight;
  const getColumnWidth = col => col ? col.width : 150;
  const defaultState = {
    skipItems: [0, 0],
    containerWidth: 800,
    containerHeight: 800,
    headerHeight: 100,
    footerHeight: 100,
    viewportTop: 21000,
    viewportLeft: 1600,
  };

  const defaultGetters = {
    isDataRemote: true,
    loadedRowsStart: 500,
    bodyRows: createRows(50),
    headerRows: createRows(2),
    footerRows: createRows(2),
    columns: createColumns(40),
    viewport: {
      columns: [[0, 0]],
      rows: [0, 0],
      headerRows: [0, 0],
      footerRows: [0, 0],
      top: 0,
      left: 0,
      width: 800,
      height: 600,
    },
  };

  it('should calculate viewport for default-sized rows', () => {
    expect(getViewport(
      defaultState, defaultGetters, getRowHeight, getColumnWidth,
    ))
      .toEqual({
        top: 21000,
        left: 1600,
        width: 800,
        height: 800,
        columns: [[9, 16]],
        rows: [525, 544],
        headerRows: [0, 1],
        footerRows: [0, 1],
      });
  });

  it('should calculate viewport for custom-sized rows', () => {
    const getters = {
      ...defaultGetters,
      bodyRows: [
        ...createRows(10, 50), // 0 - 500
        ...createRows(15, 20), // 500 - 800
        ...createRows(10, 60), // 800 - 1400
      ],
      headerRows: createRows(3, 30),
      footerRows: createRows(3, 120),
      loadedRowsStart: 0,
    };
    const state = {
      ...defaultState,
      viewportTop: 400,
    };

    expect(getViewport(
      state, getters, getRowHeight, getColumnWidth,
    ))
      .toEqual({
        top: 400,
        left: 1600,
        width: 800,
        height: 800,
        columns: [[9, 16]],
        rows: [8, 31],
        headerRows: [0, 2],
        footerRows: [0, 2],
      });
  });

  it('should calculate viewport for not loaded rows', () => {
    const getters = {
      ...defaultGetters,
      loadedRowsStart: 0,
    };

    expect(getViewport(
      defaultState, getters, getRowHeight, getColumnWidth,
    ))
      .toEqual({
        top: 21000,
        left: 1600,
        width: 800,
        height: 800,
        columns: [[9, 16]],
        rows: [525, 525],
        headerRows: [0, 1],
        footerRows: [0, 1],
      });
  });

  it('should return the same viewport if it is not changed', () => {
    const initialViewport = {
      top: 21000,
      left: 1600,
      width: 800,
      height: 800,
      columns: [[9, 16]],
      rows: [525, 544],
      headerRows: [0, 1],
      footerRows: [0, 1],
    };
    const getters = {
      ...defaultGetters,
      viewport: initialViewport,
    };

    expect(getViewport(
      defaultState, getters, getRowHeight, getColumnWidth,
    ))
      .toBe(initialViewport);
  });
});

describe('#checkColumnWidths', () => {
  it('should not throw error when all column widths correct', () => {
    const tableColumns = [
      { column: { name: 'a' }, width: 100 },
      { column: { name: 'b' }, width: '100' },
      { column: { name: 'c' }, width: '100px' },
    ];

    expect(() => checkColumnWidths(tableColumns))
      .not.toThrow();
  });

  it('should throw error when some columns have auto width', () => {
    const tableColumns = [
      { column: { name: 'a' }, width: 'auto' },
      { column: { name: 'b' }, width: 100 },
      { column: { name: 'c' }, width: 100 },
    ];

    expect(() => checkColumnWidths(tableColumns))
      .toThrow(/columnExtension.*VirtualTable/);
  });

  it('should throw error when some columns does not correct', () => {
    const INVALID_VALUES =  ['%', 'em', 'rem', 'vm', 'vh', 'vmin', 'vmax'];

    INVALID_VALUES.forEach((value) => {
      const tableColumns = [
        { column: { name: 'a' }, width: `100${value}` },
        { column: { name: 'b' }, width: 100 },
        { column: { name: 'c' }, width: 100 },
      ];
      expect(() => checkColumnWidths(tableColumns))
        .toThrow(/columnExtension.*VirtualTable/);
    });
  });

  describe('#calculateScrollHeight', () => {
    const rowHeight = 100;

    it('should work', () => {
      expect(calculateScrollHeight(rowHeight, 10))
        .toEqual(1000);
    });

    it('should return "undefined" if index is not defined', () => {
      expect(calculateScrollHeight(rowHeight, undefined))
        .toEqual(undefined);
    });

    it('should return "undefined" if index is less than 0', () => {
      expect(calculateScrollHeight(rowHeight, -1))
        .toEqual(undefined);
    });
  });

  describe('#getScrollTop', () => {
    const rows = [{ rowId: 1 }, { rowId: 2 }, { rowId: 3 }, { rowId: 4 }, { rowId: 5 }];
    const rowHeight = 100;
    const rowId = 4;

    it('should work', () => {
      expect(getScrollTop(rows, rows.length, rowId, rowHeight, false))
        .toEqual(300);
    });

    it('should return 0 if scrolled to TOP_POSITION', () => {
      expect(getScrollTop(rows, rows.length, TOP_POSITION, rowHeight, false))
        .toEqual(0);
    });

    it('should return height of scroll if scrolled to BOTTOM_POSITION', () => {
      expect(getScrollTop(rows, rows.length, BOTTOM_POSITION, rowHeight, false))
        .toEqual(rowHeight * rows.length);
    });
  });

  describe('#getTopRowId', () => {
    const rows = [{ rowId: 1 }, { },  { rowId: 2 }, { rowId: 3 }, { rowId: 4 }, { rowId: 5 }];
    const viewportBase = { rows: [0, 0] };

    it('should work', () => {
      expect(getTopRowId(viewportBase, rows, false))
        .toEqual(rows[viewportBase.rows[0]].rowId);
    });

    it('should work if row does not have rowId', () => {
      const viewport = { rows: [1, 1] };

      expect(getTopRowId(viewport, rows, false))
        .toEqual(rows[viewport.rows[0]].rowId);
    });

    it('should return undefined when remote data', () => {
      expect(getTopRowId(viewportBase, rows, true))
        .toBe(undefined);
    });

    it('should return undefined when viewport or viewport rows not defined', () => {
      expect(getTopRowId(undefined, rows, false))
        .toBe(undefined);
      expect(getTopRowId({ }, rows, false))
        .toBe(undefined);
    });

    it('should return undefined when rows not defined', () => {
      expect(getTopRowId(viewportBase, undefined, false))
        .toBe(undefined);
    });

    it('should return undefined if current row index more than rows count', () => {
      const viewport = { rows: [10, 10] };

      expect(getTopRowId(viewport, rows, false))
        .toBe(undefined);
    });
  });
});

describe('#getScrollLeft', () => {
  it('should return undefined if columnId is not defined', () => {
    expect(getScrollLeft(3, 10)).toBe(undefined);
  });

  it('should return scroll left = 0, columnId is LEFT_POSITION', () => {
    expect(getScrollLeft(3, 10, LEFT_POSITION)).toBe(0);
  });

  it('should return scroll left, columnId is RIGHT_POSITION', () => {
    expect(getScrollLeft(3, 10, RIGHT_POSITION)).toBe(30);
  });
});

describe('#isColumnsWidthDifferent', () => {
  it('should return false, columns reordering only', () => {
    const prevColumns = [
      { width: '20px', key: 'column1' },
      { width: '10px', key: 'column2' },
      { width: '5px', key: 'column3' },
    ] as any;
    const columns = [
      { width: '10px', key: 'column2' },
      { width: '20px', key: 'column1' },
      { width: '5px', key: 'column3' },
    ] as any;
    expect(isColumnsWidthDifferent(prevColumns, columns)).toBeFalsy();
  });

  it('should return true, columns width changed', () => {
    const prevColumns = [
      { width: 20, key: 'column1' },
      { width: 10, key: 'column2' },
      { width: 5, key: 'column3' },
    ] as any;
    const columns = [
      { width: 20, key: 'column1' },
      { width: 20, key: 'column2' },
      { width: 5, key: 'column3' },
    ] as any;
    expect(isColumnsWidthDifferent(prevColumns, columns)).toBeTruthy();
  });

  it('should return true, columns changed', () => {
    const prevColumns = [
      { width: 20, key: 'column1' },
      { width: 10, key: 'column2' },
      { width: 5, key: 'column3' },
    ] as any;
    const columns = [
      { width: 20, key: 'column1' },
      { width: 10, key: 'column2' },
      { width: 5, key: 'column4' },
    ] as any;
    expect(isColumnsWidthDifferent(prevColumns, columns)).toBeTruthy();
  });
});

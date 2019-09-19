import { getViewport, checkColumnWidths } from './helpers';

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
  const getRowHeight = row => row.height;
  const getColumnWidth = col => col.width;
  const defaultState = {
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
      defaultState, defaultGetters, estimatedRowheight, getRowHeight, getColumnWidth,
    ))
      .toEqual({
        top: 21000,
        left: 1600,
        width: 800,
        height: 800,
        columns: [[9, 16]],
        rows: [525, 539],
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
      state, getters, estimatedRowheight, getRowHeight, getColumnWidth,
    ))
      .toEqual({
        top: 400,
        left: 1600,
        width: 800,
        height: 800,
        columns: [[9, 16]],
        rows: [8, 28],
        headerRows: [0, 2],
        footerRows: [0, 0],
      });
  });

  it('should calculate viewport for not loaded rows', () => {
    const getters = {
      ...defaultGetters,
      loadedRowsStart: 0,
    };

    expect(getViewport(
      defaultState, getters, estimatedRowheight, getRowHeight, getColumnWidth,
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
      rows: [525, 539],
      headerRows: [0, 1],
      footerRows: [0, 1],
    };
    const getters = {
      ...defaultGetters,
      viewport: initialViewport,
    };

    expect(getViewport(
      defaultState, getters, estimatedRowheight, getRowHeight, getColumnWidth,
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
});

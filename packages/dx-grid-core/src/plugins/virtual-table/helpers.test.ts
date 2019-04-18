import { pageTriggersMeta } from './helpers';

export const generateArguments = ({
  viewportTop = 0, visibleRowsStart = 0, visibleRowsEnd = 20,
  loadedRowsStart = 0, rowsLength = 200,
}) => ({
  gridGeometry: {
    visibleRowBoundaries: {
      viewportTop,
      body: {
        start: visibleRowsStart,
        end: visibleRowsEnd,
      },
    },
    viewportTop,
    containerHeight: 400,
    estimatedRowHeight: 40,
  },
  getters: {
    virtualRows: {
      start: loadedRowsStart,
      rows: Array.from({ length: rowsLength }).map(() => {}),
    },
    pageSize: 100,
  },
});

describe('#pageTriggersMeta', () => {
  it('should return null when rows not loaded', () => {
    const { gridGeometry, getters } = generateArguments({ rowsLength: 0 });

    expect(pageTriggersMeta(gridGeometry, getters))
      .toBeNull();
  });

  describe('inside visible range', () => {
    it('should calculate page triggers when grid is not scrolled', () => {
      const { gridGeometry, getters } = generateArguments({});

      expect(pageTriggersMeta(gridGeometry, getters))
        .toEqual({
          topTriggerIndex: 0,
          topTriggerPosition: -200, // 10 rows up
          bottomTriggerIndex: 100, // next page boundary
          bottomTriggerPosition: 3800, // 100'th row position in the midlle of viewport
        });
    });

    it('should calculate same page triggers when grid is scrolled half a page', () => {
      const { gridGeometry, getters } = generateArguments({
        visibleRowsStart: 30,
        visibleRowsEnd: 50,
        viewportTop: 1200,
      });

      expect(pageTriggersMeta(gridGeometry, getters))
        .toEqual({
          topTriggerIndex: 0,
          topTriggerPosition: -200,
          bottomTriggerIndex: 100,
          bottomTriggerPosition: 3800,
        });
    });

    it('should consider virtual rows start', () => {
      const { gridGeometry, getters } = generateArguments({
        visibleRowsStart: 230,
        visibleRowsEnd: 250,
        viewportTop: 9200,
        loadedRowsStart: 100,
        rowsLength: 300,
      });

      expect(pageTriggersMeta(gridGeometry, getters))
        .toEqual({
          topTriggerIndex: 200, // border between 2 and 3 pages
          topTriggerPosition: 7800,
          bottomTriggerIndex: 300, // next page boundary
          bottomTriggerPosition: 11800,
        });
    });

    it('should correctly calculate triggers when only part of loaded rows is visible', () => {
      const { gridGeometry, getters } = generateArguments({
        visibleRowsStart: 390,
        visibleRowsEnd: 410,
        viewportTop: 15600,
        loadedRowsStart: 100,
        rowsLength: 300,
      });

      expect(pageTriggersMeta(gridGeometry, getters))
        .toEqual({
          topTriggerIndex: 200,
          topTriggerPosition: 7800,
          bottomTriggerIndex: 300, // border between 3 and 4 pages
          bottomTriggerPosition: 11800,
        });
    });
  });

  describe('outside the visible range', () => {
    it('should calculate page triggers when loaded rows are below viewport', () => {
      const { gridGeometry, getters } = generateArguments({
        visibleRowsStart: 200,
        visibleRowsEnd: 220,
        viewportTop: 8000,
        loadedRowsStart: 400,
        rowsLength: 300,
      });

      expect(pageTriggersMeta(gridGeometry, getters))
        .toEqual({
          topTriggerIndex: 500,
          topTriggerPosition: 19800,
          bottomTriggerIndex: 600,
          bottomTriggerPosition: 23800,
        });
    });

    it('should calculate page triggers when loaded rows are above viewport', () => {
      const { gridGeometry, getters } = generateArguments({
        visibleRowsStart: 1000,
        visibleRowsEnd: 1020,
        viewportTop: 40000,
        loadedRowsStart: 400,
        rowsLength: 300,
      });

      expect(pageTriggersMeta(gridGeometry, getters))
        .toEqual({
          topTriggerIndex: 500,
          topTriggerPosition: 19800,
          bottomTriggerIndex: 600,
          bottomTriggerPosition: 23800,
        });
    });
  });
});

import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, StateHelper, ActionFn, Getters, Actions,
} from '@devexpress/dx-react-core';
import { VirtualTableStateProps, VirtualTableStateState } from '../types';
import { rowIdGetter } from '@devexpress/dx-grid-core';

const rawRowsComputed = ({ rows }: Getters) => rows;

const virtualRowsComputed = ({
  start: currentStart, rows, virtualRowsCache: cache, virtualPageSize,
}: Getters) => {
  let result = cache.rows;
  if (cache.start + cache.rows.length === currentStart) {
    result = cache.rows.concat(rows);
  } else if (currentStart + rows.length === cache.start) {
    result = rows.concat(cache.rows);
  }

  console.log(
    `virtual rows, cache.start ${cache.start} cache rows ${cache.rows.length} current start ${currentStart}, rows length %c ${result.length}`, "color: red;");
  // console.log('virtual rows', result.length)
  return result;
};

const loadedRowsStartComputed = (
  { start, virtualPageSize, virtualRowsCache: cache, loadedRowsStart }: Getters,
) => {
  const cacheStart = cache.start !== undefined ? cache.start : start;
  let result;
  // debugger
  if (virtualPageSize * 2 < Math.abs(start - cacheStart)) {
    result = start;
  } else {
    result = Math.min(start, cacheStart)
  }
  // console.log('loaded start=',result, 'cache start', cacheStart, 'start', start, virtualPageSize, Math.abs(start - cacheStart))
  console.log(`loaded start ${loadedRowsStart} -> ${result}`)
  // console.log('loaded start', result)
  return result;

};

const loadedRowsCountComputed = ({ rows, virtualRowsCache: cache }: Getters) => {
  return rows.length + (cache.rows && cache.rows.length || 0);
};

const rowIdGetterComputed = ({
  rows: getterRows,
}: Getters) => {
  return rowIdGetter(null!, getterRows);
};

// tslint:disable-next-line: max-line-length
export class VirtualTableState extends React.PureComponent<VirtualTableStateProps, VirtualTableStateState> {
  static defaultProps = {
    defaultOverscan: 50,
  };
  requestNextPageAction: (payload: any, getters: Getters, actions: Actions) => void;
  requestTimer: any = 0;

  constructor(props) {
    super(props);

    this.state = {
      rowCount: props.rowCount || 0,
      start: props.start || 0,
      viewportTop: 0,
      virtualRowsCache: { start: 0, rows: [] },
      requestedPageIndex: undefined,
      currentVirtualPageTop: 0,
      lastQueryTime: 0,
      loadedRowsStart: 0,
      pageIndexes: { start: 0, end: 2 },
      // rowsCache: [],
    };

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        viewportTop: () => {
          const { onViewportTopChange } = this.props;
          return onViewportTopChange;
        },
        visibleBoundaries: () => {
          return () => {}
        },
      },
    );

    const mergeRows = (pageIndexes, cache, rows, start, pageSize) => {
      const startPage = pageIndexes.start;
      const cacheStart = Math.floor(cache.start / pageSize);
      const cacheEnd = cacheStart + Math.floor(cache.rows.length / pageSize);

      let result = [];
      for (let index = pageIndexes.start; index <= pageIndexes.end; index += 1) {
        const rowIndex = index * pageSize;
        if (rowIndex === start) {
          result = result.concat(rows);
        } else if (cacheStart <= index && index < cacheEnd) {
          const skip = (index - startPage) * pageSize;
          result = result.concat(cache.rows.slice(skip, pageSize));
        }
      }
      return result;
    };

    const rowToPageIndex = (rowIndex, pageSize) => Math.floor(rowIndex / pageSize);
    const recalculatePageIndexes = (loadedStart, loadedCount, middleIndex, pageSize) => {
      const currentPageIndex = rowToPageIndex(middleIndex, pageSize);

      const newFirstIndex = Math.max(0, currentPageIndex - 1);
      const newLastIndex = currentPageIndex + 1;

      return {
        start: newFirstIndex,
        end: newLastIndex,
        // requestedRange: currentPageIndex + offset,
      };
    };

    const calculateRequestedRange = (currentRange, newRange, middleIndex) => {
      if (Math.abs(currentRange.start - newRange.start) > 2) {
        const useFirstHalf = middleIndex % 100 < 50;
        const start = useFirstHalf ? newRange.start : newRange.start + 1;
        return { start, end: start + 1 };
      }
      if (currentRange.start < newRange.start && newRange.start < currentRange.end) {
        return {
          start: currentRange.end,
          end: newRange.end,
        };
      }
      if (newRange.start < currentRange.start && currentRange.start < newRange.end) {
        return {
          start: newRange.start,
          end: currentRange.start,
        };
      }
      return {};
    };

    const recalculateCache = (cache, rows, start, pageIndexes) => {

    };

    this.requestNextPageAction = (rowIndex: any,
      { virtualPageSize, loadedRowsStart, loadedRowsCount, rawRows },
      ) => {
      const { requestedPageIndex, virtualRowsCache, pageIndexes } = this.state;
      const { start, getRows } = this.props;

      const newPageIndexes = recalculatePageIndexes(
        loadedRowsStart, loadedRowsCount, rowIndex, virtualPageSize,
      );
      console.log(pageIndexes)
      const requestedRange = calculateRequestedRange(pageIndexes, newPageIndexes, rowIndex);

      const newPageIndex = requestedRange.start;
      const pageStart = newPageIndex * virtualPageSize;
      const loadCount = (requestedRange.end + requestedRange.start + 1) * virtualPageSize;

      if (newPageIndex !== requestedPageIndex) {
        if (this.requestTimer !== 0) {
          clearTimeout(this.requestTimer);
        }
        this.requestTimer = setTimeout(() => {
          getRows(pageStart, loadCount);
          // console.log(now - lastQueryTime)

          const loadedPages = Math.floor(loadedRowsCount / virtualPageSize);
          let cacheStart = start;
          let cacheRows = rawRows;
          if (loadedPages > 2) {
            cacheStart = loadDownPage
            ? virtualRowsCache.start + virtualPageSize
            : virtualRowsCache.start - virtualPageSize;

            cacheRows = virtualRowsCache.rows.slice(virtualPageSize).concat(rawRows);
          }
          const newLoadedRowsStart = Math.min(cacheStart, start);
          console.log(
            rowIndex, ' get rows, skip', pageStart,
            'current start', start,
            'page index', newPageIndex,
            `cache start ${virtualRowsCache.start} -> ${cacheStart}`,
            `loaded start ${loadedRowsStart} -> ${newLoadedRowsStart}`,
            // 'raw rows', rawRows.length,
            // 'cache start', cacheStart, 'rows', cacheRows.length,
          )

          this.setState({
            loadedRowsStart: newLoadedRowsStart,
            requestedPageIndex: newPageIndex,
            // lastQueryTime: Date.now(),
            virtualRowsCache: {
              start: cacheStart,
              rows: cacheRows,
            },
          });
        }, 50);
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      start = prevState.start,
    } = nextProps;

    return {
      start,
    };
  }

  componentDidMount() {
    const { getRows } = this.props;
    getRows(0, 200);
  }

  render() {
    const {
      viewportTop,
      virtualRowsCache,
      loadedRowsStart,
    } = this.state;
    const { start, rowCount } = this.props;

    return (
      <Plugin
        name="VirtualTableState"
      >
        <Getter name="start" value={start} />
        <Getter name="virtualRowsCache" value={virtualRowsCache} />
        <Getter name="virtualPageSize" value={100} />
        <Getter name="virtualPageOverscan" value={20} />
        <Getter name="totalRowCount" value={rowCount} />
        <Getter name="loadedRowsCount" computed={loadedRowsCountComputed} />
        <Getter name="rawRows" computed={rawRowsComputed} />
        <Getter name="rows" computed={virtualRowsComputed} />
        <Getter name="loadedRowsStart" value={loadedRowsStart} />
        {/* <Getter name="loadedRowsStart" computed={loadedRowsStartComputed} /> */}
        <Getter name="getRowId" computed={rowIdGetterComputed} />

        <Action name="requestNextPage" action={this.requestNextPageAction} />
      </Plugin>
    );
  }
}

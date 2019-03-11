import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, StateHelper, ActionFn, Getters, Actions,
} from '@devexpress/dx-react-core';
import { VirtualTableStateProps, VirtualTableStateState } from '../types';
import { rowIdGetter, intervalUtil, Interval } from '@devexpress/dx-grid-core';
import { shallowEqual } from '@devexpress/dx-core';

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
      viewportTop: 0,
      virtualRowsCache: { start: 0, rows: [] },
      requestedPageIndex: undefined,
      currentVirtualPageTop: 0,
      lastQueryTime: 0,
      loadedRowsStart: 0,
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

    const mergeRows = (pageIndexes, cache, rows, rowsStart, pageSize) => {
      const startPage = pageIndexes.start;
      const cacheStart = Math.floor(cache.start / pageSize);
      const cacheEnd = cacheStart + Math.floor(cache.rows.length / pageSize);

      let result = [];
      let start = null;
      for (let index = pageIndexes.start; index <= pageIndexes.end; index += 1) {
        const rowIndex = index * pageSize;
        if (rowIndex === rowsStart) {
          result = result.concat(rows);
        } else if (cacheStart <= index && index < cacheEnd) {
          const skip = (index - startPage) * pageSize;
          result = result.concat(cache.rows.slice(skip, pageSize));
        }
      }
      return result;
    };

    const rowToPageIndex = (rowIndex, pageSize) => Math.floor(rowIndex / pageSize);
    const recalculateBounds = (middleIndex, pageSize) => {
      const currentPageIndex = rowToPageIndex(middleIndex, pageSize);

      const newFirstIndex = Math.max(0, currentPageIndex - 1);
      const newLastIndex = currentPageIndex + 2;

      return {
        start: newFirstIndex * pageSize,
        end: newLastIndex * pageSize,
        // requestedRange: currentPageIndex + offset,
      };
    };

    const calculateRequestedRange = (loadedInterval, newRange, middleIndex, pageSize) => {
      if (Math.abs(loadedInterval.start - newRange.start) > 2 * pageSize) {
        const useFirstHalf = middleIndex % pageSize < 50;
        const start = useFirstHalf ? newRange.start : newRange.start + 1;
        return { start, end: start + 2 * pageSize };
      }
      if (loadedInterval.start <= newRange.start && newRange.start <= loadedInterval.end) {
        return {
          start: loadedInterval.end,
          end: newRange.end,
        };
      }
      if (newRange.start <= loadedInterval.start && loadedInterval.start <= newRange.end) {
        return {
          start: newRange.start,
          end: loadedInterval.start,
        };
      }
      return {};
    };

    const recalculateCache = (cache, rows, start, currentInterval, pageSize) => {
      // const currentInterval = {
      //   start: pageIndexes.start * pageSize,
      //   end: pageIndexes.end * pageSize,
      // };
      const cacheInterval = {
        start: cache.start,
        end: cache.start + cache.rows.length,
      };
      const rowsInterval = {
        start,
        end: start + rows.length,
      };

      const clippedCacheInterval = intervalUtil.intersect(cacheInterval, currentInterval);
      const clippedRowsInterval = intervalUtil.intersect(rowsInterval, currentInterval);
      console.log(currentInterval, 'cache', cacheInterval, clippedCacheInterval, 'rows', rowsInterval, clippedRowsInterval)

      const breakpoints = [
        clippedRowsInterval.start,
        clippedRowsInterval.end,
        clippedCacheInterval.start,
        clippedCacheInterval.end,
      ]
        .filter(i => 0 <= i && i < Number.POSITIVE_INFINITY)
        .sort();

      let cacheRows = [];
      console.log('bp', breakpoints)

      const pluckSubarray = (source, sourceStart, left, right) => (
        source.slice(left - sourceStart, right - sourceStart)
      );

      if (breakpoints.length > 1) {
        for (let i = 0; i < breakpoints.length - 1; i += 1) {
          const left = breakpoints[i];
          const right = breakpoints[i + 1];
          const chunk = clippedRowsInterval.start <= left && right <= clippedRowsInterval.end
            ? pluckSubarray(rows, start, left, right)
            : pluckSubarray(cache.rows, cache.start, left, right);
          cacheRows = cacheRows.concat(chunk);
        }
      }

      const res = {
        start: breakpoints[0],
        rows: cacheRows,
      };
      console.log('new cache', res);
      return res;
    };

    this.requestNextPageAction = (rowIndex: any,
      { virtualPageSize, loadedRowsStart, loadedRowsCount, rawRows },
    ) => {
      const { requestedPageIndex, virtualRowsCache } = this.state;
      const { start, getRows } = this.props;

      const newBounds = recalculateBounds(rowIndex, virtualPageSize);
      const loadedInterval = { start: loadedRowsStart, end: loadedRowsStart + loadedRowsCount };

      const requestedRange = calculateRequestedRange(
        loadedInterval, newBounds, rowIndex, virtualPageSize,
      );

      const newPageIndex = requestedRange.start;
      const pageStart = newPageIndex;
      const loadCount = (requestedRange.end - requestedRange.start);

      console.log(
        rowIndex, newBounds, requestedRange, 'req', newPageIndex, requestedPageIndex, loadCount,
      );

      if (newPageIndex !== requestedPageIndex && loadCount > 0) {
        if (this.requestTimer !== 0) {
          clearTimeout(this.requestTimer);
        }
        this.requestTimer = setTimeout(() => {
          getRows(pageStart, loadCount);
          console.log('get rows')

          const newCache = recalculateCache(virtualRowsCache, rawRows, start, newBounds, virtualPageSize);

          // console.log(
          //   rowIndex, ' get rows, skip', pageStart,
          //   'current start', start,
          //   'page index', newPageIndex,
          //   `cache start ${virtualRowsCache.start} -> ${newCache.start}`,
          console.log(`loaded start ${loadedRowsStart} -> ${newCache.start}, start: ${start}, rows`, rawRows)
          //   // 'raw rows', rawRows.length,
          //   // 'cache start', cacheStart, 'rows', cacheRows.length,
          // )

          this.setState({
            loadedRowsStart: newCache.start,
            requestedPageIndex: newPageIndex,
            virtualRowsCache: newCache,
          });
        }, 50);
      }
    };
  }

  componentDidMount() {
    const { getRows } = this.props;
    getRows(0, 200);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { virtualRowsCache: currentCache } = this.state;
  //   if (nextState.virtualRowsCache !== currentCache) {
  //     return false;
  //   }

  //   return (
  //     !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  //   );
  // }

  render() {
    const {
      virtualRowsCache,
      loadedRowsStart,
    } = this.state;
    const { start, rowCount } = this.props;


    const cacheComputed = ({ virtualRowsCache, rows }) => {

    };

    // here we should save virtual rows to cache
    // then compute virtual rows as cache + rows
    // thus even single row change would be cached
    // and real-time data changes would be possible

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
        {/* <Getter name="loadedRowsStart" value={loadedRowsStart} /> */}
        <Getter name="loadedRowsStart" computed={loadedRowsStartComputed} />
        <Getter name="getRowId" computed={rowIdGetterComputed} />

        <Action name="requestNextPage" action={this.requestNextPageAction} />
      </Plugin>
    );
  }
}

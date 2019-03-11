import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, StateHelper, ActionFn, Getters, Actions,
} from '@devexpress/dx-react-core';
import { VirtualTableStateProps, VirtualTableStateState } from '../types';
import {
  rowIdGetter, intervalUtil, Interval, mergeRows, recalculateBounds,
  calculateRequestedRange, recalculateCache,
} from '@devexpress/dx-grid-core';
// import { shallowEqual } from '@devexpress/dx-core';

const rawRowsComputed = ({ rows }: Getters) => rows;

const virtualRowsComputed = ({
  start, rows, virtualRowsCache: cache, virtualPageSize,
}: Getters) => {
  const rowsInterval = { start, end: start + rows.length };
  const cacheInterval = { start: cache.start, end: cache.start + cache.rows.length };
  let result = mergeRows(rowsInterval, cacheInterval, rows, cache.rows, start, cache.start);

  // console.log('virtual rows start', result.start, result.rows.length)

  return result;
};

const rowsComputed = ({ virtualRows }: Getters) => virtualRows.rows;
const loadedRowsStartComputed = ({ virtualRows }: Getters) => virtualRows.start;

const loadedRowsCountComputed = ({ virtualRows }: Getters) => virtualRows.rows.length;

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


    this.requestNextPageAction = (rowIndex: any,
      { virtualPageSize, loadedRowsStart, loadedRowsCount, rawRows, totalRowCount },
    ) => {
      const { requestedPageIndex, virtualRowsCache } = this.state;
      const { start, getRows } = this.props;

      const newBounds = recalculateBounds(rowIndex, virtualPageSize, totalRowCount);
      const loadedInterval = { start: loadedRowsStart, end: loadedRowsStart + loadedRowsCount };

      const requestedRange = calculateRequestedRange(
        loadedInterval, newBounds, rowIndex, virtualPageSize,
      );

      const newPageIndex = requestedRange.start;
      const pageStart = newPageIndex;
      const loadCount = (requestedRange.end - requestedRange.start);

      // console.log(
      //   rowIndex, newBounds, 'requested', requestedRange, 'loaded', loadedInterval, 'req', newPageIndex, requestedPageIndex, loadCount,
      // );

      if (newPageIndex !== requestedPageIndex && loadCount > 0) {
        if (this.requestTimer !== 0) {
          clearTimeout(this.requestTimer);
        }
        this.requestTimer = setTimeout(() => {
          getRows(pageStart, loadCount);

          const newCache = recalculateCache(virtualRowsCache, rawRows, start, newBounds);

          this.setState({
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

    return (
      <Plugin
        name="VirtualTableState"
      >
        <Getter name="start" value={start} />
        <Getter name="virtualRowsCache" value={virtualRowsCache} />
        <Getter name="virtualPageSize" value={100} />
        {/* <Getter name="virtualPageOverscan" value={20} /> */}
        <Getter name="totalRowCount" value={rowCount} />
        <Getter name="rawRows" computed={rawRowsComputed} />
        <Getter name="virtualRows" computed={virtualRowsComputed} />
        <Getter name="rows" computed={rowsComputed} />
        <Getter name="loadedRowsStart" computed={loadedRowsStartComputed} />
        <Getter name="loadedRowsCount" computed={loadedRowsCountComputed} />
        <Getter name="getRowId" computed={rowIdGetterComputed} />

        <Action name="requestNextPage" action={this.requestNextPageAction} />
      </Plugin>
    );
  }
}

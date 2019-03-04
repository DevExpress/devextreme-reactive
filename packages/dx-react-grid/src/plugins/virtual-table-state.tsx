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
  let result = rows;
  if (cache.start + cache.rows.length === currentStart) {
    result = cache.rows.concat(rows);
  } else if (currentStart + rows.length === cache.start) {
    result = rows.concat(cache.rows);
  }
  console.log(`virtual rows, cache.start ${cache.start} current start ${currentStart}, rows length %c ${result.length}`, "color: red;");
  // console.log('virtual rows', result)
  return result;
};

const loadedRowsStartComputed = (
  { start, virtualPageSize, virtualRowsCache: cache }: Getters,
) => {
  const cacheStart = cache.start !== undefined ? cache.start : start;
  // console.log('loaded start', cacheStart, start, virtualPageSize, Math.abs(start - cacheStart))
  if (virtualPageSize < Math.abs(start - cacheStart)) {
    return start;
  }
  return Math.min(start, cacheStart)
}

const loadedRowsCountComputed = ({ rows, virtualRowsCache: cache }: Getters) => {
  return rows.length + (cache.rows && cache.rows.length || 0);
}

const rowIdGetterComputed = ({
  rows: getterRows,
}: Getters) => {
  return rowIdGetter(null!, getterRows);
}

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
      requestedStartIndex: undefined,
      currentVirtualPageTop: 0,
      lastQueryTime: 0,
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

    this.requestNextPageAction = (rowIndex: any,
      { virtualPageSize, virtualPageOverscan, rawRows, virtualRowsCache },
      ) => {
      const { requestedStartIndex } = this.state;
      const { start, getRows } = this.props;

      let newAdjustedIndex = Math.round(rowIndex / virtualPageSize) * virtualPageSize;
      if (newAdjustedIndex < virtualRowsCache.start + virtualRowsCache.rows.length) {
        newAdjustedIndex += virtualPageSize;
      }

      // let newAdjustedIndex = rowIndex > start + virtualPageSize / 2
      //   ? start + virtualPageSize
      //   : start - virtualPageSize;

      // if (rowIndex >= start + virtualPageSize) {
      //   newAdjustedIndex = rowIndex - virtualPageOverscan;
      // } else if (rowIndex <= start - virtualPageSize) {
      //   newAdjustedIndex = rowIndex + virtualPageOverscan;
      // }

      if (newAdjustedIndex !== requestedStartIndex) {
        if (this.requestTimer !== 0) {
          clearTimeout(this.requestTimer);
        }
        this.requestTimer = setTimeout(() => {
          // const rsi = requestedStartIndex;
          // if (newAdjustedIndex % 100 !== 0) debugger
          console.log(rowIndex, ' get rows, skip', newAdjustedIndex, 'current start', start)
          getRows(newAdjustedIndex, virtualPageSize);
          // console.log(now - lastQueryTime)
          this.setState({
            requestedStartIndex: newAdjustedIndex,
            lastQueryTime: Date.now(),
            virtualRowsCache: {
              start,
              rows: rawRows,
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
        <Getter name="loadedRowsStart" computed={loadedRowsStartComputed} />
        <Getter name="getRowId" computed={rowIdGetterComputed} />

        <Action name="requestNextPage" action={this.requestNextPageAction} />
      </Plugin>
    );
  }
}

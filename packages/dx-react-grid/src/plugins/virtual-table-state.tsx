import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, StateHelper, ActionFn, Getters, Actions,
} from '@devexpress/dx-react-core';
import { VirtualTableStateProps, VirtualTableStateState } from '../types';
import { rowIdGetter } from '@devexpress/dx-grid-core';

const rawRowsComputed = ({ rows }: Getters) => rows;

const virtualRowsComputed = ({
  start: currentStart, rows, virtualRowsCache: cache,
}: Getters) => {
  let result = rows;
  if (cache.start < currentStart) {
    result = cache.rows.concat(rows);
  }
  if (currentStart < cache.start) {
    result = rows.concat(cache.rows);
  }
  console.log('recompute virtual rows')
  return result;
};

const loadedRowsStartComputed = (
  { start, virtualPageSize, virtualRowsCache: cache }: Getters,
) => {
  const cacheStart = cache.start !== undefined ? cache.start : start;
  console.log('loaded start', cacheStart, start, virtualPageSize, Math.abs(start - cacheStart))
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
      virtualRowsCache: [],
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

    this.requestNextPageAction = (payload: any, getters: Getters, actions: Actions) => {
      const { requestedStartIndex, lastQueryTime } = this.state;
      const { start, getRows } = this.props;

      let newAdjustedIndex = payload > start + getters.virtualPageSize / 2
        ? start + getters.virtualPageSize
        : start - getters.virtualPageSize;

      if (payload > start + getters.virtualPageSize) {
        newAdjustedIndex = payload - getters.virtualPageOverscan;
      } else if (payload < start - getters.virtualPageSize) {
        newAdjustedIndex = payload + getters.virtualPageOverscan;
      }

      if (newAdjustedIndex !== requestedStartIndex) {
        if (this.requestTimer !== 0) {
          clearTimeout(this.requestTimer);
        }
        this.requestTimer = setTimeout(() => {
          console.log('get rows ', newAdjustedIndex, start)
          getRows(newAdjustedIndex, getters.virtualPageSize);
          // console.log(now - lastQueryTime)
          this.setState({
            requestedStartIndex: newAdjustedIndex,
            lastQueryTime: Date.now(),
            virtualRowsCache: {
              start,
              rows: getters.rawRows,
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
    getRows(0, 100);
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

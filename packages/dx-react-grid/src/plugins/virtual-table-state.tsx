import * as React from 'react';
import { Getter, Action, Plugin, Getters } from '@devexpress/dx-react-core';
import {
  recalculateBounds, calculateRequestedRange, virtualRowsWithCache,
  trimRowsToInterval, intervalUtil, emptyVirtualRows, plainRows, loadedRowsStart,
} from '@devexpress/dx-grid-core';
import { VirtualTableStateProps, VirtualTableStateState } from '../types';

const virtualRowsComputed = (
  { start, rows, virtualRowsCache }: Getters,
) => virtualRowsWithCache(start, rows, virtualRowsCache);

const rowsComputed = ({ virtualRows }: Getters) => plainRows(virtualRows);

const loadedRowsStartComputed = ({ virtualRows }: Getters) => loadedRowsStart(virtualRows);

// tslint:disable-next-line: max-line-length
export class VirtualTableState extends React.PureComponent<VirtualTableStateProps, VirtualTableStateState> {
  static defaultProps = {
    virtualPageSize: 100,
  };
  requestTimer: any = 0;

  constructor(props) {
    super(props);

    this.state = {
      rowCount: props.rowCount || 0,
      viewportTop: 0,
      virtualRowsCache: emptyVirtualRows,
      requestedPageIndex: undefined,
    };
  }

  requestNextPageAction = (
    rowIndex: number,
    { virtualRows, virtualPageSize, totalRowCount }: Getters,
  ) => {
    const { requestedPageIndex } = this.state;
    const { getRows } = this.props;

    const newBounds = recalculateBounds(rowIndex, virtualPageSize, totalRowCount);
    const loadedInterval = intervalUtil.getRowsInterval(virtualRows);
    const requestedRange = calculateRequestedRange(
      loadedInterval, newBounds, rowIndex, virtualPageSize,
    );

    const newPageIndex = requestedRange.start;
    const loadCount = (requestedRange.end - requestedRange.start);

    if (newPageIndex !== requestedPageIndex && loadCount > 0) {
      if (this.requestTimer !== 0) {
        clearTimeout(this.requestTimer);
      }
      this.requestTimer = setTimeout(() => {
        getRows(newPageIndex, loadCount);

        const virtualRowsCache = trimRowsToInterval(virtualRows, newBounds);

        this.setState({
          virtualRowsCache,
          requestedPageIndex: newPageIndex,
        });
      }, 50);
    }
  }

  componentDidMount() {
    const { getRows, virtualPageSize } = this.props;
    getRows(0, 2 * virtualPageSize!);
  }

  render() {
    const { virtualRowsCache } = this.state;
    const { start, rowCount, virtualPageSize } = this.props;

    return (
      <Plugin
        name="VirtualTableState"
      >
        <Getter name="remoteDataEnabled" value />
        <Getter name="start" value={start} />
        <Getter name="virtualRowsCache" value={virtualRowsCache} />
        <Getter name="virtualPageSize" value={virtualPageSize} />
        <Getter name="totalRowCount" value={rowCount} />

        <Getter name="virtualRows" computed={virtualRowsComputed} />
        <Getter name="rows" computed={rowsComputed} />
        <Getter name="loadedRowsStart" computed={loadedRowsStartComputed} />

        <Action name="requestNextPage" action={this.requestNextPageAction} />
      </Plugin>
    );
  }
}

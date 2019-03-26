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
      viewportTop: 0,
      virtualRowsCache: emptyVirtualRows,
      requestedPageIndex: undefined,
      availableRowCount: props.rowCount || 0,
    };
  }

  requestNextPageAction = (
    rowIndex: number,
    { virtualRows, virtualPageSize }: Getters,
  ) => {
    const { requestedPageIndex, availableRowCount: stateAvailableCount } = this.state;
    const { getRows, rowCount, infinite } = this.props;

    const newBounds = recalculateBounds(rowIndex, virtualPageSize, rowCount);
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

        const newRowCount = infinite
          ? Math.max(newBounds.end + loadCount, stateAvailableCount)
          : rowCount;

        this.setState({
          virtualRowsCache,
          availableRowCount: newRowCount,
          requestedPageIndex: newPageIndex,
        });
      }, 50);
    }
  }

  componentDidMount() {
    const { getRows, virtualPageSize, infinite, rowCount } = this.props;
    getRows(0, 2 * virtualPageSize!);

    const newRowCount = infinite ? 2 * virtualPageSize! : rowCount;
    this.setState({
      availableRowCount: newRowCount,
    });
  }

  render() {
    const { virtualRowsCache, availableRowCount: stateRowCount } = this.state;
    const { start, virtualPageSize, loading, infinite, rowCount } = this.props;

    const availableRowCount = infinite ? stateRowCount : rowCount;

    return (
      <Plugin
        name="VirtualTableState"
      >
        <Getter name="remoteDataEnabled" value />
        <Getter name="remoteDataLoading" value={loading} />
        <Getter name="infiniteScrollingMode" value={infinite} />
        <Getter name="start" value={start} />
        <Getter name="virtualRowsCache" value={virtualRowsCache} />
        <Getter name="virtualPageSize" value={virtualPageSize} />
        <Getter name="availableRowCount" value={availableRowCount} />

        <Getter name="virtualRows" computed={virtualRowsComputed} />
        <Getter name="rows" computed={rowsComputed} />
        <Getter name="loadedRowsStart" computed={loadedRowsStartComputed} />

        <Action name="requestNextPage" action={this.requestNextPageAction} />
      </Plugin>
    );
  }
}

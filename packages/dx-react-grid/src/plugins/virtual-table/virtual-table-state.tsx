import * as React from 'react';
import { Getter, Action, Plugin, Getters, Actions } from '@devexpress/dx-react-core';
import {
  recalculateBounds, calculateRequestedRange, virtualRowsWithCache,
  trimRowsToInterval, intervalUtil, emptyVirtualRows, plainRows, loadedRowsStart,
  VirtualRows, Interval, getForceReloadInterval,
} from '@devexpress/dx-grid-core';
import { VirtualTableStateProps, VirtualTableStateState } from '../../types';

const virtualRowsComputed = (
  { skip, rows, virtualRowsCache }: Getters,
) => virtualRowsWithCache(skip, rows, virtualRowsCache);

const rowsComputed = ({ virtualRows }: Getters) => plainRows(virtualRows);

const loadedRowsStartComputed = ({ virtualRows }: Getters) => loadedRowsStart(virtualRows);

// tslint:disable-next-line: max-line-length
class VirtualTableStateBase extends React.PureComponent<VirtualTableStateProps, VirtualTableStateState> {
  static defaultProps = {
    pageSize: 100,
  };
  requestTimer: number = 0;

  constructor(props) {
    super(props);

    this.state = {
      virtualRowsCache: emptyVirtualRows,
      requestedPageIndex: undefined,
      availableRowCount: props.totalRowCount || 0,
    };
  }

  requestNextPageAction = (
    { referenceIndex, forceReload },
    { virtualRows }: Getters,
  ) => {
    const { pageSize, totalRowCount } = this.props;

    let newBounds;
    let requestedRange;
    let actualVirtualRows = virtualRows;
    const loadedInterval = intervalUtil.getRowsInterval(virtualRows);
    if (forceReload) {
      newBounds = requestedRange = getForceReloadInterval(
        loadedInterval, pageSize!, totalRowCount,
      );
      actualVirtualRows = emptyVirtualRows;
    } else {
      newBounds = recalculateBounds(referenceIndex, pageSize!, totalRowCount);
      requestedRange = calculateRequestedRange(
        loadedInterval, newBounds, referenceIndex, pageSize!,
      );
    }

    const { requestedPageIndex } = this.state;
    const newPageIndex = requestedRange.start;
    const loadCount = (requestedRange.end - requestedRange.start);
    const shouldLoadRows = (newPageIndex !== requestedPageIndex && loadCount > 0) || forceReload;

    if (shouldLoadRows) {
      this.requestNextPage(newPageIndex, loadCount, actualVirtualRows, newBounds);
    }
  }

  requestNextPage(
    newPageIndex: number, loadCount: number, virtualRows: VirtualRows, newBounds: Interval,
  ) {
    const { getRows, infiniteScrolling, totalRowCount } = this.props;
    const { availableRowCount: stateAvailableCount } = this.state;

    if (this.requestTimer !== 0) {
      clearTimeout(this.requestTimer);
    }
    this.requestTimer = window.setTimeout(() => {
      getRows(newPageIndex, loadCount);

      const virtualRowsCache = trimRowsToInterval(virtualRows, newBounds);
      const newRowCount = infiniteScrolling
        ? Math.max(newBounds.end + loadCount, stateAvailableCount)
        : totalRowCount;

      this.setState({
        virtualRowsCache,
        availableRowCount: newRowCount,
        requestedPageIndex: newPageIndex,
      });
    }, 50);
  }

  clearRowsCacheAction = (
    _: any,
    __: Getters,
    { requestNextPage }: Actions,
  ) => {
    this.setState({
      virtualRowsCache: emptyVirtualRows,
    });
    requestNextPage({ forceReload: true });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      availableRowCount = prevState.availableRowCount,
    } = nextProps;

    return {
      availableRowCount,
    };
  }

  componentDidMount() {
    const { getRows, pageSize, infiniteScrolling, totalRowCount } = this.props;
    getRows(0, 2 * pageSize!);

    const newRowCount = infiniteScrolling ? 2 * pageSize! : totalRowCount;
    this.setState({
      availableRowCount: newRowCount,
    });
  }

  componentWillUnmount() {
    if (this.requestTimer !== 0) {
      window.clearTimeout(this.requestTimer);
    }
  }

  render() {
    const { virtualRowsCache, availableRowCount: stateRowCount } = this.state;
    const { skip, pageSize, loading, infiniteScrolling, totalRowCount } = this.props;

    const availableRowCount = infiniteScrolling ? stateRowCount : totalRowCount;

    return (
      <Plugin
        name="VirtualTableState"
      >
        <Getter name="isDataRemote" value />
        <Getter name="isDataLoading" value={loading} />
        <Getter name="isScrollingInfinite" value={infiniteScrolling} />
        <Getter name="skip" value={skip} />
        <Getter name="virtualRowsCache" value={virtualRowsCache} />
        <Getter name="pageSize" value={pageSize} />
        <Getter name="availableRowCount" value={availableRowCount} />

        <Getter name="virtualRows" computed={virtualRowsComputed} />
        <Getter name="rows" computed={rowsComputed} />
        <Getter name="loadedRowsStart" computed={loadedRowsStartComputed} />

        <Action name="requestNextPage" action={this.requestNextPageAction} />
        <Action name="clearRowCache" action={this.clearRowsCacheAction} />
        <Action name="changeColumnSorting" action={this.clearRowsCacheAction} />
        <Action name="changeColumnFilter" action={this.clearRowsCacheAction} />
      </Plugin>
    );
  }
}

export const VirtualTableState: React.ComponentType<VirtualTableStateProps> = VirtualTableStateBase;

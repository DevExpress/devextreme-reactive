import * as React from 'react';
import { Getter, Action, Plugin, Getters, Actions } from '@devexpress/dx-react-core';
import {
  virtualRowsWithCache, trimRowsToInterval, emptyVirtualRows, plainRows, loadedRowsStart,
  VirtualRows, Interval, getAvailableRowCount, needFetchMorePages, getReferenceIndex,
  shouldSendRequest, getRequestMeta,
} from '@devexpress/dx-grid-core';
import { VirtualTableStateProps, VirtualTableStateState } from '../../types';

const virtualRowsComputed = (
  { skip, rows, virtualRowsCache }: Getters,
) => virtualRowsWithCache(skip, rows, virtualRowsCache);

const rowsComputed = (
  { virtualRows, availableRowCount }: Getters,
) => plainRows(virtualRows, availableRowCount);

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
      requestedStartIndex: -1,
      availableRowCount: props.totalRowCount || 0,
    };
  }

  setViewport = (
    viewport,
    { virtualRows }: Getters,
    { requestNextPage }: Actions,
  ) => {
    const { pageSize } = this.props;
    const referenceIndex = getReferenceIndex(viewport);

    if (needFetchMorePages(virtualRows, referenceIndex, pageSize!)) {
      requestNextPage({ referenceIndex });
    }
  }

  requestNextPageAction = (
    { referenceIndex, forceReload },
    { virtualRows }: Getters,
  ) => {
    const { pageSize, totalRowCount, infiniteScrolling } = this.props;
    const { requestedStartIndex } = this.state;
    const actualVirtualRows = forceReload ? emptyVirtualRows : virtualRows;
    const { requestedRange, actualBounds } = getRequestMeta(
      referenceIndex, virtualRows, pageSize!, totalRowCount, forceReload, infiniteScrolling,
    );

    if (forceReload || shouldSendRequest(requestedRange, requestedStartIndex)) {
      this.requestNextPage(requestedRange, actualVirtualRows, actualBounds);
    }
  }

  requestNextPage(
    requestedRange: Interval, virtualRows: VirtualRows, actualBounds: Interval,
  ) {
    const { getRows, infiniteScrolling, totalRowCount } = this.props;
    const { availableRowCount: stateAvailableCount } = this.state;

    if (this.requestTimer !== 0) {
      clearTimeout(this.requestTimer);
    }
    this.requestTimer = window.setTimeout(() => {
      const { start: requestedStartIndex, end } = requestedRange;
      const loadCount = end - requestedStartIndex;
      const virtualRowsCache = trimRowsToInterval(virtualRows, actualBounds);
      const availableRowCount = getAvailableRowCount(
        infiniteScrolling,
        actualBounds.end,
        stateAvailableCount,
        totalRowCount,
      );

      getRows(requestedStartIndex, loadCount);

      this.setState({
        virtualRowsCache,
        availableRowCount,
        requestedStartIndex,
      });
    }, 50);
  }

  requestFirstPage() {
    const { getRows, pageSize } = this.props;

    if (this.requestTimer !== 0) {
      clearTimeout(this.requestTimer);
    }
    this.requestTimer = window.setTimeout(() => {
      getRows(0, 2 * pageSize!);

      this.setState({
        virtualRowsCache: emptyVirtualRows,
        requestedStartIndex: 0,
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

  resetVirtualTablePosition = () => this.requestFirstPage();

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      availableRowCount: prevAvailableRowCount = prevState.availableRowCount,
      totalRowCount,
      pageSize,
      infiniteScrolling,
    } = nextProps;
    const {
      requestedStartIndex: prevRequestedStartIndex,
      virtualRowsCache: prevVirtualRowCache,
    } = prevState;

    const availableRowCount = getAvailableRowCount(
      infiniteScrolling,
      pageSize * 2,
      prevAvailableRowCount,
      totalRowCount,
    );
    const requestedStartIndex = Math.max(
      Math.min(prevRequestedStartIndex, availableRowCount - pageSize),
      0,
    );
    const virtualRowsCache =
      prevRequestedStartIndex === requestedStartIndex
        ? prevVirtualRowCache
        : emptyVirtualRows;

    return {
      availableRowCount,
      requestedStartIndex,
      virtualRowsCache,
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
    const { virtualRowsCache, availableRowCount } = this.state;
    const { skip, pageSize, loading, infiniteScrolling } = this.props;

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
        <Action name="setViewport" action={this.setViewport} />
        <Action name="clearRowCache" action={this.clearRowsCacheAction} />
        <Action name="changeColumnSorting" action={this.clearRowsCacheAction} />
        <Action name="changeColumnFilter" action={this.resetVirtualTablePosition} />
        <Action name="changeSearchValue" action={this.resetVirtualTablePosition} />
        <Action name="changeColumnGrouping" action={this.resetVirtualTablePosition} />
      </Plugin>
    );
  }
}

export const VirtualTableState: React.ComponentType<VirtualTableStateProps> = VirtualTableStateBase;

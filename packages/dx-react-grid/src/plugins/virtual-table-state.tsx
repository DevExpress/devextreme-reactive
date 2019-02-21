import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, StateHelper, ActionFn, Getters, Actions,
} from '@devexpress/dx-react-core';
import { VirtualTableStateProps, VirtualTableStateState } from '../types';
import { rowIdGetter } from '@devexpress/dx-grid-core';

// tslint:disable-next-line: max-line-length
export class VirtualTableState extends React.PureComponent<VirtualTableStateProps, VirtualTableStateState> {
  static defaultProps = {
    defaultOverscan: 50,
  };
  setFirstRowIndex: ActionFn<number>;
  setVisibleBoundaries: ActionFn<number>;
  setViewportTop: ActionFn<number>;
  setVirtualPageIndex: ActionFn<number>;
  setRequestedStartIndex: ActionFn<number>;

  constructor(props) {
    super(props);

    this.state = {
      firstRowIndex: props.firstRowIndex || 0,
      virtualPageIndex: 0,
      rowCount: props.rowCount || 0,
      start: props.start || 0,
      viewportTop: 0,
      virtualRowsCache: [],
      requestedStartIndex: undefined,
      currentVirtualPageTop: 0,
      // rowsCache: [],
    };

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        firstRowIndex: () => {
          const { onFirstRowIndexChange } = this.props;
          return onFirstRowIndexChange;
        },
        viewportTop: () => {
          const { onViewportTopChange } = this.props;
          return onViewportTopChange;
        },
        visibleBoundaries: () => {
          return () => {}
        },
      },
    );

    this.setFirstRowIndex = stateHelper.applyFieldReducer
      .bind(stateHelper, 'firstRowIndex', (prevIndex, index) => index);
    this.setVisibleBoundaries = stateHelper.applyFieldReducer
      .bind(stateHelper, 'visibleBoundaries', (prevBoundaries, boundaries) => boundaries);
    this.setViewportTop = stateHelper.applyFieldReducer
      .bind(stateHelper, 'viewportTop', (prevTop, top) => top);
    this.setVirtualPageIndex = stateHelper.applyFieldReducer
      .bind(stateHelper, 'virtualPageIndex', (prevIndex, index) => index);
    this.setRequestedStartIndex = stateHelper.applyFieldReducer
      .bind(stateHelper, 'requestedStartIndex', (prevIndex, index) => index);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      firstRowIndex = prevState.firstRowIndex,
      start = prevState.start,
    } = nextProps;

    return {
      firstRowIndex,
      start,
    };
  }

  render() {
    const {
      viewportTop, rowCount, virtualPageIndex,// start,
      virtualRowsCache,// requestedStartIndex,
    } = this.state;
    const { start } = this.props;

    const testComputed = ({
      tableBodyRows,
      renderBoundaries,
      visibleBoundaries,
    }: Getters) => {
      // console.log('body rows in state', tableBodyRows);
      console.log('boundaries in state', visibleBoundaries.bodyRows, renderBoundaries.bodyRows);
      return [];
    }

    /* const virtualPageIndexComputed = ({
      virtualPageIndex, virtualPageSize, firstRowIndex, visibleBoundaries,
      virtualPageOverscan,
    }: Getters, {
      setVirtualPageIndex, setRequestedStartIndex, getRows,
    }: Actions) => {
      const newIndex = Math.round(firstRowIndex / virtualPageSize);
      if (start + virtualPageSize < visibleBoundaries.bodyRows[1] + virtualPageOverscan
        || visibleBoundaries.bodyRows[0] - virtualPageOverscan < start && start > 0
        ) {
        const newRequestedStartIndex = start + virtualPageSize;
        // if (requestedStartIndex !== newRequestedStartIndex) {
        //   setRequestedStartIndex(newRequestedStartIndex);
          // debugger
        //   getRows(newRequestedStartIndex);
        // }
      }
      if (virtualPageIndex !== newIndex) {
        setVirtualPageIndex(newIndex);
        // getRows();
      }
      return newIndex;
    }; */
    const getRowsAction = (payload: any, getters: Getters, actions: Actions) => {
      const { getRows } = this.props;
      console.log('Get rows!')

      getRows(payload, getters.virtualPageSize);
    };

    const requestNextPageAction = (payload: any, getters: Getters, actions: Actions) => {
      const { requestedStartIndex } = this.state;
      const newAdjustedIndex = payload > start + getters.virtualPageSize / 2
        ? start + getters.virtualPageSize
        : start - getters.virtualPageSize;

      if (newAdjustedIndex !== requestedStartIndex) {
        const { getRows } = this.props;
        getRows(newAdjustedIndex, getters.virtualPageSize);
        this.setState({
          requestedStartIndex: newAdjustedIndex,
          virtualRowsCache: {
            start,
            rows: getters.rawRows,
          },
        });
        console.log(
          'req page by rows index:', payload,
          'current start', getters.start,
          'new page index', newAdjustedIndex,
          'requested index', requestedStartIndex,
        );
      }

    };

    /* const setFirstRowIndexAction = (payload: number, getters: Getters, actions: Actions) => {
      const { firstRowIndex } = this.state;
      if (firstRowIndex !== payload) {
        this.setState({ firstRowIndex: payload });
      }
      console.log('set index', payload)
    }; */

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
      console.log('virt rows', rows.length, result.length, cache, currentStart)
      return result;
    };

    const loadedRowsStartComputed = ({ start: currentStart, virtualRowsCache: cache }: Getters) => {
      // console.log('loaded start c', cache.start, Math.min(currentStart, cache.start || currentStart))
      const cacheStart = cache.start !== undefined ? cache.start : currentStart;
      return Math.min(currentStart, cacheStart)
    }

    const loadedRowsCountComputed = ({ rows, virtualRowsCache: cache }: Getters) => {
      return rows.length + (cache.rows && cache.rows.length || 0);
    }

    const rowIdGetterComputed = ({
      rows: getterRows,
    }: Getters) => {
      // console.log('init idgetter in state')
      return rowIdGetter(null!, getterRows);
    }

    return (
      <Plugin
        name="VirtualTableState"
      >
        {/* <Getter name="currentVirtualPageTop" value={currentVirtualPageTop} /> */}
        <Getter name="start" value={start} />
        <Getter name="virtualRowsCache" value={virtualRowsCache} />
        <Getter name="loadedRowsCount" computed={loadedRowsCountComputed} />
        <Getter name="rawRows" computed={rawRowsComputed} />
        <Getter name="rows" computed={virtualRowsComputed} />
        <Getter name="loadedRowsStart" computed={loadedRowsStartComputed} />
        {/* <Getter name="viewportTop" value={viewportTop} /> */}
        {/* <Getter name="firstRowIndex" value={firstRowIndex} /> */}
        <Getter name="totalRowCount" value={rowCount} />
        {/* <Getter name="virtualTableRows" value={[]} /> */}
        <Getter name="virtualPageSize" value={50} />
        <Getter name="virtualPageOverscan" value={5} />
        <Getter name="getRowId" computed={rowIdGetterComputed} />
        {/* <Getter name="requestedStartIndex" value={requestedStartIndex} /> */}

        <Getter name="virtualPageIndex" value={virtualPageIndex} />
        {/* <Getter name="virtualPageIndex" computed={virtualPageIndexComputed} /> */}
        <Getter name="test" computed={testComputed} />

        {/* <Action name="setViewportTop" action={this.setViewportTop} /> */}
        <Action name="setFirstRowIndex" action={this.setFirstRowIndex} />
        <Action name="setVisibleBoundaries" action={this.setVisibleBoundaries} />
        <Action name="setVirtualPageIndex" action={this.setVirtualPageIndex} />
        <Action name="setRequestedStartIndex" action={this.setRequestedStartIndex} />
        <Action name="requestNextPage" action={requestNextPageAction} />
        <Action name="getRows" action={getRowsAction} />
      </Plugin>
    );
  }
}

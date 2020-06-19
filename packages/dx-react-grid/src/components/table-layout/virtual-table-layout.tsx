import * as React from 'react';
import { MemoizedFunction, memoize } from '@devexpress/dx-core';
import {
  TableColumn, GetColumnWidthFn, getCollapsedGrids,
  getColumnWidthGetter, TABLE_STUB_TYPE, getViewport, GridViewport,
} from '@devexpress/dx-grid-core';
import { VirtualTableLayoutState, VirtualTableLayoutProps } from '../../types';
import { findDOMNode } from 'react-dom';
import { VirtualTableLayoutBlock } from './virtual-table-layout-block';
import { Sizer } from '@devexpress/dx-react-core';

const AUTO_HEIGHT = 'auto';

const defaultProps = {
  headerRows: [],
  footerRows: [],
  headComponent: () => null,
  headTableComponent: () => null,
  footerComponent: () => null,
  footerTableComponent: () => null,
};
type PropsType = VirtualTableLayoutProps & typeof defaultProps;

/** @internal */
// tslint:disable-next-line: max-line-length
export class VirtualTableLayout extends React.PureComponent<PropsType, VirtualTableLayoutState> {
  static defaultProps = defaultProps;
  getColumnWidthGetter: MemoizedFunction<[TableColumn[], number, number], GetColumnWidthFn>;
  rowRefs = new Map();
  blockRefs = new Map();
  viewportTop = 0;
  containerHeight = 600;
  containerWidth = 800;
  viewportLeft = 0;

  constructor(props) {
    super(props);

    this.state = {
      rowHeights: new Map<any, number>(),
      height: 0,
      headerHeight: 0,
      bodyHeight: 0,
      footerHeight: 0,
      visibleRowBoundaries: {},
    };

    const headerHeight = props.headerRows
      .reduce((acc, row) => acc + this.getRowHeight(row), 0);
    const footerHeight = props.footerRows
      .reduce((acc, row) => acc + this.getRowHeight(row), 0);

    this.state = {
      ...this.state,
      headerHeight,
      footerHeight,
    };

    this.getColumnWidthGetter = memoize(
      (tableColumns, tableWidth, minColumnWidth) => (
        getColumnWidthGetter(tableColumns, tableWidth, minColumnWidth)
      ),
    );
  }

  componentDidMount() {
    this.storeRowHeights();
    this.storeBlockHeights();
  }

  componentDidUpdate(prevProps) {
    this.storeRowHeights();
    this.storeBlockHeights();

    const { bodyRows, columns } = this.props;

    // NOTE: the boundaries depend not only on scroll position and container dimensions
    // but on body rows too. This boundaries update is especially important when
    // lazy loading is used because by the time that all involved events are handled
    // no rows are loaded yet.
    const bodyRowsChanged = prevProps.bodyRows !== bodyRows;
    // Also it's the only place where we can respond to the column count change
    const columnCountChanged = prevProps.columns.length !== columns.length;

    if (bodyRowsChanged || columnCountChanged) {
      this.updateViewport();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { rowHeights: prevRowHeight } = prevState;
    const rowHeights = [...nextProps.headerRows, ...nextProps.bodyRows, ...nextProps.footerRows]
      .reduce(
        (acc, row) => {
          const rowHeight = prevRowHeight.get(row.key);
          if (rowHeight !== undefined) {
            acc.set(row.key, rowHeight);
          }
          return acc;
        },
        new Map(),
      );
    return { rowHeights };
  }

  getRowHeight = (row) => {
    const { rowHeights } = this.state;
    const { estimatedRowHeight } = this.props;
    if (row) {
      const storedHeight = rowHeights.get(row.key);
      if (storedHeight !== undefined) return storedHeight;
      if (row.height) return row.height;
    }
    return estimatedRowHeight;
  }

  registerRowRef = (row, ref) => {
    if (ref === null) {
      this.rowRefs.delete(row);
    } else {
      this.rowRefs.set(row, ref);
    }
  }

  registerBlockRef = (name, ref) => {
    if (ref === null) {
      this.blockRefs.delete(name);
    } else {
      this.blockRefs.set(name, ref);
    }
  }

  storeRowHeights() {
    const rowsWithChangedHeights = Array.from(this.rowRefs.entries())
      .map(([row, ref]) => [row, findDOMNode(ref)])
      .filter(([, node]) => !!node)
      .map(([row, node]) => [row, node.getBoundingClientRect().height])
      .filter(([row]) => row.type !== TABLE_STUB_TYPE)
      .filter(([row, height]) => height !== this.getRowHeight(row));

    if (rowsWithChangedHeights.length) {
      const { rowHeights } = this.state;
      rowsWithChangedHeights
        .forEach(([row, height]) => rowHeights.set(row.key, height));

      this.setState({
        rowHeights,
      });
    }
  }

  storeBlockHeights() {
    const getBlockHeight = blockName => (this.blockRefs.get(blockName)
      ? (findDOMNode(this.blockRefs.get(blockName)) as HTMLElement).getBoundingClientRect().height
      : 0
    );
    const headerHeight = getBlockHeight('header');
    const bodyHeight = getBlockHeight('body');
    const footerHeight = getBlockHeight('footer');

    const {
      headerHeight: prevHeaderHeight,
      bodyHeight: prevBodyHeight,
      footerHeight: prevFooterHeight,
    } = this.state;

    if (prevHeaderHeight !== headerHeight
      || prevBodyHeight !== bodyHeight
      || prevFooterHeight !== footerHeight) {
      this.setState({
        headerHeight,
        bodyHeight,
        footerHeight,
      });
    }
  }

  onScroll = (e) => {
    const node = e.target;

    if (this.shouldSkipScrollEvent(e)) {
      return;
    }

    const { scrollTop: viewportTop, scrollLeft: viewportLeft } = node;

    this.viewportTop = viewportTop;
    this.viewportLeft = viewportLeft;

    this.updateViewport();
  }

  handleContainerSizeChange = ({ width, height }) => {
    this.containerHeight = height;
    this.containerWidth = width;

    this.updateViewport();
  }

  shouldSkipScrollEvent(e) {
    const node = e.target;

    // NOTE: prevent nested scroll to update viewport
    if (node !== e.currentTarget) {
      return true;
    }
    // NOTE: normalize position:
    // in Firefox and Chrome (zoom > 100%) when scrolled to the bottom
    // in Edge when scrolled to the right edge
    const correction = 1;
    const nodeHorizontalOffset = parseInt(node.scrollLeft + node.clientWidth, 10) - correction;
    const nodeVerticalOffset = parseInt(node.scrollTop + node.clientHeight, 10) - correction;
    // NOTE: prevent iOS to flicker in bounces and correct rendering on high dpi screens
    if (node.scrollTop < 0
      || node.scrollLeft < 0
      || nodeHorizontalOffset > Math.max(node.scrollWidth, node.clientWidth)
      || nodeVerticalOffset > Math.max(node.scrollHeight, node.clientHeight)) {
      return true;
    }

    return false;
  }

  updateViewport() {
    const { viewport, setViewport } = this.props;
    const newViewport = this.calculateViewport();

    if (viewport !== newViewport) {
      setViewport(newViewport);
    }
  }

  calculateViewport() {
    const { state, viewportTop, viewportLeft, containerHeight, containerWidth } = this;
    const {
      loadedRowsStart,
      bodyRows,
      headerRows,
      footerRows,
      estimatedRowHeight,
      columns,
      minColumnWidth,
      isDataRemote,
      viewport,
    } = this.props;
    const getColumnWidth = this.getColumnWidthGetter(columns, containerWidth, minColumnWidth!);

    return getViewport(
      { ...state, viewportTop, viewportLeft, containerHeight, containerWidth },
      { loadedRowsStart, columns, bodyRows, headerRows, footerRows, isDataRemote, viewport },
      estimatedRowHeight, this.getRowHeight, getColumnWidth,
    );
  }

  getCollapsedGrids(viewport: GridViewport) {
    const { containerWidth, viewportLeft } = this;
    const {
      headerRows, bodyRows, footerRows,
      columns, loadedRowsStart, totalRowCount,
      getCellColSpan, minColumnWidth,
    } = this.props;
    const getColumnWidth = this.getColumnWidthGetter(columns, containerWidth, minColumnWidth!);

    return getCollapsedGrids({
      headerRows,
      bodyRows,
      footerRows,
      columns,
      loadedRowsStart,
      totalRowCount,
      getCellColSpan,
      viewportLeft,
      containerWidth,
      viewport,
      getRowHeight: this.getRowHeight,
      getColumnWidth,
    });
  }

  render() {
    const {
      containerComponent: Container,
      headTableComponent: HeadTable,
      footerTableComponent: FootTable,
      tableComponent: Table,
      headComponent: Head,
      bodyComponent: Body,
      footerComponent: Footer,
      tableRef,
      height,
      headerRows,
      footerRows,
      minColumnWidth,
      minWidth,
      cellComponent,
      rowComponent,
      viewport,
      scrollTop,
    } = this.props;
    const {
      headerHeight,
      bodyHeight,
      footerHeight,
    } = this.state;
    const { containerHeight } = this;

    const collapsedGrids = this.getCollapsedGrids(viewport);
    const commonProps = {
      cellComponent,
      rowComponent,
      minColumnWidth,
      minWidth,
      blockRefsHandler: this.registerBlockRef,
      rowRefsHandler: this.registerRowRef,
    };
    const sizerHeight = height === AUTO_HEIGHT ? null : height;

    return (
      <Sizer
        onSizeChange={this.handleContainerSizeChange}
        containerComponent={Container}
        style={{ height: sizerHeight }}
        onScroll={this.onScroll}
        scrollTop={scrollTop}
      >
        {
          (!!headerRows.length) && (
            <VirtualTableLayoutBlock
              {...commonProps}
              name="header"
              collapsedGrid={collapsedGrids.headerGrid}
              tableComponent={HeadTable}
              bodyComponent={Head}
            />
          )
        }
        <VirtualTableLayoutBlock
          {...commonProps}
          name="body"
          collapsedGrid={collapsedGrids.bodyGrid}
          tableComponent={Table}
          bodyComponent={Body}
          tableRef={tableRef}
          marginBottom={Math.max(0, containerHeight - headerHeight - bodyHeight - footerHeight)}
        />
        {
          (!!footerRows.length) && (
            <VirtualTableLayoutBlock
              {...commonProps}
              name="footer"
              collapsedGrid={collapsedGrids.footerGrid}
              tableComponent={FootTable}
              bodyComponent={Footer}
            />
          )
        }
      </Sizer>
    );
  }
}

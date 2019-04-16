import * as React from 'react';
import { Sizer } from '@devexpress/dx-react-core';
import { MemoizedFunction, memoize, isEdgeBrowser } from '@devexpress/dx-core';
import {
  TableColumn, GetColumnWidthFn, getCollapsedGrids,
  getColumnWidthGetter, TABLE_STUB_TYPE, getVisibleRowsBounds,
} from '@devexpress/dx-grid-core';
import { VirtualTableLayoutState, VirtualTableLayoutProps } from '../../types';
import { findDOMNode } from 'react-dom';
import { VirtualTableLayoutBlock } from './virtual-table-layout-block';

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
  isEdgeBrowser = false;

  constructor(props) {
    super(props);

    this.state = {
      rowHeights: new Map(),
      viewportTop: 0,
      viewportLeft: 0,
      containerWidth: 800,
      containerHeight: 600,
      height: 0,
      headerHeight: 0,
      bodyHeight: 0,
      footerHeight: 0,
    };

    const headerHeight = props.headerRows
      .reduce((acc, row) => acc + this.getRowHeight(row), 0);
    const footerHeight = props.footerRows
      .reduce((acc, row) => acc + this.getRowHeight(row), 0);

    this.state = {
      headerHeight,
      footerHeight,
      ...this.state,
    };

    this.getColumnWidthGetter = memoize(
      (tableColumns, tableWidth, minColumnWidth) => (
        getColumnWidthGetter(tableColumns, tableWidth, minColumnWidth)
      ),
    );
  }

  componentDidMount() {
    this.isEdgeBrowser = isEdgeBrowser();

    this.storeRowHeights();
    this.storeBlockHeights();
  }

  componentDidUpdate() {
    this.storeRowHeights();
    this.storeBlockHeights();
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

  updateViewport = (e, visibleRowBoundaries, ensureNextVirtualPage) => {
    const node = e.target;

    if (this.shouldSkipScrollEvent(e)) {
      return;
    }

    const { estimatedRowHeight } = this.props;
    const { containerHeight } = this.state;
    const { scrollTop: viewportTop, scrollLeft: viewportLeft } = node;
    ensureNextVirtualPage({
      estimatedRowHeight,
      visibleRowBoundaries,
      viewportTop,
      containerHeight,
    });

    this.setState({
      viewportTop,
      viewportLeft,
    });
  }

  handleContainerSizeChange = ({ width, height }) => {
    this.setState({ containerWidth: width, containerHeight: height });
  }

  shouldSkipScrollEvent(e) {
    const node = e.target;

    // NOTE: prevent nested scroll to update viewport
    if (node !== e.currentTarget) {
      return true;
    }
    // NOTE: prevent iOS to flicker in bounces and correct rendering on high dpi screens
    const correction = this.isEdgeBrowser ? 1 : 0;
    const nodeHorizontalOffset = parseInt(node.scrollLeft + node.clientWidth, 10) - correction;
    const nodeVerticalOffset = parseInt(node.scrollTop + node.clientHeight, 10) - correction;
    if (node.scrollTop < 0
      || node.scrollLeft < 0
      || nodeHorizontalOffset > Math.max(node.scrollWidth, node.clientWidth)
      || nodeVerticalOffset > Math.max(node.scrollHeight, node.clientHeight)) {
      return true;
    }

    return false;
  }

  getVisibleBoundaries() {
    const {
      loadedRowsStart,
      bodyRows: tableBodyRows,
      estimatedRowHeight,
    } = this.props;

    return getVisibleRowsBounds(
      this.state, { loadedRowsStart, tableBodyRows },
      estimatedRowHeight, this.getRowHeight,
    );
  }

  getCollapsedGrids(visibleRowBoundaries) {
    const { viewportLeft, containerWidth } = this.state;
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
      visibleRowBoundaries,
      getColumnWidth,
      getRowHeight: this.getRowHeight,
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
      ensureNextVirtualPage,
      minColumnWidth,
      cellComponent,
      rowComponent,
    } = this.props;
    const {
      containerHeight,
      headerHeight,
      bodyHeight,
      footerHeight,
    } = this.state;

    const visibleRowBoundaries = this.getVisibleBoundaries();
    const collapsedGrids = this.getCollapsedGrids(visibleRowBoundaries);
    const commonProps = { cellComponent, rowComponent, minColumnWidth };

    return (
      <Sizer
        onSizeChange={this.handleContainerSizeChange}
        containerComponent={Container}
        style={{
          ...(height === AUTO_HEIGHT ? null : { height }),
        }}
        onScroll={
          e => this.updateViewport(e, visibleRowBoundaries, ensureNextVirtualPage)
        }
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

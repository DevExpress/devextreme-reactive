import * as React from 'react';
import { MemoizedFunction, memoize } from '@devexpress/dx-core';
import {
  TableColumn, GetColumnWidthFn, getCollapsedGrids,
  getColumnWidthGetter, getViewport, GridViewport, getScrollLeft,
  isColumnsWidthDifferent,
} from '@devexpress/dx-grid-core';
import { VirtualTableLayoutState, VirtualTableLayoutProps } from '../../types';
import { VirtualTableLayoutBlock } from './virtual-table-layout-block';
import { Sizer } from '@devexpress/dx-react-core';
import { ColumnGroup } from './column-group';

const AUTO_HEIGHT = 'auto';

const defaultProps = {
  headerRows: [],
  footerRows: [],
  headComponent: () => null,
  footerComponent: () => null,
  tableComponent: () => null,
  containerComponent: React.forwardRef(() => null),
};
type PropsType = VirtualTableLayoutProps & typeof defaultProps;

/** @internal */
// tslint:disable-next-line: max-line-length
export class VirtualTableLayout extends React.PureComponent<PropsType, VirtualTableLayoutState> {
  static defaultProps = defaultProps;
  getColumnWidthGetter: MemoizedFunction<[TableColumn[], number, number], GetColumnWidthFn>;
  rowRefs = new Map<any, HTMLElement>();
  blockRefs = new Map<string, HTMLElement>();
  viewportTop = 0;
  restRows = 0;
  skipItems = [0, 0];
  containerHeight = 600;
  containerWidth = 800;
  viewportLeft = 0;

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      visibleRowBoundaries: {},
    };

    this.setRestRows();

    this.getColumnWidthGetter = memoize(
      (tableColumns, tableWidth, minColumnWidth) => (
        getColumnWidthGetter(tableColumns, tableWidth, minColumnWidth)
      ),
    );
  }

  setRestRows() {
    const containerHeight = this.props.totalRowCount * this.props.estimatedRowHeight;
    if(containerHeight > 10000000) {
      this.restRows = Math.round(this.props.totalRowCount - 10000000 / this.props.estimatedRowHeight);
    }
  }

  componentDidUpdate(prevProps) {
    this.setRestRows();
    const { bodyRows, columns } = this.props;

    // NOTE: the boundaries depend not only on scroll position and container dimensions
    // but on body rows too. This boundaries update is especially important when
    // lazy loading is used because by the time that all involved events are handled
    // no rows are loaded yet.
    const bodyRowsChanged = prevProps.bodyRows !== bodyRows;
    // Also it's the only place where we can respond to the column count change
    const columnCountChanged = prevProps.columns.length !== columns.length;

    if (bodyRowsChanged || columnCountChanged || columns[0].width !== undefined &&
      isColumnsWidthDifferent(prevProps.columns, columns)
      ) {
      this.updateViewport();
    }
  }

  getRowHeight = (row) => {
    const height = row ? row.height : 0;
    return height || this.props.estimatedRowHeight;
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

  onScroll = (e) => {
    const node = e.target;

    if (this.shouldSkipScrollEvent(e)) {
      return;
    }

    const { scrollTop: viewportTop, scrollLeft: viewportLeft } = node;

    const dif = viewportTop - this.viewportTop;
    const pxInPercent = viewportTop * 1 / 10000000;
    const isDif = Math.abs(dif) < this.containerHeight;
    const top = Math.min(Math.round(pxInPercent * this.restRows), this.restRows);
    this.skipItems = isDif ? this.skipItems : [top, this.restRows - top];
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
    const { state, viewportTop, skipItems, viewportLeft, containerHeight, containerWidth } = this;
    const {
      loadedRowsStart,
      bodyRows,
      headerRows,
      footerRows,
      columns,
      minColumnWidth,
      isDataRemote,
      viewport,
    } = this.props;
    const getColumnWidth = this.getColumnWidthGetter(columns, containerWidth, minColumnWidth!);

    return getViewport(
      { ...state, viewportTop, skipItems, viewportLeft, containerHeight, containerWidth },
      { loadedRowsStart, columns, bodyRows, headerRows, footerRows, isDataRemote, viewport },
      this.getRowHeight, getColumnWidth,
    );
  }

  getCollapsedGrids(viewport: GridViewport) {
    const { containerWidth, viewportLeft, skipItems } = this;
    const {
      headerRows, bodyRows, footerRows,
      columns, loadedRowsStart, totalRowCount,
      getCellColSpan, minColumnWidth,
    } = this.props;
    const getColumnWidth = this.getColumnWidthGetter(columns, containerWidth, minColumnWidth!);
debugger
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
      skipItems,
      getRowHeight: this.getRowHeight,
      getColumnWidth,
    });
  }

  render() {
    const {
      containerComponent: Container,
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
      columns,
      nextColumnId,
    } = this.props;

    const scrollLeft = getScrollLeft(columns.length, minColumnWidth!, nextColumnId);

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
        scrollLeft={scrollLeft}
      >
        <Table
          forwardedRef={tableRef}
          style={{
            minWidth: `${minWidth}px`,
          }}
        >
          <ColumnGroup
            columns={collapsedGrids.bodyGrid.columns as TableColumn[]}
          />
          {
            (!!headerRows.length) && (
              <VirtualTableLayoutBlock
                {...commonProps}
                name="header"
                isFixed={true}
                collapsedGrid={collapsedGrids.headerGrid}
                bodyComponent={Head}
              />
            )
          }
          <VirtualTableLayoutBlock
            {...commonProps}
            name="body"
            collapsedGrid={collapsedGrids.bodyGrid}
            bodyComponent={Body}
          />
          {
            (!!footerRows.length) && (
              <VirtualTableLayoutBlock
                {...commonProps}
                name="footer"
                isFixed={true}
                collapsedGrid={collapsedGrids.footerGrid}
                bodyComponent={Footer}
              />
            )
          }
        </Table>
      </Sizer>
    );
  }
}

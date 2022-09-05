import * as React from 'react';
import { MemoizedFunction, memoize } from '@devexpress/dx-core';
import {
  TableColumn, GetColumnWidthFn, getCollapsedGrids,
  getColumnWidthGetter, TABLE_STUB_TYPE, getViewport, GridViewport, getScrollLeft,
  isColumnsWidthDifferent,
} from '@devexpress/dx-grid-core';
import { VirtualTableLayoutState, VirtualTableLayoutProps } from '../../types';
import { VirtualTableLayoutBlock } from './virtual-table-layout-block';
import { Sizer } from '@devexpress/dx-react-core';
import { ColumnGroup } from './column-group';

const AUTO_HEIGHT = 'auto';
const MAX_WINDOW_HEIGHT = 10000000;

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

  constructor(props) {
    super(props);

    this.state = {
      viewportTop: 0,
      skipItems: [0, 0],
      containerHeight: 600,
      containerWidth: 800,
      viewportLeft: 0,
    };

    this.getColumnWidthGetter = memoize(
      (tableColumns, tableWidth, minColumnWidth) => (
        getColumnWidthGetter(tableColumns, tableWidth, minColumnWidth)
      ),
    );
  }

  getCountSkipRows() {
    const containerHeight = this.props.totalRowCount * this.props.estimatedRowHeight;
    if (containerHeight > MAX_WINDOW_HEIGHT) {
      return Math.round(this.props.totalRowCount - MAX_WINDOW_HEIGHT /
        this.props.estimatedRowHeight);
    }
    return 0;
  }

  registerRowRef = (row, ref) => {
    if (row.type === TABLE_STUB_TYPE) {
      return;
    }
    if (ref === null) {
      this.rowRefs.delete(row.key);
    } else {
      this.rowRefs.set(row.key, ref);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { bodyRows, columns } = this.props;
    // NOTE: the boundaries depend not only on scroll position and container dimensions
    // but on body rows too. This boundaries update is especially important when
    // lazy loading is used because by the time that all involved events are handled
    // no rows are loaded yet.
    const bodyRowsChanged = prevProps.bodyRows !== bodyRows;
    // Also it's the only place where we can respond to the column count change
    const columnCountChanged = prevProps.columns.length !== columns.length;

    const { viewportTop, viewportLeft, containerWidth, containerHeight } = this.state;
    const viewportTopChanged = prevState.viewportTop !== viewportTop;
    const viewportLeftChanged = prevState.viewportLeft !== viewportLeft;
    const containerWidthChanged = prevState.containerWidth !== containerWidth;
    const containerHeightChanged = prevState.containerHeight !== containerHeight;

    if (prevProps.totalRowCount !== this.props.totalRowCount) {
      const countSkipRows = this.getCountSkipRows();
      const { skipItems } = this.state;
      if (countSkipRows !== 0 && skipItems[0] === 0 && skipItems[1] === 0) {
        this.setState({
          skipItems: [0, countSkipRows],
        });
      }
    }

    if (bodyRowsChanged || columnCountChanged || columns[0].width !== undefined &&
      isColumnsWidthDifferent(prevProps.columns, columns) || viewportTopChanged ||
      viewportLeftChanged || containerWidthChanged || containerHeightChanged
      ) {
      this.updateViewport();
    }
  }

  getRowHeight = (row) => {
    if (row) {
      const realHeight = this.rowRefs.get(row.key)?.getBoundingClientRect().height;
      return row.height || realHeight || this.props.estimatedRowHeight;
    }
    return this.props.estimatedRowHeight;
  }

  onScroll = (e) => {
    const node = e.target;

    if (this.shouldSkipScrollEvent(e)) {
      return;
    }

    const { scrollTop: viewportTop, scrollLeft: viewportLeft } = node;
    const {
      containerHeight,
      skipItems,
      viewportTop: prevViewPort,
    } = this.state;

    const countSkipRows = this.getCountSkipRows();
    const dif = viewportTop - prevViewPort;
    const pxInPercent = viewportTop / MAX_WINDOW_HEIGHT;
    const isDif = Math.abs(dif) < containerHeight;
    const top = Math.min(Math.round(pxInPercent * countSkipRows), countSkipRows);

    this.setState({
      viewportTop,
      viewportLeft,
      skipItems: isDif ? skipItems : [top, countSkipRows - top],
    });
  }

  handleContainerSizeChange = ({ width, height }) => {
    this.setState({
      containerHeight: height,
      containerWidth: width,
    });
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
    const { viewportTop, skipItems, viewportLeft, containerHeight, containerWidth } = this.state;
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
      { viewportTop, skipItems, viewportLeft, containerHeight, containerWidth },
      { loadedRowsStart, columns, bodyRows, headerRows, footerRows, isDataRemote, viewport },
      this.getRowHeight, getColumnWidth,
    );
  }

  getCollapsedGrids(viewport: GridViewport) {
    const { containerWidth, viewportLeft, skipItems } = this.state;
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

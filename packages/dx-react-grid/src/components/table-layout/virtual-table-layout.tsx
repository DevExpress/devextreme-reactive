import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { isEdgeBrowser } from '@devexpress/dx-core';
import { Sizer, RefHolder } from '@devexpress/dx-react-core';
import {
  getCollapsedGrid,
  TABLE_FLEX_TYPE,
  TABLE_STUB_TYPE,
} from '@devexpress/dx-grid-core';
import { ColumnGroup } from './column-group';
import { VirtualTableLayoutProps, VirtualTableLayoutState } from '../../types';

const AUTO_HEIGHT = 'auto';

/** @internal */
// tslint:disable-next-line: max-line-length
export class VirtualTableLayout extends React.PureComponent<VirtualTableLayoutProps, VirtualTableLayoutState> {
  static defaultProps = {
    headerRows: [],
    footerRows: [],
    headComponent: () => null,
    headTableComponent: () => null,
    footerComponent: () => null,
    footerTableComponent: () => null,
  };
  isEdgeBrowser: boolean = false;
  rowRefs: Map<any, any>;
  blockRefs: Map<any, any>;

  constructor(props) {
    super(props);

    this.state = {
      bodyHeight: 0,
      headerHeight: 0,
      footerHeight: 0,
      rowHeights: new Map(),
      viewportTop: 0,
      viewportLeft: 0,
      width: 800,
      height: 600,
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

    this.rowRefs = new Map();
    this.blockRefs = new Map();
    this.registerRowRef = this.registerRowRef.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    this.handleContainerSizeChange = this.handleContainerSizeChange.bind(this);
  }

  componentDidMount() {
    this.isEdgeBrowser = isEdgeBrowser();

    this.storeRowHeights();
    this.storeBloksHeights();
  }

  componentDidUpdate() {
    this.storeRowHeights();
    this.storeBloksHeights();
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

  getRowHeight(row) {
    const { rowHeights } = this.state;
    const { estimatedRowHeight } = this.props;
    const storedHeight = rowHeights.get(row.key);
    if (storedHeight !== undefined) return storedHeight;
    if (row.height) return row.height;
    return estimatedRowHeight;
  }

  storeRowHeights() {
    const rowsWithChangedHeights = Array.from(this.rowRefs.entries())
      // eslint-disable-next-line react/no-find-dom-node
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

  storeBloksHeights() {
    const getBlockHeight = blockName => (this.blockRefs.get('body')
      ? (findDOMNode(this.blockRefs.get('header')) as HTMLElement).getBoundingClientRect().height
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

  registerRowRef(row, ref) {
    if (ref === null) {
      this.rowRefs.delete(row);
    } else {
      this.rowRefs.set(row, ref);
    }
  }

  registerBlockRef(name, ref) {
    if (ref === null) {
      this.blockRefs.delete(name);
    } else {
      this.blockRefs.set(name, ref);
    }
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

  updateViewport(e) {
    const node = e.target;

    if (this.shouldSkipScrollEvent(e)) {
      return;
    }

    this.setState({
      viewportTop: node.scrollTop,
      viewportLeft: node.scrollLeft,
    });
  }

  handleContainerSizeChange({ width, height }) {
    this.setState({ width, height });
  }

  renderRowsBlock(name, collapsedGrid, Table, Body, blockRef?, marginBottom?) {
    const {
      minWidth,
    } = this.props;
    // TODO: cell and row do not receive all reqired props
    const Row = this.props.rowComponent as React.ComponentType<any>;
    const Cell = this.props.cellComponent as React.ComponentType<any>;

    const tableRef = blockRef || React.createRef();

    return (
      <RefHolder
        ref={ref => this.registerBlockRef(name, ref)}
      >
        <Table
          tableRef={tableRef}
          style={{
            minWidth: `${minWidth}px`,
            ...marginBottom ? { marginBottom: `${marginBottom}px` } : null,
          }}
        >
          <ColumnGroup
            columns={collapsedGrid.columns}
          />
          <Body>
            {collapsedGrid.rows.map((visibleRow) => {
              const { row, cells = [] } = visibleRow;
              return (
                <RefHolder
                  key={row.key}
                  ref={ref => this.registerRowRef(row, ref)}
                >
                  <Row
                    tableRow={row}
                    style={row.height !== undefined
                      ? { height: `${row.height}px` }
                      : undefined}
                  >
                    {cells.map((cell) => {
                      const { column } = cell;
                      return (
                        <Cell
                          key={column.key}
                          tableRow={row}
                          tableColumn={column}
                          style={column.animationState}
                          colSpan={cell.colSpan}
                        />
                      );
                    })}
                  </Row>
                </RefHolder>
              );
            })}
          </Body>
        </Table>
      </RefHolder>
    );
  }

  render() {
    const {
      headerRows,
      bodyRows,
      footerRows,
      columns,
      minColumnWidth,
      height: propHeight,
      containerComponent: Container,
      headTableComponent: HeadTable,
      footerTableComponent: FootTable,
      tableComponent: Table,
      headComponent: Head,
      bodyComponent: Body,
      footerComponent: Footer,
      getCellColSpan,
      tableRef,
    } = this.props;

    const {
      viewportLeft,
      viewportTop,
      headerHeight,
      bodyHeight,
      footerHeight,
      width,
      height,
    } = this.state;

    const getColumnWidth = column => (column.type === TABLE_FLEX_TYPE
      ? null
      : column.width || minColumnWidth);
    const getColSpan = (
      tableRow, tableColumn,
    ) => getCellColSpan!({ tableRow, tableColumn, tableColumns: columns });
    const collapsedHeaderGrid = getCollapsedGrid({
      rows: headerRows,
      columns,
      top: 0,
      left: viewportLeft,
      width,
      height: headerHeight,
      getColumnWidth,
      getRowHeight: this.getRowHeight,
      getColSpan,
    });
    const collapsedBodyGrid = getCollapsedGrid({
      rows: bodyRows,
      columns,
      top: viewportTop,
      left: viewportLeft,
      width,
      height: height - headerHeight - footerHeight,
      getColumnWidth,
      getRowHeight: this.getRowHeight,
      getColSpan,
    });
    const collapsedFooterGrid = getCollapsedGrid({
      rows: footerRows,
      columns,
      top: 0,
      left: viewportLeft,
      width,
      height: footerHeight,
      getColumnWidth,
      getRowHeight: this.getRowHeight,
      getColSpan,
    });

    /* tslint:disable max-line-length */
    return (
      <Sizer
        onSizeChange={this.handleContainerSizeChange}
        containerComponent={Container}
        style={{
          ...(propHeight === AUTO_HEIGHT ? null : { height: `${propHeight}px` }),
        }}
        onScroll={this.updateViewport}
      >
        {!!headerRows.length && this.renderRowsBlock('header', collapsedHeaderGrid, HeadTable, Head)}
        {this.renderRowsBlock('body', collapsedBodyGrid, Table, Body, tableRef, Math.max(0, height - headerHeight - bodyHeight - footerHeight))}
        {!!footerRows.length && this.renderRowsBlock('footer', collapsedFooterGrid, FootTable, Footer)}
      </Sizer>
    );
    /* tslint:enable max-line-length */
  }
}

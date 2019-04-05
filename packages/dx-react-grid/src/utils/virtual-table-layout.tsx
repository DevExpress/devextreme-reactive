import * as React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Plugin, Template, TemplateConnector,
  Sizer, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { isEdgeBrowser, MemoizedFunction, memoize } from '@devexpress/dx-core';
import {
  TABLE_STUB_TYPE, TableColumn, GetColumnWidthFn, getColumnWidthGetter,
} from '@devexpress/dx-grid-core';
import { TableLayoutProps } from '../types';

const AUTO_HEIGHT = 'auto';

export class VirtualTableViewport extends React.PureComponent<any, any> {
  rowRefs: Map<any, any>;
  blockRefs: Map<any, any>;
  isEdgeBrowser = false;
  getColumnWidthGetter: MemoizedFunction<[TableColumn[], number, number], GetColumnWidthFn>;
  // getScrollHandler: (...args: any[]) => (e: any) => void;
  // getSizeChangeHandler: (...args: any[]) => (e: any) => void;

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

    this.rowRefs = new Map();
    this.blockRefs = new Map();
    this.registerRowRef = this.registerRowRef.bind(this);
    this.registerBlockRef = this.registerBlockRef.bind(this);

    this.getRowHeight = this.getRowHeight.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    this.handleContainerSizeChange = this.handleContainerSizeChange.bind(this);
    this.handleTableUpdate = this.handleTableUpdate.bind(this);

    this.getColumnWidthGetter = memoize(
      (tableColumns, tableWidth, minColWidth) => (
        getColumnWidthGetter(tableColumns, tableWidth, minColWidth)
      ),
    );
  }

  getScrollHandler = (
    currentVirtualPageBoundary, ensureNextVirtualPage,
  ) => (
      e => this.updateViewport(e, currentVirtualPageBoundary, ensureNextVirtualPage)
  )

  componentDidMount() {
    this.isEdgeBrowser = isEdgeBrowser();
  }

  getRowHeight(row) {
    const { rowHeights } = this.state;
    const { estimatedRowHeight } = this.props;
    if (row) {
      const storedHeight = rowHeights.get(row.key);
      if (storedHeight !== undefined) return storedHeight;
      if (row.height) return row.height;
    }
    return estimatedRowHeight;
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

  handleContainerSizeChange(currentVirtualPageBoundary, requestNextPage, { width, height }) {
    this.setState({ containerWidth: width, containerHeight: height });
  }

  handleTableUpdate() {
    this.storeRowHeights();
    this.storeBlockHeights();
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

  updateViewport(e, currentPageTriggersMeta, ensureNextVirtualPage) {
    const node = e.target;

    if (this.shouldSkipScrollEvent(e)) {
      return;
    }

    ensureNextVirtualPage({ currentPageTriggersMeta, scrollTop: node.scrollTop })
    // this.ensureNextPage(currentPageTriggersMeta, requestNextPage, node.scrollTop);

    this.setState({
      viewportTop: node.scrollTop,
      viewportLeft: node.scrollLeft,
    });
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

  render() {
    const {
      height: propHeight,
      estimatedRowHeight,
      minColumnWidth,
    } = this.props;

    return (
      <Plugin name="VirtualTableViewport">
        <Template name="tableLayout">
            {(params: TableLayoutProps) => {

              return (
                <TemplateConnector>
                  {(
                    { currentVirtualPageBoundary, availableRowCount,
                      renderBoundaries, loadedRowsStart,
                      tableColumns, tableBodyRows,
                    },
                    { ensureNextVirtualPage },
                  ) => {
                    const {
                      containerComponent: Container,
                    } = params;
                    const { containerWidth: width, viewportLeft } = this.state;
                    const getColumnWidth = this.getColumnWidthGetter(
                      tableColumns, width, minColumnWidth,
                    );
                    // const visibleRowBoundaries = visibleRowsBounds(
                    //   this.state, { loadedRowsStart, tableBodyRows },
                    //   estimatedRowHeight, this.getRowHeight,
                    // );
                    // const renderRowBoundaries = getRowsRenderBoundary(
                    //   loadedRowsStart + tableBodyRows.length, visibleRowBoundaries,
                    // );
                    const renderRowBoundaries = renderBoundaries;
                    const totalRowCount = availableRowCount || tableBodyRows.length;

                    return (
                      <Sizer
                        onSizeChange={
                          this.getSizeChangeHandler(currentVirtualPageBoundary, ensureNextVirtualPage)
                        }
                        containerComponent={Container}
                        style={{
                          ...(propHeight === AUTO_HEIGHT ? null : { height: `${propHeight}px` }),
                        }}
                        onScroll={
                          this.getScrollHandler(
                            currentVirtualPageBoundary, ensureNextVirtualPage,
                          )
                        }
                      >
                        <TemplatePlaceholder
                          params={{
                            ...params,
                            blockRefsHandler: this.registerBlockRef,
                            rowRefsHandler: this.registerRowRef,
                            onUpdate: this.handleTableUpdate,
                            visibleRowBoundaries: renderRowBoundaries,
                            getRowHeight: this.getRowHeight,
                            getColumnWidth,
                            headerHeight,
                            bodyHeight,
                            footerHeight,
                            containerHeight,
                            containerWidth,
                            viewportLeft,
                            totalRowCount,
                            loadedRowsStart,
                          }}
                        />
                      </Sizer>);
                  }}
                </TemplateConnector>
              );
            }}
          </Template>
      </Plugin>
    );
  }
}

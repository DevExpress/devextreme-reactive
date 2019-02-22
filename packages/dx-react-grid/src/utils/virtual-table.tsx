import * as React from 'react';
import { findDOMNode } from 'react-dom';
import {
  connectProps, Plugin, TemplatePlaceholder, Sizer, Template,
  Getter,// Action,
  TemplateConnector, createStateHelper, PluginComponents, Getters, ActionFn, Actions,
} from '@devexpress/dx-react-core';
import {
  getColumnsVisibleBoundary,
  getRowsVisibleBoundary,
  getRowsRenderBoundary, getColumnsRenderBoundary,
  TABLE_FLEX_TYPE,
  TABLE_STUB_TYPE,
} from '@devexpress/dx-grid-core';
import { VirtualTableProps, VirtualTableLayoutProps, VirtualTableLayoutState, TableLayoutProps } from '../types';

const AUTO_HEIGHT = 'auto';

/** @internal */
export const makeVirtualTable: (...args: any) => any = (Table, {
  VirtualLayout,
  FixedHeader,
  FixedFooter,
  defaultEstimatedRowHeight,
  defaultHeight,
  minColumnWidth,
}) => {
  class VirtualTable extends React.PureComponent<VirtualTableProps, VirtualTableLayoutState> {
    static defaultProps = {
      estimatedRowHeight: defaultEstimatedRowHeight,
      height: defaultHeight,
      headTableComponent: FixedHeader,
      footerTableComponent: FixedFooter,
    };
    static FixedHeader: React.ComponentType;
    static FixedFooter: React.ComponentType;
    layoutRenderComponent: React.ComponentType<VirtualTableLayoutProps> & { update(): void; };
    rowRefs: Map<any, any>;
    blockRefs: Map<any, any>;
    setViewportTop: ActionFn<number>;

    constructor(props) {
      super(props);

      this.state = {
        rowHeights: new Map(),
        viewportTop: props.viewportTop || 0,
        viewportLeft: 0,
        width: 800,
        containerHeight: 600,
        height: 0,
        headerHeight: 0,
        bodyHeight: 0,
        footerHeight: 0,
        firstRowIndex: 0,
      };

      const {
        height,
        estimatedRowHeight,
        headTableComponent,
        footerTableComponent,
      } = props;
      this.layoutRenderComponent = connectProps(VirtualLayout, () => ({
        height,
        estimatedRowHeight,
        headTableComponent,
        footerTableComponent,
        minColumnWidth,
      }));

      const stateHelper = createStateHelper(
        this,
        {
          // firstRowIndex: () => { },
          viewportTop: () => {
            const { onViewportTopChange } = this.props;
            return onViewportTopChange;
          }
        }
      );

      this.setViewportTop = stateHelper.applyFieldReducer
        .bind(stateHelper, 'viewportTop', (prevTop, top) => top);

      this.rowRefs = new Map();
      this.blockRefs = new Map();
      this.registerRowRef = this.registerRowRef.bind(this);
      this.registerBlockRef = this.registerBlockRef.bind(this);
      this.getRowHeight = this.getRowHeight.bind(this);
      this.updateViewport = this.updateViewport.bind(this);
      this.handleContainerSizeChange = this.handleContainerSizeChange.bind(this);
      this.handleTableUpdate = this.handleTableUpdate.bind(this);
      this.getRowHeight = this.getRowHeight.bind(this);
    }

    componentDidUpdate() {
      this.storeRowHeights();
      this.storeBlockHeights();

      this.layoutRenderComponent.update();
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

    updateViewport(currentVirtualPageBoundary, requestNextPage, e) {
      const node = e.target;

      // NOTE: prevent nested scroll to update viewport
      if (node !== e.currentTarget) {
        return;
      }

      // NOTE: prevent iOS to flicker in bounces and correct rendering on high dpi screens
      const nodeHorizontalOffset = parseInt(node.scrollLeft + node.clientWidth, 10);
      const nodeVerticalOffset = parseInt(node.scrollTop + node.clientHeight, 10);
      if (node.scrollTop < 0
        || node.scrollLeft < 0
        || nodeHorizontalOffset > Math.max(node.scrollWidth, node.clientWidth)
        || nodeVerticalOffset > Math.max(node.scrollHeight, node.clientHeight)) {
        return;
      }

      if (currentVirtualPageBoundary[0] < 0 || currentVirtualPageBoundary[1] < 0) {
        console.log('request next page. boundary is', currentVirtualPageBoundary);
        requestNextPage(Math.round(node.scrollTop / this.props.estimatedRowHeight));
        // console.log('height', this.state.rowHeights, this.props.estimatedRowHeight)
      }

      this.setState({
        viewportTop: node.scrollTop,
        viewportLeft: node.scrollLeft,
      });
    }

    handleContainerSizeChange({ width, height }) {
      this.setState({ width, containerHeight: height });
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

    static getDerivedStateFromProps(nextProps, prevState) {
      const {
        viewportTop = prevState.viewportTop,
      } = nextProps;

      return {
        viewportTop,
      };
    }

    render() {
      const {
        height: propHeight,
        estimatedRowHeight,
        headTableComponent,
        children,
        // minColumnWidth,
        ...restProps
      } = this.props;

      const {
        width,
        containerHeight,
        viewportTop,
        viewportLeft,
        headerHeight,
        bodyHeight,
        footerHeight,
      } = this.state;

      const getColumnWidth = column => (column.type === TABLE_FLEX_TYPE
        ? 0
        : column.width || minColumnWidth);

      const getRowsBoundary = (blockRows, top, blockHeight, start, rowHeight) => {
        return getRowsVisibleBoundary(blockRows, top, blockHeight, this.getRowHeight, start, rowHeight)
      };
      const visibleBoundariesComputed = ({
        tableBodyRows,
        // tableHeaderRows,
        // tableFooterRows,
        columns,
        tableColumns,
        loadedRowsStart,
        loadedRowsCount,
      }: Getters,
      // { setFirstRowIndex }: Actions,
      ) => {
        const res = {
          columns: getColumnsVisibleBoundary(columns, viewportLeft, width, getColumnWidth),
          // headerRows: getRowsBoundary(tableHeaderRows, 0, headerHeight),
          bodyRows: getRowsBoundary(
            tableBodyRows, viewportTop, containerHeight - headerHeight - footerHeight, loadedRowsStart, this.props.estimatedRowHeight,
            ),
          // footerRows: getRowsBoundary(tableFooterRows, 0, footerHeight),
        };
        // console.log('recompute bound', viewportTop)

        return res;
      };

      const renderBoundariesComputed = ({
        visibleBoundaries,
        tableBodyRows,
        tableColumns,
        loadedRowsStart,
        // totalRowCount,
      }: Getters) => ({
        bodyRows: getRowsRenderBoundary(loadedRowsStart + tableBodyRows.length - 1, visibleBoundaries.bodyRows, 3),
        columns: visibleBoundaries.columns,// getColumnsRenderBoundary(tableColumns, visibleBoundaries.columns, 1),
      });

      const firstRowIndexComputed = (getters: Getters, actions: Actions) => {
        // onFirstIndexChanged(getters, actions);
        return getters.visibleBoundaries.bodyRows[0];
        // const bodyBoundaries = getRowsBoundary(tableBodyRows, viewportTop, containerHeight - headerHeight - footerHeight);
        // return bodyBoundaries[0];
      }

      const currentVirtualPageBoundaryComputed = ({
        visibleBoundaries, loadedRowsStart, virtualPageOverscan, virtualPageSize,
        loadedRowsCount,
      }: Getters) => {
        const { viewportTop } = this.state;
        const firstRowIndex = visibleBoundaries.bodyRows[0];
        const visibleCount = visibleBoundaries.bodyRows[1] - visibleBoundaries.bodyRows[0];
        const topIndexOffset = firstRowIndex - loadedRowsStart;
        const topBoundaryOffset = loadedRowsStart > 0 ? topIndexOffset - virtualPageOverscan : 0;
        const bottomBoundaryOffset = loadedRowsCount - virtualPageOverscan - topIndexOffset - visibleCount;

        const { estimatedRowHeight } = this.props;

        return [topBoundaryOffset, bottomBoundaryOffset];
      };

      return (
        <Plugin name="VirtualTable">
          <Table layoutComponent={this.layoutRenderComponent} {...restProps} />

          <Getter name="visibleBoundaries" computed={visibleBoundariesComputed} />
          <Getter name="renderBoundaries" computed={renderBoundariesComputed} />
          <Getter name="firstRowIndex" computed={firstRowIndexComputed} />

          <Getter name="currentVirtualPageBoundary" computed={currentVirtualPageBoundaryComputed} />

          <Template name="tableLayout">
            {(params: TableLayoutProps) => {

              return (
                <TemplateConnector>
                  {(
                    { visibleBoundaries, viewportTop, firstRowIndex, virtualPageIndex,
                      currentVirtualPageBoundary, totalRowCount, loadedRowsStart, start,
                      loadedRowsCount, renderBoundaries, loadedRowsStart, tableBodyRows,
                    },
                    { setViewportTop, setFirstRowIndex, getRows, requestNextPage },
                  ) => {
                    const {
                      containerComponent: Container,
                    } = params;

                    console.log(visibleBoundaries.bodyRows);

                    return (
                      <Sizer
                        onSizeChange={this.handleContainerSizeChange}
                        containerComponent={Container}
                        style={{
                          ...(propHeight === AUTO_HEIGHT ? null : { height: `${propHeight}px` }),
                        }}
                        onScroll={this.updateViewport.bind(this, currentVirtualPageBoundary, requestNextPage)}
                        // scrollTop={viewportTop}
                      >
                        <TemplatePlaceholder
                          params={{
                            ...params,
                            blockRefsHandler: this.registerBlockRef,
                            rowRefsHandler: this.registerRowRef,
                            onUpdate: this.handleTableUpdate,
                            visibleBoundaries: renderBoundaries,
                            getRowHeight: this.getRowHeight,
                            getColumnWidth,
                            headerHeight,
                            bodyHeight,
                            footerHeight,
                            containerHeight,
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

  Object.values(Table.components as PluginComponents).forEach((name) => {
    VirtualTable[name] = Table[name];
  });

  VirtualTable.FixedHeader = FixedHeader;
  VirtualTable.FixedFooter = FixedFooter;

  return VirtualTable;
};

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
import { memoize, Memoized } from '@devexpress/dx-core';

const AUTO_HEIGHT = 'auto';

const renderBoundariesComputed = ({
  visibleBoundaries,
  tableBodyRows,
  tableColumns,
  loadedRowsStart,
  // totalRowCount,
}: Getters) => {
  const res = ({
    bodyRows: getRowsRenderBoundary(loadedRowsStart + tableBodyRows.length - 1, visibleBoundaries.bodyRows, 3),
    columns: visibleBoundaries.columns,// getColumnsRenderBoundary(tableColumns, visibleBoundaries.columns, 1),
  });
  // console.log('compute render bounds, vis', visibleBoundaries.bodyRows, 'loaded st', loadedRowsStart)
  return res;
};

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
    visibleBoundariesComputed: Memoized<VirtualTableLayoutState, Function>;
    getColumnWidth: (column: any) => any;

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
          viewportTop: () => {
            const { onViewportTopChange } = this.props;
            return onViewportTopChange;
          }
        }
      );

      this.rowRefs = new Map();
      this.blockRefs = new Map();
      this.registerRowRef = this.registerRowRef.bind(this);
      this.registerBlockRef = this.registerBlockRef.bind(this);

      this.getRowHeight = this.getRowHeight.bind(this);
      this.updateViewport = this.updateViewport.bind(this);
      this.handleContainerSizeChange = this.handleContainerSizeChange.bind(this);
      this.handleTableUpdate = this.handleTableUpdate.bind(this);

      this.getColumnWidth = column => (column.type === TABLE_FLEX_TYPE
        ? 0
        : column.width || minColumnWidth);

      const getRowsBoundary = (blockRows, top, blockHeight, start, rowHeight) => {
        return getRowsVisibleBoundary(blockRows, top, blockHeight, this.getRowHeight, start, rowHeight)
      };

      this.visibleBoundariesComputed = memoize(
        state => ({
          tableBodyRows,
          // tableHeaderRows,
          // tableFooterRows,
          columns,
          tableColumns,
          loadedRowsStart,
          loadedRowsCount,
        }: Getters,
        ) => {
          const { viewportLeft, width, viewportTop, containerHeight, headerHeight, footerHeight } = this.state;
          const res = {
            columns: getColumnsVisibleBoundary(columns, viewportLeft, width, this.getColumnWidth),
            // headerRows: getRowsBoundary(tableHeaderRows, 0, headerHeight),
            bodyRows: getRowsBoundary(
              tableBodyRows, viewportTop, containerHeight - headerHeight - footerHeight, loadedRowsStart, this.props.estimatedRowHeight,
              ),
            // footerRows: getRowsBoundary(tableFooterRows, 0, footerHeight),
          };

          return res;
        },
      );

    }

    componentDidUpdate() {
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

      // console.log('SCROLL', currentVirtualPageBoundary)

      const {
        topTriggerIndex, bottomTriggerIndex, middleIndex,
      } = currentVirtualPageBoundary;
      if (middleIndex <= topTriggerIndex || bottomTriggerIndex <= middleIndex) {
        requestNextPage(middleIndex);
      }

      this.setState({
        viewportTop: node.scrollTop,
        viewportLeft: node.scrollLeft,
      });
    }

    handleContainerSizeChange(currentVirtualPageBoundary, requestNextPage,{ width, height }) {
      this.setState({ width, containerHeight: height });
    }

    handleTableUpdate() {
      // console.log('handle update')
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

      const visibleBoundariesComputed = this.visibleBoundariesComputed(this.state);

      /** how many rows up and down before next page request */
      const currentVirtualPageBoundaryComputed = ({
        visibleBoundaries, loadedRowsStart, virtualPageOverscan, virtualPageSize,
        rows, loadedRowsCount,
      }: Getters,
      { requestNextPage, }: Actions) => {
        if (rows.length === 0) {
          return [0, -1];
        }

        const topTriggerIndex = loadedRowsStart > 0 ? loadedRowsStart + virtualPageSize : 0;
        const bottomTriggerIndex = loadedRowsStart + loadedRowsCount - virtualPageSize;
        const firstRowIndex = visibleBoundaries.bodyRows[0];
        const visibleCount = visibleBoundaries.bodyRows[1] - visibleBoundaries.bodyRows[0];
        const middleIndex = firstRowIndex + Math.round(visibleCount / 2);

        // const topOffset = middleIndex - topTriggerIndex;
        // const bottomOffset = bottomTriggerIndex - middleIndex;
        console.log('compute virtual page bounds. vis bounds',
        'l start', loadedRowsStart,
        'cnt', loadedRowsCount,
        'trigger', topTriggerIndex, bottomTriggerIndex,
        'middle', middleIndex)


        if (middleIndex <= topTriggerIndex || bottomTriggerIndex <= middleIndex) {
          // setTimeout(() => requestNextPage(middleIndex), 0);
        }

        return {
          topTriggerIndex,
          bottomTriggerIndex,
          middleIndex,
        };

        // return [topOffset, bottomOffset];
      };

      return (
        <Plugin name="VirtualTable">
          <Table layoutComponent={this.layoutRenderComponent} {...restProps} />

          <Getter name="visibleBoundaries" computed={visibleBoundariesComputed} />
          <Getter name="renderBoundaries" computed={renderBoundariesComputed} />

          <Getter name="currentVirtualPageBoundary" computed={currentVirtualPageBoundaryComputed} />

          <Template name="tableLayout">
            {(params: TableLayoutProps) => {

              return (
                <TemplateConnector>
                  {(
                    { visibleBoundaries, viewportTop,
                      currentVirtualPageBoundary, totalRowCount, loadedRowsStart, start,
                      loadedRowsCount, renderBoundaries, tableBodyRows,
                    },
                    { getRows, requestNextPage },
                  ) => {
                    const {
                      containerComponent: Container,
                    } = params;

                    // console.log('boundaries', start, loadedRowsStart, visibleBoundaries.bodyRows);
                    // console.log('render v table')
                    // console.log('render bounds', renderBoundaries.bodyRows)

                    return (
                      <Sizer
                        onSizeChange={this.handleContainerSizeChange.bind(this, currentVirtualPageBoundary, requestNextPage)}
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
                            getColumnWidth: this.getColumnWidth,
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

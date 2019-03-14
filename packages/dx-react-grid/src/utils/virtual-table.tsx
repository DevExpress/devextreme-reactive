import * as React from 'react';
import { findDOMNode } from 'react-dom';
import {
  connectProps, Plugin, TemplatePlaceholder, Sizer, Template,
  Getter,
  TemplateConnector, PluginComponents, Getters,
} from '@devexpress/dx-react-core';
import {
  getColumnsVisibleBoundary,
  getRowsVisibleBoundary,
  getRowsRenderBoundary,
  TABLE_FLEX_TYPE,
  TABLE_STUB_TYPE,
  isStubTableCell,
} from '@devexpress/dx-grid-core';
import {
  VirtualTableProps, VirtualTableLayoutProps, VirtualTableLayoutState, TableLayoutProps,
  Table as TableNS,
} from '../types';
import { memoize, Memoized } from '@devexpress/dx-core';

const AUTO_HEIGHT = 'auto';

const renderBoundariesComputed = ({
  visibleBoundaries,
  tableBodyRows,
  virtualRows,
}: Getters) => ({
  bodyRows: getRowsRenderBoundary(
    virtualRows.start + tableBodyRows.length, visibleBoundaries.bodyRows, 3,
  ),
  columns: visibleBoundaries.columns,
});

/** @internal */
export const makeVirtualTable: (...args: any) => any = (Table, {
  VirtualLayout,
  FixedHeader,
  FixedFooter,
  defaultEstimatedRowHeight,
  defaultHeight,
  minColumnWidth,
  StubCell,
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

      const getRowsBoundary = (blockRows, top, blockHeight, start, rowHeight) => (
        getRowsVisibleBoundary(
          blockRows, top, blockHeight, this.getRowHeight, start, rowHeight,
        ));

      this.visibleBoundariesComputed = memoize(
        state => ({
          tableBodyRows,
          columns,
          virtualRows,
        }: Getters,
        ) => {
          const {
            viewportLeft, width, viewportTop, containerHeight, headerHeight, footerHeight,
          } = this.state;
          const loadedRowsStart = virtualRows.start;
          const res = {
            columns: getColumnsVisibleBoundary(columns, viewportLeft, width, this.getColumnWidth),
            bodyRows: getRowsBoundary(
              tableBodyRows, viewportTop, containerHeight - headerHeight - footerHeight,
              loadedRowsStart, this.props.estimatedRowHeight,
            ),
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

      this.ensureNextPage(currentVirtualPageBoundary, requestNextPage, node.scrollTop);

      this.setState({
        viewportTop: node.scrollTop,
        viewportLeft: node.scrollLeft,
      });
    }

    ensureNextPage(currentVirtualPageBoundary, requestNextPage, scrollTop) {
      const {
        topTriggerPosition, bottomTriggerPosition, topTriggerIndex, bottomTriggerIndex,
      } = currentVirtualPageBoundary;
      const { containerHeight } = this.state;
      const { estimatedRowHeight } = this.props;
      const referencePosition = scrollTop + containerHeight / 2;

      const getReferenceIndex = (triggetIndex, triggerPosition) => (
        triggetIndex + Math.round((referencePosition - triggerPosition) / estimatedRowHeight)
      );

      let referenceIndex = null;
      if (referencePosition < topTriggerPosition) {
        referenceIndex = getReferenceIndex(topTriggerIndex, topTriggerPosition);
      }
      if (bottomTriggerPosition < referencePosition) {
        referenceIndex = getReferenceIndex(bottomTriggerIndex, bottomTriggerPosition);
      }

      if (referenceIndex !== null) {
        requestNextPage(referenceIndex);
      }
    }

    handleContainerSizeChange(currentVirtualPageBoundary, requestNextPage, { width, height }) {
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
        ...restProps
      } = this.props;

      const {
        containerHeight,
        headerHeight,
        bodyHeight,
        footerHeight,
      } = this.state;

      const visibleBoundariesComputed = this.visibleBoundariesComputed(this.state);

      /** how many rows up and down before next page request */
      const currentVirtualPageBoundaryComputed = (
        { visibleBoundaries, virtualPageSize, virtualRows }: Getters) => {
        const loadedStart = virtualRows.start;
        const loadedCount = virtualRows.rows.length;

        if (loadedCount === 0) {
          return [0, -1];
        }

        const topTriggerIndex = loadedStart > 0 ? loadedStart + virtualPageSize : 0;
        const bottomTriggerIndex = loadedStart + loadedCount - virtualPageSize;
        const firstRowIndex = visibleBoundaries.bodyRows[0];
        const visibleCount = visibleBoundaries.bodyRows[1] - visibleBoundaries.bodyRows[0];
        const middleIndex = firstRowIndex + Math.round(visibleCount / 2);

        const { viewportTop } = this.state;
        const middlePosition = viewportTop + containerHeight / 2;

        const topTriggerOffset = (middleIndex - topTriggerIndex) * estimatedRowHeight;
        const bottomTriggerOffset = (bottomTriggerIndex - middleIndex) * estimatedRowHeight;
        const topTriggerPosition = middlePosition - topTriggerOffset;
        const bottomTriggerPosition = middlePosition + bottomTriggerOffset;

        return {
          topTriggerIndex,
          topTriggerPosition,
          bottomTriggerIndex,
          bottomTriggerPosition,
        };
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
                    { currentVirtualPageBoundary, totalRowCount, virtualRows,
                      renderBoundaries, visibleBoundaries,
                    },
                    { requestNextPage },
                  ) => {
                    const {
                      containerComponent: Container,
                    } = params;
                    const loadedRowsStart = virtualRows.start;

                    return (
                      <Sizer
                        onSizeChange={
                          this.handleContainerSizeChange
                            .bind(this, currentVirtualPageBoundary, requestNextPage)
                        }
                        containerComponent={Container}
                        style={{
                          ...(propHeight === AUTO_HEIGHT ? null : { height: `${propHeight}px` }),
                        }}
                        onScroll={
                          this.updateViewport
                            .bind(this, currentVirtualPageBoundary, requestNextPage)
                        }
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

          <Template
            name="tableCell"
            predicate={({ tableRow }: any) => !!isStubTableCell(tableRow)}
          >
            {(params: TableNS.CellProps) => (
              <StubCell {...params} />
            )}
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

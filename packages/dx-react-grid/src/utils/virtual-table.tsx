import * as React from 'react';
import { findDOMNode } from 'react-dom';
import {
  connectProps, Plugin, TemplatePlaceholder, Sizer, Template,
  Getter, Action,
  TemplateConnector, createStateHelper, PluginComponents, Getters, ActionFn,
} from '@devexpress/dx-react-core';
import {
  getColumnsVisibleBoundary,
  getRowsVisibleBoundary,
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

      // this.setFirstRowIndex = stateHelper.applyFieldReducer
      //   .bind(stateHelper, 'firstRowIndex', (prevIndex, index) => index);
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
      this.layoutRenderComponent.update();
    }

    getRowHeight(row) {
      const { rowHeights } = this.state;
      const { estimatedRowHeight } = this.props;
      const storedHeight = rowHeights.get(row.key);
      if (storedHeight !== undefined) return storedHeight;
      if (row.height) return row.height;
      return estimatedRowHeight;
    }

    registerRowRef(row, ref) {
      // console.log('register',row)
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

    updateViewport(setViewPortTop, e) {
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

      console.log('scrolltop in handler', node.scrollTop);

      setViewPortTop(node.scrollTop);

      this.setState({
        // viewportTop: node.scrollTop,
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
// console.log(rowsWithChangedHeights)
      if (rowsWithChangedHeights.length) {
        const { rowHeights } = this.state;
        rowsWithChangedHeights
          .forEach(([row, height]) => rowHeights.set(row.key, height));

        this.setState({
          rowHeights,
        });
      }
      // console.log(this.state.rowHeights)
    }

    storeBlockHeights() {
      const getBlockHeight = blockName => (this.blockRefs.get(blockName)
        ? (findDOMNode(this.blockRefs.get(blockName)) as HTMLElement).getBoundingClientRect().height
        : 0
      );
      const headerHeight = getBlockHeight('header');
      const bodyHeight = getBlockHeight('body');
      const footerHeight = getBlockHeight('footer');

      // console.log('header height', headerHeight)
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

      const getRowsBoundary = (blockRows, top, blockHeight) => {
        return getRowsVisibleBoundary(blockRows, top, blockHeight, this.getRowHeight)
      };
      const visibleBoundariesComputed = ({
        tableBodyRows,
        tableHeaderRows,
        tableFooterRows,
        columns,
        tableColumns,
      }: Getters) => {
        console.log('rows', tableHeaderRows, tableBodyRows, tableFooterRows, tableColumns)


        // debugger;
        const res = {
          columns: getColumnsVisibleBoundary(columns, viewportLeft, width, getColumnWidth),
          headerRows: getRowsBoundary(tableHeaderRows, 0, headerHeight),
          bodyRows: getRowsBoundary(tableBodyRows, viewportTop, containerHeight - headerHeight - footerHeight),
          footerRows: getRowsBoundary(tableFooterRows, 0, footerHeight),
        };

        console.log(viewportTop, res);
        return res;
      };
      const firstRowIndexComputed = ({
        tableBodyRows,
      }: Getters) => {
        const bodyBoundaries = getRowsBoundary(tableBodyRows, viewportTop, containerHeight - headerHeight - footerHeight);
        return bodyBoundaries[0];
      }

      return (
        <Plugin name="VirtualTable">
          <Table layoutComponent={this.layoutRenderComponent} {...restProps} />

          <Getter name="visibleBoundaries" computed={visibleBoundariesComputed} />

          <Getter name="firstRowIndex" computed={firstRowIndexComputed} />
          <Getter name="viewportTop" value={viewportTop} />
          {/* <Action name="setFirstRowIndex" action={this.setFirstRowIndex} /> */}
          <Action name="setViewportTop" action={this.setViewportTop} />

          <Template name="tableLayout">
            {(params: TableLayoutProps) => {

              return (
                <TemplateConnector>
                  {(
                    { visibleBoundaries, viewportTop, firstRowIndex },
                    { setViewportTop },
                  ) => {
                    const {
                      containerComponent: Container,
                    } = params;
                    console.log('vp', viewportTop, 'ind', firstRowIndex )

                    return (
                      <Sizer
                        onSizeChange={this.handleContainerSizeChange}
                        containerComponent={Container}
                        style={{
                          ...(propHeight === AUTO_HEIGHT ? null : { height: `${propHeight}px` }),
                        }}
                        onScroll={this.updateViewport.bind(this, setViewportTop)}
                        // scrollTop={viewportTop}
                      >
                        <TemplatePlaceholder
                          params={{
                            ...params,
                            blockRefsHandler: this.registerBlockRef,
                            rowRefsHandler: this.registerRowRef,
                            onUpdate: this.handleTableUpdate,
                            visibleBoundaries,
                            getRowHeight: this.getRowHeight,
                            getColumnWidth,
                            headerHeight,
                            bodyHeight,
                            footerHeight,
                            containerHeight,
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

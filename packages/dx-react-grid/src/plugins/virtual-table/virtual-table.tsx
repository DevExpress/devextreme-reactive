import * as React from 'react';
import {
  connectProps, Plugin, Template, Action,
  PluginComponents,
  TemplateConnector,
  TemplatePlaceholder,
  Getter,
  Getters,
} from '@devexpress/dx-react-core';
import {
  isStubTableCell, checkColumnWidths, getScrollTop,
  TOP_POSITION, BOTTOM_POSITION, getTopRowId,
} from '@devexpress/dx-grid-core';
import {
  VirtualTableProps, VirtualTableLayoutProps,
  Table as TableNS,
  TableLayoutProps,
  VirtualTablePluginState,
} from '../../types';

/** @internal */
export const emptyViewport = {
  columns: [[0, 0]],
  rows: [0, 0],
  headerRows: [0, 0],
  footerRows: [0, 0],
  top: 0,
  left: 0,
  width: 800,
  height: 600,
};

const tableColumnsComputed = (
  { tableColumns }: Getters,
) => {
  return checkColumnWidths(tableColumns);
};

/** @internal */
export const makeVirtualTable: (...args: any) => any = (Table, {
  VirtualLayout,
  FixedHeader,
  FixedFooter,
  SkeletonCell,
  defaultEstimatedRowHeight,
  defaultHeight,
}) => {
  class VirtualTable extends React.PureComponent<VirtualTableProps, VirtualTablePluginState> {
    static defaultProps = {
      estimatedRowHeight: defaultEstimatedRowHeight,
      height: defaultHeight,
      headTableComponent: FixedHeader,
      footerTableComponent: FixedFooter,
      skeletonCellComponent: SkeletonCell,
      onTopRowChange: () => {},
    };
    static FixedHeader: React.ComponentType;
    static FixedFooter: React.ComponentType;
    static SkeletonCell: React.ComponentType;
    static TOP_POSITION = TOP_POSITION;
    static BOTTOM_POSITION = BOTTOM_POSITION;

    layoutRenderComponent: React.ComponentType<VirtualTableLayoutProps> & { update(): void; };
    scrollToRow: (prop: number | string | symbol) => void;
    scrollToColumn: (prop: symbol) => void;

    constructor(props) {
      super(props);

      this.state = {
        viewport: emptyViewport,
        nextRowId: undefined,
        nextColumnId: undefined,
      };

      this.layoutRenderComponent = connectProps(VirtualLayout, () => {
        const {
          headTableComponent,
          footerTableComponent,
        } = this.props;

        return {
          headTableComponent,
          footerTableComponent,
        };
      });
      this.scrollToRow = nextRowId => this.setState({ nextRowId });
      this.scrollToColumn = nextColumnId => this.setState({ nextColumnId });
    }

    setViewport = (viewport) => {
      this.setState({ viewport });
    }

    componentDidUpdate(prevProps, prevState) {
      const { nextRowId: prevId } = prevState;
      const { nextRowId: currentId } = this.state;
      const areIdsEqual = currentId !== undefined && currentId === prevId;

      this.layoutRenderComponent.update();
      if (areIdsEqual) {
        this.setState({ nextRowId: undefined });
      }
    }

    render() {
      const {
        height,
        estimatedRowHeight,
        skeletonCellComponent: SkeletonStubCell,
        children,
        ...restProps
      } = this.props;
      const {
        viewport: stateViewport,
        nextRowId: nextId,
        nextColumnId,
      } = this.state;

      return (
        <Plugin name="VirtualTable">
          <Table layoutComponent={this.layoutRenderComponent} {...restProps} />

          {/* prevents breaking change */}
          <Action name="setViewport" action={this.setViewport} />
          <Action name="scrollToRow" action={this.scrollToRow} />
          <Action name="scrollToColumn" action={this.scrollToColumn} />
          <Getter name="viewport" value={stateViewport} />
          <Getter name="tableColumns" computed={tableColumnsComputed} />

          <Template name="tableLayout">
            {(params: TableLayoutProps) => (
              <TemplateConnector>
                {(
                  { availableRowCount, loadedRowsStart, tableBodyRows, isDataRemote, viewport },
                  { setViewport },
                ) => {

                  const { onTopRowChange } = this.props;
                  const rowId = getTopRowId(viewport, tableBodyRows, isDataRemote);

                  onTopRowChange(rowId);

                  const totalRowCount = availableRowCount || tableBodyRows.length;
                  const scrollTop = getScrollTop(
                    tableBodyRows,
                    totalRowCount,
                    nextId,
                    estimatedRowHeight,
                    isDataRemote,
                  );

                  return (
                    <TemplatePlaceholder
                      params={{
                        ...params,
                        totalRowCount,
                        loadedRowsStart,
                        isDataRemote,
                        height,
                        estimatedRowHeight,
                        setViewport,
                        viewport,
                        scrollTop,
                        nextColumnId,
                      }}
                    />
                  );
                }}
              </TemplateConnector>
            )}
          </Template>

          <Template
            name="tableCell"
            predicate={({ tableRow }: any) => !!isStubTableCell(tableRow)}
          >
            {(params: TableNS.CellProps) => (
              <TemplateConnector>
                {({ isDataRemote }) => (
                  isDataRemote ? <SkeletonStubCell {...params} /> : <TemplatePlaceholder />
                )}
              </TemplateConnector>
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
  VirtualTable.SkeletonCell = SkeletonCell;

  return VirtualTable;
};

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
  isStubTableCell, checkColumnWidths, calculateScrollHeight,
} from '@devexpress/dx-grid-core';
import {
  VirtualTableProps, VirtualTableLayoutProps,
  Table as TableNS,
  TableLayoutProps,
  VirtualTablePluginState,
  VirtualTable as VirtualTableNS,
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

    layoutRenderComponent: React.ComponentType<VirtualTableLayoutProps> & { update(): void; };
    scrollToRow: (prop: VirtualTableNS.RowIdentifier) => void;

    constructor(props) {
      super(props);

      this.state = {
        viewport: emptyViewport,
        nextRow: {},
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
      this.scrollToRow = nextRow => this.setState({ nextRow });
    }

    setViewport = (viewport, { tableBodyRows, isDataRemote }: Getters) => {
      const { onTopRowChange } = this.props;
      const hasViewportRows = viewport && viewport.rows;
      const hasBodyRows = tableBodyRows && tableBodyRows.length;
      const index = hasViewportRows ? viewport.rows[0] : undefined;
      const id = hasViewportRows && hasBodyRows && !isDataRemote
        ? tableBodyRows[viewport.rows[0]].rowId
        : undefined;

      onTopRowChange({ id, index });
      this.setState({ viewport });
    }

    componentDidUpdate(prevProps, prevState) {
      const { nextRow: { id: prevId, index: prevIndex } } = prevState;
      const { nextRow: { id: currentId, index: currentIndex } } = this.state;
      const equalIds = currentId !== undefined && currentId === prevId;
      const equalIndexes = currentIndex !== undefined && currentIndex === prevIndex;

      this.layoutRenderComponent.update();
      if (equalIds || equalIndexes) {
        this.setState({ nextRow: {} });
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
        nextRow: { id: nextId, index: nextIndex },
      } = this.state;

      return (
        <Plugin name="VirtualTable">
          <Table layoutComponent={this.layoutRenderComponent} {...restProps} />

          {/* prevents breaking change */}
          <Action name="setViewport" action={this.setViewport} />
          <Getter name="viewport" value={stateViewport} />
          <Getter name="tableColumns" computed={tableColumnsComputed} />

          <Template name="tableLayout">
            {(params: TableLayoutProps) => (
              <TemplateConnector>
                {(
                  { availableRowCount, loadedRowsStart, tableBodyRows, isDataRemote, viewport },
                  { setViewport },
                ) => {
                  const totalRowCount = availableRowCount || tableBodyRows.length;

                  const indexById = !isDataRemote && nextId !== undefined
                    ? tableBodyRows.findIndex(row => row.rowId === nextId)
                    : undefined;
                  const scrollIndex = indexById !== undefined
                    ? indexById : nextIndex;
                  const scrollTop = calculateScrollHeight(
                    estimatedRowHeight,
                    scrollIndex,
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

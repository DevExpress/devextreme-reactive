import * as React from 'react';
import {
  connectProps, Plugin, Template, Action,
  PluginComponents,
  TemplateConnector,
  TemplatePlaceholder,
  Getter,
} from '@devexpress/dx-react-core';
import {
  isStubTableCell,
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
  viewportTop: 0,
  viewportLeft: 0,
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
    };
    static FixedHeader: React.ComponentType;
    static FixedFooter: React.ComponentType;
    static SkeletonCell: React.ComponentType;

    layoutRenderComponent: React.ComponentType<VirtualTableLayoutProps> & { update(): void; };

    constructor(props) {
      super(props);

      this.state = {
        viewport: emptyViewport,
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
    }

    setViewport = viewport => this.setState({ viewport });

    componentDidUpdate() {
      this.layoutRenderComponent.update();
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
      } = this.state;

      return (
        <Plugin name="VirtualTable">
          <Table layoutComponent={this.layoutRenderComponent} {...restProps} />

          {/* prevents breaking change */}
          <Action name="setViewport" action={this.setViewport} />
          <Getter name="viewport" value={stateViewport} />

          <Template name="tableLayout">
            {(params: TableLayoutProps) => (
              <TemplateConnector>
                {(
                  { availableRowCount, loadedRowsStart, tableBodyRows, isDataRemote, viewport },
                  { setViewport },
                ) => {

                  const totalRowCount = availableRowCount || tableBodyRows.length;

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

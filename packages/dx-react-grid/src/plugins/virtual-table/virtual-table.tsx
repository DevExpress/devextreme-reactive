import * as React from 'react';
import {
  connectProps, Plugin, Template,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  isStubTableCell,
} from '@devexpress/dx-grid-core';
import {
  VirtualTableProps, VirtualTableLayoutProps, VirtualTableLayoutState,
  Table as TableNS,
} from '../../types';
import { RemoteDataLoader } from './remote-data';
import { VirtualTableViewport } from './virtual-table-viewport';

/** @internal */
export const makeVirtualTable: (...args: any) => any = (Table, {
  VirtualLayout,
  FixedHeader,
  FixedFooter,
  SkeletonCell,
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
      skeletonCellComponent: SkeletonCell,
    };
    static FixedHeader: React.ComponentType;
    static FixedFooter: React.ComponentType;
    static SkeletonCell: React.ComponentType;

    layoutRenderComponent: React.ComponentType<VirtualTableLayoutProps> & { update(): void; };

    constructor(props) {
      super(props);

      this.layoutRenderComponent = connectProps(VirtualLayout, () => {
        const {
          height,
          estimatedRowHeight,
          headTableComponent,
          footerTableComponent,
        } = this.props;

        return {
          height,
          estimatedRowHeight,
          headTableComponent,
          footerTableComponent,
        };
      });
    }

    componentDidUpdate() {
      this.layoutRenderComponent.update();
    }

    render() {
      const {
        height: propHeight,
        estimatedRowHeight,
        headTableComponent,
        skeletonCellComponent: SkeletonStubCell,
        children,
        ...restProps
      } = this.props;

      return (
        <Plugin name="VirtualTable">
          <Table layoutComponent={this.layoutRenderComponent} {...restProps} />
          <RemoteDataLoader
            estimatedRowHeight={estimatedRowHeight}
          />
          <VirtualTableViewport
            estimatedRowHeight={estimatedRowHeight}
            minColumnWidth={minColumnWidth}
          />

          <Template
            name="tableCell"
            predicate={({ tableRow }: any) => !!isStubTableCell(tableRow)}
          >
            {(params: TableNS.CellProps) => (
              <SkeletonStubCell {...params} />
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

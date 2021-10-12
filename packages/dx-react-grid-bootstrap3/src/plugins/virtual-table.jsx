import * as React from 'react';
import { makeVirtualTable } from '@devexpress/dx-react-grid';
import { Table } from './table';
import { Table as TableComponent } from '../templates/table';
import { VirtualTableLayout as VirtualLayout } from '../templates/virtual-table-layout';
import { TableSkeletonCell as SkeletonCell } from '../templates/table-skeleton-cell';

const FixedHeader = React.forwardRef((props, ref) => <TableComponent use="head" ref={ref} {...props} />);
const FixedFooter = React.forwardRef((props, ref) => <TableComponent use="foot" ref={ref} {...props} />);

export const VirtualTable = makeVirtualTable(Table, {
  VirtualLayout,
  FixedHeader,
  FixedFooter,
  SkeletonCell,
  defaultEstimatedRowHeight: 37,
  defaultHeight: 530,
});

VirtualTable.COLUMN_TYPE = Table.COLUMN_TYPE;
VirtualTable.ROW_TYPE = Table.ROW_TYPE;
VirtualTable.NODATA_ROW_TYPE = Table.NODATA_ROW_TYPE;

import * as React from 'react';
import { makeVirtualTable } from '@devexpress/dx-react-grid';
import { Table } from './table';
import { Table as TableComponent } from '../templates/table';
import { TableSkeletonCell as SkeletonCell } from '../templates/table-skeleton-cell';
import { VirtualTableLayout as VirtualLayout } from '../templates/virtual-table-layout';

const FixedHeader = props => <TableComponent use="head" {...props} />;
const FixedFooter = props => <TableComponent use="foot" {...props} />;

export const VirtualTable = makeVirtualTable(Table, {
  VirtualLayout,
  FixedHeader,
  FixedFooter,
  SkeletonCell,
  defaultEstimatedRowHeight: 49,
  defaultHeight: 530,
});

VirtualTable.COLUMN_TYPE = Table.COLUMN_TYPE;
VirtualTable.ROW_TYPE = Table.ROW_TYPE;
VirtualTable.NODATA_ROW_TYPE = Table.NODATA_ROW_TYPE;

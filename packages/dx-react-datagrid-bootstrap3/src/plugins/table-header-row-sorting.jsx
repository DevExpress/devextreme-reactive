import React from 'react';
import { TableHeaderRowSorting as TableHeaderRowSortingBase } from '@devexpress/dx-react-datagrid';
import { SortableCell } from '../templates/sortable-cell';

export const TableHeaderRowSorting = props => (
  <TableHeaderRowSortingBase
    sortableCellTemplate={SortableCell}
    {...props}
  />
);

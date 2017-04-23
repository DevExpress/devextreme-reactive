import React from 'react';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-datagrid';
import { FilterCell } from '../templates/filter-cell';

export const TableFilterRow = props => (
  <TableFilterRowBase
    filterCellTemplate={FilterCell}
    rowHeight={51}
    {...props}
  />
);

import React from 'react';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';

export const TableHeaderRow = props => (
  <TableHeaderRowBase
    headerCellTemplate={TableHeaderCell}
    {...props}
  />
);

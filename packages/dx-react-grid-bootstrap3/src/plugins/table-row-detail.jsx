import React from 'react';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-grid';
import { TableDetailToggleCell } from '../templates/table-detail-toggle-cell';
import { TableDetailCell } from '../templates/table-detail-cell';

export const TableRowDetail = props => (
  <TableRowDetailBase
    detailToggleTemplate={TableDetailToggleCell}
    detailCellTemplate={TableDetailCell}
    {...props}
  />
);

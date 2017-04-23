import React from 'react';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-datagrid';
import { TableDetailToggle } from '../templates/table-detail-toggle';

export const TableRowDetail = props => (
  <TableRowDetailBase
    detailToggleTemplate={TableDetailToggle}
    {...props}
  />
);

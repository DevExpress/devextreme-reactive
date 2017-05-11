import React from 'react';
import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupRowCell } from '../templates/table-group-row-cell';

export const TableGroupRow = props => (
  <TableGroupRowBase
    groupRowCellTemplate={TableGroupRowCell}
    {...props}
  />
);


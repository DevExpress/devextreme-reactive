import React from 'react';
import { TableSelection as TableSelectionBase } from '@devexpress/dx-react-datagrid';
import { TableSelectAllCell } from '../templates/table-select-all-cell';
import { TableSelectCell } from '../templates/table-select-cell';

export const TableSelection = props => (
  <TableSelectionBase
    selectCellTemplate={TableSelectCell}
    selectAllCellTemplate={TableSelectAllCell}
    {...props}
  />
);

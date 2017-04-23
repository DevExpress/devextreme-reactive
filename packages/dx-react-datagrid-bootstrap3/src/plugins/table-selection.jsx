import React from 'react';
import { TableSelection as TableSelectionBase } from '@devexpress/dx-react-datagrid';
import { SelectAllCell } from '../templates/select-all-cell';
import { SelectCell } from '../templates/select-cell';

export const TableSelection = props => (
  <TableSelectionBase
    selectCellTemplate={SelectCell}
    selectAllCellTemplate={SelectAllCell}
    {...props}
  />
);

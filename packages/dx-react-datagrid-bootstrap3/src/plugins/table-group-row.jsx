import React from 'react';
import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-datagrid';
import { TableGroupRowCell } from '../templates/table-group-row-cell';

export const TableGroupRow = () => (
  <TableGroupRowBase
    groupRowCellTemplate={TableGroupRowCell}
  />
);


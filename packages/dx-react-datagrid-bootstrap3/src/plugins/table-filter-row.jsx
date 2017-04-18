import React from 'react';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-datagrid';
import { TableFilterCell } from '../templates/table-filter-cell';

export const TableFilterRow = () => (
  <TableFilterRowBase filterCellTemplate={TableFilterCell} rowHeight={47} />
);

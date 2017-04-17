import React from 'react';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-datagrid';
import { HeaderCell } from '../templates/header-cell';

export const TableHeaderRow = () => (
  <TableHeaderRowBase headerCellTemplate={HeaderCell} />
);

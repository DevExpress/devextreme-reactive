import React from 'react';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { Layout } from '../templates/layout';

export const TableView = () => (
  <div>
    <TableViewBase
      tableTemplate={Table}
      tableCellTemplate={TableCell}
    />
    <Layout />
  </div>
);

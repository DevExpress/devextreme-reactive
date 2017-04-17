import React from 'react';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { Table, DefaultTableCell } from '../templates/table';
import { Layout } from '../templates/layout';

export const TableView = () => (
  <div>
    <TableViewBase
      tableTemplate={Table}
      cellTemplate={DefaultTableCell}
    />
    <Layout />
  </div>
);

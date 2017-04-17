import React from 'react';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { VirtualTable } from '../templates/virtual-table';
import { DefaultTableCell } from '../templates/table';
import { Layout } from '../templates/layout';

export const VirtualTableView = () => (
  <div>
    <TableViewBase
      tableTemplate={VirtualTable}
      cellTemplate={DefaultTableCell}
    />
    <Layout />
  </div>
);

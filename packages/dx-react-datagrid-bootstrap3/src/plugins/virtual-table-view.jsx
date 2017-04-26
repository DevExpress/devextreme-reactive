import React from 'react';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { VirtualTable } from '../templates/virtual-table';
import { TableCell } from '../templates/table-cell';
import { Layout } from '../templates/layout';

export const VirtualTableView = () => (
  <div>
    <TableViewBase
      tableTemplate={VirtualTable}
      tableCellTemplate={TableCell}
    />
    <Layout />
  </div>
);

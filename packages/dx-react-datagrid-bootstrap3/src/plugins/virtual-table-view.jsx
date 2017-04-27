import React from 'react';
import { PluginContainer } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { VirtualTable } from '../templates/virtual-table';
import { TableCell } from '../templates/table-cell';
import { Layout } from '../templates/layout';

export const VirtualTableView = props => (
  <PluginContainer>
    <TableViewBase
      tableTemplate={VirtualTable}
      tableCellTemplate={TableCell}
      {...props}
    />
    <Layout />
  </PluginContainer>
);

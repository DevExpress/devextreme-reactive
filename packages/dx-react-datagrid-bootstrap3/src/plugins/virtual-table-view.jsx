import React from 'react';
import { PluginContainer } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { VirtualTable } from '../templates/virtual-table';
import { Layout } from '../templates/layout';

export const VirtualTableView = props => (
  <PluginContainer>
    <TableViewBase
      tableTemplate={VirtualTable}
      {...props}
    />
    <Layout />
  </PluginContainer>
);

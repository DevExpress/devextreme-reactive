import React from 'react';
import { PluginContainer } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { Table } from '../templates/table';
import { Layout } from '../templates/layout';

export const TableView = props => (
  <PluginContainer>
    <TableViewBase
      tableTemplate={Table}
      {...props}
    />
    <Layout />
  </PluginContainer>
);

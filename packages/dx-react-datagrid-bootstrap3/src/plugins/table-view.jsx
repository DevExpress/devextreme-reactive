import React from 'react';
import { PluginContainer } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { Layout } from '../templates/layout';

export const TableView = props => (
  <PluginContainer>
    <TableViewBase
      tableTemplate={Table}
      tableCellTemplate={TableCell}
      {...props}
    />
    <Layout />
  </PluginContainer>
);

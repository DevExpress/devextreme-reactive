import React from 'react';
import { PluginContainer, combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { Layout } from '../templates/layout';

export const TableView = ({ tableCellTemplate, ...props }) => (
  <PluginContainer>
    <TableViewBase
      tableTemplate={Table}
      tableCellTemplate={combineTemplates(tableCellTemplate, TableCell)}
      {...props}
    />
    <Layout />
  </PluginContainer>
);
TableView.propTypes = {
  tableCellTemplate: React.PropTypes.func,
};
TableView.defaultProps = {
  tableCellTemplate: undefined,
};

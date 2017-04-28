import React from 'react';
import { PluginContainer, combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { VirtualTable } from '../templates/virtual-table';
import { TableCell } from '../templates/table-cell';
import { Layout } from '../templates/layout';

export const VirtualTableView = ({ tableCellTemplate, ...props }) => (
  <PluginContainer>
    <TableViewBase
      tableTemplate={VirtualTable}
      tableCellTemplate={combineTemplates(tableCellTemplate, TableCell)}
      {...props}
    />
    <Layout />
  </PluginContainer>
);
VirtualTableView.propTypes = {
  tableCellTemplate: React.PropTypes.func,
};
VirtualTableView.defaultProps = {
  tableCellTemplate: undefined,
};

import React from 'react';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { combineTemplates } from '@devexpress/dx-react-core';
import { VirtualTable } from '../templates/virtual-table';
import { TableCell } from '../templates/table-cell';
import { Layout } from '../templates/layout';

export const VirtualTableView = ({ tableCellTemplate }) => (
  <div>
    <TableViewBase
      tableTemplate={VirtualTable}
      tableCellTemplate={combineTemplates(tableCellTemplate, TableCell)}
    />
    <Layout />
  </div>
);
VirtualTableView.propTypes = {
  tableCellTemplate: React.PropTypes.func,
};
VirtualTableView.defaultProps = {
  tableCellTemplate: undefined,
};

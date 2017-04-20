import React from 'react';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { Layout } from '../templates/layout';

export const TableView = ({ children }) => (
  <div>
    <TableViewBase
      tableTemplate={Table}
      tableCellTemplate={TableCell}
    >
      {children}
    </TableViewBase>
    <Layout />
  </div>
);
TableView.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};
TableView.defaultProps = {
  children: undefined,
};

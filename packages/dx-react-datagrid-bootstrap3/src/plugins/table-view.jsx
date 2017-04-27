import React from 'react';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { combineTemplates } from '@devexpress/dx-react-core';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { Layout } from '../templates/layout';

export const TableView = ({ tableCellTemplate }) => (
  <div>
    <TableViewBase
      tableTemplate={Table}
      tableCellTemplate={combineTemplates(tableCellTemplate, TableCell)}
    />
    <Layout />
  </div>
);
TableView.propTypes = {
  tableCellTemplate: React.PropTypes.func,
};
TableView.defaultProps = {
  tableCellTemplate: undefined,
};

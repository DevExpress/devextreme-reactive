import React from 'react';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { Table } from '../templates/table';
import { Layout } from '../templates/layout';

export const TableView = ({ getCellInfo, cellContentTemplate }) => (
  <div>
    <TableViewBase
      getCellInfo={getCellInfo}
      tableTemplate={Table}
      cellContentTemplate={cellContentTemplate}
    />
    <Layout />
  </div>
);

TableView.propTypes = {
  getCellInfo: React.PropTypes.func,
  cellContentTemplate: React.PropTypes.func,
};

TableView.defaultProps = {
  getCellInfo: undefined,
  cellContentTemplate: undefined,
};

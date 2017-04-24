import React from 'react';
import PropTypes from 'prop-types';
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
  getCellInfo: PropTypes.func,
  cellContentTemplate: PropTypes.func,
};

TableView.defaultProps = {
  getCellInfo: undefined,
  cellContentTemplate: undefined,
};

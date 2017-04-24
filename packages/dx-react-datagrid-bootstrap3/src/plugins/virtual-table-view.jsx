import React from 'react';
import PropTypes from 'prop-types';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { VirtualTable } from '../templates/virtual-table';
import { Layout } from '../templates/layout';

export const VirtualTableView = ({ getCellInfo, cellContentTemplate }) => (
  <div>
    <TableViewBase
      getCellInfo={getCellInfo}
      tableTemplate={VirtualTable}
      cellContentTemplate={cellContentTemplate}
    />
    <Layout />
  </div>
);

VirtualTableView.propTypes = {
  getCellInfo: PropTypes.func,
  cellContentTemplate: PropTypes.func,
};

VirtualTableView.defaultProps = {
  getCellInfo: undefined,
  cellContentTemplate: undefined,
};

import React from 'react';
import { TableView as TableViewBase } from '@devexpress/dx-react-datagrid';
import { Table } from '../templates/table';
import { Layout } from '../templates/layout';

export const TableView = ({ getCellInfo, cellContentTemplate, highlightSelected }) => (
  <div>
    <TableViewBase
      getCellInfo={getCellInfo}
      tableTemplate={props => <Table highlightSelected={highlightSelected} {...props} />}
      cellContentTemplate={cellContentTemplate}
    />
    <Layout />
  </div>
);

TableView.propTypes = {
  highlightSelected: React.PropTypes.bool,
  getCellInfo: React.PropTypes.func,
  cellContentTemplate: React.PropTypes.func,
};

TableView.defaultProps = {
  highlightSelected: false,
  getCellInfo: undefined,
  cellContentTemplate: undefined,
};

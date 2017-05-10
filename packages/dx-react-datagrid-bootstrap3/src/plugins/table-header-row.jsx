import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-datagrid';
import { TableHeaderCell } from '../templates/table-header-cell';

export const TableHeaderRow = ({ allowSorting, allowGrouping }) => (
  <TableHeaderRowBase
    headerCellTemplate={TableHeaderCell}
    allowSorting={allowSorting}
    allowGrouping={allowGrouping}
  />
);

TableHeaderRow.defaultProps = {
  allowSorting: false,
  allowGrouping: false,
};

TableHeaderRow.propTypes = {
  allowSorting: PropTypes.bool,
  allowGrouping: PropTypes.bool,
};

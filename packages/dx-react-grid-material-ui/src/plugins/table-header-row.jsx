import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';

const headerCellTemplate = props => <TableHeaderCell {...props} />;

export const TableHeaderRow = ({ allowSorting, allowGrouping }) => (
  <TableHeaderRowBase
    headerCellTemplate={headerCellTemplate}
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

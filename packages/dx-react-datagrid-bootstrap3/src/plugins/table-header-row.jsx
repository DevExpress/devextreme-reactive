import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-datagrid';
import { TableHeaderCell } from '../templates/table-header-cell';

export const TableHeaderRow = ({ sortingEnabled, groupingEnabled }) => (
  <TableHeaderRowBase
    headerCellTemplate={TableHeaderCell}
    sortingEnabled={sortingEnabled}
    groupingEnabled={groupingEnabled}
  />
);

TableHeaderRow.defaultProps = {
  sortingEnabled: false,
  groupingEnabled: false,
};

TableHeaderRow.propTypes = {
  sortingEnabled: PropTypes.bool,
  groupingEnabled: PropTypes.bool,
};

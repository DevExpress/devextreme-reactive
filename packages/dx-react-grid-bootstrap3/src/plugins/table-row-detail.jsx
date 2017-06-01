import React from 'react';
import PropTypes from 'prop-types';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-grid';
import { TableDetailToggleCell } from '../templates/table-detail-toggle-cell';
import { TableDetailCell } from '../templates/table-detail-cell';

export const TableRowDetail = props => (
  <TableRowDetailBase
    detailToggleTemplate={TableDetailToggleCell}
    detailCellTemplate={TableDetailCell}
    {...props}
  />
);

TableRowDetail.defaultProps = {
  detailToggleCellWidth: 25,
};

TableRowDetail.propTypes = {
  detailToggleCellWidth: PropTypes.number,
};


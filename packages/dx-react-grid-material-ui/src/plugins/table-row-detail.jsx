import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-grid';
import { TableRow } from 'material-ui';
import { TableDetailToggleCell } from '../templates/table-detail-toggle-cell';
import { TableDetailCell } from '../templates/table-detail-cell';

const detailToggleCellTemplate = props => <TableDetailToggleCell {...props} />;
const detailCellTemplate = props => <TableDetailCell {...props} />;
// eslint-disable-next-line react/prop-types
const defaultDetailRowTemplate = ({ tableRow, children, ...restProps }) => (
  <TableRow {...restProps}>
    {children}
  </TableRow>
);

export const TableRowDetail = ({ detailRowTemplate, ...restProps }) => (
  <TableRowDetailBase
    detailToggleCellTemplate={detailToggleCellTemplate}
    detailCellTemplate={detailCellTemplate}
    detailRowTemplate={combineTemplates(
      detailRowTemplate,
      defaultDetailRowTemplate,
    )}
    detailToggleCellWidth={38}
    {...restProps}
  />
);

TableRowDetail.propTypes = {
  detailRowTemplate: PropTypes.func,
};
TableRowDetail.defaultProps = {
  detailRowTemplate: undefined,
};

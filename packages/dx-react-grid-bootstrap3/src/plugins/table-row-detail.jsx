import React from 'react';
import PropTypes from 'prop-types';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-grid';
import { TableDetailToggle } from '../templates/table-detail-toggle';

export const TableRowDetail = ({ template, ...restProps }) => (
  <TableRowDetailBase
    detailToggleTemplate={TableDetailToggle}
    template={({ colspan, style, ...params }) =>
      <td style={style} colSpan={colspan}>{template(params)}</td>}
    {...restProps}
  />
);

TableRowDetail.propTypes = {
  template: PropTypes.func.isRequired,
};

import React from 'react';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-datagrid';
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
  template: React.PropTypes.func.isRequired,
};

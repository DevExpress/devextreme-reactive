import React from 'react';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-grid';
import { TableDetailToggle } from '../templates/table-detail-toggle';

export const TableRowDetail = props => (
  <TableRowDetailBase
    detailToggleTemplate={TableDetailToggle}
    detailCellTemplate={({ colspan, style, content }) =>
      <td style={style} colSpan={colspan}>{content}</td>}
    {...props}
  />
);

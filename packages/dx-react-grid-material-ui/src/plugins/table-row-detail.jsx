import React from 'react';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-grid';
import { TableDetailToggleCell } from '../templates/table-detail-toggle-cell';
import { TableDetailCell } from '../templates/table-detail-cell';

const detailToggleCellTemplate = props => <TableDetailToggleCell {...props} />;
const detailCellTemplate = props => <TableDetailCell {...props} />;

export const TableRowDetail = props => (
  <TableRowDetailBase
    detailToggleCellTemplate={detailToggleCellTemplate}
    detailCellTemplate={detailCellTemplate}
    detailToggleCellWidth={38}
    {...props}
  />
);

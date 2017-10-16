import React from 'react';
import { TableColumnReordering as TableColumnReorderingBase } from '@devexpress/dx-react-grid';
import { TableRow } from '../templates/table-row';
import { TableReorderingCell } from '../templates/table-reordering-cell';

// eslint-disable-next-line react/prop-types
const reorderingRowTemplate = ({ style, ...restParams }) => (
  <TableRow
    style={{
      ...style,
      visibility: 'hidden',
    }}
    {...restParams}
  />
);
const reorderingCellTemplate = params => <TableReorderingCell {...params} />;

export const TableColumnReordering = props => (
  <TableColumnReorderingBase
    reorderingRowTemplate={reorderingRowTemplate}
    reorderingCellTemplate={reorderingCellTemplate}
    {...props}
  />
);

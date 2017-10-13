import React from 'react';
import { TableColumnReordering as TableColumnReorderingBase } from '@devexpress/dx-react-grid';
import { TableReorderingRow } from '../templates/table-reordering-row';
import { TableReorderingCell } from '../templates/table-reordering-cell';

const reorderingRowTemplate = params => <TableReorderingRow {...params} />;
const reorderingCellTemplate = params => <TableReorderingCell {...params} />;

export const TableColumnReordering = props => (
  <TableColumnReorderingBase
    reorderingRowTemplate={reorderingRowTemplate}
    reorderingCellTemplate={reorderingCellTemplate}
    {...props}
  />
);

import React from 'react';

import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupCell } from '../templates/table-group-row-cell';

const groupCellTemplate = props => <TableGroupCell {...props} />;

export const TableGroupRow = props => (
  <TableGroupRowBase
    groupCellTemplate={groupCellTemplate}
    groupIndentColumnWidth={22}
    {...props}
  />
);

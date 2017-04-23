import React from 'react';
import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-datagrid';
import { GroupRowCell } from '../templates/group-row-cell';

export const TableGroupRow = props => (
  <TableGroupRowBase
    groupRowCellTemplate={GroupRowCell}
    {...props}
  />
);


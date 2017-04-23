import React from 'react';
import { TableHeaderRowGrouping as TableHeaderRowGroupingBase } from '@devexpress/dx-react-datagrid';
import { GroupableCell } from '../templates/groupable-cell';

export const TableHeaderRowGrouping = props => (
  <TableHeaderRowGroupingBase
    groupableCellTemplate={GroupableCell}
    {...props}
  />
);

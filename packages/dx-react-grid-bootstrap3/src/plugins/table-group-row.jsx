import React from 'react';

import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupRowCell, TableGroupIndentCell } from '../templates/table-group-row-cell';

export const TableGroupRow = props => (
  <TableGroupRowBase
    groupRowCellTemplate={TableGroupRowCell}
    groupIndentCellTemplate={TableGroupIndentCell}
    groupColumnWidth={20}
    {...props}
  />
);

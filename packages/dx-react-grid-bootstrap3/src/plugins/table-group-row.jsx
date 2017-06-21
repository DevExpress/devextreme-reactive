import React from 'react';

import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupCell, TableGroupIndentCell } from '../templates/table-group-row-cell';

const groupCellTemplate = props => <TableGroupCell {...props} />;
const groupIndentCellTemplate = props => <TableGroupIndentCell {...props} />;

export const TableGroupRow = props => (
  <TableGroupRowBase
    groupCellTemplate={groupCellTemplate}
    groupIndentCellTemplate={groupIndentCellTemplate}
    groupIndentColumnWidth={20}
    {...props}
  />
);

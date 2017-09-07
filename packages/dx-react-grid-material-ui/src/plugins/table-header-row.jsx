import React from 'react';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderRow as TableHeaderRowTemplate } from '../templates/table-header-row';
import { TableHeaderCell } from '../templates/table-header-cell';

const headerCellTemplate = props => <TableHeaderCell {...props} />;
const headerRowTemplate = props => <TableHeaderRowTemplate {...props} />;

export const TableHeaderRow = props => (
  <TableHeaderRowBase
    headerCellTemplate={headerCellTemplate}
    headerRowTemplate={headerRowTemplate}
    {...props}
  />
);

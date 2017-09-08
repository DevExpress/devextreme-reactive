import React from 'react';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';

const headerCellTemplate = props => <TableHeaderCell {...props} />;
/* eslint-disable react/prop-types */
const headerRowTemplate = ({ tableRow, children, ...restProps }) => (
  <tr {...restProps}>{children}</tr>
);

export const TableHeaderRow = props => (
  <TableHeaderRowBase
    headerCellTemplate={headerCellTemplate}
    headerRowTemplate={headerRowTemplate}
    {...props}
  />
);

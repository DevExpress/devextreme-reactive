import React from 'react';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableRow } from 'material-ui';
import { TableHeaderCell } from '../templates/table-header-cell';

const headerCellTemplate = props => <TableHeaderCell {...props} />;
// eslint-disable-next-line react/prop-types
const headerRowTemplate = ({ tableRow, children, ...restProps }) => (
  <TableRow {...restProps}>{children}</TableRow>
);

export const TableHeaderRow = props => (
  <TableHeaderRowBase
    headerCellTemplate={headerCellTemplate}
    headerRowTemplate={headerRowTemplate}
    {...props}
  />
);

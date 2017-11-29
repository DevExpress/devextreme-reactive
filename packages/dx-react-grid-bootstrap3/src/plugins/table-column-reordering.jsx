import React from 'react';
import { DropTarget } from '@devexpress/dx-react-core';
import { TableColumnReordering as TableColumnReorderingBase } from '@devexpress/dx-react-grid';
import { TableRow } from '../templates/table-row';
import { TableReorderingCell } from '../templates/table-reordering-cell';

const TableContainer = ({
  onOver, onLeave, onDrop, children, // eslint-disable-line react/prop-types
}) => (
  <DropTarget
    onOver={onOver}
    onLeave={onLeave}
    onDrop={onDrop}
  >
    {children}
  </DropTarget>
);

// eslint-disable-next-line react/prop-types
const ReorderingRow = ({ style, ...restParams }) => (
  <TableRow
    style={{
      ...style,
      visibility: 'hidden',
    }}
    {...restParams}
  />
);

export const TableColumnReordering = props => (
  <TableColumnReorderingBase
    tableContainerComponent={TableContainer}
    rowComponent={ReorderingRow}
    cellComponent={TableReorderingCell}
    {...props}
  />
);

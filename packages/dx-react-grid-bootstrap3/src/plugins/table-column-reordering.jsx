import * as React from 'react';
import { DropTarget } from '@devexpress/dx-react-core';
import { TableColumnReordering as TableColumnReorderingBase } from '@devexpress/dx-react-grid';
import { TableInvisibleRow } from '../templates/table-invisible-row';
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

export const TableColumnReordering = props => (
  <TableColumnReorderingBase
    tableContainerComponent={TableContainer}
    rowComponent={TableInvisibleRow}
    cellComponent={TableReorderingCell}
    {...props}
  />
);

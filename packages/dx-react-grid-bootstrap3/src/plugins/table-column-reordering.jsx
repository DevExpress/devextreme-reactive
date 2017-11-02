import React from 'react';
import { DropTarget } from '@devexpress/dx-react-core';
import { TableColumnReordering as TableColumnReorderingBase } from '@devexpress/dx-react-grid';
import { TableRow } from '../templates/table-row';
import { TableReorderingCell } from '../templates/table-reordering-cell';

const tableContainerTemplate = ({
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
const reorderingRowTemplate = ({ style, ...restParams }) => (
  <TableRow
    style={{
      ...style,
      visibility: 'hidden',
    }}
    {...restParams}
  />
);
const reorderingCellTemplate = params => <TableReorderingCell {...params} />;

export const TableColumnReordering = props => (
  <TableColumnReorderingBase
    tableContainerTemplate={tableContainerTemplate}
    reorderingRowTemplate={reorderingRowTemplate}
    reorderingCellTemplate={reorderingCellTemplate}
    {...props}
  />
);

import { Table } from '@devexpress/dx-react-grid';
import * as React from 'react';

const getColor = (amount: number) : string => {
  if (amount < 3000) {
    return '#fc7a76';
  }
  if (amount < 5000) {
    return '#ffb294';
  }
  if (amount < 8000) {
    return '#ffd59f';
  }
  return '#c3e2b7';
};

export const HighlightedCell : React.ComponentType<Table.DataCellProps> =
  ({ tableColumn, value, children } : Table.DataCellProps) => (
    <td
      style={{
        backgroundColor: getColor(value),
        textAlign: tableColumn.align,
      }}
    >
      {children}
    </td>
  )

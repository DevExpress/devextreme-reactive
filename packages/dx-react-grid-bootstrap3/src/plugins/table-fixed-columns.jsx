import * as React from 'react';
import { TableFixedColumns as TableFixedColumnsBase } from '@devexpress/dx-react-grid';
import { FixedCell } from '../templates/table-fixed-cell';

export class TableFixedColumns extends React.PureComponent {
  render() {
    return (
      <TableFixedColumnsBase
        cellComponent={FixedCell}
        {...this.props}
      />
    );
  }
}

TableFixedColumns.Cell = FixedCell;

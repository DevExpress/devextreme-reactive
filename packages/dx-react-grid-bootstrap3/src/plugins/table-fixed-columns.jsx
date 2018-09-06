import * as React from 'react';
import { TableFixedColumns as TableFixedColumnsBase } from '@devexpress/dx-react-grid';
import { FixedCell } from '../templates/table-fixed-cell';
import { TableInvisibleRow } from '../templates/table-invisible-row';
import { TableListenerCell } from '../templates/table-listener-cell';

export class TableFixedColumns extends React.PureComponent {
  render() {
    return (
      <TableFixedColumnsBase
        cellComponent={FixedCell}
        listenerRowComponent={TableInvisibleRow}
        listenerCellComponent={TableListenerCell}
        {...this.props}
      />
    );
  }
}

TableFixedColumns.Cell = FixedCell;

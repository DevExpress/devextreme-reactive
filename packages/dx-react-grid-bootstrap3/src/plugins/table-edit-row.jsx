import * as React from 'react';
import { TableEditRow as TableEditRowBase } from '@devexpress/dx-react-grid';
import { EditCell } from '../templates/table-edit-cell';
import { TableRow } from '../templates/table-row';

export class TableEditRow extends React.PureComponent {
  render() {
    return (
      <TableEditRowBase
        cellComponent={EditCell}
        rowComponent={TableRow}
        {...this.props}
      />
    );
  }
}

TableEditRow.Cell = EditCell;
TableEditRow.Row = TableRow;
TableEditRow.ADDED_ROW_TYPE = TableEditRowBase.ADDED_ROW_TYPE;
TableEditRow.EDIT_ROW_TYPE = TableEditRowBase.EDIT_ROW_TYPE;

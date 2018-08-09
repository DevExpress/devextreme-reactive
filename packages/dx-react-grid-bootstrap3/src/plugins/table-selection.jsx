import * as React from 'react';
import { TABLE_SELECT_TYPE } from '@devexpress/dx-grid-core';
import { TableSelection as TableSelectionBase } from '@devexpress/dx-react-grid';
import { TableSelectAllCell } from '../templates/table-select-all-cell';
import { TableSelectCell } from '../templates/table-select-cell';
import { TableSelectRow } from '../templates/table-select-row';

export class TableSelection extends React.PureComponent {
  render() {
    return (
      <TableSelectionBase
        rowComponent={TableSelectRow}
        cellComponent={TableSelectCell}
        headerCellComponent={TableSelectAllCell}
        selectionColumnWidth={33}
        {...this.props}
      />
    );
  }
}

TableSelection.Cell = TableSelectCell;
TableSelection.HeaderCell = TableSelectAllCell;
TableSelection.COLUMN_TYPE = TABLE_SELECT_TYPE;

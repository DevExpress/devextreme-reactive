import * as React from 'react';
import { TableGroupHeader as TableGroupHeaderBase } from '@devexpress/dx-react-grid';
import { Cell } from '../templates/table-group-header/cell';
import { HeaderCell } from '../templates/table-group-header/header-cell';
import { EmptyCell } from '../templates/table-group-header/empty-cell';
import { TableRow } from '../templates/table-row';

export class TableGroupHeader extends React.PureComponent {
  render() {
    return (
      <TableGroupHeaderBase
        cellComponent={Cell}
        rowComponent={TableRow}
        headerCellContainer={HeaderCell}
        emptyCellComponent={EmptyCell}
        {...this.props}
      />
    );
  }
}

TableGroupHeader.Cell = Cell;
TableGroupHeader.Row = TableRow;
TableGroupHeader.HeaderCellContainer = HeaderCell;

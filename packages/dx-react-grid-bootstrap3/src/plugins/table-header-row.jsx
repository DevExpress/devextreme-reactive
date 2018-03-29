import * as React from 'react';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { TableRow } from '../templates/table-row';
import { CellContent } from '../templates/table-header-cell/cell-content';
import { SortingControl } from '../templates/table-header-cell/sorting-control';

export class TableHeaderRow extends React.PureComponent {
  render() {
    return (
      <TableHeaderRowBase
        cellComponent={TableHeaderCell}
        rowComponent={TableRow}
        sortingComponent={SortingControl}
        cellContentComponent={CellContent}
        {...this.props}
      />
    );
  }
}

TableHeaderRow.Cell = TableHeaderCell;
TableHeaderRow.Row = TableRow;
TableHeaderRow.SortingControl = SortingControl;
TableHeaderRow.CellContent = CellContent;

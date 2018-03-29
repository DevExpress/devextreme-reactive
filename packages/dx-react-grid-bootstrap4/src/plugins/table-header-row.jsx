import * as React from 'react';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { TableRow } from '../templates/table-row';
import { SortLabel } from '../templates/table-header-cell/sort-label';
import { CellContent } from '../templates/table-header-cell/cell-content';

export class TableHeaderRow extends React.PureComponent {
  render() {
    return (
      <TableHeaderRowBase
        cellComponent={TableHeaderCell}
        rowComponent={TableRow}
        sortLabelComponent={SortLabel}
        cellContentComponent={CellContent}
        {...this.props}
      />
    );
  }
}

TableHeaderRow.Cell = TableHeaderCell;
TableHeaderRow.Row = TableRow;
TableHeaderRow.SortLabel = SortLabel;
TableHeaderRow.CellContent = CellContent;

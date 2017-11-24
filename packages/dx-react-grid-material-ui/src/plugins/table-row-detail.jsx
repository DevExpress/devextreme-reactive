import React from 'react';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-grid';
import { TableDetailToggleCell } from '../templates/table-detail-toggle-cell';
import { TableDetailCell } from '../templates/table-detail-cell';
import { TableRow } from '../templates/table-row';

export class TableRowDetail extends React.PureComponent {
  render() {
    return (
      <TableRowDetailBase
        detailCellComponent={TableDetailToggleCell}
        cellComponent={TableDetailCell}
        rowComponent={TableRow}
        toggleColumnWidth={48}
        {...this.props}
      />
    );
  }
}

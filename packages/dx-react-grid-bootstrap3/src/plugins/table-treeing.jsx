import * as React from 'react';
import { TableTreeing as TableTreeingBase } from '@devexpress/dx-react-grid';
import { TableDetailToggleCell } from '../templates/table-detail-toggle-cell';

export class TableTreeing extends React.PureComponent {
  render() {
    return (
      <TableTreeingBase
        toggleCellComponent={TableDetailToggleCell}
        toggleColumnWidth={25}
        {...this.props}
      />
    );
  }
}

TableTreeing.ToggleCell = TableDetailToggleCell;

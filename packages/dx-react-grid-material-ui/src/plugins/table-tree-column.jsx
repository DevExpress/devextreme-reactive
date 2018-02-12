import * as React from 'react';
import { TableTreeColumn as TableTreeColumnBase } from '@devexpress/dx-react-grid';
import { ToggleButton } from '../templates/table-tree-column/toggle-button';
import { Checkbox } from '../templates/table-tree-column/checkbox';
import { Indent } from '../templates/table-tree-column/indent';
import { Cell } from '../templates/table-tree-column/cell';

export class TableTreeColumn extends React.PureComponent {
  render() {
    return (
      <TableTreeColumnBase
        cellComponent={Cell}
        indentComponent={Indent}
        toggleButtonComponent={ToggleButton}
        checkboxComponent={Checkbox}
        {...this.props}
      />
    );
  }
}

TableTreeColumn.Cell = Cell;
TableTreeColumn.Indent = Indent;
TableTreeColumn.ToggleButton = ToggleButton;
TableTreeColumn.Checkbox = Checkbox;

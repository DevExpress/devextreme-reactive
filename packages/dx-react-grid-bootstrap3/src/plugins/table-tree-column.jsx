import * as React from 'react';
import { TableTreeColumn as TableTreeColumnBase } from '@devexpress/dx-react-grid';
import { TableTreeToggleButton } from '../templates/table-tree-toggle-button';
import { TableTreeCheckbox } from '../templates/table-tree-checkbox';
import { TableTreeIndent } from '../templates/table-tree-indent';
import { TableTreeCell } from '../templates/table-tree-cell';

export class TableTreeColumn extends React.PureComponent {
  render() {
    return (
      <TableTreeColumnBase
        cellComponent={TableTreeCell}
        indentComponent={TableTreeIndent}
        toggleButtonComponent={TableTreeToggleButton}
        checkboxComponent={TableTreeCheckbox}
        {...this.props}
      />
    );
  }
}

TableTreeColumn.Cell = TableTreeCell;
TableTreeColumn.Indent = TableTreeIndent;
TableTreeColumn.ToggleButton = TableTreeToggleButton;
TableTreeColumn.Checkbox = TableTreeCheckbox;

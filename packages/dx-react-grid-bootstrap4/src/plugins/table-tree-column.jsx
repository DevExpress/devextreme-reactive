import * as React from 'react';
import { TableTreeColumn as TableTreeColumnBase } from '@devexpress/dx-react-grid';
import { TableTreeExpandButton } from '../templates/table-tree-toggle-button';
import { TableTreeCheckbox } from '../templates/table-tree-checkbox';
import { TableTreeIndent } from '../templates/table-tree-indent';
import { TableTreeCell } from '../templates/table-tree-cell';

export class TableTreeColumn extends React.PureComponent {
  render() {
    return (
      <TableTreeColumnBase
        cellComponent={TableTreeCell}
        indentComponent={TableTreeIndent}
        expandButtonComponent={TableTreeExpandButton}
        checkboxComponent={TableTreeCheckbox}
        {...this.props}
      />
    );
  }
}

TableTreeColumn.Cell = TableTreeCell;
TableTreeColumn.Indent = TableTreeIndent;
TableTreeColumn.ExpandButton = TableTreeExpandButton;
TableTreeColumn.Checkbox = TableTreeCheckbox;

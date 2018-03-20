import * as React from 'react';
import { TableTreeColumn as TableTreeColumnBase } from '@devexpress/dx-react-grid';
import { TableTreeExpandButton } from '../templates/table-tree-expand-button';
import { TableTreeCheckbox } from '../templates/table-tree-checkbox';
import { TableTreeIndent } from '../templates/table-tree-indent';
import { TableTreeCell } from '../templates/table-tree-cell';
import { TableTreeContent } from '../templates/table-tree-content';

export class TableTreeColumn extends React.PureComponent {
  render() {
    return (
      <TableTreeColumnBase
        cellComponent={TableTreeCell}
        contentComponent={TableTreeContent}
        indentComponent={TableTreeIndent}
        expandButtonComponent={TableTreeExpandButton}
        checkboxComponent={TableTreeCheckbox}
        {...this.props}
      />
    );
  }
}

TableTreeColumn.Cell = TableTreeCell;
TableTreeColumn.Content = TableTreeContent;
TableTreeColumn.Indent = TableTreeIndent;
TableTreeColumn.ExpandButton = TableTreeExpandButton;
TableTreeColumn.Checkbox = TableTreeCheckbox;

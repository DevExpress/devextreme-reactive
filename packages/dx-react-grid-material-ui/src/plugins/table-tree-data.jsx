import * as React from 'react';
import { TableTreeData as TableTreeDataBase } from '@devexpress/dx-react-grid';
import { ToggleButton } from '../templates/table-tree-data/toggle-button';
import { Checkbox } from '../templates/table-tree-data/checkbox';
import { Indent } from '../templates/table-tree-data/indent';
import { Cell } from '../templates/table-tree-data/cell';

export class TableTreeData extends React.PureComponent {
  render() {
    return (
      <TableTreeDataBase
        cellComponent={Cell}
        indentComponent={Indent}
        toggleButtonComponent={ToggleButton}
        checkboxComponent={Checkbox}
        {...this.props}
      />
    );
  }
}

TableTreeData.Cell = Cell;
TableTreeData.Indent = Indent;
TableTreeData.ToggleButton = ToggleButton;
TableTreeData.Checkbox = Checkbox;

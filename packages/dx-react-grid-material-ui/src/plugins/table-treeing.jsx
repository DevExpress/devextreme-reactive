import * as React from 'react';
import { TableTreeing as TableTreeingBase } from '@devexpress/dx-react-grid';
import { ToggleButton } from '../templates/table-treeing/toggle-button';
import { Checkbox } from '../templates/table-treeing/checkbox';
import { Indent } from '../templates/table-treeing/indent';
import { Cell } from '../templates/table-treeing/cell';

export class TableTreeing extends React.PureComponent {
  render() {
    return (
      <TableTreeingBase
        cellComponent={Cell}
        indentComponent={Indent}
        toggleButtonComponent={ToggleButton}
        checkboxComponent={Checkbox}
        {...this.props}
      />
    );
  }
}

TableTreeing.Cell = Cell;
TableTreeing.Indent = Indent;
TableTreeing.ToggleButton = ToggleButton;
TableTreeing.Checkbox = Checkbox;

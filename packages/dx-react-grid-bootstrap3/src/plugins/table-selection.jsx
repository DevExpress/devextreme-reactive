import React from 'react';

import { TableSelection as TableSelectionBase } from '@devexpress/dx-react-grid';
import { TableSelectAllCell } from '../templates/table-select-all-cell';
import { TableSelectCell } from '../templates/table-select-cell';
import { TableSelectRow } from '../templates/table-select-row';

const selectCellTemplate = props => <TableSelectCell {...props} />;
const selectAllCellTemplate = props => <TableSelectAllCell {...props} />;
const selectRowTemplate = props => <TableSelectRow {...props} />;

export class TableSelection extends React.PureComponent {
  render() {
    return (
      <TableSelectionBase
        selectCellTemplate={selectCellTemplate}
        selectRowTemplate={selectRowTemplate}
        selectAllCellTemplate={selectAllCellTemplate}
        selectionColumnWidth={40}
        {...this.props}
      />
    );
  }
}


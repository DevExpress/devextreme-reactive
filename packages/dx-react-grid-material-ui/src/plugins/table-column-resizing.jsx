import React from 'react';
import { TableColumnResizing as TableColumnResizingBase } from '@devexpress/dx-react-grid';

export class TableColumnResizing extends React.PureComponent {
  render() {
    return (
      <TableColumnResizingBase
        {...this.props}
      />
    );
  }
}

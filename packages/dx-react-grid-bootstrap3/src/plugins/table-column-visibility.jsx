import React from 'react';
import { TableColumnVisibility as TableColumnVisibilityBase } from '@devexpress/dx-react-grid';
import { EmptyMessage } from '../templates/empty-message';

const emptyMessageTemplate = props => <EmptyMessage {...props} />;

export class TableColumnVisibility extends React.PureComponent {
  render() {
    return (
      <TableColumnVisibilityBase
        emptyMessageTemplate={emptyMessageTemplate}
        {...this.props}
      />
    );
  }
}

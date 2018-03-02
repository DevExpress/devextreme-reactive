import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableColumnVisibility as TableColumnVisibilityBase } from '@devexpress/dx-react-grid';
import { EmptyMessage } from '../templates/empty-message';

const defaultMessages = {
  noColumns: 'Nothing to show',
};

export class TableColumnVisibility extends React.PureComponent {
  render() {
    const { messages, ...restProps } = this.props;

    return (
      <TableColumnVisibilityBase
        emptyMessageComponent={EmptyMessage}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableColumnVisibility.EmptyMessage = EmptyMessage;

TableColumnVisibility.propTypes = {
  messages: PropTypes.shape({
    noColumns: PropTypes.string,
  }),
};

TableColumnVisibility.defaultProps = {
  messages: {},
};

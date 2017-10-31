import React from 'react';
import PropTypes from 'prop-types';
import { TableColumnVisibility as TableColumnVisibilityBase } from '@devexpress/dx-react-grid';
import { EmptyMessage } from '../templates/empty-message';

const emptyMessageTemplate = props => <EmptyMessage {...props} />;

const defaultMessages = {
  noColumns: 'Nothing to show',
};

export class TableColumnVisibility extends React.PureComponent {
  render() {
    const { messages, ...restProps } = this.props;

    return (
      <TableColumnVisibilityBase
        emptyMessageTemplate={emptyMessageTemplate}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableColumnVisibility.propTypes = {
  messages: PropTypes.shape({
    noColumns: PropTypes.string,
  }),
};

TableColumnVisibility.defaultProps = {
  messages: {},
};

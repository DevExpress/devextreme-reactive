import React from 'react';
import PropTypes from 'prop-types';
import { getMessageFn } from '@devexpress/dx-grid-core';
import { TableColumnVisibility as TableColumnVisibilityBase } from '@devexpress/dx-react-grid';
import { EmptyMessage } from '../templates/empty-message';

const getEmptyMessageTemplate = getMessage => props =>
  <EmptyMessage getMessage={getMessage} {...props} />;

const defaultMessages = {
  noColumns: 'Nothing to show',
};

export class TableColumnVisibility extends React.PureComponent {
  render() {
    const { messages } = this.props;
    const getMessage = getMessageFn({ ...defaultMessages, ...messages });
    const emptyMessageTemplate = getEmptyMessageTemplate(getMessage);

    return (
      <TableColumnVisibilityBase
        emptyMessageTemplate={emptyMessageTemplate}
        {...this.props}
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

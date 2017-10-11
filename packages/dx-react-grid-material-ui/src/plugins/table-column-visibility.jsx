import React from 'react';
import PropTypes from 'prop-types';
import { TableColumnVisibility as TableColumnVisibilityBase } from '@devexpress/dx-react-grid';
import { EmptyMessage } from '../templates/empty-message';

export const TableColumnVisibility = ({ emptyMessageText, ...restProps }) => {
  const emptyMessageTemplate = () => <EmptyMessage text={emptyMessageText} />;

  return (
    <TableColumnVisibilityBase
      emptyMessageTemplate={emptyMessageTemplate}
      {...restProps}
    />
  );
};

TableColumnVisibility.propTypes = {
  emptyMessageText: PropTypes.string,
};

TableColumnVisibility.defaultProps = {
  emptyMessageText: 'Nothing to show',
};

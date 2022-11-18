import * as React from 'react';
import PropTypes from 'prop-types';

export const Content = ({
  column, row, children, ...restProps
}) => (
  <span {...restProps}>
    <strong>
      {column.title || column.name}
      :
      {' '}
    </strong>
    {children || String(row.value)}
  </span>
);

Content.propTypes = {
  row: PropTypes.any,
  column: PropTypes.object,
  children: PropTypes.node,
};

Content.defaultProps = {
  row: {},
  column: {},
  children: undefined,
};

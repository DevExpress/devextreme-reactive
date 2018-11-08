import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Content = ({
  column, row, className, children,
}) => (
  <span className={className}>
    <strong>
      {column.title || column.name}
        :
      {' '}
    </strong>
    {children || row.value}
  </span>
);

Content.propTypes = {
  row: PropTypes.any,
  column: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
};

Content.defaultProps = {
  row: {},
  column: {},
  children: undefined,
  className: undefined,
};

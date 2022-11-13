import * as React from 'react';
import PropTypes from 'prop-types';

export const TableTreeContent = ({
  children, style, ...restProps
}) => (
  <div
    style={{
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

TableTreeContent.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

TableTreeContent.defaultProps = {
  children: undefined,
  style: null,
};

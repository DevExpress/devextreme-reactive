import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Root = ({
  children, width, height,
  ...restProps
}) => (
  <svg width={width} height={height} {...restProps}>
    {children}
  </svg>
);

Root.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Root.defaultProps = {
  children: undefined,
};

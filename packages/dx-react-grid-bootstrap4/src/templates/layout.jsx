import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Root = ({ children, ...restProps }) => (
  <div
    {...restProps}
  >
    {children}
  </div>
);

Root.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Root.defaultProps = {
  children: undefined,
};

import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Marker = ({ color, ...restProps }) => (
  <svg width="10" height="10" fill={color} {...restProps}>
    <circle r={5} cx={5} cy={5} />
  </svg>);

Marker.propTypes = {
  color: PropTypes.string,
};

Marker.defaultProps = {
  color: undefined,
};

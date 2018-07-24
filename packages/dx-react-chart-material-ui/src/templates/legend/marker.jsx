import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Marker = ({ themeColor, ...restProps }) => (
  <svg width="10" height="10" fill={themeColor} {...restProps}>
    <circle r={5} cx={5} cy={5} />
  </svg>);

Marker.propTypes = {
  themeColor: PropTypes.string,
};

Marker.defaultProps = {
  themeColor: undefined,
};

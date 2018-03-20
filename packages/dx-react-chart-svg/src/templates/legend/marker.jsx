import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Marker = ({
  width, x, y, height, style,
}) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    style={{
      fill: 'red',
      ...style,
}}
  />
);

Marker.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
};

Marker.defaultProps = {
  style: null,
};


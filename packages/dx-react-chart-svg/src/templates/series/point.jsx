import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Point = ({
  x, y, d, style,
}) => (
  <path
    transform={`translate(${x} ${y})`}
    d={d}
    style={{
        stroke: 'black',
        strokeWidth: '1px',
        fill: 'none',
        ...style,
      }}
  />
);

Point.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Point.defaultProps = {
  style: null,
};

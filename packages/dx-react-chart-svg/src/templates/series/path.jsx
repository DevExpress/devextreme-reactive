import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Path = ({
  x, y, d, style,
}) => (
  <g>
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
  </g>
);

Path.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Path.defaultProps = {
  style: null,
};

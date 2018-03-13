import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Root = ({
  x, y, d, style,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <path
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

Root.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Root.defaultProps = {
  style: null,
};

import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Bar = ({
  x, y, width, height, style,
}) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    style={{
        stroke: 'black',
        strokeWidth: '1px',
        fill: 'none',
        ...style,
      }}
  />
);

Bar.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
};

Bar.defaultProps = {
  style: null,
};

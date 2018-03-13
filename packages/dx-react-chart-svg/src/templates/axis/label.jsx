import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Label = ({ text, x, y }) => (
  <text
    alignmentBaseline="middle"
    textAnchor="middle"
    key={text}
    x={x}
    y={y}
  >
    {text}
  </text>
);

Label.propTypes = {
  text: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

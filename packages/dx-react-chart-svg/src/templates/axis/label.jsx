import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Label = ({
  text, x, y, alignmentBaseline, textAnchor,
}) => (
  <text
    alignmentBaseline={alignmentBaseline}
    textAnchor={textAnchor}
    key={text}
    x={x}
    y={y}
  >
    {text}
  </text>
);

Label.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  alignmentBaseline: PropTypes.string.isRequired,
  textAnchor: PropTypes.string.isRequired,
};

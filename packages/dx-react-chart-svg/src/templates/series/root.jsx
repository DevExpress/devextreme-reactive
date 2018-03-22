import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Root = ({
  x, y, children,
}) => (
  <g transform={`translate(${x} ${y})`}>
    {children}
  </g>
);

Root.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

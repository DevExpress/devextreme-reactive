import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Root = ({
  x, y, refsHandler, children,
}) => (
  <g ref={refsHandler} transform={`translate(${x} ${y})`} shapeRendering="crispEdges">
    {children}
  </g>
);

Root.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  refsHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

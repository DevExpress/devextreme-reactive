import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Root extends React.PureComponent {
  render() {
    const {
      x, y, refsHandler, children,
    } = this.props;
    return (
      <g
        ref={refsHandler}
        transform={`translate(${x} ${y})`}
        shapeRendering="crispEdges"
      >
        {children}
      </g>
    );
  }
}

Root.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  refsHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

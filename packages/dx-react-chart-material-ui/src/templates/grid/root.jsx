import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Root extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <g
        shapeRendering="crispEdges"
      >
        {children}
      </g>
    );
  }
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

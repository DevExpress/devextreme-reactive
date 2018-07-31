import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Root extends React.PureComponent {
  render() {
    const {
      x, y, children, ...restProps
    } = this.props;
    return (
      <g transform={`translate(${x} ${y})`} {...restProps}>
        {children}
      </g>
    );
  }
}

Root.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

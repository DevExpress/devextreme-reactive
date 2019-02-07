import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Target extends React.PureComponent {
  render() {
    const {
      d, x, y, componentRef,
    } = this.props;
    return (
      <path transform={`translate(${x} ${y})`} fill="none" ref={componentRef} d={d} />
    );
  }
}

Target.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  componentRef: PropTypes.func.isRequired,
};

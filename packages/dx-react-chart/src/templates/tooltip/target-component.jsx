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
  x: PropTypes.number,
  y: PropTypes.number,
  d: PropTypes.string,
  componentRef: PropTypes.func.isRequired,
};

Target.defaultProps = {
  x: 0,
  y: 0,
  d: '',
};

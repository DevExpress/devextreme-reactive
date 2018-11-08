import * as React from 'react';
import * as PropTypes from 'prop-types';

export class FakeElement extends React.PureComponent {
  render() {
    const {
      d, x, y, buttonRef,
    } = this.props;
    return (
      <path transform={`translate(${x} ${y})`} fill="none" ref={buttonRef} d={d} />
    );
  }
}

FakeElement.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  d: PropTypes.string.isRequired,
  buttonRef: PropTypes.func.isRequired,
};

FakeElement.defaultProps = {
  x: 0,
  y: 0,
};

import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Slice extends React.PureComponent {
  render() {
    const {
      x, y, d, value, color, ...restProps
    } = this.props;
    return (
      <path
        fill={color}
        transform={`translate(${x} ${y})`}
        d={d}
        {...restProps}
      />
    );
  }
}

Slice.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
  color: PropTypes.string,
};

Slice.defaultProps = {
  style: null,
  color: undefined,
};

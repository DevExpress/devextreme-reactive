import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Slice extends React.PureComponent {
  render() {
    const {
      argument, value, index, innerRadius, outerRadius, startAngle, endAngle,
      x, y, d, color, ...restProps
    } = this.props;
    return (
      <path
        fill={color}
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
  style: {},
  color: undefined,
};
